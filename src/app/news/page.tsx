import NewsHero from "@/components/news/NewsHero";
import NewsList from "@/components/news/NewsList";
import ServicesCTA from "@/components/services/ServicesCTA";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import {
  allNewsQuery,
  type NewsArticleSummary,
} from "@/sanity/lib/queries";

export const metadata = {
  title: "News — H.Studio",
  description:
    "Press, awards, launches, and studio notes from H.Studio.",
};

export const revalidate = 60;

export default async function NewsPage() {
  const articles = await client
    .fetch<NewsArticleSummary[]>(allNewsQuery)
    .catch(() => [] as NewsArticleSummary[]);

  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <NewsHero count={articles.length} />
        <NewsList items={articles} />
        <ServicesCTA />
      </div>
      <Footer />
    </main>
  );
}
