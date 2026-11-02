"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#certifications", label: "Certifications" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ onOpenChat }: { onOpenChat: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label={`${profile.shortName} — home`}>
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={styles.mark}>
            <circle cx="16" cy="16" r="14.2" strokeWidth="1.2" opacity=".35" />
            <path d="M10.5 21V11h8M10.5 16h7" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="22.4" cy="11" r="2" stroke="none" fill="currentColor" className={styles.markDot} />
          </svg>
          <span className={styles.brandName}>{profile.shortName}</span>
        </a>

        <nav className={styles.links} aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <ThemeToggle />
          <button type="button" className={styles.talk} onClick={onOpenChat} aria-label="Open assistant">
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.talkLabel}>Ask Assistant</span>
            <svg className={styles.talkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path
                d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.7-.8L3 21l1.9-5.3a8.4 8.4 0 0 1-.9-3.7 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.4Z"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.menu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={menuOpen ? styles.barTop : styles.bar} />
            <span className={menuOpen ? styles.barHidden : styles.bar} />
            <span className={menuOpen ? styles.barBottom : styles.bar} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.sheet} aria-label="Mobile sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
