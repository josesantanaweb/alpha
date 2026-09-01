"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { AccountMenuItem as AccountMenuItemConfig } from "@/constants";
import { cn } from "@/modules/shared/utils";

interface AccountMenuItemProps {
  item: AccountMenuItemConfig;
  onClick?: () => void;
}

export const AccountMenuItem = ({
  item,
  onClick,
}: AccountMenuItemProps): ReactElement => {
  const Icon = item.icon;

  const content = (
    <>
      <div className="flex items-center gap-3">
        <Icon size={16} />
        <p className="text-sm">{item.label}</p>
      </div>
      {!item.danger && <ChevronRight size={18} className="text-white"/>}
    </>
  );

  const classes = cn(
    "flex w-full items-center justify-between p-3.5 cursor-pointer bg-surface hover:bg-surface/80",
    item.danger
      ? "text-error"
      : "text-white"
  );

  if (item.href) {
    return (
      <Link href={item.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
