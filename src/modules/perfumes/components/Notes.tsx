import type { ReactElement } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { CollapsibleSection } from "@/modules/shared/components";

interface Note {
  name: string;
  image: string;
}

interface NoteCategory {
  title: string;
  notes: Note[];
}

const NOTES: NoteCategory[] = [
  {
    title: "Notas de salida",
    notes: [{ name: "Mandarina", image: "/images/mandarina.png" }, { name: "Moscada", image: "/images/moscada.png" }],
  },
  {
    title: "Notas de corazón",
    notes: [{ name: "Moscada", image: "/images/moscada.png" }],
  },
  {
    title: "Notas de fondo",
    notes: [{ name: "Vainilla", image: "/images/vainilla.png" }],
  },
];

export const Notes = (): ReactElement => {
  return (
    <CollapsibleSection title="Notas destacadas" defaultOpen={true}>
      <div className="flex flex-col gap-5">
        {NOTES.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <h6 className="text-xs font-semibold uppercase">
                {category.title}
              </h6>
              <button className="text-white">
                <Info size={14} />
              </button>
            </div>
            <div className="flex w-full flex-wrap gap-3">
              {category.notes.map((note) => (
                <div
                  key={note.name}
                  className="bg-surface border-stroke flex h-22 w-22 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border"
                >
                  <div className="h-10 w-10">
                    <Image
                      src={note.image}
                      alt={note.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-scale-down"
                    />
                  </div>
                  <p className="text-xs text-white font-semibold">{note.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};
