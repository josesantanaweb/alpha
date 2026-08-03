"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { PerfumeGrid } from "./PerfumeGrid";

type SimilarPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface SimilarProps {
  perfumes: SimilarPerfume[];
  isLoading: boolean;
  likedIds?: Set<string>;
  onLikeToggle?: (id: string) => void;
}

export const Similar = ({
  perfumes,
  isLoading,
  likedIds,
  onLikeToggle,
}: SimilarProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Similares</h5>
        <Link href="/explorer" className="text-body cursor-pointer text-sm">
          Ver todos
        </Link>
      </div>
      <PerfumeGrid
        perfumes={perfumes}
        isLoading={isLoading}
        likedIds={likedIds}
        onLikeToggle={onLikeToggle}
        perfumeBadge="Tendencia"
        limit={6}
        emptyState={null}
      />
    </div>
  );
};
