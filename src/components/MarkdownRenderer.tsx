import React, { useState } from "react";
import { createPortal } from "react-dom";
import { 
  Copy, 
  Check, 
  Info, 
  Lightbulb, 
  AlertTriangle,
  Fingerprint,
  Power,
  RotateCcw,
  Usb,
  ChevronsUp,
  ChevronsDown,
  Sparkles,
  Image as ImageIcon,
  X,
  Mic,
  Cpu,
  Send,
  ArrowRight,
  ArrowDown
} from "lucide-react";

interface ImagePreviewToggleProps {
  url: string;
  alt?: string;
  key?: React.Key;
}

function ImagePreviewToggle({ url, alt = "图片预览" }: ImagePreviewToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  // If it's specifically "Demo Image", render a gorgeous, highly interactive block with a button AND a clickable thumbnail
  if (alt === "Demo Image") {
    return (
      <div className="block my-5 select-none">
        <div className="flex flex-col gap-3 items-start">
          {/* Icon + Label Pill Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
              isOpen
                ? "bg-neutral-900 border-neutral-900 text-white shadow-md"
                : "bg-white border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300 hover:shadow-xs"
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0 text-indigo-500 animate-pulse" />
            <span>{alt}</span>
          </button>

          {/* Clickable Thumbnail Image card */}
          <div 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="group relative w-72 h-40 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm cursor-zoom-in transition-all duration-300 hover:border-indigo-400 hover:shadow-md"
          >
            <img 
              src={url} 
              alt={alt} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with expand indicator */}
            <div className="absolute inset-0 bg-neutral-950/0 transition-colors duration-300 group-hover:bg-neutral-950/25 flex items-center justify-center">
              <span className="p-2 rounded-xl bg-white/95 shadow-md opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                点击放大
              </span>
            </div>
          </div>
        </div>

        {isOpen && typeof document !== "undefined" && createPortal(
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/45 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in" 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <div 
              className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 transition-all duration-300 transform scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
                <span className="text-[13px] font-bold text-neutral-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                  {alt}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-neutral-50/10 flex items-center justify-center max-h-[75vh] overflow-y-auto">
                <img
                  src={url}
                  alt={alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-xs"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }

  return (
    <span className="inline-block float-right ml-2 align-middle select-none">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-200 ${
          isOpen
            ? "bg-neutral-900 border-neutral-900 text-white shadow-sm"
            : "bg-white border-neutral-200 text-neutral-500 hover:text-neutral-950 hover:border-neutral-300 hover:shadow-xs"
        }`}
        title={isOpen ? "隐藏图片" : "查看图片"}
      >
        <ImageIcon className="w-4 h-4 shrink-0" />
      </button>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/45 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in" 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div 
            className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 transition-all duration-300 transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
              <span className="text-[13px] font-bold text-neutral-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-neutral-500" />
                {alt}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-neutral-50/10 flex items-center justify-center max-h-[75vh] overflow-y-auto">
              <img
                src={url}
                alt={alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-xs"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </span>
  );
}

function getLedIndicator(text: string) {
  const lower = text.toLowerCase();
  
  // Default to neutral-300 for LED off / — or similar
  let dotColorClass = "bg-neutral-300 dark:bg-neutral-600 border border-neutral-400/20";
  let glowClass = "";
  let animClass = "";
  let isFlashing = false;

  if (lower.includes("blue")) {
    dotColorClass = "bg-blue-500";
    glowClass = "shadow-[0_0_10px_rgba(59,130,246,0.8)]";
  } else if (lower.includes("green")) {
    dotColorClass = "bg-emerald-500";
    glowClass = "shadow-[0_0_10px_rgba(16,185,129,0.8)]";
  } else if (lower.includes("purple")) {
    dotColorClass = "bg-purple-500";
    glowClass = "shadow-[0_0_10px_rgba(139,92,246,0.8)]";
  } else if (lower.includes("cyan")) {
    dotColorClass = "bg-cyan-500";
    glowClass = "shadow-[0_0_10px_rgba(6,182,212,0.8)]";
  } else if (lower.includes("red")) {
    dotColorClass = "bg-rose-500";
    glowClass = "shadow-[0_0_10px_rgba(244,63,94,0.8)]";
  } else if (lower.includes("white")) {
    dotColorClass = "bg-white border border-neutral-300";
    glowClass = "shadow-[0_0_8px_rgba(200,200,200,0.5)]";
  } else if (lower.includes("orange")) {
    dotColorClass = "bg-amber-500";
    glowClass = "shadow-[0_0_10px_rgba(245,158,11,0.8)]";
  } else if (lower.includes("yellow")) {
    dotColorClass = "bg-yellow-400";
    glowClass = "shadow-[0_0_10px_rgba(250,204,21,0.8)]";
  }

  if (lower.includes("breathing")) {
    animClass = "animate-pulse";
  }

  if (lower.includes("flashing") || lower.includes("flash")) {
    isFlashing = true;
  }

  return (
    <div className="relative flex items-center justify-center w-4 h-4 shrink-0 select-none">
      {isFlashing ? (
        <>
          <span className={`absolute inline-flex h-3 w-3 rounded-full ${dotColorClass} opacity-75 animate-ping`} />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass} ${glowClass}`} />
        </>
      ) : (
        <span className={`inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass} ${glowClass} ${animClass}`} />
      )}
    </div>
  );
}

function getColWidthClass(headerText: string, colIndex: number, totalCols: number): string {
  const clean = headerText.trim().toLowerCase();
  
  if (totalCols === 4) {
    if (colIndex === 0 || clean.includes("operation") || clean.includes("操作") || clean.includes("gesture") || clean.includes("手势")) return "w-[24%]";
    if (colIndex === 1 || clean.includes("function") || clean.includes("功能")) return "w-[40%]";
    if (colIndex === 2 || clean.includes("led") || clean.includes("灯")) return "w-[22%]";
    if (colIndex === 3 || clean.includes("audio") || clean.includes("反馈")) return "w-[14%]";
  } else if (totalCols === 3) {
    if (colIndex === 0 || clean.includes("status") || clean.includes("状态") || clean.includes("mode") || clean.includes("模式")) return "w-[30%]";
    if (colIndex === 1 || clean.includes("led") || clean.includes("灯") || clean.includes("connection") || clean.includes("连接")) return "w-[35%]";
    if (colIndex === 2 || clean.includes("meaning") || clean.includes("意义") || clean.includes("含义") || clean.includes("description") || clean.includes("描述")) return "w-[35%]";
  } else if (totalCols === 2) {
    if (colIndex === 0 || clean.includes("operation") || clean.includes("操作") || clean.includes("gesture") || clean.includes("手势")) return "w-[24%]";
    if (colIndex === 1 || clean.includes("function") || clean.includes("功能")) return "w-[76%]";
  }
  
  return "";
}

interface ClickableMarkdownImageProps {
  url: string;
  alt?: string;
  className?: string;
  key?: React.Key;
}

function ClickableMarkdownImage({ url, alt, className }: ClickableMarkdownImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className || "my-6 w-[70%] ml-0 mr-auto rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm"}>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative cursor-zoom-in group overflow-hidden"
      >
        <img
          src={url}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full max-h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* Hover overlay with expand indicator */}
        <div className="absolute inset-0 bg-neutral-950/0 transition-colors duration-300 group-hover:bg-neutral-950/15 flex items-center justify-center">
          <span className="p-2 rounded-xl bg-white/95 shadow-md opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 flex items-center gap-1.5 text-xs font-bold text-neutral-800">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            Click to enlarge
          </span>
        </div>
      </div>
      {alt && (
        <div className="px-4 py-2 bg-neutral-50/50 border-t border-neutral-100 text-[11px] text-neutral-400 font-sans italic text-center">
          {alt}
        </div>
      )}

      {isOpen && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/45 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in" 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div 
            className="relative max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 transition-all duration-300 transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/50">
              <span className="text-[13px] font-bold text-neutral-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-neutral-500" />
                {alt || "Image Preview"}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 bg-neutral-50/10 flex items-center justify-center max-h-[90vh] overflow-y-auto">
              <img
                src={url}
                alt={alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-sm cursor-zoom-out"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

interface InteractiveControlItemProps {
  trigger: string;
  action: any;
  key?: any;
}

function InteractiveControlItem({ trigger, action }: InteractiveControlItemProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [longPressProgress, setLongPressProgress] = useState(0);

  const lowerTrigger = trigger.toLowerCase();

  // Choose the icon based on trigger
  let Icon = Fingerprint;
  let iconColor = "text-neutral-500";
  let bgLight = "bg-neutral-100";

  if (lowerTrigger.includes("single click")) {
    Icon = Fingerprint;
    iconColor = "text-blue-500";
    bgLight = "bg-blue-50";
  } else if (lowerTrigger.includes("double click")) {
    Icon = Fingerprint;
    iconColor = "text-indigo-500";
    bgLight = "bg-indigo-50";
  } else if (lowerTrigger.includes("triple click")) {
    Icon = Fingerprint;
    iconColor = "text-purple-500";
    bgLight = "bg-purple-50";
  } else if (lowerTrigger.includes("5× click") && !lowerTrigger.includes("hold")) {
    Icon = Sparkles;
    iconColor = "text-amber-500";
    bgLight = "bg-amber-50";
  } else if (lowerTrigger.includes("long press")) {
    Icon = Power;
    iconColor = "text-rose-500";
    bgLight = "bg-rose-50";
  } else if (lowerTrigger.includes("3× click + hold")) {
    Icon = RotateCcw;
    iconColor = "text-emerald-500";
    bgLight = "bg-emerald-50";
  } else if (lowerTrigger.includes("5× click + hold")) {
    Icon = Usb;
    iconColor = "text-cyan-500";
    bgLight = "bg-cyan-50";
  } else if (lowerTrigger.includes("swipe up") || lowerTrigger.includes("upper")) {
    Icon = ChevronsUp;
    iconColor = "text-teal-500";
    bgLight = "bg-teal-50";
  } else if (lowerTrigger.includes("swipe down") || lowerTrigger.includes("lower")) {
    Icon = ChevronsDown;
    iconColor = "text-orange-500";
    bgLight = "bg-orange-50";
  }

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (lowerTrigger.includes("single click")) {
      setClickCount(1);
      setTimeout(() => {
        setClickCount(0);
        setIsAnimating(false);
      }, 400);
    } else if (lowerTrigger.includes("double click")) {
      setClickCount(1);
      setTimeout(() => {
        setClickCount(2);
        setTimeout(() => {
          setClickCount(0);
          setIsAnimating(false);
        }, 300);
      }, 150);
    } else if (lowerTrigger.includes("triple click")) {
      setClickCount(1);
      setTimeout(() => {
        setClickCount(2);
        setTimeout(() => {
          setClickCount(3);
          setTimeout(() => {
            setClickCount(0);
            setIsAnimating(false);
          }, 250);
        }, 120);
      }, 120);
    } else if (lowerTrigger.includes("5× click") && !lowerTrigger.includes("hold")) {
      let c = 1;
      setClickCount(1);
      const interval = setInterval(() => {
        c++;
        if (c <= 5) {
          setClickCount(c);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setClickCount(0);
            setIsAnimating(false);
          }, 200);
        }
      }, 90);
    } else if (lowerTrigger.includes("hold") || lowerTrigger.includes("long press")) {
      let start = Date.now();
      const duration = 1500;
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const ratio = Math.min(elapsed / duration, 1);
        setLongPressProgress(ratio);
        if (ratio >= 1) {
          clearInterval(interval);
          setClickCount(1);
          setTimeout(() => {
            setClickCount(0);
            setLongPressProgress(0);
            setIsAnimating(false);
          }, 300);
        }
      }, 16);
    } else if (lowerTrigger.includes("swipe up") || lowerTrigger.includes("swipe down")) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  const shouldFlash = clickCount > 0 && (
    lowerTrigger.includes("double") ||
    lowerTrigger.includes("triple") ||
    lowerTrigger.includes("5×")
  );

  return (
    <div
      onClick={triggerAnimation}
      className="group/item flex items-center justify-between p-3.5 rounded-2xl border border-neutral-100 bg-white hover:bg-neutral-50/50 hover:border-neutral-200 hover:shadow-sm transition-all duration-200 cursor-pointer select-none"
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl ${bgLight} shrink-0 transition-all duration-150 group-hover/item:scale-105 ${isAnimating ? "scale-95" : ""}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
          {shouldFlash && (
            <span className={`absolute inset-0 rounded-xl border border-current opacity-60 animate-ping ${iconColor}`} />
          )}
          {isAnimating && lowerTrigger.includes("swipe up") && (
            <span className="absolute -top-1 text-teal-500 text-[10px] animate-bounce font-mono">▲</span>
          )}
          {isAnimating && lowerTrigger.includes("swipe down") && (
            <span className="absolute -bottom-1 text-orange-500 text-[10px] animate-bounce font-mono">▼</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-bold text-neutral-800">
              {trigger}
            </span>
            {lowerTrigger.includes("double") || lowerTrigger.includes("2x") ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                Double
              </span>
            ) : lowerTrigger.includes("single") ? (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                Single
              </span>
            ) : null}
          </div>
          <div className="text-[13px] text-neutral-500 font-medium mt-0.5 leading-snug">
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SolutionFlowProps {
  content: string;
  key?: React.Key;
}

export function SolutionFlow({ content }: SolutionFlowProps) {
  // Parse steps by splitting on → or -> or \n
  const steps = content
    .split(/→|->/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0);

  return (
    <div className="my-8 bg-neutral-50/80 border border-neutral-200/60 rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-50/40 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={16} className="text-amber-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">
          Solution Workflow
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 relative">
        {steps.map((step, index) => {
          let IconComponent = Cpu;
          let iconColorClass = "text-indigo-600 bg-indigo-50 border-indigo-100";
          const lower = step.toLowerCase();
          
          if (lower.includes("recording") || lower.includes("record") || lower.includes("touch") || lower.includes("mic") || lower.includes("one-touch")) {
            IconComponent = Mic;
            iconColorClass = "text-sky-600 bg-sky-50 border-sky-100";
          } else if (lower.includes("ai") || lower.includes("generate") || lower.includes("minute") || lower.includes("task")) {
            IconComponent = Cpu;
            iconColorClass = "text-violet-600 bg-violet-50 border-violet-100";
          } else if (lower.includes("push") || lower.includes("send") || lower.includes("team") || lower.includes("auto-push") || lower.includes("auto-pushed")) {
            IconComponent = Send;
            iconColorClass = "text-emerald-600 bg-emerald-50 border-emerald-100";
          }

          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex-1 flex flex-col items-start p-5 bg-white border border-neutral-200/80 rounded-xl relative hover:border-neutral-300 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-center justify-between w-full mb-3.5">
                  <span className="text-xs font-bold font-mono text-neutral-400 group-hover:text-neutral-600 transition-colors">
                    STEP {stepNumber}
                  </span>
                  <div className={`p-2 rounded-lg border ${iconColorClass} transition-transform group-hover:scale-110 duration-200`}>
                    <IconComponent size={16} />
                  </div>
                </div>
                
                <p className="text-neutral-800 font-sans text-sm font-medium leading-relaxed">
                  {step}
                </p>
              </div>

              {/* Connector (Arrow) */}
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center self-center py-2 md:py-0 shrink-0 select-none">
                  <ArrowRight size={18} className="text-neutral-300 hidden md:block animate-pulse" />
                  <ArrowDown size={18} className="text-neutral-300 md:hidden animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeInstallTab, setActiveInstallTab] = useState<"npm" | "pnpm" | "pip">("npm");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Robust nested micro-parser for inline elements: **bold**, `code`, [link](url), [image:url|alt]
  const parseInlineContent = (text: string, keyPrefix: string): React.ReactNode[] | string => {
    const bRegex = /\*\*([^*]+)\*\*/g;
    const cRegex = /`([^`]+)`/g;
    const lRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const imgRegex = /\[image:([^|\]]+)(?:\|([^\]]+))?\]/g;
    
    const allMatches: { type: "link" | "code" | "bold" | "image"; index: number; length: number; content: any }[] = [];
    let match;

    while ((match = bRegex.exec(text)) !== null) {
      allMatches.push({ type: "bold", index: match.index, length: match[0].length, content: match[1] });
    }
    while ((match = cRegex.exec(text)) !== null) {
      allMatches.push({ type: "code", index: match.index, length: match[0].length, content: match[1] });
    }
    while ((match = lRegex.exec(text)) !== null) {
      allMatches.push({ type: "link", index: match.index, length: match[0].length, content: { text: match[1], url: match[2] } });
    }
    while ((match = imgRegex.exec(text)) !== null) {
      allMatches.push({ type: "image", index: match.index, length: match[0].length, content: { url: match[1].trim(), alt: match[2] ? match[2].trim() : "图片预览" } });
    }

    if (allMatches.length === 0) {
      return text;
    }

    // Sort matches by appearance index
    allMatches.sort((a, b) => a.index - b.index);

    const components: React.ReactNode[] = [];
    let currentIndex = 0;

    for (let i = 0; i < allMatches.length; i++) {
      const m = allMatches[i];
      if (m.index < currentIndex) {
        continue; // Prevent overlapping / double parsing
      }
      if (m.index > currentIndex) {
        components.push(text.substring(currentIndex, m.index));
      }
      if (m.type === "bold") {
        components.push(
          <strong key={`${keyPrefix}-bold-${i}`} className="font-semibold text-neutral-900">
            {m.content}
          </strong>
        );
      } else if (m.type === "code") {
        components.push(
          <code key={`${keyPrefix}-code-${i}`} className="px-1.5 py-0.5 mx-0.5 rounded bg-neutral-100 border border-neutral-200/50 text-[12.5px] font-mono text-neutral-800">
            {m.content}
          </code>
        );
      } else if (m.type === "link") {
        components.push(
          <a
            key={`${keyPrefix}-link-${i}`}
            href={m.content.url}
            className="text-neutral-950 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors font-medium"
          >
            {m.content.text}
          </a>
        );
      } else if (m.type === "image") {
        components.push(
          <ImagePreviewToggle
            key={`${keyPrefix}-image-${i}`}
            url={m.content.url}
            alt={m.content.alt}
          />
        );
      }
      currentIndex = m.index + m.length;
    }

    if (currentIndex < text.length) {
      components.push(text.substring(currentIndex));
    }

    return components;
  };

  // Pre-process and render custom tabs blocks alongside code blocks
  const renderContent = (linesToRender?: string[], isNestedInGrid = false): React.ReactNode[] => {
    const blocks: React.ReactNode[] = [];
    const lines = linesToRender || content.split("\n");
    let inCodeBlock = false;
    let codeLanguage = "";
    let codeLines: string[] = [];
    let listItems: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    const seenIds: { [key: string]: number } = {};

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        // Check if this list represents physical controls
        const isControlList = listItems.every(item => {
          const lower = item.toLowerCase();
          return (
            lower.includes("click") ||
            lower.includes("press") ||
            lower.includes("hold") ||
            lower.includes("swipe") ||
            lower.includes("tap") ||
            lower.includes("when ") ||
            lower.includes("connected") ||
            lower.includes("disconnected")
          ) && item.includes(":") && !lower.includes("led");
        });

        if (isControlList) {
          blocks.push(
            <div key={`control-list-${key}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
              {listItems.map((item, idx) => {
                const parts = item.split(":");
                const triggerRaw = parts[0] || "";
                const actionRaw = parts.slice(1).join(":") || "";

                const triggerClean = triggerRaw.replace(/\*\*/g, "").replace(/\*/g, "").trim();
                const actionClean = actionRaw.trim();

                const parsedAction = parseInlineContent(actionClean, `control-action-${key}-${idx}`);

                return (
                  <InteractiveControlItem
                    key={idx}
                    trigger={triggerClean}
                    action={parsedAction}
                  />
                );
              })}
            </div>
          );
          listItems = [];
          return;
        }

        // Default list rendering
        blocks.push(
          <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-neutral-600 font-sans text-[14.5px]">
            {listItems.map((item, idx) => {
              const lower = item.toLowerCase();
              const hasColor = lower.includes("blue") || lower.includes("green") || lower.includes("purple") || lower.includes("cyan") || lower.includes("red") || lower.includes("white") || lower.includes("orange") || lower.includes("yellow") || lower.includes("led");
              const hasState = lower.includes("solid") || lower.includes("breathing") || lower.includes("flashing") || lower.includes("flash") || lower.includes("glow");
              
              if (hasColor && hasState) {
                // Determine color
                let dotColorClass = "bg-neutral-400";
                let glowClass = "shadow-[0_0_6px_rgba(115,115,115,0.4)]";

                if (lower.includes("blue")) {
                  dotColorClass = "bg-blue-500";
                  glowClass = "shadow-[0_0_10px_rgba(59,130,246,0.8)]";
                } else if (lower.includes("green")) {
                  dotColorClass = "bg-emerald-500";
                  glowClass = "shadow-[0_0_10px_rgba(16,185,129,0.8)]";
                } else if (lower.includes("purple")) {
                  dotColorClass = "bg-purple-500";
                  glowClass = "shadow-[0_0_10px_rgba(139,92,246,0.8)]";
                } else if (lower.includes("cyan")) {
                  dotColorClass = "bg-cyan-500";
                  glowClass = "shadow-[0_0_10px_rgba(6,182,212,0.8)]";
                } else if (lower.includes("red")) {
                  dotColorClass = "bg-rose-500";
                  glowClass = "shadow-[0_0_10px_rgba(244,63,94,0.8)]";
                } else if (lower.includes("white")) {
                  dotColorClass = "bg-white border border-neutral-300";
                  glowClass = "shadow-[0_0_8px_rgba(200,200,200,0.5)]";
                } else if (lower.includes("orange")) {
                  dotColorClass = "bg-amber-500";
                  glowClass = "shadow-[0_0_10px_rgba(245,158,11,0.8)]";
                } else if (lower.includes("yellow")) {
                  dotColorClass = "bg-yellow-400";
                  glowClass = "shadow-[0_0_10px_rgba(250,204,21,0.8)]";
                }

                let animClass = "";
                if (lower.includes("breathing")) {
                  animClass = "animate-pulse";
                }

                const isFlashing = lower.includes("flashing") || lower.includes("flash");

                return (
                  <li key={idx} className="list-none relative pl-6 leading-relaxed">
                    <div className="absolute left-0 top-[6px] flex items-center justify-center w-4 h-4 shrink-0">
                      {isFlashing ? (
                        <>
                          <span className={`absolute inline-flex h-3 w-3 rounded-full ${dotColorClass} opacity-75 animate-ping`} />
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass} ${glowClass}`} />
                        </>
                      ) : (
                        <span className={`inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass} ${glowClass} ${animClass}`} />
                      )}
                    </div>
                    {parseInlineContent(item, `li-${key}-${idx}`)}
                  </li>
                );
              }

              return (
                <li key={idx} className="leading-relaxed">
                  {parseInlineContent(item, `li-${key}-${idx}`)}
                </li>
              );
            })}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = (key: number) => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const rows = tableRows.slice(2); // Skip separator row at index 1

        blocks.push(
          <div key={`table-wrapper-${key}`} className="my-6 border border-neutral-200 rounded-2xl bg-white shadow-sm overflow-hidden w-full">
            <table className="w-full text-left border-collapse font-sans text-sm table-fixed">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  {headers.map((header, idx) => (
                    <th
                      key={idx}
                      className={`px-4 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider whitespace-normal ${getColWidthClass(header, idx, headers.length)}`}
                    >
                      {header.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-neutral-50/40 transition-all"
                  >
                    {row.map((cell, cellIdx) => {
                      const trimmedCell = cell.trim();
                      const headerLower = headers[cellIdx]?.trim().toLowerCase() || "";
                      const isLedColumn = headerLower.includes("led") || headerLower.includes("灯");
                      const ledIndicator = isLedColumn ? getLedIndicator(trimmedCell) : null;

                      return (
                        <td
                          key={cellIdx}
                          className="px-4 py-3 text-neutral-600 leading-relaxed whitespace-normal text-[13px]"
                        >
                          {ledIndicator ? (
                            <div className="flex items-start gap-2 pt-0.5">
                              {ledIndicator}
                              <span className="break-words">{parseInlineContent(trimmedCell, `cell-${key}-${rowIdx}-${cellIdx}`)}</span>
                            </div>
                          ) : (
                            <span className="break-words">{parseInlineContent(trimmedCell, `cell-${key}-${rowIdx}-${cellIdx}`)}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Grid columns block
      if (line.trim() === "::: grid") {
        flushList(i);
        flushTable(i);

        let gridLines: string[] = [];
        let j = i + 1;
        while (j < lines.length && lines[j].trim() !== "::: grid-end") {
          gridLines.push(lines[j]);
          j++;
        }
        i = j; // advance outer loop index

        const cols: string[][] = [];
        let currentColLines: string[] = [];
        let inCol = false;

        for (let k = 0; k < gridLines.length; k++) {
          const colLine = gridLines[k];
          if (colLine.trim() === "::: col") {
            if (inCol) {
              cols.push(currentColLines);
            }
            inCol = true;
            currentColLines = [];
          } else if (colLine.trim() === "::: col-end") {
            if (inCol) {
              cols.push(currentColLines);
              inCol = false;
            }
          } else {
            if (inCol) {
              currentColLines.push(colLine);
            }
          }
        }
        if (inCol && currentColLines.length > 0) {
          cols.push(currentColLines);
        }

        blocks.push(
          <div key={`grid-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 w-full">
            {cols.map((colLines, colIdx) => (
              <div key={`grid-col-${i}-${colIdx}`} className="flex flex-col w-full">
                {renderContent(colLines, true)}
              </div>
            ))}
          </div>
        );
        continue;
      }

      // Code blocks start/end
      if (line.trim().startsWith("```")) {
        flushList(i);
        flushTable(i);

        if (inCodeBlock) {
          // Close block
          const codeString = codeLines.join("\n");
          const lang = codeLanguage;
          
          // Check if this is the dynamic installer code block
          // If so, we conditionally hide/show based on the selected tab
          const shouldShowBlock = 
            (lang === "bash" && codeString.includes("npm install") && activeInstallTab === "npm") ||
            (lang === "bash" && codeString.includes("pnpm install") && activeInstallTab === "pnpm") ||
            (lang === "bash" && codeString.includes("pip install") && activeInstallTab === "pip") ||
            !(codeString.includes("npm install") || codeString.includes("pnpm install") || codeString.includes("pip install"));

          if (shouldShowBlock) {
            if (lang === "flow" || lang === "solution-flow" || lang === "solution") {
              blocks.push(
                <SolutionFlow key={`flow-${i}`} content={codeString} />
              );
            } else {
              blocks.push(
                <div key={`code-${i}`} className="relative group my-5 rounded-xl border border-neutral-200 bg-neutral-900 shadow-sm overflow-hidden font-mono text-sm leading-relaxed">
                  <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/80 border-b border-neutral-800 text-xs text-neutral-400">
                    <span>{lang.toUpperCase() || "CODE"}</span>
                    <button
                      onClick={() => handleCopy(codeString)}
                      className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 rounded"
                    >
                      {copiedText === codeString ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-neutral-200 text-[13px] font-mono leading-relaxed select-text">
                    <code>{codeString}</code>
                  </pre>
                </div>
              );
            }
          }

          codeLines = [];
          inCodeBlock = false;
        } else {
          // Open block
          codeLanguage = line.trim().slice(3);
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // Check dynamic interactive Tabs component in markdown
      if (line.trim().startsWith("<Tabs>")) {
        flushList(i);
        flushTable(i);
        continue;
      }
      if (line.trim().startsWith("<Tab ")) {
        // Parse: <Tab id="npm">Node.js (npm)</Tab>
        const tabIdMatch = line.match(/id="([^"]+)"/);
        const tabLabelMatch = line.match(/>([^<]+)</);
        const tabId = tabIdMatch ? tabIdMatch[1] : "";

        // Collect all tabs to render them together
        if (tabId === "npm") {
          blocks.push(
            <div key={`tabs-header-${i}`} className="flex border-b border-neutral-200/80 mb-4 mt-6">
              {(["npm", "pnpm", "pip"] as const).map((tab) => {
                const label = tab === "npm" ? "Node.js (npm)" : tab === "pnpm" ? "Pnpm (Recommended)" : "Python (pip)";
                const isActive = activeInstallTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveInstallTab(tab)}
                    className={`px-5 py-2.5 font-sans font-medium text-sm border-b-2 -mb-[2px] transition-all cursor-pointer ${
                      isActive
                        ? "border-neutral-900 text-neutral-900 font-semibold"
                        : "border-transparent text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          );
        }
        continue;
      }
      if (line.trim().startsWith("</Tabs>")) {
        continue;
      }

      // Table parsing
      if (line.trim().startsWith("|")) {
        flushList(i);
        inTable = true;
        const trimmedLine = line.trim();
        const hasTrailingPipe = trimmedLine.endsWith("|");
        const rawColumns = trimmedLine.split("|");
        const columns = rawColumns
          .map((c) => c.trim())
          .filter((_, idx, arr) => {
            if (idx === 0) return false;
            if (hasTrailingPipe && idx === arr.length - 1) return false;
            if (!hasTrailingPipe && idx === arr.length - 1 && arr[idx] === "") return false;
            return true;
          });
        tableRows.push(columns);
        continue;
      } else {
        if (inTable) {
          flushTable(i);
        }
      }

      // Lists
      if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const itemContent = line.trim().substring(2);
        listItems.push(itemContent);
        continue;
      } else {
        flushList(i);
      }

      // Images
      if (line.trim().startsWith("![") && line.trim().endsWith(")")) {
        flushList(i);
        flushTable(i);
        const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        const matches: { alt: string; url: string }[] = [];
        let m;
        while ((m = imgRegex.exec(line)) !== null) {
          matches.push({ alt: m[1], url: m[2] });
        }

        if (matches.length === 1) {
          blocks.push(
            <ClickableMarkdownImage 
              key={`img-${i}`} 
              url={matches[0].url} 
              alt={matches[0].alt} 
              className={isNestedInGrid ? "my-4 w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm" : undefined}
            />
          );
          continue;
        } else if (matches.length > 1) {
          blocks.push(
            <div key={`img-grid-${i}`} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 w-full">
              {matches.map((img, idx) => (
                <ClickableMarkdownImage 
                  key={`img-grid-${i}-${idx}`} 
                  url={img.url} 
                  alt={img.alt} 
                  className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 shadow-sm flex flex-col h-full"
                />
              ))}
            </div>
          );
          continue;
        }
      }

      // Headings
      if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ") || line.startsWith("#### ") || line.startsWith("##### ") || line.startsWith("###### ")) {
        flushList(i);
        flushTable(i);

        let level = 0;
        let titleText = "";
        if (line.startsWith("# ")) {
          titleText = line.substring(2).trim();
          level = 1;
        } else if (line.startsWith("## ")) {
          titleText = line.substring(3).trim();
          level = 2;
        } else if (line.startsWith("### ")) {
          titleText = line.substring(4).trim();
          level = 3;
        } else if (line.startsWith("#### ")) {
          titleText = line.substring(5).trim();
          level = 4;
        } else if (line.startsWith("##### ")) {
          titleText = line.substring(6).trim();
          level = 5;
        } else if (line.startsWith("###### ")) {
          titleText = line.substring(7).trim();
          level = 6;
        }

        let baseId = titleText.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-");
        if (!baseId) {
          baseId = "section";
        }
        let elementId = baseId;
        if (seenIds[baseId] !== undefined) {
          seenIds[baseId]++;
          elementId = `${baseId}-${seenIds[baseId]}`;
        } else {
          seenIds[baseId] = 0;
        }

        let customClass = "";
        if (elementId === "from-cost-center-to-profit-center") {
          customClass = " !text-[18px] !leading-[24px]";
        } else if (elementId === "why-businesses-choose-us-the-roi-factors") {
          customClass = " !text-[16px]";
        }

        if (level === 1) {
          blocks.push(
            <h1
              id={elementId}
              key={i}
              className={`text-3xl font-extrabold tracking-tight text-neutral-900 mt-12 mb-6 border-b border-neutral-100 pb-3 font-sans group relative${customClass}`}
            >
              <a href={`#${elementId}`} className="absolute -left-5 opacity-0 group-hover:opacity-60 text-neutral-400 transition-opacity font-normal pr-2">#</a>
              {titleText}
            </h1>
          );
        } else if (level === 2) {
          blocks.push(
            <h2
              id={elementId}
              key={i}
              className="text-2xl font-bold tracking-tight text-neutral-900 mt-10 mb-4 border-b border-neutral-100 pb-2 font-sans group relative"
            >
              <a href={`#${elementId}`} className="absolute -left-5 opacity-0 group-hover:opacity-60 text-neutral-400 transition-opacity font-normal pr-2">#</a>
              {titleText}
            </h2>
          );
        } else if (level === 3) {
          blocks.push(
            <h3
              id={elementId}
              key={i}
              className={`text-lg font-bold tracking-tight text-neutral-900 mt-8 mb-3 font-sans group relative${customClass}`}
            >
              <a href={`#${elementId}`} className="absolute -left-5 opacity-0 group-hover:opacity-60 text-neutral-400 transition-opacity font-normal pr-2">#</a>
              {titleText}
            </h3>
          );
        } else if (level === 4) {
          blocks.push(
            <h4
              id={elementId}
              key={i}
              className="text-base font-bold tracking-tight text-neutral-900 mt-6 mb-2 font-sans"
            >
              {titleText}
            </h4>
          );
        } else if (level === 5) {
          blocks.push(
            <h5
              id={elementId}
              key={i}
              className="text-sm font-bold text-neutral-800 mt-4 mb-2 font-sans"
            >
              {titleText}
            </h5>
          );
        } else if (level === 6) {
          blocks.push(
            <h6
              id={elementId}
              key={i}
              className="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-4 mb-2 font-sans"
            >
              {titleText}
            </h6>
          );
        }
        continue;
      }

      // Alerts / Tips callout boxes
      if (line.startsWith("::: ")) {
        continue;
      }

      // Horizontal dividers
      if (line.trim() === "---") {
        blocks.push(<hr key={i} className="my-8 border-neutral-200/60" />);
        continue;
      }

      // Normal Paragraphs
      if (line.trim() !== "") {
        let text = line.trim();
        const renderedText = parseInlineContent(text, `p-${i}`);

        // Custom blockquote rendering if line starts with >
        if (text.startsWith(">")) {
          const blockquoteText = text.substring(1).trim();
          let icon = <Info size={16} className="text-neutral-500 mt-0.5" />;
          let alertBg = "bg-neutral-50 border-neutral-400 text-neutral-700";
          
          if (blockquoteText.startsWith("[!IMPORTANT]")) {
            icon = <Lightbulb size={16} className="text-amber-500 mt-0.5" />;
            alertBg = "bg-amber-50/50 border-amber-500/80 text-neutral-800";
          } else if (blockquoteText.startsWith("[!CAUTION]") || blockquoteText.startsWith("[!WARNING]")) {
            icon = <AlertTriangle size={16} className="text-rose-500 mt-0.5" />;
            alertBg = "bg-rose-50/40 border-rose-500/80 text-neutral-800";
          }

          const cleanText = blockquoteText
            .replace("[!IMPORTANT]", "")
            .replace("[!CAUTION]", "")
            .replace("[!WARNING]", "")
            .trim();

          blocks.push(
            <div key={i} className={`flex gap-3.5 px-5 py-4 border-l-4 rounded-r-xl my-5 ${alertBg} font-sans text-sm leading-relaxed`}>
              <div className="shrink-0">{icon}</div>
              <div className="flex-1">
                {parseInlineContent(cleanText, `bq-${i}`)}
              </div>
            </div>
          );
        } else {
          blocks.push(
            <div key={i} className={`text-neutral-600 font-sans leading-relaxed ${isNestedInGrid ? "my-1.5 text-[14px]" : "my-4 text-[14.5px]"}`}>
              {renderedText}
            </div>
          );
        }
      }
    }

    // Flush any remaining lists or tables
    flushList(lines.length);
    flushTable(lines.length);

    return blocks;
  };

  return <div className="prose max-w-none text-neutral-800">{renderContent()}</div>;
}
