"use client";
import type { ReactElement, ReactNode } from "react";
import { Prisma } from "@prisma/client";
import { cn } from "@/modules/shared/utils/cn";
import { PerfumeBox, PerfumeBoxSkeleton } from "./perfume-box";
import { EmptyState } from "./EmptyState";

type GridPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface PerfumeGridProps {
  perfumes: GridPerfume[];
  isLoading: boolean;
  likedIds?: Set<string>;
  onLikeToggle?: (id: string) => void;
  /** Badge a mostrar en cada PerfumeBox */
  perfumeBadge?: string;
  /** Limitar perfumes mostrados */
  limit?: number;
  /** Custom empty state: undefined = default, null = ocultar, ReactNode = custom */
  emptyState?: ReactNode | null;
  /** className del contenedor */
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

  // Loading state — show skeletons
  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 gap-5", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <PerfumeBoxSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (visiblePerfumes.length === 0) {
    // null = no mostrar nada
    if (emptyState === null) return <></>;
    // custom ReactNode
    if (emptyState !== undefined) return <>{emptyState}</>;
    // default
    return <EmptyState />;
  }

  // Content
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
