import { NextRequest, NextResponse } from "next/server";
import { voteFeeling } from "@/modules/perfumes/actions";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const field = body.field as "hate" | "dislike" | "like" | "love";

    const result = await voteFeeling(id, field);
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 500, message: "Error interno" },
      { status: 500 },
    );
  }
}