"use client";

import type { ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/modules/shared/components";

interface AdminUserInfoProps {
  name: string;
}

export const AdminUserInfo = ({ name }: AdminUserInfoProps): ReactElement => {
  return (
    <button className="flex cursor-pointer items-center gap-2">
      <div className="flex items-center gap-4">
        <Avatar name={name} size={35} className="text-surface bg-white" />
        <div className="hidden flex-col sm:flex">
          <p className="text-sm font-semibold text-white">{name}</p>
        </div>
      </div>
      <ChevronDown className="text-white" size={16} />
    </button>
  );
};
