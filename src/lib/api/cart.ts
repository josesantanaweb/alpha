import type { CartWithItems } from "@/modules/cart/actions";
import { API_ROUTES } from "@/constants";

/** Get the authenticated user's cart */
export async function getCart(token: string): Promise<CartWithItems | null> {
  const res = await fetch(API_ROUTES.CART, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.data ?? null) as CartWithItems | null;
}
