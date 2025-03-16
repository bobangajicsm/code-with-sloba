"use client";

import React, { useState, useEffect } from "react";
import styles from "./admin-post-table.module.scss";
import { Edit, Trash2, Eye } from "lucide-react";
import { fetchPosts } from "@/app/posts/[category]/actions";
import { Category, Post } from "@prisma/client";

interface PostWithCategory extends Post {
  category: Category | null;
}

const AdminPostsTable: React.FC = () => {
  const [posts, setPosts] = useState<PostWithCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 10;

  const loadPosts = async (search: string = "", reset: boolean = false) => {
    try {
      setIsLoading(true);
      const result = await fetchPosts(
        undefined, // category
        sort, // sort order
        difficultyFilter || undefined, // difficulty
        search, // search term
        reset ? 0 : skip, // skip
        status === "published" ? true : status === "draft" ? false : undefined,
        POSTS_PER_PAGE // Add limit parameter (you'll need to update fetchPosts)
      );

      if (result) {
        const newPosts = result.posts as PostWithCategory[];
        setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
        setHasMore(newPosts.length === POSTS_PER_PAGE);
        if (!reset) setSkip((prev) => prev + POSTS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadPosts("", true);
  }, [sort, status, difficultyFilter]);

  // Search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadPosts(searchTerm, true);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const onDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete post");
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const onEdit = (id: string) => {
    window.location.href = `/admin/posts/edit/${id}`;
  };

  const onView = (slug: string) => {
    window.open(`/post/${slug}`, "_blank");
  };

  const onAdd = () => {
    window.location.href = "/admin/new-post";
  };

  const handleLoadMore = () => {
    loadPosts(searchTerm);
  };

  // Filter posts by status locally since fetchPosts might not handle this

  if (isLoading && skip === 0) {
    return <div className={styles.loading}>Loading posts...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Posts Management</h2>
        <button className={styles.addButton} onClick={onAdd}>
          Add New Post
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label>Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className={styles.select}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "all" | "published" | "draft")
            }
            className={styles.select}
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Difficulty:</label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts by title or content..."
            className={styles.searchInput}
          />
        </div>
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
            {posts.map((post, i) => (
              <tr key={`${post.id}-${i}`}>
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
        {posts.length === 0 && (
          <div className={styles.noResults}>No posts found</div>
        )}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPostsTable;
