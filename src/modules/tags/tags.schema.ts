import { z } from "zod";

export const CreateTagSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
  image: z.string().url("URL inválida").optional().nullable(),
});

export const UpdateTagSchema = CreateTagSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreateTagInput = z.infer<typeof CreateTagSchema>;
export type UpdateTagInput = z.infer<typeof UpdateTagSchema>;
