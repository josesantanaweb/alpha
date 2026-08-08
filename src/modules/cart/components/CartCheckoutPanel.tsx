"use client";
import type { ReactElement } from "react";
import { Button, Input } from "@/modules/shared/components/ui";
import { formatPrice } from "@/modules/shared/utils/format-price";

type CartCheckoutPanelProps = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
};

export const CartCheckoutPanel = ({
  subtotal,
  discount,
  shipping,
  total,
  onCheckout,
}: CartCheckoutPanelProps): ReactElement => {
  return (
    <div className="border-stroke flex flex-col gap-6 border-t pt-5">
      <div className="flex items-center gap-3">
        <Input placeholder="Código de descuento" className="flex-2" />
        <Button className="flex-1">Aplicar</Button>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-lg font-bold text-white">Resumen</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-body text-base">Envío:</p>
            <p className="text-base font-bold text-white">
              {shipping === 0
                ? "Gratis"
                : formatPrice(shipping, { locale: "es-ES", currency: "USD" })}
            </p>
          </div>
          {discount > 0 ? (
            <div className="flex items-center justify-between">
              <p className="text-body text-base">Descuento:</p>
              <p className="text-base font-bold text-white">
                -{formatPrice(discount, { locale: "es-ES", currency: "USD" })}
              </p>
            </div>
          ) : null}
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
          <Button onClick={onCheckout}>Pagar</Button>
        </div>
      </div>
    </div>
  );
};
