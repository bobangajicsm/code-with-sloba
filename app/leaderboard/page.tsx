"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { User } from "@/app/types/user";
import Link from "next/link";

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("all-time");

  useEffect(() => {
    fetchUsers(1, filter, true);
  }, [filter]);

  const fetchUsers = async (page: number, filter: string, reset = false) => {
    const res = await fetch(`/api/leaderboard?page=${page}&filter=${filter}`);
    const data = await res.json();
    if (data.length < 10) setHasMore(false);
    setUsers((prev) => (reset ? data : [...prev, ...data]));
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>
      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all-time")}
          className={filter === "all-time" ? styles.active : ""}
        >
          All Time
        </button>
        <button
          onClick={() => setFilter("last-month")}
          className={filter === "last-month" ? styles.active : ""}
        >
          Last Month
        </button>
      </div>
      <ul className={styles.list}>
        {users.map((user, index) => (
          <li key={user.id} className={styles.user}>
            <span className={styles.rank}>#{index + 1}</span>
            <Link href={user.profileUrl || ""} target="_blank">
              <Image
                src={user.avatarUrl || "/images/default-avatar.png"}
                alt={user.name}
                width={40}
                height={40}
                className={styles.avatar}
              />
            </Link>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.points}>{user.points} pts</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={loadMore} className={styles.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Leaderboard;
