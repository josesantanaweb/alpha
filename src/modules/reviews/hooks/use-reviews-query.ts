import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/api/reviews";
import type { GetReviewsParams } from "@/modules/reviews/types";
import { reviewsKeys } from "./reviews-keys";

export const useReviews = (params: GetReviewsParams) => {
  return useQuery({
    queryKey: reviewsKeys.list(params),
    queryFn: () => getReviews(params),
    enabled: !!params.perfumeId,
  });
};
