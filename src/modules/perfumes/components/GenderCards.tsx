"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants";

const GENDERS = [
  { image: "/images/men.png", alt: "men", label: "Hombre", param: "MALE" },
  { image: "/images/women.png", alt: "women", label: "Mujer", param: "FEMALE" },
];

export const GenderCards = (): ReactElement => {
  return (
    <div className="flex items-center gap-5">
      {GENDERS.map((gender) => (
        <Link
          key={gender.alt}
          href={`${ROUTES.EXPLORER}?gender=${gender.param}`}
          className="bg-surface group relative block h-46.5 w-46.5 cursor-pointer overflow-hidden rounded-2xl"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={gender.image}
                alt={gender.alt}
                height={400}
                width={400}
                className="h-full w-full object-contain"
              />
              <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/50" />
            </motion.div>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 z-20 flex h-full w-full flex-col items-center justify-center">
            <h6 className="text-sm text-white">Perfume para</h6>
            <h5 className="text-lg font-bold text-white">{gender.label}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
};
