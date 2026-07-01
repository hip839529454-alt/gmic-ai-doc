import React, { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, HelpCircle, Sparkles, Mail, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQViewProps {
  docId?: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: "General" | "Recording" | "Hardware" | "Connectivity";
}

export default function FAQView({ docId }: FAQViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>("q1");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const mic06bFaqs: FAQItem[] = [
    {
      id: "q1",
      category: "General",
      question: "Q1: How do I switch between different AI modes?",
      answer: (
        <p className="leading-relaxed">
          Press the <strong className="text-neutral-950 font-semibold">Side Up Button once</strong> to cycle through available modes: <span className="inline-flex items-center gap-1">Translation Mode 🌍</span>, <span className="inline-flex items-center gap-1">Meeting Recorder 📓</span>, <span className="inline-flex items-center gap-1">Custom Model 🤖</span>, and <span className="inline-flex items-center gap-1">Note Taking Mode ✍️</span>. When connected to the App, you will hear a voice prompt confirming the mode change.
        </p>
      ),
    },
    {
      id: "q2",
      category: "Recording",
      question: "Q2: What is the difference between BLE Recording and Local Recording?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">There are two separate capture modes designed for different workflows:</p>
          <ul className="space-y-2 list-disc pl-4 text-neutral-600">
            <li>
              <strong className="text-neutral-800 font-semibold">BLE Recording (Single Click):</strong> Audio is streamed in real-time to the Hearit.AI App for AI processing. Requires App connection. LED shows green breathing.
            </li>
            <li>
              <strong className="text-neutral-800 font-semibold">Local Recording (Double Click):</strong> Audio is saved directly to the device's internal memory. Does not require App connection. LED shows cyan breathing. Files can be transferred via USB.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "q3",
      category: "Hardware",
      question: "Q3: How do I use the NFC reader?",
      answer: (
        <p className="leading-relaxed">
          Simply hold an NFC-enabled card (access card, transit card, or ID card) close to the device's NFC sensing area. The device will automatically detect the card and emit a notification sound. Check the App for read results. Supported card types include Type A (Mifare, NTAG), Type B (ID cards), and Felica (Japan transit cards).
        </p>
      ),
    },
    {
      id: "q4",
      category: "Hardware",
      question: "Q4: How does the gyroscope/motion sensing work?",
      answer: (
        <p className="leading-relaxed">
          The built-in 6-axis gyroscope detects device orientation and movement. It enables features like auto-wake when you pick up the device, smart sleep when idle, and motion-triggered actions. The gyroscope also supports automatic scene switching based on device orientation.
        </p>
      ),
    },
    {
      id: "q5",
      category: "Hardware",
      question: "Q5: How do I adjust the volume?",
      answer: (
        <p className="leading-relaxed">
          Swipe up or down on the capacitive touch area on the side of the device, or tap the upper/lower half of the touch zone. This works in all modes including Bluetooth audio, App mode, and Computer mode.
        </p>
      ),
    },
    {
      id: "q6",
      category: "Hardware",
      question: "Q6: How do I control music playback?",
      answer: (
        <div className="space-y-1.5">
          <p className="leading-relaxed">Use the <strong className="text-neutral-800 font-semibold">Side Down Button</strong>:</p>
          <ul className="list-disc pl-4 space-y-1 text-neutral-600">
            <li><strong className="text-neutral-800 font-semibold">Single Click:</strong> Play/Pause</li>
            <li><strong className="text-neutral-800 font-semibold">Double Click:</strong> Next track</li>
            <li><strong className="text-neutral-800 font-semibold">Triple Click:</strong> Previous track</li>
          </ul>
        </div>
      ),
    },
    {
      id: "q7",
      category: "Connectivity",
      question: "Q7: Why isn't my device connecting to Bluetooth?",
      answer: (
        <ul className="list-disc pl-4 space-y-1 text-neutral-600">
          <li>Ensure Bluetooth is enabled on your phone</li>
          <li>Check that the device is powered on and in pairing mode (blue LED slow flashing)</li>
          <li>Make sure you are within 10 meters of the device</li>
          <li>Try removing the device from your phone's Bluetooth list and re-pairing through the Hearit.AI App</li>
          <li>If issues persist, try a factory reset: <span className="font-semibold text-neutral-800">3× Click + Hold 3s</span> on the Front Button</li>
        </ul>
      ),
    },
    {
      id: "q8",
      category: "General",
      question: "Q8: How do I update the firmware?",
      answer: (
        <ul className="list-disc pl-4 space-y-2 text-neutral-600">
          <li>
            <strong className="text-neutral-800 font-semibold">WiFi OTA:</strong> Ensure the device is connected to WiFi, then 5× Click the Front Button. The device will check for updates and install automatically.
          </li>
          <li>
            <strong className="text-neutral-800 font-semibold">USB:</strong> 5× Click + Hold 3s on the Front Button to enter USB upgrade mode, then connect to your computer.
          </li>
        </ul>
      ),
    },
    {
      id: "q9",
      category: "General",
      question: "Q9: How do I perform a factory reset?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            Press the Front Button 3 times, then on the 3rd press, continue to hold for 3 seconds. The red LED will flash rapidly 10 times, and the device will restart with all settings restored to factory defaults.
          </p>
          <div className="flex gap-2 p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-xs text-amber-800 font-medium">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>Warning: Factory reset will clear all configuration data. Please use with caution.</span>
          </div>
        </div>
      ),
    },
    {
      id: "q10",
      category: "Connectivity",
      question: "Q10: Can I use the device as a USB microphone for my computer?",
      answer: (
        <p className="leading-relaxed">
          Yes! When you connect the HA-MIC06B to your computer via USB-C cable, it automatically works as both a USB storage device and a USB microphone. You can select it as an audio input device in meeting software (Zoom, Teams), recording software (Audacity), or system sound settings. The LED will show purple solid in Computer mode.
        </p>
      ),
    },
    {
      id: "q11",
      category: "General",
      question: "Q11: What makes the HA-MIC06B suitable for medical environments?",
      answer: (
        <p className="leading-relaxed">
          The HA-MIC06B is built with Plastic + PCBA material. Combined with NFC reader for patient ID scanning, AI noise reduction for clear voice capture in clinical settings, and comprehensive SDK support for EHR integration, it's specifically designed for healthcare professionals.
        </p>
      ),
    },
    {
      id: "q12",
      category: "Recording",
      question: "Q12: How does the AI noise reduction work?",
      answer: (
        <p className="leading-relaxed">
          The HA-MIC06B uses a hybrid microphone array (condenser + omnidirectional) combined with AI-powered noise reduction algorithms. The system intelligently identifies and filters ambient noise while precisely isolating and enhancing speech, maintaining high clarity even in challenging acoustic environments.
        </p>
      ),
    },
    {
      id: "q13",
      category: "General",
      question: "Q13: Can I use the device while charging?",
      answer: (
        <p className="leading-relaxed">
          Yes, all functions of the HA-MIC06B are available while charging via the USB Type-C cable.
        </p>
      ),
    },
    {
      id: "q14",
      category: "General",
      question: "Q14: The device won't power on. What should I do?",
      answer: (
        <ul className="list-disc pl-4 space-y-1 text-neutral-600">
          <li>First, connect the device to a charger for at least 10 minutes</li>
          <li>Try Long Press (3s) the Front Button again</li>
          <li>Check if the charging cable and port are working properly</li>
          <li>If the issue persists, contact our support team</li>
        </ul>
      ),
    },
  ];

  const mic01bFaqs: FAQItem[] = [
    {
      id: "q1",
      category: "General",
      question: "Q1: How do I switch between AI modes?",
      answer: (
        <p className="leading-relaxed">
          Single-press the <strong className="text-neutral-950 font-semibold">Side button</strong> to cycle through modes in this order: <span className="inline-flex items-center gap-1 font-semibold">Translation 🌍</span> → <span className="inline-flex items-center gap-1 font-semibold">Meeting 📓</span> → <span className="inline-flex items-center gap-1 font-semibold">Custom 🤖</span> → <span className="inline-flex items-center gap-1 font-semibold">Note-Taking ✍️</span>. You'll see a blue LED flash once and feel a short vibration when the mode changes.
        </p>
      ),
    },
    {
      id: "q2",
      category: "General",
      question: "Q2: How do I know which mode I'm currently in?",
      answer: (
        <p className="leading-relaxed">
          Long-press the <strong className="text-neutral-950 font-semibold">Side button</strong> while connected to the app. The app will announce the current mode via TTS (text-to-speech).
        </p>
      ),
    },
    {
      id: "q3",
      category: "Connectivity",
      question: "Q3: Why isn't my device connecting?",
      answer: (
        <ul className="list-disc pl-4 space-y-1.5 text-neutral-600">
          <li>Ensure Bluetooth is enabled on your phone</li>
          <li>Check if the device is in pairing mode (LED flashing red-blue)</li>
          <li>Try pressing the Front or Side button to wake up the device</li>
          <li>Make sure the device is within 10m range of your phone</li>
        </ul>
      ),
    },
    {
      id: "q4",
      category: "Hardware",
      question: "Q4: How long does it take to charge the device?",
      answer: (
        <p className="leading-relaxed">
          Approximately 1 hour for a full charge. The green LED will be solid during charging and turn off when fully charged.
        </p>
      ),
    },
    {
      id: "q5",
      category: "Connectivity",
      question: "Q5: Can the device connect to multiple phones at once?",
      answer: (
        <p className="leading-relaxed">
          No, the HA-MIC01B supports one Bluetooth connection at a time.
        </p>
      ),
    },
    {
      id: "q6",
      category: "Connectivity",
      question: "Q6: How do I disconnect the device?",
      answer: (
        <p className="leading-relaxed">
          You need to actively disconnect in the Hearit.AI app. Go to device settings and tap "Disconnect".
        </p>
      ),
    },
    {
      id: "q7",
      category: "General",
      question: "Q7: How do I power off the device?",
      answer: (
        <p className="leading-relaxed">
          Long-press the Side button for 3 seconds to power off the device.
        </p>
      ),
    },
    {
      id: "q8",
      category: "General",
      question: "Q8: Does mode switching work when disconnected from the app?",
      answer: (
        <p className="leading-relaxed">
          The device will still cycle through modes when you press the Side button, but you won't hear the mode announcement. The modes will take effect once you reconnect to the app.
        </p>
      ),
    },
    {
      id: "q9",
      category: "Hardware",
      question: "Q9: Can I use the device while it's charging?",
      answer: (
        <p className="leading-relaxed">
          Yes, you can use all functions of the HA-MIC01B while it's charging via the USB Type-C cable.
        </p>
      ),
    },
    {
      id: "q10",
      category: "Hardware",
      question: "Q10: What should I do if the device won't wake up?",
      answer: (
        <ul className="list-disc pl-4 space-y-1.5 text-neutral-600">
          <li>Charge the device for at least 10 minutes</li>
          <li>Press the Front or Side button</li>
          <li>If still not responding, try charging for a longer period</li>
        </ul>
      ),
    },
  ];

  const faqs = docId === "ha-mic01b" ? mic01bFaqs : mic06bFaqs;

  const categories = ["All", "General", "Recording", "Connectivity", "Hardware"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-xl font-bold tracking-tight text-neutral-900 font-sans border-b border-neutral-200/50 pb-2.5">
        FAQ
      </h2>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all ${
                  isExpanded
                    ? "border-neutral-300 bg-white shadow-sm"
                    : "border-neutral-200/70 hover:border-neutral-300 bg-neutral-50/20"
                }`}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between px-5 py-3 text-left font-sans cursor-pointer group"
                >
                  <span className={`text-xs md:text-sm font-bold transition-colors ${
                    isExpanded ? "text-neutral-900 font-black" : "text-neutral-700 group-hover:text-neutral-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className="text-neutral-400 group-hover:text-neutral-600 ml-3">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-1 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
            <p className="text-xs text-neutral-400 font-sans">No matching questions found.</p>
          </div>
        )}
      </div>

      {/* Experimental Features Section */}
      <div className="pt-8 border-t border-neutral-200/60 space-y-4">
        <h2 className="text-sm md:text-base font-bold text-neutral-900 font-sans tracking-tight">
          Experimental Features
        </h2>
        <div className="text-xs md:text-sm text-neutral-600 space-y-2.5 font-sans leading-relaxed">
          <p>Several experimental features are available in the web-demo version.</p>
          <p className="text-neutral-400">
            Web-demo supports Windows, macOS, Android (iOS not supported).
          </p>
          <div className="pt-1 flex items-center gap-2 flex-wrap">
            <span className="text-neutral-500">Access via:</span>
            <a
              href="https://webdemo.hearit.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-neutral-900 hover:text-neutral-700 underline decoration-neutral-300 hover:decoration-neutral-900 transition-all"
            >
              webdemo.hearit.ai
              <ExternalLink size={12} className="text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="pt-8 border-t border-neutral-200/60 space-y-4">
        <h2 className="text-sm md:text-base font-bold text-neutral-900 font-sans tracking-tight">
          Contact Us
        </h2>
        <div className="text-xs md:text-sm text-neutral-600 space-y-3.5 font-sans leading-relaxed max-w-2xl">
          <p className="text-neutral-500">
            If you encounter any issues that cannot be resolved, or if you have any suggestions, please feel free to contact us through the following channels:
          </p>
          <div className="grid grid-cols-1 gap-2.5 pt-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-100 pb-2.5">
              <span className="text-neutral-500 font-medium">Official Support Email</span>
              <a
                href="mailto:support@hearit.ai"
                className="font-bold text-neutral-900 hover:text-neutral-700 hover:underline transition-all"
              >
                support@hearit.ai
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-100 pb-2.5">
              <span className="text-neutral-500 font-medium">Online Help Center</span>
              <a
                href="https://support.hearit.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-neutral-900 hover:text-neutral-700 hover:underline inline-flex items-center gap-1 transition-all"
              >
                https://support.hearit.ai
                <ExternalLink size={11} className="text-neutral-400" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-100 pb-2.5">
              <span className="text-neutral-500 font-medium">Technical Documentation</span>
              <a
                href="https://docs.hearit.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-neutral-900 hover:text-neutral-700 hover:underline inline-flex items-center gap-1 transition-all"
              >
                https://docs.hearit.ai
                <ExternalLink size={11} className="text-neutral-400" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-neutral-500 font-medium">Developer API Support</span>
              <a
                href="mailto:api-support@hearit.ai"
                className="font-bold text-neutral-900 hover:text-neutral-700 hover:underline transition-all"
              >
                api-support@hearit.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
