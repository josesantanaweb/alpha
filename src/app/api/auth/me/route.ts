import { NextRequest, NextResponse } from "next/server";
import { getMe } from "@/modules/auth/actions";

export async function GET(request: NextRequest) {
  const result = await getMe(request);

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}
