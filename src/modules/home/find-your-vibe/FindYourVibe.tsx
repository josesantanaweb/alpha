"use client";
import type { ReactElement } from "react";
import { useTags } from "@/hooks";
import { FindYourVibeItem } from "./FindYourVibeItem";
import { FindYourVibeSkeleton } from "./FindYourVibeSkeleton";

export const FindYourVibe = (): ReactElement => {
  const { data: tags = [], isLoading } = useTags();
  const homeTags = tags.filter((tag) => tag.showInHome);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start">
        <h5 className="text-lg font-semibold text-white">Encuentra tu vibra</h5>
        <p className="text-body text-sm">
          Las mejores selecciones para cada momento
        </p>
      </div>

      {isLoading && <FindYourVibeSkeleton />}

      {!isLoading && homeTags.length && (
        <div className="flex max-w-full gap-5 overflow-x-scroll pr-10">
          {homeTags.map((tag) => (
            <FindYourVibeItem key={tag.id} {...tag} />
          ))}
        </div>
      )}
    </div>
  );
};
