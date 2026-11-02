import { work } from "@/content/site";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" className={styles.section}>
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <div className={styles.headLeft}>
            <span className={`mono ${styles.num}`}>01</span>
            <h2 className={`display ${styles.title}`}>Selected work</h2>
          </div>
          <p className={styles.note}>One capstone project, described plainly.</p>
        </div>

        <article className={styles.card} data-reveal>
          <div className={styles.top}>
            <p className={`mono ${styles.kicker}`}>{work.kicker}</p>

            <h3 className={styles.cardTitle}>
              Track My <em>{work.titleAccent}</em>
            </h3>

            <p className={styles.desc}>{work.description}</p>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={`mono ${styles.metaLabel}`}>Role</span>
                <span className={styles.metaValue}>{work.role}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={`mono ${styles.metaLabel}`}>Stack</span>
                <span className={styles.stack}>
                  {work.stack.map((item) => (
                    <span key={item} className={styles.chip}>
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <p className={styles.context}>
              {work.context} <span className={styles.note}>{work.note}</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
