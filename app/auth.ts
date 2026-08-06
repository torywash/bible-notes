import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const ownerId = process.env.AUTH_GITHUB_OWNER_ID;

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!ownerId) return false;
      return String(profile?.id) === ownerId;
    },
    async jwt({ token, profile }) {
      if (profile) token.sub = String(profile.id);
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
