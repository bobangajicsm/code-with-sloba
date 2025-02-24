"use client";
import AnimatedTitle from "@/app/components/animated-title";
import Image from "next/image";
import styles from "./sandbox.module.scss";

function Sandbox() {
  return (
    <div className={styles.container}>
      <AnimatedTitle
        title="Code playground for interactive learning"
        subtitle="You can copy code snipets, edit, debug and get your hands dirty in code"
      />
      <div className={styles.images}>
        <Image
          className={styles.image}
          src="/images/codesandbox-image-1-min.png"
          alt="sandbox"
          width={1300}
          height={720}
        />
        <Image
          className={styles.image2}
          src="/images/codesandbox-image-2-min.png"
          alt="sandbox"
          width={500}
          height={313}
        />
        <Image
          className={styles.image3}
          src="/images/codesandbox-image-4-min.png"
          alt="sandbox"
          width={400}
          height={175}
        />
        <Image
          className={styles.image4}
          src="/images/codesandbox-image-3-min.png"
          alt="sandbox"
          width={381}
          height={289}
        />
      </div>
    </div>
  );
}

export default Sandbox;
