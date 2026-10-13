"use client";

import type { ReactElement } from "react";
import { Bell } from "lucide-react";

interface AdminNotificationsButtonProps {
  count?: number;
}

export const AdminNotificationsButton = ({
  count = 2,
}: AdminNotificationsButtonProps): ReactElement => {
  return (
    <button
      type="button"
      title="Notificaciones"
      aria-label="Notificaciones"
      className="text-body hover:text-white cursor-pointer transition-colors relative"
    >
      <Bell size={18} />
      {count > 0 && (
        <span className="flex items-center text-[10px] justify-center w-3.5 h-3.5 rounded-full text-surface bg-white absolute -top-1.5 -right-1.5 font-semibold">
          {count}
        </span>
      )}
    </button>
  );
};
