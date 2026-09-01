import type { ReactElement } from "react";
import { BlogDetail } from "@/modules/blog/components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;

  return <BlogDetail slug={slug} />;
}
