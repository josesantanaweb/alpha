import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/api/tags";
import type { Tag } from "@prisma/client";

export const useTags = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};