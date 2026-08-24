import { NextRequest, NextResponse } from "next/server";
import {getAll, create} from "@/modules/posts/actions";
import { parsePaginationParams } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search")?.trim() || undefined;

  const result = await getAll({
    ...parsePaginationParams(searchParams),
    search,
  });

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
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
