type Logo = { file: string; color: string };

/** Official marks from Simple Icons (CC0), stored in /public/logos. */
const LOGOS: Record<string, Logo> = {
  Python: { file: "python", color: "#3776AB" },
  "C++": { file: "cplusplus", color: "#00599C" },
  JavaScript: { file: "javascript", color: "#D6B800" },
  TypeScript: { file: "typescript", color: "#3178C6" },
  HTML: { file: "html5", color: "#E34F26" },
  CSS: { file: "css", color: "#663399" },
  React: { file: "react", color: "#087EA4" },
  "Next.js": { file: "nextdotjs", color: "#000000" },
  Firebase: { file: "firebase", color: "#D98A00" },
  SQLite: { file: "sqlite", color: "#003B57" },
  "VS Code": { file: "visualstudiocode", color: "#007ACC" },
  "Git & GitHub": { file: "github", color: "#181717" },
  "Arduino IDE": { file: "arduino", color: "#00979D" },
  Windows: { file: "windows", color: "#0078D4" },
  "DeepSeek Harness": { file: "deepseek", color: "#4D6BFE" },
  Codex: { file: "openai", color: "#412991" },
  "Claude Code": { file: "claude", color: "#D97757" },
  Antigravity: { file: "google", color: "#4285F4" },
};

/** Fallback glyph for skills without a brand mark. */
function FallbackGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <ellipse cx="12" cy="6.5" rx="7" ry="2.8" />
      <path d="M5 6.5v11c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-11M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </svg>
  );
}

export function SkillLogo({ name, className }: { name: string; className?: string }) {
  const logo = LOGOS[name];

  if (!logo) return <FallbackGlyph className={className} />;

  return (
    <span
      className={className}
      style={
        {
          "--logo": `url(/logos/${logo.file}.svg)`,
          "--brand": logo.color,
        } as React.CSSProperties
      }
      aria-hidden="true"
    />
  );
}
