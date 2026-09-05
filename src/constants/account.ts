import {
  Clock,
  Headset,
  Heart,
  LogOut,
  ScrollText,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "./routes";
import { ASSETS } from "./assets";
import { SOCIAL_URLS } from "./config";

export interface AccountMenuItem {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  danger?: boolean;
  disabled?: boolean;
}

export const ACCOUNT_MANAGER_MENU: AccountMenuItem[] = [
  {
    key: "orders",
    label: "Mis Órdenes",
    icon: ScrollText,
    href: ROUTES.ORDERS,
  },
  { key: "favorites", label: "Mis Favoritos", icon: Heart, href: ROUTES.FAVORITES },
  { key: "points", label: "Mis Puntos", icon: Trophy, disabled: true },
  { key: "recent", label: "Visto Recientemente", icon: Clock, disabled: true },
];

export const ACCOUNT_HELP_MENU: AccountMenuItem[] = [
  { key: "support", label: "Atención al cliente", icon: Headset },
  { key: "logout", label: "Cerrar sesión", icon: LogOut, danger: true },
];

export interface SocialLink {
  key: string;
  label: string;
  image: string;
  href?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    image: ASSETS.IMAGES.WHATSAPP,
    href: SOCIAL_URLS.WHATSAPP,
  },
  ...(SOCIAL_URLS.INSTAGRAM
    ? [
        {
          key: "instagram",
          label: "Instagram",
          image: ASSETS.IMAGES.INSTAGRAM,
          href: SOCIAL_URLS.INSTAGRAM,
        },
      ]
    : []),
  ...(SOCIAL_URLS.TIKTOK
    ? [
        {
          key: "tiktok",
          label: "TikTok",
          image: ASSETS.IMAGES.TIKTOK,
          href: SOCIAL_URLS.TIKTOK,
        },
      ]
    : []),
];