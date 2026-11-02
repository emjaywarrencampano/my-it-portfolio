"use client";

import { useCallback, useState } from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Work } from "./Work";
import { Certificates } from "./Certificates";
import { Experience } from "./Experience";
import { About } from "./About";
import { Contact, SiteFooter } from "./Contact";
import { Chat } from "./Chat";
import { ScrollRig } from "./ScrollRig";
import styles from "./ChatLauncher.module.css";

export function PageClient() {
  const [chatOpen, setChatOpen] = useState(false);

  const open = useCallback(() => setChatOpen(true), []);
  const close = useCallback(() => setChatOpen(false), []);

  return (
    <>
      <ScrollRig />
      <Nav onOpenChat={open} />

      <main id="top">
        <Hero onOpenChat={open} />
        <Work />
        <Certificates />
        <Experience />
        <About />
        <Contact />
      </main>

      <SiteFooter />

      {!chatOpen && (
        <button type="button" className={styles.launch} onClick={open} aria-label="Open the AI assistant">
          <span className={styles.pulse} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.7-.8L3 21l1.9-5.3a8.4 8.4 0 0 1-.9-3.7 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.4Z"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.label}>Ask about Emjay</span>
        </button>
      )}

      <Chat open={chatOpen} onClose={close} />
    </>
  );
}
