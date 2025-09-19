"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePaginationStore } from "@/lib/store/useProductPaginationStore";

type ProductsPaginationProps = {
  totalCount: number;
  loading?: boolean;
};

export const ProductsPagination = ({
  totalCount,
  loading,
}: ProductsPaginationProps) => {
  const {
    pageIndex,
    limit,
    setPageIndex,
    setLimit,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
  } = usePaginationStore();

  const pageCount = Math.ceil(totalCount / limit);
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  return (
    <div className="flex flex-col items-center justify-between py-2 md:flex-row">
      <div className="flex flex-col md:flex-row items-center space-x-6 lg:space-x-8">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </label>
          <select
            id="rows-per-page"
            className="h-8 rounded border border-gray-300"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[10, 15, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination controls */}
        <nav
          role="navigation"
          aria-label="Pagination navigation"
          className="flex items-center space-x-2"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={firstPage}
            disabled={!canPreviousPage}
            aria-label="Go to first page"
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={!canPreviousPage}
            aria-label="Go to previous page"
          >
            <ChevronLeft />
          </Button>

          <span className="flex items-center space-x-1">
            <span>Page {pageIndex + 1} of</span>
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <span>{pageCount || 1}</span>
            )}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={!canNextPage}
            aria-label="Go to next page"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => lastPage(totalCount)}
            disabled={!canNextPage}
            aria-label="Go to last page"
          >
            <ChevronsRight />
          </Button>
        </nav>
      </div>
    </div>
  );
};
