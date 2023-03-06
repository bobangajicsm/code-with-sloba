"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "components/home.module.scss";
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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

  const handleScroll = (e) => {
    if (
      window.location.hash === "#socials" ||
      window.location.pathname === "/"
    ) {
      scrollToSocials();
    } else {
      router.push("/#socials");
    }
  };

  const scrollToSocials = () => {
    const elem = document.getElementById("socials");
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          className={styles.navImage}
          src="/images/logo.png"
          height={52}
          width={150}
          alt="Code with Sloba"
        />
      </Link>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <Link className={styles.navListLink} href="/sponsorship">
            Sponsorship
          </Link>
        </li>
        <li className={styles.navListItem}>
          <button className={styles.navListLink} onClick={handleScroll}>
            Socials
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
