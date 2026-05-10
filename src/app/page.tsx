import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import AboutSection from "@/components/AboutSection";
import CameraSection from "@/components/CameraSection";
import ServicesSection from "@/components/ServicesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import {
  featuredNewsQuery,
  type NewsArticleSummary,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const news = await client
    .fetch<NewsArticleSummary[]>(featuredNewsQuery)
    .catch(() => [] as NewsArticleSummary[]);

  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <HeroSection />
        <BioSection />
        <AboutSection />
        <CameraSection />
        <ServicesSection />
        <SelectedWorkSection />
        <TestimonialsSection />
        <NewsSection items={news} />
      </div>
      <Footer />
    </main>
  );
}
