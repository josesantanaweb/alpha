import { NextResponse } from "next/server";
import { getBySlug } from "@/modules/posts";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  const { slug } = await params;

  const result = await getBySlug(slug);

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}
