import { NextResponse } from "next/server";
import {getActive} from "@/modules/vibes/actions";

export async function GET() {
  const result = await getActive();

  if (!result.success) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}
