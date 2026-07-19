"use client";
import type { ReactElement } from "react";

interface PerfumeBadgeProps {
  label?: string | null;
}

export const PerfumeBadge = ({
  label,
}: PerfumeBadgeProps): ReactElement | null => {
  if (!label) return null;

  return (
    <p className="text-[10px] text-canvas bg-white rounded-md px-1.5 py-0.5">
      {label}
    </p>
  );
};
