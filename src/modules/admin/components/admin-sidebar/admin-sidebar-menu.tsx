"use client";

import type { ReactElement } from "react";
import type { Item } from "../../types";
import { AdminSidebarItem } from "./admin-sidebar-item";

interface AdminSidebarMenuProps {
  menuItems: Item[];
  openDropdowns: Set<string>;
  toggleDropdown: (label: string) => void;
  isCollapse: boolean;
  logoutItem: Item;
}

export const AdminSidebarMenu = ({
  menuItems,
  openDropdowns,
  toggleDropdown,
  isCollapse,
  logoutItem,
}: AdminSidebarMenuProps): ReactElement => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center">
        <nav aria-label="Navegación administrativa" className="w-full pt-4">
          <ul className="flex w-full flex-col items-center gap-1">
            {menuItems.map((item) => (
              <AdminSidebarItem
                key={item.label}
                item={item}
                isOpen={openDropdowns.has(item.label)}
                toggleDropdown={toggleDropdown}
                isCollapse={isCollapse}
              />
            ))}
          </ul>
        </nav>
      </div>
      <ul className="w-full px-2 pb-5">
        <AdminSidebarItem
          item={logoutItem}
          isOpen={false}
          toggleDropdown={toggleDropdown}
          isCollapse={isCollapse}
        />
      </ul>
    </div>
  );
};
