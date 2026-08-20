import { z } from "zod";

// Same as the row shape that the liked music table renders.
export const TrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  album: z.string(),
  artist: z.string(),
  added_at: z.iso.datetime(),
});

export type Track = z.infer<typeof TrackSchema>;

// Subset of `SavedTrackObject` from GET /v1/me/tracks that the table needs.
const SavedTrackSchema = z.object({
  added_at: z.iso.datetime(),
  track: z.object({
    id: z.string(),
    name: z.string(),
    album: z.object({ name: z.string() }),
    artists: z.array(z.object({ name: z.string() })),
  }),
});

// Spotify's paging envelope. `next` is null on the final page.
export const SavedTracksPageSchema = z.object({
  items: z.array(SavedTrackSchema),
  limit: z.number().int(),
  next: z.string().nullable(),
  offset: z.number().int(),
  total: z.number().int(),
});

// What our route handler hands back — Spotify's envelope flattened into table rows.
export type SavedTracksPage = {
  tracks: Track[];
  nextOffset: number | null;
  total: number;
};

export function toTrack(saved: z.infer<typeof SavedTrackSchema>): Track {
  return {
    id: saved.track.id,
    name: saved.track.name,
    album: saved.track.album.name,
    artist: saved.track.artists.map((artist) => artist.name).join(", "),
    added_at: saved.added_at,
  };
}
