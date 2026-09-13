"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import type { SubmenuItem } from "../../types";

interface AdminSidebarSubmenuProps {
  submenu: SubmenuItem[];
  isOpen: boolean;
  isCollapse: boolean;
}

export const AdminSidebarSubmenu = ({
  submenu,
  isOpen,
  isCollapse,
}: AdminSidebarSubmenuProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ul
      className={clsx(
        "flex w-full flex-col overflow-hidden transition-all duration-200",
        isOpen ? "max-h-48 pt-1 opacity-100" : "max-h-0 opacity-0",
        isCollapse ? "items-center" : "pl-4"
      )}
    >
      {submenu.map(({ label, icon: Icon, path }) => (
        <li key={label} className="w-full">
          <button
            type="button"
            onClick={() => path && router.push(path)}
            className={clsx(
              "flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-3 text-left text-[11px] transition-colors hover:bg-white/5 hover:text-white",
              path === pathname ? "text-white" : "text-body",
              !path && "cursor-default"
            )}
          >
            <Icon size={13} strokeWidth={1.75} />
            {!isCollapse && <span>{label}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
};
