import { useQuery } from "@tanstack/react-query";
import { getDesigners } from "@/lib/api/designers";

export const useDesigners = () => {
  return useQuery({
    queryKey: ["designers"],
    queryFn: getDesigners,
  });
};
