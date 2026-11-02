import { profile } from "@/content/site";
import { HeroVisual } from "./HeroVisual";
import styles from "./Hero.module.css";

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <HeroVisual />

      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`mono ${styles.eyebrow}`}>
            <span className={styles.rule} aria-hidden="true" />
            {profile.location} · Open to work
          </p>

          <h1 className={`display ${styles.title}`}>
            Emjay
            <br />
            Warren
            <br />
            <em>Campano</em>
          </h1>

          <p className={styles.sub}>
            {profile.headline.split("end-to-end").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <strong>end-to-end</strong>}
              </span>
            ))}
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#work">
              See the work
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button type="button" className={styles.ghost} onClick={onOpenChat}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path
                  d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.7-.8L3 21l1.9-5.3a8.4 8.4 0 0 1-.9-3.7 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.4Z"
                  strokeLinejoin="round"
                />
              </svg>
              Ask me anything
            </button>
          </div>

          <dl className={styles.meta}>
            {profile.meta.map((item) => (
              <div key={item.label}>
                <dt className="mono">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.side} aria-hidden="true">
          <p className={`mono ${styles.caption}`}>
            <span>Signal / Node 01</span>
            <span className={styles.caption2}>Hardware ↔ Web</span>
          </p>
        </div>
      </div>

      <a className={styles.scrollCue} href="#work" aria-label="Scroll to work">
        <span className="mono">Scroll</span>
        <span className={styles.rail} aria-hidden="true" />
      </a>
    </section>
  );
}
