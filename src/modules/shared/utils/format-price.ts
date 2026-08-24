import { Decimal } from "@prisma/client/runtime/client";

type PriceValue = Decimal | number | null | undefined;

type FormatPriceOptions = {
  locale?: string;
  currency?: string;
};

export function formatPrice(
  price: PriceValue,
  options: FormatPriceOptions = {}
): string {
  if (price == null) return "";
  const num = Number(price);
  if (Number.isNaN(num)) return "";

  const { locale = "es-MX", currency = "MXN" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
