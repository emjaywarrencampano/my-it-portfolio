import { experience } from "@/content/site";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <div className={styles.headLeft}>
            <span className={`mono ${styles.num}`}>03</span>
            <h2 className={`display ${styles.title}`}>Experience</h2>
          </div>
          <p className={styles.note}>Four years of doing the work — records, hardware, and systems.</p>
        </div>

        <div className={styles.list}>
          {experience.map((entry) => (
            <article key={entry.role} className={styles.row} data-reveal>
              <p className={`mono ${styles.period}`}>{entry.period}</p>
              <div className={styles.main}>
                <h3 className={styles.role}>{entry.role}</h3>
                <p className={styles.org}>{entry.org}</p>
                <ul className={styles.points}>
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <p className={styles.location}>{entry.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
