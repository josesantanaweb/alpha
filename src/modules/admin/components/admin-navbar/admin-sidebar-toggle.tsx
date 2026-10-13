"use client";

import type { ReactElement } from "react";
import { Menu } from "lucide-react";

interface AdminSidebarToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const AdminSidebarToggle = ({
  isExpanded,
  onToggle,
}: AdminSidebarToggleProps): ReactElement => {
  return (
    <button
      type="button"
      title="Menu"
      aria-label="Menu"
      aria-expanded={isExpanded}
      onClick={onToggle}
      className="text-body hover:text-white w-9 flex h-9 cursor-pointer items-center justify-center transition-colors border border-stroke rounded-lg"
    >
      <Menu size={18} />
    </button>
  );
};
