import React from "react";
import { ArrowRight, Mic, Sliders, Cpu, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface MicrophoneDevicesOverviewProps {
  onSelect: (id: string) => void;
}

const DEVICES = [
  {
    id: "ha-mic01b",
    title: "HA-MIC01B",
    subtitle: "Hearit.ai ChatMic",
    description: "Compact smart AI voice companion with 4 advanced operational modes, a high-sensitivity microphone, and physical mode switching controls.",
    badge: "Smart AI ChatMic",
    image: "https://hearit.ai/wp-content/uploads/2026/07/MIC06B-2.jpg",
    specs: ["Single high-sensitivity mic", "Bluetooth 5.2 Connection", "4 AI Operation Modes", "Ultra-lightweight 7g Design"]
  },
  {
    id: "ha-mic01c",
    title: "HA-MIC01C",
    subtitle: "Offline Smart Recorder",
    description: "Advanced wearable wireless smart microphone array featuring high-sensitivity audio capture and standalone offline local recording.",
    badge: "Offline Recording Companion",
    image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=600&q=80",
    specs: ["128MB SD NAND Storage", "Offline Local Recording", "USB Mass Storage Mode", "Bluetooth 5.4 Low Energy"]
  },
  {
    id: "ha-mic04",
    title: "HA-MIC04",
    subtitle: "Linear 4-Mic Board",
    description: "Linear 4-microphone array board engineered with a symmetric acoustic layout for smart screens and smart home assistant hubs.",
    badge: "Linear Array",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    specs: ["4x MEMS Microphones", "Hardware DSP Ingestion", "Symmetric 30mm Spacing", "USB-C & SPI Interface"]
  },
  {
    id: "ha-mic05",
    title: "HA-MIC05",
    subtitle: "Circular 5-Mic Spatial System",
    description: "Circular 5-microphone array system for spatial audio tracking, acoustic beam localization, and smart voice appliances.",
    badge: "Circular Array",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    specs: ["72mm Circular Geometry", "Active Direction Finding", "S/N Ratio 64 dBA", "I2S / TDM Bus Mode"]
  },
  {
    id: "ha-mic06a",
    title: "HA-MIC06A",
    subtitle: "6-Mic circular beamforming board",
    description: "Flagship 6-microphone circular beamforming array with integrated DSP voice isolation and hardware acoustic echo cancellation.",
    badge: "6-Mic Beamforming Array",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    specs: ["6x Circular MEMS Nodes", "On-board Cortex-M DSP", "92dB Dynamic Range", "High-frequency Ingestion"]
  },
  {
    id: "ha-mic06b",
    title: "HA-MIC06B",
    subtitle: "Flagship AI Voice Companion",
    description: "Professional AI voice companion that integrates hybrid noise-reducing microphones, motion and touch sensing, NFC, and dual-band Wi-Fi 6.",
    badge: "Flagship IoT Companion",
    image: "https://iili.io/CRi50J9.png",
    specs: ["Hybrid Multi-Array mic", "Wi-Fi 6 + NFC Integration", "Touch-sensitive control", "Hardware Encryption Chip"]
  }
];

export default function MicrophoneDevicesOverview({ onSelect }: MicrophoneDevicesOverviewProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-4">
      
      {/* Introduction Banner Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
          <Mic size={12} />
          Hardware Directory
        </div>
        <h1 className="text-3xl font-sans font-black tracking-tight text-neutral-900 sm:text-4xl">
          Microphone Devices Ecosystem
        </h1>
        <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed font-sans">
          Welcome to the GMIC AI high-precision acoustic registry. Explore our lineup of intelligent wearables, circular array DSP boards, and linear modules. Click on any device card below to jump to its interactive registers, schematic specs, and full command documentation.
        </p>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEVICES.map((device) => (
          <div
            key={device.id}
            onClick={() => onSelect(device.id)}
            className="group bg-white border border-neutral-200/80 rounded-2xl p-5 hover:border-neutral-900 transition-all duration-300 hover:shadow-lg flex flex-col justify-between h-[385px] cursor-pointer relative overflow-hidden"
          >
            {/* Subtle light background on hover */}
            <div className="absolute inset-0 bg-neutral-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 space-y-3.5">
              {/* Card Top Details */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 leading-tight">
                    {device.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium">
                    {device.subtitle}
                  </p>
                </div>
                <span className="text-[8px] tracking-tight font-mono bg-neutral-100 text-neutral-500 border border-neutral-200/50 px-1.5 py-0.5 rounded-full font-semibold shrink-0">
                  {device.badge}
                </span>
              </div>

              {/* PRODUCT IMAGE IN THE CENTER */}
              <div className="w-full h-44 bg-neutral-50 rounded-xl overflow-hidden flex items-center justify-center relative border border-neutral-100">
                <img
                  src={device.image}
                  alt={device.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Short Bio Description */}
              <p className="text-[11.5px] text-neutral-500 font-sans line-clamp-2 leading-relaxed">
                {device.description}
              </p>
            </div>

            {/* Quick Specs & Footer */}
            <div className="relative z-10 pt-4 border-t border-neutral-100/80 mt-auto flex items-center justify-between">
              <span className="text-[10.5px] font-sans font-semibold text-neutral-900 flex items-center gap-1 group-hover:underline">
                Explore device
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Feature Highlights Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-neutral-50 border border-neutral-200/50 rounded-2xl p-6 mt-6">
        <div className="flex gap-3.5 items-start">
          <div className="p-2 bg-white rounded-xl border border-neutral-100 shadow-sm text-neutral-800 shrink-0">
            <Cpu size={16} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-neutral-900">Embedded DSP Ready</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">All circular and linear arrays ship with custom beamforming DSP frameworks built on-chip.</p>
          </div>
        </div>
        <div className="flex gap-3.5 items-start">
          <div className="p-2 bg-white rounded-xl border border-neutral-100 shadow-sm text-neutral-800 shrink-0">
            <Sliders size={16} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-neutral-900">Custom Calibration</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">Fine-tune gain ratios and active noise mitigation using the interactive sandbox playground.</p>
          </div>
        </div>
        <div className="flex gap-3.5 items-start">
          <div className="p-2 bg-white rounded-xl border border-neutral-100 shadow-sm text-neutral-800 shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-neutral-900">Enterprise Certified</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed">FCC/CE certified and compatible with state-of-the-art security encryption modules.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
