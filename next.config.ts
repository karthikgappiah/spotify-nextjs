import type { NextConfig } from "next";
import { env } from "@/src/library/env/server";

const config: NextConfig = {
  // WARN: The OAuth state cookie is host-scoped, so a flow started on `localhost`
  // never reaches the `127.0.0.1` callback Spotify requires. Keep both on one host.
  redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "localhost" }],
        destination: `${env.BETTER_AUTH_URL}/:path*`,
        permanent: false,
      },
    ];
  },
};

export default config;
