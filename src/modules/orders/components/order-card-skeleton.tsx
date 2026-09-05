import type { ReactElement } from "react";

interface OrderCardSkeletonProps {
  count?: number;
}

export const OrderCardSkeleton = ({
  count = 2,
}: OrderCardSkeletonProps): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border-stroke bg-surface flex flex-col overflow-hidden rounded-xl border"
        >
          <div className="border-stroke flex items-center justify-between border-b px-4 py-3">
            <div className="flex flex-col gap-2">
              <div className="skeleton-shimmer h-4 w-28 rounded" />
              <div className="skeleton-shimmer h-3 w-24 rounded" />
            </div>
            <div className="skeleton-shimmer h-6 w-20 rounded-full" />
          </div>

          <div className="border-stroke flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="skeleton-shimmer h-18 w-18 rounded-xl" />
              <div className="flex flex-col gap-2">
                <div className="skeleton-shimmer h-4 w-24 rounded" />
                <div className="skeleton-shimmer h-3 w-16 rounded" />
                <div className="skeleton-shimmer h-3 w-12 rounded" />
              </div>
            </div>
            <div className="skeleton-shimmer h-4 w-14 rounded" />
          </div>

          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="skeleton-shimmer h-4 w-14 rounded" />
                <div className="skeleton-shimmer h-3 w-20 rounded" />
              </div>
              <div className="skeleton-shimmer h-5 w-16 rounded" />
            </div>
            <div className="flex w-full gap-3">
              <div className="skeleton-shimmer h-10 flex-1 rounded-lg" />
              <div className="skeleton-shimmer h-10 flex-1 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
