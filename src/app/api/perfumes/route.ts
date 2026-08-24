import { NextRequest, NextResponse } from "next/server";
import { parsePaginationParams } from "@/lib/pagination";
import { create, getAll } from "@/modules/perfumes/actions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const getParam = (key: string) => searchParams.get(key)?.trim() || undefined;

  const result = await getAll({
    ...parsePaginationParams(searchParams),
    search: getParam("search"),
    accord: getParam("accord"),
    designer: getParam("designer"),
    tag: getParam("tag"),
    gender: getParam("gender"),
    type: getParam("type"),
    priceMin: getParam("priceMin"),
    priceMax: getParam("priceMax"),
  });

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
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
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Invalid JSON format";
    return NextResponse.json({ message }, { status: 400 });
  }
}
