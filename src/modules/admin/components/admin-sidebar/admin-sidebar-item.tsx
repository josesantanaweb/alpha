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
          "relative flex cursor-pointer items-center gap-2 rounded-md text-left transition-colors hover:bg-white/5 hover:text-white",
          isActive || isOpen ? "bg-white/6 text-white" : "text-body",
          isCollapse ? "h-10 w-10 justify-center" : "h-9 w-full px-3"
        )}
      >
        {isActive && !isCollapse && (
          <span className="absolute left-0 h-5 w-0.5 bg-white" />
        )}
        <Icon size={15} strokeWidth={1.75} />
        {!isCollapse && <span className="flex-1 text-xs font-medium">{item.label}</span>}
        {!isCollapse && item.submenu && (
          <ChevronDown
            size={14}
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
