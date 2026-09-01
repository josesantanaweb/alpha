"use client";

import { useState, type ReactElement } from "react";
import { VoteCategory } from "@/modules/perfumes/types";
import { useExperienceVote } from "../../hooks/use-experience-vote";
import { StatBar } from "./stat-bar";
import type { VoteOption } from "./vote-options";

interface VoteSectionProps {
  title: string;
  category: VoteCategory;
  perfumeId: string;
  options: VoteOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any> | null;
}

export const VoteSection = ({
  title,
  category,
  perfumeId,
  options,
  data,
}: VoteSectionProps): ReactElement => {
  const { vote, getUserVote } = useExperienceVote(perfumeId);
  const activeField = getUserVote(category);

  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const opt of options) {
      initial[opt.field] = data?.[opt.field] || 0;
    }
    return initial;
  });

  const total = Object.values(counts).reduce((sum, c) => sum + c, 0);

  const calculatePercentage = (count: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleVote = (field: string) => {
    // Si ya está votado con la misma opción, no hacer nada
    if (activeField === field) return;

    // Actualización optimista de contadores
    setCounts((prev) => {
      const next = { ...prev };
      next[field] = (next[field] || 0) + 1;

      // Decrementar el voto anterior si existía
      if (activeField && next[activeField] !== undefined) {
        next[activeField] = Math.max(0, (next[activeField] || 0) - 1);
      }

      return next;
    });

    vote(category, field);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">{title}</h6>
      </div>
      <div
        className={`flex w-full ${category !== VoteCategory.TimeOfDay ? "justify-between gap-3" : "gap-6"}`}
      >
        {options.map((option) => (
          <StatBar
            key={option.label}
            label={option.label}
            image={option.image}
            value={calculatePercentage(counts[option.field] || 0)}
            count={counts[option.field] || 0}
            isActive={activeField === option.field}
            onClick={() => handleVote(option.field)}
          />
        ))}
      </div>
    </div>
  );
};
