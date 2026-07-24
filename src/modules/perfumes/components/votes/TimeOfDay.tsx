"use client";

import { useState, type ReactElement } from "react";
import type { TimeOfDay as TimeOfDayType } from "@prisma/client";
import { StatBar } from "./StatBar";
import { useTimeVote } from "../../hooks/use-time-vote";

interface TimeOfDayProps {
  perfumeId: string;
  timeOfDay?: TimeOfDayType | null;
}

export const TimeOfDay = ({ perfumeId, timeOfDay }: TimeOfDayProps): ReactElement => {
  const [activeTime, setActiveTime] = useState<string | null>(null);
  const { mutate: voteTime } = useTimeVote();

  const [timeCounts, setTimeCounts] = useState({
    day: timeOfDay?.day || 0,
    night: timeOfDay?.night || 0,
  });

  const totalTimes = timeCounts.day + timeCounts.night;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleTimeVote = (field: "day" | "night", label: string) => {
    if (activeTime === label) {
      setActiveTime(null);
      return;
    }

    setActiveTime(label);

    setTimeCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));

    voteTime({ perfumeId, field });
  };

  const times = [
    {
      label: "Dia",
      field: "day",
      image: "/images/time-of-day/day.svg",
      value: calculatePercentage(timeCounts.day, totalTimes),
      count: timeCounts.day,
    },
    {
      label: "Noche",
      field: "night",
      image: "/images/time-of-day/night.svg",
      value: calculatePercentage(timeCounts.night, totalTimes),
      count: timeCounts.night,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Momento del día</h6>
      </div>
      <div className="flex w-full gap-10">
        {times.map((timeItem) => (
          <StatBar
            key={timeItem.label}
            label={timeItem.label}
            image={timeItem.image}
            value={timeItem.value}
            count={timeItem.count}
            isActive={activeTime === timeItem.label}
            onClick={() => handleTimeVote(timeItem.field, timeItem.label)}
          />
        ))}
      </div>
    </div>
  );
};
