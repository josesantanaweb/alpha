"use client";

import type { ReactElement } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "@/modules/auth/store";
import { Avatar } from "@/modules/shared/components";

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
}

export const AdminNavbar = ({
  title = "Perfumes",
  subtitle = "Administra el catálogo de productos",
}: AdminNavbarProps): ReactElement => {
  const user = useAuth((s) => s.user);

  const displayName = user?.name ?? "Admin";
  const displayEmail = user?.email ?? "admin@aura.com";

  return (
    <nav
      aria-label="Navegación administrativa"
      className="border-stroke bg-canvas/95 flex h-16 w-full items-center justify-between gap-4 border-b px-5 backdrop-blur lg:px-6"
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <p className="text-body text-[10px]">AURA <span className="mx-1 text-stroke">/</span> {subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          title="Notificaciones"
          aria-label="Notificaciones"
          className="border-stroke text-body hover:text-white flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border bg-surface transition-colors"
        >
          <Bell size={15} />
        </button>
        <div className="flex items-center gap-2">
          <Avatar src={user?.avatar} name={displayName} size={30} />
          <div className="hidden flex-col sm:flex">
            <p className="text-xs font-semibold text-white">{displayName}</p>
            <p className="text-body text-[10px]">{displayEmail}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
