import { z } from "zod";

export const CreateBannerSchema = z.object({
  title: z
    .string()
    .min(3, "El titulo debe tener al menos 3 caracteres")
    .max(50),
  text: z.string().min(3, "El text debe tener al menos 3 caracteres").max(50),
  slug: z.string().min(1, "El slug es requerido").default("/"),
  order: z.number().min(0, "El order debe ser mayor o igual a 0"),
  isActive: z.coerce.boolean().default(true),
  image: z
    .string()
    .url("La imagen debe ser una URL válida (Cloudinary, S3, etc.)")
    .min(1, "La imagen es requerida"),
});

export const UpdateBannerSchema = CreateBannerSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type CreateBannerInput = z.infer<typeof CreateBannerSchema>;
export type UpdateBannerInput = z.infer<typeof UpdateBannerSchema>;
