"use client";

import { useState, type ReactElement } from "react";
import type { Feeling as FeelingType } from "@prisma/client";
import { StatBar } from "./StatBar";
import { useFeelingVote } from "../../hooks/use-feeling-vote";

interface FeelingProps {
  perfumeId: string;
  feeling?: FeelingType | null;
}

export const Feeling = ({ perfumeId, feeling }: FeelingProps): ReactElement => {
  const [activeFeeling, setActiveFeeling] = useState<string | null>(null);
  const { mutate: voteFeeling } = useFeelingVote();

  const [feelingCounts, setFeelingCounts] = useState({
    hate: feeling?.hate || 0,
    dislike: feeling?.dislike || 0,
    like: feeling?.like || 0,
    love: feeling?.love || 0,
  });

  const totalFeelings =
    feelingCounts.hate +
    feelingCounts.dislike +
    feelingCounts.like +
    feelingCounts.love;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleFeelingVote = (
    field: "hate" | "dislike" | "like" | "love",
    label: string,
  ) => {
    if (activeFeeling === label) {
      setActiveFeeling(null);
      return;
    }

    setActiveFeeling(label);

    setFeelingCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));

    voteFeeling({ perfumeId, field });
  };

  const feelings = [
    {
      label: "La odio",
      field: "hate",
      image: "/images/hate.svg",
      value: calculatePercentage(feelingCounts.hate, totalFeelings),
      count: feelingCounts.hate,
    },
    {
      label: "No me gusta",
      field: "dislike",
      image: "/images/dont-like.svg",
      value: calculatePercentage(feelingCounts.dislike, totalFeelings),
      count: feelingCounts.dislike,
    },
    {
      label: "Me gusta",
      field: "like",
      image: "/images/like.svg",
      value: calculatePercentage(feelingCounts.like, totalFeelings),
      count: feelingCounts.like,
    },
    {
      label: "Me encanta",
      field: "love",
      image: "/images/love.svg",
      value: calculatePercentage(feelingCounts.love, totalFeelings),
      count: feelingCounts.love,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Sentimiento</h6>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {feelings.map((feelingItem) => (
          <StatBar
            key={feelingItem.label}
            label={feelingItem.label}
            image={feelingItem.image}
            value={feelingItem.value}
            count={feelingItem.count}
            isActive={activeFeeling === feelingItem.label}
            onClick={() => handleFeelingVote(feelingItem.field, feelingItem.label)}
          />
        ))}
      </div>
    </div>
  );
};