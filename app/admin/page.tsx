"use client";

import AdminPostsTable from "./admin-post-table";
import styles from "./page.module.scss";

export default function AdminPostsPage() {
  return (
    <div className={styles.adminContainer}>
      <AdminPostsTable />
    </div>
  );
}
