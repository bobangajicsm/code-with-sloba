"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { User } from "@/app/types/user";
import Link from "next/link";
import {
  Code,
  Mail,
  Link as LinkIcon,
  Calendar,
  Users,
  Edit,
} from "lucide-react";
import Loader from "@/app/components/loader/loader";
import Glassbox from "@/app/components/glassbox/glassbox";

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

  const getCategoryIcon = (category: string) => {
    return (
      <Image
        width={20}
        height={20}
        src={`/images/${category.toLowerCase()}.png`}
        alt={category.toLowerCase()}
      />
    );
  };

  if (!session && !loading)
    return (
      <p className={styles.noSession}>Please log in to view your profile.</p>
    );

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>User Profile</h1>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.profileLayout}>
            <Glassbox>
              <div className={styles.userInfoBox}>
                <div className={styles.profileHeader}>
                  <Link
                    href={user?.profileUrl || ""}
                    target="_blank"
                    className={styles.avatarLink}
                  >
                    <Image
                      width={80}
                      height={80}
                      src={user?.avatarUrl || "/images/default-avatar.png"}
                      alt="Avatar"
                      className={styles.avatar}
                    />
                  </Link>
                  <div className={styles.userDetails}>
                    {editing ? (
                      <>
                        <input
                          type="text"
                          value={updatedName}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          className={styles.input}
                          placeholder="Name"
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
                        <div className={styles.userItem}>
                          <Mail className={styles.icon} size={16} />
                          <span className={styles.userText}>{user?.email}</span>
                        </div>
                        <div className={styles.userItem}>
                          <LinkIcon className={styles.icon} size={16} />
                          <Link
                            href={user?.profileUrl || ""}
                            target="_blank"
                            className={styles.link}
                          >
                            <span className={styles.userText}>
                              {user?.profileUrl || "No profile URL"}
                            </span>
                          </Link>
                        </div>
                        <div className={styles.userItem}>
                          <Calendar className={styles.icon} size={16} />
                          <span className={styles.userText}>
                            Joined:{" "}
                            {new Date(
                              user?.createdAt || ""
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.userItem}>
                          <Users className={styles.icon} size={16} />
                          <span className={styles.userText}>
                            {" "}
                            Points: {user?.points}
                          </span>
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
                      <Edit className={styles.buttonIcon} size={16} /> Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className={styles.editButton}
                    >
                      <Edit className={styles.buttonIcon} size={16} /> Edit
                      Profile
                    </button>
                  )}
                </div>
              </div>
            </Glassbox>

            {/* Right Side - Progress */}
            <div className={styles.progressBox}>
              <h3 className={styles.progressTitle}>Completed Questions</h3>
              {progress.length === 0 ? (
                <p className={styles.noProgress}>No progress yet.</p>
              ) : (
                progress.map((item) => (
                  <Link
                    key={item.category}
                    href={`posts/${item.category.toLocaleLowerCase()}`}
                  >
                    <div className={styles.progressCategory}>
                      <div className={styles.progressItem}>
                        {getCategoryIcon(item.category)}
                        <span className={styles.categoryName}>
                          {item.category}
                        </span>
                        <span className={styles.progressValue}>
                          {item.progress || 0}%
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${item.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
