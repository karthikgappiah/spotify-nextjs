import { defineConfig } from "drizzle-kit";
import { env } from "./src/library/env/server";

export default defineConfig({
  out: "./src/database/migrations",
  schema: "./src/database/models/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL as string,
  },
  introspect: {
    casing: "preserve",
  },
  verbose: true,
  // BUG: pnpm db:push does not ask for verification even if strict.
  strict: true,
});
