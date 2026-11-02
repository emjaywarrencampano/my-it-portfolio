import { about } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={`wrap ${styles.grid}`}>
        <div data-reveal>
          <span className={`mono ${styles.num}`}>04</span>
          <p className={styles.lead}>
            I like problems that start at the <em>hardware</em> and end at the <em>browser</em>.
          </p>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          <p className={styles.sig}>
            <span className={styles.line} aria-hidden="true" />
            <span>Emjay Warren P. Campano · Ilagan, Isabela</span>
          </p>
        </div>

        <div data-reveal>
          <dl className={styles.skills}>
            {about.skills.map((group) => (
              <div key={group.group} className={styles.group}>
                <dt className={`mono ${styles.groupLabel}`}>{group.group}</dt>
                <dd className={styles.items}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.chip}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
