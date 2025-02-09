"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedTitle from "@/app/landing/components/animated-title";
import styles from "./questionaire.module.scss";

interface Module {
  id: string;
  name: string;
  points: number;
  rank: number;
}

const ACTIVE_MODULE_ID = "AJosh98";

const initialModules: Module[] = [
  { id: "SbStefan", name: "SbStefan", points: 1130, rank: 13 },
  { id: "CJMark", name: "CJMark", points: 1100, rank: 14 },
  { id: "AngelaPo", name: "AngelaPo", points: 1050, rank: 15 },
  { id: ACTIVE_MODULE_ID, name: "AJosh98", points: 940, rank: 16 },
];

function Questionaire() {
  const [modules, setModules] = useState(initialModules);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setModules((prev) => {
        const activeIndex = prev.findIndex(
          (mod) => mod.id === ACTIVE_MODULE_ID
        );

        if (activeIndex === 0) {
          clearInterval(interval);

          setTimeout(() => {
            setModules(initialModules);
            setIsAnimating(false);

            setTimeout(() => {
              setIsAnimating(true);
            }, 500);
          }, 3000);

          return prev;
        }

        const newModules = [...prev];

        [newModules[activeIndex], newModules[activeIndex - 1]] = [
          newModules[activeIndex - 1],
          newModules[activeIndex],
        ];

        return newModules.map((mod, index) => ({
          ...mod,
          rank: 13 + index,
          points: mod.id === ACTIVE_MODULE_ID ? mod.points + 100 : mod.points,
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className={styles.container}>
      <Image
        className={styles.image1}
        alt="coin"
        src="/images/coin.png"
        width={58}
        height={76}
      />
      <Image
        className={styles.image2}
        alt="coin"
        src="/images/briliant.png"
        width={58}
        height={59}
      />
      <Image
        className={styles.image3}
        alt="coin"
        src="/images/star.png"
        width={58}
        height={60}
      />
      <AnimatedTitle
        title="Practice and earn points"
        subtitle="With points you get ranked higher and promoted on leaderboard for easier hiring"
      />

      <div className={styles.modules}>
        {modules.map((mod, index) => (
          <div
            key={mod.id}
            className={`${styles.module} ${
              mod.id === ACTIVE_MODULE_ID ? styles.moduleActive : ""
            }`}
            style={{ top: `${index * 82}px`, transition: "top 1s ease-out" }}
          >
            {mod.id === ACTIVE_MODULE_ID && (
              <svg
                className={styles.arrowRight}
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.3135 7.28033C13.6064 6.98744 13.6064 6.51256 13.3135 6.21967L7.31353 0.219669C7.02064 -0.0732235 6.54577 -0.0732235 6.25287 0.219669L0.252873 6.21967C-0.0400203 6.51256 -0.0400203 6.98744 0.252873 7.28033C0.545766 7.57322 1.02064 7.57322 1.31353 7.28033L6.7832 1.81066L12.2529 7.28033C12.5458 7.57322 13.0206 7.57322 13.3135 7.28033Z"
                  fill="#04e1fb"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.78318 17.9494C7.19739 17.9494 7.53318 17.6136 7.53318 17.1994L7.53315 1.07725C7.53315 0.663039 7.19737 0.327253 6.78315 0.327254C6.36894 0.327255 6.03315 0.663042 6.03315 1.07726L6.03318 17.1994C6.03318 17.6136 6.36897 17.9494 6.78318 17.9494Z"
                  fill="#04e1fb"
                ></path>
              </svg>
            )}
            <div className={styles.position}>{mod.rank}</div>
            <span>{mod.name}</span>
            <span>{mod.points} CwS Points</span>
          </div>
        ))}
      </div>

      <div className={styles.textContainer}>
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
            />
          </g>
        </svg>
        <h3 className={styles.text}>
          get noticed by <span>companies</span>
        </h3>
      </div>
    </div>
  );
}

export default Questionaire;
