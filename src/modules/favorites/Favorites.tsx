"use client";
import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFavorites } from "@/hooks";
import { PerfumeGrid } from "@/components/shared";
import type { PerfumeWithRelations } from "@/modules/perfumes";

export const Favorites = (): ReactElement => {
  const { ids, toggle } = useFavorites();

  const { data: perfumes = [], isLoading } = useQuery<PerfumeWithRelations[]>({
    queryKey: ["favorites", ids],
    queryFn: async () => {
      if (!ids.length) return [];
      const res = await fetch("/api/perfumes/favoritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      return res.json();
    },
    enabled: ids.length > 0,
  });

  return (
    <div className="flex flex-col gap-6 p-5 pb-25">
      <div className="flex items-start flex-col gap-1">
        <h5 className="text-lg font-semibold text-white">Favoritos</h5>
        <p className="text-body text-sm">Tu coleccion especial de perfumes exclusivos</p>
      </div>

      {ids.length === 0 && (
        <p className="text-body mt-10 text-center text-sm">
          Aún no tienes favoritos.
        </p>
      )}

      {ids.length > 0 && (
        <PerfumeGrid
          perfumes={perfumes}
          isLoading={isLoading}
          likedIds={new Set(ids)}
          onLikeToggle={toggle}
        />
      )}
    </div>
  );
};
