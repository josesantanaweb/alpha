"use client";

import Image from "next/image";
import { type ReactElement } from "react";
import { Trash } from "lucide-react";
import { formatPrice } from "@/modules/shared/utils/format-price";
import { QuantityStepper } from "./QuantityStepper";
import type { CartItemData } from "../types";


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
    <div className="flex w-full items-center gap-6">
      <div className="border-stroke relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border p-3">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/20 blur-[20px]" />
        </div>
        <div className="relative h-18 w-18 overflow-hidden">
          <Image
            src={perfume.image}
            alt={perfume.name}
            fill
            sizes="(max-width: 640px) 112px, 114px"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="flex h-full w-full min-w-0 flex-col">
        <div className="flex w-full items-start justify-between">
          <div className="flex min-w-0 flex-col">
            <h4 className="max-w-45 truncate text-base font-bold text-white">
              {perfume.name}
            </h4>
            <p className="text-body text-sm italic">{perfume.designer}</p>
          </div>
          <button
            className="cursor-pointer text-white transition-colors"
            onClick={() => onRemove(id)}
            type="button"
          >
            <Trash size={18} />
          </button>
        </div>

        <div className="flex items-start flex-col gap-3">
          <div className="flex items-center gap-2">
            {perfume.originalPrice > perfume.price ? (
              <p className="text-body text-sm font-bold line-through">
                {formatPrice(perfume.originalPrice, {
                  locale: "es-ES",
                  currency: "USD",
                })}
              </p>
            ) : null}
            <p className="text-sm font-bold text-white">
              {formatPrice(perfume.price, {
                locale: "es-ES",
                currency: "USD",
              })}
            </p>
          </div>

          <QuantityStepper
            id={id}
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    </div>
  );
};
