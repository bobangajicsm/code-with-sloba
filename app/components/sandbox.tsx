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
      <Image
        className={styles.image}
        src="/images/sandbox.png"
        alt="sandbox"
        width={640}
        height={400}
      />
    </div>
  );
}

export default Sandbox;
