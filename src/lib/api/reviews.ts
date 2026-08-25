import { API_ROUTES } from "@/constants";
import type {
  ReviewWithUser,
  GetReviewsParams,
  GetReviewsResponse,
  VoteReviewResult,
} from "@/modules/reviews/types";

export type { GetReviewsResponse };

export async function getReviews(
  params: GetReviewsParams
): Promise<GetReviewsResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("perfumeId", params.perfumeId);
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));
  if (params.sort) searchParams.set("sort", params.sort);

  const response = await fetch(
    `${API_ROUTES.REVIEWS}?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener las reseñas.");
  }

  const json = await response.json();
  return json;
}

export async function createReview(
  token: string,
  data: { perfumeId: string; rating: number; title?: string; comment: string }
): Promise<ReviewWithUser> {
  const response = await fetch(API_ROUTES.REVIEWS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Error al crear la reseña.");
  }

  return response.json();
}

export async function updateReview(
  token: string,
  reviewId: string,
  data: { rating?: number; title?: string; comment?: string }
): Promise<ReviewWithUser> {
  const response = await fetch(`${API_ROUTES.REVIEWS}/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Error al actualizar la reseña.");
  }

  return response.json();
}

export async function deleteReview(
  token: string,
  reviewId: string
): Promise<void> {
  const response = await fetch(`${API_ROUTES.REVIEWS}/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Error al eliminar la reseña.");
  }
}

export async function voteReview(
  token: string,
  reviewId: string,
  isHelpful: boolean
): Promise<VoteReviewResult> {
  const response = await fetch(`${API_ROUTES.REVIEWS}/${reviewId}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isHelpful }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? "Error al votar la reseña.");
  }

  return response.json();
}
