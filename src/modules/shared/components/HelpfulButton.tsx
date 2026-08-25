"use client";

import type { ReactElement } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface HelpfulButtonProps {
  direction: "up" | "down";
  label: string;
  count?: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const HelpfulButton = ({
  direction,
  label,
  count,
  active = false,
  disabled = false,
  onClick,
}: HelpfulButtonProps): ReactElement => {
  const Icon = direction === "up" ? ThumbsUp : ThumbsDown;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer items-center gap-2 text-sm disabled:opacity-50 ${
        active ? "text-white" : "text-body hover:text-white"
      }`}
    >
      <Icon size={14} />
      {label}
      {typeof count === "number" && count > 0 && (
        <span className="text-xs">{count}</span>
      )}
    </button>
  );
};