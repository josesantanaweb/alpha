import type { ReactElement } from "react";
import type { Note as NoteType } from "@prisma/client";
import Image from "next/image";
import { Info } from "lucide-react";
import { CollapsibleSection } from "@/modules/shared/components";

interface NotesProps {
  notes: NoteType[];
}

const STAGE_TITLE: Record<string, string> = {
  TOP: "Notas de salida",
  HEART: "Notas de corazón",
  BASE: "Notas de fondo",
};

export const Notes = ({ notes }: NotesProps): ReactElement => {
  const grouped = notes.reduce<Record<string, NoteType[]>>((acc, note) => {
    if (!acc[note.stage]) acc[note.stage] = [];
    acc[note.stage].push(note);
    return acc;
  }, {});

  return (
    <CollapsibleSection title="Notas destacadas" defaultOpen={true}>
      <div className="flex flex-col gap-5">
        {Object.entries(grouped).map(([stage, stageNotes]) => (
          <div key={stage} className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <h6 className="text-xs font-semibold uppercase">
                {STAGE_TITLE[stage] || stage}
              </h6>
              <button className="text-white">
                <Info size={14} />
              </button>
            </div>
            <div className="flex w-full flex-wrap gap-3">
              {stageNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-surface border-stroke flex h-22 w-22 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border"
                >
                  <div className="h-10 w-10">
                    <Image
                      src={note.image || "/images/notes/vainilla.png"}
                      alt={note.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-scale-down"
                    />
                  </div>
                  <p className="text-xs font-semibold text-white">{note.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};