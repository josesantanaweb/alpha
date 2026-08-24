import { NextResponse, type NextRequest } from "next/server";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";
import { getUserCart } from "@/modules/cart/actions";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  return token ? verifyToken(token) : null;
}

export async function GET(request: NextRequest) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 }
    );
  }

  const result = await getUserCart(payload.userId);
  return NextResponse.json(result, { status: result.status });
}
