import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import type { ReactTable, RowData } from "@tanstack/react-table";

import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import type { DataTableFeatures } from "./data-table-features";

interface DataTablePaginationControlsProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
}

export function DataTablePaginationControls<TData extends RowData>({
  table,
}: DataTablePaginationControlsProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-sm">Rows per page</p>
          <Select
            value={`${table.state.pagination.pageSize}`}
            onChange={(key) => {
              table.setPageSize(Number(key));
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent placement="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} id={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-25 items-center justify-center font-medium text-sm">
          Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <CaretDoubleLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <CaretLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <CaretRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <CaretDoubleRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
