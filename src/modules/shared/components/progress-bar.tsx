"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  width: number;
}

export const ProgressBar = ({ width }: ProgressBarProps): ReactElement => {
  return (
    <div className="bg-stroke/50 flex h-3 items-center justify-start overflow-hidden rounded-full">
      <motion.div
        className="bg-primary h-full rounded-full"
        style={{ width: `${width}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </div>
  );
};
