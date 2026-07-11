"use client";
import type { ReactElement } from "react";
import { Prisma } from "@prisma/client";
import { PerfumeBox, PerfumeBoxSkeleton } from "@/components/shared";

type NewPerfume = Prisma.PerfumeGetPayload<{ include: { designer: true } }>;

interface NewPerfumesProps {
  perfumes: NewPerfume[];
  likedIds: Set<string>;
  onLikeToggle: (id: string) => void;
  isLoading: boolean;
}

export const NewPerfumes = ({
  perfumes,
  likedIds,
  onLikeToggle,
  isLoading,
}: NewPerfumesProps): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Novedades</h5>
        <p className="text-body cursor-pointer text-sm">Ver todos</p>
      </div>

      {isLoading && (
        <div className="flex max-w-full gap-5 overflow-x-scroll pr-2.5">
          {Array.from({ length: 6 }).map((_, index) => (
            <PerfumeBoxSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && perfumes.length > 0 && (
        <div className="flex max-w-full gap-5 overflow-x-scroll pr-2.5">
          {perfumes.slice(0, 6).map((perfume) => (
            <PerfumeBox
              className="min-w-45"
              key={perfume.id}
              perfume={perfume}
              liked={likedIds.has(perfume.id)}
              onLikeToggle={() => onLikeToggle(perfume.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
