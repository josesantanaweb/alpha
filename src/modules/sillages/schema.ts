import { z } from "zod";

export const CreateSillageSchema = z.object({
  soft: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  moderate: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  heavy: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  huge: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdateSillageSchema = CreateSillageSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreateSillageInput = z.infer<typeof CreateSillageSchema>;
export type UpdateSillageInput = z.infer<typeof UpdateSillageSchema>;