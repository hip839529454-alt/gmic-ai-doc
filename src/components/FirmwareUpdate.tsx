import React, { useState, useEffect } from "react";
import { Cpu, Download, RefreshCw, CheckCircle, AlertTriangle, FileDown, UploadCloud, Play, Check, History, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FirmwareUpdateProps {
  docId: string;
  docTitle: string;
}

interface FirmwareDetails {
  currentVersion: string;
  latestVersion: string;
  releaseDate: string;
  size: string;
  changelog: string[];
  history: { version: string; date: string; note: string }[];
}

// Custom data mapping for different products
const FIRMWARE_DATA: Record<string, FirmwareDetails> = {
  "ha-mic01b": {
    currentVersion: "v1.2.3",
    latestVersion: "v1.3.0",
    releaseDate: "2026-06-15",
    size: "2.1 MB",
    changelog: [
      "Optimized active noise cancellation (ANC) algorithm in high-frequency environments.",
      "Fixed a rare Bluetooth reconnection delay on iOS devices.",
      "Improved battery telemetry accuracy (reduces power gauge jitter)."
    ],
    history: [
      { version: "v1.2.3", date: "2026-03-10", note: "Stability enhancements for multi-mic pairing." },
      { version: "v1.1.0", date: "2025-11-05", note: "Initial public release with standard DSP suite." }
    ]
  },
  "ha-mic01c": {
    currentVersion: "v1.0.1",
    latestVersion: "v1.0.1", // up to date
    releaseDate: "2026-05-10",
    size: "1.5 MB",
    changelog: [
      "Improved offline FAT32 storage writing speeds for continuous streaming files.",
      "Optimized standby power leakage to preserve charge over long idle cycles."
    ],
    history: [
      { version: "v1.0.1", date: "2026-05-10", note: "Fixed standard USB Mass Storage filesystem sync bugs." },
      { version: "v1.0.0", date: "2026-02-18", note: "Initial offline recorder firmware release." }
    ]
  },
  "ha-mic04": {
    currentVersion: "v2.0.4",
    latestVersion: "v2.0.4", // Up to date
    releaseDate: "2026-05-12",
    size: "1.2 MB",
    changelog: [
      "Beamforming angular precision narrowed to ±10°.",
      "Lowered quiescent current consumption over SPI connection."
    ],
    history: [
      { version: "v2.0.4", date: "2026-05-12", note: "SPI latency improvements and register mapping enhancements." },
      { version: "v1.8.2", date: "2026-01-15", note: "Legacy kernel compatibility patch." }
    ]
  },
  "ha-mic05": {
    currentVersion: "v2.1.2",
    latestVersion: "v2.2.0",
    releaseDate: "2026-06-18",
    size: "3.4 MB",
    changelog: [
      "Enhanced 360-degree source localization resolution and sensitivity.",
      "Added multi-channel I2S streaming stability controls.",
      "Optimized RGB LED ring telemetry rendering for real-time tracking feedback."
    ],
    history: [
      { version: "v2.1.2", date: "2026-04-01", note: "Optimized co-processor wake-on-voice latency." },
      { version: "v2.0.0", date: "2025-10-10", note: "Major architecture upgrade to Wi-Fi 6 telemetry streams." }
    ]
  },
  "ha-mic06a": {
    currentVersion: "v3.1.5",
    latestVersion: "v3.2.1",
    releaseDate: "2026-06-22",
    size: "8.5 MB",
    changelog: [
      "Sub-band blind source separation algorithm speed improved by 20%.",
      "Added custom adaptive beamforming parameters via Web GUI console.",
      "Fixed PoE power-negotiation failure on certain commercial managed switches."
    ],
    history: [
      { version: "v3.1.5", date: "2026-04-20", note: "Enhanced acoustic overload point handling under high pressure." },
      { version: "v3.0.0", date: "2025-12-15", note: "Initial Release of the 6-Mic Flagship Platform." }
    ]
  },
  "ha-mic06b": {
    currentVersion: "v1.1.2",
    latestVersion: "v1.2.0",
    releaseDate: "2026-06-24",
    size: "9.1 MB",
    changelog: [
      "Added hydrophobic membrane moisture diagnostic warning telemetry.",
      "RS-485 Modbus protocol registers added for direct heat mapping.",
      "Optimized boot time down to 1.8 seconds in sub-zero industrial temperatures."
    ],
    history: [
      { version: "v1.1.2", date: "2026-02-10", note: "Enhanced anti-vibration filter constants." },
      { version: "v1.0.0", date: "2025-08-30", note: "Initial Certified Industrial Release." }
    ]
  },
  "ha-tel02": {
    currentVersion: "v4.0.2",
    latestVersion: "v4.1.0",
    releaseDate: "2026-06-10",
    size: "18.4 MB",
    changelog: [
      "Bonding protocol overhead reduced by 12% under highly congested environments.",
      "OLED screen graphics anti-aliasing upgrade.",
      "Optimized thermal management logic under sustained 5G transmissions."
    ],
    history: [
      { version: "v4.0.2", date: "2026-03-05", note: "HEVC encoder acceleration fix." },
      { version: "v3.8.0", date: "2025-11-20", note: "Multi-band cellular aggregation support." }
    ]
  },
  "ha-spk01": {
    currentVersion: "v1.0.4",
    latestVersion: "v1.1.0",
    releaseDate: "2026-06-14",
    size: "720 KB",
    changelog: [
      "Kinetic harvesting efficiency estimation reporting accuracy increased.",
      "Lowered BLE connection sleep current by an additional 15%.",
      "Improved ECG sensor signal-to-noise ratio in low temperature states."
    ],
    history: [
      { version: "v1.0.4", date: "2026-01-25", note: "Fixed 9-axis calibration drift." },
      { version: "v1.0.0", date: "2025-09-15", note: "Initial Biocompatible Release." }
    ]
  }
};

export default function FirmwareUpdate({ docId, docTitle }: FirmwareUpdateProps) {
  const firmwareInfo = FIRMWARE_DATA[docId] || {
    currentVersion: "v1.0.0",
    latestVersion: "v1.0.0",
    releaseDate: "2026-01-01",
    size: "1.0 MB",
    changelog: ["Standard operational firmware code."],
    history: [{ version: "v1.0.0", date: "2026-01-01", note: "Initial operational release." }]
  };

  const isUpToDate = firmwareInfo.currentVersion === firmwareInfo.latestVersion;

  // Interactive update status states: "idle" | "downloading" | "verifying" | "flashing" | "rebooting" | "success"
  const [updateStatus, setUpdateStatus] = useState<"idle" | "downloading" | "verifying" | "flashing" | "rebooting" | "success">("idle");
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState("0 KB/s");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [targetVersion, setTargetVersion] = useState(firmwareInfo.latestVersion);

  // Handle fake flashing steps
  useEffect(() => {
    let timer: any;
    if (updateStatus === "downloading") {
      setProgress(0);
      setSpeed("284 KB/s");
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setUpdateStatus("verifying");
            return 100;
          }
          // Dynamic download speed display
          const randSpeed = Math.floor(250 + Math.random() * 100);
          setSpeed(`${randSpeed} KB/s`);
          return prev + Math.floor(5 + Math.random() * 10);
        });
      }, 200);
    } else if (updateStatus === "verifying") {
      setProgress(0);
      let step = 0;
      timer = setInterval(() => {
        step += 1;
        setProgress((step / 4) * 100);
        if (step >= 4) {
          clearInterval(timer);
          setUpdateStatus("flashing");
        }
      }, 400);
    } else if (updateStatus === "flashing") {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setUpdateStatus("rebooting");
            return 100;
          }
          return prev + Math.floor(3 + Math.random() * 6);
        });
      }, 250);
    } else if (updateStatus === "rebooting") {
      setProgress(0);
      let step = 0;
      timer = setInterval(() => {
        step += 1;
        setProgress((step / 3) * 100);
        if (step >= 3) {
          clearInterval(timer);
          setUpdateStatus("success");
        }
      }, 600);
    }

    return () => clearInterval(timer);
  }, [updateStatus]);

  const handleStartUpdate = (version: string) => {
    setTargetVersion(version);
    setUpdateStatus("downloading");
  };

  const handleReset = () => {
    setUpdateStatus("idle");
    setProgress(0);
    setUploadedFile(null);
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".bin")) {
        setUploadedFile(file.name);
      } else {
        alert("Invalid file format. Please upload a .bin firmware binary file.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith(".bin")) {
        setUploadedFile(file.name);
      } else {
        alert("Invalid file format. Please upload a .bin firmware binary file.");
      }
    }
  };

  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm space-y-8 select-none">
      
      {/* Overview stats block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-neutral-50/50 rounded-xl p-4 border border-neutral-200/50 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-sm">
            <Cpu size={18} />
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Current Version</div>
            <div className="text-base font-black text-neutral-900 font-mono mt-0.5">
              {updateStatus === "success" ? targetVersion : firmwareInfo.currentVersion}
            </div>
          </div>
        </div>

        <div className="bg-neutral-50/50 rounded-xl p-4 border border-neutral-200/50 flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
            isUpToDate ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"
          }`}>
            <RefreshCw size={18} className={!isUpToDate ? "animate-spin [animation-duration:8s]" : ""} />
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Target Version</div>
            <div className="text-base font-black text-neutral-900 font-mono mt-0.5">{firmwareInfo.latestVersion}</div>
          </div>
        </div>

        <div className="bg-neutral-50/50 rounded-xl p-4 border border-neutral-200/50 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center border border-neutral-200/30">
            <FileDown size={18} />
          </div>
          <div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Download Size</div>
            <div className="text-base font-black text-neutral-900 font-mono mt-0.5">{firmwareInfo.size}</div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {updateStatus === "idle" ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Main Interactive Upgrade Panel */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-neutral-50/30 border border-neutral-200/80 rounded-xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="p-1 rounded bg-amber-50 text-amber-600 border border-amber-200 mt-0.5 shrink-0">
                    <Info size={14} />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 font-sans">
                      {isUpToDate 
                        ? "Your device is running the latest stable firmware." 
                        : "New Firmware Version is Available!"}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed font-sans">
                      Updating your **{docTitle}** device firmware ensures optimal acoustic telemetry precision, unlocks the latest voice isolation model parameters, and stabilizes spatial beamforming coordinates.
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-200/50 pt-4 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-neutral-400 font-sans">
                    Release Date: <span className="font-bold text-neutral-600 font-mono">{firmwareInfo.releaseDate}</span>
                  </div>
                  
                  {!isUpToDate ? (
                    <button
                      onClick={() => handleStartUpdate(firmwareInfo.latestVersion)}
                      className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all hover:-translate-y-0.5"
                    >
                      <Play size={11} fill="white" />
                      <span>Upgrade to {firmwareInfo.latestVersion}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartUpdate(firmwareInfo.currentVersion)}
                      className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-sans font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer transition-colors"
                    >
                      <RefreshCw size={11} />
                      <span>Force Reinstall {firmwareInfo.currentVersion}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Advanced Custom Upload Flasher */}
              <div className="border border-neutral-200/70 rounded-xl p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 font-sans">Advanced OTA Binary Flashing</h4>
                  <p className="text-[10.5px] text-neutral-400 mt-0.5">
                    Drag and drop local firmware packages (`.bin`) for manual field testing or customized debug loads.
                  </p>
                </div>

                {uploadedFile ? (
                  <div className="flex items-center justify-between p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/20">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-emerald-500 text-white shadow-sm">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <div className="font-mono text-xs text-neutral-800 font-bold max-w-[200px] truncate">
                        {uploadedFile}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-[10px] font-bold text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => handleStartUpdate("Custom bin")}
                        className="flex items-center gap-1.5 bg-neutral-900 text-white font-sans font-bold text-[10px] px-3 py-1.5 rounded-lg hover:bg-neutral-800 shadow-sm cursor-pointer"
                      >
                        <Play size={8} fill="white" />
                        <span>Flash Binary</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      dragActive 
                        ? "border-neutral-900 bg-neutral-50/50 scale-[0.99]" 
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <label className="flex flex-col items-center justify-center cursor-pointer space-y-2">
                      <UploadCloud size={24} className="text-neutral-400" />
                      <div className="text-[11px] text-neutral-600 font-sans">
                        <span className="font-bold text-neutral-900 hover:underline">Click to upload</span> or drag & drop firmware .bin
                      </div>
                      <div className="text-[9.5px] text-neutral-400 font-sans">Supports files up to 25MB</div>
                      <input
                        type="file"
                        accept=".bin"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Release Notes / Side details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-neutral-200/70 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-100 pb-2.5">
                  <span className="text-neutral-400"><History size={14} /></span>
                  <h4 className="text-xs font-bold text-neutral-900 font-sans">
                    Release Notes ({firmwareInfo.latestVersion})
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {firmwareInfo.changelog.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2 text-[11px] text-neutral-600 leading-relaxed font-sans">
                      <span className="text-neutral-400 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Version History Table */}
              <div className="border border-neutral-200/70 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-neutral-900 font-sans">FOTA Version Logs</h4>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                  {firmwareInfo.history.map((hist, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-neutral-50/40 border border-neutral-100">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-neutral-800 bg-neutral-200/60 px-1.5 py-0.5 rounded">
                          {hist.version}
                        </span>
                        <div className="text-[10px] text-neutral-500 mt-1 font-sans leading-tight">{hist.note}</div>
                      </div>
                      <span className="text-[9.5px] font-mono text-neutral-400 shrink-0">{hist.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="updating"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-10 max-w-xl mx-auto space-y-6"
          >
            {updateStatus !== "success" ? (
              <div className="w-full space-y-5 text-center">
                {/* Active pulsating update logo */}
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center bg-neutral-900 text-white rounded-full shadow-lg">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-2 border-2 border-dashed border-neutral-400/50 rounded-full"
                  />
                  <Cpu size={24} className="relative" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-widest font-mono">
                    {updateStatus === "downloading" && `Downloading Update Image (${speed})`}
                    {updateStatus === "verifying" && "Verifying Cryptographic Checksums"}
                    {updateStatus === "flashing" && "Writing Sectors to Partition A"}
                    {updateStatus === "rebooting" && "Initializing Hardware Co-processors"}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Warning: Do not turn off host computer or disconnect the device during flash sequences.
                  </p>
                </div>

                {/* Progress bar container */}
                <div className="space-y-2">
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden border border-neutral-200/50">
                    <motion.div 
                      className="h-full bg-neutral-900 rounded-full" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500">
                    <span>{progress}% Completed</span>
                    <span>
                      {updateStatus === "downloading" && "STEP 1/4"}
                      {updateStatus === "verifying" && "STEP 2/4"}
                      {updateStatus === "flashing" && "STEP 3/4"}
                      {updateStatus === "rebooting" && "STEP 4/4"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full text-center space-y-5">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full shadow-md border border-emerald-200">
                  <CheckCircle size={32} />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-neutral-900 font-sans">
                    Firmware Upgrade Successful
                  </h4>
                  <p className="text-[11px] text-neutral-500 max-w-sm mx-auto font-sans leading-relaxed">
                    Successfully loaded {targetVersion} onto your device. System is online, calibrated, and ready for high-fidelity spatial telemetry streams.
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-sans font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-sm transition-all"
                  >
                    Return to Overview
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safety warning disclosure footer */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200/40 text-[10px] text-neutral-500 leading-normal font-sans">
        <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-neutral-700">Warning & Precautions:</span> Keep your device securely mounted or plugged into the stable source. Disconnecting intermediate cables before verification reboot might trigger bootloader state recovery sequence.
        </div>
      </div>

    </div>
  );
}
