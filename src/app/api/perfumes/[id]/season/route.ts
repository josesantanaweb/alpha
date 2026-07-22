import { NextRequest, NextResponse } from "next/server";
import { voteSeason } from "@/modules/perfumes/actions";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const field = body.field as "winter" | "spring" | "summer" | "autumn";

    const result = await voteSeason(id, field);
    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, message: "Error interno" },
      { status: 500 }
    );
  }
}
