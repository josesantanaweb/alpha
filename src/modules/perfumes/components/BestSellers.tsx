"use client";
import type { ReactElement } from "react";
import { Prisma } from "@prisma/client";
import { PerfumeBox, PerfumeBoxSkeleton } from "./perfume-box";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";

type BestSellerPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface BestSellersProps {
  perfumes: BestSellerPerfume[];
  isLoading: boolean;
}

export const BestSellers = ({
  perfumes,
  isLoading,
}: BestSellersProps): ReactElement => {
  const { ids: likedIds, toggle: toggleLike } = useFavorites();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Mas vendidos</h5>
        <p className="text-body cursor-pointer text-sm">Ver todos</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PerfumeBoxSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && perfumes.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
          {perfumes.slice(0, 6).map((perfume) => (
            <PerfumeBox
              key={perfume.id}
              perfume={perfume}
              liked={likedIds.includes(perfume.id)}
              onLikeToggle={() => toggleLike(perfume.id)}
              perfumeBadge="Tendencia"
            />
          ))}
        </div>
      )}
    </div>
  );
};
