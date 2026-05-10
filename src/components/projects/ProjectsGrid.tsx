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

function ProjectCard({
  project,
  horizontal = false,
  index,
}: {
  project: PortfolioItem;
  horizontal?: boolean;
  index?: number;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (horizontal) return; // Skip vertical parallax in horizontal mode.
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
  }, [horizontal]);

  const aspectClass = horizontal
    ? "aspect-[4/5]"
    : "aspect-[4/5] md:aspect-[3/4]";

  const titleSizeClass = horizontal
    ? "text-[24px] md:text-[28px]"
    : "text-[24px] md:text-[34px]";

  const card = (
    <article className="group h-full">
      <div
        ref={frameRef}
        className={`relative ${aspectClass} overflow-hidden bg-zinc-200`}
      >
        <div ref={imgRef} className="absolute inset-[-8%]">
          <Image
            src={project.imagePath}
            alt={`${project.title} project`}
            fill
            quality={95}
            sizes={
              horizontal
                ? "(min-width: 768px) 460px, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
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
        {horizontal && typeof index === "number" ? (
          <span
            className="absolute right-[16px] top-[16px] text-[12px] uppercase leading-none tracking-[0.16em] text-white mix-blend-difference md:right-[20px] md:top-[20px] md:text-[13px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <div className="mt-[12px] flex items-center justify-between gap-4 md:mt-[14px]">
        <h3
          className={`font-black uppercase leading-none tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-[8px] ${titleSizeClass}`}
        >
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
        className="block h-full"
      >
        {card}
      </a>
    );
  }
  if (project.slug) {
    return (
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {card}
      </Link>
    );
  }
  if (project.href) {
    return (
      <Link href={project.href} className="block h-full">
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

  const mobileCardsRef = useRef<HTMLDivElement[]>([]);
  const desktopCardsRef = useRef<HTMLDivElement[]>([]);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const progressLabelRef = useRef<HTMLSpanElement | null>(null);

  const [activeTag, setActiveTag] = useState<string>("All");

  const setMobileCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) mobileCardsRef.current[idx] = el;
  };
  const setDesktopCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) desktopCardsRef.current[idx] = el;
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

  // Header + headline + tag bar reveals (run once).
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          autoAlpha: 0,
          y: 14,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }
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
      if (tagBarRef.current) {
        gsap.from(tagBarRef.current.children, {
          autoAlpha: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: tagBarRef.current, start: "top 90%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Card-level animations: mobile stagger fade-up, desktop pinned horizontal scroll.
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    // ---- Mobile: simple stagger fade-up ----
    mm.add("(max-width: 767px)", () => {
      if (!mobileCardsRef.current.length) return;
      gsap.from(mobileCardsRef.current, {
        autoAlpha: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mobileCardsRef.current[0],
          start: "top 85%",
        },
      });
    });

    // ---- Desktop: pin the section, translate the track horizontally ----
    mm.add("(min-width: 768px)", () => {
      const pin = pinWrapRef.current;
      const track = trackRef.current;
      if (!pin || !track || !desktopCardsRef.current.length) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Per-card scale + opacity arc as each card crosses the viewport.
      desktopCardsRef.current.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
        tl.fromTo(
          card,
          { scale: 0.86, autoAlpha: 0.45 },
          { scale: 1, autoAlpha: 1, ease: "power2.out" }
        ).to(card, {
          scale: 0.92,
          autoAlpha: 0.55,
          ease: "power2.in",
        });
      });

      // Progress bar + counter tied to the pinned scroll range.
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
            },
          }
        );
      }

      if (progressLabelRef.current) {
        const total = desktopCardsRef.current.length;
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          onUpdate: (self) => {
            if (!progressLabelRef.current) return;
            const idx = Math.min(
              total,
              Math.max(1, Math.ceil(self.progress * total) || 1)
            );
            progressLabelRef.current.textContent = `${String(idx).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
          },
        });
      }
    });

    return () => mm.revert();
  }, [filtered]);

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="px-[16px] pb-[40px] pt-[80px] md:px-[28px] md:pb-[60px] md:pt-[120px]">
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
      </div>

      {filtered.length === 0 ? (
        <p className="px-[16px] pb-[120px] text-[15px] text-black/60 md:px-[28px]">
          No projects match this filter yet.
        </p>
      ) : (
        <>
          {/* Mobile: vertical staggered grid */}
          <div className="px-[16px] pb-[100px] md:hidden">
            <div className="grid gap-x-[16px] gap-y-[48px]">
              {filtered.map((project, i) => (
                <div key={project._id} ref={setMobileCardRef(i)}>
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: pinned horizontal scroll */}
          <div
            ref={pinWrapRef}
            className="relative hidden h-screen overflow-hidden md:block"
          >
            <div
              ref={trackRef}
              className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-[60px] pl-[40px] pr-[40vw] will-change-transform"
            >
              {filtered.map((project, i) => (
                <div
                  key={project._id}
                  ref={setDesktopCardRef(i)}
                  className="w-[420px] shrink-0 lg:w-[460px]"
                >
                  <ProjectCard project={project} horizontal index={i} />
                </div>
              ))}
            </div>

            {/* Top-right scroll indicator */}
            <div
              className="pointer-events-none absolute left-[40px] right-[40px] top-[32px] flex items-center justify-between text-[12px] uppercase leading-none tracking-[0.16em] text-black/55"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span>SCROLL HORIZONTALLY</span>
              <span ref={progressLabelRef}>
                01 / {String(filtered.length).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-[40px] left-[40px] right-[40px] h-[1px] bg-black/15">
              <span
                ref={progressRef}
                aria-hidden="true"
                className="block h-full origin-left scale-x-0 bg-black"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
