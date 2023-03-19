"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "/components/home.module.scss";

function Technologies() {
  return (
    <div className={styles.technologiesWrapper}>
      <div className={styles.technologiesContent}>
        <div className={styles.technologiesItem}>
          <Link
            href="https://www.linkedin.com/posts/slobodan-gajic_typescript-utilities-activity-6975017137266393088-fG5h?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <Image
              className={`${styles.technologiesImg} ${styles.technologiesImgTypescript}`}
              width={88}
              height={88}
              src="/images/typescript.png"
              alt="TypeScript"
            />
          </Link>
        </div>
        <div className={styles.technologiesItem}>
          <Link
            href="https://www.youtube.com/playlist?list=PLjsBk8SIQEi9Owh_q04TK0SybkROD_AFx"
            target="_blank"
          >
            <Image
              className={`${styles.technologiesImg} ${styles.technologiesImgReact}`}
              width={88}
              height={88}
              src="/images/react.png"
              alt="React"
            />
          </Link>
        </div>
        <div className={styles.technologiesItem}>
          <Link
            href="https://www.linkedin.com/posts/slobodan-gajic_css-tip-maskimage-activity-6909392892008501248-pZBF?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <Image
              className={`${styles.technologiesImg} ${styles.technologiesImgCss}`}
              width={88}
              height={88}
              src="/images/css.png"
              alt="CSS"
            />
          </Link>
        </div>
        <div className={styles.technologiesItem}>
          <Link
            href="https://www.linkedin.com/posts/slobodan-gajic_codewithsloba-csstips-javascript-activity-6932933001903312896-aE71?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <Image
              className={`${styles.technologiesImg} ${styles.technologiesImgJavascript}`}
              width={88}
              height={88}
              src="/images/javascript.png"
              alt="JavaScript"
            />
          </Link>
        </div>
        <div className={styles.technologiesItem}>
          <Link
            href="https://www.linkedin.com/posts/slobodan-gajic_html-tags-activity-6970665279685046272-k-V-?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <Image
              className={`${styles.technologiesImg} ${styles.technologiesImgHtml}`}
              width={88}
              height={88}
              src="/images/html.png"
              alt="Html"
            />
          </Link>
        </div>

        <div className={styles.technologiesItem}>
          <Link
            href="https://www.youtube.com/playlist?list=PLjsBk8SIQEi-RqkglLcn19TaeeopcuDXV"
            target="_blank"
          >
            <Image
              className={`${styles.technologiesImg} ${styles.technologiesImgAngular}`}
              width={88}
              height={88}
              src="/images/angular.png"
              alt="Angular"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Technologies;
