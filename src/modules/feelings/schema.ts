import { z } from "zod";

export const CreateFeelingSchema = z.object({
  love: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  like: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  dislike: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  hate: z.number().min(0, "La cantidad de votos debe ser mayor o igual a 0"),
  perfumeId: z.string().uuid("ID inválido")
});

export const UpdateFeelingSchema = CreateFeelingSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreateFeelingInput = z.infer<typeof CreateFeelingSchema>;
export type UpdateFeelingInput = z.infer<typeof UpdateFeelingSchema>;
