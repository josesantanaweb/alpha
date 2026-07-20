import { Decimal } from "@prisma/client/runtime/client";

export function formatPrice(price: Decimal): string {
  if (price == null) return "";
  const num = Number(price);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
