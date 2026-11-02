"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { certificates, type Certificate } from "@/content/site";
import styles from "./Certificates.module.css";

export function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  return (
    <section id="certifications" className={styles.section}>
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <div className={styles.headLeft}>
            <span className={`mono ${styles.num}`}>02</span>
            <h2 className={`display ${styles.title}`}>Certifications</h2>
          </div>
          <p className={styles.note}>Three IT Specialist credentials, verified by Certiport. Click any to read.</p>
        </div>

        <div className={styles.grid} data-reveal>
          {certificates.map((cert) => (
            <button
              key={cert.slug}
              type="button"
              className={styles.cert}
              onClick={() => setActive(cert)}
              aria-label={`View ${cert.name} certificate`}
            >
              <span className={styles.imageWrap}>
                <Image
                  src={cert.image}
                  alt={`IT Specialist ${cert.name} certificate awarded to ${"Emjay Warren Pascua Campano"}`}
                  width={cert.width}
                  height={cert.height}
                  sizes="(max-width: 900px) 42vw, 33vw"
                  className={styles.image}
                />
                <span className={styles.expand} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className={styles.body}>
                <span className={`mono ${styles.org}`}>{cert.issuer}</span>
                <span className={styles.name}>{cert.name}</span>
                <span className={styles.foot}>
                  <span className={styles.date}>{cert.date}</span>
                  <span className={styles.verified}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.8 20 6v6c0 5-3.4 8.1-8 9.2-4.6-1.1-8-4.2-8-9.2V6Z" strokeLinejoin="round" />
                      <path d="M8.6 12.1 11 14.5l4.4-4.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Verified
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.footNote} data-reveal>
          <span>
            Verification IDs available per certificate at{" "}
            <a href="https://verify.certiport.com" target="_blank" rel="noopener noreferrer">
              verify.certiport.com
            </a>
            .
          </span>
          <span className="mono">3 credentials · 2024–2025</span>
        </div>
      </div>

      {active && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${active.name} certificate`} onClick={close}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close preview">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <Image
              src={active.image}
              alt={`IT Specialist ${active.name} certificate`}
              width={active.width}
              height={active.height}
              sizes="92vw"
              className={styles.lightboxImage}
              priority
            />
            <div className={styles.caption}>
              <span>
                IT Specialist — {active.name} · {active.date}
              </span>
              <span className="mono">ID {active.verifyId}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
