import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/src/auth";
import {
  type SavedTracksPage,
  SavedTracksPageSchema,
  toTrack,
} from "@/src/library/spotify/schema";

const SAVED_TRACKS_URL = "https://api.spotify.com/v1/me/tracks";

// `limit` is capped at 50 by the Web API; fall back to defaults on junk input.
const ParamsSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).catch(50),
  offset: z.coerce.number().int().min(0).catch(0),
});

export async function GET(request: NextRequest) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  let accessToken: string;

  try {
    const accounts = await auth.api.listUserAccounts({
      headers: requestHeaders,
    });
    const spotifyAccount = accounts.find(
      (account) => account.providerId === "spotify",
    );

    if (!spotifyAccount) throw new Error("No linked Spotify account.");

    // Refreshes the token in place when it has expired.
    const token = await auth.api.getAccessToken({
      body: { accountId: spotifyAccount.id },
      headers: requestHeaders,
    });

    accessToken = token.accessToken;
  } catch {
    return Response.json(
      { error: "Reconnect your Spotify account." },
      { status: 401 },
    );
  }

  const { limit, offset } = ParamsSchema.parse({
    limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    offset: request.nextUrl.searchParams.get("offset") ?? undefined,
  });

  const query = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const response = await fetch(`${SAVED_TRACKS_URL}?${query}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    return Response.json(
      { error: `Spotify returned ${response.status}.` },
      { status: response.status === 401 ? 401 : 502 },
    );
  }

  const page = SavedTracksPageSchema.parse(await response.json());

  const body: SavedTracksPage = {
    tracks: page.items.map(toTrack),
    nextOffset: page.next ? page.offset + page.limit : null,
    total: page.total,
  };

  return Response.json(body);
}
