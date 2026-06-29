"use client";
import type { ReactElement } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Banner } from "@prisma/client";
import { SliderHomeSkeleton } from "./SliderHomeSkeleton";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

interface SliderHomeProps {
  banners: Banner[];
  loading: boolean;
}

export const SliderHome = ({
  banners,
  loading,
}: SliderHomeProps): ReactElement => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (loading) return <SliderHomeSkeleton />;
  if (!banners.length) return <div />;

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="bg-surface relative flex h-47 w-full items-center gap-3 overflow-hidden rounded-2xl">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={banners[current].image}
              alt={banners[current].title}
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
              <div className="flex flex-col justify-center align-center gap-3 p-6 w-full">
                <div className="flex flex-col">
                  <motion.h4
                    key={`text-${current}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="text-sm text-white uppercase"
                  >
                    {banners[current].text}
                  </motion.h4>
                  <motion.h3
                    key={`title-${current}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-2xl font-semibold text-white uppercase"
                  >
                    {banners[current].title}
                  </motion.h3>
                </div>
                <Link href={banners[current].link}>
                  <motion.button
                    key={`btn-${current}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="text-surface h-10 w-28 cursor-pointer rounded-md bg-white font-semibold"
                  >
                    Explorar
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-1">
        {banners.map((_, index) => (
          <motion.span
            key={index}
            onClick={() => goTo(index)}
            className="rounded-full cursor-pointer"
            animate={{
              width: index === current ? 20 : 10,
              backgroundColor: index === current ? "#ffffff" : "var(--color-body)",
            }}
            transition={{ duration: 0.25 }}
            style={{ height: 4 }}
          />
        ))}
      </div>
    </div>
  );
};
