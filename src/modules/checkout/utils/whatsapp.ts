import { WHATSAPP_NUMBER } from "@/constants";
import type { CartItemData } from "@/modules/cart/types";
import { formatPrice } from "@/modules/shared/utils/format-price";
import {
  DELIVERY_METHOD_LABELS,
  DeliveryMethod,
  PAYMENT_PROVIDER_LABELS,
  type CheckoutFormData,
} from "../types";

interface WhatsAppOrderData {
  form: CheckoutFormData;
  items: CartItemData[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const usd = (value: number): string =>
  formatPrice(value, { locale: "es-ES", currency: "USD" });

export function buildWhatsAppMessage({
  form,
  items,
  subtotal,
  discount,
  shipping,
  total,
}: WhatsAppOrderData): string {
  const lines: string[] = [
    "*Nuevo pedido - Aura*",
    "",
    "*Datos del cliente*",
    `Nombre: ${form.firstName} ${form.lastName}`,
    `Teléfono: ${form.phone}`,
    `Correo: ${form.email}`,
    "",
    "*Entrega*",
    `Tipo de envío: ${DELIVERY_METHOD_LABELS[form.deliveryMethod]}`,
  ];

  if (form.deliveryMethod === DeliveryMethod.DELIVERY) {
    lines.push(`Ciudad: ${form.city}`);
    lines.push(`Dirección: ${form.address}`);
  }

  lines.push(
    "",
    "*Pago*",
    `Moneda: ${form.paymentCurrency}`,
    `Método: ${PAYMENT_PROVIDER_LABELS[form.paymentProvider]}`,
    "",
    "*Productos*"
  );

  items.forEach((item) => {
    const size = item.perfume.ml ? `${item.perfume.ml} ml` : "";
    const label = size ? `${item.perfume.name} (${size})` : item.perfume.name;
    lines.push(
      `- ${label} x${item.quantity} = ${usd(item.perfume.price * item.quantity)}`
    );
  });

  lines.push(
    "",
    `Subtotal: ${usd(subtotal)}`,
    `Descuento: -${usd(discount)}`,
    `Envío: ${usd(shipping)}`,
    `*Total: ${usd(total)}*`
  );

  return lines.join("\n");
}

export function buildWhatsAppUrl(data: WhatsAppOrderData): string {
  const message = buildWhatsAppMessage(data);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
