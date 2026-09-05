"use client";

import { useState, type ReactElement } from "react";
import type { OrderStatus } from "@prisma/client";
import { Boxes, Check, Clock, Truck, X } from "lucide-react";
import { TopBar } from "@/modules/shared/components";
import type { OrderWithItems } from "@/modules/orders/types";
import { useOrders } from "../hooks/use-orders";
import { OrderCard } from "./order-card";
import { OrderCardSkeleton } from "./order-card-skeleton";
import { OrderTrackingModal } from "./order-tracking-modal";
import { OrdersTabs } from "./orders-tabs";

type StatusKey = OrderStatus | "ALL";

interface OrdersPageProps {
  orders?: OrderWithItems[];
}

const TAB_LABELS: { key: StatusKey; label: string; icon: typeof Truck }[] = [
  { key: "ALL", label: "Todas", icon: Boxes },
  { key: "SHIPPED", label: "En camino", icon: Truck },
  { key: "PENDING", label: "Pendientes", icon: Clock },
  { key: "DELIVERED", label: "Entregadas", icon: Check },
  { key: "CANCELLED", label: "Canceladas", icon: X },
];

export const OrdersPage = ({
  orders: propOrders,
}: OrdersPageProps): ReactElement => {
  const { orders: hookOrders, isLoading } = useOrders();
  const orders = propOrders ?? hookOrders;

  const [activeTab, setActiveTab] = useState<StatusKey>("ALL");
  const [trackingOrder, setTrackingOrder] = useState<OrderWithItems | null>(
    null
  );

  const filtered =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <div className="flex flex-col gap-4 p-5 pb-25">
      <TopBar title="Mis órdenes" isCheckout />

      <OrdersTabs
        tabs={TAB_LABELS}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as StatusKey)}
      />

      {isLoading && <OrderCardSkeleton />}

      {!isLoading && filtered.length > 0 && (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onTrack={setTrackingOrder}
            />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-body text-base">No hay órdenes en esta sección.</p>
          </div>
        </div>
      )}

      <OrderTrackingModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />
    </div>
  );
};
