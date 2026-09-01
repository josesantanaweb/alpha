"use client";

import type { ReactElement } from "react";
import { cn } from "@/modules/shared/utils/cn";

interface BadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const Badge = ({
  label,
  active = false,
  onClick,
}: BadgeProps): ReactElement => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-stroke flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-medium uppercase transition-colors",
        active ? "text-surface border-white bg-white" : "bg-surface text-white"
      )}
    >
      {label}
    </button>
  );
};
