import { AdminOrdersTable } from "@/modules/admin/components";
import { toAdminOrderRows } from "@/modules/admin/utils";
import { getAllOrders } from "@/modules/orders/actions";

export default async function AdminPage() {
  const result = await getAllOrders();

  if (!result.success) {
    return <p className="text-body text-xs">Error al cargar las órdenes.</p>;
  }

  return <AdminOrdersTable orders={toAdminOrderRows(result.data ?? [])} />;
}