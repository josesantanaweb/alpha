'use client';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  width: number;
}

export const ProgressBar = ({ width }: ProgressBarProps): ReactElement => {
  return (
    <div className="flex justify-start items-center bg-stroke/50 h-3 rounded-full overflow-hidden">
      <motion.div
        className="bg-primary h-full rounded-full"
        style={{ width: `${width}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </div>
  );
};
