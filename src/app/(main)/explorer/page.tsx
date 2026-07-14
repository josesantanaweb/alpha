import type { ReactElement } from "react";
import { Explorer } from "@/modules/explorer";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ExplorerPage({
  searchParams,
}: PageProps): Promise<ReactElement> {
  const params = await searchParams;

  const paramKey = params.search ?? params.tag ?? params.gender ?? "";

  return (
    <Explorer
      key={paramKey}
      search={params.search}
      tag={params.tag}
      gender={params.gender}
      categoryId={params.categoryId}
      designerId={params.designerId}
    />
  );
}