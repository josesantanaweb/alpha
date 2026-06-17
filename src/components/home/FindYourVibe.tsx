'use client';
import type { ReactElement } from 'react';

export const FindYourVibe = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start">
        <h5 className="text-white font-semibold text-lg">Encuentra tu vibra</h5>
        <p className="text-body text-sm">Las mejores selecciones para cada momento</p>
      </div>
      <div className="flex gap-5 overflow-x-scroll max-w-full">
        <div className="relative bg-surface border border-stroke rounded-2xl w-[50%] h-81.5 shrink-0">
          1
        </div>
        <div className="relative bg-surface border border-stroke rounded-2xl w-[50%] h-81.5 shrink-0">
          1
        </div>
      </div>
    </div>
  );
};
