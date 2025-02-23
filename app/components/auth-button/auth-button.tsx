"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./auth-button.module.scss";

export default function AuthButtons() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.authContainer}>
      {session ? (
        <div className={styles.dropdown}>
          <button onClick={toggleDropdown} className={styles.trigger}>
            {session.user?.avatarUrl ? (
              <Image
                src={session.user.avatarUrl}
                alt="Profile"
                width={24}
                height={24}
                className={styles.avatar}
              />
            ) : (
              <span className={styles.initial}>
                {session.user?.name?.[0]?.toUpperCase()}
              </span>
            )}
          </button>

          {isOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.userInfo}>
                <span>{session.user?.name}</span>
              </div>
              <Link href="/profile" className={styles.menuItem}>
                Profile
              </Link>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/auth/login",
                  })
                }
                className={styles.menuItem}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/auth/login" className={styles.signInButton}>
          Sign in
        </Link>
      )}
    </div>
  );
}
