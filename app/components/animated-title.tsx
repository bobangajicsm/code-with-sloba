"use client";
import { useIntersectionObserver } from "@/app/components/useIntersectionObserverHook";
import { useRef } from "react";
import styles from "./animated-title.module.scss";

function AnimatedTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { ref, isVisible } = useIntersectionObserver();
  const words = title.split(" ");

  return (
    <>
      <div
        ref={ref}
        className={`${styles.container} ${isVisible ? styles.visible : ""}`}
      >
        <h2 className={styles.title}>
          <div
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: "0ms" }}
          >
            <span>{words[0]}&nbsp;</span>
          </div>
          <div
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: "93.3333ms" }}
          >
            <span>{words[1]}&nbsp;</span>
          </div>
          <div
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: "186.667ms" }}
          >
            <span>{words[2]}&nbsp;</span>
          </div>
          <div
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: "280ms" }}
          >
            <span>{words[3]}&nbsp;</span>
          </div>
          <div
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: "380ms" }}
          >
            <span>{words[4]}&nbsp;</span>
          </div>
          <div
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: "480ms" }}
          >
            <span>{words[5]}</span>
          </div>
        </h2>
        <h3 className={styles.subtitle}>{subtitle}</h3>
      </div>
    </>
  );
}

export default AnimatedTitle;
