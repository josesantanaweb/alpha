"use client";

import type { ReactElement } from "react";
import { Calendar, Headset, Truck } from "lucide-react";
import { Button } from "@/modules/shared/components";
import { formatDate, formatPrice } from "@/modules/shared/utils";
import type { OrderWithItems } from "@/modules/orders/types";
import { paymentLabel, supportUrl } from "../utils/order-labels";
import { OrderItemCard } from "./order-item-card";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderCardProps {
  order: OrderWithItems;
  onTrack: (order: OrderWithItems) => void;
}

export const OrderCard = ({ order, onTrack }: OrderCardProps): ReactElement => {
  return (
    <div className="border-stroke bg-surface flex flex-col overflow-hidden rounded-xl border">
      <div className="border-stroke flex items-center justify-between border-b px-4 py-3">
        <div className="flex flex-col">
          <h5 className="text-base font-semibold">
            Orden #{order.id.slice(0, 8)}
          </h5>
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-body" />
            <p className="text-body text-sm">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex flex-col">
        {order.items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <h6 className="text-body text-base font-semibold">Total</h6>
            <p className="text-body text-sm">
              {paymentLabel(order.paymentMethod)} - {order.currency === "VES" ? "Bs." : "USD"}
            </p>
          </div>
          <h6 className="text-base font-semibold text-white">
            {formatPrice(order.total)}
          </h6>
        </div>
        <div className="flex w-full items-center justify-between gap-3">
          <Button variant="primary" onClick={() => onTrack(order)} size="md">
            <Truck size={16} />
            Rastrear
          </Button>
          <Button variant="secondary" asChild size="md">
            <a href={supportUrl(order)} target="_blank" rel="noopener noreferrer">
              <Headset size={16} />
              Soporte
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
