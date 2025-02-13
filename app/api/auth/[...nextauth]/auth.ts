// app/api/auth/[...nextauth]/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Add token parameter
      if (session?.user) {
        session.user = {
          ...session.user,
          id: token.sub as string, // Use token.sub instead of user.id
          subscriptionStatus: "free", // Set default or fetch from DB
          points: 0, // Set default or fetch from DB
          provider: "google", // Set default or fetch from DB
        };
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!account || !profile) return false;

      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true },
        });

        if (existingUser) {
          // If user exists but has no account, link the account
          if (existingUser.accounts.length === 0) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
            return true;
          }

          // Check if this OAuth account is already linked
          const linkedAccount = existingUser.accounts.find(
            (acc) => acc.provider === account.provider
          );

          if (linkedAccount) {
            return true; // Account is already linked, proceed with sign in
          }

          // If user exists with different provider, deny access
          return false; // This will redirect to error page
        }

        // Create new user if they don't exist
        const newUser = await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            avatarUrl: user.image,
            provider: account.provider,
            subscriptionStatus: "free",
            points: 0,
          },
        });

        // Create the account link

        await prisma.account.create({
          data: {
            userId: newUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
          },
        });

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
