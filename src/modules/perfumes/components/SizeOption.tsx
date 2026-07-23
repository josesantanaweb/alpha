"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";

interface SizeOptionProps {
  name: string;
  image: string | null;
  isSelected: boolean;
  onClick: () => void;
}

export const SizeOption = ({
  name,
  image,
  isSelected,
  onClick,
}: SizeOptionProps): ReactElement => (
  <div className="flex flex-col items-center gap-2">
    <button
      className={cn(
        "bg-surface flex h-22 w-22 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-200",
        isSelected ? "border-white" : "border-stroke"
      )}
      onClick={onClick}
      aria-label={name}
    >
      <div className="w-8 h-16">
        <Image
          src={image || "/images/versache.png"}
          alt={name}
          width={200}
          height={200}
          className="h-full w-full object-contain"
        />
      </div>
    </button>
    <p className="text-sm font-semibold text-white">{name}</p>
  </div>
);
