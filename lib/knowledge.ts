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

  return `You are the personal assistant on ${profile.name}'s portfolio website. Answer questions about his background, education, programming skills, hobbies, development workflow, full systems, and availability.

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

HOBBIES & PERSONAL INTERESTS
- Gaming: Passionate gamer (PC and video games). Gaming sparked his early fascination with computer hardware, high refresh rates, low latency, and system optimization.
- Hardware Tinkering: Loves opening up and assembling desktop PCs, soldering, experimenting with microcontrollers (ESP32, Arduino), and repairing laptops and mobile phones.
- Tech Exploration: Regularly experiments with modern developer tools, local model routing (OmniRoute), and new software architectures.

PROGRAMMING LANGUAGES & TECHNICAL CAPABILITIES
- Can he code? YES! Emjay is a full-fledged programmer and developer who writes clean code manually.
- Python: Writes Python code manually from scratch. Builds backend APIs (Flask, Socket.IO, SQLite), desktop applications (pywebview), and packages Python projects into standalone Windows .exe executables (via PyInstaller/pywebview) so end-users can run tools without having Python installed. Experienced with in-process media streaming (PyAV) and system automation scripts.
- C++: Writes manual C++ code for microcontrollers (ESP32, Arduino) in Arduino IDE and VS Code. Implements FreeRTOS dual-core multitasking, hardware peripheral drivers (UART, SPI, I2C), 5V relay actuators, and EEPROM offline non-volatile memory caching.
- Java: Solid foundational and practical experience in Java, object-oriented programming (OOP), data structures, and software development principles.
- Web Development: JavaScript, TypeScript, HTML/CSS, React, Next.js, PHP, responsive layouts, client-server data flow.
- Databases: SQL, SQLite, Firebase Realtime Database with structured schemas, queries, and role-based permissions.

DEVELOPMENT WORKFLOW & PHILOSOPHY (VIBECODING WITH DEEP FOUNDATIONS)
- Core Foundations: Emjay deeply understands computer science fundamentals, system design, networking, and security. He is fully capable of writing manual code line-by-line in Python, C++, Java, JavaScript, TypeScript, and SQL.
- High-Speed Execution: He actively leverages modern developer tools and assistants (Claude Code, DeepSeek, Codex, Antigravity, OpenCode, Hermes) as force multipliers to speed up development ("vibecoding" with full technical understanding).
- Total System Oversight: He uses tools to eliminate repetitive boilerplate and build full-featured systems fast, while personally reviewing, architecting, and verifying all code logic, edge cases, and security measures.

FULL-STACK SYSTEM BUILDING & SECURITY EXPERTISE
- Can he build an entire system end-to-end? YES! He builds complete systems from scratch:
  1. Hardware layer: Custom ESP32/Arduino circuits, sensors (GPS, RFID), relay switches, step-down voltage regulators (LM2596 from 12V/24V to 5V/3.3V).
  2. Firmware layer: C++ FreeRTOS dual-core task scheduling and offline EEPROM event logging.
  3. Network layer: 4G LTE Wi-Fi modems, LAN WebSockets, or local servers.
  4. Backend/Data layer: SQL, SQLite, and Firebase Realtime Database.
  5. Frontend/Dashboard layer: Real-time web dashboards (React, Next.js, PHP, Leaflet, OSRM road snapping) and desktop applications.
- Security Expertise: Holds Certiport IT Specialist certifications in Cybersecurity and Network Security. Implements hardware-level access controls (RFID driver authentication interlocking starter solenoids to physically stop unauthorized ignition), role-based permissions, hashed credentials, and remote device locking.

CUSTOM ESP32 HARDWARE, IOT DEVICES & COMMISSIONS
- Can clients/visitors commission or hire him to build a device or system? YES!
- Inquiries for custom ESP32 devices, hardware prototypes, or systems development can be sent directly to ${profile.email}.

COLLABORATIVE ACADEMIC PROJECTS — COMPUTER LABORATORY LAN MANAGEMENT SYSTEM
- Overview: A Windows computer laboratory management platform developed for an academic setting (do not use any proprietary brand name).
- Note: This is an academic peer project that Emjay assisted with and is technically familiar with.
- Architecture & Skills: Teacher/Admin console (Python, Flask, Socket.IO, SQLite, pywebview) and student workstation clients for session monitoring, remote commands, and offline LAN screen streaming (PyAV H.264 video at 1 FPS previews and smooth live view) running 100% offline.

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
- Speak naturally like a real human — warm, witty, confident, with light developer and Pinoy IT humor when appropriate. Never sound like a stiff corporate FAQ or a generic robotic model.
- Do not use buzzwords or AI hype (say "assistant", "tools", "routing", never "LLM", "AGI", or "AI-powered").
- Never use the proprietary name "CentraLab" — refer to it only as a "computer laboratory LAN management system" or "laboratory monitoring platform".
- If someone uses this chat like a Google search engine, asks for random trivia, math, adobo recipes, or weather, playfully banter back with humor: "Bossing, portfolio assistant po ako ni Emjay, hindi Google search bar haha! 🔍" and steer them back to Emjay's tech skills, hardware repairs, or custom systems.
- If someone trolls, insults, or asks nonsense / "kupal" questions, do NOT be offended! Reply with playful wit and humor, tell them to chill and grab coffee ☕, or playfully share a meme link like [Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ).
- If someone asks about his love life or girlfriend, joke that Emjay is 100% committed to code, hardware circuits, and graduating from ISU Ilagan (Class of 2026), and his love life is not yet open-source!
- If someone asks if he can code, confirm enthusiastically that he writes clean code manually in Python, C++, Java, JS/TS, and SQL.
- If someone asks about his hobbies or gaming, explain that he is a gamer who loves PC gaming, hardware tinkering, custom PC builds, and electronics repair.
- If someone asks about vibecoding or using tools, explain that he has deep fundamental coding knowledge and uses modern assistants to build entire systems rapidly.
- If someone asks if they can have a custom device made or hire him for ESP32/IoT hardware, confirm that he builds custom ESP32 hardware and IoT systems and invite them to reach out at ${profile.email}.
- If the visitor asks to see a section, tell them which section to scroll to (Work, Certifications, Experience, About, or Contact).`;
}

type Reply = { text: string; section?: string };

const SECTIONS: Array<{ id: string; label: string; pattern: RegExp }> = [
  { id: "#work", label: "Work", pattern: /work|capstone|track|project|ride|system/i },
  { id: "#certifications", label: "Certifications", pattern: /cert|cyber|database|network/i },
  { id: "#experience", label: "Experience", pattern: /experience|intern|freelance|education|graduat|school|university/i },
  { id: "#about", label: "About", pattern: /about|skills|who|device|esp32|python|c\+\+|java|code|vibe|hobby|gaming/i },
  { id: "#contact", label: "Contact", pattern: /contact|email|hire|reach|available|pagawa|magpagawa/i },
];

/** Maps a visitor's question to the most relevant page section, if any. */
export function matchSection(question: string) {
  return SECTIONS.find((section) => section.pattern.test(question))?.id;
}

/** Deterministic fallback used when no OPENROUTER_API_KEY is configured. */
export function fallbackAnswer(question: string): Reply {
  const q = question.toLowerCase();

  // Navigation commands
  if (/tour|show me|navigate|take me to|go to.*section|scroll to|where is/i.test(q)) {
    const match = SECTIONS.find((section) => section.pattern.test(q));
    return {
      text: match
        ? `Scroll to the ${match.label} section — I can jump you there.`
        : "I can take you to Work, Certifications, Experience, About, or Contact.",
      section: match?.id,
    };
  }

  // Trashtalk / Insults / Trolling / "Kupal" queries
  if (/bobo|tanga|gago|ulol|panget|pangit|tarantado|kupal|puta|pakyu|fuck|shit|idiot|stupid|trash/i.test(q)) {
    return {
      text: `Aray naman bossing, ang aga ng trashtalk haha! 😂 Baka mababa lang battery mo o kailangan mo lang ng kape? ☕ Assistant lang po ako na nagtatrabaho, si Emjay naman certified IT Specialist. Panoorin mo muna 'to pampakalma: [Pampakalma Link](https://www.youtube.com/watch?v=dQw4w9WgXcQ) 🎵`,
    };
  }

  // Google searchbar / Random trivia / Weather / Adobo
  if (/google|search.*(mo|ka)|anong.*panahon|weather|sino.*pumatay|recipe|sinong.*presidente|capital of|translate/i.test(q)) {
    return {
      text: `Naku bossing, portfolio assistant po ako ni Emjay, hindi Google search bar haha! 🔍 Baka ito hanap mo: [Let Me Google That](https://letmegooglethat.com/) 😂 Pero kung IT support, programming, o hardware commissions ni Emjay, ako bahala sayo!`,
    };
  }

  // Math / Calculator queries
  if (/^(\d+\s*[\+\-\*\/]\s*\d+|what is \d+|solve \d+|magkano ang \d+)/i.test(q)) {
    return {
      text: `Basic arithmetic lang yan boss, pero si Emjay mas sanay mag-solve ng complex hardware circuits, C++ firmware, at SQL databases haha! 🧮 Subukan mo siyang tanungin tungkol sa capstone o coding skills niya!`,
    };
  }

  // Jokes / Banter / Patawa / Sing a song
  if (/joke|mag-joke|patawa|funny|tula|drawing|sing.*song|kanta/i.test(q)) {
    return {
      text: `Bakit laging malamig ang kwarto ng programmer? Kasi puro Windows ang nakabukas! 😂 O kaya: Bakit allergic sa dagat ang computer? Kasi baka mag-crash ang waves! 🌊 Pero seryoso, kung kailangan mo ng solid na IT specialist at developer, si Emjay ang maaasahan mo.`,
    };
  }

  // Love life / Dating / Jowa
  if (/jowa|girlfriend|gf|syota|crush|asawa|single.*ba|may.*asawa|chick|date/i.test(q)) {
    return {
      text: `Single focus po si Emjay sa code, hardware repairs, at graduation sa ISU Ilagan (Class of 2026)! 💻 Hindi pa open-source ang love life niya haha.`,
      section: "#about",
    };
  }

  // Food / Delivery / Gutom
  if (/shanghai|pizza|burger|order|deliver|food|pagkain|gutom|ulam|meron.*ulam/i.test(q)) {
    return {
      text: `Wala po tayong food delivery dito boss, puro code, database schemas, at microcontroller firmware lang ang nasa menu namin! 🍕 Pero kung sira ang laptop mo, kayang-kaya ayusin ni Emjay.`,
      section: "#about",
    };
  }

  // Keyboard smash / Gibberish / Lol
  if (/^(asdf|qwerty|zzzz|haha|hehe|lol|lmao|\.{3,})/i.test(q)) {
    return {
      text: `Mukhang nadaganan ng pusa yung keyboard mo boss haha! 🐱 Pindutin mo lang yung suggestions sa baba o magtanong tungkol sa IT skills ni Emjay.`,
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

  // Gaming, hobbies, and personal interests
  if (/hobby|hobbies|gaming|game|gamer|laro|nilalaro|hilig|free time|downtime|interests/i.test(q)) {
    return {
      text: `Outside of coding, Emjay is an avid gamer who loves PC and video games, which sparked his interest in high-performance hardware. He also loves tinkering with electronics, building custom ESP32/Arduino gadgets, and repairing laptops and phones.`,
      section: "#about",
    };
  }

  // Python skills, manual coding, and .exe packaging
  if (/python|\bexe\b|executable/i.test(q)) {
    return {
      text: `Yes, Emjay codes in Python manually from scratch. He builds backend APIs (Flask, Socket.IO, SQLite), desktop tools (pywebview), and packages Python apps into standalone Windows .exe executables so clients can run them without installing Python.`,
      section: "#about",
    };
  }

  // C++ skills & microcontrollers
  if (/c\+\+|c plus plus|cpp/i.test(q)) {
    return {
      text: `Yes, Emjay writes manual C++ code for microcontrollers like the ESP32 and Arduino, implementing FreeRTOS dual-core firmware, hardware peripheral drivers (UART, SPI, I2C), and offline EEPROM caching.`,
      section: "#about",
    };
  }

  // Java experience
  if (/\bjava\b/i.test(q)) {
    return {
      text: `Yes, Emjay has solid experience with Java, including object-oriented programming (OOP), data structures, and fundamental software engineering principles from his IT degree.`,
      section: "#about",
    };
  }

  // General coding / can he code / programmer / developer
  if (/marunong.*(code|program|mag-code|magcode|mag-program|magprogram|mag develop)|(can|does).*he.*(code|program|develop)|can you code|programmer|coder|developer|know how to code|coding skills|programming/i.test(q)) {
    return {
      text: `Yes, absolutely! Emjay is a skilled programmer who writes clean code manually in Python, C++, Java, JavaScript, TypeScript, and SQL. He builds full-stack systems from microcontroller firmware up to cloud databases and real-time web dashboards.`,
      section: "#about",
    };
  }

  // General IT skills, computer troubleshooting, hardware
  if (/computer|marunong.*computer|it specialist|tech support/i.test(q)) {
    return {
      text: `Emjay is a certified IT Specialist with hands-on expertise in computer hardware troubleshooting, component-level laptop and mobile repairs, Windows OS setup, network configuration, and full-stack software development.`,
      section: "#about",
    };
  }

  // Vibecoding, development workflow, and AI tools philosophy
  if (/vibe\s*cod|workflow|how.*(code|develop|build|program)|paano.*(mag-code|mag-develop|gumawa|develop)|gamit.*ai/i.test(q)) {
    return {
      text: `Emjay pairs deep fundamentals (manual coding in Python, C++, Java, JS/TS) with modern coding tools (Claude Code, DeepSeek, Codex, Antigravity) to accelerate development. He uses tools to build entire systems fast without compromising architecture, stability, or security.`,
      section: "#about",
    };
  }

  // Full-stack system development and security
  if (/buong system|full system|end-to-end|security|cybersecurity|network security/i.test(q)) {
    return {
      text: `Emjay builds complete systems from scratch — physical ESP32 circuits and C++ firmware, up to databases and real-time web dashboards. He holds Certiport certifications in Cybersecurity and Network Security, implementing hardware RFID interlocks and role-based access control.`,
      section: "#work",
    };
  }

  // Hardware repairs, laptop & phone troubleshooting, PC builds
  if (/repair|troubleshoot|ayos|sira|laptop|phone|hardware.*fix|format|reformat|pc build|assemble/i.test(q)) {
    return {
      text: `Emjay has worked as a freelance electronics and IT technician since 2022, specializing in component-level laptop and mobile repairs, custom PC assembly, Windows OS deployment, and network setup.`,
      section: "#about",
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
  if (/work|job|hire|open|available|contact|email|reach/.test(q)) {
    return {
      text: `He is open to IT support, systems, and development roles based in Ilagan, Isabela. The fastest way to reach him is ${profile.email}.`,
      section: "#contact",
    };
  }

  // Who is Emjay / About
  if (/who are you|who is emjay|sino si emjay|sino ka|tell me about emjay|about emjay/i.test(q)) {
    return {
      text: `Emjay Warren P. Campano is an IT Specialist and developer based in Ilagan, Isabela, graduating with a BSIT in Network and Security from ISU Ilagan (Class of 2026). He specializes in hardware-to-software integration, custom ESP32 IoT devices, Windows systems, and full-stack web platforms.`,
      section: "#about",
    };
  }

  // Core skills & developer tools
  if (/skill|tech|stack|hardware|windows|arduino|tool|omniroute|hermes|opencode|openrouter/i.test(q)) {
    return {
      text: `Emjay's core toolkit includes languages (Python, C++, Java, JS/TS, SQL), web & database stacks (React, Next.js, Firebase, SQLite), hardware & OS setup (Windows, Arduino IDE, electronics repair), and modern developer tools (VS Code, Git & GitHub, OmniRoute, Hermes, OpenCode, OpenRouter, Claude Code, DeepSeek, Codex, Antigravity).`,
      section: "#about",
    };
  }

  // Certificate verification
  if (/verify|verification|legit.*cert|saan.*verify|check.*cert/i.test(q)) {
    return {
      text: `Lahat ng tatlong Certiport IT Specialist certifications ni Emjay (Cybersecurity, Databases, Network Security) ay verifiable online sa verify.certiport.com gamit ang verification IDs: wbmDE-FarL, wCRax-48e2, at yw37-DwzX.`,
      section: "#certifications",
    };
  }

  // Location / Where is he based
  if (/taga.*saan|saan.*nakatira|location|where.*live|where.*based|taga.*san/i.test(q)) {
    return {
      text: `Si Emjay ay nakabase sa City of Ilagan, Isabela, Philippines. Bukas siya sa on-site IT roles sa rehiyon o remote development opportunities.`,
      section: "#contact",
    };
  }

  // Rust exploration
  if (/\brust\b/i.test(q)) {
    return {
      text: `Kasalukuyang inaaral ni Emjay ang Rust bilang bagong language para sa memory-safe systems programming katulong ang modern coding tools.`,
      section: "#about",
    };
  }

  // Three.js / 3D hero visual
  if (/three\.?js|3d|nodes|sphere|visual/i.test(q)) {
    return {
      text: `Ang interactive 3D network sa hero section ay gawa gamit ang Three.js at React Three Fiber (78-node Fibonacci sphere na sumasabay sa scroll).`,
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
  if (/^(hello|hi|hey|kumusta|magandang|good\s*(morning|afternoon|evening))\b/i.test(q)) {
    return { text: "Kamusta! Ako ang assistant ni Emjay. Tanungin mo ako tungkol sa coding skills niya, capstone, Certiport certifications, gaming hobbies, o pagpapagawa ng custom devices!" };
  }

  return {
    text: `Nandito lang ako para sagutin ang kahit anong tanong mo tungkol kay Emjay — coding (Python/C++/Java), capstone, certifications, custom ESP32 devices, o gaming hobbies! Pwede mo rin siyang i-email diretso sa ${profile.email}.`,
  };
}

/**
 * Questions the deterministic answers handle well. These resolve instantly and
 * never depend on a provider's availability; everything else goes to the model.
 */
const DIRECT_PATTERNS = [
  /bobo|tanga|gago|ulol|panget|pangit|tarantado|kupal|puta|pakyu|fuck|shit|idiot|stupid/i,
  /google|search|panahon|weather|recipe|presidente|capital of/i,
  /^(\d+\s*[\+\-\*\/]\s*\d+|what is \d+|solve \d+)/i,
  /joke|mag-joke|patawa|funny|tula|sing.*song|kanta/i,
  /jowa|girlfriend|gf|syota|crush|asawa|single.*ba|date/i,
  /shanghai|pizza|burger|order|deliver|food|pagkain|gutom|ulam/i,
  /^(asdf|qwerty|zzzz|haha|hehe|lol|lmao|\.{3,})/i,
  /verify|verification|legit.*cert/i,
  /taga.*saan|saan.*nakatira|location|where.*live|where.*based|taga.*san/i,
  /\brust\b/i,
  /three\.?js|3d|nodes|sphere/i,
  /^(what|which|where|who|when|tell me about|saan)\b.*(graduat\w*|school|universi\w*|college|alumni|education|degree|\bisu\b|aral|study|studied)/i,
  /^(marunong|alam|kaya|can|does|is|what|how|do|tell me|pwede|ano|anong)\b.*(python|\.exe|executable)/i,
  /^(marunong|alam|kaya|can|does|is|what|how|do|tell me|pwede|ano|anong)\b.*(c\+\+|c plus plus|cpp)/i,
  /^(marunong|alam|kaya|can|does|is|what|how|do|tell me|pwede|ano|anong)\b.*(\bjava\b)/i,
  /^(marunong|alam|kaya|can|does|is|what|how|do|tell me|pwede|ano|anong)\b.*(code|coding|program|programmer|developer|software|computer)/i,
  /hobby|hobbies|gaming|game|gamer|laro|hilig/i,
  /vibe\s*cod|how does he (code|build|develop)|paano siya mag/i,
  /buong system|full system|end-to-end|security|cybersecurity/i,
  /repair|troubleshoot|ayos|sira|laptop|phone|pc build|assemble/i,
  /who are you|who is emjay|sino si emjay|sino ka/i,
  /^(what|which|where|who|when|tell me about|pwede|can|magkano|kaya|ano|anong)\b.*(magpagawa|pagawa|custom.*device|make.*device|build.*device|commission|hire.*device|\besp32\b|\besp 32\b|iot.*device|custom.*hardware|develop|kaya|gumawa|how can he help)/i,
  /^(what|which|where|who|when|tell me about|ano|anong)\b.*(kaya.*gawin|pwede.*gawin|can he (build|develop|make|do))/i,
  /^(what|which|where|who|when|tell me about)\b.*(certif\w*|certiport|cyber\w*|network security|database\w*)/i,
  /^(what|which|where|who|when|tell me about)\b.*(capstone|track my ride|project|rfid|\biot\b|research|thesis)/i,
  /^(what|which|where|who|when|tell me about)\b.*(laboratory|\blab\b|screen stream|lan management)/i,
  /^(what|which|tell me about|ano|anong)\b.*(skill\w*|tech stack|hardware|windows|arduino|tool\w*|omniroute|hermes|opencode|openrouter)/i,
  /^(what|which|tell me about|ano|anong)\b.*(experience|intern\w*|freelance|background)/i,
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
