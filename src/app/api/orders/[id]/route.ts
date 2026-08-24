import { NextResponse, type NextRequest } from "next/server";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";
import { getOrderById } from "@/modules/orders/actions";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  return token ? verifyToken(token) : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const result = await getOrderById(payload.userId, id);
  return NextResponse.json(result, { status: result.status });
}
