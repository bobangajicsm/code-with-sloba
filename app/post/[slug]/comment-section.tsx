"use client";
import { useState } from "react";
import styles from "./comments-section.module.scss";
import { useSession } from "next-auth/react";

export default function CommentsSection({ postId, comments }) {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
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
    <div className={styles.commentsSection}>
      <h3>Comments</h3>
      {session ? (
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>
          Please <a href="/login">login</a> to leave a comment.
        </p>
      )}

      <div className={styles.commentList}>
        {commentList.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          commentList.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p>{comment.text}</p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
