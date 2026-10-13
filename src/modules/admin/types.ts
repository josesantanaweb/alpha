"use client";

import type { OrderStatus } from "@prisma/client";
import {
  Boxes,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  ListTree,
  LogOut,
  ShoppingBag,
  Users,
  Truck,
  Gift,
  type LucideIcon,
  Ticket,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { useAuth } from "@/modules/auth/store";

export interface AdminOrderRow {
  id: string;
  image: string | null;
  name: string;
  itemCount: number;
  contactName: string;
  createdAt: string;
  status: OrderStatus;
}

export interface SubmenuItem {
  label: string;
  icon: LucideIcon;
  path?: string;
}

export interface Item {
  label: string;
  icon: LucideIcon;
  path?: string;
  submenu?: SubmenuItem[];
}

const MENU_ICONS = {
  dashboard: LayoutDashboard,
  perfumes: Boxes,
  management: FolderKanban,
  catalog: ListTree,
  orders: ShoppingBag,
  customers: Users,
  payments: CreditCard,
  shipments: Truck,
  coupons: Ticket,
  giftcards: Gift,
  logout: LogOut,
};

export const MENU: Item[] = [
  {
    label: "Dashboard",
    icon: MENU_ICONS.dashboard,
    path: ROUTES.ADMIN,
  },
  {
    label: "Perfumes",
    icon: MENU_ICONS.perfumes,
    path: `${ROUTES.ADMIN}/perfumes`,
  },
  {
    label: "Órdenes",
    icon: MENU_ICONS.orders,
    path: `${ROUTES.ADMIN}/orders`,
  },
  {
    label: "Clientes",
    icon: MENU_ICONS.customers,
    path: `${ROUTES.ADMIN}/customers`,
  },
  {
    label: "Pagos",
    icon: MENU_ICONS.payments,
    path: `${ROUTES.ADMIN}/payments`,
  },
  {
    label: "Envíos",
    icon: MENU_ICONS.shipments,
    path: `${ROUTES.ADMIN}/shipments`,
  },
  {
    label: "Cupones",
    icon: MENU_ICONS.coupons,
    path: `${ROUTES.ADMIN}/coupons`,
  },
  {
    label: "Giftcards",
    icon: MENU_ICONS.giftcards,
    path: `${ROUTES.ADMIN}/giftcards`,
  },
  {
    label: "Gestión",
    icon: MENU_ICONS.management,
    submenu: [
      {
        label: "Inventario",
        icon: MENU_ICONS.catalog,
      },
    ],
  },
];

export const LOGOUT_ITEM: Item = {
  label: "Salir",
  icon: MENU_ICONS.logout,
  path: "/api/auth/logout",
};

export function filterMenuByRole(
  menu: Item[],
  userRole: string | null
): Item[] {
  void userRole;
  return menu;
}

export function useRole() {
  const user = useAuth((s) => s.user);
  return { userRole: user?.role ?? null };
}
