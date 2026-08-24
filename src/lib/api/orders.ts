import { API_ROUTES } from "@/constants";
import type { OrderWithItems } from "@/modules/orders/types";

export async function getOrders(token: string): Promise<OrderWithItems[]> {
  const res = await fetch(API_ROUTES.ORDERS, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data ?? []) as OrderWithItems[];
}

export async function getOrder(
  token: string,
  orderId: string
): Promise<OrderWithItems | null> {
  const res = await fetch(`${API_ROUTES.ORDERS}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.data ?? null) as OrderWithItems | null;
}

export async function createOrder(
  token: string,
  payload: unknown
): Promise<{ order: OrderWithItems }> {
  const res = await fetch(API_ROUTES.ORDERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message ?? "Error al crear el pedido"
    );
  }

  const json = await res.json();
  return { order: json.data as OrderWithItems };
}
