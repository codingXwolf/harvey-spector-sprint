import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import AboutSection from "@/components/AboutSection";
import CameraSection from "@/components/CameraSection";
import ServicesSection from "@/components/ServicesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function Home() {
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
        <NewsSection />
      </div>
      <Footer />
    </main>
  );
}
