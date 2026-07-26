"use client";
import { useEffect, type ReactElement } from "react";
import { TopBar } from "@/modules/shared/components/layout";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import { PerfumeGrid } from "@/modules/perfumes/components/PerfumeGrid";
import { EmptyState } from "@/modules/perfumes/components/EmptyState";
import { useApp } from "@/modules/shared/stores/use-ui-store";

export const Favorites = (): ReactElement => {
  const { perfumes, ids, toggle, isLoading } = useFavorites();
  const { setHideHeader } = useApp();

  useEffect(() => {
    setHideHeader(true);
    return () => {
      setHideHeader(false);
    };
  }, [setHideHeader]);

  return (
    <div className="flex w-full flex-col gap-4 p-5 pb-25">
      <TopBar title="Favoritos" />
      <div className="mt-2">
        <PerfumeGrid
          perfumes={perfumes}
          isLoading={isLoading}
          likedIds={new Set(ids)}
          onLikeToggle={toggle}
          emptyState={
            <EmptyState
              title="No tienes favoritos"
              subtitle="Los perfumes que marques como favoritos aparecerán aquí."
              showClear={false}
            />
          }
        />
      </div>
    </div>
  );
};
