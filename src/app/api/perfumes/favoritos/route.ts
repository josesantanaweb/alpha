import { NextResponse } from "next/server";
import { getByIds } from "@/modules/favorites/actions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { ids?: string[] };
    const ids = body.ids ?? [];

    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { message: "ids debe ser un array." },
        { status: 400 }
      );
    }

    const result = await getByIds(ids);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json(
      { message: "Formato JSON inválido." },
      { status: 400 }
    );
  }
}
