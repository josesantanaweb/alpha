import type { ReactElement } from "react";
import { WhenToUse } from "./WhenToUse";
import { Longevity } from "./Longevity";
import { Projection } from "./Projection";
import { Ranking } from "./Ranking";
import { CollapsibleSection } from "@/modules/shared/components";

export const Experience = (): ReactElement => {
  return (
    <CollapsibleSection title="Experiencia olfativa" defaultOpen={true}>
      <div className="flex flex-col gap-6">
        <WhenToUse />
        <Longevity />
        <Projection />
        <Ranking />
      </div>
    </CollapsibleSection>
  );
};
