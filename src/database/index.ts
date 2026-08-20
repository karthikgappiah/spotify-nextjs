import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../library/env/server";
import { relations } from "./relations";

export const db = drizzle(env.DATABASE_URL, { relations });
