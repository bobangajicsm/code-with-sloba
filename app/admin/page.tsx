"use client";

import { useEffect, useState } from "react";
import AdminPostsTable from "./admin-post-table";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

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

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      toast.success("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = (postId: string) => {
    router.push(`/admin/posts/edit/${postId}`);
  };
  const handleAdd = () => {
    router.push("/admin/new-post");
  };

  const handleView = (slug: string) => {
    router.push(`/post/${slug}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <Toaster
        toastOptions={{
          style: {
            padding: 10,
          },
        }}
      />
      <AdminPostsTable
        posts={posts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        onAdd={handleAdd}
      />
    </div>
  );
}
