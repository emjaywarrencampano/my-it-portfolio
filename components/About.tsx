import { about } from "@/content/site";
import { SkillLogo } from "./SkillMarks";
import styles from "./About.module.css";

const PRIMARY_GROUPS = new Set([
  "Languages",
  "Web Technologies",
  "Databases",
  "Tools",
]);

export function About() {
  const primary = about.skills.filter((group) => PRIMARY_GROUPS.has(group.group));
  const rest = about.skills.filter((group) => !PRIMARY_GROUPS.has(group.group));

  return (
    <section id="about" className={styles.section}>
      <div className={`wrap ${styles.grid}`}>
        <div data-reveal>
          <span className={`mono ${styles.num}`}>04</span>
          <p className={styles.lead}>
            I fix machines, set up systems, and build the small tools that make work <em>easier</em>.
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
          <div className={styles.primary}>
            {primary.map((group) => (
              <div key={group.group} className={styles.primaryGroup}>
                <p className={`mono ${styles.groupLabel}`}>{group.group}</p>
                <ul className={styles.tiles}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.tile}>
                      <span className={styles.tileIcon}>
                        <SkillLogo name={item} className={styles.logo} />
                      </span>
                      <span className={styles.tileName}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <dl className={styles.skills}>
            {rest.map((group) => (
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
