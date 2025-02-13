"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Create Account</h1>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
            redirect: true,
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign up with Google
      </button>

      <p>
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
