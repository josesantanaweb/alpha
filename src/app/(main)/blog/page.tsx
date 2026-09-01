import type { ReactElement } from "react";
import { BlogList } from "@/modules/blog/components";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export const metadata = {
  title: "Blog | Aura",
  description:
    "Descubre el mundo de la perfumería: guías, tendencias y el arte de las notas olfativas.",
};

export default async function BlogPage({
  searchParams,
}: PageProps): Promise<ReactElement> {
  const params = await searchParams;

  return <BlogList key={params.search ?? ""} search={params.search} />;
}
