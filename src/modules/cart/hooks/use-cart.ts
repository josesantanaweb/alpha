"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/store";
import { getCart } from "@/lib/api/cart";
import { normalizeCartItems } from "../utils";
import { useCartStore } from "../store";
import type { CartItemData } from "../types";

/**
 * Unified cart hook.
 * - Logged-in users: fetches cart from API, normalizes to CartItemData[]
 * - Logged-in users with empty server cart: falls back to guest store items
 * - Guest users: reads from Zustand guest cart store
 *
 * Mutations always operate on the local store (server sync is a future iteration).
 */
export const useCart = () => {
  const user = useAuth((s) => s.user);
  const token = useAuth((s) => s.token);
  const authLoading = useAuth((s) => s.isLoading);

  // Guest store
  const guestItems = useCartStore((s) => s.items);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // Server cart query (only runs when logged in)
  const queryKey = ["cart", user?.id];
  const { data: serverCart, isLoading: serverLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!token) return null;
      return getCart(token);
    },
    enabled: !!user && !!token,
  });

  // Normalize API response to CartItemData[]
  const serverItems = useMemo<CartItemData[]>(
    () => (serverCart ? normalizeCartItems(serverCart) : []),
    [serverCart],
  );

  const isLoggedIn = !!user;

  // While the server query is still loading, show guest items to avoid a
  // flash of empty cart. Once resolved, prefer server items if they exist,
  // otherwise keep showing guest items (account has no cart yet).
  const items: CartItemData[] =
    isLoggedIn && !serverLoading && serverItems.length > 0
      ? serverItems
      : guestItems;

  const isLoading = authLoading || (isLoggedIn && serverLoading && guestItems.length === 0);

  return {
    items,
    isLoading,
    isLoggedIn,
    // mutations — for now always touch the guest store (server-side mutations come later)
    increase: increaseQuantity,
    decrease: decreaseQuantity,
    remove: removeItem,
  };
};
