import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string;
      provider: string;
      subscriptionStatus: string;
      points: number;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    provider: string;
    subscriptionStatus: string;
    points: number;
  }
}
