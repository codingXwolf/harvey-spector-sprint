import { notFound } from "next/navigation";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero";
import ProjectBody from "@/components/projects/ProjectBody";
import ProjectGallery from "@/components/projects/ProjectGallery";
import NextProjectCTA from "@/components/projects/NextProjectCTA";
import ServicesCTA from "@/components/services/ServicesCTA";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import {
  portfolioSlugsQuery,
  projectBySlugQuery,
  type ProjectDetail,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client
    .fetch<string[]>(portfolioSlugsQuery)
    .catch(() => [] as string[]);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client
    .fetch<ProjectDetail | null>(projectBySlugQuery, { slug })
    .catch(() => null);

  if (!project) {
    return { title: "Project — H.Studio" };
  }

  return {
    title: `${project.title} — H.Studio`,
    description:
      project.summary ?? `${project.title} — case study from H.Studio.`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client
    .fetch<ProjectDetail | null>(projectBySlugQuery, { slug })
    .catch(() => null);

  if (!project) notFound();

  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <ProjectDetailHero project={project} />
        {project.body?.length ? <ProjectBody paragraphs={project.body} /> : null}
        {project.gallery?.length ? (
          <ProjectGallery items={project.gallery} />
        ) : null}
        {project.nextProject ? (
          <NextProjectCTA next={project.nextProject} />
        ) : (
          <ServicesCTA />
        )}
      </div>
      <Footer />
    </main>
  );
}
