// app/auth/error/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Authentication Error</h1>

      {error === "OAuthAccountNotLinked" && (
        <div className="text-center">
          <p className="text-red-500 mb-4">
            An account with this email already exists with a different sign-in
            method. Please sign in with the same method you used previously.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      )}

      {error === "AccessDenied" && (
        <p className="text-red-500">
          Access denied. You don't have permission to sign in.
        </p>
      )}

      {!error && (
        <p className="text-red-500">
          An unknown error occurred. Please try again.
        </p>
      )}

      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
