import React, { useState, useEffect } from "react";
import { DocSection } from "../docsData";
import MarkdownRenderer from "./MarkdownRenderer";
import { Clock, ThumbsUp, ThumbsDown, Share2, Check, ArrowLeft, ArrowRight, MessageSquareCode, SlidersHorizontal, Scale, Cpu, BookOpen, LifeBuoy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ModelComparer from "./ModelComparer";
import FirmwareUpdate from "./FirmwareUpdate";
import DeviceParameters from "./DeviceParameters";
import FAQView from "./FAQView";

interface DocViewProps {
  doc: DocSection;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onSwitchToAi: () => void;
  selectedMicModels?: string[];
  onMicModelToggle?: (model: string) => void;
}

export default function DocView({ 
  doc, 
  onNavigatePrev, 
  onNavigateNext, 
  hasPrev, 
  hasNext,
  onSwitchToAi,
  selectedMicModels,
  onMicModelToggle
}: DocViewProps) {
  const [shareCopied, setShareCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "guides" | "firmware" | "support">("overview");

  // Reset page-specific states on document changes
  useEffect(() => {
    setReadingProgress(0);
    setIsCompareOpen(false);
    setActiveSubTab("overview");
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [doc]);

  // Handle tracking reading progress based on document scroll
  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight > 0) {
        const scrolled = (element.scrollTop / totalHeight) * 100;
        setReadingProgress(Math.min(scrolled, 100));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [doc]);

  // Extract headings from raw markdown for Table of Contents
  const extractHeadings = (text: string) => {
    const headings: { id: string; text: string; level: number }[] = [];
    const lines = text.split("\n");
    let inCodeBlock = false;
    const seenIds: { [key: string]: number } = {};

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;

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

      if (level > 0) {
        let baseId = titleText.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-");
        if (!baseId) {
          baseId = "section";
        }
        let id = baseId;
        if (seenIds[baseId] !== undefined) {
          seenIds[baseId]++;
          id = `${baseId}-${seenIds[baseId]}`;
        } else {
          seenIds[baseId] = 0;
        }
        headings.push({ id, text: titleText, level });
      }
    }
    return headings;
  };

  // Helper to split the markdown content dynamically (e.g. moving introduction / overview section)
  const getContentParts = (content: string) => {
    let intro = "";
    let main = content;

    // Pattern 1: Split at "### Quick Start Guide" first if present
    let splitIndex = content.indexOf("### Quick Start Guide");
    if (splitIndex === -1) {
      splitIndex = content.indexOf("### 5. ");
    }
    if (splitIndex === -1) {
      splitIndex = content.indexOf("### 4. ");
    }
    if (splitIndex === -1) {
      splitIndex = content.indexOf("### 3. ");
    }
    
    if (splitIndex !== -1) {
      intro = content.substring(0, splitIndex).trim();
      if (intro.endsWith("---")) {
        intro = intro.slice(0, -3).trim();
      }
      main = content.substring(splitIndex).trim();
    } else {
      // Pattern 2: Split at "### Technical Specifications"
      const splitIndexSpecs = content.indexOf("### Technical Specifications");
      if (splitIndexSpecs !== -1) {
        intro = content.substring(0, splitIndexSpecs).trim();
        if (intro.endsWith("---")) {
          intro = intro.slice(0, -3).trim();
        }
        main = content.substring(splitIndexSpecs).trim();
      }
    }

    return { intro, main };
  };

  const { intro: introContent, main: mainContent } = getContentParts(doc.content);

  // Helper to dynamically adjust heading numbers so they start from 1
  const adjustHeadingNumbers = (text: string) => {
    const regex = /^### (\d+)\.\s+/gm;
    let match;
    let minNum = Infinity;
    while ((match = regex.exec(text)) !== null) {
      const num = parseInt(match[1], 10);
      if (num < minNum) {
        minNum = num;
      }
    }

    if (minNum !== Infinity && minNum > 1) {
      const shift = minNum - 1;
      return text.replace(/^### (\d+)\.\s+/gm, (m, p1) => {
        const num = parseInt(p1, 10);
        return `### ${num - shift}. `;
      });
    }
    return text;
  };

  const adjustedMainContent = adjustHeadingNumbers(mainContent);

  const firmwareContent = doc.id === "ha-mic06b" ? `#### Firmware Upgrade Steps

Regular firmware updates ensure your HA-MIC06B device operates with the latest features and optimizations.

##### Prerequisites
* Your MIC06B device must be connected to a 2.4GHz or 5GHz WiFi network
* Ensure your device has at least 50% battery charge
* Make sure the device is within good WiFi signal range

##### Update Procedure
###### Step 1: Configure WiFi Connection
Before updating firmware, make sure your device is properly connected to WiFi by following the WiFi Configuration instructions above.

###### Step 2: Initiate Firmware Update
* Ensure your device is powered on and connected to WiFi
* Quickly press the Front Button 5 times in succession
* The device will automatically check for available updates

###### Step 3: Monitor Update Progress
The LED indicator provides real-time feedback on the update process:

| LED Status | Meaning | Action Required |
|---|---|---|
| **Flashing White** | Firmware update in progress | Do not turn off or reset the device during this process |
| **Flashing Red** | WiFi issue or update failed | Check your WiFi connection and try again |

###### Step 4: Update Completion
When the update process completes successfully:
* The device will automatically restart
* The LED will return to its normal state
* Your device will be ready to use with the latest firmware improvements

##### Troubleshooting
If your firmware update fails (indicated by flashing red LED):
* Check that your WiFi network is operating on a supported 2.4GHz or 5GHz band
* Ensure your WiFi signal is strong where the device is located
* Verify your WiFi network has internet access
* Try moving closer to your WiFi router
* Restart your device and try the update process again

##### Method 2: Product Flashing (Windows)
This method is suitable for advanced users or when the online update is not available.

###### Preparations Before Starting
Required Items:
* A computer running the Windows operating system (supports Windows 7/8/10/11)
* Original USB data cable
* Device to be flashed
* Flashing program corresponding to the device (.exe file)
* 📥 [Download Flashing Program](https://ota-api.hearit.ai/files/MIC06B)

Notes:
* Ensure the computer has sufficient battery power to avoid power failure during operation
* Use the original USB data cable to ensure connection stability
* Disable antivirus software and firewalls on the computer before flashing to prevent interference with program operation
* Do not disconnect the USB connection or close the flashing program during the flashing process

###### Flashing Steps
###### Step 1: Enter Update Mode
* Press the Front Button 5 times quickly, then hold for 3 seconds to enter flashing mode
* The device will display a specific LED pattern to confirm entry into update mode
* Connect the HA-MIC06B to your computer via USB cable

###### Step 2: Launch the Flashing Program
* Locate the flashing .exe file corresponding to the device
* Double-click the file to launch the flashing program
* Wait for the program to load completely (the main program interface usually appears)

###### Step 3: Connect the Device
* Ensure the USB connection is secure between your computer and the device
* The flashing program should automatically detect the device
* Confirm the connection status displayed on the program interface

![Step 3: Device Connected](https://iili.io/CApFWSp.png)

###### Step 4: Automatic Flashing Process
* The flashing program will automatically begin the firmware update
* The program interface will display the connection status and flashing progress
* Wait for the flashing to complete; do not perform any operations during this period

![Step 4: Automatic Flashing Process](https://iili.io/CApFMKv.png)

###### Step 5: Manually Trigger Flashing (If Automatic Flashing Does Not Start)
* If the program does not start flashing automatically, check whether the device entered update mode correctly
* Find and click the "Update Mode" or "Start Flashing" button in the flashing program interface
* Observe the progress bar displayed on the program interface and wait for the flashing to complete

###### Completion and Verification
* After successful flashing, the program will display a prompt message such as "Flashing Completed" or "Success"
* The device will restart automatically or prompt that it can be disconnected
* Disconnect the USB connection and check if the device can start normally
* If the device starts normally, the flashing is successful` : doc.id === "ha-mic01b" ? `#### Device Information
* **Product Model**: HA-MIC01B
* **Device Guide**: MIC01B User Guide

#### Firmware Update Methods
We regularly release new firmware to optimize performance and add new features. You can update your device using one of the following methods:

##### Method 1: Product Flashing (Windows)
This method is suitable for advanced users or when the online update is not available.

###### Preparations Before Starting
Required Items:
* A computer running the Windows operating system (supports Windows 7/8/10/11)
* Original USB data cable
* Device to be flashed
* Flashing program corresponding to the device (.exe file)
* 📥 [Download Flashing Program](https://ota-api.hearit.ai/files/MIC01B)

Notes:
* Ensure the computer has sufficient battery power to avoid power failure during operation
* Use the original USB data cable to ensure connection stability
* Disable antivirus software and firewalls on the computer before flashing to prevent interference with program operation
* Do not disconnect the USB connection or close the flashing program during the flashing process

###### Flashing Steps
###### Step 1: Prepare the Device
* Ensure your device is charged (at least 50% battery)
* Power on the device if it's not already on
* Connect the device to your computer via USB cable
* The device should be recognized as a USB device

###### Step 2: Launch the Flashing Program
* Locate the flashing .exe file corresponding to the device
* Double-click the file to launch the flashing program
* Wait for the program to load completely (the main program interface usually appears)

###### Step 3: Device Detection
* Ensure the USB connection is secure between your computer and the device
* The flashing program should automatically detect the device
* Confirm the connection status displayed on the program interface flashing-mode

###### Step 4: Automatic Flashing Process
* The flashing program will automatically begin the firmware update
* The program interface will display the connection status and flashing progress
* Wait for the flashing to complete; do not perform any operations during this period Flashing-completed

###### Step 5: Manually Trigger Flashing (If Automatic Flashing Does Not Start)
* If the program does not start flashing automatically, check the USB connection
* Find and click the "Update Mode" or "Start Flashing" button in the flashing program interface
* Observe the progress bar displayed on the program interface and wait for the flashing to complete

###### Completion and Verification
* After successful flashing, the program will display a prompt message such as "Flashing Completed" or "Success"
* The device will restart automatically or prompt that it can be disconnected
* Disconnect the USB connection and check if the device can start normally
* If the device starts normally, the flashing is successful` : "";

  const currentContent = ["microphone-devices", "telalive-series", "wearable-devices"].includes(doc.category)
    ? (activeSubTab === "overview" ? introContent : (activeSubTab === "guides" ? adjustedMainContent : (activeSubTab === "firmware" ? firmwareContent : "")))
    : doc.content;

  const headings = extractHeadings(currentContent);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?doc=${doc.id}`;
    navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "company":
        return "Introduction";
      case "microphone-devices":
        return "Microphone Devices";
      case "telalive-series":
        return "Telalive Series";
      case "wearable-devices":
        return "Wearable Devices";
      case "solutions":
        return "AI Demo Navigation";
      case "support":
        return "FAQ";
      default:
        return "Docs";
    }
  };

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset to account for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const isSubTabbed = ["microphone-devices", "telalive-series", "wearable-devices"].includes(doc.category);

  const handlePrevClick = () => {
    if (isSubTabbed) {
      if (activeSubTab === "support") {
        setActiveSubTab("firmware");
        window.scrollTo(0, 0);
      } else if (activeSubTab === "firmware") {
        setActiveSubTab("guides");
        window.scrollTo(0, 0);
      } else if (activeSubTab === "guides") {
        setActiveSubTab("overview");
        window.scrollTo(0, 0);
      } else {
        onNavigatePrev();
      }
    } else {
      onNavigatePrev();
    }
  };

  const handleNextClick = () => {
    if (isSubTabbed) {
      if (activeSubTab === "overview") {
        setActiveSubTab("guides");
        window.scrollTo(0, 0);
      } else if (activeSubTab === "guides") {
        setActiveSubTab("firmware");
        window.scrollTo(0, 0);
      } else if (activeSubTab === "firmware") {
        setActiveSubTab("support");
        window.scrollTo(0, 0);
      } else {
        onNavigateNext();
      }
    } else {
      onNavigateNext();
    }
  };

  const showPrev = !isSubTabbed ? hasPrev : (activeSubTab !== "overview" || hasPrev);
  const showNext = !isSubTabbed ? hasNext : (activeSubTab !== "support" || hasNext);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative select-text">
      {/* Top sticky scroll-progress indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-100 z-50">
        <div 
          className="h-full bg-neutral-900 transition-all duration-100" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main content body (9 cols on XL, 12 on smaller) */}
      <div className="xl:col-span-9 space-y-8 pb-16">
        
        {/* Breadcrumb path & Compare Models toggle button */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-neutral-100/40">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-sans">
            <span>Hearit.ai Docs</span>
            <span>/</span>
            <span>{getCategoryLabel(doc.category)}</span>
            <span>/</span>
            <span className="text-neutral-600 font-medium">{doc.title}</span>
          </div>

          {["microphone-devices", "telalive-series", "wearable-devices"].includes(doc.category) && (activeSubTab === "overview" || activeSubTab === "guides") && (
            <button
              onClick={() => setIsCompareOpen(!isCompareOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                isCompareOpen
                  ? "bg-neutral-900 border-neutral-900 text-white shadow-sm"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
              }`}
            >
              <Scale size={13} className={isCompareOpen ? "animate-pulse" : ""} />
              <span>{isCompareOpen ? "Hide Comparison" : "Compare Models"}</span>
            </button>
          )}
        </div>

        {/* AnimatePresence for ModelComparer */}
        <AnimatePresence>
          {isCompareOpen && ["microphone-devices", "telalive-series", "wearable-devices"].includes(doc.category) && (activeSubTab === "overview" || activeSubTab === "guides") && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ModelComparer category={doc.category} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Header */}
        <div className="space-y-3.5 border-b border-neutral-100 pb-6">
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight font-sans">
            {doc.title}
          </h1>
          <p className="text-neutral-500 font-sans text-[15px] leading-relaxed">
            {doc.subtitle}
          </p>
        </div>

        {/* Product Level Navigation Sub-Tabs */}
        {["microphone-devices", "telalive-series", "wearable-devices"].includes(doc.category) && (
          <div className="flex gap-1 border-b border-neutral-200 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => setActiveSubTab("overview")}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                activeSubTab === "overview"
                  ? "border-neutral-900 text-neutral-900 font-extrabold"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Product Overview</span>
            </button>
            <button
              onClick={() => setActiveSubTab("guides")}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                activeSubTab === "guides"
                  ? "border-neutral-900 text-neutral-900 font-extrabold"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <BookOpen size={14} />
              <span>User Guide</span>
            </button>
            <button
              id="firmware-tab-button"
              onClick={() => setActiveSubTab("firmware")}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                activeSubTab === "firmware"
                  ? "border-neutral-900 text-neutral-900 font-extrabold"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Cpu size={14} />
              <span>Firmware Update</span>
            </button>
            <button
              onClick={() => setActiveSubTab("support")}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
                activeSubTab === "support"
                  ? "border-neutral-900 text-neutral-900 font-extrabold"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <LifeBuoy size={14} />
              <span>Support</span>
            </button>
          </div>
        )}

        {/* Documentation Content Renderer */}
        <article className="min-h-[400px]">
          {!["microphone-devices", "telalive-series", "wearable-devices"].includes(doc.category) ? (
            <>
              <MarkdownRenderer content={doc.content} />
              {doc.id === "ticket-support" && (
                <SupportTicketForm />
              )}
            </>
          ) : activeSubTab === "overview" ? (
            <div className="space-y-8 animate-fadeIn">
              {introContent && (
                <div className="prose prose-neutral max-w-none">
                  <MarkdownRenderer content={introContent} />
                </div>
              )}
            </div>
          ) : activeSubTab === "guides" ? (
            <MarkdownRenderer content={adjustedMainContent} />
          ) : activeSubTab === "firmware" ? (
            <div className="space-y-8 animate-fadeIn">
              {(doc.id === "ha-mic06b" || doc.id === "ha-mic01b") && (
                <div className="prose prose-neutral max-w-none">
                  <MarkdownRenderer content={firmwareContent} />
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fadeIn">
              <FAQView docId={doc.id} />
            </div>
          )}
        </article>

        {/* Footer Navigation (Prev/Next Page Toggle) */}
        <div className="flex items-center justify-between pt-8 border-t border-neutral-100/80 mt-12 gap-4">
          {showPrev ? (
            <button
              onClick={handlePrevClick}
              className="flex items-center gap-2 text-xs font-sans font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 px-4 py-2.5 rounded-xl cursor-pointer transition-all active:scale-[0.98] bg-white shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {showNext ? (
            <button
              onClick={handleNextClick}
              className="flex items-center gap-2 text-xs font-sans font-medium text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2.5 rounded-xl cursor-pointer transition-all active:scale-[0.98] shadow-sm ml-auto"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Right Side Sticky outline (TOC) and Feedback widget (3 cols on XL) */}
      <div className="hidden xl:block xl:col-span-3 sticky top-10 max-h-[calc(100vh-80px)] overflow-y-auto pr-2 space-y-6 pt-4 scrollbar-thin">
        {/* Table of Contents */}
        {headings.length > 0 && (activeSubTab === "guides" || activeSubTab === "overview" || activeSubTab === "firmware") && (
          <div className="space-y-3 font-sans">
            <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
              Table of Contents
            </div>
            <nav className="space-y-2 border-l border-neutral-100">
              {headings
                .map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => scrollToHeading(heading.id, e)}
                    className={`block text-xs transition-all duration-150 py-1 border-l -ml-[1px] ${
                      heading.level <= 3 ? "pl-4 font-bold text-neutral-700 hover:text-neutral-950 border-transparent hover:border-neutral-400" :
                      heading.level === 4 ? "pl-7 text-[11.5px] font-medium text-neutral-500 hover:text-neutral-950 border-transparent hover:border-neutral-400" :
                      heading.level === 5 ? "pl-10 text-[10.5px] text-neutral-400 hover:text-neutral-800 border-transparent hover:border-neutral-300" :
                      "pl-12 text-[10px] text-neutral-400/80 hover:text-neutral-800 border-transparent hover:border-neutral-300"
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
            </nav>
          </div>
        )}

        {/* Share block */}
        <div className="space-y-4 pt-6 border-t border-neutral-100/80 font-sans">
          {/* Quick Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 w-full text-left text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors py-1 pl-1 cursor-pointer"
            >
              {shareCopied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-600 font-semibold">Link copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  <span>Share this page</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportTicketForm() {
  const [subject, setSubject] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [module, setModule] = useState("Cluster Coordination");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ caseId: string; responseTime: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const caseId = `CASE-${randomId}-AE`;
      let responseTime = "24 Hours";
      if (severity === "Critical") responseTime = "15 Minutes (Premium SLA)";
      else if (severity === "High") responseTime = "2 Hours";
      else if (severity === "Medium") responseTime = "6 Hours";

      setSubmittedData({ caseId, responseTime });
      setIsSubmitting(false);
    }, 1200);
  };

  if (submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-6 border border-emerald-100 bg-emerald-50/40 rounded-2xl space-y-4 font-sans"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
            ✓
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Support Ticket Created Successfully</h3>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">{submittedData.caseId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-emerald-100/60 p-4 rounded-xl text-xs">
          <div>
            <span className="text-neutral-400 block font-medium">Ticket Severity</span>
            <span className={`font-bold inline-block mt-1 px-2 py-0.5 rounded ${
              severity === "Critical" ? "bg-rose-50 text-rose-600" :
              severity === "High" ? "bg-amber-50 text-amber-600" : "bg-neutral-50 text-neutral-600"
            }`}>
              {severity}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Target Module</span>
            <span className="font-semibold text-neutral-800 inline-block mt-1">{module}</span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Guaranteed SLA Response</span>
            <span className="font-bold text-emerald-600 inline-block mt-1">{submittedData.responseTime}</span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed">
          An enterprise support engineer has been assigned to your case. You will receive real-time notifications directly to your registered team email (**gsrt1128@gmail.com**).
        </p>

        <button
          onClick={() => {
            setSubject("");
            setDescription("");
            setSubmittedData(null);
          }}
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-300 px-4 py-2 rounded-xl cursor-pointer transition-all"
        >
          Create Another Ticket
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-white border border-neutral-200/60 p-6 rounded-2xl shadow-sm font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Target Component/Module</label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="w-full text-xs bg-neutral-50 border border-neutral-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
          >
            <option>Cluster Coordination</option>
            <option>JS Sandbox</option>
            <option>Binary Port I/O</option>
            <option>Visual Dashboard</option>
            <option>Billing & Account</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Severity Level (SLA)</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full text-xs bg-neutral-50 border border-neutral-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Subject / Issue Title</label>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Briefly describe the issue (e.g., Replication stall on node-02)"
          className="w-full text-xs bg-neutral-50 border border-neutral-200/80 rounded-xl px-3.5 py-2.5 focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Detailed System Logs & Context</label>
        <textarea
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste relevant terminal logs, cluster configurations, or environmental setup context here..."
          className="w-full text-xs bg-neutral-50 border border-neutral-200/80 rounded-xl px-3.5 py-2.5 focus:outline-none focus:bg-white focus:border-neutral-900 transition-colors resize-none font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !subject.trim() || !description.trim()}
        className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 text-white font-semibold text-xs rounded-xl cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
            <span>Allocating SLA Engineer...</span>
          </>
        ) : (
          <span>Submit Support Ticket</span>
        )}
      </button>
    </form>
  );
}

