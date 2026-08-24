import "server-only";
import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";
import type { ApiResult } from "@/modules/shared/types";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, MAX_FILES } from "./schema";

type UploadResult = { url: string; key: string };

function generateKey(file: File, prefix?: string): string {
  const ext = file.name.split(".").pop() ?? "jpg";
  const id = randomUUID();
  const parts: string[] = [id];
  if (prefix) parts.unshift(prefix);
  return `${parts.join("/")}.${ext}`;
}

function validateFiles(files: File[]): ApiResult<File[]> {
  if (files.length === 0) {
    return {
      success: false,
      status: 400,
      message: "Debe enviar al menos una imagen.",
    };
  }

  if (files.length > MAX_FILES) {
    return {
      success: false,
      status: 400,
      message: `Máximo ${MAX_FILES} imágenes por solicitud.`,
    };
  }

  const invalidType = files.find(
    (f) =>
      !ALLOWED_MIME_TYPES.includes(
        f.type as (typeof ALLOWED_MIME_TYPES)[number]
      )
  );
  if (invalidType) {
    return {
      success: false,
      status: 400,
      message: `Formato no soportado: "${invalidType.type}". Use JPEG, PNG, WebP, AVIF o GIF.`,
    };
  }

  const tooLarge = files.find((f) => f.size > MAX_FILE_SIZE);
  if (tooLarge) {
    return {
      success: false,
      status: 400,
      message: `El archivo "${tooLarge.name}" excede el tamaño máximo de 10 MB.`,
    };
  }

  return { success: true, status: 200, data: files };
}

export async function upload(
  files: File[],
  prefix?: string
): Promise<ApiResult<UploadResult[]>> {
  const validation = validateFiles(files);
  if (!validation.success) return validation;

  const bucket = process.env.S3_BUCKET_NAME;
  const publicUrl = process.env.S3_PUBLIC_URL;

  if (!bucket || !publicUrl) {
    return {
      success: false,
      status: 500,
      message: "Error de configuración del servidor de archivos.",
    };
  }

  try {
    const results = await Promise.all(
      validation.data.map(async (file) => {
        const key = generateKey(file, prefix);
        const buffer = Buffer.from(await file.arrayBuffer());

        await s3.send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: file.type,
          })
        );

        return { url: `${publicUrl}/${key}`, key };
      })
    );

    return { success: true, status: 201, data: results };
  } catch (error: unknown) {
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : "Error al subir las imágenes.",
    };
  }
}
