"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { User } from "@/app/types/user";
import Link from "next/link";

interface CategoryProgress {
  category: string;
  progress: number;
}

export default function UserProfile() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<CategoryProgress[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedProfileUrl, setUpdatedProfileUrl] = useState<string>("");

  useEffect(() => {
    if (!session) return;

    const fetchUserProgress = async () => {
      try {
        const res = await fetch(`/api/user-progress?user=${session.user?.id}`);
        const data = await res.json();
        setProgress(data.progress);
        setUser(data.user);
        setUpdatedName(data.user?.name || "");
        setUpdatedProfileUrl(data.user?.profileUrl || "");
      } catch (error) {
        console.error("Error fetching progress", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [session]);

  const handleUpdateProfile = async () => {
    if (!user || !updatedName) return;

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          name: updatedName,
          profileUrl: updatedProfileUrl,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setEditing(false);
      } else {
        console.error("Failed to update profile", data.error);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!session && !loading) return <p>Please log in to view your profile.</p>;

  return (
    <div className={styles.profileContainer}>
      {loading ? (
        "Loading ..."
      ) : (
        <>
          <div className={styles.profileHeader}>
            <Link href={user?.profileUrl || ""} target="_blank">
              <Image
                width={80}
                height={80}
                src={user?.avatarUrl || "/images/default-avatar.png"}
                alt="Avatar"
                className={styles.avatar}
              />
            </Link>
            <div className={styles.userInfo}>
              {editing ? (
                <>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    value={updatedProfileUrl}
                    onChange={(e) => setUpdatedProfileUrl(e.target.value)}
                    placeholder="Profile URL"
                    className={styles.input}
                  />
                </>
              ) : (
                <>
                  <div className={styles.userName}>{user?.name}</div>

                  <div className={styles.userEmail}>{user?.email}</div>
                  <div className={styles.createdAt}>
                    Joined:{" "}
                    {new Date(user?.createdAt || "").toLocaleDateString()}
                  </div>
                  <div className={styles.points}>Points: {user?.points}</div>
                  <div className={styles.progressSection}>
                    <h3>Progress per Category</h3>
                    {progress.length === 0 ? (
                      <p>No progress yet.</p>
                    ) : (
                      progress.map((item) => (
                        <div
                          key={item.category}
                          className={styles.progressCategory}
                        >
                          <div className={styles.progressLabel}>
                            <span>{item.category}</span>
                            <span>{item.progress}%</span>
                          </div>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            {editing ? (
              <button
                onClick={handleUpdateProfile}
                className={styles.saveButton}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className={styles.editButton}
              >
                Edit Profile
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
