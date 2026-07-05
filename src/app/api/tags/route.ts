import { NextRequest, NextResponse } from "next/server";
import { create, getAll } from "@/modules/tags";
import { parsePaginationParams } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  const result = await getAll(parsePaginationParams(request.nextUrl.searchParams));
  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await create(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Invalid JSON format";
    return NextResponse.json({ message }, { status: 400 });
  }
}
