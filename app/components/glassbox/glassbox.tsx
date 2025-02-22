import React, { ReactNode } from "react";
import styles from "./glassbox.module.scss";

const Glassbox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.gradientOverlay} />
      <div
        className={`${styles.reflectionEffect} ${className && `${className}`}`}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Glassbox;
