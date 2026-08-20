"use client";

import { DotsThreeIcon, PlayIcon } from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

import { TagTrackDialog } from "@/src/components/page/tag-track-dialog";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import type { Track } from "@/src/library/spotify/schema";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { DataTableFeatures } from "./data-table-features";

// Use `accessor` for data columns and `display` for columns without one.
const ColumnHelper = createColumnHelper<DataTableFeatures, Track>();

export const columns = ColumnHelper.columns([
  ColumnHelper.display({
    id: "select",
    header: () => <Checkbox slot="selection" />,
    cell: () => <Checkbox slot="selection" />,
    enableSorting: false,
    enableHiding: false,
  }),
  ColumnHelper.display({
    id: "play",
    cell: () => {
      return (
        <Button variant="ghost" size="icon-xs">
          <span className="sr-only">Play</span>
          <PlayIcon weight="duotone" />
        </Button>
      );
    },
  }),
  ColumnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  }),
  ColumnHelper.accessor("album", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Album" />
    ),
  }),
  ColumnHelper.accessor("artist", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artist" />
    ),
  }),
  ColumnHelper.accessor("added_at", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("added_at"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  }),
  ColumnHelper.display({
    id: "actions",
    cell: ({ row }) => <TrackActions track={row.original} />,
  }),
]);

function TrackActions({ track }: { track: Track }) {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon-xs">
          <span className="sr-only">Open menu</span>
          <DotsThreeIcon />
        </Button>
        <DropdownMenu>
          <DropdownMenuItem>Queue next</DropdownMenuItem>
          <DropdownMenuItem>Queue last</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onAction={() => setIsTagDialogOpen(true)}>
            Tag track
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>

      {/* Sits outside the menu so it survives the menu closing on action. */}
      <TagTrackDialog
        track={track}
        isOpen={isTagDialogOpen}
        onOpenChange={setIsTagDialogOpen}
      />
    </>
  );
}
