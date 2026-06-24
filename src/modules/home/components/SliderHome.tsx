"use client";
import type { ReactElement } from "react";
import Image from "next/image";
import { ASSETS } from "@/constants";

export const SliderHome = (): ReactElement => (
  <div className="flex flex-col gap-3 items-center">
    <div className="bg-surface relative flex h-47 w-full items-center gap-3 overflow-hidden rounded-2xl">
      <Image
        src={ASSETS.IMAGES.BANNER}
        alt="Banner"
        width={300}
        height={300}
        className="h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <div className="flex flex-col justify-center align-center gap-3 p-6 w-full">
          <div className="flex flex-col">
            <h4 className="text-sm text-white uppercase">Edicion Limitada</h4>
            <h3 className="text-2xl font-semibold text-white uppercase">
              Scandal pour home
            </h3>
          </div>
          <button className="text-surface h-10 w-28 cursor-pointer rounded-md bg-white font-semibold">
            Explorar
          </button>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <span className="h-1 w-5 rounded-full bg-white cursor-pointer" />
      <span className="h-1 w-2.5 rounded-full bg-body cursor-pointer" />
      <span className="h-1 w-2.5 rounded-full bg-body cursor-pointer" />
    </div>
   </div>
);
