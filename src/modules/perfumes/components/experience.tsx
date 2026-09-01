import type { ReactElement } from "react";
import type {
  Feeling as FeelingType,
  Longevity as LongevityType,
  Projection as ProjectionType,
  Season as SeasonType,
  Sillage as SillageType,
  TimeOfDay as TimeOfDayType,
} from "@prisma/client";
import { CollapsibleSection } from "@/modules/shared/components";
import { VoteCategory } from "@/modules/perfumes/types";
import {
  FEELING_OPTIONS,
  LONGEVITY_OPTIONS,
  PROJECTION_OPTIONS,
  SEASON_OPTIONS,
  SILLAGE_OPTIONS,
  TIME_OF_DAY_OPTIONS,
} from "./votes/vote-options";
import { VoteSection } from "./votes/vote-section";

interface ExperienceProps {
  perfumeId: string;
  season?: SeasonType | null;
  timeOfDay?: TimeOfDayType | null;
  longevity?: LongevityType | null;
  feeling?: FeelingType | null;
  sillage?: SillageType | null;
  projection?: ProjectionType | null;
}

export const Experience = ({
  perfumeId,
  season,
  timeOfDay,
  longevity,
  feeling,
  sillage,
  projection,
}: ExperienceProps): ReactElement => {
  return (
    <CollapsibleSection title="Experiencia olfativa" defaultOpen={true}>
      <div className="flex flex-col gap-6">
        <VoteSection
          title="Clima / Estación"
          category={VoteCategory.Season}
          perfumeId={perfumeId}
          options={SEASON_OPTIONS}
          data={season}
        />

        <VoteSection
          title="Momento del día"
          category={VoteCategory.TimeOfDay}
          perfumeId={perfumeId}
          options={TIME_OF_DAY_OPTIONS}
          data={timeOfDay}
        />

        <VoteSection
          title="Longevidad"
          category={VoteCategory.Longevity}
          perfumeId={perfumeId}
          options={LONGEVITY_OPTIONS}
          data={longevity}
        />

        <VoteSection
          title="Estela"
          category={VoteCategory.Sillage}
          perfumeId={perfumeId}
          options={SILLAGE_OPTIONS}
          data={sillage}
        />

        <VoteSection
          title="Proyección"
          category={VoteCategory.Projection}
          perfumeId={perfumeId}
          options={PROJECTION_OPTIONS}
          data={projection}
        />

        <VoteSection
          title="Sentimiento"
          category={VoteCategory.Feeling}
          perfumeId={perfumeId}
          options={FEELING_OPTIONS}
          data={feeling}
        />
      </div>
    </CollapsibleSection>
  );
};
