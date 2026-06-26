import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import type { Category } from "@prisma/client";

export const useCategories = () => {
  return useQuery<Pick<Category, "id" | "name">[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
