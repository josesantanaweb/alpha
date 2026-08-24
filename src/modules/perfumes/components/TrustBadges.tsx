"use client";

import type { ReactElement } from "react";
import { BadgeCheck, Sparkles, Truck } from "lucide-react";

const BADGES = [
  {
    icon: BadgeCheck,
    title: "Perfumes 100 % auténticos",
    description:
      "Fragancias originales, decantadas con mimo de frascos de lujo reales.",
  },
  {
    icon: Truck,
    title: "Envío gratis a partir de $75",
    description: "Tu pedido llega rápido desde Valencia, sin costes.",
  },
  {
    icon: Sparkles,
    title: "Descubre antes de decidir",
    description:
      "Llévala primero en tu piel y decide después si merece el frasco completo.",
  },
];

export const TrustBadges = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3.5">
      {BADGES.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.title}
            className="bg-surface border-stroke flex h-20 w-full items-center gap-3 rounded-2xl border p-3"
          >
            <div className="flex items-start gap-3">
              <Icon size={20} className="mt-0.5 text-white" />
              <div className="flex flex-col items-start">
                <h4 className="text-base font-semibold text-white">
                  {badge.title}
                </h4>
                <p className="text-body text-sm">{badge.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
