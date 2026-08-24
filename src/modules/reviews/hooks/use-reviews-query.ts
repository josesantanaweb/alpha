import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/lib/api/reviews";
import type { GetReviewsParams } from "@/modules/reviews/types";

export const useReviews = (params: GetReviewsParams) => {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviews(params),
    enabled: !!params.perfumeId,
  });
};
