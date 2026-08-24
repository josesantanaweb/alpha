import { type NextRequest, NextResponse } from "next/server";
import {addItem} from "@/modules/cart/actions";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 },
    );
  }

  try {
    const result = await addItem(payload.userId, await request.json());
    return NextResponse.json(result, { status: result.status });
  } catch {
    return NextResponse.json(
      { success: false, status: 400, message: "Formato JSON inválido." },
      { status: 400 },
    );
  }
}
