import type { ReactElement } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface StatBarProps {
  label: string;
  image: string;
  value: number;
  count: string | number;
  isActive?: boolean;
  onClick?: () => void;
}

export const StatBar = ({
  label,
  image,
  value,
  count,
  isActive,
  onClick,
}: StatBarProps): ReactElement => {
  const displayCount = count;
  const displayValue = value;

  return (
    <motion.div
      className="flex cursor-pointer flex-col items-center gap-2 transition-opacity"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={isActive ? { scale: 1.05 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="h-10 w-10">
        <Image
          src={image}
          alt={label}
          width={200}
          height={200}
          className="h-full w-full object-scale-down transition-all duration-300"
          style={isActive ? { filter: "brightness(0) invert(1)" } : {}}
        />
      </div>
      <p
        className={`text-xs font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-white/50"}`}
      >
        {label}
      </p>
      <div className="bg-surface border-stroke relative h-2.5 w-17.5 overflow-hidden rounded-xs">
        <span
          className={`block h-full transition-all duration-500 ease-out ${isActive ? "bg-white" : "bg-stroke"}`}
          style={{ width: `${displayValue}%` }}
        />
      </div>
      <p
        className={`text-xs font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-white/50"}`}
      >
        {displayCount}
      </p>
    </motion.div>
  );
};
