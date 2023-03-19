"use client";

import styles from "components/home.module.scss";

function LatestOnYoutube() {
  return (
    <div className={styles.latestOnYoutube}>
      <h3 className={styles.latestOnYoutubeTitle}>Trending On YouTube</h3>
      <div>
        <iframe
          loading="lazy"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ZFGX29ZI52U"
          title="Code with Sloba on YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default LatestOnYoutube;
