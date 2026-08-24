"use client";

import type { ReactElement } from "react";
import { useVibes } from "@/modules/vibes/hooks/use-vibes";
import { FindYourVibeItem } from "./FindYourVibeItem";

export const FindYourVibe = (): ReactElement => {
  const { data: vibes = [] } = useVibes();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start">
        <h5 className="text-lg font-semibold text-white">Encuentra tu vibra</h5>
        <p className="text-body text-sm">
          Las mejores selecciones para cada momento
        </p>
      </div>

      <div className="scrollbar-hide flex max-w-full gap-5 overflow-x-scroll pr-2.5">
        {vibes.map((vibe) => (
          <FindYourVibeItem
            key={vibe.id}
            name={vibe.name}
            image={vibe.image}
            description={vibe.description}
            slug={vibe.slug}
          />
        ))}
      </div>
    </div>
  );
};
