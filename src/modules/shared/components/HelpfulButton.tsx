"use client";

import type { ReactElement } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface HelpfulButtonProps {
  direction: "up" | "down";
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const HelpfulButton = ({
  direction,
  label,
  active = false,
  onClick,
}: HelpfulButtonProps): ReactElement => {
  const Icon = direction === "up" ? ThumbsUp : ThumbsDown;

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 text-sm ${
        active ? "text-white" : "text-body hover:text-white"
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
};