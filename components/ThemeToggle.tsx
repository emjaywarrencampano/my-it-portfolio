"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("ewc-theme", theme);
  } catch {
    /* storage may be unavailable */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="border-line text-ink-2 hover:border-line-strong grid size-9 place-items-center rounded-full border transition-all duration-300 hover:rotate-12"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="size-[15px] stroke-current" fill="none" strokeWidth={1.5} aria-hidden="true">
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-[15px] stroke-current" fill="none" strokeWidth={1.5} aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
