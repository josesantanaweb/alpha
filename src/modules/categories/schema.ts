import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
  icon: z.string().max(50).optional().nullable(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;