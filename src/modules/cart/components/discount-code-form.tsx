"use client";

import { useState, type ReactElement } from "react";
import { Button, Input } from "@/modules/shared/components/ui";

type DiscountCodeFormProps = {
  value?: string;
  onApply: (code: string) => void;
};

export const DiscountCodeForm = ({
  value = "",
  onApply,
}: DiscountCodeFormProps): ReactElement => {
  const [code, setCode] = useState(value);

  const handleApply = () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    onApply(trimmed);
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código de descuento"
        className="h-10 flex-2 text-sm"
      />
      <Button
        onClick={handleApply}
        disabled={!code.trim()}
        className="h-10 flex-1 text-sm"
      >
        Aplicar
      </Button>
    </div>
  );
};
