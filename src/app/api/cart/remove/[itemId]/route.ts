import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";
import { removeItem } from "@/modules/cart/actions";

type RouteParams = {
  params: Promise<{ itemId: string }>;
};

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const token = getTokenFromHeaders(request);
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    return NextResponse.json(
      { success: false, status: 401, message: "No autenticado." },
      { status: 401 }
    );
  }

  const { itemId } = await params;
  const result = await removeItem(payload.userId, itemId);

  return NextResponse.json(result, { status: result.status });
}
