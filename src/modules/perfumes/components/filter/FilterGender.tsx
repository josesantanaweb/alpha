"use client";
import type { ReactElement } from "react";
import { Badge } from "@/modules/shared/components/ui";

const GENDERS = [
  { label: "Hombre", value: "MALE" },
  { label: "Mujer", value: "FEMALE" },
  { label: "Unisex", value: "UNISEX" },
];

interface FilterGenderProps {
  value: string | null;
  onChange: (v: string | null) => void;
}

export const FilterGender = ({
  value,
  onChange,
}: FilterGenderProps): ReactElement => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-lg font-semibold text-white">Genero</h4>
      <div className="flex items-center gap-2">
        {GENDERS.map((g) => (
          <Badge
            key={g.value}
            label={g.label}
            active={value === g.value}
            onClick={() => onChange(value === g.value ? null : g.value)}
          />
        ))}
      </div>
    </div>
  );
};
