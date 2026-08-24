import type { Banner } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getActiveBanners } from "@/lib/api/banners";

export const useBanners = () => {
  return useQuery<Banner[]>({
    queryKey: ["banners", "active"],
    queryFn: getActiveBanners,
  });
};
