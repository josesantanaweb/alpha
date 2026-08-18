import type { CartWithItems } from "@/modules/cart/actions";
import { API_ROUTES } from "@/constants";

export async function getCart(token: string): Promise<CartWithItems | null> {
  const res = await fetch(API_ROUTES.CART, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.data ?? null) as CartWithItems | null;
}

export async function addCartItem(
  token: string,
  perfumeId: string,
  decantId?: string | null,
  quantity?: number,
): Promise<void> {
  const res = await fetch(`${API_ROUTES.CART}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ perfumeId, decantId, quantity }),
  });
  if (!res.ok) throw new Error("Error al agregar item al carrito");
}
