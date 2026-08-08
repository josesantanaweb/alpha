"use client";
import { useEffect, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/constants";
import { ROUTES } from "@/constants";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { useCart } from "../hooks/use-cart";
import { CartCheckoutPanel } from "./CartCheckoutPanel";
import { CartItem } from "./CartItem";
import { CartProgress } from "./CartProgress";
import { CartHeader } from "./CartHeader";
import { EmptyState } from "@/modules/shared/components";
import { CartItemSkeleton } from "./CartItemSkeleton";

export const Cart = (): ReactElement => {
  const router = useRouter();
  const { setHideBottomNav, setCartDrawerOpen } = useApp();
  const { items, isLoading, isLoggedIn, increase, decrease, remove } =
    useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.perfume.originalPrice * item.quantity,
    0,
  );
  const discount = items.reduce((acc, item) => {
    const savings = Math.max(
      item.perfume.originalPrice - item.perfume.price,
      0,
    );
    return acc + savings * item.quantity;
  }, 0);
  const itemsTotal = subtotal - discount;
  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = itemsTotal + shipping;

  useEffect(() => {
    const hasItems = items.length > 0;
    setHideBottomNav(hasItems);
    return () => setHideBottomNav(false);
  }, [items.length, setHideBottomNav]);

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
    <div className="relative flex h-screen w-full flex-col p-5 gap-5 overflow-hidden">
      <CartHeader />
      <div className="flex flex-col min-h-0 h-full gap-5 justify-between">
        <div className="flex flex-col gap-5 flex-2 min-h-0">
          <CartProgress
            currentTotal={itemsTotal}
            freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
          />

          <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide flex-1 min-h-0 pr-1">
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
          <div className="mt-auto shrink-0 flex-1">
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
    </div>
  );
};
