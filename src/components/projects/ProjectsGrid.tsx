"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortfolioItem } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

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

function ProjectCard({ project }: { project: PortfolioItem }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!frameRef.current || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frameRef);
    return () => ctx.revert();
  }, []);

  const card = (
    <article className="group">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] overflow-hidden bg-zinc-200 md:aspect-[3/4]"
      >
        <div ref={imgRef} className="absolute inset-[-8%]">
          <Image
            src={project.imagePath}
            alt={`${project.title} project`}
            fill
            quality={95}
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectPosition: project.objectPosition ?? "center" }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"
        />
        {project.tags?.length ? (
          <div className="absolute bottom-[12px] left-[16px] flex flex-wrap gap-[7px] md:bottom-[16px] md:left-[20px]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/85 px-[10px] py-[4px] text-[12px] leading-none text-black backdrop-blur-sm md:text-[13px]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-[12px] flex items-center justify-between gap-4 md:mt-[14px]">
        <h3 className="text-[24px] font-black uppercase leading-none tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-[8px] md:text-[34px]">
          {project.title}
        </h3>
        <ArrowIcon className="h-[26px] w-[26px] shrink-0 text-black transition-transform duration-300 group-hover:-translate-y-[4px] group-hover:translate-x-[4px] md:h-[32px] md:w-[32px]" />
      </div>
    </article>
  );

  if (project.href && /^https?:\/\//.test(project.href)) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        {card}
      </a>
    );
  }
  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className="block">
        {card}
      </Link>
    );
  }
  if (project.href) {
    return (
      <Link href={project.href} className="block">
        {card}
      </Link>
    );
  }
  return card;
}

export default function ProjectsGrid({ items }: { items: PortfolioItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);
  const tagBarRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeTag, setActiveTag] = useState<string>("All");

  const setCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[idx] = el;
  };
  const setHeadlineWordRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) headlineWordsRef.current[idx] = el;
  };

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeTag === "All") return items;
    return items.filter((p) => p.tags?.includes(activeTag));
  }, [items, activeTag]);

  const headlineText = "Every project, in the order it shipped.";
  const headlineWords = headlineText.split(" ");

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header meta lines: small fade-up on enter.
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          autoAlpha: 0,
          y: 14,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }

      // Headline: word-by-word color scrub (Philosophy pattern).
      if (headlineWordsRef.current.length) {
        gsap.set(headlineWordsRef.current, { color: "rgba(0,0,0,0.18)" });
        gsap.to(headlineWordsRef.current, {
          color: "rgba(0,0,0,1)",
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "center 45%",
            scrub: true,
          },
        });
      }

      // Tag bar: stagger pills in.
      if (tagBarRef.current) {
        gsap.from(tagBarRef.current.children, {
          autoAlpha: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tagBarRef.current,
            start: "top 90%",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!cardsRef.current.length) return;
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        autoAlpha: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="px-[16px] py-[80px] md:px-[28px] md:py-[120px]">
        <div ref={headerRef} className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ ARCHIVE — 004 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {String(filtered.length).padStart(3, "0")}
          </p>
        </div>

        <h2
          ref={headlineRef}
          className="mt-[40px] max-w-[20ch] text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:mt-[80px] md:text-[clamp(48px,_5.5vw,_84px)]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {headlineWords.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block">
              <span ref={setHeadlineWordRef(i)} className="inline-block">
                {w}
              </span>
              {i < headlineWords.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        {tags.length > 1 && (
          <div
            ref={tagBarRef}
            className="mt-[40px] flex flex-wrap gap-[8px] md:mt-[60px]"
            role="tablist"
            aria-label="Filter projects by tag"
          >
            {tags.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-[14px] py-[8px] text-[12px] uppercase leading-none tracking-[0.16em] transition-colors md:text-[13px] ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/25 text-black/70 hover:border-black hover:text-black"
                  }`}
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="mt-[60px] text-[15px] text-black/60 md:mt-[100px]">
            No projects match this filter yet.
          </p>
        ) : (
          <div className="mt-[40px] grid gap-x-[16px] gap-y-[48px] md:mt-[60px] md:grid-cols-2 md:gap-x-[22px] md:gap-y-[100px]">
            {filtered.map((project, i) => (
              <div key={project._id} ref={setCardRef(i)} className={i % 2 === 1 ? "md:mt-[80px]" : ""}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
