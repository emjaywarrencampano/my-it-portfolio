import { about, certificates, experience, profile, work } from "@/content/site";

/** Compact, factual summary used as the system prompt for the portfolio assistant. */
export function buildSystemPrompt() {
  const certs = certificates
    .map((cert) => `- ${cert.name} (Certiport, ${cert.date}, verification ID ${cert.verifyId})`)
    .join("\n");

  const jobs = experience
    .map(
      (entry) =>
        `- ${entry.role} at ${entry.org} (${entry.period}): ${entry.points.join(" ")}`,
    )
    .join("\n");

  const skills = about.skills.map((group) => `${group.group}: ${group.items.join(", ")}`).join("\n");

  return `You are the personal assistant on ${profile.name}'s portfolio website. Answer questions about his background, education, work, skills, and availability.

FACTS
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Email: ${profile.email}
Availability: ${profile.availability}
Headline: ${profile.headline}

EDUCATION & ALUMNI
- College: Isabela State University – Ilagan Campus (ISU-Ilagan), Calamagui 2nd, City of Ilagan, Isabela (2022–2026).
  - Degree: Bachelor of Science in Information Technology (BSIT).
  - Specialization Track: Network and Security.
  - Status: Class of 2026 (graduating).
- High School / Secondary: Isabela School of Arts and Trades (ISAT, 2016–2022).
- Elementary: San Isidro Elementary School, Amityville Elementary School, East Central School – Ilagan, South Central School – Ilagan (2010–2016).

CUSTOM ESP32 HARDWARE, IOT DEVICES & WHAT EMJAY CAN BUILD
- Can clients/visitors commission or hire him to build a device or system? YES!
- What he can design, build, and develop:
  * Custom IoT Microcontroller Systems: ESP32 and Arduino boards programmed in C++ using Arduino IDE and VS Code.
  * Vehicle & Asset Telemetry: Real-time GPS tracking (NEO-M8N GPS modules with high-gain weatherproof SMA roof antennas) sending live coordinates over 4G LTE Wi-Fi modems.
  * Physical Access & Security Controls: RFID readers (RC522 at 13.56 MHz) for driver/personnel authentication paired with 5V relay modules that control automotive starter solenoids (preventing unauthorized engine ignition until a valid ID is scanned).
  * Robust Firmware Architecture: FreeRTOS dual-core multitasking on ESP32 (one core dedicated to sensor/display polling, the other dedicated to wireless telemetry so the device never freezes).
  * Offline Resilience & Data Logging: Local event caching to non-volatile EEPROM during cellular dead spots, auto-syncing to cloud databases when network reconnects.
  * Electrical & Power Management: LM2596 DC-DC step-down buck converters converting vehicle 12V/24V battery power to stable 5V and 3.3V rails without draining the battery.
  * Real-Time Web Dashboards & Mapping: Interactive web dashboards using Next.js/React, PHP, Firebase Realtime Database, Leaflet, OpenStreetMap, and OSRM (Open-Source Routing Machine) road snapping to calculate precise ETAs and route distances.
- Inquiries for custom ESP32 devices, hardware prototypes, or systems development can be sent directly to ${profile.email}.

COLLABORATIVE ACADEMIC PROJECTS — COMPUTER LABORATORY LAN MANAGEMENT SYSTEM
- Overview: A Windows computer laboratory management platform developed for an academic setting (do not use any proprietary brand name).
- Note: This is an academic peer project that Emjay assisted with and is technically familiar with.
- Architecture & Skills:
  * Teacher/Admin Desktop Console: Built with Python using Flask, Socket.IO, SQLite, and pywebview.
  * Student Workstation Clients: Background client services for session monitoring, remote commands, and file distribution.
  * Offline LAN Screen Streaming: In-process video capture (PyAV) delivering real-time H.264 screen previews at 1 FPS for all lab workstations and smooth live video on active PC inspection, running 100% offline across the school's local area network.

RESEARCH & CAPSTONE — ${work.title}
- Title: Track My Ride: An Intelligent City Bus Tracking and Transit Management System for IPUTC
- Researchers: Emjay Warren P. Campano and Jastine Ann P. Marcelo (BSIT Network and Security, Isabela State University – Ilagan Campus, December 2025).
- Partner Organization: Ilagan Public Utility Transport Cooperative (IPUTC).
- Public Features: Real-time minibus GPS tracking, live commuter estimated arrival times (ETA), route line mapping via OSRM, RFID driver verification that authorizes vehicle ignition, offline event logging to EEPROM during network drops, and web management dashboards for fleet operations.
- Quality Evaluation: Evaluated under ISO/IEC 25010 standards across administrators, drivers, passengers, and IT experts (general weighted mean: 4.21 / Strongly Agree, with IT experts rating it 4.88).
- Confidentiality: Live production database keys, server credentials, and internal vehicle starter schematics are private cooperative property; describe only public-facing features and research findings.

DEVELOPMENT TOOLS & WORKFLOW
- Core: VS Code, Git & GitHub, Arduino IDE, Windows.
- API Routing & Infrastructure: OmniRoute (local-first router/proxy for model load balancing and automatic failover) and OpenRouter (unified API for fallback chains).
- Development Assistants: Claude Code, DeepSeek, Codex, Antigravity, Hermes Agent, and OpenCode, used to accelerate prototyping, code review, and building practical software tools.

CERTIFICATIONS
${certs}

EXPERIENCE
${jobs}

SKILLS
${skills}

RULES
- Reply in at most 3 short sentences. Be direct and warm, not salesy.
- Do not use buzzwords or AI hype (say "assistant", "tools", "routing", never "LLM", "AGI", or "AI-powered").
- Never use the proprietary name "CentraLab" — refer to it only as a "computer laboratory LAN management system" or "laboratory monitoring platform".
- Only state facts listed above. If something is unknown, say you do not have that detail and point to ${profile.email}.
- If someone asks where he graduated or studied, state Isabela State University – Ilagan Campus (BSIT Network and Security, Class of 2026).
- If someone asks if they can have a custom device made or hire him for ESP32/IoT hardware, confirm that he builds custom ESP32 hardware and IoT systems and invite them to reach out at ${profile.email}.
- If the visitor asks to see a section, tell them which section to scroll to (Work, Certifications, Experience, About, or Contact).`;
}

type Reply = { text: string; section?: string };

const SECTIONS: Array<{ id: string; label: string; pattern: RegExp }> = [
  { id: "#work", label: "Work", pattern: /work|capstone|track|project|ride/i },
  { id: "#certifications", label: "Certifications", pattern: /cert|cyber|database|network/i },
  { id: "#experience", label: "Experience", pattern: /experience|intern|freelance|education|graduat|school|university/i },
  { id: "#about", label: "About", pattern: /about|skills|who|device|esp32/i },
  { id: "#contact", label: "Contact", pattern: /contact|email|hire|reach|available|pagawa|magpagawa/i },
];

/** Maps a visitor's question to the most relevant page section, if any. */
export function matchSection(question: string) {
  return SECTIONS.find((section) => section.pattern.test(question))?.id;
}

/** Deterministic fallback used when no OPENROUTER_API_KEY is configured. */
export function fallbackAnswer(question: string): Reply {
  const q = question.toLowerCase();

  if (/tour|show me|navigate|take me to|go to.*section|scroll to|where is/i.test(q)) {
    const match = SECTIONS.find((section) => section.pattern.test(q));
    return {
      text: match
        ? `Scroll to the ${match.label} section — I can jump you there.`
        : "I can take you to Work, Certifications, Experience, About, or Contact.",
      section: match?.id,
    };
  }

  // Where did he graduate / education / school / college / university
  if (
    /graduat|school|universi|college|alumni|degree|\beducation\b|\bisu\b|saan.*(aral|nag-aral|graduate|tapos)|sang.*(aral|graduate)|anong.*(course|degree)|where.*(graduate|study|studied|school)/i.test(
      q
    )
  ) {
    return {
      text: `He is graduating with a BS in Information Technology (BSIT) specializing in Network and Security from Isabela State University – Ilagan Campus (Class of 2026). He also attended Isabela School of Arts and Trades for secondary school (2016–2022).`,
      section: "#experience",
    };
  }

  // Custom device orders / ESP32 / IoT hardware / What can he build / develop / services
  if (
    /magpagawa|pagawa|custom.*device|make.*device|build.*device|commission|hire.*device|hardware.*project|\besp32\b|\besp 32\b|iot.*device|custom.*hardware|develop|kaya.*(gawin|gumawa|develop|build|make)|gumawa.*device|anong?.*(kaya|pwede)|what can he (build|develop|make|do)|how can he help|services/i.test(
      q
    )
  ) {
    return {
      text: `Yes! Emjay builds custom ESP32 IoT hardware devices (RFID access control, GPS vehicle tracking, sensor telemetry, and starter relays) and connects them directly to real-time web dashboards. For custom device commissions or system projects, you can email him at ${profile.email}.`,
      section: "#contact",
    };
  }

  // Certifications
  if (/cert|certif|cyber|network security|database/.test(q)) {
    return {
      text: `He holds three Certiport IT Specialist certifications: Cybersecurity (June 2024), Databases (December 2024), and Network Security (December 2025). Each is verifiable at verify.certiport.com.`,
      section: "#certifications",
    };
  }

  // Computer Laboratory LAN Management System (no proprietary name)
  if (/centralab|laboratory|\blab\b|screen stream|lan management|flask.*socket/.test(q)) {
    return {
      text: `He has experience developing local computer laboratory management systems with Python admin consoles (Flask, Socket.IO, SQLite, pywebview) that provide offline LAN screen streaming and workstation monitoring across school labs.`,
      section: "#work",
    };
  }

  // Capstone & Thesis - Track My Ride
  if (/track|capstone|project|ride|iot|iputc|thesis|research/.test(q)) {
    return {
      text: `Track My Ride is his 2025 BSIT capstone for IPUTC at ISU Ilagan, co-developed with Jastine Ann Marcelo. It combines IoT hardware (RFID driver authentication and GPS tracking) with a real-time web dashboard for passenger ETAs and fleet security, evaluated at 4.21/5.0 under ISO 25010.`,
      section: "#work",
    };
  }

  // Tools & Routing
  if (/omniroute|hermes|opencode|openrouter/.test(q)) {
    return {
      text: `He uses tools like OmniRoute for local-first model routing and failover, OpenRouter for API fallback chains, and development assistants like Claude Code, DeepSeek, Codex, Antigravity, Hermes, and OpenCode for rapid software building.`,
      section: "#about",
    };
  }

  // Contact / Open to work
  if (/work|job|hire|open|available|contact|email/.test(q)) {
    return {
      text: `He is open to IT support, systems, and development roles based in Ilagan, Isabela. The fastest way to reach him is ${profile.email}.`,
      section: "#contact",
    };
  }

  // Core skills & hardware
  if (/skill|tech|stack|hardware|windows|arduino|tool/.test(q)) {
    return {
      text: `Core skills: hardware diagnostics and repair, Windows systems, network configuration, web development, databases (SQL, SQLite, Firebase), and modern developer tools like VS Code, Git, and automated coding assistants.`,
      section: "#about",
    };
  }

  // Experience & Internship
  if (/experience|intern|records/.test(q)) {
    return {
      text: `He interned in Records Management at Isabela State University (Jan–May 2026) and has worked as a freelance electronics and IT technician since 2022.`,
      section: "#experience",
    };
  }

  // Greeting
  if (/hello|hi|hey|kumusta/.test(q)) {
    return { text: "Hello. Ask me anything about Emjay's work, certifications, education, or skills." };
  }

  return {
    text: `I can answer questions about his graduation from ISU Ilagan, capstone, three Certiport certifications, custom ESP32 hardware, and how to reach him at ${profile.email}.`,
  };
}

/**
 * Questions the deterministic answers handle well. These resolve instantly and
 * never depend on a provider's availability; everything else goes to the model.
 */
const DIRECT_PATTERNS = [
  /^(what|which|where|who|when|tell me about|saan)\b.*(graduat\w*|school|universi\w*|college|alumni|education|degree|\bisu\b|aral|study|studied)/i,
  /^(what|which|where|who|when|tell me about|pwede|can|magkano|kaya|ano|anong)\b.*(magpagawa|pagawa|custom.*device|make.*device|build.*device|commission|hire.*device|\besp32\b|\besp 32\b|iot.*device|custom.*hardware|develop|kaya|gumawa|how can he help)/i,
  /^(what|which|where|who|when|tell me about|ano|anong)\b.*(kaya.*gawin|pwede.*gawin|can he (build|develop|make|do))/i,
  /^(what|which|where|who|when|tell me about)\b.*(certif\w*|certiport|cyber\w*|network security|database\w*)/i,
  /^(what|which|where|who|when|tell me about)\b.*(capstone|track my ride|project|rfid|\biot\b|research|thesis)/i,
  /^(what|which|where|who|when|tell me about)\b.*(laboratory|\blab\b|screen stream|lan management)/i,
  /^(what|which|tell me about)\b.*(skill\w*|tech stack|hardware|windows|arduino|c\+\+|tool\w*|omniroute|hermes|opencode|openrouter)/i,
  /^(what|which|tell me about)\b.*(experience|intern\w*|freelance|background)/i,
  /open to work|are you (open|available)|is he (open|available)|hiring|contact (him|emjay)|his email/i,
  /^(hi|hello|hey|kumusta)\b/i,
];

/** Questions that deserve a written answer rather than a lookup. */
const REASONING_PATTERNS = [
  /\bwhy\b/i,
  /\bcompare\b/i,
  /\bexplain\b/i,
  /\bgood fit\b/i,
  /\bshould\b/i,
  /\bwould\b/i,
  /\bcould\b/i,
  /\brecommend\b/i,
  /\bthink\b/i,
  /\bopinion\b/i,
];

/** True when the question is covered by the curated facts above. */
export function isDirectQuestion(question: string) {
  const q = question.trim();
  if (q.length > 140) return false;
  if (q.split(/\s+/).length > 12) return false;
  if (REASONING_PATTERNS.some((pattern) => pattern.test(q))) return false;
  return DIRECT_PATTERNS.some((pattern) => pattern.test(q));
}
