import AdminGuard from "@/app/guards/admin-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="admin-layout">{children}</div>
    </AdminGuard>
  );
}
