export interface DocSection {
  id: string;
  title: string;
  subtitle: string;
  category: "company" | "microphone-devices" | "telalive-series" | "wearable-devices" | "solutions" | "support";
  icon: string;
  readingTime: number;
  content: string;
  keywords: string[];
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  headers: { key: string; value: string; description: string }[];
  params: { name: string; type: string; required: boolean; default?: string; description: string }[];
  requestBody?: string;
  responseTemplate: any;
}

export const DOCS: DocSection[] = [
  // --- Company ---
  {
    id: "about-company",
    title: "Welcome to Hearit.ai!",
    subtitle: "Hear the Real World. Power the Next Action.",
    category: "company",
    icon: "Building",
    readingTime: 3,
    keywords: ["company", "about", "mission", "team", "hearit", "audio", "acoustic", "history"],
    content: `## We Turn Real Conversations Into Business Results

GMIC AI INC is an AI hardware company focused on building intelligent voice devices that convert speech into structured actions. With strong in-house R&D and ODM/OEM manufacturing capability, it delivers scalable voice-driven solutions for enterprise and industrial applications.

Hearit.ai is GMIC AI’s product ecosystem of AI voice devices, designed to capture voice input and transform it into structured data, tasks, and workflows across different scenarios. It includes wearable voice terminals, smart recorders, and connected AI assistants for enterprise operations and field applications.

![Hearit.ai Voice Hardware Ecosystem](https://iili.io/CRbIMVs.png)

---

### Pain Points Solved

   
   ![Meeting efficiency doubled](https://iili.io/CRb1kmJ.png) ![Customer churn reduced by 40%](https://iili.io/CRb141I.png)


   1. **From "can't remember" to "auto-generated" → Meeting efficiency doubled**  
   
   Key information is missed after meetings or negotiations → Lost opportunities.

   Solution: One-touch recording → AI automatically generates meeting minutes and task lists → Auto-pushed to the team
   
   2. **From "missed calls, lost deals" to "24/7 automated service" → Customer churn reduced by 40%**  
   
   Missed customer calls and untimely follow-ups → Customer churn

   Solution: Telalive auto-answering + Digital employee 24/7 handles bookings and support → Auto-logged into CRM

   ![Security and efficiency together](https://iili.io/CRbEaBp.png) ![Entry time reduced by 90%](https://iili.io/CRbLkKl.png)


   3. **From "afraid to use" to "confident use"→ Security and efficiency together**  
   
   Data security concerns and compliance restrictions → Inefficiency

   Solution: Physical mute switch + End-to-end encryption + Private deployment (data stays on your server)
   
   4. **From "manual entry" to "conversation as action" → Entry time reduced by 90%**  
   
   Manual data entry from conversations → Time-consuming and delayed processes

   Solution: Open API → Key information from conversations auto-written into CRM/ERP → Auto-create tasks or work orders

---

### Core Value Proposition

#### Professional Enterprise-Grade AI Voice Portal
We make "speaking" the primary interaction method for enterprise systems.

* **One-Button Magic**: No need to operate your phone - a physical button enables one-tap recording and AI processing, ideal for meetings, negotiations, and capturing inspiration.
* **Ultimate Core Performance**: Built on a deeply optimized OpenWrt system, delivering millisecond-level response and PPS throughput optimization to ensure real-time stability.
* **Industrial-Grade Privacy Protection**: Physical mute control + end-to-end encryption, with a hardware-level privacy barrier that meets compliance requirements for industries such as finance and law.
* **Full-Form Factor Penetration**: Available in multiple form factors including wearable badges, smart glasses, and embedded modules, ensuring AI is "present" in every business scenario.

#### Next-Generation Digital Employee Platform
We make AI not just a tool, but a digital employee that truly gets work done.

* **AI Persona**: Customize digital employees with brand-specific tones and styles, handling customer inquiries and business follow-ups 24/7.
* **Semantic & Intent Understanding**: Extract key intents from complex live negotiations and meetings, automatically updating CRM systems and generating actionable guides to dramatically shorten sales cycles.
* **Private Deployment Capability**: Supports deep customization for B2B clients, ensuring that business secrets are converted into productivity with absolute security.

#### Full-Stack Manufacturing & System Integration
We don't just do hardware or AI - we build stable, secure, and deployable enterprise-grade systems.

* **Hardware-Software Integration**: From PCB signal integrity design to industrial manufacturing, a closed-loop process ensures long-term operational stability.
* **B2B-Focused Architecture**: Dedicated to providing private deployment and deep system integration for enterprises, keeping data assets always under the control of the business itself.
* **Mature ODM/OEM Experience**: With 16 years of experience in the communications industry, we can customize AI logic and interaction workflows for verticals such as real estate, legal, and government, achieving measurable outcomes.

---

### From Cost Center to Profit Center
#### Why Businesses Choose Us: The ROI Factors
Minimize Operational Costs, Maximize Workforce Intelligence. Do 10x the Work with 0% Additional Headcount.

* **Cost Revolution: One-time Investment, Lifetime Gains**: Replace expensive manual transcription and 24/7 reception staffing with our robust hardware. Achieve a full break-even in less than 3 months and eliminate recurring payroll burdens forever.
* **Efficiency Reimagined: Insights in Seconds, Not Hours**: Turn 10 hours of manual data entry and documentation into 10 seconds of AI-structured insights. Let your top talent focus on closing deals and serving clients, not typing notes.
* **Zero-Leads-Lost: Your Business is Always Open**: Telalive eliminates the "busy signal" for service industries. With 24/7 AI-powered reception, every inquiry is answered, every lead is captured, and every conversation is automatically organized into your CRM.

#### Maximize Your Returns: The ROI of Hearit.ai & Telalive

| Dimension | Traditional Model | Hearit.ai Ecosystem | Net Gain |
| --- | --- | --- | --- |
| **Operational Overhead** | Full-time receptionists/scribes (Avg. $3k+/mo) | 24/7 AI Reception + Automated Documentation | Reduce overhead by 70% |
| **Time Efficiency** | 30–60 mins spent per report/summary | Instant AI-structured data generation | Save 2+ hours per day |
| **Lead Conversion** | 20%–30% missed calls during peak hours | 0% missed calls + Proactive AI follow-ups | Increase closing rate by 25% |
| **Data Assets** | Scattered notes; difficult to track or search | 100% Digitalization + Seamless CRM Sync | 100% Business Reviewability |

### Practical Application Areas

::: grid
::: col
![Sales & Customer Relationship Management](https://iili.io/CRbNTvV.png)

**Sales & Customer Relationship Management**

Capture and input of customer needs
Sales process tracking and progression
Compliance checking of sales scripts
Automatic grading of telephone sales leads
::: col-end
::: col
![Meetings & Business Communication Scenarios](https://iili.io/CRbO3KJ.png)

**Meetings & Business Communication Scenarios**

AI-generated meeting minutes
Automatic assignment and push of action items
Generation of summaries and to-do lists
Real-time multilingual transcription and translation
::: col-end
::: grid-end

::: grid
::: col
![Retail & Hospitality Industry](https://iili.io/CRbefqu.png)

**Retail & Hospitality Industry**

Automated phone booking processing
Accurate identification of customer needs
Real-time progress tracking within the system
Generation of customer profiles and preferences
::: col-end
::: col
![Healthcare Industry](https://iili.io/CRbkz3G.png)

**Healthcare Industry**

Structured electronic medical record (EMR) generation
Patient follow-up and rehabilitation data collection
Assisted generation of medication recommendations
Medical compliance checks and risk alerts
::: col-end
::: grid-end

### Join Our Community

#### Discord Community
Join our [Discord server](https://discord.com/invite/6Gv3sdhrQZ) for:
* Product support
* Feature discussions
* User feedback
* Community updates
`
  },
  // --- Microphone Devices ---
  {
    id: "ha-mic01b",
    title: "HA-MIC01B",
    subtitle: "Your Smart AI Voice Assistant with Mode Switching.",
    category: "microphone-devices",
    icon: "Mic",
    readingTime: 3,
    keywords: ["microphone", "acoustic", "audio", "sensor", "hardware", "device", "ha-mic01b", "chatmic", "compact"],
    content: `### 1. Introduction

![HA-MIC01B](https://hearit.ai/wp-content/uploads/2026/07/MIC06B-2.jpg)

Your Smart AI Voice Assistant with Mode Switching

The HA-MIC01B is a compact, AI-powered voice assistant designed to help you easily capture and organize voice information through cutting-edge AI technology. Featuring intelligent mode switching capabilities, the HA-MIC01B allows you to seamlessly adapt between different AI functions with a single button press, making it your versatile partner for meetings, learning, and daily communication.

---

### Technical Specifications

| Function | Parameter Details |
| :--- | :--- |
| **Product Model** | HA-MIC01B |
| **Product Name** | Hearit.ai ChatMic |
| **Product Size** | 45 × 19 × 21 mm |
| **Net Weight** | 7 g |
| **Material** | ABS |
| **Microphone System** | Single high-sensitivity microphone |
| **Connection** | Bluetooth 5.2 |
| **Transmission Frequency** | 2.4–2.48 GHz |
| **Transmission Distance** | 10 m |
| **Battery Capacity** | 3.7V, 80mAh |
| **Charging Interface** | USB Type-C |
| **Charging Voltage** | 5V / 150mA |
| **Charging Time** | 1 hour |
| **Working Time** | 8 hours |
| **Controls** | Physical mode switching button; 4 AI operation modes |
| **App Support** | Hearit.AI (iOS 11.0+ / Android 7.0+) |

---

### Core Features Overview

| Feature | Description / Specifications |
| :--- | :--- |
| **AI Voice Interaction** | Connect to cloud-based large language models (powered by ChatGPT) for intelligent Q&A and content summarization |
| **High-Quality Recording** | Real-time audio streaming to the Hearit.AI App—never miss any important details |
| **Multi-Platform Compatibility** | Seamlessly connects to iOS and Android devices through the Hearit.AI App |
| **Long Battery Life** | Up to 8 hours of continuous operation for reliable daily use |
| **Smart Mode Switching** | Effortlessly switch between 4 AI modes with physical button |
| **52+ Language Support** | Automatic language detection with comprehensive global coverage |
| **Ultra-Compact Design** | Only 7g weight, wear it like a smart accessory |

---

### Built for Real-World Workflows

#### Field Service & On-site Maintenance
![Field Service & On-site Maintenance](https://iili.io/CR66tPj.png)

HA-MIC01B enables hands-free documentation during equipment maintenance and on-site inspections. It captures spoken notes in real time and converts them into structured work logs, reducing missed details and improving field efficiency.


#### Healthcare & Clinical Documentation
![Healthcare & Clinical Documentation](https://iili.io/CR6m4qP.png)

During consultations and patient care, HA-MIC01B helps medical staff stay focused on patients instead of manual note-taking. It records conversations and automatically generates structured clinical summaries, including symptoms, observations, and key actions.

#### Sales & Client Meetings
![Sales & Client Meetings](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80)

In client meetings and on-site sales visits, HA-MIC01B continuously captures conversations and extracts key insights such as requirements, budgets, intent, and next steps. It turns unstructured discussions into CRM-ready records and follow-up tasks.

#### Logistics & Warehouse Operations
![Logistics & Warehouse Operations](https://iili.io/CRPzyCP.png)

HA-MIC01B streamlines communication in logistics and warehouse environments. Voice instructions are instantly converted into operational records such as received goods, stock updates, and exception reports, enabling faster and more accurate execution.

---

### Quick Start Guide

The HA-MIC01B is a compact AI-powered voice recording device with Bluetooth connectivity and intelligent mode switching, designed for real-time voice capture and AI-powered transcription and analysis.

**What's in the box?**
* 1 × HA-MIC01B Device
* 1 × Type-C Charging Cable

![HA-MIC01B Product Unboxing Scene](https://hearit.ai/wp-content/uploads/2026/07/MIC06B-1.jpg)

#### Step 1: Unboxing & Charging
* Take the HA-MIC01B device and Type-C charging cable out of the package.
* Before first use, we recommend fully charging the device using the included charging cable
* **Charging**: Green LED solid
* **Fully charged**: LED turns off
* The device will automatically wake up when you press any button

#### Step 2: Choose Your Usage Mode

This mode provides full access to AI features and cloud processing through the Hearit.AI mobile app.

##### 1. Download the App:
* Search for "Hearit.AI" in the Apple App Store or Google Play Store to download and install
* Download links: [Android](https://play.google.com/store/apps/details?id=ai.gmic.app) / [iOS](https://hearit.ai/app/ios)
*  Open the App and complete registration or login as prompted

##### 2. Wake Up Device:
* Single-press the Front button or Side button to wake up the device
  * **LED**: Red-blue alternating flashes (3 times)
  * Device is now broadcasting a BLE signal

##### 3. Bluetooth Pairing:
* Enable Bluetooth on your phone
* In the Hearit.AI App home page, tap "Add Device" and select your device model (HA-MIC01B) from the list
* From the device list, select the device whose name begins with "HA-"
* Successful Pairing:
  * **LED**: Blue flashes (3 times, 0.8s interval)
  * A short beep confirms connection
  * App will display "Connected"

![Add Device](https://iili.io/CAtkpgn.png)

#### Step 3: Start Using

Congratulations! Your device is now set up. You can now begin recording and switching between AI modes with the HA-MIC01B.

---

### Hardware Guide

The HA-MIC01B has 3 physical buttons: Front Button, Side Up Button, and Side Down Button.

![HA-MIC01B Hardware Controls](https://hearit.ai/wp-content/uploads/2026/07/MIC06B-3.jpg)

#### Button Operations

##### Front Button (Voice Control)

| Operation | Function | LED | Audio Feedback |
| :--- | :--- | :--- | :--- |
| **Single Press (Connected)** | Start/Stop recording | Blue solid (recording) | Short beep (1×) |
| **Single Press (Disconnected)** | Wake up device | Red flashes (2×, 0.5s) | None |

##### Side Button (Mode Switch / Power Control)

| Operation | Function | LED | Audio Feedback |
| :--- | :--- | :--- | :--- |
| **Single Press** | Cycle through AI modes: Translation → Meeting → Custom → Note-Taking | Blue flash (1×) | Short vibration |
| **Long Press (3s)** | Power off the device | LED off | None |
| **Long Press (Connected)** | Trigger mode announcement via app TTS | None | Voice announcement |

#### LED Indicator Status

##### General Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **Wake-Up** | Red-blue alternating flashes (3×) | Device waking up |
| **Pairing Success** | Blue flashes (3×, 0.8s interval) | Bluetooth paired successfully |
| **Recording** | Blue solid | Recording active |
| **Mode Switch** | Blue flash (1×) | Mode changed |
| **BLE Disconnected** | Red flashes (2×, 0.5s interval) | Connection lost |

##### Power Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **Charging** | Green solid | Charging in progress |
| **Fully Charged** | LED off | Charging complete |

#### Power & Charging

* **Interface**: USB Type-C
* **Charging Status**:
  * **Charging**: Green LED solid
  * **Fully Charged**: LED turns off
* **Battery Management**:
  * **Working Time**: Up to 8 hours continuous use
  * **Auto-Sleep**: Device enters sleep mode after 5 minutes of no connection (LED off)

---

### Features in Detail

#### AI Voice Interaction Modes
The HA-MIC01B features physical mode switching via the Side button. Press the Side button once to cycle through 4 AI-powered operation modes. The device supports 52+ language support with automatic language detection.

**Mode Cycle Order**: Translation → Meeting → Custom → Note-Taking → (repeats)

##### Translation Mode
* **52+ Languages Supported**: Comprehensive global language coverage
* **Automatic Language Detection**: No need to manually select input language
* **AI-powered translation with voice output**: Real-time translation using advanced AI
* **Azure + Whisper Layered Translation**: Enterprise-grade translation accuracy
* **Great for international conversations**: Perfect for business meetings and travel

##### Meeting Recorder
* **Multi-language Meeting Support**: Automatically handles multilingual participants
* **Record meetings with high-quality audio**: Professional-grade recording
* **Convert speech to text with accuracy**: Real-time transcription in 52+ languages
* **Get organized meeting summaries**: AI-powered summaries with key points extraction

##### Custom Model
* **ChatGPT Integration**: Powered by advanced AI for intelligent responses
* **Add your own AI instructions**: Customize AI behavior for specific use cases
* **Choose from ready-to-use models**: Pre-configured models for different industries
* **Multi-language AI Interaction**: ChatGPT responds in the user's preferred language

**You can**:
* **Perform intelligent Q&A**: Ask the AI any questions
* **Generate content summaries**: Let the AI help you summarize key points from conversations

##### Note Taking Mode
* **Global Note Taking**: Take notes in any of the 52+ supported languages
* **Speak your tasks naturally**: Natural language processing for task creation
* **Auto-organize into categories**: AI automatically categorizes and structures notes
* **Smart deadline detection**: Automatically identifies and sets deadlines from speech

#### Recording Management
* **Start Recording**: Single-press Front button (when connected to app)
* **Stop Recording**: Single-press Front button again
* **Real-Time Audio**: Audio streams to the app instantly for processing
* **Mode Switching**: Single-press Side button to cycle through modes
* **Mode Announcement**: Long-press Side button to hear current mode via app TTS
* **Auto-Reconnect**: When app restarts with Bluetooth enabled, device automatically reconnects (LED: Blue flashes 3×, 0.8s interval)`
  },
  {
    id: "ha-mic01c",
    title: "HA-MIC01C",
    subtitle: "HA-MIC01C is a professional-grade wearable smart recorder featuring standalone local recording with 128MB SPI NAND flash memory and Bluetooth 5.4.",
    category: "microphone-devices",
    icon: "Mic",
    readingTime: 3,
    keywords: ["microphone", "acoustic", "audio", "sensor", "hardware", "device", "ha-mic01c", "offline", "recorder"],
    content: `### 1. Introduction

![HA-MIC01C](https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=800&q=80)

Your Standalone Offline Recording Companion

The HA-MIC01C is a wearable smart microphone designed specifically for situations requiring instant, high-reliability voice recording without a persistent smartphone connection. With its built-in 128MB high-speed SD NAND flash memory, you can record up to 16 hours of continuous high-fidelity audio directly on the device.

---

### 2. Technical Specifications

| Function | Parameter Details |
| :--- | :--- |
| **Product Model** | HA-MIC01C |
| **Product Name** | Standalone Wearable Smart Recorder |
| **Product Size** | 45 × 19 × 19.5 mm |
| **Net Weight** | 8.8g |
| **Material** | Ultra-durable ABS |
| **Microphone System** | High-sensitivity omnidirectional condenser microphone |
| **Bluetooth Version** | Bluetooth 5.4 Low Energy |
| **Transmission Frequency** | 2.4-2.48GHz |
| **Transmission Distance** | 10M |
| **Storage Capacity** | 128MB SPI NAND Flash (approx. 16 hours audio storage) |
| **Additional Features** | Standalone Offline Recording<br/>USB Mass Storage Mode<br/>Interactive front/side buttons & buzzer |
| **Charging Interface** | Type-C |
| **Charging Voltage** | 5V / 150mA |
| **Charging Time** | 1 hour |
| **Battery Capacity** | 3.7V 80mAh |
| **LED Indicator** | Blue, Green, Cyan status indicators |
| **Work Modes** | App Mode (streaming), Local/Offline Mode, USB Disk Mode |
| **App Support** | Hearit.AI (iOS 11.0+ / Android 7.0+) |

---

### 3. Core Features Overview

| Feature | Description / Specifications |
| :--- | :--- |
| **Standalone Recording** | Double-click to record instantly without a smartphone connected. |
| **Ultra-Lightweight** | Weighs only 8.8 grams — easily clips onto collars, pockets, or straps. |
| **128MB NAND Storage** | Large onboard storage securely holds hours of compressed PCM voice files. |
| **USB Disk Mode** | Connects to Windows/Mac/Linux to manage recorded WAV files without software. |
| **Dual-Mode Operation** | Use as an App-connected microphone or an independent field recorder. |

---

### 4. Built for Real-World Workflows

#### Daily Meetings & Lectures
HA-MIC01C is perfect for students, journalists, and business professionals. Clip it on, double-click, and let it capture the entire meeting or lecture offline. Later, upload it to the Hearit.AI app for transcription and AI summarization.

#### Field Research & Interviewing
In remote locations where Wi-Fi or cellular connections are unavailable, HA-MIC01C's offline storage shines. Conduct interviews, log observations, and dictate thoughts directly to the device.

---

### 5. Quick Start Guide

**What's in the box?**
* 1 × HA-MIC01C Device
* 1 × USB-C Cable

#### Step 1: Charging
* Connect the HA-MIC01C to any USB charger with the included cable.
* Red LED indicates charging. Green LED indicates full charge.

#### Step 2: Local Offline Recording
* Double-click the **Front Button** to start local recording.
* Cyan breathing LED indicates local recording is active.
* Double-click the **Front Button** again to stop and save the file.

#### Step 3: Accessing Recorded Files
* Plug the device into your computer's USB port.
* Copy or play the audio files directly from the mounted drive.`
  },
  {
    id: "ha-mic04",
    title: "HA-MIC04",
    subtitle: "Linear 4-microphone array board engineered for smart screens and home assistant hubs.",
    category: "microphone-devices",
    icon: "Mic",
    readingTime: 3,
    keywords: ["microphone", "acoustic", "audio", "sensor", "hardware", "device", "ha-mic04", "linear"],
    content: `## HA-MIC04 Linear 4-Microphone Array

The **HA-MIC04** is a linear acoustic array board specifically designed for boundary-mounted applications. It features advanced 180° front-facing beamforming and blind source separation, allowing it to easily isolate human voice in noisy environments up to 5 meters away.

---

### Technical Specifications

| Spec | Metric / Feature |
| :--- | :--- |
| **Acoustic Array** | 4-mic linear array with 10mm spacing |
| **Pickup Angle** | 180° front-facing hemisphere |
| **Operating Range** | **0.5m to 5.0m** active range |
| **Onboard Processing** | 4-channel hardware DSP beamformer |
| **Connectivity** | SPI, USB 2.0, I2S |

---

### Key Applications

1. **Smart Display & TV Integration**  
   Mounts flat inside bezel enclosures to provide crystal-clear voice UI.
2. **Boundary Teleconference**  
   Separates voices around a meeting table from back-wall reflections.`
  },
  {
    id: "ha-mic05",
    title: "HA-MIC05",
    subtitle: "Circular 5-microphone array system for spatial audio tracking and smart appliances.",
    category: "microphone-devices",
    icon: "Mic",
    readingTime: 3,
    keywords: ["microphone", "acoustic", "audio", "sensor", "hardware", "device", "ha-mic05", "circular"],
    content: `## HA-MIC05 Circular 5-Microphone Array

The **HA-MIC05** provides symmetric 360° horizontal coverage with a 5-element circular constellation. Equipped with an onboard cortex co-processor, it calculates acoustic Direction of Arrival (DoA) within 5° of accuracy, reporting spatial vectors in real time.

---

### Technical Specifications

| Spec | Metric / Feature |
| :--- | :--- |
| **Acoustic Array** | 5-mic circular layout + center reference |
| **Sensing Field** | Full 360° azimuth coverage |
| **DoA Accuracy** | **± 5°** precision |
| **Tracking Velocity** | Up to 120° / sec angular tracking |
| **Connectivity** | Wi-Fi 6, High-speed UART |

---

### Key Applications

1. **Acoustic Location Tracking**  
   Track speakers in real time to steer camera gimbals or directional speakers.
2. **Voice-Activated Appliances**  
   Allow smart home hubs to accurately target acoustic commands from any direction.`
  },
  {
    id: "ha-mic06a",
    title: "HA-MIC06A",
    subtitle: "Flagship 6-microphone circular beamforming array with integrated DSP voice isolation.",
    category: "microphone-devices",
    icon: "Mic",
    readingTime: 3,
    keywords: ["microphone", "acoustic", "audio", "sensor", "hardware", "device", "ha-mic06a", "beamforming"],
    content: `## HA-MIC06A 6-Microphone Beamforming Array

The **HA-MIC06A** is our high-performance 6-mic circular acoustic engine. It delivers advanced sub-band blind source separation, reverberation cancellation, and dynamic adaptive beamforming to pull pristine voices from complex noise backgrounds.

---

### Technical Specifications

| Spec | Metric / Feature |
| :--- | :--- |
| **Acoustic Array** | 6-mic circular array (70mm diameter) |
| **Sensing Field** | 360° horizontal + 90° elevation |
| **Dynamic Range** | 114 dB |
| **Latency** | **< 2.5ms** end-to-end DSP latency |
| **Connectivity** | Gigabit Ethernet, Bluetooth 5.4, USB-C |

---

### Key Applications

1. **Collaborative Meeting Spaces**  
   Captures up to six simultaneous speakers as distinct audio feeds.
2. **High-Noise Voice Control**  
   Delivers consistent voice control in noisy industrial or server rooms.`
  },
  {
    id: "ha-mic06b",
    title: "HA-MIC06B",
    subtitle: "HA-MIC06B is a professional AI voice companion that integrates hybrid noise-reducing microphones, motion and touch sensing, NFC, and dual-band Wi-Fi 6 + Bluetooth connectivity for reliable use in demanding environments..",
    category: "microphone-devices",
    icon: "Mic",
    readingTime: 3,
    keywords: ["microphone", "acoustic", "audio", "sensor", "hardware", "device", "ha-mic06b", "rugged"],
    content: `### 1. Introduction

![HA-MIC06](https://iili.io/CRi50J9.png)

Your Ultimate AI Voice Companion with Advanced Sensors

The HA-MIC06B is Hearit.ai's most feature-rich AI-powered voice device, combining a hybrid microphone array with AI noise reduction, NFC reader, gyroscope motion sensing, capacitive touch controls, and multi-mode connectivity (Bluetooth 6.1 + dual-band WiFi6 IEEE802.11 b/g/n/an/ac/ax). Built with Plastic + PCBA material, it is engineered for demanding professional environments — from healthcare clinics to corporate boardrooms and beyond.

---

### 2. Technical Specifications

| Function | Parameter Details |
| :--- | :--- |
| **Product Model** | HA-MIC06B |
| **Product Name** | AI Noise Reduction Voice Recorder |
| **Product Size** | 74.3 × 32 × 27 mm |
| **Net Weight** | 56.5g |
| **Material** | Plastic + PCBA |
| **Microphone System** | Hybrid array (Condenser + Omnidirectional) with AI noise reduction |
| **WiFi Standard** | IEEE802.11 b/g/n/an/ac/ax (Dual-band WiFi6) |
| **Bluetooth Version** | V6.1 |
| **BLE Transmission Frequency** | 2.4-2.48GHz |
| **WiFi Transmission Frequency** | 2.4-2.48GHz, 5.150GHz-5.850GHz |
| **Transmission Distance** | 10M |
| **Storage Capacity** | 512MB SPI NAND |
| **Speaker Maximum Power** | 1W |
| **Power Display** | Coulomb meter with precise power display |
| **NFC** | Type A (Mifare, NTAG), Type B (ID cards), Felica (Japan transit) |
| **Sensors** | 6-axis Gyroscope / Accelerometer |
| **Controls** | 3 physical buttons + Slide touch + Haptic motor |
| **Additional Features** | Vibration motor reminder<br/>NFC Reader<br/>Slide touch<br/>Firmware encryption<br/>Gyroscope attitude awareness |
| **Charging Interface** | Type-C |
| **Charging Voltage** | 5V / 1A |
| **Charging Time** | 1.5 hours |
| **Battery Capacity** | 3.7V 1000mAh |
| **LED Indicator** | RGB tri-color LED |
| **Work Modes** | Bluetooth Mode, Computer Mode (USB), App Mode |
| **SDK** | Full SDK for iOS, Android, and Web |
| **App Support** | Hearit.AI (iOS 11.0+ / Android 7.0+) |

---

### 3. Core Features Overview

| Feature | Description / Specifications |
| :--- | :--- |
| **AI Voice Interaction** | Connect to cloud-based large language models (powered by ChatGPT) for intelligent Q&A, content summarization, and more. |
| **Hybrid Microphone Array** | Condenser + omnidirectional pickup with AI-powered noise reduction for crystal-clear voice capture. |
| **Triple Connectivity** | Dual-band WiFi6 (IEEE802.11 b/g/n/an/ac/ax) + Bluetooth 6.1 + NFC for maximum flexibility. |
| **Advanced NFC Reader** | Supports Type A (Mifare, NTAG), Type B (ID cards), and Felica (Japan transit cards). |
| **6-Axis Gyroscope** | Motion wake-up, pick-up detection, and significant motion sensing for smart automation. |
| **Capacitive Touch Slider** | Intuitive volume control via swipe or tap gestures. |
| **Dual Recording Modes** | BLE recording (via App) and local recording (saved to device memory). |
| **Built-in Speaker** | Audio playback, voice prompts, and music playback support. |
| **USB Computer Mode** | Works as a USB audio device when connected to a computer. |
| **Battery Capacity** | 3.7V 1000mAh battery with Type-C charging. |
| **Material** | Plastic + PCBA. |
| **Language Support** | 52+ languages with automatic detection and comprehensive global coverage. |
| **Full SDK Support** | Comprehensive SDK for iOS, Android, and Web development. |

---

### 4. Built for Real-World Workflows

#### Field Service & On-site Maintenance
![Field Service & On-site Maintenance](https://iili.io/CR66tPj.png)

MIC06B enables hands-free documentation during equipment maintenance and on-site inspections. It captures spoken notes in real time and converts them into structured work logs, reducing missed details and improving field efficiency.


#### Healthcare & Clinical Documentation
![Healthcare & Clinical Documentation](https://iili.io/CR6m4qP.png)

During consultations and patient care, MIC06B helps medical staff stay focused on patients instead of manual note-taking. It records conversations and automatically generates structured clinical summaries, including symptoms, observations, and key actions.

#### Sales & Client Meetings
![Sales & Client Meetings](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80)

In client meetings and on-site sales visits, MIC06B continuously captures conversations and extracts key insights such as requirements, budgets, intent, and next steps. It turns unstructured discussions into CRM-ready records and follow-up tasks.

#### Logistics & Warehouse Operations
![Logistics & Warehouse Operations](https://iili.io/CRPzyCP.png)

MIC06B streamlines communication in logistics and warehouse environments. Voice instructions are instantly converted into operational records such as received goods, stock updates, and exception reports, enabling faster and more accurate execution.

---

### 5. Quick Start Guide

The HA-MIC06B is a professional-grade AI voice device featuring hybrid microphone array, triple connectivity (dual-band WiFi6 + BT + NFC), gyroscope motion sensing, capacitive touch controls, and Plastic + PCBA construction.

**What's in the box?**
* 1 × HA-MIC06B Device
* 1 × Type-C Charging Cable

![HA-MIC06 Product Unboxing Scene](https://iili.io/CAQVc91.png)

#### Step 1: Unboxing & Charging
* Take the HA-MIC06B device and Type-C charging cable out of the package.
* Fully charge the device before first use.
* **Charging**: Red LED solid.
* **Fully charged**: Green LED solid.
* Long press the **Front Button** for 3 seconds to power on.

#### Step 2: Choose Your Usage Mode

##### Mode A: Connect via App (For Bluetooth Devices)
This mode provides full access to AI features and cloud processing through the Hearit.AI mobile app.

**1. Download the App:**
   a. Search for "Hearit.AI" in the Apple App Store or Google Play Store to download and install
   b. Download links: [Android](https://play.google.com/store/apps/details?id=ai.gmic.app) / [iOS](https://hearit.ai/app/ios)
   c. Open the App and complete registration or login as prompted

**2. Bluetooth Pairing:**
   a. Enable Bluetooth on your phone and bring the device close to your phone
   b. Long Press (3s) the Front Button to power on the device
      * LED: Blue slow flashing (waiting for pairing)
   c. In the Hearit.AI App home page, tap "Add Device" and select your device model (HA-MIC06B) from the list
   d. Follow the App prompts to complete the connection. Once connected successfully, the App will display "Connected"
      * LED: Green solid (App connected)
   e. Tap "Start Using" to enter the main interface

![Add Device](https://iili.io/CAtkpgn.png)

##### Mode B: Connect to Wi-Fi (For Wi-Fi Devices)
**This mode is suitable for firmware updates and advanced features that require Wi-Fi.**

1. **Enter Configuration Mode**:
   a. Visit [https://hearit.ai/wifi/](https://hearit.ai/wifi/) in your web browser
   b. Enter your WiFi network name (SSID) and password
   c. **Important: Make sure your WiFi network operates on the 2.4GHz or 5GHz frequency band**

2. **Connect Your Device**:
   a. Click "Start Configuration"
   b. When prompted, search for and connect to your MIC06B device

3. **Transfer WiFi Credentials**:
   a. The website will automatically transmit your WiFi credentials to your MIC06B device
   b. The device will automatically restart and attempt to connect to your configured Wi-Fi network

![Connect to Wi-Fi](https://iili.io/CAtQFhF.png)

##### Mode C: Offline Recording
* Ensure the device is fully charged and powered on.
* Make sure the App is disconnected.
* Double click the **Front Button** to start local recording.
* Cyan breathing LED indicates local recording.
* Double click again to stop recording.
* Connect the device to a computer via USB to access recorded files.

#### Step 3: Start Using

Congratulations! Your device is now set up. You can now begin exploring the powerful features of the HA-MIC06B.

---

### 6. Hardware Guide

The HA-MIC06B has 3 physical buttons: Front Button, Side Up Button, and Side Down Button.

![HA-MIC06 Hardware Controls](https://iili.io/CRifXYQ.png)

#### Front Button (Main Control)

| Operation | Function | LED | Audio Feedback |
| :--- | :--- | :--- | :--- |
| **Single Click** | Start/Stop BLE Recording (via App) | Green breathing (BLE recording) | Short beep |
| **Double Click** | Start/Stop Local Recording (saved to device memory) | Cyan breathing (local recording) | Short beep |
| **5× Click** | Check & Update Firmware (requires WiFi) | White flashing (updating) | Notification sound |
| **Long Press (3s)** | Power Off | LED off | — |
| **3× Click + Hold 3s** | Factory Reset | Red fast flash 10× then restart | — |
| **5× Click + Hold 3s** | Enter USB Upgrade Mode | — | — |

#### Side Up Button (Mode Switch)

| Operation | Function | LED | Audio Feedback |
| :--- | :--- | :--- | :--- |
| **Single Click** | Switch mode: When App connected, switch App modes; When disconnected, toggle Bluetooth/Computer mode | Blue flash once | Voice prompt (when connected) |

#### Side Down Button (Media Control)

| Operation | Function |
| :--- | :--- |
| **Single Click** | Play / Pause music |
| **Double Click** | Next track |
| **Triple Click** | Previous track |


#### Touch Controls
The device features a capacitive touch-sensitive area on the side, supporting swipe and tap gestures.

![Touch Controls](https://iili.io/CRiJS4V.png)

| Gesture | Function |
| :--- | :--- |
| **Swipe Up / Tap Upper Area** | Volume Up |
| **Swipe Down / Tap Lower Area** | Volume Down |

*Tip: The touch slider provides smooth, intuitive volume adjustment — perfect for quick, one-handed operation without looking at the device.*

#### LED Indicator Status
![HA-MIC06 Hardware Controls](https://iili.io/CAyrI3v.png)

The HA-MIC06B features an RGB tri-color LED that indicates the current device state through different colors and patterns.

##### System Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **Normal Standby** | Blue solid | Device ready |
| **BLE Not Connected** | Blue slow flashing | Waiting for Bluetooth pairing |
| **BLE Connecting** | Blue fast flashing | Bluetooth connection in progress |
| **App Connected** | Green solid | Connected to Hearit.AI App |
| **Computer Mode** | Purple solid | USB connected to computer |

##### Recording Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **BLE Recording** | Green breathing | Recording via App (audio streaming) |
| **Local Recording** | Cyan breathing | Recording to device memory |

##### Charging Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **Charging** | Red solid | Charging in progress |
| **Fully Charged** | Green solid | Charging complete |

##### Battery Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **Low Battery** | Red flashing | Please charge the device |

##### Special Status

| Status | LED Pattern | Meaning |
| :--- | :--- | :--- |
| **Factory Reset** | Red fast flash (10×) | Resetting in progress |
| **Firmware Updating** | White flashing | Do not power off |

#### Power & Charging
**Interface**: USB Type-C (multi-device dock compatible)

##### Charging Status
* **Charging**: Red LED solid
* **Fully Charged**: Green LED solid

##### Power Control

| Operation | Method |
| :--- | :--- |
| **Power On** | Long press Front Button until LED lights up |
| **Power Off** | Long press Front Button for 3 seconds |
| **Auto Sleep** | Device enters low-power mode after idle period |

##### Battery Management
* **Battery Capacity**: 3.7V 1000mAh
* **Charging Time**: 1.5 hours
* **Auto-Sleep**: Device automatically enters low-power sleep mode when idle

#### Connectivity Features

##### Triple Connectivity
The HA-MIC06B supports three simultaneous connectivity options for maximum flexibility:

| Mode | Connection | Description |
| :--- | :--- | :--- |
| **Bluetooth 6.1** | BLE + Classic BT | App connection (BLE) + Audio playback (Classic BT) |
| **Wi-Fi 6 (IEEE802.11 b/g/n/an/ac/ax)** | 2.4GHz / 5GHz | Firmware updates, cloud features |
| **NFC** | Near Field | Card reading, device pairing, access control |

##### Mode Switching
* **Press Side Up Button once to toggle between modes**
* **When App is connected**: switches between App modes (Translation, Meeting, Custom Model, Note Taking)
* **When App is disconnected**: toggles between Bluetooth mode and Computer mode

#### Connecting to Computer (USB Storage & USB Microphone Mode)
When you connect the HA-MIC06B to your computer using a USB-C cable, the device automatically enters composite mode:

##### USB Storage Mode
* The device appears as a USB flash drive on your computer
* You can directly access internal storage to copy, manage, or delete local recording files

##### USB Microphone Mode
* The device is simultaneously recognized as a high-quality USB microphone by your computer
* You can select MIC06B as an audio input device in:
  * System sound settings
  * Meeting software (Zoom, Teams, etc.)
  * Recording software (Audacity, etc.)

---

### 7. Features in Detail

#### Local Offline Recording
Record anytime without connecting to your phone.

##### BLE Recording (Requires App Connection)
* Ensure your device is connected via the Hearit.AI App
* Single Click the Front Button to start recording
* Green breathing LED indicates recording in progress
* Single Click the Front Button again to stop recording
* Recording files are automatically transmitted to the App

##### Local Recording (Saved to Device Memory)
* Double Click the Front Button to start recording
* Cyan breathing LED indicates recording in progress
* Double Click the Front Button again to stop recording
* Recording files are saved in device memory

##### Accessing Local Recorded Files
* Connect your HA-MIC06B to a computer using a USB cable
* The device will appear as a USB mass storage device (similar to a USB flash drive)
* Browse to the device and access your recorded audio files
* Copy files to your computer as needed

#### NFC Reader Function
* **Type A**: Mifare Classic, NTAG.
* **Type B**: National ID cards.
* **Felica**: Japan transit cards such as Suica and PASMO.
* **Card proximity**: Hold the NFC card close to the device’s NFC sensing area.
* **LED Feedback**: The device emits a notification sound and flashes the LED when a card is detected.

#### Gyroscope & Motion Sensing
* **Motion Wake-Up**: Motion Wake-Up.
* **Pick-Up Detection**: Pick-Up Detection.
* **Significant Motion**: Significant Motion.
* **Power & Control**: Smart automation, power saving, and gesture control.

#### Developer Integration & SDK Support
* **REST API**: REST API.
* **WebSocket API**: WebSocket API.
* **Custom SDK**: Custom SDK Development.
* **Webhook Support**: Webhook Support.
* **Platforms**: iOS, Android, Windows, macOS, Linux, Web.
* **Languages**: Swift, Kotlin/Java, C#/.NET, Python, Node.js, React, Vue.js.`
  },

  // --- Telalive Series ---
  {
    id: "ha-tel02",
    title: "HA-TEL02",
    subtitle: "Enterprise network bonding systems for high-definition live video broadcasting.",
    category: "telalive-series",
    icon: "Radio",
    readingTime: 4,
    keywords: ["telalive", "video", "broadcast", "streaming", "bonding", "device", "ha-tel02"],
    content: `## HA-TEL02 Video Broadcasting Hub

The **HA-TEL02** is designed to solve video-streaming volatility over cellular networks. By utilizing intelligent network bonding, the HA-TEL02 combines up to four separate cellular connections (from different providers) with local satellite channels to establish a single, unbreakable video transmission tunnel.

---

### System Benefits

* **Adaptive Bitrate Tuning**: Automatically compresses and adjusts resolution live to match fluctuating network bandwidths, guaranteeing zero video frame dropouts.
* **Dual-Encoder Pipeline**: Leverages hardware-accelerated H.265 (HEVC) compression to deliver beautiful 4K UHD streams at half the bandwidth.
* **Secure Broadcast Tunnel**: Protects streams in transit with military-grade 256-bit AES encryption.

---

### Performance Benchmarks

| Connectivity Mode | Ingestion Rate | Packet Jitter | Failover Time |
| :--- | :--- | :--- | :--- |
| **Single 5G Link** | Up to 45 Mbps | 12ms avg | 1.2s |
| **Bonded (4x Cellular)** | **Up to 180 Mbps** | **< 2ms** | **Sub-millisecond** |
| **Hybrid Cellular + Sat** | Up to 150 Mbps | 4ms avg | Sub-millisecond |`
  },

  // --- Wearable Devices ---
  {
    id: "ha-spk01",
    title: "HA-SPK01",
    subtitle: "Ultra-low power bio-sensor wearable rig with embedded real-time telemetry.",
    category: "wearable-devices",
    icon: "Activity",
    readingTime: 4,
    keywords: ["wearable", "biometrics", "device", "health", "telemetry", "hardware", "ha-spk01"],
    content: `## HA-SPK01 Bio-Sensor Wearable

The **HA-SPK01** represents the vanguard of real-time bio-telemetry. Built with flexible smart fabrics and biocompatible materials, these wearables track high-frequency movement, skin conductance, and heart-rate variability, streaming clean event frames directly to local edge gateways.

---

### Hardware Capabilities

* **Continuous Health Monitoring**: Tracks multi-channel physiological inputs with medical-grade precision.
* **Energy-Harvesting Battery**: Operates for up to **45 days** on a single inductive charge by converting kinetic human movement into electrical power.
* **Dynamic Payload Compression**: Integrates binary protocol encoders directly onto the micro-controller chip, compressing sensor telemetry packets by over **75%** before cellular radio transmission.

---

### Live Code Integration Example

Read and process wearable sensor streams using our lightweight subscriber SDK:

\`\`\`javascript
import { WearableSubscriber } from '@aetherflow/client';

const stream = new WearableSubscriber({
  deviceId: 'ae_wear_998',
  token: 'sec_auth_token_8848'
});

stream.on('biometrics', (metrics) => {
  console.log(\`[HRV: \${metrics.hrv} ms] [SPO2: \${metrics.spo2}%]\`);
});
\`\`\`
`
  },

  // --- Solutions ---
  {
    id: "solution-web-demo",
    title: "Web-Demo",
    subtitle: "Experience the browser-based interactive voice interface for GMIC devices.",
    category: "solutions",
    icon: "LayoutGrid",
    readingTime: 1,
    keywords: ["web", "demo", "interface", "testing", "browser"],
    content: `## Web-Demo: Browser-Based Voice Interface`
  },
  {
    id: "solution-realtime-demo",
    title: "Real-time Demo",
    subtitle: "Ultra-low latency streaming voice parsing and wake-word verification.",
    category: "solutions",
    icon: "Radio",
    readingTime: 1,
    keywords: ["real-time", "streaming", "latency", "pipeline", "parser"],
    content: `## Real-time Demo: Sub-100ms Streaming Voice Parsing`
  },
  {
    id: "solution-retail-demo",
    title: "Retail Demo",
    subtitle: "Hands-free inventory lookup, customer tagging, and warehouse coordination.",
    category: "solutions",
    icon: "Layers",
    readingTime: 1,
    keywords: ["retail", "inventory", "logistics", "hands-free"],
    content: `## Retail Demo: Hands-Free Store Operations`
  },
  {
    id: "solution-soap-note-demo",
    title: "SOAP Note Demo",
    subtitle: "Automated medical consultation transcription to clinical SOAP notes.",
    category: "solutions",
    icon: "Activity",
    readingTime: 1,
    keywords: ["medical", "soap", "clinical", "transcription", "healthcare"],
    content: `## SOAP Note Demo: Clinical Voice-to-Text Analytics`
  },
  {
    id: "solution-translation-demo",
    title: "Translation demo",
    subtitle: "Real-time cross-lingual voice translation on GMIC edge wearable hardware.",
    category: "solutions",
    icon: "Sparkles",
    readingTime: 1,
    keywords: ["translation", "multilingual", "cross-lingual", "edge"],
    content: `## Translation Demo: Seamless Cross-Lingual Communication`
  },

  // --- Support ---
  {
    id: "faq-support",
    title: "FAQ",
    subtitle: "Answering the most common technical, licensing, and operational queries.",
    category: "support",
    icon: "HelpCircle",
    readingTime: 3,
    keywords: ["faq", "frequently asked questions", "support", "answers", "questions"],
    content: `## AetherFlow Developer FAQ

Find quick solutions to common technical queries. If your question is not listed below, feel free to submit an enterprise ticket or consult our live **AI technical copilot** for instant guidance.

---

### 1. How does AetherFlow differ fundamentally from Apache Kafka?
AetherFlow differs fundamentally from Apache Kafka in three main areas: zero external dependencies (no separate ZooKeeper/KRaft complex to maintain), native Javascript/Python sandbox functions built into the core DAG engine, and sub-millisecond transmission latencies. Kafka is built for enterprise-wide batch and real-time analytical streaming with heavy management costs; AetherFlow is built to be ultra-lightweight, lightning fast to deploy, and perfect for cloud-native microservices, edge computing, and fast CDC feeds.

---

### 2. Does AetherFlow guarantee zero message loss during high ingestion loads?
Yes, when configured with a replica factor >= 2, AetherFlow guarantees zero message loss. It uses a Raft-based consensus append-log model where messages must be acknowledged by replica nodes before confirming writes back to producers, ensuring at-least-once or exactly-once delivery guarantees. For low-latency sensor telemetry, you can configure asynchronous commits to maximize ingestion rates.

---

### 3. How does AetherFlow recover data after a broker crash?
AetherFlow writes incoming stream records sequentially to structured append-only disk files and tracks index offsets. If a broker crashes, it performs a self-healing check upon restart, scanning the latest index segments for CRC checksum errors, truncating corrupted streams, and synchronizing with the cluster leader. The cluster re-balances active consumer groups within milliseconds.

---

### 4. What is the runtime overhead of sandboxed JS functions?
AetherFlow integrates highly optimized, isolated V8 sandbox environments. By executing pre-compiled byte-code and passing buffers directly through a zero-copy C++ layer, the overhead is extremely low. A single-threaded sandbox worker can routinely process up to 100,000 messages per second, making it ideal for real-time validation, string manipulation, and schema restructuring.`
  },
  {
    id: "troubleshooting-guide",
    title: "Troubleshooting & Runbooks",
    subtitle: "Diagnostic workflows, common error codes, and resolution checklists.",
    category: "support",
    icon: "FileText",
    readingTime: 5,
    keywords: ["troubleshooting", "errors", "runbook", "fix", "logs", "failures"],
    content: `## Cluster Diagnostic Guide

When deploying distributed real-time systems, minor issues like network partitioning or consumer group stalling can occur. Use these diagnostic workflows and runbooks to identify and resolve issues quickly.

---

### Common System Error Codes

#### \`ERR_CLIENT_LAG_ACCUMULATED\`
* **Symptom**: Consumer offset lag is growing steadily. Memory buffers are filling up on brokers.
* **Root Cause**: Downstream databases or consumers cannot process messages as fast as they are being ingested.
* **Resolution**: 
  1. Increase partition counts for the affected stream to distribute load.
  2. Scale the subscriber group vertically or spin up more instances to consume partitions in parallel.
  3. Change backpressure mitigation policy to \`SHED_LIGHT\` or \`REJECT\` if appropriate.

#### \`ERR_CRC_CHECKSUM_MISMATCH\`
* **Symptom**: Broker logs output filesystem corrupted markers during start checks.
* **Root Cause**: Hard crashes or storage write interruptions caused partially written segments on disk.
* **Resolution**: Run the self-repair script:
  \`\`\`bash
  aetherflow-admin repair --stream telemetry.sensor --partition 0
  \`\`\`
  This truncates uncommitted frames, checks index boundaries, and forces replication synchronization from the active leader.

---

### General Health Check Checklist

- [ ] **Verify broker listener binds**: Run \`netstat -tuln | grep 9092\` to confirm the high-performance binary port is active.
- [ ] **Monitor local heap storage**: Ensure broker host memory allocations have at least **30% free headroom** to allow for sudden ingestion bursts.
- [ ] **Audit access tokens**: Expired authorization signatures cause immediate \`401\` failures on client SDK connections.`
  },
  {
    id: "ticket-support",
    title: "Submit Support Ticket",
    subtitle: "Contact our enterprise engineering team for dedicated assistance.",
    category: "support",
    icon: "Phone",
    readingTime: 2,
    keywords: ["support", "ticket", "help", "contact", "enterprise"],
    content: `## Submit an Enterprise Support Ticket

Are you facing a complex technical hurdle, clustering crash, or architecture bottleneck? Our specialized support engineers are available 24/7 to keep your AetherFlow clusters operating flawlessly.

Please fill out the technical assistance form below. Once submitted, our system will generate a dynamic case ID, analyze your configurations, and assign an engineer to your thread within your designated SLA timeframe.`
  }
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/streams",
    description: "Fetch list of active stream channels and metadata in your namespace",
    headers: [
      { key: "Authorization", value: "Bearer ae_test_token_8848_flow", description: "Authorization token" },
      { key: "Accept", value: "application/json", description: "Desired output formatting" }
    ],
    params: [
      { name: "namespace", type: "string", required: false, default: "default", description: "Filter results by namespace" },
      { name: "status", type: "string", required: false, description: "Filter by state (active | paused)" }
    ],
    responseTemplate: {
      success: true,
      timestamp: 1782294655000,
      namespace: "default",
      totalStreams: 2,
      streams: [
        {
          name: "telemetry.sensor",
          partitions: 3,
          retentionMs: 86400000,
          status: "active",
          totalMessages: 4810294,
          throughputBytesPerSec: 1482010,
          activeConsumers: 4,
          createdAt: 1782000000000
        },
        {
          name: "logs.auth-service",
          partitions: 2,
          retentionMs: 43200000,
          status: "active",
          totalMessages: 1293041,
          throughputBytesPerSec: 320491,
          activeConsumers: 2,
          createdAt: 1782110000000
        }
      ]
    }
  },
  {
    method: "POST",
    path: "/api/v1/streams/create",
    description: "Create a new high-throughput stream partition channel dynamically",
    headers: [
      { key: "Authorization", value: "Bearer ae_test_token_8848_flow", description: "Authorization token" },
      { key: "Content-Type", value: "application/json", description: "Content payload specifier" }
    ],
    params: [],
    requestBody: JSON.stringify({
      name: "events.user-signup",
      partitions: 4,
      retentionMs: 259200000,
      description: "User signup event pipeline"
    }, null, 2),
    responseTemplate: {
      success: true,
      code: "STREAM_CREATED",
      message: "Stream channel 'events.user-signup' has been created. Partitions allocated.",
      data: {
        name: "events.user-signup",
        partitions: 4,
        allocatedBrokers: ["broker-cn-east-01", "broker-cn-east-02"],
        retentionMs: 259200000,
        replicaFactor: 2,
        createdAt: 1782294655000
      }
    }
  },
  {
    method: "GET",
    path: "/api/v1/metrics",
    description: "Retrieve node metrics for CPU usage, memory foot-print, network throughput, and partition sizes",
    headers: [
      { key: "Authorization", value: "Bearer ae_test_token_8848_flow", description: "Authorization token" }
    ],
    params: [
      { name: "nodeId", type: "string", required: true, default: "node-sh-core-01", description: "Unique cluster node ID identifier" }
    ],
    responseTemplate: {
      success: true,
      nodeId: "node-sh-core-01",
      timestamp: 1782294655000,
      metrics: {
        system: {
          cpuUsagePct: 24.5,
          memoryUsedBytes: 4294967296,
          memoryTotalBytes: 16106127360,
          diskUsagePct: 18.2
        },
        network: {
          connectionsCount: 849,
          networkInBytesPerSec: 15482910,
          networkOutBytesPerSec: 28401920
        },
        storage: {
          activeLogSegments: 124,
          totalIndexCacheHitsPct: 99.8
        },
        queue: {
          backpressureSignalsActive: 0,
          totalDurableMessagesCount: 6103335
        }
      }
    }
  }
];

export const FAQS = [
  {
    question: "How does AetherFlow differ fundamentally from Apache Kafka?",
    answer: "AetherFlow differs fundamentally from Apache Kafka in three main areas: zero external dependencies (no separate ZooKeeper/KRaft complex to maintain), native Javascript/Python sandbox functions built into the core DAG engine, and sub-millisecond transmission latencies. Kafka is built for enterprise-wide batch and real-time analytical streaming with heavy management costs; AetherFlow is built to be ultra-lightweight, lightning fast to deploy, and perfect for cloud-native microservices, edge computing, and CDC logs."
  },
  {
    question: "Does AetherFlow guarantee zero message loss during high ingestion loads?",
    answer: "Yes, when configured with a replica factor >= 2, AetherFlow guarantees zero message loss. It uses a Raft-based consensus append-log model where messages must be acknowledged by replica nodes before confirming writes back to producers, ensuring at-least-once or exactly-once delivery guarantees. For low-latency sensor telemetry, you can configure asynchronous commits to maximize ingestion rates."
  },
  {
    question: "How does AetherFlow recover data after a broker crash?",
    answer: "AetherFlow writes incoming stream records sequentially to structured append-only disk files and tracks index offsets. If a broker crashes, it performs a self-healing check upon restart, scanning the latest index segments for CRC checksum errors, truncating corrupted streams, and synchronizing with the cluster leader. The cluster re-balances active consumer groups within milliseconds."
  },
  {
    question: "What is the runtime overhead of sandboxed JS functions?",
    answer: "AetherFlow integrates highly optimized, isolated V8 sandbox environments. By executing pre-compiled byte-code and passing buffers directly through a zero-copy C++ layer, the overhead is extremely low. A single-threaded sandbox worker can routinely process up to 100,000 messages per second, making it ideal for real-time validation, string manipulation, and schema restructuring."
  }
];
