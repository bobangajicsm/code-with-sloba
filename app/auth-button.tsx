"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }

  return <Link href="/auth/login">Login</Link>;
}
