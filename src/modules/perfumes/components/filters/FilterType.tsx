"use client";
import type { ReactElement } from "react";
import { Badge } from "@/modules/shared/components/ui";

const TYPES = [
  { label: "Árabe", value: "ARABIC" },
  { label: "Diseñador", value: "DESIGNER" },
  { label: "Nicho", value: "NICHE" },
];

interface FilterTypeProps {
  value: string | null;
  onChange: (v: string | null) => void;
}

export const FilterType = ({
  value,
  onChange,
}: FilterTypeProps): ReactElement => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-base font-semibold text-white">Tipo</h4>
      <div className="flex items-center gap-2">
        {TYPES.map((t) => (
          <Badge
            key={t.value}
            label={t.label}
            active={value === t.value}
            onClick={() => onChange(value === t.value ? null : t.value)}
          />
        ))}
      </div>
    </div>
  );
};
