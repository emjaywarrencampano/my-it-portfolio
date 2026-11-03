// The single source of truth for the site's content.
// Edit this file to update the portfolio; components read from here.

export const profile = {
  name: "Emjay Warren P. Campano",
  shortName: "Emjay Campano",
  role: "Information Technology Specialist",
  location: "City of Ilagan, Isabela",
  email: "emjaywarrencampano@gmail.com",
  availability: "Open to IT support, systems, and development roles",
  headline:
    "IT Specialist working across hardware, Windows systems, networks, and the small tools that make them easier to use.",
  intro:
    "Network and Security specialist based in Ilagan, Isabela. I diagnose and fix machines, set up systems, and build simple web tools when the existing ones do not fit.",
  links: {
    linkedin: "", // add your profile URL
    github: "https://github.com/Warren2003819",
  },
  meta: [
    { label: "Focus", value: "Network & Security" },
    { label: "Certified", value: "IT Specialist × 3" },
    { label: "Class of", value: "2026 · ISU Ilagan" },
  ],
} as const;

export const work = {
  kicker: "Capstone · 2025",
  title: "Track My Ride",
  titleAccent: "Ride",
  description:
    "An academic capstone project for a city bus tracking and transit management system: a web application for monitoring vehicles in real time, with a small hardware layer feeding it.",
  context: "Capstone for Isabela State University, 2025. The system itself is not publicly shown.",
  role: "Full-stack developer",
  note: "Full details are in the resume.",
  stack: ["Web App", "Database"],
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
  lead: "I fix machines, set up systems, and build the small tools that make work easier.",
  paragraphs: [
    "Most of my day is practical: diagnosing hardware, setting up Windows, tracing a network problem, or writing a script or web tool when an existing one does not fit.",
    "I am finishing a degree in Information Technology with a Network and Security track, and I keep learning by building things — including the occasional experiment.",
    "When away from the terminal, I spend my time PC gaming, tinkering with microcontrollers, or tuning and repairing custom hardware.",
  ],
  skills: [
    { group: "Languages", items: ["Python", "C++", "Java", "JavaScript", "TypeScript"] },
    { group: "Web Technologies", items: ["HTML", "CSS", "React", "Next.js"] },
    { group: "Databases", items: ["SQL", "SQLite", "Firebase"] },
    {
      group: "Tools",
      items: [
        "VS Code",
        "Git & GitHub",
        "Arduino IDE",
        "Windows",
        "DeepSeek",
        "Codex",
        "Claude Code",
        "Antigravity",
        "OmniRoute",
        "Hermes",
        "OpenCode",
        "OpenRouter",
      ],
    },
    { group: "Hardware", items: ["Component diagnostics", "Laptop & phone repair", "Device setup"] },
    { group: "Systems", items: ["Windows setup & management", "Device provisioning", "Troubleshooting"] },
    { group: "Network", items: ["Network configuration", "Network security", "Connectivity testing"] },
    { group: "Data & Records", items: ["Database management", "Records & privacy", "Data encoding"] },
    { group: "Exploring", items: ["Rust (learning)", "Three.js"] },
  ],
} as const;


export const contact = {
  titleStart: "Let’s build something",
  titleAccent: "that works.",
  subtitle: "Open to IT support, systems, and development roles. Replies within a day.",
} as const;
