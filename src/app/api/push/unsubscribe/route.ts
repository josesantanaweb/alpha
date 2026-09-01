import { NextResponse, type NextRequest } from "next/server";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";
import { unsubscribeUser } from "@/modules/push/actions";
import { UnsubscribeSchema } from "@/modules/push/schema";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  return token ? verifyToken(token) : null;
}

export async function DELETE(request: NextRequest) {
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

  const parsed = UnsubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, status: 400, message: "Endpoint inválido." },
      { status: 400 }
    );
  }

  await unsubscribeUser(payload.userId, parsed.data.endpoint);

  return NextResponse.json({ success: true, status: 200 }, { status: 200 });
}