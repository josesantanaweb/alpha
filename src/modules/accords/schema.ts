import { z } from "zod";

export const CreateAccordSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
  icon: z.string().max(50).optional().nullable(),
});

export const UpdateAccordSchema = CreateAccordSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreateAccordInput = z.infer<typeof CreateAccordSchema>;
export type UpdateAccordInput = z.infer<typeof UpdateAccordSchema>;