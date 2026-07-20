"use client";
import type { ReactElement } from "react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/modules/shared/components/ui";
import { FilterGender } from "./FilterGender";
import { FilterType } from "./FilterType";
import { FilterDesigner } from "./FilterDesigner";
import { FilterPrice } from "./FilterPrice";
import { FilterSizes } from "./FilterSizes";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
}

export const FilterSheet = ({
  open,
  onClose,
}: FilterSheetProps): ReactElement => {
  return (
    <Suspense fallback={null}>
      <FilterSheetContent open={open} onClose={onClose} />
    </Suspense>
  );
};

const FilterSheetContent = ({
  open,
  onClose,
}: FilterSheetProps): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gender, setGender] = useState<string | null>(
    searchParams.get("gender"),
  );
  const [type, setType] = useState<string | null>(
    searchParams.get("type"),
  );
  const [designer, setDesigner] = useState<string | null>(
    searchParams.get("designer"),
  );
  const [priceMin, setPriceMin] = useState<string>(
    searchParams.get("priceMin") ?? "",
  );
  const [priceMax, setPriceMax] = useState<string>(
    searchParams.get("priceMax") ?? "",
  );

  const hasActiveFilters = !!(gender || type || designer || priceMin || priceMax);

  const handleApply = () => {
    const params = new URLSearchParams();
    if (gender) params.set("gender", gender);
    if (type) params.set("type", type);
    if (designer) params.set("designer", designer);
    if (priceMin) params.set("priceMin", priceMin);
    if (priceMax) params.set("priceMax", priceMax);
    const qs = params.toString();
    router.push(qs ? `/explorer?${qs}` : "/explorer");
    onClose();
  };

  const handleClear = () => {
    setGender(null);
    setType(null);
    setDesigner(null);
    setPriceMin("");
    setPriceMax("");
    router.push("/explorer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-60 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="bg-surface fixed right-0 bottom-0 left-0 z-70 mx-auto max-w-md rounded-t-4xl p-6 pt-10"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <span className="bg-body/30 absolute top-5 left-1/2 h-1 w-15 -translate-1/2 rounded-full" />
            <div className="flex w-full flex-col gap-8">
              <h4 className="text-center text-xl font-semibold text-white">
                Filtros
              </h4>

              <div className="flex w-full flex-col justify-start gap-6 max-h-120 overflow-y-scroll">
                <FilterGender value={gender} onChange={setGender} />
                <FilterType value={type} onChange={setType} />
                <FilterDesigner value={designer} onChange={setDesigner} />
                <FilterPrice
                  min={priceMin}
                  max={priceMax}
                  onMinChange={setPriceMin}
                  onMaxChange={setPriceMax}
                />
                <FilterSizes />
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleClear}>
                  Limpiar
                </Button>
                <Button onClick={handleApply} disabled={!hasActiveFilters}>Aplicar</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
