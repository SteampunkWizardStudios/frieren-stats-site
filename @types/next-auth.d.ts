import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      avatar: string;
      displayName: string;
    } & DefaultSession["user"];
  }
}
