import type { ReactElement } from "react";

type SizeBadgeProps = {
  size: string;
};

export const SizeBadge = ({ size }: SizeBadgeProps): ReactElement => (
  <div className="bg-surface border-stroke flex h-4.5 w-auto items-center justify-center self-start rounded-sm border px-1">
    <p className="text-body text-xs">{size}</p>
  </div>
);
