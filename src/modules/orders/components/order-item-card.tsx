"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { SizeBadge } from "@/modules/shared/components";
import { formatPrice } from "@/modules/shared/utils";
import type { OrderWithItems } from "@/modules/orders/types";

type OrderItem = OrderWithItems["items"][number];

interface OrderItemCardProps {
  item: OrderItem;
}

export const OrderItemCard = ({ item }: OrderItemCardProps): ReactElement => {
  const ml = item.decant?.ml ?? item.perfume.remainingMl;

  return (
    <div className="border-stroke flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="border-stroke relative flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-3">
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-[#D9D9D9]/20 absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[20px]" />
          </div>
          <div className="relative h-12 w-12 overflow-hidden">
            {item.perfume.image ? (
              <Image
                src={item.perfume.image}
                alt={item.perfume.name}
                fill
                unoptimized
                sizes="(max-width: 640px) 112px, 114px"
                className="h-full w-full object-contain"
              />
            ) : (
              <Package size={20} className="text-body" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h4 className="text-base font-semibold max-w-38 truncate">{item.perfume.name}</h4>
            <p className="text-body text-sm">
              {item.quantity} x {formatPrice(item.price)}
            </p>
          </div>
          <SizeBadge size={`${ml}ml`} />
        </div>
      </div>
      <h4 className="text-base font-semibold">
        {formatPrice(Number(item.price) * item.quantity)}
      </h4>
    </div>
  );
};
