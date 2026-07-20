"use client";
import { useState, type ReactElement } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface AboutPerfumeProps {
  description: string;
}

export const AboutPerfume = ({
  description,
}: AboutPerfumeProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 border-b border-stroke py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between"
      >
        <h3 className="text-lg font-bold text-white">Sobre este perfume</h3>
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
            <p className="text-body text-sm text-justify">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
