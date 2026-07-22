import { NextRequest, NextResponse } from "next/server";
import { voteSillage } from "@/modules/perfumes/actions";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const field = body.field as "soft" | "moderate" | "heavy" | "huge";

    const result = await voteSillage(id, field);
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 500, message: "Error interno" },
      { status: 500 },
    );
  }
}