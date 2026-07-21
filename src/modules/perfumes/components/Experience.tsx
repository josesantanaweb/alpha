"use client";
import { useState, type ReactElement } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WhenToUse } from "./WhenToUse";
import { Longevity } from "./Longevity";
import { Projection } from "./Projection";

export const Experience = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-stroke flex flex-col gap-6 border-b py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h3 className="text-lg font-bold text-white">Experiencia olfativa</h3>
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
            <div className="flex flex-col gap-6">
              <WhenToUse />
              <Longevity />
              <Projection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
