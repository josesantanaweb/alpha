"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GuestCartItem, CartProduct } from "./types";

interface GuestCartStore {
  items: GuestCartItem[];
  addItem: (perfumeId: string, perfume: CartProduct) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<GuestCartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (perfumeId, perfume) => {
        const existing = get().items.find((i) => i.perfumeId === perfumeId);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.perfumeId === perfumeId
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          }));
        } else {
          set((s) => ({
            items: [
              ...s.items,
              { id: crypto.randomUUID(), perfumeId, quantity: 1, perfume },
            ],
          }));
        }
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      increaseQuantity: (id) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),

      decreaseQuantity: (id) =>
        set((s) => ({
          items: s.items.flatMap((i) => {
            if (i.id !== id) return [i];
            if (i.quantity > 1) return [{ ...i, quantity: i.quantity - 1 }];
            return [];
          }),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "aura_guest_cart",
    },
  ),
);
