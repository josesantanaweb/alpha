"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { Item } from "../../types";
import { AdminSidebarSubmenu } from "./admin-sidebar-submenu";

interface AdminSidebarItemProps {
  item: Item;
  isOpen: boolean;
  toggleDropdown: (label: string) => void;
  isCollapse: boolean;
}

export const AdminSidebarItem = ({
  item,
  isOpen,
  toggleDropdown,
  isCollapse,
}: AdminSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const Icon = item.icon;
  const hasActiveSubmenu = item.submenu?.some(({ path }) => path === pathname);
  const isActive = item.path === pathname || hasActiveSubmenu;

  const handleClick = () => {
    if (item.submenu) {
      toggleDropdown(item.label);
      return;
    }

    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <li className="flex w-full flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={item.submenu ? isOpen : undefined}
        className={clsx(
          "relative flex cursor-pointer items-center gap-3 text-left transition-colors hover:bg-white hover:text-surface rounded-lg",
          isActive || isOpen ? "bg-white text-surface" : "text-body",
          isCollapse ? "h-10 w-10 justify-center" : "w-[90%] px-3 h-10"
        )}
      >
        <Icon size={18} strokeWidth={2} />
        {!isCollapse && <span className="flex-1 text-base font-semibold">{item.label}</span>}
        {!isCollapse && item.submenu && (
          <ChevronDown
            size={18}
            strokeWidth={2}
            className={clsx("transition-transform", isOpen && "rotate-180")}
          />
        )}
      </button>
      {item.submenu && (
        <AdminSidebarSubmenu
          submenu={item.submenu}
          isOpen={isOpen}
          isCollapse={isCollapse}
        />
      )}
    </li>
  );
};
