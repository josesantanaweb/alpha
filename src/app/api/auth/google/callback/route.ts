import { NextRequest, NextResponse } from "next/server";
import {googleCallback} from "@/modules/auth/actions";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=google_auth_failed", request.url));
  }

  const result = await googleCallback(code);

  if (!result.success || !result.data) {
    return NextResponse.redirect(new URL("/login?error=google_auth_failed", request.url));
  }

  return NextResponse.redirect(
    new URL(`/login?token=${encodeURIComponent(result.data.token)}`, request.url),
  );
}
