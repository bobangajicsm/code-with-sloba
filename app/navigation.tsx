"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./components/home.module.scss";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import AuthButtons from "@/app/components/auth-button/auth-button";

function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Link href="/" onClick={closeMenu}>
          <Image
            className={styles.navImage}
            src="/images/logo.png"
            height={22}
            width={63}
            alt="Code with Sloba"
          />
        </Link>
        {/* Hamburger Button for Mobile */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerIcon}></span>
        </button>
        {/* Navigation List */}
        <ul
          className={`${styles.navList} ${
            isMenuOpen ? styles.navListOpen : ""
          }`}
        >
          <li className={styles.navListItem}>
            <Link
              className={styles.navListLink}
              href="/learn"
              onClick={closeMenu}
            >
              Learn
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link
              className={styles.navListLink}
              href="/leaderboard"
              onClick={closeMenu}
            >
              Leaderboard
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link
              className={styles.navListLink}
              href="/sponsorship"
              onClick={closeMenu}
            >
              Sponsorship
            </Link>
          </li>
          <li className={styles.navListItem}>
            <AuthButtons onCloseMenu={closeMenu} />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
