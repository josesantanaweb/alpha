import { NextResponse } from "next/server";
import { upload } from "@/modules/uploads";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const entries = formData.getAll("images");
    const files: File[] = [];

    for (const entry of entries) {
      if (entry instanceof File && entry.size > 0) {
        files.push(entry);
      }
    }

    const prefix = (formData.get("prefix") as string) || undefined;

    const result = await upload(files, prefix);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Error al procesar la solicitud.";
    return NextResponse.json({ message }, { status: 400 });
  }
}