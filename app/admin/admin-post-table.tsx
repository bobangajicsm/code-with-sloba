import React from "react";
import styles from "./admin-post-table.module.scss";
import { Edit, Trash2, Eye } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  createdAt: string;
  images: string[];
  published: boolean;
  updatedAt: string;
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: {
    id: string;
    name: string;
  };
  User?: {
    name: string;
    email: string;
  };
}

interface AdminPostsTableProps {
  posts: Post[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (slug: string) => void;
  onAdd: () => void;
}

const AdminPostsTable: React.FC<AdminPostsTableProps> = ({
  posts,
  onDelete,
  onEdit,
  onView,
  onAdd,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Posts Management</h2>
        <button className={styles.addButton} onClick={() => onAdd()}>
          Add New Post
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <div className={styles.titleCell}>
                    {post.images?.[0] && (
                      <div
                        className={styles.thumbnail}
                        style={{ backgroundImage: `url(${post.images[0]})` }}
                      />
                    )}
                    <span>{post.title}</span>
                  </div>
                </td>
                <td>{post.category?.name}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      post.published ? styles.published : styles.draft
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>{formatDate(post.createdAt)}</td>
                <td>{formatDate(post.updatedAt)}</td>
                <td>
                  <span
                    className={`${styles.difficulty} ${
                      styles[post.difficulty?.toLowerCase() || ""]
                    }`}
                  >
                    {post.difficulty}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => onView(post.slug)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => onEdit(post.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.delete}`}
                      onClick={() => onDelete(post.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPostsTable;
