"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { PerfumeGrid } from "./PerfumeGrid";

type BestSellerPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface BestSellersProps {
  perfumes: BestSellerPerfume[];
  isLoading: boolean;
  likedIds?: Set<string>;
  onLikeToggle?: (id: string) => void;
}

export const BestSellers = ({
  perfumes,
  isLoading,
  likedIds,
  onLikeToggle,
}: BestSellersProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Mas vendidos</h5>
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
