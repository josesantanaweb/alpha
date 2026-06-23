import { z } from "zod";

export const CreateDecantSchema = z.object({
  price: z.number().positive("El precio debe ser mayor a 0"),
  ml: z.number().positive("Los mililitros deben ser mayor a 0"),
  stock: z.number().positive("El stock debe ser mayor a 0"),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdateDecantSchema = CreateDecantSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreateDecantInput = z.infer<typeof CreateDecantSchema>;
export type UpdateDecantInput = z.infer<typeof UpdateDecantSchema>;