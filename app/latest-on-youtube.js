"use client";

import styles from "components/home.module.scss";

function LatestOnYoutube() {
  return (
    <div className={styles.latestOnYoutube}>
      <h3 className={styles.latestOnYoutubeTitle}>Trending On YouTube</h3>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/co-m3bfIxKQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default LatestOnYoutube;
