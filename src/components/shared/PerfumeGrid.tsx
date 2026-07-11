"use client";
import type { ReactElement } from "react";
import { Prisma } from "@prisma/client";
import { PerfumeBox, PerfumeBoxSkeleton } from "@/components/shared";

type GridPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true; category: true };
}>;

interface PerfumeGridProps {
  perfumes: GridPerfume[];
  isLoading: boolean;
  likedIds?: Set<string>;
  onLikeToggle?: (id: string) => void;
}

export const PerfumeGrid = ({
  perfumes,
  isLoading,
  likedIds,
  onLikeToggle,
}: PerfumeGridProps): ReactElement => {
  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <PerfumeBoxSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && perfumes.length === 0 && (
        <p className="text-body text-sm">No se encontraron perfumes.</p>
      )}

      {!isLoading && perfumes.length > 0 && (
        <div className="grid grid-cols-2 gap-5">
          {perfumes.map((perfume) => (
            <PerfumeBox
              key={perfume.id}
              perfume={perfume}
              liked={likedIds?.has(perfume.id) ?? false}
              onLikeToggle={() => onLikeToggle?.(perfume.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};
