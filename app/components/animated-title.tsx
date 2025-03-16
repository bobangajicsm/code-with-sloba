"use client";
import { useIntersectionObserver } from "@/app/components/useIntersectionObserverHook";
import { useRef } from "react";
import styles from "./animated-title.module.scss";

interface AnimatedTitleProps {
  title: string;
  subtitle: string;
}

function AnimatedTitle({ title, subtitle }: AnimatedTitleProps) {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const words = title.split(" ");

  return (
    <div
      ref={ref}
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>
        {words.map((word, index) => (
          <div
            key={index}
            className={`${styles.word} ${isVisible ? styles.show : ""}`}
            style={{ animationDelay: `${index * 93.3333}ms` }}
          >
            <span>{word} </span>
          </div>
        ))}
      </h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
}

export default AnimatedTitle;
