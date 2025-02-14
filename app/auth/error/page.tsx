"use client";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Authentication Error</h1>

      <p className="text-red-500">
        An unknown error occurred. Please try again.
      </p>

      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
