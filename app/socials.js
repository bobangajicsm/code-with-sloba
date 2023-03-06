"use client";

import styles from "components/home.module.scss";
import Link from "next/link";
import Image from "next/image";

function Socials() {
  return (
    <div className={styles.socialsWrapper} id="socials">
      <div className={styles.socialsContent}>
        <h2 className={styles.socialsTitle}>Let&apos;s connect!</h2>
        <p className={styles.socialsDescription}>
          Follow my <b>Linkedin</b> and <b>Instagram</b> if you want to get{" "}
          <b>daily</b> tips.
          <br />
          Subscribe on <b>YouTube</b> for project based tutorials and theory
          based courses.
        </p>
        <div className={styles.socialsLinks}>
          <div className={styles.socialsItem}>
            <Link target="_blank" href="https://www.linkedin.com/in/slobodan-gajic/" className={styles.socialsLink}>
              <Image
                className={styles.socialsImage}
                src="/images/linkedin.png"
                alt="Linkedin"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className={styles.socialsItem}>
            <Link target="_blank" href="https://www.instagram.com/codewithsloba/" className={styles.socialsLink}>
              <Image
                className={styles.socialsImage}
                src="/images/instagram.png"
                alt="Instagram"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className={styles.socialsItem}>
            <Link target="_blank" href="https://bobangajicsm.github.io/portfolio/" className={styles.socialsLink}>
              <Image
                className={styles.socialsImage}
                src="/images/portfolio.png"
                alt="Slobodan Gajic Portfolio"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className={styles.socialsItem}>
            <Link
              target="_blank"
              href="https://www.youtube.com/@CodewithSloba?sub_confirmation=1"
              className={styles.socialsLink}
            >
              <Image
                className={styles.socialsImage}
                src="/images/youtube.png"
                alt="Youtube"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className={styles.socialsItem}>
            <Link target="_blank" href="https://www.patreon.com/CodewithSloba" className={styles.socialsLink}>
              <Image
                className={styles.socialsImage}
                src="/images/patreon.png"
                alt="Patreon"
                width={80}
                height={80}
              />
            </Link>
          </div>
        </div>
        <p className={styles.socialsCaptions}>
          Support me on <b>Patreon</b> to get access to exclusive content, and
          support from my courses.
        </p>
      </div>
    </div>
  );
}

export default Socials;
