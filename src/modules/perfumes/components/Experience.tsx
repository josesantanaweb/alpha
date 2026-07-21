import type { ReactElement } from "react";
import type { Season as SeasonType, TimeOfDay } from "@prisma/client";
import { UsageOccasion } from "./UsageOccasion";
import { Longevity } from "./Longevity";
import { Projection } from "./Projection";
import { Ranking } from "./Ranking";
import { CollapsibleSection } from "@/modules/shared/components";

interface ExperienceProps {
  perfumeId: string;
  season?: SeasonType | null;
  timeOfDay?: TimeOfDay | null;
}

export const Experience = ({ perfumeId, season, timeOfDay }: ExperienceProps): ReactElement => {
  return (
    <CollapsibleSection title="Experiencia olfativa" defaultOpen={true}>
      <div className="flex flex-col gap-6">
        <UsageOccasion perfumeId={perfumeId} season={season} timeOfDay={timeOfDay} />
        <Longevity />
        <Projection />
        <Ranking />
      </div>
    </CollapsibleSection>
  );
};
