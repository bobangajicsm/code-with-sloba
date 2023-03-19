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
      {/* <div>
        <iframe
          loading="lazy"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/fHOu86QxMvk"
          srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/fHOu86QxMvk?autoplay=1></a>"
          title="Code with Sloba on YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div> */}
    </div>
  );
}

export default LatestOnYoutube;
