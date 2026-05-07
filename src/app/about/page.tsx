import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import FullWidthImage from "@/components/about/FullWidthImage";
import PhilosophySection from "@/components/about/PhilosophySection";
import StatsSection from "@/components/about/StatsSection";
import ExpertiseSection from "@/components/about/ExpertiseSection";
import PortraitSection from "@/components/about/PortraitSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — H.Studio",
  description:
    "Learn more about H.Studio — a full-service creative studio specializing in branding, web design, and engineering.",
};

export default function AboutPage() {
  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <AboutHero />
        <StorySection />
        <FullWidthImage />
        <PhilosophySection />
        <StatsSection />
        <ExpertiseSection />
        <PortraitSection />
      </div>
      <Footer />
    </main>
  );
}
