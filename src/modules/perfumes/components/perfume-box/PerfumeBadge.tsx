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
    <p className="text-canvas rounded-md bg-white px-1.5 py-0.5 text-[10px]">
      {label}
    </p>
  );
};
