import { z } from "zod";

// ─── Slug helper ──────────────────────────────────────────────────────────────

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const CreatePostSchemaBase = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(120, "El título no puede superar los 120 caracteres"),
  slug: z
    .string()
    .min(3)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido")
    .optional(),
  content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  excerpt: z
    .string()
    .max(300, "El extracto no puede superar los 300 caracteres")
    .optional()
    .nullable(),
  image: z.string().url("URL de imagen inválida").optional().nullable(),
});

export const CreatePostSchema = CreatePostSchemaBase.transform((data) => ({
  ...data,
  slug: data.slug || createSlug(data.title),
}));

export const UpdatePostSchema = CreatePostSchemaBase.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;
