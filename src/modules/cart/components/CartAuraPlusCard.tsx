"use client";

import type { ReactElement } from "react";
import { Button } from "@/modules/shared/components/ui";

export const CartAuraPlusCard = (): ReactElement => {
  return (
    <div className="bg-surface border-stroke flex flex-col gap-6 rounded-lg border p-5">
      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-bold text-white">Quieres ahorrar un 10%</h4>
        <p className="text-body text-sm">
          Unete a <b className="font-bold text-white">AURA+</b> y recibe
          beneficios exclusivos en tu priemera compra{" "}
        </p>
      </div>
      <Button variant="outline">únete</Button>
    </div>
  );
};
