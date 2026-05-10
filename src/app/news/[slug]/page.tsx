import { notFound } from "next/navigation";
import ArticleHero from "@/components/news/ArticleHero";
import ProjectBody from "@/components/projects/ProjectBody";
import ServicesCTA from "@/components/services/ServicesCTA";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import {
  newsBySlugQuery,
  newsSlugsQuery,
  type NewsArticle,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client
    .fetch<string[]>(newsSlugsQuery)
    .catch(() => [] as string[]);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await client
    .fetch<NewsArticle | null>(newsBySlugQuery, { slug })
    .catch(() => null);

  if (!article) return { title: "Article — H.Studio" };

  return {
    title: `${article.title} — H.Studio`,
    description: article.summary ?? `${article.title} — H.Studio.`,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await client
    .fetch<NewsArticle | null>(newsBySlugQuery, { slug })
    .catch(() => null);

  if (!article) notFound();

  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <ArticleHero article={article} />
        {article.body?.length ? <ProjectBody paragraphs={article.body} /> : null}
        <ServicesCTA />
      </div>
      <Footer />
    </main>
  );
}
