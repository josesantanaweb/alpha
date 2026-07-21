import type { ReactElement } from "react";
import { CollapsibleSection } from "@/modules/shared/components";

interface AboutPerfumeProps {
  description: string;
}

export const AboutPerfume = ({
  description,
}: AboutPerfumeProps): ReactElement => {
  return (
    <CollapsibleSection title="Sobre este perfume" defaultOpen={false}>
      <p className="text-body text-sm text-justify">{description}</p>
    </CollapsibleSection>
  );
};
