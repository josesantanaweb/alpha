"use client";

import type { ReactElement } from "react";
import { ASSETS } from "@/constants";
import Image from "next/image";

interface AdminBrandProps {
  collapse: boolean;
}

export const AdminBrand = ({ collapse }: AdminBrandProps): ReactElement => (
  <div className="flex items-center gap-2 px-4 py-6">
    <Image
      src={ASSETS.IMAGES.LOGO}
      alt="Aura"
      width={collapse ? 24 : 80}
      height={collapse ? 24 : 24}
      className="object-contain"
    />
  </div>
);
