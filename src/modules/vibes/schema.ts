import { z } from "zod";

export const CreateVibeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  image: z.string().url("Debe ser una URL válida").optional(),
  description: z.string().optional(),
  slug: z.string().min(1, "El slug es requerido"),
  order: z.number().min(0).default(0),
  isActive: z.coerce.boolean().default(true),
});

export const UpdateVibeSchema = CreateVibeSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreateVibeInput = z.infer<typeof CreateVibeSchema>;
export type UpdateVibeInput = z.infer<typeof UpdateVibeSchema>;
