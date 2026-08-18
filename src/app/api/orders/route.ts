import { type NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/modules/orders";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  return token ? verifyToken(token) : null;
}

export async function GET(request: NextRequest) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 },
    );
  }

  const result = await getOrders(payload.userId);
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request: NextRequest) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, status: 400, message: "Formato JSON inválido." },
      { status: 400 },
    );
  }

  const result = await createOrder(payload.userId, body);
  return NextResponse.json(result, { status: result.status });
}