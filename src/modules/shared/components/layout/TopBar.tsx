"use client";

import type { ReactElement } from "react";
import { Share } from "lucide-react";
import { BackButton, CartButton } from "@/modules/shared/components";

interface TopBarProps {
  title?: string;
  isCheckout?: boolean;
}

export const TopBar = ({ title, isCheckout }: TopBarProps): ReactElement => (
  <div className="flex w-full justify-between">
    <BackButton />
    {title && <h5 className="text-lg font-semibold text-white">{title}</h5>}
    {!isCheckout ? (
      <div className="flex items-center gap-4">
        <button type="button" className="cursor-pointer text-white">
          <Share size={24} />
        </button>
        <CartButton />
      </div>
    ) : (
      <span />
    )}
  </div>
);
