"use client";

import { useState, type ReactElement } from "react";
import type { Season as SeasonType } from "@prisma/client";
import { StatBar } from "./StatBar";
import { useSeasonVote } from "../../hooks/use-season-vote";

interface SeasonProps {
  perfumeId: string;
  season?: SeasonType | null;
}

export const Season = ({ perfumeId, season }: SeasonProps): ReactElement => {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const { mutate: voteSeason } = useSeasonVote();

  const [seasonCounts, setSeasonCounts] = useState({
    winter: season?.winter || 0,
    spring: season?.spring || 0,
    summer: season?.summer || 0,
    autumn: season?.autumn || 0,
  });

  const totalSeasons =
    seasonCounts.winter +
    seasonCounts.spring +
    seasonCounts.summer +
    seasonCounts.autumn;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleSeasonVote = (
    field: "winter" | "spring" | "summer" | "autumn",
    label: string,
  ) => {
    if (activeSeason === label) {
      setActiveSeason(null);
      return;
    }

    setActiveSeason(label);

    setSeasonCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));

    voteSeason({ perfumeId, field });
  };

  const seasons = [
    {
      label: "Invierno",
      field: "winter",
      image: "/images/winter.svg",
      value: calculatePercentage(seasonCounts.winter, totalSeasons),
      count: seasonCounts.winter,
    },
    {
      label: "Primavera",
      field: "spring",
      image: "/images/spring.svg",
      value: calculatePercentage(seasonCounts.spring, totalSeasons),
      count: seasonCounts.spring,
    },
    {
      label: "Verano",
      field: "summer",
      image: "/images/summer.svg",
      value: calculatePercentage(seasonCounts.summer, totalSeasons),
      count: seasonCounts.summer,
    },
    {
      label: "Otoño",
      field: "autumn",
      image: "/images/autumn.svg",
      value: calculatePercentage(seasonCounts.autumn, totalSeasons),
      count: seasonCounts.autumn,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Clima / Estación</h6>
      </div>
      <div className="flex w-full gap-6">
        {seasons.map((seasonItem) => (
          <StatBar
            key={seasonItem.label}
            label={seasonItem.label}
            image={seasonItem.image}
            value={seasonItem.value}
            count={seasonItem.count}
            isActive={activeSeason === seasonItem.label}
            onClick={() => handleSeasonVote(seasonItem.field, seasonItem.label)}
          />
        ))}
      </div>
    </div>
  );
};
