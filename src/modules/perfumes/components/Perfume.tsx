"use client";
import { useEffect, type ReactElement } from "react";
import type { PerfumeWithRelations } from "../types";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { ArrowLeft, Share } from "lucide-react";
import { Rating } from "@/modules/shared/components/Rating";
import { Accords } from "./Accords";
import { AboutPerfume } from "./AboutPerfume";
import { Notes } from "./Notes";
import { PerfumeImage } from "./PerfumeImage";
import { Experience } from "./Experience";
import { SizeSelector } from "./SizeSelector";
import { getGenderLabel } from "@/modules/shared/utils/gender";
import { formatPrice } from "@/modules/shared/utils/format-price";

interface PerfumeProps {
  perfume: PerfumeWithRelations;
}

export const Perfume = ({ perfume }: PerfumeProps): ReactElement => {
  const { setHideHeader } = useApp();

  useEffect(() => {
    setHideHeader(true);
    return () => setHideHeader(false);
  }, [setHideHeader]);

  return (
    <div className="mb-40 flex w-full flex-col gap-4 p-5">
      <div className="flex w-full justify-between">
        <div className="cursor-pointer text-white">
          <ArrowLeft size={24} />
        </div>
        <div className="cursor-pointer text-white">
          <Share size={24} />
        </div>
      </div>

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
          {formatPrice(perfume.price)}
        </h4>
      </div>

      <SizeSelector />

      <div>
        {perfume.description && (
          <AboutPerfume description={perfume.description} />
        )}

        <Accords accords={perfume.accords} />

        <Notes />
        <Experience perfumeId={perfume.id} season={perfume.season} timeOfDay={perfume.timeOfDay} />
      </div>
    </div>
  );
};
