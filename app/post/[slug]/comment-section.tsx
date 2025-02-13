"use client";
import { useState } from "react";
import styles from "./comments-section.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
}

export default function CommentsSection({
  postId,
  comments,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ postId, text: newComment }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      setCommentList([data, ...commentList]);
      setNewComment("");
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h3 className={styles.title}>Comments</h3>

      {session ? (
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <textarea
            className={styles.commentInput}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
          />
          <button type="submit" className={styles.submitButton}>
            Post Comment
          </button>
        </form>
      ) : (
        <p className={styles.loginMessage}>
          Please <a href="/login">login</a> to leave a comment.
        </p>
      )}

      <div className={styles.commentList}>
        {commentList.length === 0 ? (
          <p className={styles.noComments}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          commentList.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <Image
                width={40}
                height={40}
                src={comment.user.avatarUrl || "/default-avatar.png"}
                alt={comment.user.name}
                className={styles.avatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.userName}>{comment.user.name}</span>
                  <small className={styles.timestamp}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
