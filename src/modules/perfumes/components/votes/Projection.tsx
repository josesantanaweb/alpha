"use client";

import { useState, type ReactElement } from "react";
import type { Sillage as SillageType } from "@prisma/client";
import { StatBar } from "./StatBar";
import { useSillageVote } from "../../hooks/use-sillage-vote";

interface ProjectionProps {
  perfumeId: string;
  sillage?: SillageType | null;
}

export const Projection = ({ perfumeId, sillage }: ProjectionProps): ReactElement => {
  const [activeProjection, setActiveProjection] = useState<string | null>(null);
  const { mutate: voteSillage } = useSillageVote();

  const [projectionCounts, setProjectionCounts] = useState({
    soft: sillage?.soft || 0,
    moderate: sillage?.moderate || 0,
    heavy: sillage?.heavy || 0,
    huge: sillage?.huge || 0,
  });

  const totalProjection =
    projectionCounts.soft +
    projectionCounts.moderate +
    projectionCounts.heavy +
    projectionCounts.huge;

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const handleProjectionVote = (
    field: "soft" | "moderate" | "heavy" | "huge",
    label: string,
  ) => {
    if (activeProjection === label) {
      setActiveProjection(null);
      return;
    }

    setActiveProjection(label);

    setProjectionCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));

    voteSillage({ perfumeId, field });
  };

  const projections = [
    {
      label: "Suave",
      field: "soft",
      image: "/images/projection/afable.svg",
      value: calculatePercentage(projectionCounts.soft, totalProjection),
      count: projectionCounts.soft,
    },
    {
      label: "Moderado",
      field: "moderate",
      image: "/images/projection/moderate.svg",
      value: calculatePercentage(projectionCounts.moderate, totalProjection),
      count: projectionCounts.moderate,
    },
    {
      label: "Fuerte",
      field: "heavy",
      image: "/images/projection/strong.svg",
      value: calculatePercentage(projectionCounts.heavy, totalProjection),
      count: projectionCounts.heavy,
    },
    {
      label: "Enorme",
      field: "huge",
      image: "/images/projection/huge.svg",
      value: calculatePercentage(projectionCounts.huge, totalProjection),
      count: projectionCounts.huge,
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h6 className="text-xs font-semibold uppercase">Proyección</h6>
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {projections.map((projection) => (
          <StatBar
            key={projection.label}
            label={projection.label}
            image={projection.image}
            value={projection.value}
            count={projection.count}
            isActive={activeProjection === projection.label}
            onClick={() => handleProjectionVote(projection.field, projection.label)}
          />
        ))}
      </div>
    </div>
  );
};