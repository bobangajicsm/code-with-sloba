"use client";
import styles from "./carousel.module.scss";
import Image from "next/image";

function Carousel({ left, random }: { left: boolean; random: boolean }) {
  return (
    <div className={styles.container}>
      {random ? (
        <div className={left ? styles.slideLeft : styles.slideRight}>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/react.png"
              alt={`Logo angular`}
            />
          </div>

          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/html.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/javascript.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/css.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/angular.png"
              alt={`Logo angular`}
            />
          </div>
        </div>
      ) : (
        <div className={left ? styles.slideLeft : styles.slideRight}>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/angular.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/css.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/html.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/javascript.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/react.png"
              alt={`Logo angular`}
            />
          </div>
        </div>
      )}

      {random ? (
        <div className={left ? styles.slideLeft : styles.slideRight}>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/react.png"
              alt={`Logo angular`}
            />
          </div>

          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/html.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/javascript.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/css.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/angular.png"
              alt={`Logo angular`}
            />
          </div>
        </div>
      ) : (
        <div className={left ? styles.slideLeft : styles.slideRight}>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/angular.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/css.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/html.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/javascript.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/react.png"
              alt={`Logo angular`}
            />
          </div>
        </div>
      )}

      {random ? (
        <div className={left ? styles.slideLeft : styles.slideRight}>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/react.png"
              alt={`Logo angular`}
            />
          </div>

          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/html.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/javascript.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/css.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/angular.png"
              alt={`Logo angular`}
            />
          </div>
        </div>
      ) : (
        <div className={left ? styles.slideLeft : styles.slideRight}>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/angular.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/css.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/html.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            <Image
              width={40}
              height={40}
              src="/images/javascript.png"
              alt={`Logo angular`}
            />
          </div>
          <div className={styles.logoWrapper}>
            {" "}
            <Image
              width={40}
              height={40}
              src="/images/react.png"
              alt={`Logo angular`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Carousel;
