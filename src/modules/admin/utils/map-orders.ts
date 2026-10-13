import type { AdminOrderRow } from "@/modules/admin/types";
import type { OrderWithItems } from "@/modules/orders/types";

export function toAdminOrderRows(orders: OrderWithItems[]): AdminOrderRow[] {
  return orders.map((order) => ({
    id: order.id,
    image: order.items[0]?.perfume.image ?? null,
    name: order.items[0]?.perfume.name ?? "—",
    itemCount: order.items.length,
    contactName: order.contactName,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
  }));
}