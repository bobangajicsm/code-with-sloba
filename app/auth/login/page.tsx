"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <h1>Sign in to your account</h1>
      <p>Don&apos;t have an account? Sign up for free</p>
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Continue with Google
      </button>

      <p>
        By proceeding, you agree to CodeWithSloba&apos;s{" "}
        <Link href={""}>Terms of Service</Link> and{" "}
        <Link href={""}>Privacy Policy</Link>.
      </p>
    </div>
  );
}
