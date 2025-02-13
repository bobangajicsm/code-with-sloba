"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>

      <p>
        Don&rsquo;t have account?{" "}
        <Link
          href="/auth/signup"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
