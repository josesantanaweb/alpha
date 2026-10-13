"use client";

import type { ReactElement } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TablePaginationProps {
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (pageIndex: number) => void;
}

export const TablePagination = ({
  pageCount,
  pageIndex,
  pageOptions,
  canPreviousPage,
  canNextPage,
  onPrevious,
  onNext,
  onPageChange,
}: TablePaginationProps): ReactElement => {
  if (pageCount <= 1) return <></>;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={!canPreviousPage}
        onClick={onPrevious}
        aria-label="Página anterior"
        className="border-stroke bg-surface text-body flex h-9 w-9 cursor-pointer items-center justify-center rounded border transition-colors enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>
      {pageOptions.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === pageIndex}
          className={`flex h-9 w-9 items-center justify-center rounded text-sm font-semibold ${
            page === pageIndex
              ? "text-surface cursor-default bg-white"
              : "bg-surface text-body cursor-pointer hover:text-white"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        type="button"
        disabled={!canNextPage}
        onClick={onNext}
        aria-label="Página siguiente"
        className="border-stroke bg-surface text-body flex h-9 w-9 cursor-pointer items-center justify-center rounded border transition-colors enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};