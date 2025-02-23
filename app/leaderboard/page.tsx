"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { User } from "@/app/types/user";
import Link from "next/link";
import { Trophy, Medal, Award, Coins } from "lucide-react";
import Loader from "@/app/components/loader/loader";
import Glassbox from "@/app/components/glassbox/glassbox";

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("all-time");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers(1, filter, true);
  }, [filter]);

  const fetchUsers = async (page: number, filter: string, reset = false) => {
    const res = await fetch(`/api/leaderboard?page=${page}&filter=${filter}`);
    const data = await res.json();
    if (data.length < 10) setHasMore(false);
    setUsers((prev) => (reset ? data : [...prev, ...data]));
    setLoading(false);
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchUsers(nextPage, filter);
        return nextPage;
      });
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className={styles.goldIcon} size={20} />;
      case 1:
        return <Medal className={styles.silverIcon} size={20} />;
      case 2:
        return <Award className={styles.bronzeIcon} size={20} />;
      default:
        return `#${index + 1}`;
    }
  };

  if (loading) {
    return (
      <div className={styles.leaderboardContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.title}>The Coding Elite</h1>
      <h2 className={styles.subtitle}>Showcasing Talent, One Quiz at a Time</h2>
      <div className={styles.filterGroup}>
        <button
          onClick={() => setFilter("all-time")}
          className={`${styles.filterButton} ${
            filter === "all-time" ? styles.active : ""
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setFilter("last-month")}
          className={`${styles.filterButton} ${
            filter === "last-month" ? styles.active : ""
          }`}
        >
          Last Month
        </button>
      </div>
      <ul className={styles.userList}>
        {users.map((user, index) => (
          <Glassbox key={user.id} className={styles.largeReflectionFix}>
            <li
              className={`${styles.userItem} ${
                index === 0
                  ? styles.userItemFirst
                  : index === 1
                  ? styles.userItemSecond
                  : index === 2
                  ? styles.userItemThird
                  : ""
              }`}
            >
              <div className={styles.position}>{index + 1}</div>

              <span className={styles.rank}>{getRankIcon(index)}</span>
              <Link
                href={user.profileUrl || ""}
                target="_blank"
                className={styles.avatarLink}
              >
                <Image
                  src={user.avatarUrl || "/images/default-avatar.png"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </Link>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.points}>
                <Coins className={styles.coinsIcon} size={16} />
                {user.points}
              </span>
            </li>
          </Glassbox>
        ))}
      </ul>
      {hasMore && (
        <button onClick={loadMore} className={styles.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Leaderboard;
