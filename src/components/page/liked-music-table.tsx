"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { columns } from "@/src/components/table/data-table-columns";
import { Button } from "@/src/components/ui/button";
import { DataTable } from "@/src/components/ui/data-table";
import { savedTracksQueryOptions } from "@/src/library/spotify/queries";

export function LikedMusicTable() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery(savedTracksQueryOptions);

  if (isPending) {
    return (
      <p className="text-muted-foreground text-sm">Loading saved tracks…</p>
    );
  }

  if (error) {
    return <p className="text-destructive text-sm">{error.message}</p>;
  }

  const tracks = data.pages.flatMap((page) => page.tracks);
  const total = data.pages[0].total;

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={tracks} />

      {hasNextPage ? (
        <div className="flex items-center justify-center gap-2">
          <p className="text-muted-foreground text-sm">
            Showing {tracks.length} of {total}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchNextPage()}
            isDisabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
