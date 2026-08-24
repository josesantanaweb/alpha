export const GENDER_LABELS: Record<string, string> = {
  MALE: "Hombre",
  FEMALE: "Mujer",
  UNISEX: "Unisex",
};

export function getGenderLabel(gender?: string | null): string {
  if (!gender) return "";
  return GENDER_LABELS[gender] ?? gender;
}
