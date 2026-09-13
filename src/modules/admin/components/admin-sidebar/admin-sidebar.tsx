"use client";

import { useState, type ReactElement } from "react";
import clsx from "clsx";
import { useAdminStore } from "@/modules/shared/stores/use-admin-store";
import { LOGOUT_ITEM, MENU, filterMenuByRole, useRole } from "../../types";
import { AdminBrand } from "../admin-brand";
import { AdminSidebarItem } from "./admin-sidebar-item";

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
        "border-stroke bg-surface sticky top-0 hidden h-screen shrink-0 border-r pt-2 transition-all duration-300 md:flex md:flex-col",
        collapseSidebar ? "w-20" : "w-44"
      )}
    >
      <AdminBrand collapse={collapseSidebar} />
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center">
          <nav aria-label="Navegación administrativa" className="w-full px-2 pt-5">
            <ul className="flex w-full flex-col items-center gap-1">
              {menuItems.map((item) => (
                <AdminSidebarItem
                  key={item.label}
                  item={item}
                  isOpen={openDropdowns.has(item.label)}
                  toggleDropdown={toggleDropdown}
                  isCollapse={collapseSidebar}
                />
              ))}
            </ul>
          </nav>
        </div>
        <ul className="w-full px-2 pb-5">
          <AdminSidebarItem
            item={LOGOUT_ITEM}
            isOpen={false}
            toggleDropdown={toggleDropdown}
            isCollapse={collapseSidebar}
          />
        </ul>
      </div>
    </aside>
  );
};
