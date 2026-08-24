import { Gender, PerfumeType } from "@prisma/client";
import { z } from "zod";

export const CreatePerfumeSchemaBase = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50),
  slug: z
    .string()
    .min(3)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido")
    .optional(),
  designerId: z.string().uuid("ID inválido"),
  type: z.nativeEnum(PerfumeType),
  gender: z.nativeEnum(Gender),
  description: z.string().optional().nullable(),
  image: z.string().url("URL inválida").optional().nullable(),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  discount: z
    .number()
    .min(0, "El descuento debe ser mayor o igual a 0")
    .max(100, "El descuento debe ser menor o igual a 100")
    .default(0),
  stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
  remainingMl: z
    .number()
    .min(0, "El stock debe ser mayor o igual a 0")
    .max(100, "El stock debe ser menor o igual a 100"),
  accordIds: z.array(z.string().uuid()).optional().default([]),
});

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const CreatePerfumeSchema = CreatePerfumeSchemaBase.transform(
  (data) => ({
    ...data,
    slug: data.slug || createSlug(data.name),
  })
);

export const UpdatePerfumeSchema = CreatePerfumeSchemaBase.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreatePerfumeInput = z.infer<typeof CreatePerfumeSchema>;
export type UpdatePerfumeInput = z.infer<typeof UpdatePerfumeSchema>;
