export interface VoteOption {
  label: string;
  field: string;
  image: string;
}

export const SEASON_OPTIONS: VoteOption[] = [
  { label: "Invierno", field: "winter", image: "/images/season/winter.svg" },
  { label: "Primavera", field: "spring", image: "/images/season/spring.svg" },
  { label: "Verano", field: "summer", image: "/images/season/summer.svg" },
  { label: "Otoño", field: "autumn", image: "/images/season/autumn.svg" },
];

export const TIME_OF_DAY_OPTIONS: VoteOption[] = [
  { label: "Dia", field: "day", image: "/images/time-of-day/day.svg" },
  { label: "Noche", field: "night", image: "/images/time-of-day/night.svg" },
];

export const LONGEVITY_OPTIONS: VoteOption[] = [
  { label: "Debil", field: "weak", image: "/images/longevity/weak.svg" },
  {
    label: "Moderado",
    field: "moderate",
    image: "/images/longevity/moderate.svg",
  },
  { label: "Duradera", field: "long", image: "/images/longevity/long.svg" },
  {
    label: "Muy duradera",
    field: "veryLong",
    image: "/images/longevity/very-long.svg",
  },
];

export const SILLAGE_OPTIONS: VoteOption[] = [
  { label: "Suave", field: "soft", image: "/images/sillage/soft.svg" },
  {
    label: "Moderada",
    field: "moderate",
    image: "/images/sillage/moderate.svg",
  },
  { label: "Fuerte", field: "heavy", image: "/images/sillage/heavy.svg" },
  { label: "Enorme", field: "huge", image: "/images/sillage/huge.svg" },
];

export const PROJECTION_OPTIONS: VoteOption[] = [
  { label: "Suave", field: "soft", image: "/images/projection/afable.svg" },
  {
    label: "Moderado",
    field: "moderate",
    image: "/images/projection/moderate.svg",
  },
  { label: "Fuerte", field: "heavy", image: "/images/projection/strong.svg" },
  { label: "Enorme", field: "huge", image: "/images/projection/huge.svg" },
];

export const FEELING_OPTIONS: VoteOption[] = [
  { label: "La odio", field: "hate", image: "/images/felling/hate.svg" },
  {
    label: "No me gusta",
    field: "dislike",
    image: "/images/felling/dont-like.svg",
  },
  { label: "Me gusta", field: "like", image: "/images/felling/like.svg" },
  { label: "Me encanta", field: "love", image: "/images/felling/love.svg" },
];
