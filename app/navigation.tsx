"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./components/home.module.scss";
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import AuthButtons from "@/app/components/auth-button/auth-button";

function Navigation() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (window.location.hash === "#socials") {
        scrollToSocials();
      }
    }, 300);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [pathname, searchParams]);

  const scrollToSocials = () => {
    const elem = document.getElementById("socials");
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Link href="/">
          <Image
            className={styles.navImage}
            src="/images/logo.png"
            height={22}
            width={63}
            alt="Code with Sloba"
          />
        </Link>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link className={styles.navListLink} href="/learn">
              Learn
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link className={styles.navListLink} href="/leaderboard">
              Leaderboard
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link className={styles.navListLink} href="/sponsorship">
              Sponsorship
            </Link>
          </li>

          <li className={styles.navListItem}>
            <AuthButtons />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
