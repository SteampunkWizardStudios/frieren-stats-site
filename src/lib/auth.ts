import prisma from "@/prismaClient";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    async signIn({ profile }) {
      if (profile && profile.id) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: profile.id,
          },
        });

        if (!dbUser && profile.id) {
          await prisma.user.create({
            data: {
              id: profile.id,
              username: profile.username as string,
              name: profile.global_name as string,
              avatar: profile.image_url as string,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.discordId = profile.id; // Discord Snowflake ID
        token.discordUsername = profile.username; // Discord username
        token.discordDisplayName = profile.global_name;
        token.discordAvatar = profile.image_url;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.discordUsername as string;
        session.user.id = token.discordId as string;
        session.user.avatar = token.discordAvatar as string;
        session.user.displayName = token.discordDisplayName as string;
      }
      return session;
    },
  },
});
