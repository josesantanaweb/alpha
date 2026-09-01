"use client";

import type { ReactElement } from "react";
import { CreditCard, Gift, LogIn, ShieldBan } from "lucide-react";
import { Button } from "@/modules/shared/components/ui";

const ITEMS = [
  {
    icon: LogIn,
    title: "Unete a AURA",
    description:
      "Conviertete en miembro y descubreuna forma mas gratificante de explorar fragancias.",
  },
  {
    icon: CreditCard,
    title: "Tu crédito llega",
    description:
      "Tu membresía mensual de $10 se convierte en crédito de tienda para usar en AURA.",
  },
  {
    icon: Gift,
    title: "Un regalo en cada pedido",
    description:
      "Disfruta de una descubierta olfativa de 2 ml de regalo con cada pedido AURA+.",
  },
  {
    icon: ShieldBan,
    title: "Cancela cuando quieras",
    description:
      "Pausa o cancela tu membresía cuando quieras, directamente desde tu cuenta.",
  },
];

export const AuraPlus = (): ReactElement => {
  return (
    <div className="bg-surface border-stroke flex flex-col rounded-2xl border p-6">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-white">Membresia AURA+</h4>
        <p className="text-body text-sm">Mas fragancias, cada mes.</p>
      </div>
      <div className="mb-6 flex flex-col gap-5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex w-full items-center gap-3">
              <div className="flex items-start gap-3">
                <Icon size={20} className="mt-0.5 shrink-0 text-white" />
                <div className="flex flex-col items-start">
                  <h4 className="text-base font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-body text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="outline">únete</Button>
    </div>
  );
};
