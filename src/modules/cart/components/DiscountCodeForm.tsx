"use client";
import type { ReactElement } from "react";
import { Button, Input } from "@/modules/shared/components/ui";

export const DiscountCodeForm = (): ReactElement => {
  return (
    <div className="flex items-center gap-3">
      <Input placeholder="Código de descuento" className="flex-2 h-10 text-sm" />
      <Button className="flex-1 h-10 text-sm">Aplicar</Button>
    </div>
  );
};
