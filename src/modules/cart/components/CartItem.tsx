"use client";

import { type ReactElement } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { SizeBadge } from "@/modules/shared/components";
import { formatPrice } from "@/modules/shared/utils/format-price";
import type { CartItemData } from "../types";
import { QuantityStepper } from "./QuantityStepper";

type CartItemProps = {
  item: CartItemData;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
};

export const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps): ReactElement => {
  const { id, quantity, perfume } = item;

  return (
    <div className="flex h-24 w-full items-center gap-5">
      <div className="border-stroke relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border p-3">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/20 blur-[20px]" />
        </div>
        <div className="relative h-14 w-14 overflow-hidden">
          <Image
            src={perfume.image}
            alt={perfume.name}
            fill
            sizes="(max-width: 640px) 112px, 114px"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="relative flex h-full w-full min-w-0 flex-col justify-between">
        <div className="flex w-full flex-col">
          <h4 className="max-w-45 truncate text-base font-semibold text-white">
            {perfume.name}
          </h4>
          <p className="text-body text-sm italic mb-1">Jean paul gaultier</p>

          <SizeBadge size={`${perfume.ml ?? 100}ml`} />

          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-white">
              {formatPrice(perfume.price, {
                locale: "es-ES",
                currency: "USD",
              })}
            </p>

            <QuantityStepper
              id={id}
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </div>
        </div>
        <button
          className="absolute top-0 right-0 cursor-pointer rounded-full p-2 text-sm text-white transition-colors hover:bg-[#D9D9D9]/20"
          onClick={() => onRemove(id)}
          type="button"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};
