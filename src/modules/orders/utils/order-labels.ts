import { WHATSAPP_NUMBER } from "@/constants";
import type { OrderWithItems } from "@/modules/orders/types";

export const ORDER_TRACKING_STATUS: OrderWithItems["status"][] = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
];

export const paymentLabel = (method: string): string => {
  const labels: Record<string, string> = {
    MOBILE_PAYMENT: "Pago móvil",
    BINANCE: "Binance",
    ZINLI: "Zinli",
    CASH: "Efectivo",
  };
  return labels[method] ?? method;
};

export const supportUrl = (order: OrderWithItems): string => {
  const itemsSummary = order.items
    .map((item) => `${item.perfume.name} x${item.quantity}`)
    .join(", ");
  const message = `Hola Aura 👋, tengo un problema con mi orden #${order.id.slice(
    0,
    8
  )} (${itemsSummary}).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};