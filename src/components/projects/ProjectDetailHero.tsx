"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import type { ProjectDetail } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailHero({
  project,
}: {
  project: ProjectDetail;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRefs = useRef<HTMLSpanElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLParagraphElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const setTitleRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) titleRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(titleRefs.current, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.1,
        })
        .from(
          labelRef.current,
          { autoAlpha: 0, y: 14, duration: 0.6 },
          "-=0.7"
        )
        .from(
          metaRef.current?.children ?? [],
          { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06 },
          "-=0.5"
        )
        .from(
          summaryRef.current,
          { autoAlpha: 0, y: 16, duration: 0.6 },
          "-=0.4"
        )
        .from(
          imageWrapRef.current,
          { autoAlpha: 0, y: 40, duration: 0.9 },
          "-=0.5"
        );

      // Subtle parallax on the hero image as you scroll past.
      if (imageRef.current && imageWrapRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const titleWords = project.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f6] text-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[80%] w-[120%] -translate-x-1/2 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-20 px-[18px] md:px-[40px]">
        <Navbar theme="light" />
      </div>

      <div className="relative z-10 px-[18px] pb-[40px] pt-[24px] md:px-[40px] md:pb-[80px] md:pt-[48px]">
        <p
          ref={labelRef}
          className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/60 md:text-[14px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ PROJECT — CASE STUDY ]
        </p>

        <h1
          className="mt-[40px] text-[56px] font-medium capitalize leading-[0.92] tracking-[-0.05em] md:mt-[64px] md:text-[clamp(96px,_11vw,_180px)]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          {titleWords.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden">
              <span ref={setTitleRef(i)} className="inline-block will-change-transform">
                {w}
              </span>
              {i < titleWords.length - 1 ? <>&nbsp;</> : null}
            </span>
          ))}
        </h1>

        <div
          ref={metaRef}
          className="mt-[40px] grid grid-cols-2 gap-[20px] md:mt-[80px] md:grid-cols-12 md:gap-[40px]"
        >
          {project.client ? (
            <MetaCell label="Client" value={project.client} />
          ) : null}
          {project.year ? (
            <MetaCell label="Year" value={String(project.year)} />
          ) : null}
          {project.role?.length ? (
            <MetaCell label="Role" value={project.role.join(", ")} />
          ) : null}
          {project.tags?.length ? (
            <MetaCell label="Tags" value={project.tags.join(", ")} />
          ) : null}
        </div>

        {project.summary ? (
          <p
            ref={summaryRef}
            className="mt-[40px] max-w-[60ch] text-[16px] leading-[1.5] text-black/75 md:mt-[60px] md:text-[20px]"
          >
            {project.summary}
          </p>
        ) : null}
      </div>

      <div
        ref={imageWrapRef}
        className="relative z-10 mx-[18px] mb-[80px] aspect-[4/5] overflow-hidden bg-zinc-200 md:mx-[40px] md:mb-[120px] md:aspect-[16/9]"
      >
        <div ref={imageRef} className="absolute inset-[-6%]">
          <Image
            src={project.imagePath}
            alt={`${project.title} hero`}
            fill
            quality={95}
            priority
            sizes="(min-width: 768px) calc(100vw - 80px), calc(100vw - 36px)"
            style={{ objectPosition: project.objectPosition ?? "center" }}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="md:col-span-3">
      <p
        className="text-[11px] uppercase leading-none tracking-[0.16em] text-black/45 md:text-[12px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {label}
      </p>
      <p
        className="mt-[10px] text-[15px] leading-[1.35] text-black md:mt-[14px] md:text-[16px]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {value}
      </p>
    </div>
  );
}
