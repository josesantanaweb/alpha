import { NextRequest, NextResponse } from "next/server";
import {
  getUserFavorites,
  create,
  remove,
} from "@/modules/favorites";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  if (!token) {
    return null;
  }
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  const payload = await authenticate(request);
  if (!payload) {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 },
    );
  }

  const result = await getUserFavorites(payload.userId);

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function POST(request: NextRequest) {
  const payload = await authenticate(request);
  if (!payload) {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as { perfumeId?: string };
    const { perfumeId } = body;

    if (!perfumeId || typeof perfumeId !== "string") {
      return NextResponse.json(
        { message: "perfumeId es requerido." },
        { status: 400 },
      );
    }

    const result = await create(payload.userId, perfumeId);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Formato JSON inválido." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const payload = await authenticate(request);
  if (!payload) {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as { perfumeId?: string };
    const { perfumeId } = body;

    if (!perfumeId || typeof perfumeId !== "string") {
      return NextResponse.json(
        { message: "perfumeId es requerido." },
        { status: 400 },
      );
    }

    const result = await remove(payload.userId, perfumeId);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Formato JSON inválido." },
      { status: 400 },
    );
  }
}
