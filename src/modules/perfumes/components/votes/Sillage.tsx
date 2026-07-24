"use client";

import { useState, type ReactElement } from "react";
import type { Sillage as SillageType } from "@prisma/client";
import { StatBar } from "./StatBar";
import { useSillageVote } from "../../hooks/use-sillage-vote";

interface SillageProps {
  perfumeId: string;
  sillage?: SillageType | null;
}

export const Sillage = ({ perfumeId, sillage }: SillageProps): ReactElement => {
  const [activeSillage, setActiveSillage] = useState<string | null>(null);
  const { mutate: voteSillage } = useSillageVote();

  const [sillageCounts, setSillageCounts] = useState({
    soft: sillage?.soft || 0,
    moderate: sillage?.moderate || 0,
    heavy: sillage?.heavy || 0,
    huge: sillage?.huge || 0,
  });

  const totalSillage =
    sillageCounts.soft +
    sillageCounts.moderate +
    sillageCounts.heavy +
    sillageCounts.huge;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleSillageVote = (
    field: "soft" | "moderate" | "heavy" | "huge",
    label: string,
  ) => {
    if (activeSillage === label) {
      setActiveSillage(null);
      return;
    }

    setActiveSillage(label);

    setSillageCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));

    voteSillage({ perfumeId, field });
  };

  const sillages = [
    {
      label: "Suave",
      field: "soft",
      image: "/images/sillage/soft.svg",
      value: calculatePercentage(sillageCounts.soft, totalSillage),
      count: sillageCounts.soft,
    },
    {
      label: "Moderada",
      field: "moderate",
      image: "/images/sillage/moderate.svg",
      value: calculatePercentage(sillageCounts.moderate, totalSillage),
      count: sillageCounts.moderate,
    },
    {
      label: "Fuerte",
      field: "heavy",
      image: "/images/sillage/heavy.svg",
      value: calculatePercentage(sillageCounts.heavy, totalSillage),
      count: sillageCounts.heavy,
    },
    {
      label: "Enorme",
      field: "huge",
      image: "/images/sillage/huge.svg",
      value: calculatePercentage(sillageCounts.huge, totalSillage),
      count: sillageCounts.huge,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Estela</h6>
      </div>
      <div className="flex w-full flex-wrap justify-between">
        {sillages.map((sillageItem) => (
          <StatBar
            key={sillageItem.label}
            label={sillageItem.label}
            image={sillageItem.image}
            value={sillageItem.value}
            count={sillageItem.count}
            isActive={activeSillage === sillageItem.label}
            onClick={() => handleSillageVote(sillageItem.field, sillageItem.label)}
          />
        ))}
      </div>
    </div>
  );
};
