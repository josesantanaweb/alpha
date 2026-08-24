import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeaders, verifyToken } from "@/lib/auth";
import { parsePaginationParams } from "@/lib/pagination";
import { create, getByPerfume, getUserReview } from "@/modules/reviews/actions";

async function authenticate(request: NextRequest) {
  const token = getTokenFromHeaders(request);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const perfumeId = searchParams.get("perfumeId")?.trim();

  if (!perfumeId) {
    return NextResponse.json(
      { message: "El parámetro perfumeId es requerido." },
      { status: 400 }
    );
  }

  const { limit, offset } = parsePaginationParams(searchParams);

  const [reviewsResult, payload] = await Promise.all([
    getByPerfume({ perfumeId, limit, offset }),
    authenticate(request),
  ]);

  if (!reviewsResult.success) {
    return NextResponse.json(
      { message: reviewsResult.message },
      { status: reviewsResult.status }
    );
  }

  let userReview = null;
  if (payload) {
    const userReviewResult = await getUserReview(payload.userId, perfumeId);
    if (userReviewResult.success) {
      userReview = userReviewResult.data;
    }
  }

  return NextResponse.json(
    { ...reviewsResult.data, userReview },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const payload = await authenticate(request);

  if (!payload) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await create(payload.userId, body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json(
      { message: "Formato JSON inválido." },
      { status: 400 }
    );
  }
}
