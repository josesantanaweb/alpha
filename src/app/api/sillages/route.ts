import { NextResponse } from "next/server";
import { create, getAll } from "@/modules/sillages/sillages.actions";

export async function GET() {
  const result = await getAll();
  if (!result.success) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await create(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors }, 
        { status: result.status }
      );
    }
    
    return NextResponse.json(result.data, { status: result.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Invalid JSON format";
    return NextResponse.json({ message }, { status: 400 });
  }
}
