"use client";

import type { ReactElement } from "react";
import { ASSETS } from "@/constants";
import Image from "next/image";

interface AdminBrandProps {
  collapse: boolean;
}

export const AdminBrand = ({ collapse }: AdminBrandProps): ReactElement => (
  <div className="flex items-center gap-2 justify-center h-15">
    <Image
      src={collapse ? ASSETS.IMAGES.LOGO_SMALL : ASSETS.IMAGES.LOGO }
      alt="Aura"
      width={collapse ? 20 : 80}
      height={collapse ? 20 : 24}
      className="object-contain"
    />
  </div>
);
