import { useQuery } from "@tanstack/react-query";
import { getAccords } from "@/lib/api/accords";

export const useAccords = () => {
  return useQuery({
    queryKey: ["accords"],
    queryFn: getAccords,
  });
};
