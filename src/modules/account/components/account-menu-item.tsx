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
      {item.disabled ? (
        <span className="text-body border-stroke bg-background rounded-full border px-2 py-0.5 text-[10px] uppercase">
          Próximamente
        </span>
      ) : (
        !item.danger && <ChevronRight size={18} className="text-white" />
      )}
    </>
  );

  const classes = cn(
    "flex w-full items-center justify-between p-3.5 bg-surface",
    item.disabled
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer hover:bg-surface/80",
    item.danger ? "text-error" : "text-white"
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
