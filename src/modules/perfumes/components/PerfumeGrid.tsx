"use client";

import type { ReactElement, ReactNode } from "react";
import { Prisma } from "@prisma/client";
import { EmptyState } from "@/modules/shared/components";
import { cn } from "@/modules/shared/utils/cn";
import { PerfumeBox, PerfumeBoxSkeleton } from "./perfume-box";

type GridPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface PerfumeGridProps {
  perfumes: GridPerfume[];
  isLoading: boolean;
  likedIds?: Set<string>;
  onLikeToggle?: (id: string) => void;
  perfumeBadge?: string;
  limit?: number;
  emptyState?: ReactNode | null;
  className?: string;
}

export const PerfumeGrid = ({
  perfumes,
  isLoading,
  likedIds,
  onLikeToggle,
  perfumeBadge,
  limit,
  emptyState,
  className,
}: PerfumeGridProps): ReactElement => {
  const visiblePerfumes = limit ? perfumes.slice(0, limit) : perfumes;

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 gap-5", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <PerfumeBoxSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (visiblePerfumes.length === 0) {
    if (emptyState === null) return <></>;
    if (emptyState !== undefined) return <>{emptyState}</>;
    return <EmptyState />;
  }

  return (
    <div className={cn("grid grid-cols-2 gap-5", className)}>
      {visiblePerfumes.map((perfume) => (
        <PerfumeBox
          key={perfume.id}
          perfume={perfume}
          liked={likedIds?.has(perfume.id) ?? false}
          onLikeToggle={() => onLikeToggle?.(perfume.id)}
          perfumeBadge={perfumeBadge}
        />
      ))}
    </div>
  );
};
