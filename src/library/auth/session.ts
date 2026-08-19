import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/src/auth";

export const getSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});

export async function requireSession() {
  const session = await getSession();

  if (!session) redirect("/");

  return session;
}
