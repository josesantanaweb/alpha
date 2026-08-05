"use client";
import { useEffect, useState, type ReactElement } from "react";
import type { PerfumeWithRelations } from "../types";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { TopBar } from "@/modules/shared/components/layout";
import { Rating } from "@/modules/shared/components/Rating";
import { Accords } from "./Accords";
import { AboutPerfume } from "./AboutPerfume";
import { Notes } from "./Notes";
import { PerfumeImage } from "./PerfumeImage";
import { Experience } from "./Experience";
import { Similar } from "./Similar";
import { useFavorites } from "@/modules/favorites/hooks/use-favorites";
import { SizeSelector } from "./SizeSelector";
import { getGenderLabel } from "@/modules/shared/utils/gender";
import { formatPrice } from "@/modules/shared/utils/format-price";
import { usePerfumes } from "../hooks/use-perfume-query";
import { AddToCart } from "@/modules/shared/components";
import { toCartProduct } from "@/modules/cart/utils";
import { BOTTLE_ML } from "@/constants";

interface PerfumeProps {
  perfume: PerfumeWithRelations;
}

export const Perfume = ({ perfume }: PerfumeProps): ReactElement => {
  const { setHideHeader, setHideBottomNav } = useApp();
  const { data: perfumes = [], isLoading } = usePerfumes({ limit: 50 });
  const { ids: likedIds, toggle: toggleLike } = useFavorites();
  const [selectedMl, setSelectedMl] = useState(BOTTLE_ML);

  const selectedDecant =
    perfume.decants?.find((decant) => decant.ml === selectedMl) ?? null;
  const displayPrice = selectedDecant ? Number(selectedDecant.price) : perfume.price;

  useEffect(() => {
    setHideHeader(true);
    setHideBottomNav(true);
    return () => {
      setHideHeader(false);
      setHideBottomNav(false);
    };
  }, [setHideHeader, setHideBottomNav]);

  return (
    <div className="mb-40 flex w-full flex-col gap-4 p-5">
      <TopBar />

      <div className="relative mb-6 flex w-full items-center justify-center">
        <div className="absolute top-1/2 left-1/2 h-45 w-45 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/40 blur-[30px]" />
        <PerfumeImage src={perfume.image} alt={perfume.name} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white">{perfume.name}</h1>
        <div className="flex items-center gap-4">
          <p className="text-body text-sm italic">{perfume.designer.name}</p>
          <p className="text-sm text-white">{getGenderLabel(perfume.gender)}</p>
          <Rating rating={Number(perfume.rating)} />
        </div>
        <h4 className="text-2xl font-bold text-white">
          {formatPrice(displayPrice)}
        </h4>
      </div>

      <SizeSelector
        perfume={perfume}
        value={selectedMl}
        onChange={setSelectedMl}
      />

      <div>
        {perfume.description && (
          <AboutPerfume description={perfume.description} />
        )}

        <Accords accords={perfume.accords} />

        <Notes notes={perfume.notes} />
        <Experience
          perfumeId={perfume.id}
          season={perfume.season}
          timeOfDay={perfume.timeOfDay}
          longevity={perfume.longevity}
          feeling={perfume.feeling}
          sillage={perfume.sillage}
          projection={perfume.projection}
        />
      </div>
      <Similar
        perfumes={perfumes}
        isLoading={isLoading}
        likedIds={new Set(likedIds)}
        onLikeToggle={toggleLike}
      />

      <AddToCart
        perfumeId={perfume.id}
        perfume={toCartProduct(perfume, selectedDecant)}
      />
    </div>
  );
};
