"use client";
import type { ReactElement } from "react";
import { Button } from "@/modules/shared/components/ui";
import { OrderSummary } from "@/modules/shared/components/OrderSummary";
import { DiscountCodeForm } from "./DiscountCodeForm";

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
    <div className="border-stroke flex flex-col gap-3 border-t pt-5">
      <DiscountCodeForm onApply={(code) => console.log("Código aplicado:", code)} />
      <OrderSummary
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
      />
      <Button onClick={onCheckout}>Ver mi pedido</Button>
    </div>
  );
};
