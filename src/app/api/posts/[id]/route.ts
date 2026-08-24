import { NextResponse } from "next/server";
import { getOne, remove, update } from "@/modules/posts/actions";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;

  const result = await getOne(id);

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const result = await update(id, body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
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

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const result = await remove(id);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
