"use client";
import { useState, type ReactElement } from "react";
import type { Longevity as LongevityType } from "@prisma/client";
import { StatBar } from "./StatBar";
import { useLongevityVote } from "../../hooks/use-longevity-vote";

interface LongevityProps {
  perfumeId: string;
  longevity?: LongevityType | null;
}

export const Longevity = ({ perfumeId, longevity }: LongevityProps): ReactElement => {
  const [activeLongevity, setActiveLongevity] = useState<string | null>(null);
  const { mutate: voteLongevity } = useLongevityVote();

  const [longevityCounts, setLongevityCounts] = useState({
    weak: longevity?.weak || 0,
    moderate: longevity?.moderate || 0,
    long: longevity?.long || 0,
    veryLong: longevity?.veryLong || 0,
  });

  const totalLongevityVotes =
    longevityCounts.weak +
    longevityCounts.moderate +
    longevityCounts.long +
    longevityCounts.veryLong;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleLongevityVote = (
    field: "weak" | "moderate" | "long" | "veryLong",
    label: string,
  ) => {
    if (activeLongevity === label) {
      setActiveLongevity(null);
      return;
    }

    setActiveLongevity(label);

    setLongevityCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));

    voteLongevity({ perfumeId, field });
  };

  const longevityOptions = [
    {
      label: "Debil",
      field: "weak",
      image: "/images/weak.svg",
      value: calculatePercentage(longevityCounts.weak, totalLongevityVotes),
      count: longevityCounts.weak,
    },
    {
      label: "Moderado",
      field: "moderate",
      image: "/images/moderate.svg",
      value: calculatePercentage(longevityCounts.moderate, totalLongevityVotes),
      count: longevityCounts.moderate,
    },
    {
      label: "Duradera",
      field: "long",
      image: "/images/long.svg",
      value: calculatePercentage(longevityCounts.long, totalLongevityVotes),
      count: longevityCounts.long,
    },
    {
      label: "Muy duradera",
      field: "veryLong",
      image: "/images/very-long.svg",
      value: calculatePercentage(longevityCounts.veryLong, totalLongevityVotes),
      count: longevityCounts.veryLong,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Longevidad</h6>
      </div>
      <div className="flex w-full gap-3">
        {longevityOptions.map((longevityOption) => (
          <StatBar
            key={longevityOption.label}
            label={longevityOption.label}
            image={longevityOption.image}
            value={longevityOption.value}
            count={longevityOption.count}
            isActive={activeLongevity === longevityOption.label}
            onClick={() => handleLongevityVote(longevityOption.field, longevityOption.label)}
          />
        ))}
      </div>
    </div>
  );
};
