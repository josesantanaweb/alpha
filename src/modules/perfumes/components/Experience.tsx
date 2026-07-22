import type { ReactElement } from "react";
import type {
  Longevity as LongevityType,
  Season as SeasonType,
  TimeOfDay as TimeOfDayType,
} from "@prisma/client";
import { Longevity } from "./Longevity";
import { Projection } from "./Projection";
import { Ranking } from "./Ranking";
import { Season } from "./Season";
import { TimeOfDay } from "./TimeOfDay";
import { CollapsibleSection } from "@/modules/shared/components";

interface ExperienceProps {
  perfumeId: string;
  season?: SeasonType | null;
  timeOfDay?: TimeOfDayType | null;
  longevity?: LongevityType | null;
}

export const Experience = ({
  perfumeId,
  season,
  timeOfDay,
  longevity,
}: ExperienceProps): ReactElement => {
  return (
    <CollapsibleSection title="Experiencia olfativa" defaultOpen={true}>
      <div className="flex flex-col gap-6">
        <Season perfumeId={perfumeId} season={season} />
        <TimeOfDay perfumeId={perfumeId} timeOfDay={timeOfDay} />
        <Longevity perfumeId={perfumeId} longevity={longevity} />
        <Projection />
        <Ranking />
      </div>
    </CollapsibleSection>
  );
};
