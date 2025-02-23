"use client";
import AnimatedTitle from "@/app/components/animated-title";
import styles from "./dont-wait.module.scss";
import Image from "next/image";
import { useIntersectionObserver } from "@/app/components/useIntersectionObserverHook";
import { useState, useEffect } from "react";
import Glassbox from "@/app/components/glassbox/glassbox";

function DontWait() {
  const { ref, isVisible } = useIntersectionObserver();

  const [startRotation, setStartRotation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible) {
        setStartRotation(true);
      }
    }, 1250);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={styles.container} ref={ref}>
      <Glassbox>
        <div className={styles.wrapper}>
          <AnimatedTitle
            title="What are you waiting for?"
            subtitle="Streak always starts with one."
          />
          <a href="/learn" className={styles.button}>
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.35421 1.90163C2.18757 1.80867 1.98242 1.92915 1.98242 2.11996V17.88C1.98242 18.0708 2.18757 18.1913 2.35421 18.0983L16.4804 10.2183C16.6513 10.1229 16.6513 9.87701 16.4804 9.78165L2.35421 1.90163ZM0.482422 2.11996C0.482422 0.784268 1.91848 -0.0590357 3.08495 0.591663L17.2111 8.47169C18.4077 9.1392 18.4077 10.8608 17.2111 11.5283L3.08495 19.4083C1.91847 20.059 0.482422 19.2157 0.482422 17.88V2.11996Z"
                fill="black"
              ></path>
            </svg>
            Start learning
          </a>
        </div>
      </Glassbox>
      <Image
        className={`${styles.avatar} ${
          isVisible && startRotation
            ? styles.rotate
            : isVisible && !startRotation
            ? styles.slideIn
            : ""
        }`}
        src="/images/glavna-efekat.png"
        alt="sloba"
        width={669}
        height={975}
      />
      <svg
        width="19"
        height="20"
        viewBox="0 0 300 300"
        fill="none"
        className={`${styles.svg} ${isVisible ? styles.slideInTwo : ""}`}
      >
        <g>
          <path
            className={styles.path}
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            d="M428.034,625.834c1.189,12.376,0.71,17.562,0.335,30.1c-0.816-11.946,3.5-25.501,14.772-31.285   c11.272-5.784,24.535-5.674,37.203-5.477c110.616,1.717,221.285,0.014,331.797-5.105c7.998-0.37,16.296-0.838,23.361-4.605   c16.111-8.591,19.365-29.864,20.724-48.072c0.867-11.618,1.716-23.468-1.07-34.781c-2.786-11.313-9.87-22.205-20.683-26.542   c-4.938-1.98-10.323-2.494-15.623-2.964c-116.141-10.302-233.258-9.568-349.261,2.187c-15.095,1.53-32.261,4.501-40.254,17.397   c-5.312,8.571-5.03,19.342-4.577,29.415c1.167,25.922,2.127,47.257,3.294,73.179L428.034,625.834z"
          />
          <text className={styles.svgText} fill="black">
            See you soon!
          </text>
        </g>
      </svg>
    </div>
  );
}

export default DontWait;
