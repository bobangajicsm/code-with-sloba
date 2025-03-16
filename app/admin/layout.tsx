import AdminGuard from "@/app/guards/admin-guard";
import Link from "next/link";
import styles from "./layout.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className={styles.adminLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Admin Panel</h2>
          </div>
          <nav className={styles.sidebarNav}>
            <Link href="/admin" className={styles.navItem}>
              Posts
            </Link>
            <Link href="/admin/comments" className={styles.navItem}>
              Comments
            </Link>
          </nav>
        </aside>
        <main className={styles.content}>{children}</main>
      </div>
    </AdminGuard>
  );
}
