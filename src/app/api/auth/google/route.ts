import { NextResponse } from "next/server";
import {getGoogleAuthUrl} from "@/modules/auth/actions";

export async function GET() {
  try {
    const url = getGoogleAuthUrl();
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error al iniciar Google OAuth" },
      { status: 500 }
    );
  }
}