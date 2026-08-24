"use client";

import type { ReactElement } from "react";

interface CartItemSkeletonProps {
  count?: number;
}

export const CartItemSkeleton = ({
  count = 3,
}: CartItemSkeletonProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex h-24 w-full items-center gap-5">
          <div className="border-stroke bg-surface relative flex h-24 w-24 shrink-0 animate-pulse items-center justify-center overflow-hidden rounded-2xl border p-3" />
          <div className="flex h-full w-full min-w-0 flex-col justify-between">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="bg-surface relative h-5 w-40 animate-pulse overflow-hidden rounded-md" />
                <div className="bg-surface relative h-5 w-20 animate-pulse overflow-hidden rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
