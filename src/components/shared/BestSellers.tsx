"use client";
import { useState } from "react";
import type { ReactElement } from "react";
import { Prisma } from "@prisma/client";
import { PerfumeBox, PerfumeBoxSkeleton } from "@/components/shared";

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
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string): void => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Mas vendidos</h5>
        <p className="text-body cursor-pointer text-sm">Ver todos</p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PerfumeBoxSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {perfumes.slice(0, 6).map((perfume) => (
            <PerfumeBox
              key={perfume.id}
              perfume={perfume}
              liked={likedIds.has(perfume.id)}
              onLikeToggle={() => toggleLike(perfume.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
