"use client";
import Image from "next/image";

import styles from "/components/home.module.scss";

function Technologies() {
  return (
    <div className={styles.technologiesWrapper}>
      <div className={styles.technologiesContent}>
        <div className={styles.technologiesItem}>
          <Image
            className={styles.technologiesImg}
            width={88}
            height={88}
            src="/images/typescript.png"
            alt="TypeScript"
          />
        </div>
        <div className={styles.technologiesItem}>
          <Image
            className={styles.technologiesImg}
            width={88}
            height={88}
            src="/images/react.png"
            alt="React"
          />
        </div>
        <div className={styles.technologiesItem}>
          <Image
            className={styles.technologiesImg}
            width={88}
            height={88}
            src="/images/css.png"
            alt="CSS"
          />
        </div>
        <div className={styles.technologiesItem}>
          <Image
            className={styles.technologiesImg}
            width={78}
            height={88}
            src="/images/javascript.png"
            alt="JavaScript"
          />
        </div>
        <div className={styles.technologiesItem}>
          <Image
            className={styles.technologiesImg}
            width={88}
            height={88}
            src="/images/html.png"
            alt="Html"
          />
        </div>

        <div className={styles.technologiesItem}>
          <Image
            className={styles.technologiesImg}
            width={88}
            height={88}
            src="/images/angular.png"
            alt="Angular"
          />
        </div>
      </div>
    </div>
  );
}

export default Technologies;
