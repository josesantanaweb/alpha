import { useQuery } from "@tanstack/react-query";
import { getPerfumes, type GetPerfumesParams } from "@/lib/api/perfumes";

export const usePerfumes = (params: GetPerfumesParams = {}) => {
  return useQuery({
    queryKey: ["perfumes", params],
    queryFn: () => getPerfumes(params),
  });
};
