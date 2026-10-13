"use client";

import type { ReactElement } from "react";
import { useAuth } from "@/modules/auth/store";
import { useAdminStore } from "@/modules/shared/stores/use-admin-store";
import { AdminNotificationsButton } from "./admin-navbar/admin-notifications-button";
import { AdminSidebarToggle } from "./admin-navbar/admin-sidebar-toggle";
import { AdminUserInfo } from "./admin-navbar/admin-user-info";

export const AdminNavbar = (): ReactElement => {
  const user = useAuth((s) => s.user);
  const { collapseSidebar, setCollapseSidebar } = useAdminStore();

  const displayName = user?.name ?? "Admin";

  const toggleSidebar = () => setCollapseSidebar(!collapseSidebar);

  return (
    <nav
      aria-label="Navegación administrativa"
      className="bg-surface flex h-15 w-full items-center justify-between gap-4 px-5 backdrop-blur lg:px-6"
    >
      <AdminSidebarToggle isExpanded={!collapseSidebar} onToggle={toggleSidebar} />
      <div className="flex items-center gap-6">
        <AdminNotificationsButton />
        <span className="h-8 w-px bg-stroke block" />
        <AdminUserInfo name={displayName} />
      </div>
    </nav>
  );
};
