import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Terminal, Copy, Check, Info, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESET_PROMPTS = [
  "How does AetherFlow protect systems via backpressure?",
  "Show a complete example of writing messages in Node.js",
  "How to quickly set up a cluster using Docker?",
  "What are its advantages compared to Apache Kafka?"
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am AetherFlow's official AI Copilot Assistant. I have been deeply loaded with the official system architecture, client SDKs, and performance tuning knowledge base.\n\nFeel free to ask me anything about deployment, visual pipelines, pipeline routing, performance optimization, or client development. You can click on any recommended query below or type your questions directly into the input bar!"
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Custom API key missing alert state
  const [apiKeyMissingError, setApiKeyMissingError] = useState<{ message: string; title: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setApiKeyMissingError(null);
    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.needsApiKey) {
          setApiKeyMissingError({
            title: data.error || "API Key Not Configured",
            message: data.message || "AI services are currently offline because the GEMINI_API_KEY is not set."
          });
        } else {
          throw new Error(data.message || data.error || "An error occurred");
        }
      } else if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error(data.message || "Service response error");
      }
    } catch (error: any) {
      console.error("Failed to fetch AI chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ **System Connection Interrupted**\n\n${error.message || "Could not establish connection with the AI server. Please try again later or check your service status."}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(code);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Simple rendering for markdown-like structures in bot replies
  const renderMessageContent = (content: string) => {
    const blocks: React.ReactNode[] = [];
    const lines = content.split("\n");
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block start/end
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          const codeString = codeLines.join("\n");
          const lang = codeLanguage;
          blocks.push(
            <div key={`msg-code-${i}`} className="my-4 rounded-xl border border-neutral-200/80 bg-neutral-900 shadow-sm overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-neutral-400 text-[11px]">
                <span>{lang.toUpperCase() || "CODE"}</span>
                <button
                  onClick={() => handleCopyCode(codeString)}
                  className="flex items-center gap-1 hover:text-white cursor-pointer bg-neutral-800 hover:bg-neutral-700 px-2.5 py-0.5 rounded text-[10px]"
                >
                  {copiedText === codeString ? (
                    <>
                      <Check size={11} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-neutral-200 leading-relaxed font-mono select-text">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeLines = [];
          inCodeBlock = false;
        } else {
          codeLanguage = line.trim().slice(3);
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // Bullets
      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const itemText = line.trim().substring(2);
        blocks.push(
          <li key={i} className="ml-5 list-disc text-neutral-600 my-1 text-[13.5px] leading-relaxed">
            {parseInlineMarkdown(itemText)}
          </li>
        );
        continue;
      }

      // Number list
      if (/^\d+\.\s/.test(line.trim())) {
        const match = line.trim().match(/^(\d+)\.\s(.*)/);
        if (match) {
          const num = match[1];
          const itemText = match[2];
          blocks.push(
            <div key={i} className="flex gap-2 text-neutral-600 my-1.5 text-[13.5px] leading-relaxed">
              <span className="font-semibold text-neutral-900">{num}.</span>
              <span>{parseInlineMarkdown(itemText)}</span>
            </div>
          );
          continue;
        }
      }

      // Headers in response
      if (line.trim().startsWith("## ")) {
        blocks.push(
          <h4 key={i} className="text-sm font-bold text-neutral-900 mt-5 mb-2 border-b border-neutral-100 pb-1">
            {line.substring(3).trim()}
          </h4>
        );
        continue;
      }
      if (line.trim().startsWith("### ") || line.trim().startsWith("#### ")) {
        blocks.push(
          <h5 key={i} className="text-[13px] font-bold text-neutral-800 mt-4 mb-1">
            {line.replace(/^#+\s/, "").trim()}
          </h5>
        );
        continue;
      }

      // Standard text line
      if (line.trim() !== "") {
        blocks.push(
          <p key={i} className="text-[13.5px] text-neutral-600 leading-relaxed my-2">
            {parseInlineMarkdown(line)}
          </p>
        );
      }
    }

    return <div className="space-y-1 font-sans">{blocks}</div>;
  };

  // Helper to parse inline bolding and ticks in bot replies
  const parseInlineMarkdown = (text: string) => {
    const inlineCodeRegex = /`([^`]+)`/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;

    let elements: React.ReactNode[] = [];
    let lastIdx = 0;
    let match;
    const items: { type: "code" | "bold"; index: number; length: number; text: string }[] = [];

    while ((match = inlineCodeRegex.exec(text)) !== null) {
      items.push({ type: "code", index: match.index, length: match[0].length, text: match[1] });
    }
    // Simple reset and run bold
    boldRegex.lastIndex = 0;
    while ((match = boldRegex.exec(text)) !== null) {
      items.push({ type: "bold", index: match.index, length: match[0].length, text: match[1] });
    }

    items.sort((a, b) => a.index - b.index);

    let currIdx = 0;
    for (const item of items) {
      if (item.index < currIdx) continue;
      if (item.index > currIdx) {
        elements.push(text.substring(currIdx, item.index));
      }
      if (item.type === "bold") {
        elements.push(<strong key={item.index} className="font-semibold text-neutral-900">{item.text}</strong>);
      } else {
        elements.push(<code key={item.index} className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200/50 font-mono text-[12px] text-rose-600">{item.text}</code>);
      }
      currIdx = item.index + item.length;
    }

    if (currIdx < text.length) {
      elements.push(text.substring(currIdx));
    }

    return elements.length > 0 ? elements : text;
  };

  return (
    <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col h-[650px]">
      {/* Assistant Header */}
      <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-white shadow-sm">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="font-sans font-bold text-neutral-900 text-sm flex items-center gap-1.5">
              <span>AetherFlow AI Copilot</span>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full font-medium">Model: Gemini 3.5</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5 leading-none">Real-time answers powered by our technical documentation.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[11px] text-neutral-500 font-mono">Knowledge Active</span>
        </div>
      </div>

      {/* Main chat interface area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-neutral-50/20">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3.5 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center shrink-0 border shadow-sm ${
                  msg.role === "user"
                    ? "bg-neutral-100 border-neutral-200 text-neutral-700"
                    : "bg-neutral-900 border-neutral-800 text-white"
                }`}
              >
                {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="space-y-1.5">
                <div className={`text-[10px] text-neutral-400 font-sans ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {msg.role === "user" ? "You" : "AetherFlow AI Copilot"}
                </div>
                <div
                  className={`p-4 rounded-2xl text-[13.5px] border leading-relaxed select-text ${
                    msg.role === "user"
                      ? "bg-neutral-900 border-neutral-800 text-white rounded-tr-sm"
                      : "bg-white border-neutral-200/70 text-neutral-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {msg.role === "user" ? msg.content : renderMessageContent(msg.content)}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Key missing warning widget */}
          {apiKeyMissingError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto p-5 border border-amber-200 bg-amber-50/50 rounded-2xl space-y-4"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Info size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-neutral-900 font-sans">{apiKeyMissingError.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">{apiKeyMissingError.message}</p>
                </div>
              </div>

              {/* Instructions steps */}
              <div className="border-t border-amber-200/50 pt-4 space-y-2.5 text-xs text-neutral-700 font-sans">
                <div className="font-semibold text-neutral-800">🛠️ Configuration Steps:</div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100/80 flex items-center justify-center font-bold text-[10px] text-amber-700 shrink-0">1</span>
                  <span>Click **Settings** (gear icon) in the top-right corner.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100/80 flex items-center justify-center font-bold text-[10px] text-amber-700 shrink-0">2</span>
                  <span>Select **Secrets** in the dropdown.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100/80 flex items-center justify-center font-bold text-[10px] text-amber-700 shrink-0">3</span>
                  <span>Add a new secret key named `GEMINI_API_KEY` with your Gemini API Key from Google AI Studio.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100/80 flex items-center justify-center font-bold text-[10px] text-amber-700 shrink-0">4</span>
                  <span>Once configured, type any query to start interacting with the AI.</span>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3.5 max-w-[80%] mr-auto"
            >
              <div className="w-8.5 h-8.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center shrink-0">
                <Sparkles size={14} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-neutral-400 font-sans">AetherFlow AI Copilot</div>
                <div className="flex items-center gap-2 px-4 py-3 border border-neutral-200/70 bg-white rounded-2xl rounded-tl-sm shadow-sm text-xs text-neutral-500 font-sans">
                  <Loader2 size={13} className="animate-spin text-neutral-600" />
                  <span>Consulting documentation context and operators library...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Preset quick prompts for users */}
      {messages.length === 1 && (
        <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/30">
          <div className="text-[11px] font-sans font-semibold text-neutral-400 mb-2 tracking-wide uppercase">
            Recommended Tech Questions
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs font-sans text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 px-3 py-1.5 rounded-xl cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1 shadow-sm"
              >
                <span>{prompt}</span>
                <ArrowRight size={11} className="text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="p-4 border-t border-neutral-100 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask the AI Copilot Assistant..."
            className="flex-1 px-4 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/30 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-4 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              !input.trim() || isLoading
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
