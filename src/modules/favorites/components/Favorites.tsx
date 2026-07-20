"use client";
import type { ReactElement } from "react";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import { PerfumeGrid } from "@/modules/perfumes/components/PerfumeGrid";
import { EmptyState } from "@/modules/perfumes/components/EmptyState";

export const Favorites = (): ReactElement => {
  const { perfumes, ids, toggle, ready } = useFavorites();

  if (!ready) {
    return (
      <div className="flex flex-col gap-6 p-5 pb-25">
        <div className="flex items-start flex-col gap-1">
          <h5 className="text-lg font-semibold text-white">Favoritos</h5>
          <p className="text-body text-sm">
            Tu coleccion especial de perfumes exclusivos
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface animate-pulse h-45 w-full rounded-2xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-5 pb-25">
      <div className="flex items-start flex-col gap-1">
        <h5 className="text-lg font-semibold text-white">Favoritos</h5>
        <p className="text-body text-sm">
          Tu coleccion especial de perfumes exclusivos
        </p>
      </div>

      {ids.length === 0 && (
        <EmptyState
          title="No tienes favoritos"
          subtitle="Los perfumes que marques como favoritos aparecerán aquí."
          showClear={false}
        />
      )}

      {ids.length > 0 && (
        <PerfumeGrid
          perfumes={perfumes}
          isLoading={false}
          likedIds={new Set(ids)}
          onLikeToggle={toggle}
        />
      )}
    </div>
  );
};