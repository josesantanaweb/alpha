"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants";

interface FindYourVibeItemProps {
  description?: string | null;
  name: string;
  image?: string | null;
  slug: string;
}

export const FindYourVibeItem = ({
  name,
  description,
  image,
  slug,
}: FindYourVibeItemProps): ReactElement => (
  <Link
    href={`${ROUTES.EXPLORER}?tag=${slug}`}
    className="bg-surface relative block h-81.5 w-64 shrink-0 overflow-hidden rounded-2xl"
  >
    {image && (
      <motion.div
        className="h-full w-full"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="h-full w-full object-cover grayscale-70"
        />
      </motion.div>
    )}
    <div className="absolute top-0 left-0 z-50 flex h-full w-full items-end bg-linear-to-t from-neutral-900 to-transparent p-5 pointer-events-none">
      <div className="flex flex-col">
        <h4 className="text-lg font-bold text-white">{name}</h4>
        {description && (
          <p className="text-body text-base">{description}</p>
        )}
      </div>
    </div>
  </Link>
);
