import { z } from "zod";

export const CreateReviewSchema = z.object({
  perfumeId: z.string().uuid("ID de perfume inválido"),
  title: z
    .string()
    .trim()
    .min(1, "El título no puede estar vacío")
    .max(80, "El título no puede superar los 80 caracteres")
    .optional(),
  comment: z
    .string()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(1000, "El comentario no puede superar los 1000 caracteres"),
  rating: z
    .number()
    .int("El rating debe ser un número entero")
    .min(1, "El rating mínimo es 1")
    .max(5, "El rating máximo es 5"),
});

export const UpdateReviewSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título no puede estar vacío")
    .max(80, "El título no puede superar los 80 caracteres")
    .optional(),
  comment: z
    .string()
    .min(10, "El comentario debe tener al menos 10 caracteres")
    .max(1000, "El comentario no puede superar los 1000 caracteres")
    .optional(),
  rating: z
    .number()
    .int("El rating debe ser un número entero")
    .min(1, "El rating mínimo es 1")
    .max(5, "El rating máximo es 5")
    .optional(),
});

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type UpdateReviewInput = z.infer<typeof UpdateReviewSchema>;
