"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { isAdmin } from "@/app/utils/auth";
import { useSession } from "next-auth/react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { data: session } = useSession();

  useEffect(() => {
    const checkAdmin = async () => {
      if (session !== undefined && !isAdmin(session?.user?.email || "")) {
        router.push("/auth/login");
      }
    };

    checkAdmin();
  }, [router, supabase, session]);

  return <>{children}</>;
}
