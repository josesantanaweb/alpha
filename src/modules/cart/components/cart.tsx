"use client";

import type { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { FREE_SHIPPING_THRESHOLD, ROUTES, SHIPPING_FEE } from "@/constants";
import { EmptyState } from "@/modules/shared/components";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { useCart } from "../hooks/use-cart";
import { CartCheckoutPanel } from "./cart-checkout-panel";
import { CartHeader } from "./cart-header";
import { CartItem } from "./cart-item";
import { CartItemSkeleton } from "./cart-item-skeleton";
import { CartProgress } from "./cart-progress";

export const Cart = (): ReactElement => {
  const router = useRouter();
  const { setCartDrawerOpen } = useApp();
  const { items, isLoading, isLoggedIn, increase, decrease, remove } =
    useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.perfume.originalPrice * item.quantity,
    0
  );
  const discount = items.reduce((acc, item) => {
    const savings = Math.max(
      item.perfume.originalPrice - item.perfume.price,
      0
    );
    return acc + savings * item.quantity;
  }, 0);
  const itemsTotal = subtotal - discount;
  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = itemsTotal + shipping;

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push(ROUTES.CHECKOUT);
    } else {
      router.push(`${ROUTES.LOGIN}?redirect=checkout`);
    }
  };

  const handleHome = () => {
    setCartDrawerOpen(false);
    router.push(ROUTES.EXPLORER);
  };

  const renderSkeletons = () => {
    return <CartItemSkeleton count={3} />;
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-5 overflow-hidden p-5">
      <CartHeader />
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <CartProgress
          currentTotal={itemsTotal}
          freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
        />

        <div className="scrollbar-hide flex max-h-full min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {isLoading && renderSkeletons()}

          {items.length === 0 && !isLoading && (
            <EmptyState
              title="Tu carrito está vacío"
              subtitle="Explora nuestro catálogo y agrega tus fragancias favoritas."
              showClear={false}
              showHome={true}
              onHome={handleHome}
            />
          )}

          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={remove}
            />
          ))}
        </div>
      </div>

      {!isLoading && items.length > 0 && (
        <div className="shrink-0">
          <CartCheckoutPanel
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};
