import { z } from "zod";

export const AddCartItemSchema = z.object({
  perfumeId: z.string().uuid("perfumeId inválido"),
  decantId: z.string().uuid("decantId inválido").optional(),
  quantity: z.number().int().positive("La cantidad debe ser mayor a 0").default(1),
});

export type AddCartItemInput = z.infer<typeof AddCartItemSchema>;
