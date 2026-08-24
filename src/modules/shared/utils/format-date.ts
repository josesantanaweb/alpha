type DateValue = Date | string | number | null | undefined;

export function formatDate(date: DateValue, locale = "es-ES"): string {
  if (date == null) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}
