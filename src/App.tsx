import React, { useState, useEffect } from "react";
import { DOCS, DocSection } from "./docsData";
import Sidebar from "./components/Sidebar";
import DocView from "./components/DocView";
import ApiPlayground from "./components/ApiPlayground";
import AiAssistant from "./components/AiAssistant";
import { 
  Menu, X, Sparkles, Terminal, Compass, LayoutGrid, Search, 
  Command, ChevronRight, HelpCircle, FileCode, CheckCircle, Github
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeId, setActiveId] = useState<string>("about-company");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState("");

  const [selectedMicModels, setSelectedMicModels] = useState<string[]>([
    "HA-MIC01B",
    "HA-MIC01C",
    "HA-MIC04",
    "HA-MIC05",
    "HA-MIC06A",
    "HA-MIC06B"
  ]);

  const handleMicModelToggle = (model: string) => {
    setSelectedMicModels((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  // Listen to keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync route change from URL if share links are clicked
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const docQuery = params.get("doc");
    if (docQuery && (DOCS.some((d) => d.id === docQuery) || ["api-playground", "ai-assistant"].includes(docQuery))) {
      setActiveId(docQuery);
    }
  }, []);

  const handleSelectId = (id: string) => {
    setActiveId(id);
    setIsMobileSidebarOpen(false);
    // Push state to browser history for sharing
    const newUrl = `${window.location.origin}${window.location.pathname}?doc=${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  // Determine current active document
  const activeDoc = DOCS.find((doc) => doc.id === activeId);

  // Pagination navigation setup
  const docIndex = DOCS.findIndex((doc) => doc.id === activeId);
  const hasPrev = docIndex > 0;
  const hasNext = docIndex !== -1 && docIndex < DOCS.length - 1;

  const handlePrevDoc = () => {
    if (hasPrev) {
      handleSelectId(DOCS[docIndex - 1].id);
    }
  };

  const handleNextDoc = () => {
    if (hasNext) {
      handleSelectId(DOCS[docIndex + 1].id);
    }
  };

  // Command palette search filtering
  const filteredPaletteDocs = DOCS.filter((doc) => {
    const q = paletteSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.subtitle.toLowerCase().includes(q) ||
      doc.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans relative text-neutral-800">
      
      {/* Mobile Floating Action Controls */}
      <div className="lg:hidden fixed top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="pointer-events-auto p-2.5 bg-white/90 backdrop-blur-md border border-neutral-200/80 hover:bg-neutral-100 rounded-xl shadow-sm transition-colors cursor-pointer text-neutral-600"
        >
          <Menu size={18} />
        </button>
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="pointer-events-auto p-2.5 bg-white/90 backdrop-blur-md border border-neutral-200/80 hover:bg-neutral-100 rounded-xl shadow-sm transition-colors cursor-pointer text-neutral-600"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-[1728px] mx-auto relative">
        
        {/* Left Sticky Sidebar (Desktop) */}
        <div className="hidden lg:block w-[320px] shrink-0 sticky top-0 h-screen overflow-y-auto">
          <Sidebar 
            docs={DOCS} 
            activeId={activeId} 
            onSelect={handleSelectId} 
            selectedMicModels={selectedMicModels}
            onMicModelToggle={handleMicModelToggle}
          />
        </div>

        {/* Workspace panel (Main page + right sidebar TOC) */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 overflow-x-clip">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeId === "ai-assistant" ? (
                <AiAssistant />
              ) : activeId === "api-playground" ? (
                <ApiPlayground />
              ) : activeDoc ? (
                <DocView
                  doc={activeDoc}
                  onNavigatePrev={handlePrevDoc}
                  onNavigateNext={handleNextDoc}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  onSwitchToAi={() => handleSelectId("ai-assistant")}
                  selectedMicModels={selectedMicModels}
                  onMicModelToggle={handleMicModelToggle}
                />
              ) : (
                <div className="text-center py-20 text-neutral-500">
                  <p>Sorry, this documentation page could not be found.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer Slide-in Menu Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            
            {/* Sidebar box */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute left-0 top-0 bottom-0 w-[320px] bg-white shadow-2xl flex flex-col"
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <Sidebar 
                docs={DOCS} 
                activeId={activeId} 
                onSelect={handleSelectId} 
                selectedMicModels={selectedMicModels}
                onMicModelToggle={handleMicModelToggle}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spotlight Command Palette (Ctrl+K Modal) */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            
            {/* Backdrop mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCommandPaletteOpen(false)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[480px]"
            >
              {/* Search line */}
              <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
                <Search size={16} className="text-neutral-400" />
                <input
                  type="text"
                  value={paletteSearch}
                  onChange={(e) => setPaletteSearch(e.target.value)}
                  placeholder="Search any documentation topics..."
                  className="flex-1 bg-transparent text-sm focus:outline-none text-neutral-900"
                  autoFocus
                />
                <span className="text-[10px] font-mono bg-neutral-100 text-neutral-400 border border-neutral-200/50 px-2 py-0.5 rounded-md">
                  ESC Close
                </span>
              </div>

              {/* Suggestions results lists */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase p-2">
                  Quick Actions
                </div>
                
                {/* Fixed quick routes */}
                <button
                  onClick={() => {
                    handleSelectId("ai-assistant");
                    setIsCommandPaletteOpen(false);
                    setPaletteSearch("");
                  }}
                  className="w-full text-left p-3.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-800">Ask AI Copilot Assistant</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Consult technical docs to solve complex issues in real-time</div>
                    </div>
                  </div>
                  <ChevronRight size={12} className="text-neutral-300" />
                </button>

                <button
                  onClick={() => {
                    handleSelectId("api-playground");
                    setIsCommandPaletteOpen(false);
                    setPaletteSearch("");
                  }}
                  className="w-full text-left p-3.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
                      <Terminal size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-800">Open REST API Debug Sandbox</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">Modify headers and request bodies on-the-fly, send mock HTTP calls</div>
                    </div>
                  </div>
                  <ChevronRight size={12} className="text-neutral-300" />
                </button>

                <div className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase p-2 pt-4">
                  MATCHING DOCS ({filteredPaletteDocs.length})
                </div>

                {filteredPaletteDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      handleSelectId(doc.id);
                      setIsCommandPaletteOpen(false);
                      setPaletteSearch("");
                    }}
                    className="w-full text-left p-3.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 border border-neutral-200/50 flex items-center justify-center text-neutral-500 font-mono text-[10px]">
                        Doc
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-800">{doc.title}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{doc.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight size={12} className="text-neutral-300" />
                  </button>
                ))}

                {filteredPaletteDocs.length === 0 && (
                  <div className="text-center py-6 text-xs text-neutral-400 font-sans italic">
                    No matching documentation found
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
