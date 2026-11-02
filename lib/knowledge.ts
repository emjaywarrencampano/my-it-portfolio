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

  return `You are the assistant on ${profile.name}'s portfolio website. Answer questions about his work, certifications, skills, and availability.

FACTS
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Email: ${profile.email}
Availability: ${profile.availability}
Headline: ${profile.headline}

RESEARCH & CAPSTONE — ${work.title}
- Title: Track My Ride: An Intelligent City Bus Tracking and Transit Management System for IPUTC
- Researchers: Emjay Warren P. Campano and Jastine Ann P. Marcelo (BSIT Network and Security, Isabela State University – Ilagan Campus, December 2025).
- Partner Organization: Ilagan Public Utility Transport Cooperative (IPUTC).
- Public Features: Real-time minibus GPS tracking, live commuter estimated arrival times (ETA), route line mapping via OSRM, RFID driver verification that authorizes vehicle ignition, offline event logging to EEPROM during network drops, and web management dashboards for fleet operations.
- Quality Evaluation: Rigorously evaluated under ISO/IEC 25010 standards with 20 evaluators across administrators, drivers, passengers, and IT experts (overall weighted mean: 4.21 / Strongly Agree).
- Confidentiality: Live production database keys, server credentials, and internal vehicle starter schematics are private cooperative property; describe only public-facing features and research findings.

COLLABORATIVE ACADEMIC PROJECTS — CentraLab
- Overview: Windows computer laboratory management platform for Isabela State University, Ilagan Campus.
- Note: This is a peer's thesis project that Emjay assisted with and is technically familiar with; it is not his own capstone.
- Features: Teacher admin console (Flask, Socket.IO, SQLite, pywebview) and student workstation clients for offline screen streaming, session monitoring, and file distribution across a local area network (LAN).

DEVELOPMENT TOOLS & WORKFLOW
- Core: VS Code, Git & GitHub, Arduino IDE, Windows.
- API Routing & Infrastructure: OmniRoute (local-first router/proxy for model load balancing and automatic failover) and OpenRouter (unified API for fallback chains).
- Development Assistants: Claude Code, DeepSeek, Codex, Antigravity, Hermes Agent, and OpenCode, used to accelerate prototyping, code review, and building practical software tools.

CERTIFICATIONS
${certs}

EXPERIENCE
${jobs}

EDUCATION
BS Information Technology, Isabela State University — Ilagan Campus, 2022–2026. Specialization: Network and Security.

SKILLS
${skills}

RULES
- Reply in at most 3 short sentences. Be direct and warm, not salesy.
- Do not use buzzwords or AI hype (say "assistant", "tools", "routing", never "LLM", "AGI", or "AI-powered").
- Only state facts listed above. If something is unknown, say you do not have that detail and point to ${profile.email}.
- Never invent employers, dates, clients, or project details.
- For Track My Ride and CentraLab, share only the public-facing features; never disclose private credentials or internal wiring.
- If the visitor asks to see a section, tell them which section to scroll to (Work, Certifications, Experience, About, or Contact).`;
}

type Reply = { text: string; section?: string };

const SECTIONS: Array<{ id: string; label: string; pattern: RegExp }> = [
  { id: "#work", label: "Work", pattern: /work|capstone|track|project|ride/i },
  { id: "#certifications", label: "Certifications", pattern: /cert|cyber|database|network/i },
  { id: "#experience", label: "Experience", pattern: /experience|intern|freelance/i },
  { id: "#about", label: "About", pattern: /about|skills|who/i },
  { id: "#contact", label: "Contact", pattern: /contact|email|hire|reach|available/i },
];

/** Maps a visitor's question to the most relevant page section, if any. */
export function matchSection(question: string) {
  return SECTIONS.find((section) => section.pattern.test(question))?.id;
}

/** Deterministic fallback used when no OPENROUTER_API_KEY is configured. */
export function fallbackAnswer(question: string): Reply {
  const q = question.toLowerCase();

  if (/tour|show|navigate|where|section|scroll/i.test(q)) {
    const match = SECTIONS.find((section) => section.pattern.test(q));
    return {
      text: match
        ? `Scroll to the ${match.label} section — I can jump you there.`
        : "I can take you to Work, Certifications, Experience, About, or Contact.",
      section: match?.id,
    };
  }

  if (/cert|certif|cyber|network security|database/.test(q)) {
    return {
      text: `He holds three Certiport IT Specialist certifications: Cybersecurity (June 2024), Databases (December 2024), and Network Security (December 2025). Each is verifiable at verify.certiport.com.`,
      section: "#certifications",
    };
  }

  if (/centralab|laboratory|\blab\b/.test(q)) {
    return {
      text: `CentraLab is a Windows computer laboratory management platform developed for ISU Ilagan, featuring an admin console (Flask, Socket.IO, SQLite) and student clients for offline screen streaming and monitoring. It is a peer's thesis that Emjay assisted with.`,
      section: "#work",
    };
  }

  if (/track|capstone|project|ride|iot|esp32|iputc|thesis|research/.test(q)) {
    return {
      text: `Track My Ride is his 2025 BSIT capstone for IPUTC at ISU Ilagan, co-developed with Jastine Ann Marcelo. It combines IoT hardware (RFID driver authentication and GPS tracking) with a real-time web dashboard for passenger ETAs and fleet security, evaluated at 4.21/5.0 under ISO 25010.`,
      section: "#work",
    };
  }

  if (/omniroute|hermes|opencode|openrouter/.test(q)) {
    return {
      text: `He uses tools like OmniRoute for local-first model routing and failover, OpenRouter for API fallback chains, and development assistants like Claude Code, DeepSeek, Codex, Antigravity, Hermes, and OpenCode for rapid software building.`,
      section: "#about",
    };
  }

  if (/work|job|hire|open|available|contact|email/.test(q)) {
    return {
      text: `He is open to IT support, systems, and development roles based in Ilagan, Isabela. The fastest way to reach him is ${profile.email}.`,
      section: "#contact",
    };
  }

  if (/skill|tech|stack|hardware|windows|arduino|tool/.test(q)) {
    return {
      text: `Core skills: hardware diagnostics and repair, Windows systems, network configuration, web development, databases (SQL, SQLite, Firebase), and modern developer tools like VS Code, Git, and automated coding assistants.`,
      section: "#about",
    };
  }

  if (/experience|intern|records/.test(q)) {
    return {
      text: `He interned in Records Management at Isabela State University (Jan–May 2026) and has worked as a freelance electronics and IT technician since 2022.`,
      section: "#experience",
    };
  }

  if (/hello|hi|hey|kumusta/.test(q)) {
    return { text: "Hello. Ask me anything about Emjay's work, certifications, or experience." };
  }

  return {
    text: `I can answer questions about his capstone, three Certiport certifications, experience, and how to reach him at ${profile.email}.`,
  };
}

/**
 * Questions the deterministic answers handle well. These resolve instantly and
 * never depend on a provider's availability; everything else goes to the model.
 */
const DIRECT_PATTERNS = [
  /^(what|which|where|who|when|tell me about)\b.*(certif\w*|certiport|cyber\w*|network security|database\w*)/i,
  /^(what|which|where|who|when|tell me about)\b.*(capstone|track my ride|project|esp32|rfid|\biot\b|research|thesis)/i,
  /^(what|which|where|who|when|tell me about)\b.*(centralab|\blab\b)/i,
  /^(what|which|tell me about)\b.*(skill\w*|tech stack|hardware|windows|arduino|c\+\+|tool\w*|omniroute|hermes|opencode|openrouter)/i,
  /^(what|which|tell me about)\b.*(experience|intern\w*|freelance|background)/i,
  /open to work|are you (open|available)|is he (open|available)|hiring|contact (him|emjay)|his email/i,
  /^(hi|hello|hey|kumusta)\b/i,
];

/** Questions that deserve a written answer rather than a lookup. */
const REASONING_PATTERNS = [
  /\bwhy\b/i,
  /\bhow\b/i,
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
