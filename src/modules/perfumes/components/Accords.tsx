"use client";
import { useState, type ReactElement } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

const ACCORDS = [
  { name: "Amaderado", percentage: 80 },
  { name: "Cítrico", percentage: 60 },
  { name: "Dulce", percentage: 45 },
  { name: "Ambarado", percentage: 30 },
  { name: "Fresco", percentage: 20 },
];

export const Accords = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-stroke flex flex-col gap-3 border-b py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h3 className="text-lg font-bold text-white">Acordes principales</h3>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center gap-5 w-full">
              <div className="flex flex-col items-center gap-2.5 w-full">
                {ACCORDS.map((accord) => (
                  <AccordBar
                    key={accord.name}
                    name={accord.name}
                    percentage={accord.percentage}
                  />
                ))}
              </div>
              <Button variant="outline">Buscar por acordes similares</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
