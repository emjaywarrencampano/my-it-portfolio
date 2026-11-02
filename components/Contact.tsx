export function Contact() {
  return (
    <section id="contact" className="relative py-[clamp(100px,15vw,190px)] text-center">
      <div className="wrap">
        <p className="mono mb-6 text-[var(--accent)]" data-reveal>
          05 — Contact
        </p>

        <h2 className="display mx-auto mb-6 max-w-[16ch] text-[clamp(44px,7.6vw,104px)] leading-[0.95] tracking-[-0.03em]" data-reveal>
          Let’s build something <em className="italic text-[var(--accent)]">that works.</em>
        </h2>

        <p className="mx-auto mb-9 max-w-[42ch] text-[var(--muted)]" data-reveal>
          Open to IT support, systems, and development roles. Replies within a day.
        </p>

        <a
          href="mailto:emjaywarrencampano@gmail.com"
          className="border-b border-[var(--line-strong)] pb-1 text-[clamp(19px,2.6vw,30px)] tracking-[-0.02em] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          data-reveal
        >
          emjaywarrencampano@gmail.com
        </a>

        <div className="mt-11 flex flex-wrap justify-center gap-7" data-reveal>
          <a
            href="mailto:emjaywarrencampano@gmail.com"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            <svg viewBox="0 0 24 24" className="size-3.5 stroke-current" fill="none" strokeWidth={1.5} aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3.5 6.5 8.5 6 8.5-6" />
            </svg>
            Email
          </a>
          <a
            href="https://verify.certiport.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            <svg viewBox="0 0 24 24" className="size-3.5 stroke-current" fill="none" strokeWidth={1.5} aria-hidden="true">
              <path d="M12 2.8 20 6v6c0 5-3.4 8.1-8 9.2-4.6-1.1-8-4.2-8-9.2V6Z" strokeLinejoin="round" />
              <path d="M8.6 12.1 11 14.5l4.4-4.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verify certifications
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-7">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <span>© {new Date().getFullYear()} Emjay Warren P. Campano</span>
        <span>Built with Next.js · Ilagan, Isabela</span>
      </div>
    </footer>
  );
}
