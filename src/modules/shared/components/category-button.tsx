"use client";

import type { ReactElement, ReactNode } from "react";
import * as Icons from "lucide-react";
import { LayoutDashboard, type LucideIcon } from "lucide-react";

interface CategoryButtonProps {
  text: string;
  onClick?: () => void;
  icon?: ReactNode | LucideIcon | string;
}

export const CategoryButton = ({
  text,
  onClick,
  icon,
}: CategoryButtonProps): ReactElement => {
  const renderIcon = () => {
    if (typeof icon === "string") {
      const Icon = (Icons as unknown as Record<string, LucideIcon>)[icon];
      return Icon ? <Icon size={20} /> : <LayoutDashboard size={20} />;
    }

    if (typeof icon === "function") {
      const Icon = icon as LucideIcon;
      return <Icon size={20} />;
    }

    if (icon !== undefined) {
      return icon;
    }

    return <LayoutDashboard size={20} />;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 cursor-pointer flex-col items-center justify-center"
    >
      <div className="border-stroke flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium text-white transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
        {renderIcon()}
      </div>
      <span className="mt-1 block text-sm font-semibold text-white transition-colors duration-200 group-hover:text-white">
        {text}
      </span>
    </button>
  );
};
