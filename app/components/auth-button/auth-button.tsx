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
        <>
          <button className={styles.avatarButton} onClick={toggleDropdown}>
            <Image
              width={24}
              height={24}
              src={session.user?.avatarUrl || "/images/default-avatar.png"}
              alt={session.user?.name || "User"}
              className={styles.avatar}
            />
          </button>

          {isOpen && (
            <div className={styles.dropdown}>
              <div className={styles.disabledItem}>{session.user?.name}</div>
              <Link href="/profile" className={styles.dropdownItem}>
                Profile
              </Link>
              <button
                className={styles.dropdownItem}
                onClick={() =>
                  signOut({
                    callbackUrl: "/auth/login",
                  })
                }
              >
                Log Out
              </button>
            </div>
          )}
        </>
      ) : (
        <Link className={styles.navListItem} href="/auth/login">
          Sign in
        </Link>
      )}
    </div>
  );
}
