import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  /** JWT sessions so Edge middleware can validate via `getToken` (database cookies are opaque). */
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from:
        process.env.EMAIL_FROM ?? "NextAuth <no-reply@localhost>",
        sendVerificationRequest: async ({ identifier, url }) => {
          console.log(`Magic link for ${identifier}: ${url}`);
        },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
