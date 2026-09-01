"use client";

import type { ReactElement } from "react";
import { formatPrice } from "@/modules/shared/utils/format-price";

type OrderSummaryProps = {
  subtotal: number;
  discount: number;
  shipping: number | "PICKUP";
  total: number;
  isCheckout?: boolean;
};

export const OrderSummary = ({
  subtotal,
  discount,
  shipping,
  total,
  isCheckout = false,
}: OrderSummaryProps): ReactElement => {
  const shippingLabel =
    shipping === "PICKUP"
      ? "Retiro en tienda"
      : shipping === 0
        ? "Gratis"
        : formatPrice(shipping, { locale: "es-ES", currency: "USD" });

  return (
    <div
      className={`flex flex-col gap-2 pt-4 ${!isCheckout ? "border-stroke border-t" : ""}`}
    >
      {!isCheckout && <h4 className="text-lg font-bold text-white">Resumen</h4>}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-body text-base">Envío:</p>
          <p className="text-base font-bold text-white">{shippingLabel}</p>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-body text-base">Descuento:</p>
            <p className="text-body text-base font-bold">
              -{formatPrice(discount, { locale: "es-ES", currency: "USD" })}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-body text-base">Subtotal:</p>
          <p className="text-base font-bold text-white">
            {formatPrice(subtotal, { locale: "es-ES", currency: "USD" })}
          </p>
        </div>

        <div className="border-stroke flex items-center justify-between border-t py-3">
          <p className="text-lg font-bold text-white">Total:</p>
          <p className="text-lg font-bold text-white">
            {formatPrice(total, { locale: "es-ES", currency: "USD" })}
          </p>
        </div>
      </div>
    </div>
  );
};
