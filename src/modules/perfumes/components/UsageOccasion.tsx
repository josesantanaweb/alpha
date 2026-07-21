"use client";
import { useState, type ReactElement } from "react";
import { StatBar } from "./StatBar";
import { useSeasonVote } from "../hooks/use-season-vote";
import { useTimeVote } from "../hooks/use-time-vote";
import type { Season, TimeOfDay } from "@prisma/client";

interface UsageOccasionProps {
  perfumeId: string;
  season?: Season | null;
  timeOfDay?: TimeOfDay | null;
}

export const UsageOccasion = ({ perfumeId, season, timeOfDay }: UsageOccasionProps): ReactElement => {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState<string | null>(null);

  const { mutate: voteSeason } = useSeasonVote();
  const { mutate: voteTime } = useTimeVote();

  const [seasonCounts, setSeasonCounts] = useState({
    winter: season?.winter || 0,
    summer: season?.summer || 0,
  });

  const [timeCounts, setTimeCounts] = useState({
    day: timeOfDay?.day || 0,
    night: timeOfDay?.night || 0,
  });

  const totalSeasons = seasonCounts.winter + seasonCounts.summer;
  const totalTimes = timeCounts.day + timeCounts.night;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleSeasonVote = (field: "winter" | "summer", label: string) => {
    if (activeSeason === label) {
      setActiveSeason(null);
      return;
    }

    setActiveSeason(label);

    setSeasonCounts(prev => ({
      ...prev,
      [field]: prev[field] + 1
    }));

    voteSeason({ perfumeId, field });
  };

  const handleTimeVote = (field: "day" | "night", label: string) => {
    if (activeTime === label) {
      setActiveTime(null);
      return;
    }

    setActiveTime(label);

    setTimeCounts(prev => ({
      ...prev,
      [field]: prev[field] + 1
    }));

    voteTime({ perfumeId, field });
  };

  const SEASONS = [
    { label: "Invierno", field: "winter", image: "/images/winter.svg", value: calculatePercentage(seasonCounts.winter, totalSeasons), count: seasonCounts.winter },
    { label: "Verano", field: "summer", image: "/images/summer.svg", value: calculatePercentage(seasonCounts.summer, totalSeasons), count: seasonCounts.summer },
  ] as const;

  const TIMES = [
    { label: "Dia", field: "day", image: "/images/day.svg", value: calculatePercentage(timeCounts.day, totalTimes), count: timeCounts.day },
    { label: "Noche", field: "night", image: "/images/night.svg", value: calculatePercentage(timeCounts.night, totalTimes), count: timeCounts.night },
  ] as const;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <h6 className="text-xs font-semibold uppercase">Clima / Estación</h6>
        </div>
        <div className="flex w-full gap-6">
          {SEASONS.map((s) => (
            <StatBar
              key={s.label}
              label={s.label}
              image={s.image}
              value={s.value}
              count={s.count}
              isActive={activeSeason === s.label}
              onClick={() => handleSeasonVote(s.field, s.label)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <h6 className="text-xs font-semibold uppercase">Momento del día</h6>
        </div>
        <div className="flex w-full gap-6">
          {TIMES.map((t) => (
            <StatBar
              key={t.label}
              label={t.label}
              image={t.image}
              value={t.value}
              count={t.count}
              isActive={activeTime === t.label}
              onClick={() => handleTimeVote(t.field, t.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
