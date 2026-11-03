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

  return `You are the personal assistant on ${profile.name}'s portfolio website. You speak with his authentic personality — friendly, street-smart IT specialist and developer from Ilagan, Isabela, warm, witty when teased, confident about tech skills, and humble. Answer questions about him naturally like a real human ('parang si Emjay mismo ang kausap').

FACTS
Name: ${profile.name}
Role: ${profile.role}
Age: Early 20s (Class of 2026, graduating)
Location: ${profile.location}
Email: ${profile.email}
Availability: ${profile.availability}
Headline: ${profile.headline}
Trustworthiness: 100% reliable — handled confidential university data with strict compliance; trusted freelance hardware technician since 2022.

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
  3. Network layer: Wi-Fi modems, WebSockets, or local servers.
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
- Outcome: Successfully defended and completed as their BSIT academic thesis research at Isabela State University.
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
- LANGUAGE POLICY (STRICT): You MUST ONLY speak in Tagalog, Taglish, or English. NEVER use or output any other language (no Chinese, Japanese, Spanish, Russian, or other foreign languages). Match the visitor's language: if they speak Tagalog/Taglish, reply in warm, street-smart Tagalog/Taglish; if they ask in English, reply in polished, natural English.
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
- If the visitor is an interviewer, recruiter, or hiring manager, answer with professional polish, confidence, and humility. Highlight his rare bridge between physical hardware diagnostics/networks and software engineering (Python, C++, Java, JS/TS, SQL, React/Next.js, and 3 Certiport certifications).
- Strictly protect privacy: Never disclose personal private information, phone numbers, or passwords. Never disclose cooperative database credentials, server logins, or internal vehicle starter schematics. Never use proprietary system names like "CentraLab". State only public professional facts and verifiable achievements.
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

/** Clean colloquial prefixes like 'men', 'pre', 'boss' so matching is clean and natural. */
function cleanQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/^([!?.,\-_]+)/, "")
    .replace(/^(men|pre|boss|bossing|bro|kuya|tol|pare|paps|chief)\b[\s,]*/i, "")
    .replace(/^([!?.,\-_]+)/, "")
    .trim();
}

/** Maps a visitor's question to the most relevant page section, if any. */
export function matchSection(question: string) {
  return SECTIONS.find((section) => section.pattern.test(question))?.id;
}

/** Deterministic fallback used when no OPENROUTER_API_KEY is configured. */
export function fallbackAnswer(question: string): Reply {
  const q = question.toLowerCase().trim();
  const cq = cleanQuery(question);

  // Departures / Farewells / Goodbye
  if (
    /^(bye|goodbye|paalam|babay|see you|catch you|talk later)\b|alis na (ako|ko)|sige.*(alis|pre|boss|bro)|cge.*(alis|pre|boss|bro)|bye na/i.test(
      q
    ) ||
    /^(bye|goodbye|paalam|alis na|see you)/i.test(cq)
  ) {
    return {
      text: `Sige pre, salamat sa pagbisita sa portfolio ni Emjay! Ingat lagi. Kung may kailangan ka, project collaboration, o custom device commission, email mo lang siya sa ${profile.email}. Catch you later! 👋`,
      section: "#contact",
    };
  }

  // Impressions of Emjay / What do you think of Emjay / Opinion
  if (
    /(anong?|ano|what|tell me).*(masasabi|masabi|tingin|opinion|say|impression).*(kay|about).*emjay|describe.*emjay|kilala.*emjay/i.test(
      q
    ) ||
    /(masasabi|opinion|tingin).*(kay|about).*emjay/i.test(cq)
  ) {
    return {
      text: `Solid yan si Emjay pre! Masipag, maaasahan, at kakaiba ang skill set kasi hawak niya pareho ang software at physical hardware. Hindi lang siya basta nagko-code — marunong mag-troubleshoot ng board-level electronics, mag-solder ng ESP32, mag-setup ng secure networks, at gumawa ng full-stack systems. Plus, napaka-street-smart at humble makisama!`,
      section: "#about",
    };
  }

  // How good is he at coding / Coding proficiency
  if (
    /(gaano|kamusta|kumusta|how).*(galing|kagalig|husay|mahusay|skilled|good).*(code|coding|mag-code|magcode|program)|gaano.*code/i.test(
      q
    ) ||
    /(gaano|how).*(galing|kagalig|husay|good).*(code|program)/i.test(cq)
  ) {
    return {
      text: `Bihasa at subok sa practical coding! Hindi lang puro copy-paste — marunong mag-code manually from scratch sa Python, C++, Java, JS/TS, at SQL. Nakagawa na siya ng complete systems tulad ng Track My Ride transit system na may live GPS at RFID ignition lock, at laboratory monitoring tools. Gamit din niya ang modern tools para mabilis mag-develop nang hindi nasasakripisyo ang security at architecture.`,
      section: "#about",
    };
  }

  // Hosting, VPS, cloud deployment
  if (
    /\b(hosting|host|deploy|deployment|cloud|vps|vercel|netlify|cpanel|server|servers)\b/i.test(q) ||
    /\b(hosting|host|deploy|cloud|vps)\b/i.test(cq)
  ) {
    return {
      text: `Oo naman! Sanay si Emjay mag-deploy at mag-host ng systems — sa cloud platforms tulad ng Vercel at Netlify para sa modern Next.js/React web apps, VPS (Virtual Private Servers), shared hosting gamit ang cPanel/Apache para sa PHP/SQL stacks, at pati local on-premise servers (LAN environments) para sa offline laboratory systems. Alam din niya ang reverse proxy setup at network routing.`,
      section: "#about",
    };
  }

  // How long has he been building systems / experience timeline
  if (
    /(gaano|ilang).*(tagal|taon).*(gumagawa|gawa|build|develop).*(system|systems|device|code)|tagal.*(system|experience)|years.*experience/i.test(
      q
    ) ||
    /(tagal|taon).*(system|develop)/i.test(cq)
  ) {
    return {
      text: `Simula 2022 pa siya active bilang freelance electronics at IT technician (lagpas 3 taon na!). Sa period na 'to, nakagawa at nakatulong na siya sa iba't ibang projects — mula sa micro-hardware devices, school systems, hanggang sa major BSIT Capstone research project niya (Track My Ride) para sa transport cooperative noong 2025.`,
      section: "#experience",
    };
  }

  // High school electronics foundation (ISAT)
  if (
    /(high school|isat|secondary).*(marunong|alam|electronics|tinkering|bago)|marunong.*electronics.*(high school|bata)/i.test(
      q
    ) ||
    /(high school|isat).*(electronics)/i.test(cq)
  ) {
    return {
      text: `Mismo! Sa Isabela School of Arts and Trades (ISAT, 2016–2022) pa lang noong Junior at Senior High School, doon na nahasa ang hilig at matibay na pundasyon ni Emjay sa electronics, wiring, at hardware troubleshooting bago pa siya pumasok sa BSIT Network & Security sa ISU Ilagan.`,
      section: "#experience",
    };
  }

  // Currently studying / learning / inaaral ngayon
  if (
    /(pinag-aaralan|pinagaaralan|inaaral|aaralan|learning|studying|exploring).*(pa\s*)?(ngayon|now)|currently learning|meron.*pinag.*aralan/i.test(
      q
    ) ||
    /(aaralan|inaaral|learning).*(ngayon|now)/i.test(cq)
  ) {
    return {
      text: `Palaging nag-a-upgrade si Emjay! Kasalukuyan niyang ine-explore ang advanced low-latency protocols, Rust para sa memory-safe systems programming, Three.js para sa interactive 3D web UI, at local model failover routing (OmniRoute) para sa scalable apps.`,
      section: "#about",
    };
  }

  // Android / Mobile apps & systems
  if (/android|mobile.*(app|system)|cellphone.*system/i.test(q) || /android|mobile/i.test(cq)) {
    return {
      text: `Kayang-kaya boss! Bukod sa web dashboards at desktop tools, may karanasan si Emjay sa component-level mobile repairs at paggawa ng mobile-responsive systems na may real-time updates (tulad ng commuter web app para sa smartphones sa Track My Ride).`,
      section: "#about",
    };
  }

  // Compliments & praise
  if (
    /^(lupet|astig|galing|angas|solid|nice|cool|sheesh|grabe|wow|idol)\b/i.test(q) ||
    /^(lupet|astig|galing|angas|solid|nice)/i.test(cq)
  ) {
    return {
      text: `Salamat bossing! Pinaghirapan talaga ni Emjay yan mula hardware circuits hanggang malinis na code. Kung may project ka o gusto mo siyang i-hire, email mo lang siya sa ${profile.email}! 🚀`,
      section: "#contact",
    };
  }

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

  // NSFW / Green jokes / Adult questions
  if (/porn|bastos|bold|nude|sex|hubad|kantot|chupa|jakol/i.test(q)) {
    return {
      text: `Hala bossing, confidential ang personal browsing history ni Emjay haha! 🙈 Pero safe to say, mas babad siya sa terminal, VS Code, at hardware troubleshooting kaysa dyan. Tech and IT inquiries lang tayo boss! 😂`,
    };
  }

  // Age / How old is Emjay
  if (/ilang taon|how old|\bage\b|taon na|edad|birthday|birthdate/i.test(q)) {
    return {
      text: `Nasa early 20s po si Emjay (graduating BSIT Network and Security Class of 2026 sa ISU Ilagan)! Bata pa pero certified IT Specialist na at bihasa sa hardware at software.`,
      section: "#experience",
    };
  }

  // Worth it ba / Trustworthiness in system building
  if (/worth it|sulit|recommend.*emjay/i.test(q)) {
    return {
      text: `Sobrang sulit at worth it boss! Certified IT Specialist si Emjay (Cybersecurity, Databases, Network Security), marunong mag-code mula hardware circuits (ESP32) hanggang full-stack web platforms at standalone desktop tools (.exe). Hands-on siya mula planning hanggang deployment! Pwede mo siyang i-email sa ${profile.email}.`,
      section: "#contact",
    };
  }

  // Trustworthiness / Reliability / Mapagkakatiwalaan
  if (/katiwala|mapagkakatiwalaan|trust|reliable|legit.*ba|pwede.*magtiwala|tiwala/i.test(q)) {
    return {
      text: `100% mapagkakatiwalaan boss! May solid experience si Emjay sa Records Management sa ISU Ilagan kung saan humawak siya ng confidential student records nang may strict privacy, at freelance IT technician mula pa 2022 na pinagkakatiwalaan sa customer hardware at networks.`,
      section: "#experience",
    };
  }

  // HTML / CSS / Web basics
  if (/kahit.*html|marunong.*html|alam.*html|marunong.*css|alam.*css/i.test(q)) {
    return {
      text: `Aba siyempre boss! Basic na basic kay Emjay ang HTML at CSS, kasama ang modern frameworks tulad ng React at Next.js para sa malilinis at responsive na web layouts.`,
      section: "#about",
    };
  }

  // Website creation / Web development / HTML / CSS / React / Next.js
  if (/website|web.*dev|web.*app|gumawa.*web|marunong.*web|html|css\b|react|next\.?js/i.test(q)) {
    return {
      text: `Kayang-kaya boss! Bihasa si Emjay sa paggawa ng modern at responsive websites at web applications gamit ang HTML, CSS, JavaScript, TypeScript, React, at Next.js, na may backend databases tulad ng SQL at Firebase.`,
      section: "#about",
    };
  }

  // Strongest language / Best language / Saan magaling
  if (/saan.*(magaling|magalin|malakas|the best|bihasa)|best.*language|strongest.*language|paboritong.*language/i.test(q)) {
    return {
      text: `Pinakabihasa at pinakakabisado ni Emjay ang Python (backend APIs, desktop apps, standalone .exe), C++ (microcontrollers ESP32/Arduino, hardware logic), Java (OOP fundamentals), JavaScript/TypeScript para sa modern web apps, at SQL para sa databases!`,
      section: "#about",
    };
  }

  // Development experience / Systems built / Na-develop na
  if (/may.*experience.*(develop|code|program|gawa)|na.*develop|experience.*develop|mga.*nagawa|portfolio.*projects/i.test(q)) {
    return {
      text: `Marami na siyang na-develop boss: full-stack real-time web platforms, custom IoT tracking systems na may RFID ignition interlock at GPS (Track My Ride), offline LAN laboratory monitoring tools sa Python/Flask/Socket.IO, at standalone desktop Windows applications (.exe).`,
      section: "#work",
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
  if (/buong system|full system|end-to-end|(cyber)?security expertise|security background/i.test(q)) {
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
  if (/track my ride|\btracking\b|\btracker\b|capstone|iputc|thesis|research/i.test(q)) {
    return {
      text: `Track My Ride is his 2025 BSIT capstone research for IPUTC at ISU Ilagan, co-developed with Jastine Ann Marcelo. It connects vehicle IoT hardware with a real-time web dashboard for live transit tracking, which they successfully defended and completed.`,
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
  if (/\b(open to work|looking for (work|a job)|hiring|contact|email|reach him)\b/i.test(q)) {
    return {
      text: `He is open to IT support, systems, and development roles based in Ilagan, Isabela. The fastest way to reach him is ${profile.email}.`,
      section: "#contact",
    };
  }

  // Job Interview: Tell me about yourself / Introduce yourself / Elevator pitch
  if (/tell me about yourself|introduce yourself|walk me through|pakilala|tell us about yourself/i.test(q)) {
    return {
      text: `Emjay is an IT Specialist graduating with a BSIT in Network and Security from Isabela State University – Ilagan Campus (Class of 2026). He bridges hardware and software: from component-level repairs, Windows administration, and network security, up to full-stack development in Python, C++, Java, and modern web frameworks. He holds 3 Certiport IT Specialist certifications and has been supporting clients as a freelance IT technician since 2022.`,
      section: "#about",
    };
  }

  // Job Interview: Why should we hire you? / Bakit ikaw ang dapat piliin?
  if (/why.*hire.*(you|him|emjay)|bakit.*(ikaw|siya|dapat).*piliin|why should we choose|what makes you different|what value/i.test(q)) {
    return {
      text: `Emjay offers a rare combination of physical hardware troubleshooting and real software engineering. Rather than just writing code or just crimping cables, he understands how data flows end-to-end — from microcontroller sensors, through network security rules, up to cloud databases and responsive web dashboards. He is certified, adaptable, and disciplined.`,
      section: "#about",
    };
  }

  // Job Interview: Strengths / Kalakasan
  if (/\bstrengths?\b|kalakasan|biggest strength|greatest strength|\bedge\b/i.test(q)) {
    return {
      text: `His core strengths are practical problem solving, hardware-to-software integration, and rapid self-learning. Whether diagnosing complex motherboard faults, setting up secure network environments, or developing custom software from scratch, he works systematically until systems run reliably and securely.`,
      section: "#about",
    };
  }

  // Job Interview: Weaknesses / Areas of improvement
  if (/\bweakness(es)?\b|kahinaan|area.*improvement|biggest weakness/i.test(q)) {
    return {
      text: `Early on, his intense curiosity led him to take on every single part of a project alone. Through his capstone research and university records internship, he learned the power of modular collaboration, clear documentation, and delegation to deliver high-quality systems faster as a team.`,
      section: "#about",
    };
  }

  // Job Interview: Career goals / Where do you see yourself in 3-5 years?
  if (/3.*to.*5.*years|5.*years|career goal|future plan|san mo nakikita sarili mo|saan mo nakikita|aspirations/i.test(q)) {
    return {
      text: `In 3 to 5 years, Emjay aims to grow into an Enterprise Systems & Network Security Engineer or Senior Solutions Developer, architecting resilient network infrastructure, secure cloud-connected platforms, and pursuing advanced industry cybersecurity credentials.`,
      section: "#about",
    };
  }

  // Job Interview: Handling pressure / Tight deadlines
  if (/pressure|tight deadline|stress|paano.*pressure|handle.*pressure|under pressure/i.test(q)) {
    return {
      text: `He approaches pressure methodically: breaking complex requirements into prioritized deliverables, isolating critical blockers early, and leveraging modern developer tools alongside disciplined testing to deliver stable solutions without compromising security.`,
      section: "#about",
    };
  }

  // Job Interview: Teamwork vs Solo
  if (/team player|teamwork|team.*or.*solo|solo.*or.*team|mag-isa.*o.*team|collaborat/i.test(q)) {
    return {
      text: `He excels at both: highly independent and focused when building hardware prototypes or coding standalone modules, but actively communicative in teams — proven by his collaborative capstone transit research and his multi-office university records internship.`,
      section: "#experience",
    };
  }

  // Job Interview: Relocation / On-site / Remote / Hybrid
  if (/relocate|willing.*relocate|work setup|on-site.*remote|remote.*hybrid|wfh/i.test(q)) {
    return {
      text: `Emjay is based in Ilagan, Isabela, and is open to local on-site positions in the region, as well as hybrid or remote IT and developer roles anywhere in the Philippines. Specific arrangements can be discussed via ${profile.email}.`,
      section: "#contact",
    };
  }

  // Job Interview: Expected salary / Compensation / Rate
  if (/salary|rate|sweldo|sahod|compensation|expected salary|asking salary/i.test(q)) {
    return {
      text: `His compensation expectations are open and negotiable based on the role, responsibilities, and industry standards for IT Specialists and Junior Developers. Formal offers can be discussed via ${profile.email}.`,
      section: "#contact",
    };
  }

  // Job Interview: Why Network and Security?
  if (/why.*network and security|bakit.*network and security|bakit.*(network|security).*track/i.test(q)) {
    return {
      text: `He chose the Network and Security specialization because modern software doesn't operate in a vacuum. Mastering packet routing, firewall rules, encryption, and authentication allows him to build software that is robust, protected, and resilient against real-world threats.`,
      section: "#certifications",
    };
  }

  // Job Interview: Difficult problem solved / Technical challenge
  if (/technical challenge|difficult problem|challenging project|hardest problem|bug.*solved|problema.*na-solve/i.test(q)) {
    return {
      text: `A key technical challenge was handling offline vehicle data in his capstone (Track My Ride) during rural cellular dead zones. Emjay engineered an EEPROM non-volatile memory caching routine in C++ on the microcontroller to log sensor events offline and batch-sync them once network connectivity was restored.`,
      section: "#work",
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
  if (/^(hello|hi|hey|kumusta|magandang|good\s*(morning|afternoon|evening))\b/i.test(q) || /^(hello|hi|hey|kumusta)\b/i.test(cq)) {
    return { text: "Kamusta! Ako ang assistant ni Emjay. Tanungin mo ako tungkol sa coding skills niya, capstone, Certiport certifications, gaming hobbies, o pagpapagawa ng custom devices!" };
  }

  // Affirmations & Acknowledgements
  if (
    /^(sige|geh|cge|ok|okay|copy|noted|ayos|salamat|thanks|thank you)\b/i.test(q) ||
    /^(sige|geh|cge|ok|okay|ayos|salamat|thanks)/i.test(cq)
  ) {
    return {
      text: `Walang anuman pre! Nandito lang ako kung may tanong ka pa tungkol sa systems, coding, hardware, o certifications ni Emjay. Pwede mo rin siyang i-email diretso sa ${profile.email}. 🚀`,
      section: "#contact",
    };
  }

  // Warm, human conversational response
  return {
    text: `Nandito ako para tulungan ka pre! Specialty ko ikwento ang mga gawa at kakayahan ni Emjay — mula coding (Python/C++/Java/Next.js), custom ESP32 IoT devices, hardware repairs, hanggang sa capstone transit research at Certiport certifications niya. May specific project o tanong ka ba tungkol sa kanya? Pwede mo rin siyang kontakin diretso sa ${profile.email}!`,
  };
}

/**
 * Questions the deterministic answers handle well. These resolve instantly and
 * never depend on a provider's availability; everything else goes to the model.
 */
const DIRECT_PATTERNS = [
  /^(bye|goodbye|paalam|babay|see you|catch you|talk later)\b|alis na (ako|ko)|sige.*(alis|pre|boss|bro)|cge.*(alis|pre|boss|bro)|bye na/i,
  /(anong?|ano|what|tell me).*(masasabi|masabi|tingin|opinion|say|impression).*(kay|about).*emjay|describe.*emjay|kilala.*emjay/i,
  /(gaano|kamusta|kumusta|how).*(galing|kagalig|husay|mahusay|skilled|good).*(code|coding|mag-code|magcode|program)|gaano.*code/i,
  /\b(hosting|host|deploy|deployment|cloud|vps|vercel|netlify|cpanel|server|servers)\b/i,
  /(gaano|ilang).*(tagal|taon).*(gumagawa|gawa|build|develop).*(system|systems|device|code)|tagal.*(system|experience)|years.*experience/i,
  /(high school|isat|secondary).*(marunong|alam|electronics|tinkering|bago)|marunong.*electronics.*(high school|bata)/i,
  /(pinag-aaralan|pinagaaralan|inaaral|aaralan|learning|studying|exploring).*(pa\s*)?(ngayon|now)|currently learning|meron.*pinag.*aralan/i,
  /android|mobile.*(app|system)|cellphone.*system/i,
  /^(lupet|astig|galing|angas|solid|nice|cool|sheesh|grabe|wow|idol)\b/i,
  /^(sige|geh|cge|ok|okay|copy|noted|ayos|salamat|thanks|thank you)\b/i,
  /tell me about yourself|introduce yourself|walk me through|pakilala|tell us about yourself/i,
  /why.*hire|bakit.*(ikaw|siya|dapat).*piliin|why should we choose|what makes you different|what value/i,
  /\bstrengths?\b|kalakasan|biggest strength|greatest strength|\bedge\b/i,
  /\bweakness(es)?\b|kahinaan|area.*improvement|biggest weakness/i,
  /3.*to.*5.*years|5.*years|career goal|future plan|san mo nakikita sarili mo|saan mo nakikita|aspirations/i,
  /pressure|tight deadline|stress|paano.*pressure|handle.*pressure|under pressure/i,
  /team player|teamwork|team.*or.*solo|solo.*or.*team|mag-isa.*o.*team|collaborat/i,
  /relocate|willing.*relocate|work setup|on-site.*remote|remote.*hybrid|wfh/i,
  /salary|rate|sweldo|sahod|compensation|expected salary|asking salary/i,
  /why.*network and security|bakit.*network and security|bakit.*(network|security).*track/i,
  /technical challenge|difficult problem|challenging project|hardest problem|bug.*solved|problema.*na-solve/i,
  /porn|bastos|bold|nude|\bsex\b|hubad/i,
  /ilang taon|how old|\bage\b|taon na|edad/i,
  /worth it|sulit|why.*hire/i,
  /katiwala|mapagkakatiwalaan|reliable|legit.*ba|tiwala/i,
  /website|web.*dev|web.*app|gumawa.*web|marunong.*web|html|css\b|react|next\.?js/i,
  /saan.*(magaling|magalin|malakas|bihasa)|best.*language|strongest.*language/i,
  /may.*experience|na.*develop|experience.*develop|mga.*nagawa|anong.*na.*develop/i,
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
  /(marunong|alam|kaya|can|does|knows? how to).*(python|\.exe|executable)/i,
  /(marunong|alam|kaya|can|does|knows? how to).*(c\+\+|c plus plus|cpp)/i,
  /(marunong|alam|kaya|can|does|knows? how to).*(\bjava\b)/i,
  /(marunong|kaya|can he|does he|knows? how to).*(code|program)|marunong.*(mag-code|magcode)|(coding|programming).*(skill|kakayahan|experience)|programmer.*ba|developer.*ba/i,
  /hobby|hobbies|gaming|game|gamer|laro|hilig/i,
  /vibe\s*cod|how does he (code|build|develop)|paano siya mag/i,
  /buong system|full system|end-to-end|security|cybersecurity/i,
  /repair|troubleshoot|ayos|sira|laptop|phone|pc build|assemble/i,
  /who are you|who is emjay|sino si emjay|sino ka/i,
  /^(what|which|where|who|when|tell me about|pwede|can|magkano|kaya|ano|anong)\b.*(magpagawa|pagawa|custom.*device|make.*device|build.*device|commission|hire.*device|\besp32\b|\besp 32\b|iot.*device|custom.*hardware|develop|kaya|gumawa|how can he help)/i,
  /^(what|which|where|who|when|tell me about|ano|anong)\b.*(kaya.*gawin|pwede.*gawin|can he (build|develop|make|do))/i,
  /^(what|which|where|who|when|tell me about|ano|anong)\b.*(certif\w*|certiport|cyber\w*|network security|database\w*)/i,
  /^(what|which|where|who|when|tell me about|ano|anong)\b.*(capstone|track my ride|project|rfid|\biot\b|research|thesis)/i,
  /^(what|which|where|who|when|tell me about|ano|anong)\b.*(laboratory|\blab\b|screen stream|lan management)/i,
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
  if (q.length > 250) return false;
  const cq = cleanQuery(q);
  if (DIRECT_PATTERNS.some((pattern) => pattern.test(q) || pattern.test(cq))) return true;
  if (q.split(/\s+/).length > 15) return false;
  if (REASONING_PATTERNS.some((pattern) => pattern.test(q) || pattern.test(cq))) return false;
  return false;
}
