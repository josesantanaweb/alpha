"use client";
import { useEffect, type ReactElement } from "react";
import { TopBar } from "@/modules/shared/components/layout";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import { PerfumeGrid } from "@/modules/perfumes/components/PerfumeGrid";
import { EmptyState } from "@/modules/perfumes/components/EmptyState";
import { useApp } from "@/modules/shared/stores/use-ui-store";

export const Favorites = (): ReactElement => {
  const { perfumes, ids, toggle } = useFavorites();
  const { setHideHeader } = useApp();

  useEffect(() => {
    setHideHeader(true);
    return () => {
      setHideHeader(false);
    };
  }, [setHideHeader]);
  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <TopBar title="Favoritos" />

      {ids.length === 0 && (
        <EmptyState
          title="No tienes favoritos"
          subtitle="Los perfumes que marques como favoritos aparecerán aquí."
          showClear={false}
        />
      )}

      {ids.length > 0 && (
        <div className="mt-6">
          <PerfumeGrid
            perfumes={perfumes}
            isLoading={false}
            likedIds={new Set(ids)}
            onLikeToggle={toggle}
          />
        </div>
      )}
    </div>
  );
};
