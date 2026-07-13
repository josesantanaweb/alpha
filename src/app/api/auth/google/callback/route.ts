import { NextRequest, NextResponse } from "next/server";
import { googleCallback } from "@/modules/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "Falta el código de autorización" }, { status: 400 });
  }

  const result = await googleCallback(code);

  if (!result.success) {
    return NextResponse.json(
      { message: result.message, errors: result.errors },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}