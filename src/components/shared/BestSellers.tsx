"use client";
import { useState } from "react";
import type { ReactElement } from "react";
import { PerfumeBox, PerfumeBoxSkeleton } from "@/components/shared";
import { usePerfumes } from "@/hooks";

export const BestSellers = (): ReactElement => {
  const { data: perfumes = [], isLoading } = usePerfumes({ limit: 50 });
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
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <PerfumeBoxSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {perfumes.map((perfume) => (
            <PerfumeBox
              key={perfume.id}
              name={perfume.name}
              price={perfume.price}
              rating={perfume.rating}
              discount={perfume.discount}
              image={perfume.image ?? "/images/placeholder.png"}
              liked={likedIds.has(perfume.id)}
              onLikeToggle={() => toggleLike(perfume.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
