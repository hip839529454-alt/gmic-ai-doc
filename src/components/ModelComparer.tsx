import React, { useState, useEffect } from "react";
import { Check, Columns, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ModelSpec {
  id: string;
  category: string;
  name: string;
  modelCode: string;
  dimensions: string;
  weight: string;
  material: string;
  connectivity: string;
  frequency: string;
  distance: string;
  battery: string;
  charging: string;
  chargingTime: string;
  workingTime: string;
  microphone: string;
  interactiveControl: string;
  appSupport: string;
  additionalFeatures?: string;
  localStorage?: string;
  pickupAngle?: string;
}

export const COMPARISON_MODELS: ModelSpec[] = [
  // --- Microphone Devices ---
  {
    id: "ha-mic01b",
    category: "microphone-devices",
    name: "Hearit.ai ChatMic Pro",
    modelCode: "HA-MIC01B",
    dimensions: "45 × 19 × 19.5 mm",
    weight: "8.6g",
    material: "ABS",
    connectivity: "Bluetooth 5.3",
    frequency: "2.4–2.48 GHz",
    distance: "10M",
    battery: "3.7V, 80mAh",
    charging: "USB Type-C (5V / 150mA)",
    chargingTime: "1 hour",
    workingTime: "8 hours",
    microphone: "Single high-sensitivity microphone",
    interactiveControl: "Front button, side button, buzzer",
    appSupport: "Hearit.AI (iOS 11.0+ / Android 7.0+)",
    additionalFeatures: "Ultra-lightweight wearable, direct clip-on design",
    localStorage: "None",
    pickupAngle: "Omnidirectional"
  },
  {
    id: "ha-mic01c",
    category: "microphone-devices",
    name: "Hearit.ai ChatMic Pro (Offline Rec)",
    modelCode: "HA-MIC01C",
    dimensions: "45 × 19 × 19.5 mm",
    weight: "8.8g",
    material: "ABS",
    connectivity: "Bluetooth 5.4",
    frequency: "2.4–2.48 GHz",
    distance: "10M",
    battery: "3.7V, 80mAh",
    charging: "USB Type-C (5V / 150mA)",
    chargingTime: "1 hour",
    workingTime: "8 hours",
    microphone: "Single high-sensitivity microphone",
    interactiveControl: "Front button, side button, buzzer",
    appSupport: "Hearit.AI (iOS 11.0+ / Android 7.0+)",
    additionalFeatures: "Independent offline recording, USB mass storage mode",
    localStorage: "128MB SD NAND",
    pickupAngle: "Omnidirectional"
  },
  {
    id: "ha-mic04",
    category: "microphone-devices",
    name: "Hearit.ai Linear 4-Mic Array",
    modelCode: "HA-MIC04",
    dimensions: "120 × 20 × 8 mm",
    weight: "22.5g",
    material: "FR4 Fiberglass / Aluminum",
    connectivity: "SPI, USB 2.0, I2S",
    frequency: "20 Hz - 20 kHz (acoustic)",
    distance: "Up to 5M range",
    battery: "Host-Powered (USB/I2S 5V)",
    charging: "N/A (Continuous Power)",
    chargingTime: "N/A",
    workingTime: "Continuous",
    microphone: "4-mic linear array with 10mm spacing",
    interactiveControl: "Onboard status LEDs, reset button",
    appSupport: "Hearit.AI Developer SDK",
    additionalFeatures: "180° front-facing hemisphere beamforming, blind source separation",
    localStorage: "None",
    pickupAngle: "180° front hemisphere"
  },
  {
    id: "ha-mic05",
    category: "microphone-devices",
    name: "Hearit.ai Circular 5-Mic System",
    modelCode: "HA-MIC05",
    dimensions: "60 × 60 × 12 mm",
    weight: "34.0g",
    material: "Aluminum & PCB",
    connectivity: "Wi-Fi 6, High-speed UART",
    frequency: "2.4 / 5 GHz (wireless)",
    distance: "Up to 8M range",
    battery: "Host-Powered (UART/USB 5V)",
    charging: "N/A (Continuous Power)",
    chargingTime: "N/A",
    workingTime: "Continuous",
    microphone: "5-mic circular layout + center reference",
    interactiveControl: "Multicolor RGB ring, mute button",
    appSupport: "Hearit.AI Developer SDK / Web Dashboard",
    additionalFeatures: "Direction of Arrival (DoA) accuracy ±5°, cortex co-processor tracking",
    localStorage: "None",
    pickupAngle: "360° full azimuth"
  },
  {
    id: "ha-mic06a",
    category: "microphone-devices",
    name: "Hearit.ai Flagship 6-Mic Beamformer",
    modelCode: "HA-MIC06A",
    dimensions: "70 × 70 × 15 mm",
    weight: "48.0g",
    material: "Anodized Aerospace Aluminum",
    connectivity: "Gigabit Ethernet, Bluetooth 5.4, USB-C",
    frequency: "Dual-band wireless + wired",
    distance: "Up to 12M range",
    battery: "Host-Powered / PoE",
    charging: "PoE (802.3af) or USB-C 5V",
    chargingTime: "N/A",
    workingTime: "Continuous",
    microphone: "6-mic circular array (70mm diameter)",
    interactiveControl: "Custom web console, hardware mute, reset switch",
    appSupport: "Hearit.AI Suite (Enterprise Cloud / On-Premise)",
    additionalFeatures: "Sub-band blind source separation, dynamic adaptive beamforming, studio-grade SNR",
    localStorage: "None",
    pickupAngle: "360° horizontal + 90° elevation"
  },
  {
    id: "ha-mic06b",
    category: "microphone-devices",
    name: "AI Noise Reduction Voice Recorder",
    modelCode: "HA-MIC06B",
    dimensions: "74.3 × 32 × 27 mm",
    weight: "56.5g",
    material: "Plastic + PCBA",
    connectivity: "Bluetooth 6.1 + dual-band WiFi6 IEEE802.11 b/g/n/an/ac/ax + NFC",
    frequency: "2.4-2.48GHz, 5.150GHz-5.850GHz",
    distance: "10M",
    battery: "3.7V 1000mAh",
    charging: "Type-C (5V / 1A)",
    chargingTime: "1.5 hours",
    workingTime: "10 hours",
    microphone: "Hybrid array (Condenser + Omnidirectional) with AI noise reduction",
    interactiveControl: "3 physical buttons + Slide touch + Haptic motor",
    appSupport: "Hearit.AI (iOS 11.0+ / Android 7.0+)",
    additionalFeatures: "Vibration motor reminder, NFC Reader, Slide touch, Firmware encryption, Gyroscope attitude awareness",
    localStorage: "512MB SPI NAND",
    pickupAngle: "360° horizontal coverage"
  },

  // --- Telalive Series ---
  {
    id: "ha-tel01",
    category: "telalive-series",
    name: "Hearit.ai StreamMic Live",
    modelCode: "HA-TEL01",
    dimensions: "98 × 45 × 12 mm",
    weight: "95g",
    material: "Polycarbonate",
    connectivity: "4G LTE, USB-C",
    frequency: "LTE Bands 1/3/5/8/40",
    distance: "Cellular Range",
    battery: "3.7V, 1500mAh",
    charging: "USB Type-C (5V / 1A)",
    chargingTime: "1.5 hours",
    workingTime: "4 hours",
    microphone: "Single voice-optimized MEMS",
    interactiveControl: "LED status, Power button",
    appSupport: "Hearit.AI Core SDK",
    additionalFeatures: "Compact size, single-channel live streaming",
    localStorage: "None",
    pickupAngle: "Cardioid Directional"
  },
  {
    id: "ha-tel02",
    category: "telalive-series",
    name: "Hearit.ai Video Broadcast Hub",
    modelCode: "HA-TEL02",
    dimensions: "185 × 110 × 28 mm",
    weight: "580g",
    material: "Anodized Aluminum",
    connectivity: "4x 5G Bonded, Wi-Fi 6, Ethernet",
    frequency: "Multi-band 5G Sub-6GHz",
    distance: "Global bonded coverage",
    battery: "12V, 5200mAh (Internal)",
    charging: "DC 12V or PoE (802.3at)",
    chargingTime: "2 hours",
    workingTime: "6 hours on battery",
    microphone: "Line-in audio input options",
    interactiveControl: "2.4-inch OLED status screen, select dial",
    appSupport: "Hearit.AI Studio Web Console",
    additionalFeatures: "Adaptive Bitrate, 256-bit AES, H.265 compression",
    localStorage: "64GB SSD",
    pickupAngle: "N/A (Line-In)"
  },
  {
    id: "ha-tel03",
    category: "telalive-series",
    name: "Hearit.ai Elite Broadcast Bonding",
    modelCode: "HA-TEL03",
    dimensions: "240 × 150 × 42 mm",
    weight: "950g",
    material: "CNC Aerospace Carbon Fiber",
    connectivity: "8x 5G Bonded, Wi-Fi 6E, Dual Gigabit",
    frequency: "5G Sub-6GHz + mmWave",
    distance: "Extreme cellular bonding range",
    battery: "External V-mount battery support / Internal 8000mAh",
    charging: "DC 19V / 4A or high-power PoE",
    chargingTime: "2.5 hours",
    workingTime: "8 hours internal / Infinite with V-mount",
    microphone: "Dual XLR balanced input with phantom power",
    interactiveControl: "4.3-inch responsive touchscreen interface",
    appSupport: "Hearit.AI Enterprise Control Suite",
    additionalFeatures: "Dual-stream backup, sub-frame latency bonding, rugged weatherproof case",
    localStorage: "256GB NVMe SSD",
    pickupAngle: "N/A (XLR Balanced)"
  },

  // --- Wearable Devices ---
  {
    id: "ha-spk01",
    category: "wearable-devices",
    name: "Hearit.ai Bio-Sensor Rig",
    modelCode: "HA-SPK01",
    dimensions: "35 × 35 × 6 mm",
    weight: "18.5g",
    material: "Biocompatible medical polymer",
    connectivity: "Bluetooth 5.4 Low Energy",
    frequency: "2.4 GHz BLE",
    distance: "Up to 15M",
    battery: "Kinetic energy harvesting / 3.7V 120mAh",
    charging: "Inductive wireless charging",
    chargingTime: "1 hour",
    workingTime: "45 days (kinetic-assisted)",
    microphone: "None",
    interactiveControl: "Tap-sensing, haptic feedback motor",
    appSupport: "Hearit.AI Health App / SDK",
    additionalFeatures: "Skin conductance sensor, ECG heart rate tracking, 9-axis motion IMU",
    localStorage: "16MB local buffer flash",
    pickupAngle: "N/A"
  },
  {
    id: "ha-spk02",
    category: "wearable-devices",
    name: "Hearit.ai Active Biometric Band",
    modelCode: "HA-SPK02",
    dimensions: "42 × 22 × 9 mm",
    weight: "24.0g",
    material: "Silicone & Reinforced Glass",
    connectivity: "Bluetooth 5.4 BLE + NFC",
    frequency: "2.4 GHz BLE",
    distance: "Up to 15M",
    battery: "3.7V, 180mAh Lithium-Polymer",
    charging: "Magnetic contact charger",
    chargingTime: "1 hour",
    workingTime: "14 days",
    microphone: "Single low-power voice microphone",
    interactiveControl: "Side utility button, haptic alerts",
    appSupport: "Hearit.AI Health App",
    additionalFeatures: "Photoplethysmography (PPG) sensor, SpO2 tracker, temperature gauge",
    localStorage: "32MB local storage",
    pickupAngle: "Close-range directional"
  },
  {
    id: "ha-spk03",
    category: "wearable-devices",
    name: "Hearit.ai Multi-Node Telemetry Vest",
    modelCode: "HA-SPK03",
    dimensions: "Fits upper body (Medium/Large sizes)",
    weight: "140.0g",
    material: "Breathable Smart Sport Fabric",
    connectivity: "Wi-Fi 6, High-speed Bluetooth 5.4",
    frequency: "Dual-band 2.4 / 5 GHz",
    distance: "Up to 50M (Wi-Fi router range)",
    battery: "Dual-cell 1000mAh flexible battery pack",
    charging: "Magnetic USB-C fast charging",
    chargingTime: "1.5 hours",
    workingTime: "24 hours continuous telemetry",
    microphone: "Respiration acoustic sensor",
    interactiveControl: "Haptic array zones, master status LED",
    appSupport: "Hearit.AI Developer MoCap Suite",
    additionalFeatures: "12-node integrated motion tracking, smart respiratory stretch sensors",
    localStorage: "512MB internal logging",
    pickupAngle: "Body-contact acoustic"
  }
];

interface ModelComparerProps {
  category: string;
}

export default function ModelComparer({ category }: ModelComparerProps) {
  // Filter comparison models specifically to this category
  const categoryModels = COMPARISON_MODELS.filter((model) => model.category === category);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update selected IDs whenever the category changes
  useEffect(() => {
    setSelectedIds(categoryModels.slice(0, 3).map((m) => m.id));
  }, [category]);

  const toggleModelSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((mId) => mId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const activeModels = categoryModels.filter((model) => selectedIds.includes(model.id));

  // Specs rows configuration
  const specRows = [
    { label: "Product Model", key: "modelCode", highlight: true },
    { label: "Product Name", key: "name", highlight: false },
    { label: "Dimensions", key: "dimensions", highlight: false },
    { label: "Net Weight", key: "weight", highlight: false },
    { label: "Material", key: "material", highlight: false },
    { label: "Audio Sensor / Capture Rig", key: "microphone", highlight: true },
    { label: "Pickup Angle / Angle Style", key: "pickupAngle", highlight: false },
    { label: "Connection", key: "connectivity", highlight: true },
    { label: "Transmission Frequency", key: "frequency", highlight: false },
    { label: "Working Distance", key: "distance", highlight: false },
    { label: "Battery / Power Source", key: "battery", highlight: false },
    { label: "Working Time", key: "workingTime", highlight: false },
    { label: "Charging Details", key: "charging", highlight: false },
    { label: "Local Storage", key: "localStorage", highlight: true },
    { label: "Interactive Controls", key: "interactiveControl", highlight: false },
    { label: "App / SDK Support", key: "appSupport", highlight: false },
    { label: "Special Features", key: "additionalFeatures", highlight: true }
  ];

  if (categoryModels.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 text-center">
        <p className="text-xs text-neutral-500 font-sans">
          No comparison models available for this category level.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-neutral-900 text-white">
              <Columns size={13} />
            </span>
            <h3 className="text-sm font-extrabold text-neutral-900 tracking-tight font-sans">
              Interactive Model Parameter Comparison
            </h3>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">
            Toggle models using the checkboxes below to build your side-by-side technical parameters comparison sheet for this product family.
          </p>
        </div>
        <button
          onClick={() => setSelectedIds(categoryModels.map((m) => m.id))}
          className="text-[11px] font-bold text-neutral-600 hover:text-black hover:bg-neutral-100 px-2.5 py-1.5 rounded-lg border border-neutral-200 transition-all cursor-pointer self-start sm:self-center"
        >
          Select All Models
        </button>
      </div>

      {/* Selector pills list */}
      <div className="flex flex-wrap gap-2">
        {categoryModels.map((model) => {
          const isSelected = selectedIds.includes(model.id);
          return (
            <button
              key={model.id}
              onClick={() => toggleModelSelection(model.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-all ${
                isSelected
                  ? "bg-neutral-900 border-neutral-900 text-white shadow-sm"
                  : "bg-neutral-50/50 border-neutral-200 text-neutral-600 hover:bg-neutral-100/50 hover:text-neutral-900"
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                isSelected ? "border-white bg-white text-neutral-900" : "border-neutral-300"
              }`}>
                {isSelected && <Check size={10} strokeWidth={3} />}
              </div>
              <span className="font-sans font-bold">{model.modelCode}</span>
            </button>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto border border-neutral-100 rounded-xl">
        <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200/50">
              <th className="w-[180px] p-3 text-xs font-bold text-neutral-500 uppercase tracking-wider font-sans">
                Specifications
              </th>
              {activeModels.map((model) => (
                <th key={model.id} className="p-3 text-xs font-black text-neutral-900 font-sans border-l border-neutral-200/40">
                  <div className="flex items-center justify-between">
                    <span>{model.name}</span>
                    <button
                      onClick={() => toggleModelSelection(model.id)}
                      disabled={selectedIds.length <= 1}
                      className="p-1 hover:bg-neutral-200/50 text-neutral-400 hover:text-neutral-700 rounded transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Hide model"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map((row, idx) => (
              <tr 
                key={row.key} 
                className={`border-b border-neutral-100/80 last:border-0 hover:bg-neutral-50/30 transition-colors ${
                  row.highlight ? "bg-neutral-50/10 font-medium" : ""
                }`}
              >
                <td className="p-3 text-[11px] font-bold text-neutral-600 font-sans bg-neutral-50/40">
                  {row.label}
                </td>
                {activeModels.map((model) => {
                  const value = (model as any)[row.key];
                  return (
                    <td 
                      key={model.id} 
                      className={`p-3 text-[11.5px] border-l border-neutral-200/40 text-neutral-700 font-sans leading-relaxed ${
                        row.highlight ? "text-neutral-900 font-semibold" : ""
                      }`}
                    >
                      {value && (value.includes("HA-MIC") || value.includes("HA-TEL") || value.includes("HA-SPK") || value.includes("128MB") || value.includes("64GB") || value.includes("256GB") || value.includes("16MB") || value.includes("32MB") || value.includes("512MB") || value.includes("None")) ? (
                        <code className="font-mono text-[10.5px] px-1.5 py-0.5 bg-neutral-100 text-neutral-800 rounded-md">
                          {value}
                        </code>
                      ) : (
                        value || <span className="text-neutral-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-neutral-400 bg-neutral-50/40 p-2.5 rounded-lg border border-neutral-100/60 font-sans">
        <Info size={12} className="text-neutral-400 shrink-0" />
        <span>You can drag the table horizontally to view all parameters if there are many models selected.</span>
      </div>
    </div>
  );
}
