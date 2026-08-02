"use client";
import { useEffect, useState, type ReactElement } from "react";
import { useApp } from "@/modules/shared/stores/use-ui-store";
import { CartCheckoutPanel } from "./CartCheckoutPanel";
import { CartItem } from "./CartItem";
import { CartProgress } from "./CartProgress";
import { CartSummaryCard } from "./CartSummaryCard";
import cartData from "../data/cart.mock.json";
import type { CartData } from "../types";

export const Cart = (): ReactElement => {
  const { setHideBottomNav } = useApp();
  const [cart, setCart] = useState<CartData>(cartData as CartData);
  const FREE_SHIPPING_THRESHOLD = 200;
  const SHIPPING_FEE = 5;

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.perfume.originalPrice * item.quantity,
    0
  );
  const discount = cart.items.reduce((acc, item) => {
    const savings = Math.max(
      item.perfume.originalPrice - item.perfume.price,
      0
    );
    return acc + savings * item.quantity;
  }, 0);
  const itemsTotal = subtotal - discount;
  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = itemsTotal + shipping;

  useEffect(() => {
    setHideBottomNav(true);
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  const handleIncrease = (itemId: string): void => {
    setCart((currentCart) => ({
      ...currentCart,
      items: currentCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  const handleDecrease = (itemId: string): void => {
    setCart((currentCart) => ({
      ...currentCart,
      items: currentCart.items.flatMap((item) => {
        if (item.id !== itemId) {
          return [item];
        }

        if (item.quantity > 1) {
          return [{ ...item, quantity: item.quantity - 1 }];
        }

        return [];
      }),
    }));
  };

  const handleRemove = (itemId: string): void => {
    setCart((currentCart) => ({
      ...currentCart,
      items: currentCart.items.filter((item) => item.id !== itemId),
    }));
  };

  return (
    <div className="relative flex w-full flex-col gap-5 p-5">
      <CartProgress
        currentTotal={itemsTotal}
        freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
      />

      <div className="mb-10 flex flex-col gap-3">
        {cart.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <CartSummaryCard />

      <CartCheckoutPanel
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
      />
    </div>
  );
};
