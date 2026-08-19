import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/src/library/env/server";

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
  account: {
    encryptOAuthTokens: true,
  },
  plugins: [nextCookies()], // WARN: nextCookies must stay last to reach every `Set-Cookie`.
});
