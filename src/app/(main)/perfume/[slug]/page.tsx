import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getBySlug } from "@/modules/perfumes";
import { Perfume } from "@/modules/perfumes/components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PerfumePage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const result = await getBySlug(slug);

  if (!result.success) {
    notFound();
  }

  return <Perfume perfume={JSON.parse(JSON.stringify(result.data))} />;
}
