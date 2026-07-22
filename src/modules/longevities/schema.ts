import { z } from "zod";

export const CreateLongevitySchema = z.object({
  weak: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  moderate: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  long: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  veryLong: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdateLongevitySchema = CreateLongevitySchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreateLongevityInput = z.infer<typeof CreateLongevitySchema>;
export type UpdateLongevityInput = z.infer<typeof UpdateLongevitySchema>;