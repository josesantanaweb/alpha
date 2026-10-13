import type { ReactElement } from "react";
import type { OrderStatus } from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import { Check, Clock, Truck, X } from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_CLASSES: Record<
  OrderStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  PENDING: {
    label: "Pendiente",
    icon: Clock,
    className: "border border-amber-500 bg-amber-500/10 text-amber-400",
  },
  CONFIRMED: {
    label: "Confirmado",
    icon: Check,
    className: "border border-sky-500 bg-sky-500/10 text-sky-400",
  },
  SHIPPED: {
    label: "En camino",
    icon: Truck,
    className: "border border-yellow-500 bg-yellow-500/10 text-yellow-400",
  },
  DELIVERED: {
    label: "Entregado",
    icon: Check,
    className: "border border-emerald-500 bg-emerald-500/10 text-emerald-400",
  },
  CANCELLED: {
    label: "Cancelado",
    icon: X,
    className: "border border-error bg-error/10 text-error",
  },
};

export const OrderStatusBadge = ({
  status,
}: OrderStatusBadgeProps): ReactElement => {
  const { label, icon: Icon, className } = STATUS_CLASSES[status];

  return (
    <span
      className={`flex items-center w-fit gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold ${className}`}
    >
      <Icon size={12} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </span>
  );
};
