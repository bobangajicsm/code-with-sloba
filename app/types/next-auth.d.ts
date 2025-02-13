// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider: string;
      subscriptionStatus: string;
      points: number;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider: string;
    subscriptionStatus: string;
    points: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
    subscriptionStatus?: string;
    points?: number;
  }
}
