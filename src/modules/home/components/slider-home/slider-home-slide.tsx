"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Banner } from "@prisma/client";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants";
import { Button } from "@/modules/shared/components/ui/button";

interface SliderHomeSlideProps {
  banner: Banner;
}

export const SliderHomeSlide = ({
  banner,
}: SliderHomeSlideProps): ReactElement => {
  const router = useRouter();

  return (
    <Link href={banner.slug} className="block h-full w-full">
      <Image
        src={banner.image}
        alt={banner.title}
        width={300}
        height={300}
        className="h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col items-start justify-center gap-3 p-6">
          <div className="flex flex-col">
            <motion.h4
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-sm text-white uppercase"
            >
              {banner.text}
            </motion.h4>
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-2xl font-semibold text-white uppercase"
            >
              {banner.title}
            </motion.h3>
          </div>
          <Button
            asChild
            size="md"
            fullWidth={false}
            onClick={(e) => {
              e.stopPropagation();
              router.push(ROUTES.EXPLORER);
            }}
          >
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              Explorar
            </motion.button>
          </Button>
        </div>
      </div>
    </Link>
  );
};
