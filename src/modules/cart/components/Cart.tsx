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
import { CartSummaryCard } from "./CartSummaryCard";

export const Cart = (): ReactElement => {
  const router = useRouter();
  const { setHideBottomNav } = useApp();
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

  // Hide BottomNav only when there are items — it overlaps the checkout summary
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

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-5 p-5">
        <div className="bg-surface h-10 w-full animate-pulse rounded-lg" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface h-28 w-full animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 p-5 py-20">
        <p className="text-body text-lg">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col gap-5 p-5">
      <CartProgress
        currentTotal={itemsTotal}
        freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
      />

      <div className="mb-10 flex flex-col gap-3">
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

      <CartSummaryCard />

      <CartCheckoutPanel
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
        onCheckout={handleCheckout}
      />
    </div>
  );
};
