import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ProcessSection from "@/components/services/ProcessSection";
import EngagementSection from "@/components/services/EngagementSection";
import FAQSection from "@/components/services/FAQSection";
import ServicesCTA from "@/components/services/ServicesCTA";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import {
  servicesQuery,
  processStepsQuery,
  type ServiceItem,
  type ProcessStepItem,
} from "@/sanity/lib/queries";

export const metadata = {
  title: "Services — H.Studio",
  description:
    "Branding, web design, engineering, and photography from a small full-service studio. See how we work, what we charge, and how to start.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, steps] = await Promise.all([
    client.fetch<ServiceItem[]>(servicesQuery).catch(() => []),
    client.fetch<ProcessStepItem[]>(processStepsQuery).catch(() => []),
  ]);

  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <ServicesHero />
        <ServicesList items={services} />
        <ProcessSection items={steps} />
        <EngagementSection />
        <FAQSection />
        <ServicesCTA />
      </div>
      <Footer />
    </main>
  );
}
