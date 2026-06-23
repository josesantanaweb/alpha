import { z } from "zod";
import { NoteStage } from "@prisma/client";

export const CreateNoteSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(30),
  stage: z.nativeEnum(NoteStage),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdateNoteSchema = CreateNoteSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>;