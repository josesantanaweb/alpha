import type { ReactElement } from "react";
import { OrderSummary } from "@/modules/shared/components/OrderSummary";
import { OrderItemSummary } from "./OrderItemSummary";
import type { CartItemData } from "@/modules/cart/types";

interface CheckoutOrderSummaryProps {
  items: CartItemData[];
  subtotal: number;
  discount: number;
  shipping: number | "pickup";
  total: number;
  stepNumber?: number | string;
}

export const CheckoutOrderSummary = ({
  items,
  subtotal,
  discount,
  shipping,
  total,
  stepNumber = 3,
}: CheckoutOrderSummaryProps): ReactElement => (
  <section className="flex flex-col gap-3">
    <h4 className="text-lg font-semibold text-white">
      {stepNumber}. Resumen de la Orden
    </h4>

    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <OrderItemSummary
          key={item.id}
          name={item.perfume.name}
          brand={item.perfume.designer}
          size={item.perfume.ml ? `${item.perfume.ml} ml` : undefined}
          image={item.perfume.image}
          price={item.perfume.price * item.quantity}
        />
      ))}
    </div>

    <OrderSummary
      subtotal={subtotal}
      discount={discount}
      shipping={shipping}
      total={total}
      isCheckout
    />
  </section>
);
