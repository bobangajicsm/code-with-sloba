"use client";
import Newsletter from "./newsletter";
import Image from "next/image";
import styles from "/components/home.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerNewsletter}>
        <p className={styles.footerText}>
          This is a weekly digest covering tips, tricks and tutorials. Join and
          don&apos;t miss another week!
        </p>
        <Newsletter />
      </div>
      <div className={styles.footerCopyright}>
        <div className={styles.footerContent}>
          <Image
            src="/images/logo.png"
            alt="Code with Sloba"
            width={80}
            height={27}
          />
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <Link className={styles.navListLink} href="/sponsorship">
                Sponsorship
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerContent}>
          <p>Copyright © {new Date().getFullYear()}</p>
          <div className={styles.footerLinks}>
            <div className={styles.footerItem}>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/slobodan-gajic/"
                className={styles.footerLink}
              >
                <Image
                  className={styles.footerImage}
                  src="/images/linkedin.svg"
                  alt="Linkedin"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <div className={styles.footerItem}>
              <Link
                target="_blank"
                href="https://www.instagram.com/codewithsloba/"
                className={styles.footerLink}
              >
                <Image
                  className={styles.footerImage}
                  src="/images/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <div className={styles.footerItem}>
              <Link
                target="_blank"
                href="https://www.youtube.com/@CodewithSloba?sub_confirmation=1"
                className={styles.footerLink}
              >
                <Image
                  className={styles.footerImage}
                  src="/images/youtube.svg"
                  alt="Youtube"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <div className={styles.footerItem}>
              <Link
                target="_blank"
                href="https://www.patreon.com/CodewithSloba"
                className={styles.footerLink}
              >
                <Image
                  className={styles.footerImage}
                  src="/images/patreon.svg"
                  alt="Patreon"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
