import { NextRequest, NextResponse } from "next/server";
import { update, remove } from "@/modules/reviews";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

type RouteParams = {
  params: Promise<{ id: string }>;
};

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const result = await update(id, payload.userId, body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: result.status },
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json(
      { message: "Formato JSON inválido." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    const result = await remove(id, payload.userId);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 },
    );
  }
}
