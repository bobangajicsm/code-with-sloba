import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      subscriptionStatus: string;
      points: number;
    } & DefaultSession["user"];
  }

  interface User {
    provider: string;
    subscriptionStatus: string;
    points: number;
  }
}
