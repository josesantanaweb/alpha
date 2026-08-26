import type { ReactElement } from "react";
import Image from "next/image";
import { cn } from "@/modules/shared/utils/cn";
import { SizeBadge } from "@/modules/shared/components";
import { formatPrice } from "@/modules/shared/utils/format-price";

export interface OrderItemSummaryProps {
  name: string;
  brand: string;
  size?: string;
  image: string;
  price: number | string;
  className?: string;
}

export const OrderItemSummary = ({
  name,
  brand,
  size = "100ml",
  image,
  price,
  className,
}: OrderItemSummaryProps): ReactElement => {
  const formattedPrice =
    typeof price === "number"
      ? formatPrice(price, { locale: "es-ES", currency: "USD" })
      : price;

  return (
    <div className={cn("flex h-16 w-full items-center gap-3", className)}>
      <div className="border-stroke relative flex h-full w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-3">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9D9D9]/20 blur-[20px]" />
        </div>
        <div className="relative h-10 w-10 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 112px, 114px"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="flex h-full min-w-0 flex-1 flex-col justify-evenly">
        <h4 className="max-w-45 truncate text-sm leading-3 font-medium text-white">
          {name}
        </h4>
        {brand && <p className="text-body text-xs italic">{brand}</p>}
        {size && <SizeBadge size={size} />}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <p className="text-base font-semibold text-white">{formattedPrice}</p>
      </div>
    </div>
  );
};
