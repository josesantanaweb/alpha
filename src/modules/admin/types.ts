"use client";

import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  FolderKanban,
  ListTree,
  LayoutDashboard,
  LogOut,
  Package,
  Users,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { useAuth } from "@/modules/auth/store";

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
  products: Boxes,
  management: FolderKanban,
  catalog: ListTree,
  orders: Package,
  customers: Users,
  logout: LogOut,
};

export const MENU: Item[] = [
  {
    label: "Panel",
    icon: MENU_ICONS.dashboard,
    path: ROUTES.ADMIN,
  },
  {
    label: "Gestión",
    icon: MENU_ICONS.management,
    submenu: [
      {
        label: "Catálogo",
        icon: MENU_ICONS.products,
        path: ROUTES.ADMIN,
      },
      {
        label: "Inventario",
        icon: MENU_ICONS.catalog,
      },
    ],
  },
  {
    label: "Órdenes",
    icon: MENU_ICONS.orders,
    path: `${ROUTES.ADMIN}/ordenes`,
  },
  {
    label: "Clientes",
    icon: MENU_ICONS.customers,
    path: `${ROUTES.ADMIN}/clientes`,
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
