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
          href={`${ROUTES.EXPLORER.LIST}?gender=${gender.param}`}
          className="bg-surface h-46.5 w-46.5 rounded-2xl overflow-hidden relative cursor-pointer group block"
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
                className="w-full h-full object-contain"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
            </motion.div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 right-0 z-20 pointer-events-none">
            <h6 className="text-sm text-white">Perfume para</h6>
            <h5 className="text-lg font-bold text-white">{gender.label}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
};
