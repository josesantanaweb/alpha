import { z } from "zod";
import { PerfumeType, Gender } from "@prisma/client";

export const CreatePerfumeSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
  designer: z.string().min(3, "El diseñador debe tener al menos 3 caracteres").max(50),
  type: z.nativeEnum(PerfumeType),
  gender: z.nativeEnum(Gender),
  description: z.string().optional().nullable(),
  image: z.string().url("URL inválida").optional().nullable(),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  discount: z.number().min(0, "El descuento debe ser mayor o igual a 0").max(100, "El descuento debe ser menor o igual a 100").default(0),
  stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  remainingMl: z.number().min(0, "El stock debe ser mayor o igual a 0").max(100, "El stock debe ser menor o igual a 100"),
  categoryId: z.string().uuid("ID inválido")
});

export const UpdatePerfumeSchema = CreatePerfumeSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});


export type CreatePerfumeInput = z.infer<typeof CreatePerfumeSchema>;
export type UpdatePerfumeInput = z.infer<typeof UpdatePerfumeSchema>;