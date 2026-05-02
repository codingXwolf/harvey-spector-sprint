import Image from "next/image";
import { client } from "@/sanity/lib/client";
import {
  featuredPortfolioQuery,
  type PortfolioItem,
} from "@/sanity/lib/queries";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M6 18.5 L14 10.5 L9 10.5 L9 7 L20 7 L20 18 L16.5 18 L16.5 13 L8.5 21 Z" />
    </svg>
  );
}

function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="absolute bottom-[11px] left-[16px] flex gap-[7px] md:bottom-[15px] md:left-[20px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-black/30 px-[10px] py-[4px] text-[12px] leading-none text-black backdrop-blur-sm md:text-[13px]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  className = "",
}: {
  project: PortfolioItem;
  className?: string;
}) {
  return (
    <article className={className}>
      <div className="relative aspect-[322/371] overflow-hidden bg-zinc-200 md:aspect-[606/671]">
        <Image
          src={project.imagePath}
          alt={`${project.title} project`}
          fill
          quality={95}
          sizes="(min-width: 768px) 50vw, 100vw"
          style={{ objectPosition: project.objectPosition ?? "center" }}
          className="object-cover"
        />
        <Tags tags={project.tags} />
      </div>
      <div className="mt-[10px] flex items-center justify-between gap-4 md:mt-[12px]">
        <h3 className="text-[23px] font-black uppercase leading-none tracking-[-0.05em] md:text-[32px]">
          {project.title}
        </h3>
        <ArrowIcon className="h-[26px] w-[26px] shrink-0 text-black md:h-[32px] md:w-[32px]" />
      </div>
    </article>
  );
}

export default async function SelectedWorkSection() {
  const projects = await client.fetch<PortfolioItem[]>(
    featuredPortfolioQuery,
    {},
    { next: { revalidate: 60 } }
  );

  // Desktop staggered layout: 2nd item drops, 3rd swaps with 2nd, 4th offset.
  const layout = [
    { index: 0, className: "" },
    { index: 2, className: "md:mt-[215px]" },
    { index: 1, className: "" },
    { index: 3, className: "md:mt-[46px]" },
  ];

  return (
    <section className="bg-[#f7f7f6] text-black">
      <div className="relative px-[16px] pb-[42px] pt-[47px] md:px-[28px] md:pb-[68px] md:pt-[76px]">
        <p
          className="text-[12px] leading-none md:hidden"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ PORTFOLIO ]
        </p>

        <div className="mt-[15px] flex items-start justify-between md:mt-0 md:block">
          <h2 className="text-[31px] font-light uppercase leading-[0.86] md:text-[88px]">
            Selected
            <br />
            Work
          </h2>
          <p
            className="pt-[2px] text-[12px] leading-none md:absolute md:left-[500px] md:top-[77px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            004
          </p>
        </div>

        <p
          className="hidden md:absolute md:right-[36px] md:top-[100px] md:block md:origin-top-right md:rotate-[-90deg] md:text-[12px] md:leading-none"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ PORTFOLIO ]
        </p>

        <div className="mt-[35px] grid gap-[28px] md:mt-[62px] md:grid-cols-2 md:gap-x-[22px] md:gap-y-[110px]">
          {layout.map(({ index, className }) => {
            const project = projects[index];
            if (!project) return null;
            return (
              <ProjectCard
                key={project._id}
                project={project}
                className={className}
              />
            );
          })}
        </div>

        <div className="relative mx-auto mt-[40px] max-w-[343px] px-[31px] py-[24px] text-center md:mx-0 md:mt-[60px] md:h-[103px] md:w-[410px] md:max-w-none md:px-[32px] md:py-[17px] md:text-left">
          <span className="absolute left-0 top-0 h-[14px] w-[14px] border-l border-t border-black" />
          <span className="absolute right-0 top-0 h-[14px] w-[14px] border-r border-t border-black" />
          <span className="absolute bottom-0 left-0 h-[14px] w-[14px] border-b border-l border-black" />
          <span className="absolute bottom-0 right-0 h-[14px] w-[14px] border-b border-r border-black" />

          <p className="text-[13px] italic leading-[1.3] md:max-w-[300px] md:leading-[1.24]">
            Discover how my creativity transforms ideas into impactful digital
            experiences — schedule a call with me to get started.
          </p>
          <button className="mt-[16px] rounded-full bg-black px-[20px] py-[11px] text-[13px] leading-none text-white md:mt-[14px] md:px-[17px] md:py-[10px] md:text-[12px]">
            Let&apos;s talk
          </button>
        </div>
      </div>
    </section>
  );
}
