"use client";

import { useState, type ReactElement } from "react";
import clsx from "clsx";
import { useAdminStore } from "@/modules/shared/stores/use-admin-store";
import { LOGOUT_ITEM, MENU, filterMenuByRole, useRole } from "../../types";
import { AdminBrand } from "../admin-brand";
import { AdminSidebarMenu } from "./admin-sidebar-menu";

export const AdminSidebar = (): ReactElement => {
  const { collapseSidebar } = useAdminStore();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const { userRole } = useRole();
  const menuItems = filterMenuByRole(
    MENU.filter((item) => item.path !== LOGOUT_ITEM.path),
    userRole
  );

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((current) => {
      const next = new Set(current);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <aside
      className={clsx(
        "bg-surface sticky top-0 hidden h-screen shrink-0 transition-all duration-300 md:flex md:flex-col",
        collapseSidebar ? "w-20" : "w-60"
      )}
    >
      <AdminBrand collapse={collapseSidebar} />
      <AdminSidebarMenu
        menuItems={menuItems}
        openDropdowns={openDropdowns}
        toggleDropdown={toggleDropdown}
        isCollapse={collapseSidebar}
        logoutItem={LOGOUT_ITEM}
      />
    </aside>
  );
};
