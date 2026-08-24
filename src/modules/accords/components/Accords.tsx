import type { ReactElement } from "react";
import { Accord } from "@prisma/client";
import { Search } from "lucide-react";
import { CollapsibleSection } from "@/modules/shared/components";
import { Button } from "@/modules/shared/components/ui";

interface AccordBarProps {
  name: string;
  percentage: number;
}

const AccordBar = ({ name, percentage }: AccordBarProps): ReactElement => (
  <div className="bg-surface border-stroke relative h-10 w-full overflow-hidden rounded-md border">
    <span
      className="bg-stroke block h-full"
      style={{ width: `${percentage}%` }}
    />
    <p className="absolute top-3 left-3 text-xs text-white uppercase">{name}</p>
  </div>
);

export interface PerfumeAccordData {
  percentage: number;
  accord: Accord;
}

interface AccordsProps {
  accords: PerfumeAccordData[];
}

export const Accords = ({ accords }: AccordsProps): ReactElement => {
  if (!accords || accords.length === 0) return <></>;

  const sortedAccords = [...accords].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <CollapsibleSection title="Acordes principales" defaultOpen={false}>
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center gap-2.5">
          {sortedAccords.map((a) => (
            <AccordBar
              key={a.accord.name}
              name={a.accord.name}
              percentage={a.percentage}
            />
          ))}
        </div>
        <Button variant="outline">
          <Search size={16} />
          Buscar por acordes similares
        </Button>
      </div>
    </CollapsibleSection>
  );
};
