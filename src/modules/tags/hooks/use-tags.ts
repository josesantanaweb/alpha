import type { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/api/tags";

export const useTags = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: getTags,
  });
};
