import { NextRequest, NextResponse } from "next/server";
import {login} from "@/modules/auth/actions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await login(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
  }
}