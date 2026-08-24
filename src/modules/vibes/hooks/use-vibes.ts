import type { Vibe } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getActiveVibes } from "@/lib/api/vibes";

export const useVibes = () => {
  return useQuery<Vibe[]>({
    queryKey: ["vibes", "active"],
    queryFn: getActiveVibes,
  });
};
