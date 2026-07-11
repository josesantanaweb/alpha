"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import {
  Rating,
  LikeButton,
  Discount,
} from "@/components/shared";
import { cn } from "@/lib/cn";

type PerfumeBoxPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface PerfumeBoxProps {
  perfume: PerfumeBoxPerfume;
  liked: boolean;
  onLikeToggle: () => void;
  className?: string;
}

export const PerfumeBox = ({
  perfume,
  liked,
  onLikeToggle,
  className,
}: PerfumeBoxProps): ReactElement => {
  const { name, price, rating, designer, discount, image } = perfume;

  return (
    <div className={cn("flex flex-col gap-3 shrink-0", className)}>
      <div className="bg-surface border-stroke relative flex w-full h-45 items-center justify-center rounded-2xl border p-3">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between p-3">
          <Discount discount={discount} />
          <LikeButton liked={liked} onToggle={onLikeToggle} />
        </div>
        <div className="flex w-full justify-center">
          <div className="relative h-30 w-28.5 overflow-hidden">
            <Image
              src={image ?? ""}
              alt="perfume"
              fill
              sizes="(max-width: 640px) 112px, 114px"
              className="w-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <p className="text-body text-sm italic">{designer.name}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <h4 className="max-w-27.5 truncate text-sm font-semibold text-white">
              {name}
            </h4>
            <Rating rating={Number(rating)} />
          </div>
          <p className="text-base font-bold text-white">${Number(price)}</p>
        </div>
      </div>
    </div>
  );
};
