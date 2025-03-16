"use client";
import { useEffect, useRef } from "react";
import styles from "./jumbotron.module.scss";
import Image from "next/image";

function Jumbotron() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerWidth <= 768 ? 300 : 500; // Less distance on mobile
      const progress = Math.min(scrollY / maxScroll, 1); // 0 to 1

      if (imageRef.current) {
        const translateZ = -250 + 250 * progress;
        const rotateX = 27 - 27 * progress;
        const scale = 0.9 + 0.1 * progress;
        imageRef.current.style.transform = `perspective(750px) translate3d(0px, 0px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale}, ${scale})`;
      }
      lastScrollY = scrollY;
    };

    // Throttle scroll event for performance
    let timeout: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          handleScroll();
        }, 16); //
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll); // Cleanup
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Become <span>Frontend Expert</span> in 10 minutes a day.
        </h1>
        <h2 className={styles.subtitle}>
          Daily learn new topics, practice and test your knowledge.
        </h2>
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
        <div className={styles.caption}>
          Discover why over 250K developers follow Sloba. Start 100% free.
        </div>
        <svg
          className={styles.arrow}
          width="150px"
          height="150px"
          viewBox="0 0 352.2 352.2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M348.232,100.282c-13.464-32.436-35.496-60.588-45.9-94.86c-1.836-5.508-11.016-7.956-13.464-1.836
      c-14.688,34.272-36.72,65.484-47.124,101.592c-1.836,6.732,7.344,13.464,12.24,7.344c7.344-9.18,15.912-16.524,24.479-25.092
      c-1.224,52.632,0,105.264-9.18,157.284c-4.896,28.152-11.628,59.977-31.824,81.396c-24.479,25.704-55.08,2.448-68.544-21.42
      c-11.628-20.809-31.823-110.772-72.215-79.561c-23.868,18.36-29.988,43.452-37.332,70.992c-1.836,7.956-4.896,15.3-8.568,22.032
      c-14.076,26.316-32.436-16.524-33.048-26.928c-1.224-20.809,4.896-42.229,9.792-62.424c1.836-6.12-7.344-8.568-9.792-2.448
      c-11.016,28.764-26.316,77.724,0,102.815c23.256,21.42,42.84,7.345,52.02-17.748c6.12-16.523,29.376-108.323,56.304-65.483
      c17.748,28.151,22.644,61.812,44.064,88.128c15.3,18.359,42.84,22.644,64.26,13.464c25.704-11.628,36.72-45.9,43.452-70.38
      c16.523-61.2,16.523-127.296,14.688-190.332c14.688,9.792,31.212,18.972,47.736,25.092
      C347.008,113.746,350.681,105.178,348.232,100.282z"
              stroke="white"
              strokeWidth="5"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className={styles.animatedPath}
            />
          </g>
        </svg>
      </div>
      <div className={styles.imgContainer}>
        <Image
          ref={imageRef}
          className={styles.demo}
          priority
          width={750}
          height={868}
          src="/images/demo.jpg"
          alt="code with sloba"
          sizes="(max-width: 768px) 90vw, 750px" // Responsive image sizing
        />
      </div>
    </>
  );
}

export default Jumbotron;
