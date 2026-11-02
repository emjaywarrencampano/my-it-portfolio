"use client";

type IconProps = { className?: string };

/**
 * Small, simplified marks rather than official brand logos: they stay legible
 * at 20px, inherit the palette, and avoid shipping trademarked assets.
 */
const MARKS: Record<string, (props: IconProps) => React.ReactElement> = {
  Python: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M12 3.5c-3 0-3.4 1.2-3.4 2.6V8h6.2v1.2H6.6c-1.7 0-3 1-3 3.6s1.1 3.6 2.4 3.6h1.3v-2.1c0-1.9 1.5-3.2 3.4-3.2h3.4c1.6 0 2.6-1.1 2.6-2.6V6.1c0-1.6-1.4-2.6-4.7-2.6Z" strokeLinejoin="round" />
      <path d="M12 20.5c3 0 3.4-1.2 3.4-2.6V16h-6.2v-1.2h8.2c1.7 0 3-1 3-3.6s-1.1-3.6-2.4-3.6h-1.3v2.1c0 1.9-1.5 3.2-3.4 3.2H9.9c-1.6 0-2.6 1.1-2.6 2.6v1.9c0 1.6 1.4 2.6 4.7 2.6Z" strokeLinejoin="round" />
    </svg>
  ),
  CPlusPlus: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4Z" strokeLinejoin="round" />
      <path d="M9.4 9.4a3 3 0 1 0 0 5.2M14.6 9.8v4.4M12.4 12h4.4" strokeLinecap="round" />
    </svg>
  ),
  JavaScript: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M10 9.5v4.2c0 1.2-.6 1.8-1.7 1.8M13.4 15c.5.4 1.1.6 1.8.6 1 0 1.7-.5 1.7-1.4 0-1.9-3.2-1.2-3.2-3.1 0-.8.7-1.4 1.7-1.4.6 0 1.1.2 1.5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  HTML: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M9.5 8 5 12l4.5 4M14.5 8l4.5 4-4.5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.8 5.5 11.2 18.5" strokeLinecap="round" />
    </svg>
  ),
  SQL: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <ellipse cx="12" cy="6.5" rx="7" ry="2.8" />
      <path d="M5 6.5v11c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-11M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </svg>
  ),
  VSCode: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d="M17 3.5 7.5 11 4 8.4 2.8 9.6l3 3.2-3 3.2L4 17.2 7.5 14l9.5 7 3.5-2V5.5Z" strokeLinejoin="round" />
    </svg>
  ),
  Git: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <circle cx="6.5" cy="6" r="2.2" />
      <circle cx="6.5" cy="18" r="2.2" />
      <circle cx="17.5" cy="12" r="2.2" />
      <path d="M6.5 8.2v7.6M8.6 7.2c3.2.6 4.4 1.8 6.6 3.6" strokeLinecap="round" />
    </svg>
  ),
  Arduino: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d="M11 12c-1.4-2-2.6-3-4.2-3-2.2 0-3.8 1.4-3.8 3s1.6 3 3.8 3c1.6 0 2.8-1 4.2-3Zm2 0c1.4 2 2.6 3 4.2 3 2.2 0 3.8-1.4 3.8-3s-1.6-3-3.8-3c-1.6 0-2.8 1-4.2 3Zm-9-1v2m-1-1h2m11-1.6v3.2m-1.6-1.6h3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Windows: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d="M3.5 6.2 11 5.1v6.1H3.5Zm9 7.7h8L20.4 20 12.5 18.7ZM3.5 12.8H11v6.1l-7.5-1.1Z" strokeLinejoin="round" />
    </svg>
  ),
  AI: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7L4.5 10.9 10.1 9Z" strokeLinejoin="round" />
      <path d="M19 16.5v3M17.5 18h3" strokeLinecap="round" />
    </svg>
  ),
  Rust: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3.8v2M12 18.2v2M3.8 12h2M18.2 12h2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4" strokeLinecap="round" />
    </svg>
  ),
  Next: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M8.5 15.5v-7l7 9.5M15.2 8.5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Three: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <path d="M12 2.8 20.4 7.5v9L12 21.2 3.6 16.5v-9Z" strokeLinejoin="round" />
      <path d="M3.6 7.5 12 12l8.4-4.5M12 12v9.2" strokeLinejoin="round" />
    </svg>
  ),
};

const ICON_KEYS: Array<[RegExp, keyof typeof MARKS]> = [
  [/^python/i, "Python"],
  [/^c\+\+/i, "CPlusPlus"],
  [/^(javascript|typescript)/i, "JavaScript"],
  [/^(html|css)/i, "HTML"],
  [/^sql/i, "SQL"],
  [/^vs code/i, "VSCode"],
  [/^git/i, "Git"],
  [/^arduino/i, "Arduino"],
  [/^windows/i, "Windows"],
  [/^(ai|cursor|codex|hermes)/i, "AI"],
  [/^rust/i, "Rust"],
  [/^next\.js/i, "Next"],
  [/^three\.js/i, "Three"],
];

export function MarkFor({ name, className }: { name: string; className?: string }) {
  const entry = ICON_KEYS.find(([pattern]) => pattern.test(name));
  if (!entry) return <span className={className} aria-hidden="true" />;
  const Mark = MARKS[entry[1]];
  return <Mark className={className} />;
}
