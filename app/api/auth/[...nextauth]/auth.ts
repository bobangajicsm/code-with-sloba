// app/api/auth/[...nextauth]/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Type assertion to avoid conflicts
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.subscriptionStatus = (user as any).subscriptionStatus;
        session.user.points = (user as any).points;
        session.user.provider = (user as any).provider;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider) {
        // Update user with provider info
        await prisma.user.update({
          where: { id: user.id },
          data: { provider: account.provider },
        });
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
