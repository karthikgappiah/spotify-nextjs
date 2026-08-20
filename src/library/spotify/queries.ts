import { infiniteQueryOptions } from "@tanstack/react-query";
import type { SavedTracksPage } from "@/src/library/spotify/schema";

const PAGE_SIZE = 50;

async function fetchSavedTracks(
  offset: number,
  signal: AbortSignal,
): Promise<SavedTracksPage> {
  const query = new URLSearchParams({
    limit: PAGE_SIZE.toString(),
    offset: offset.toString(),
  });

  const response = await fetch(`/api/spotify/saved-tracks?${query}`, {
    signal,
  });

  if (!response.ok) {
    const { error } = await response
      .json()
      .catch(() => ({ error: "Something went wrong." }));

    throw new Error(error);
  }

  return response.json();
}

export const savedTracksQueryOptions = infiniteQueryOptions({
  queryKey: ["spotify", "saved-tracks"],
  queryFn: ({ pageParam, signal }) => fetchSavedTracks(pageParam, signal),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextOffset,
  // Saved tracks change rarely, so avoid refetching on every mount.
  staleTime: 5 * 60 * 1000,
});
