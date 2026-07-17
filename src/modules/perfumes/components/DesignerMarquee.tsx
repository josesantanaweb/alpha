"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DESIGNERS = [
  "versace",
  "dior",
  "xerjoff",
  "gucci",
  "louis-vuitton",
];

export const DesignerMarquee = (): ReactElement => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max gap-6"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {[...DESIGNERS, ...DESIGNERS].map((designer, index) => (
          <div key={`${designer}-${index}`} className="w-12 shrink-0">
            <Image
              src={`/images/${designer}.svg`}
              alt={designer}
              width={300}
              height={300}
              className="h-full w-full"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
