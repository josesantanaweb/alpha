import { NextRequest, NextResponse } from "next/server";
import { vote, getUserVotes } from "@/modules/perfumes/actions";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";
import type { VoteCategory } from "@/modules/perfumes/actions";

const VALID_CATEGORIES: VoteCategory[] = [
  "season",
  "timeOfDay",
  "longevity",
  "sillage",
  "projection",
  "feeling",
];

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const payload = await authenticate(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const result = await getUserVotes(payload.userId, id);
  return NextResponse.json(result, { status: result.status });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const payload = await authenticate(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as {
      category?: string;
      field?: string;
    };
    const { category, field } = body;

    if (
      !category ||
      !field ||
      !VALID_CATEGORIES.includes(category as VoteCategory)
    ) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          message: "Categoría o campo inválido.",
        },
        { status: 400 },
      );
    }

    const result = await vote(
      payload.userId,
      id,
      category as VoteCategory,
      field,
    );
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 500, message: "Error interno" },
      { status: 500 },
    );
  }
}
