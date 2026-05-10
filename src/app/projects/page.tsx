import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ServicesCTA from "@/components/services/ServicesCTA";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import {
  allPortfolioQuery,
  type PortfolioItem,
} from "@/sanity/lib/queries";

export const metadata = {
  title: "Projects — H.Studio",
  description:
    "A working archive of brands, products, and stories shipped from the studio.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await client
    .fetch<PortfolioItem[]>(allPortfolioQuery)
    .catch(() => [] as PortfolioItem[]);

  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <ProjectsHero count={projects.length} />
        <ProjectsGrid items={projects} />
        <ServicesCTA />
      </div>
      <Footer />
    </main>
  );
}
