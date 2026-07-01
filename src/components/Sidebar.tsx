import React, { useState } from "react";
import { DocSection } from "../docsData";
import { 
  BookOpen, Terminal, Layers, Zap, Code, Play, Sparkles, 
  Search, ShieldAlert, ChevronRight, ChevronDown, HelpCircle, FileText,
  Building, Cpu, LayoutGrid, Compass, Phone, Mic, Activity, Radio
} from "lucide-react";

interface SidebarProps {
  docs: DocSection[];
  activeId: string;
  onSelect: (id: string) => void;
  selectedMicModels: string[];
  onMicModelToggle: (model: string) => void;
}

export default function Sidebar({ docs, activeId, onSelect, selectedMicModels, onMicModelToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    company: true,
    "microphone-devices": true,
    "telalive-series": true,
    "wearable-devices": true,
    solutions: true,
    support: true,
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen size={14} />;
      case "Terminal":
        return <Terminal size={14} />;
      case "Layers":
        return <Layers size={14} />;
      case "Zap":
        return <Zap size={14} />;
      case "Code":
        return <Code size={14} />;
      case "Building":
        return <Building size={14} />;
      case "Sparkles":
        return <Sparkles size={14} />;
      case "Cpu":
        return <Cpu size={14} />;
      case "LayoutGrid":
        return <LayoutGrid size={14} />;
      case "Compass":
        return <Compass size={14} />;
      case "ShieldAlert":
        return <ShieldAlert size={14} />;
      case "HelpCircle":
        return <HelpCircle size={14} />;
      case "FileText":
        return <FileText size={14} />;
      case "Phone":
        return <Phone size={14} />;
      case "Mic":
        return <Mic size={14} />;
      case "Activity":
        return <Activity size={14} />;
      case "Radio":
        return <Radio size={14} />;
      default:
        return <FileText size={14} />;
    }
  };

  // Toggle category expand state
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Filter docs based on search query
  const filteredDocs = docs.filter((doc) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.subtitle.toLowerCase().includes(q) ||
      doc.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  });

  const isSearching = searchQuery.trim() !== "";

  // Group documentation sections
  const companyDocs = filteredDocs.filter((doc) => doc.category === "company");
  const micDevicesDocs = filteredDocs.filter((doc) => doc.category === "microphone-devices");
  const telaliveDocs = filteredDocs.filter((doc) => doc.category === "telalive-series");
  const wearableDocs = filteredDocs.filter((doc) => doc.category === "wearable-devices");
  const solutionsDocs = filteredDocs.filter((doc) => doc.category === "solutions");
  const supportDocs = filteredDocs.filter((doc) => doc.category === "support");

  // Determine whether to show interactive features in App Guide section
  const showPlaygroundInGuide = false;

  const renderNavItem = (id: string, label: string, icon: React.ReactNode, isSparkle: boolean = false) => {
    const isActive = activeId === id;
    return (
      <button
        key={id}
        onClick={() => onSelect(id)}
        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium font-sans flex items-center justify-between transition-all duration-150 cursor-pointer ${
          isActive
            ? "bg-neutral-900 text-white shadow-sm font-semibold"
            : isSparkle
              ? "text-rose-600 hover:bg-rose-50/50"
              : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={isActive ? "text-white" : isSparkle ? "text-rose-500" : "text-neutral-400"}>
            {icon}
          </span>
          <span className="truncate">{label}</span>
        </div>
        {isActive && <ChevronRight size={12} className="text-white/70" />}
      </button>
    );
  };

  const renderFolderHeader = (categoryKey: string, label: string, icon: React.ReactNode, count: number) => {
    const isExpanded = isSearching || expandedCategories[categoryKey];
    const isActive = activeId === categoryKey;
    return (
      <button
        onClick={() => {
          toggleCategory(categoryKey);
          if (categoryKey === "microphone-devices") {
            onSelect(categoryKey);
          }
        }}
        className={`w-full flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-150 text-left font-sans cursor-pointer group mt-3.5 first:mt-0 ${
          isActive
            ? "bg-neutral-900 text-white shadow-sm font-semibold"
            : "hover:bg-neutral-50/80 text-neutral-800"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-800"}`}>
            {icon}
          </span>
          <span className={`text-xs font-bold tracking-tight transition-colors ${isActive ? "text-white" : "text-neutral-800 group-hover:text-black"}`}>
            {label}
          </span>
          <span className={`text-[10px] font-semibold font-mono px-1.5 py-0.2 rounded-md ${isActive ? "bg-white/10 text-white" : "bg-neutral-100 text-neutral-400"}`}>
            {count}
          </span>
        </div>
        <span className={`transition-colors ${isActive ? "text-white/80" : "text-neutral-400 group-hover:text-neutral-600"}`}>
          {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
      </button>
    );
  };

  const renderFolderItems = (categoryKey: string, items: React.ReactNode) => {
    const isExpanded = isSearching || expandedCategories[categoryKey];
    if (!isExpanded) return null;
    return (
      <div className="pl-4 border-l border-neutral-100/80 ml-4.5 mt-0.5 space-y-0.5">
        {items}
      </div>
    );
  };

  // Compute actual counts inside folders including dynamic additions
  const companyCount = companyDocs.length;
  const micDevicesCount = micDevicesDocs.length;
  const telaliveCount = telaliveDocs.length;
  const wearableCount = wearableDocs.length;
  const solutionsCount = solutionsDocs.length;
  const supportCount = supportDocs.length;

  const totalFilteredCount = companyCount + micDevicesCount + telaliveCount + wearableCount + solutionsCount + supportCount;

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-neutral-200">
      {/* Brand Logo Header */}
      <div className="px-6 py-5 border-b border-neutral-100 flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 100 100" className="w-8 h-8 select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 68,43 L 68,36 A 18,18 0 0,0 32,36 L 32,64 A 18,18 0 0,0 68,64 L 68,56 L 60,50"
                stroke="#011640"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="47" y="34" width="6" height="32" rx="3" fill="#0066ff" />
              <rect x="37" y="43" width="6" height="14" rx="3" fill="#0066ff" />
              <rect x="57" y="43" width="6" height="14" rx="3" fill="#0066ff" />
            </svg>
            <div className="font-sans font-black text-sm text-neutral-900 tracking-tight">GMIC AI</div>
          </div>
          <div className="text-[10px] font-mono text-neutral-400 font-medium">
            Hear the Real World. Power the Next Action.
          </div>
        </div>
        <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-500 border border-neutral-200/50 px-2 py-0.5 rounded-full mt-1.5">
          v1.2.4
        </span>
      </div>

      {/* Dynamic Search Bar */}
      <div className="px-4 py-3 border-b border-neutral-100/80 bg-neutral-50/20">
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search docs, assets, parameters..."
            className="w-full text-xs font-sans pl-8.5 pr-3 py-2 border border-neutral-200/80 rounded-xl bg-white focus:outline-none focus:border-neutral-900 transition-colors"
          />
        </div>
      </div>

      {/* Navigation Links Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        
        {/* Category 1: Company */}
        {(companyCount > 0) && (
          <>
            {renderFolderHeader("company", "Introduction", <Building size={14} />, companyCount)}
            {renderFolderItems("company", (
              <>
                {companyDocs.map((doc) => renderNavItem(doc.id, doc.title, getIcon(doc.icon)))}
              </>
            ))}
          </>
        )}

        {/* Category 2: Microphone Devices */}
        {(micDevicesCount > 0) && (
          <>
            {renderFolderHeader("microphone-devices", "Microphone Devices", <Mic size={14} />, micDevicesCount)}
            {renderFolderItems("microphone-devices", (
              <>
                {micDevicesDocs.map((doc) => renderNavItem(doc.id, doc.title, getIcon(doc.icon)))}
              </>
            ))}
          </>
        )}

        {/* Category 3: Telalive Series */}
        {(telaliveCount > 0) && (
          <>
            {renderFolderHeader("telalive-series", "Telalive Series", <Radio size={14} />, telaliveCount)}
            {renderFolderItems("telalive-series", (
              <>
                {telaliveDocs.map((doc) => renderNavItem(doc.id, doc.title, getIcon(doc.icon)))}
              </>
            ))}
          </>
        )}

        {/* Category 4: Wearable Devices */}
        {(wearableCount > 0) && (
          <>
            {renderFolderHeader("wearable-devices", "Wearable Devices", <Activity size={14} />, wearableCount)}
            {renderFolderItems("wearable-devices", (
              <>
                {wearableDocs.map((doc) => renderNavItem(doc.id, doc.title, getIcon(doc.icon)))}
              </>
            ))}
          </>
        )}

        {/* Category 5: Solutions */}
        {(solutionsCount > 0) && (
          <>
            {renderFolderHeader("solutions", "AI Demo Navigation", <Compass size={14} />, solutionsCount)}
            {renderFolderItems("solutions", (
              <>
                {solutionsDocs.map((doc) => renderNavItem(doc.id, doc.title, getIcon(doc.icon)))}
              </>
            ))}
          </>
        )}

        {/* Category 6: Support */}
        {(supportCount > 0) && (
          <>
            {renderFolderHeader("support", "FAQ", <HelpCircle size={14} />, supportCount)}
            {renderFolderItems("support", (
              <>
                {supportDocs.map((doc) => renderNavItem(doc.id, doc.title, getIcon(doc.icon)))}
              </>
            ))}
          </>
        )}

        {/* Catch-all when search returns zero result */}
        {totalFilteredCount === 0 && (
          <div className="p-4 text-center text-xs text-neutral-400 font-sans italic space-y-2 mt-4">
            <HelpCircle size={18} className="mx-auto text-neutral-300" />
            <p>No matching docs found</p>
          </div>
        )}
      </div>

      {/* Corporate Support footer */}
      <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex flex-col gap-1 text-[11px] font-sans text-neutral-400">
        <div className="flex items-center justify-between font-medium text-neutral-500">
          <span>Cloud Instance</span>
          <span className="flex items-center gap-1.5 text-emerald-500 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE
          </span>
        </div>
        <p className="mt-1 font-sans text-[10px] leading-relaxed">© 2026 Aether Technologies Co.</p>
      </div>
    </aside>
  );
}
