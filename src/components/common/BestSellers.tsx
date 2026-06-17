'use client';
import type { ReactElement } from 'react';

export const BestSellers = (): ReactElement => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h5 className="text-white font-semibold text-lg">Mas vendidos</h5>
        <p className="text-body text-sm cursor-pointer">Ver todos</p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="relative bg-surface border border-stroke rounded-2xl w-full h-46">
          1
        </div>
        <div className="relative bg-surface border border-stroke rounded-2xl w-full h-46">
          1
        </div>
        <div className="relative bg-surface border border-stroke rounded-2xl w-full h-46">
          1
        </div>
      </div>
    </div>
  );
};
