import { RELATIVE_DATE_THRESHOLD_DAYS } from "@/constants";

type DateValue = Date | string | number | null | undefined;

export function formatDate(date: DateValue, locale = "es-ES"): string {
  if (date == null) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";

  const monthName = new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(value);

  const shortMonth = monthName
    .slice(0, 3)
    .charAt(0)
    .toUpperCase() + monthName.slice(1, 3);

  const day = value.getDate();
  const year = value.getFullYear();

  return `${day} ${shortMonth} ${year}`;
}

export function formatRelativeDate(date: DateValue): string {
  if (date == null) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - value.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "hace un momento";
  if (diffMinutes < 60) return `hace ${diffMinutes} min`;
  if (diffHours < 24) return `hace ${diffHours} h`;
  if (diffDays < RELATIVE_DATE_THRESHOLD_DAYS) return `hace ${diffDays} días`;

  return formatDate(value);
}
