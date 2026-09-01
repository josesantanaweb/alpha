import { NextResponse, type NextRequest } from "next/server";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";
import { subscribeUser } from "@/modules/push/actions";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  return token ? verifyToken(token) : null;
}

export async function POST(request: NextRequest) {
  const payload = await authenticate(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, status: 400, message: "Formato JSON inválido." },
      { status: 400 }
    );
  }

  const subscription = await subscribeUser(payload.userId, body);
  if (!subscription) {
    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: "Suscripción de push inválida.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { success: true, status: 200, data: subscription },
    { status: 200 }
  );
}