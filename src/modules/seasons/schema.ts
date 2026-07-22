import { z } from "zod";

export const CreateSeasonSchema = z.object({
  winter: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  spring: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  summer: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  autumn: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdateSeasonSchema = CreateSeasonSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreateSeasonInput = z.infer<typeof CreateSeasonSchema>;
export type UpdateSeasonInput = z.infer<typeof UpdateSeasonSchema>;
