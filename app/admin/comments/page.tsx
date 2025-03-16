"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  postId: string;
  userId: string;
  isRead: boolean;
  user: User;
  post: Post;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/comments");

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/read`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, isRead: true } : comment
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const markAsUnread = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/unread`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, isRead: false } : comment
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const filteredComments = comments.filter((comment) => {
    if (filter === "all") return true;
    if (filter === "unread") return !comment.isRead;
    if (filter === "read") return comment.isRead;
    return true;
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading comments...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Comments</h1>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.active : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "unread" ? styles.active : ""
          }`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "read" ? styles.active : ""
          }`}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
      </div>

      {filteredComments.length === 0 ? (
        <p className={styles.noComments}>No comments found.</p>
      ) : (
        <div className={styles.commentsContainer}>
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`${styles.commentCard} ${
                comment.isRead ? styles.read : styles.unread
              }`}
            >
              <div className={styles.commentHeader}>
                <div className={styles.userInfo}>
                  {comment.user.avatarUrl ? (
                    <Image
                      width={60}
                      height={60}
                      src={comment.user.avatarUrl}
                      alt={comment.user.name}
                      className={styles.avatar}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {comment.user.name.charAt(0)}
                    </div>
                  )}
                  <span className={styles.userName}>{comment.user.name}</span>
                </div>
                <span className={styles.time}>
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div className={styles.commentBody}>
                <p className={styles.commentText}>{comment.text}</p>
              </div>

              <div className={styles.commentFooter}>
                <Link
                  href={`/post/${comment.post.slug}`}
                  className={styles.postLink}
                >
                  Post: {comment.post.title}
                </Link>

                <div className={styles.actions}>
                  {comment.isRead ? (
                    <button
                      className={styles.markButton}
                      onClick={() => markAsUnread(comment.id)}
                    >
                      Mark as Unread
                    </button>
                  ) : (
                    <button
                      className={styles.markButton}
                      onClick={() => markAsRead(comment.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
