import type { ReactElement } from "react";
import type {
  Feeling as FeelingType,
  Longevity as LongevityType,
  Season as SeasonType,
  Sillage as SillageType,
  TimeOfDay as TimeOfDayType,
} from "@prisma/client";
import { CollapsibleSection } from "@/modules/shared/components";
import { Longevity } from "./votes/Longevity";
import { Projection } from "./votes/Projection";
import { Feeling } from "./votes/Feeling";
import { Season } from "./votes/Season";
import { TimeOfDay } from "./votes/TimeOfDay";

interface ExperienceProps {
  perfumeId: string;
  season?: SeasonType | null;
  timeOfDay?: TimeOfDayType | null;
  longevity?: LongevityType | null;
  feeling?: FeelingType | null;
  sillage?: SillageType | null;
}

export const Experience = ({
  perfumeId,
  season,
  timeOfDay,
  longevity,
  feeling,
  sillage,
}: ExperienceProps): ReactElement => {
  return (
    <CollapsibleSection title="Experiencia olfativa" defaultOpen={true}>
      <div className="flex flex-col gap-6">
        <Season perfumeId={perfumeId} season={season} />
        <TimeOfDay perfumeId={perfumeId} timeOfDay={timeOfDay} />
        <Longevity perfumeId={perfumeId} longevity={longevity} />
        <Projection perfumeId={perfumeId} sillage={sillage} />
        <Feeling perfumeId={perfumeId} feeling={feeling} />
      </div>
    </CollapsibleSection>
  );
};
