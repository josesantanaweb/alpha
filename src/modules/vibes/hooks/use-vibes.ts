import { useQuery } from "@tanstack/react-query";
import { getActiveVibes } from "@/lib/api/vibes";
import type { Vibe } from "@prisma/client";

export const useVibes = () => {
  return useQuery<Vibe[]>({
    queryKey: ["vibes", "active"],
    queryFn: getActiveVibes,
  });
};
