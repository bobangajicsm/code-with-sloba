"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "components/home.module.scss";

function LatestOnYoutube() {
  return (
    <div className={styles.latestOnYoutube}>
      <h3 className={styles.latestOnYoutubeTitle}>Trending On YouTube</h3>
      <Link
        href="https://youtu.be/fHOu86QxMvk"
        className={styles.latestOnYoutubeLink}
        target="_blank"
      >
        <Image
          className={styles.latestOnYoutubeImage}
          width={480}
          height={360}
          src="https://img.youtube.com/vi/fHOu86QxMvk/hqdefault.jpg"
          alt="Code with Sloba YouTube"
        />
        <span className={styles.latestOnYoutubePlayButton}>▶</span>
      </Link>
    </div>
  );
}

export default LatestOnYoutube;
