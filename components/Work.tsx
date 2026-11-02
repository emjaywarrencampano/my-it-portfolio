import { work } from "@/content/site";
import styles from "./Work.module.css";

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Diagram() {
  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 420 340"
      role="img"
      aria-label="System architecture: ESP32, GPS and RFID on the vehicle, linked by 4G LTE to a central server, then to a live web dashboard"
    >
      <rect className={styles.box} x="10" y="118" width="126" height="104" rx="10" />
      <text x="24" y="140">ON VEHICLE</text>
      <rect className={styles.box} x="24" y="150" width="98" height="24" rx="5" />
      <text className={styles.label} x="34" y="166">ESP32</text>
      <rect className={styles.box} x="24" y="180" width="46" height="22" rx="5" />
      <text className={styles.label} x="30" y="195">GPS</text>
      <rect className={styles.box} x="76" y="180" width="46" height="22" rx="5" />
      <text className={styles.label} x="82" y="195">RFID</text>

      <path className={styles.flow} d="M136 170 C 180 170, 180 170, 224 170" />
      <text x="150" y="160">4G LTE</text>

      <rect className={styles.box} x="224" y="118" width="112" height="104" rx="10" />
      <text x="238" y="140">SERVER</text>
      <rect className={styles.box} x="238" y="150" width="84" height="24" rx="5" />
      <text className={styles.label} x="246" y="166">API + DB</text>
      <text x="238" y="196">real-time sync</text>

      <path className={styles.line} d="M336 170 L 366 170" />
      <circle className={styles.node} cx="366" cy="170" r="3" />

      <rect className={styles.box} x="224" y="252" width="112" height="56" rx="10" strokeDasharray="3 4" />
      <text x="238" y="274">DASHBOARD</text>
      <text className={styles.label} x="238" y="292">web app</text>

      <path className={styles.line} d="M280 222 L 280 252" strokeDasharray="3 4" />
      <text x="292" y="244">live view</text>

      <text x="10" y="322">ISO/IEC 25010 · 4.88 experts · 5.00 end users</text>
    </svg>
  );
}

export function Work() {
  return (
    <section id="work" className={styles.section}>
      <div className="wrap">
        <div className={styles.head} data-reveal>
          <div className={styles.headLeft}>
            <span className={`mono ${styles.num}`}>01</span>
            <h2 className={`display ${styles.title}`}>Selected work</h2>
          </div>
          <p className={styles.note}>One project, built and measured. Real numbers, not adjectives.</p>
        </div>

        <article className={styles.card} data-reveal>
          <div className={styles.top}>
            <div className={styles.info}>
              <div className={`mono ${styles.kicker}`}>
                <span className={styles.tag}>{work.kicker}</span>
                <span>{work.role}</span>
              </div>

              <h3 className={styles.cardTitle}>
                Track My <em>{work.titleAccent}</em>
              </h3>

              <p className={styles.desc}>{work.description}</p>

              <ul className={styles.points}>
                {work.highlights.map((point) => (
                  <li key={point}>
                    <Check />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.stack}>
                {work.stack.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>

              <p className={styles.context}>{work.context}</p>
            </div>

            <div className={styles.visual}>
              <Diagram />
            </div>
          </div>

          <dl className={styles.stats}>
            {work.metrics.map((metric) => (
              <div key={metric.label} className={styles.stat}>
                <dt className={styles.numBig}>
                  {metric.value}
                  <sup>{metric.suffix}</sup>
                </dt>
                <dd className={styles.statLabel}>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}
