import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import BioSection from "@/components/BioSection";
import CameraSection from "@/components/CameraSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — H.Studio",
  description:
    "Learn more about H.Studio — a full-service creative studio specializing in branding, web design, and engineering.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#f7f7f6] text-black">
      <header className="bg-[#d6d8d6]">
        <div className="px-[18px] md:px-[40px]">
          <Navbar />
        </div>
        <section className="px-[18px] pb-[80px] pt-[48px] md:px-[40px] md:pb-[140px] md:pt-[96px]">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.12em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ ABOUT ]
          </p>
          <h1
            className="mt-[18px] text-[64px] font-medium capitalize leading-[0.85] tracking-[-0.07em] md:mt-[28px] md:text-[clamp(96px,_13vw,_198px)]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            About
            <br />
            H.Studio
          </h1>
          <p className="mt-[24px] max-w-[640px] text-[14px] uppercase leading-[1.3] tracking-[-0.04em] md:mt-[32px] md:text-[16px]">
            <em className="font-bold">H.Studio</em> is a{" "}
            <em>full-service</em> creative studio crafting beautiful digital
            experiences and products. We&apos;re an{" "}
            <em>award-winning</em> design and art group specializing in
            branding, web design, and engineering.
          </p>
        </section>
      </header>

      <BioSection />
      <AboutSection />
      <CameraSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
