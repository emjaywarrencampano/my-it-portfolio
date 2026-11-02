// The single source of truth for the site's content.
// Edit this file to update the portfolio; components read from here.

export const profile = {
  name: "Emjay Warren P. Campano",
  shortName: "Emjay Campano",
  role: "Information Technology Specialist",
  location: "City of Ilagan, Isabela",
  email: "emjaywarrencampano@gmail.com",
  availability: "Open to IT support, systems, and development roles",
  headline: "IT Specialist who builds systems end-to-end — from ESP32 hardware to the web app that monitors it.",
  intro:
    "Network and Security specialist based in Ilagan, Isabela. I work the whole stack: hardware diagnostics, firmware, servers, and the interfaces people actually use.",
  links: {
    linkedin: "", // add your profile URL
    github: "", // add your profile URL
  },
  meta: [
    { label: "Focus", value: "Network & Security" },
    { label: "Certified", value: "IT Specialist × 3" },
    { label: "Class of", value: "2026 · ISU Ilagan" },
  ],
} as const;

export const work = {
  kicker: "Capstone · IPUTC 2025",
  title: "Track My Ride",
  titleAccent: "Ride",
  description:
    "An intelligent city bus tracking and transit management system, developed for the 2025 IPUTC capstone. ESP32 units on vehicles, GPS and RFID at the edge, a central web application for real-time monitoring.",
  context:
    "Built for Isabela State University as an academic capstone in partnership with IPUTC. Presented as an engineering case study — the system itself is not shown here.",
  role: "Full-stack developer",
  highlights: [
    "Designed and built the full system — hardware, firmware, and web application.",
    "ESP32 firmware in C++ via Arduino IDE, linked to a live web dashboard.",
    "Evaluated against ISO/IEC 25010 with IT experts and end users.",
    "4G LTE link keeping vehicles and server in continuous sync.",
  ],
  stack: ["ESP32", "C++", "Arduino", "GPS", "RFID", "4G LTE", "Web App"],
  metrics: [
    { value: "4.88", suffix: "/5", label: "Mean score from IT experts" },
    { value: "5.00", suffix: "/5", label: "Score from end users" },
    { value: "ISO", suffix: "25010", label: "Evaluated against the standard" },
    { value: "3", suffix: "layers", label: "Hardware, firmware, and web" },
  ],
} as const;

export type Certificate = {
  slug: string;
  name: string;
  issuer: string;
  date: string;
  dateISO: string;
  verifyId: string;
  image: string;
  width: number;
  height: number;
  note?: string;
};

export const certificates: Certificate[] = [
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    issuer: "Certiport · Pearson VUE",
    date: "June 24, 2024",
    dateISO: "2024-06-24",
    verifyId: "wbmDE-FarL",
    image: "/certificates/cybersecurity.webp",
    width: 1317,
    height: 847,
    note: "IT Specialist certification",
  },
  {
    slug: "network-security",
    name: "Network Security",
    issuer: "Certiport · Pearson VUE",
    date: "December 11, 2025",
    dateISO: "2025-12-11",
    verifyId: "yw37-DwzX",
    image: "/certificates/network-security.webp",
    width: 1315,
    height: 847,
    note: "Expires 5 years after issue",
  },
  {
    slug: "databases",
    name: "Databases",
    issuer: "Certiport · Pearson VUE",
    date: "December 17, 2024",
    dateISO: "2024-12-17",
    verifyId: "wCRax-48e2",
    image: "/certificates/databases.webp",
    width: 1320,
    height: 843,
    note: "IT Specialist certification",
  },
];

export type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  location: string;
  points: string[];
  kind: "work" | "education";
};

export const experience: ExperienceEntry[] = [
  {
    period: "Jan – May 2026",
    role: "Records Management Intern",
    org: "Isabela State University — Ilagan Campus",
    location: "Ilagan, Isabela",
    points: [
      "Executed high-volume data encoding, document sorting, and daily office operations.",
      "Handled confidential records with strict privacy compliance and efficient retrieval.",
    ],
    kind: "work",
  },
  {
    period: "2022 – Present",
    role: "Freelance Electronics & IT Technician",
    org: "Self-employed",
    location: "Ilagan, Isabela",
    points: [
      "Component-level troubleshooting and repair for laptops and mobile devices.",
      "Technical support for hardware diagnostics, Windows setup, and network configuration.",
    ],
    kind: "work",
  },
  {
    period: "2022 – 2026",
    role: "BS Information Technology",
    org: "Isabela State University — Ilagan Campus",
    location: "Ilagan, Isabela",
    points: ["Specialization track: Network and Security."],
    kind: "education",
  },
];

export const about = {
  lead: "I like problems that start at the hardware and end at the browser.",
  paragraphs: [
    "That is the shape of my capstone — sensors on a bus, firmware reading them, a server holding the data, and a dashboard making it usable. I built every layer, then measured whether it actually worked.",
    "Outside of that I repair devices, set up systems, and keep learning the security side of networks. The goal is simple: technology that behaves predictably, for the people who depend on it.",
  ],
  skills: [
    { group: "Hardware", items: ["Component diagnostics", "Board-level repair", "ESP32", "Sensors & RFID"] },
    { group: "Systems", items: ["Windows setup & management", "Device provisioning", "Troubleshooting"] },
    { group: "Network", items: ["Basic network configuration", "4G LTE links", "Network security"] },
    { group: "Development", items: ["C++ / Arduino", "Web-based systems", "Hardware ↔ web integration"] },
    { group: "Data", items: ["Database management", "Records & privacy"] },
  ],
} as const;

export const contact = {
  titleStart: "Let’s build something",
  titleAccent: "that works.",
  subtitle: "Open to IT support, systems, and development roles. Replies within a day.",
} as const;
