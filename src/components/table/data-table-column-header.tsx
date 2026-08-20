import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretUpDownIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react";
import type { Column, RowData } from "@tanstack/react-table";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/styles/utilities";

import type { DataTableFeatures } from "./data-table-features";

interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 data-open:bg-accent"
        >
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon />
          ) : (
            <CaretUpDownIcon />
          )}
        </Button>
        <DropdownMenu placement="bottom start">
          <DropdownMenuItem onAction={() => column.toggleSorting(false)}>
            <ArrowUpIcon />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onAction={() => column.toggleSorting(true)}>
            <ArrowDownIcon />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onAction={() => column.toggleVisibility(false)}>
            <EyeSlashIcon />
            Hide
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  );
}
