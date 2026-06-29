"use client";
import type { ReactElement } from "react";
import { motion } from "framer-motion";

interface SliderHomeDotsProps {
  total: number;
  current: number;
  goTo: (index: number) => void;
}

export const SliderHomeDots = ({
  total,
  current,
  goTo,
}: SliderHomeDotsProps): ReactElement => (
  <div className="flex items-center gap-1">
    {Array.from({ length: total }, (_, index) => (
      <motion.span
        key={index}
        onClick={() => goTo(index)}
        className="cursor-pointer rounded-full"
        animate={{
          width: index === current ? 20 : 10,
          backgroundColor:
            index === current ? "#ffffff" : "var(--color-body)",
        }}
        transition={{ duration: 0.25 }}
        style={{ height: 4 }}
      />
    ))}
  </div>
);