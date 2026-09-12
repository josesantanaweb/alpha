"use client";

import type { ReactElement } from "react";
import { useAuth } from "@/modules/auth/store";
import { Avatar } from "@/modules/shared/components";

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
}

export const AdminNavbar = ({
  title = "Panel",
  subtitle = "Administra el catálogo de Aura",
}: AdminNavbarProps): ReactElement => {
  const user = useAuth((s) => s.user);

  const displayName = user?.name ?? "Admin";
  const displayEmail = user?.email ?? "admin@aura.com";

  return (
    <div className="flex w-full items-center justify-between rounded-lg border border-stroke bg-surface px-4 py-3">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-body text-xs">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Avatar src={user?.avatar} name={displayName} size={36} />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-white">{displayName}</p>
          <p className="text-body text-xs">{displayEmail}</p>
        </div>
      </div>
    </div>
  );
};