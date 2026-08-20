"use client";

import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import type { ReactTable, RowData } from "@tanstack/react-table";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import type { DataTableFeatures } from "./data-table-features";

export function DataTableViewOptions<TData extends RowData>({
  table,
}: {
  table: ReactTable<DataTableFeatures, TData>;
}) {
  const hideableColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  return (
    <DropdownMenuTrigger>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
      >
        <SlidersHorizontalIcon />
        View
      </Button>
      <DropdownMenu
        placement="bottom end"
        className="w-37.5"
        selectionMode="multiple"
        selectedKeys={
          new Set(
            hideableColumns
              .filter((column) => column.getIsVisible())
              .map((column) => column.id),
          )
        }
        onSelectionChange={(keys) => {
          for (const column of hideableColumns) {
            column.toggleVisibility(keys === "all" || keys.has(column.id));
          }
        }}
      >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {hideableColumns.map((column) => (
          <DropdownMenuItem
            key={column.id}
            id={column.id}
            className="capitalize"
          >
            {column.id}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}
