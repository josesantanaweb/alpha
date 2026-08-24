import { API_ROUTES } from "@/constants";
import type { ReviewWithUser, GetReviewsParams } from "@/modules/reviews/types";
import type { PaginatedResult } from "@/modules/shared/types";

export interface GetReviewsResponse extends PaginatedResult<ReviewWithUser> {
  userReview: ReviewWithUser | null;
  distribution: Record<number, number>;
}

export async function getReviews(
  params: GetReviewsParams
): Promise<GetReviewsResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("perfumeId", params.perfumeId);
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));

  const response = await fetch(
    `${API_ROUTES.REVIEWS}?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener las reseñas.");
  }

  const json = await response.json();
  return json;
}
