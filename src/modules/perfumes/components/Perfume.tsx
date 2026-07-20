"use client";
import { useEffect, type ReactElement } from "react";
import type { PerfumeWithRelations } from "../types";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { ArrowLeft, Share } from "lucide-react";
import Image from "next/image";

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
    <div className="flex w-full flex-col gap-4 p-5">
      <div className="flex w-full justify-between">
        <div className="cursor-pointer text-white">
          <ArrowLeft size={24} />
        </div>
        <div className="cursor-pointer text-white">
          <Share size={24} />
        </div>
      </div>

      <div className="flex w-full items-center justify-center relative">
        <div className="absolute top-1/2 left-1/2 h-45 w-45 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/40 blur-[30px]" />
        <div className="w-35 relative z-10">
          <Image
            width={400}
            height={400}
            alt={perfume.name}
            src={perfume.image || "/images/versache.png"}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-white">{perfume.name}</h1>
      <p className="text-body">{perfume.designer.name}</p>
      <p className="text-lg font-bold text-white">${Number(perfume.price)}</p>
      {perfume.description && (
        <p className="text-body text-sm">{perfume.description}</p>
      )}
    </div>
  );
};
