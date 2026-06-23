import { z } from "zod";
import { NoteStage } from "@prisma/client";

export const CreatePerfumeNoteSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(30),
  stage: z.nativeEnum(NoteStage),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdatePerfumeNoteSchema = CreatePerfumeNoteSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreatePerfumeNoteInput = z.infer<typeof CreatePerfumeNoteSchema>;
export type UpdatePerfumeNoteInput = z.infer<typeof UpdatePerfumeNoteSchema>;