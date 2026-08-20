import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { account, session, user, verification } from "@/src/database/models";
import { env } from "@/src/library/env/server";
import { db } from "./database";

const spotify_scopes = ["user-read-private", "user-library-read"];

export const auth = betterAuth({
  appName: "Spotify",
  socialProviders: {
    spotify: {
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      scope: spotify_scopes,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg", // Database Options: "pg", "mysql", "sqlite".
    schema: { user, session, account, verification },
  }),
  account: {
    encryptOAuthTokens: true,
  },
  plugins: [nextCookies()], // WARN: nextCookies must stay last to reach every `Set-Cookie`.
});
