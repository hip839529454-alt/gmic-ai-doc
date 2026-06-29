import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { DOCS } from "./src/docsData";

// Set up server
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Simple logging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Lazy-loaded Gemini client
  let aiInstance: GoogleGenAI | null = null;
  function getAI() {
    if (!aiInstance) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing. Please add your key in the AI Studio Secrets panel.");
      }
      aiInstance = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiInstance;
  }

  // --- API Routes ---
  
  // Endpoint to retrieve structured docs (optional search filters)
  app.get("/api/docs", (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string || "").toLowerCase().trim();
      if (!query) {
        res.json({ success: true, docs: DOCS });
        return;
      }

      // Simple keyword matching for documentation searching
      const filtered = DOCS.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.subtitle.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query) ||
        doc.keywords.some(kw => kw.toLowerCase().includes(query))
      );
      res.json({ success: true, docs: filtered });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Endpoint for AI chat assistance
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ success: false, error: "Invalid 'messages' format in request body." });
        return;
      }

      // Check key existence before API calls to provide standard helpful response
      try {
        getAI();
      } catch (keyError: any) {
        res.status(503).json({
          success: false,
          needsApiKey: true,
          error: "API Key Not Configured",
          message: "AetherFlow AI Copilot requires a Gemini API Key to work.\n\nPlease add a secret key named `GEMINI_API_KEY` in the Settings > Secrets panel of AI Studio and try again."
        });
        return;
      }

      const ai = getAI();
      
      // Build the prompt context from standard user message list
      // Convert standard messages into the SDK-expected format
      // We keep it clean and robust by sending chat messages
      const systemInstruction = `You are an official AI technical copilot expert for the AetherFlow distributed real-time data streaming platform.
You must communicate in English with a professional, polite, and helpful tone, utilizing clean formatting and structured paragraphs.
Here is the official documentation database of the AetherFlow platform, which serves as your core knowledge base:

${DOCS.map(doc => `=== Doc Title: ${doc.title} (${doc.subtitle}) ===
Category: ${doc.category}
Core Content:
${doc.content}
`).join("\n\n")}

Please answer the user's questions about AetherFlow based on the official documentation above:
1. If the user's question can be answered completely by the documentation above, quote content, code snippets, or metrics from it, providing a detailed, well-formatted Markdown response.
2. If the user's question is not directly covered in the documentation, politely note that "While the official documentation doesn't detail this specific aspect, based on my engineering background..." and provide a professional, logical, and helpful answer using your broad software engineering knowledge.
3. Always include clean code snippets or configuration syntax when appropriate, and keep the layout beautifully structured.`;

      // Structure messages for generateContent
      // The last message is the prompt. Previous ones are history
      const lastMessage = messages[messages.length - 1];
      const history = messages.slice(0, messages.length - 1);

      // We'll pass the custom instructions in config
      // Structure chat context
      const formattedContents = [
        ...history.map(msg => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        })),
        {
          role: "user",
          parts: [{ text: lastMessage.content }]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Sorry, I received an empty response from the AI model.";
      res.json({ success: true, reply: replyText });

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        message: "Encountered an issue calling the AI services. Please verify your connection or your API key usage."
      });
    }
  });

  // --- Vite & Production static serving ---
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Listen
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
