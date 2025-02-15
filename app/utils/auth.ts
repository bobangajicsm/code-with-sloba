// utils/auth.ts
export const isAdmin = (email: string) => {
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  return adminEmails.includes(email);
};
