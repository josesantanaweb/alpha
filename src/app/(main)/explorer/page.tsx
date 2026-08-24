import type { ReactElement } from "react";
import { Explorer } from "@/modules/explorer/components";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ExplorerPage({
  searchParams,
}: PageProps): Promise<ReactElement> {
  const params = await searchParams;

  const paramKey =
    params.search ??
    params.tag ??
    params.gender ??
    params.accord ??
    params.designer ??
    params.type ??
    params.priceMin ??
    params.priceMax ??
    "";

  return (
    <Explorer
      key={paramKey}
      search={params.search}
      tag={params.tag}
      gender={params.gender}
      accord={params.accord}
      designer={params.designer}
      type={params.type}
      priceMin={params.priceMin}
      priceMax={params.priceMax}
    />
  );
}
