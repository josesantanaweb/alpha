import { z } from "zod";

export const CreateDesignerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50),
  slug: z
    .string()
    .min(2, "El slug debe tener al menos 2 caracteres")
    .max(50)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug solo puede contener letras minúsculas, números y guiones"
    ),
  image: z.string().url("URL inválida").optional().nullable(),
  description: z.string().optional().nullable(),
  showInHome: z.coerce.boolean().default(false),
});

export const UpdateDesignerSchema = CreateDesignerSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreateDesignerInput = z.infer<typeof CreateDesignerSchema>;
export type UpdateDesignerInput = z.infer<typeof UpdateDesignerSchema>;
