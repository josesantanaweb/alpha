"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { LikeButton, Rating } from "@/modules/shared/components";
import { cn } from "@/modules/shared/utils/cn";
import { PerfumeBadge } from "./perfume-badge";
import { PerfumePrice } from "./perfume-price";

type PerfumeBoxPerfume = Prisma.PerfumeGetPayload<{
  include: { designer: true };
}>;

interface PerfumeBoxProps {
  perfume: PerfumeBoxPerfume;
  perfumeBadge?: string;
  liked: boolean;
  onLikeToggle: () => void;
  className?: string;
}

export const PerfumeBox = ({
  perfume,
  liked,
  onLikeToggle,
  className,
  perfumeBadge,
}: PerfumeBoxProps): ReactElement => {
  const { name, price, rating, designer, discount, image, slug } = perfume;

  return (
    <div className={cn("flex shrink-0 flex-col gap-3", className)}>
      <div className="bg-surface border-stroke relative flex h-45 w-full items-center justify-center overflow-hidden rounded-2xl border p-3">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/20 blur-[30px]" />
        </div>
        <div className="absolute top-0 left-0 flex w-full items-center justify-between p-3">
          {perfumeBadge ? <PerfumeBadge label={perfumeBadge} /> : <span />}
          <span role="presentation">
            <LikeButton liked={liked} onToggle={onLikeToggle} />
          </span>
        </div>
        <Link href={`/perfume/${slug}`} className="flex w-full justify-center">
          <motion.div
            className="relative h-26 w-24.5 overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src={image ?? ""}
              alt="perfume"
              fill
              sizes="(max-width: 640px) 112px, 114px"
              className="w-full object-contain"
            />
          </motion.div>
        </Link>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <p className="text-body text-sm italic">{designer.name}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <Link href={`/perfume/${slug}`} className="cursor-pointer">
              <h4 className="max-w-27.5 truncate text-base font-semibold text-white">
                {name}
              </h4>
            </Link>
            <Rating rating={Number(rating)} />
          </div>
          <PerfumePrice price={Number(price)} discount={discount} />
        </div>
      </div>
    </div>
  );
};
