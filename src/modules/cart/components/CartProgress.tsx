"use client";
import type { ReactElement } from "react";
import { Truck } from "lucide-react";
import { formatPrice } from "@/modules/shared/utils/format-price";

type CartProgressProps = {
  currentTotal: number;
  freeShippingThreshold: number;
};

export const CartProgress = ({
  currentTotal,
  freeShippingThreshold,
}: CartProgressProps): ReactElement => {
  const progress = Math.min((currentTotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - currentTotal, 0);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-white">Mi Carrito</h3>
      <div className="flex items-center gap-2">
        <Truck size={18} className="text-white" />
        <p className="text-sm text-white">
          {remaining > 0
            ? `Añade ${formatPrice(remaining, { locale: "es-ES", currency: "USD" })} más para envío GRATIS`
            : "Ya tienes envío GRATIS"}
        </p>
      </div>
      <div className="bg-surface h-1 w-full overflow-hidden rounded-lg">
        <div className="h-1 bg-white" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between">
        <span className="text-body text-sm">
          {formatPrice(0, { locale: "es-ES", currency: "USD" })}
        </span>
        <span className="text-body text-sm">
          {formatPrice(freeShippingThreshold, {
            locale: "es-ES",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
};
