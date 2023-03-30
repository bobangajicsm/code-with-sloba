"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "components/home.module.scss";

function LatestOnYoutube() {
  return (
    <div className={styles.latestOnYoutube}>
      <h2 className={styles.latestOnYoutubeTitle}>Trending On YouTube</h2>
      <Link
        href="https://youtu.be/FX0fU94FcKI"
        className={styles.latestOnYoutubeLink}
        target="_blank"
      >
        <Image
          className={styles.latestOnYoutubeImage}
          width={480}
          height={360}
          src="https://img.youtube.com/vi/FX0fU94FcKI/hqdefault.jpg"
          alt="Code with Sloba YouTube"
        />
        <span className={styles.latestOnYoutubePlayButton}>▶</span>
      </Link>
    </div>
  );
}

export default LatestOnYoutube;
