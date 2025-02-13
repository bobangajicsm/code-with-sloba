"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons() {
  const { data: session } = useSession();

  console.log(session);
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.name}!</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </Link>
    </div>
  );
}
