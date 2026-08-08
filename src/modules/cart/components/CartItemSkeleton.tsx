"use client";
import type { ReactElement } from "react";

interface CartItemSkeletonProps {
  count?: number;
}

export const CartItemSkeleton = ({ count = 3 }: CartItemSkeletonProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex w-full items-center gap-5 h-24">
          <div className="relative flex h-24 w-24 border border-stroke bg-surface animate-pulse shrink-0 items-center justify-center overflow-hidden rounded-2xl p-3" />
          <div className="flex h-full w-full min-w-0 flex-col justify-between">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="relative h-5 w-40 overflow-hidden bg-surface animate-pulse rounded-md" />
                <div className="relative h-5 w-20 overflow-hidden bg-surface animate-pulse rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
