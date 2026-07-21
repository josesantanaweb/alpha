import type { ReactElement } from "react";
import { Search } from "lucide-react";
import { Button } from "@/modules/shared/components/ui";
import { CollapsibleSection } from "@/modules/shared/components";

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

const ACCORDS = [
  { name: "Amaderado", percentage: 80 },
  { name: "Cítrico", percentage: 60 },
  { name: "Dulce", percentage: 45 },
  { name: "Ambarado", percentage: 30 },
  { name: "Fresco", percentage: 20 },
];

export const Accords = (): ReactElement => {
  return (
    <CollapsibleSection title="Acordes principales" defaultOpen={false}>
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center gap-2.5">
          {ACCORDS.map((accord) => (
            <AccordBar
              key={accord.name}
              name={accord.name}
              percentage={accord.percentage}
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
