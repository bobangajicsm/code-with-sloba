"use client";

import { useEffect, useState } from "react";
import AdminPostsTable from "./admin-post-table";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function AdminPostsPage() {
  const router = useRouter();

  const handleEdit = (postId: string) => {
    router.push(`/admin/posts/edit/${postId}`);
  };
  const handleAdd = () => {
    router.push("/admin/new-post");
  };

  const handleView = (slug: string) => {
    router.push(`/post/${slug}`);
  };

  return (
    <div className={styles.adminContainer}>
      <Toaster
        toastOptions={{
          style: {
            padding: 10,
          },
        }}
      />
      <AdminPostsTable />
    </div>
  );
}
