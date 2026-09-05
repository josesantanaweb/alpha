import type { ReactElement } from "react";
import type { OrderStatus } from "@prisma/client";
import { Check, Clock, Truck, X } from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: typeof Clock; color: string; border: string }
> = {
  PENDING: { label: "Pendiente", icon: Clock, color: "text-amber-400", border: "border-amber-400" },
  CONFIRMED: { label: "Confirmado", icon: Check, color: "text-sky-400", border: "border-sky-400" },
  SHIPPED: { label: "En camino", icon: Truck, color: "text-yellow-400", border: "border-yellow-400" },
  DELIVERED: { label: "Entregado", icon: Check, color: "text-emerald-400", border: "border-emerald-400" },
  CANCELLED: { label: "Cancelado", icon: X, color: "text-error", border: "border-error" },
};

export const OrderStatusBadge = ({
  status,
}: OrderStatusBadgeProps): ReactElement => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 ${config.border} ${config.color}`}
    >
      <Icon size={12} />
      <p className="text-xs">{config.label}</p>
    </div>
  );
};