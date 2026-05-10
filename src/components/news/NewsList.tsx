"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { NewsArticleSummary } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
}

function NewsCard({
  article,
  horizontal = false,
  index,
}: {
  article: NewsArticleSummary;
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

  const card = (
    <article className="group h-full">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] overflow-hidden bg-zinc-200"
      >
        <div ref={imgRef} className="absolute inset-[-8%]">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            quality={95}
            sizes={
              horizontal
                ? "(min-width: 768px) 460px, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
            style={{ objectPosition: article.objectPosition ?? "center" }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"
        />
        {horizontal && typeof index === "number" ? (
          <span
            className="absolute right-[16px] top-[16px] text-[12px] uppercase leading-none tracking-[0.16em] text-white mix-blend-difference md:right-[20px] md:top-[20px] md:text-[13px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div
        className="mt-[12px] flex items-baseline justify-between gap-[8px] text-[10px] uppercase leading-none tracking-[0.14em] text-black/55 md:mt-[18px] md:gap-[12px] md:text-[13px] md:tracking-[0.16em]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <span>{formatDate(article.date)}</span>
        {article.category ? <span>{article.category}</span> : null}
      </div>

      <h3 className="mt-[8px] text-[15px] font-medium leading-[1.2] tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-[6px] md:mt-[12px] md:text-[26px] md:leading-[1.15]">
        {article.title}
      </h3>

      {article.summary ? (
        <p className="mt-[8px] hidden text-[13px] leading-[1.45] text-black/70 md:mt-[12px] md:block md:text-[16px]">
          {article.summary}
        </p>
      ) : null}
    </article>
  );

  if (article.externalUrl && /^https?:\/\//.test(article.externalUrl)) {
    return (
      <a
        href={article.externalUrl}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
      >
        {card}
      </a>
    );
  }
  return (
    <Link href={`/news/${article.slug}`} className="block h-full">
      {card}
    </Link>
  );
}

export default function NewsList({ items }: { items: NewsArticleSummary[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const mobileCardsRef = useRef<HTMLDivElement[]>([]);
  const desktopCardsRef = useRef<HTMLDivElement[]>([]);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const progressLabelRef = useRef<HTMLSpanElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const setMobileCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) mobileCardsRef.current[idx] = el;
  };
  const setDesktopCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) desktopCardsRef.current[idx] = el;
  };
  const setHeadlineWordRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) headlineWordsRef.current[idx] = el;
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((a) => a.category === activeCategory);
  }, [items, activeCategory]);

  const headlineText = "Every dispatch, in the order it shipped.";
  const headlineWords = headlineText.split(" ");

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
      if (filterRef.current) {
        gsap.from(filterRef.current.children, {
          autoAlpha: 0,
          y: 10,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: filterRef.current, start: "top 90%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Mobile stagger or desktop pinned horizontal scroll, switched via matchMedia.
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      if (!mobileCardsRef.current.length) return;
      gsap.from(mobileCardsRef.current, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: mobileCardsRef.current[0], start: "top 85%" },
      });
    });

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
            [ ARCHIVE — 005 ]
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

        {categories.length > 1 && (
          <div
            ref={filterRef}
            className="mt-[40px] flex flex-wrap gap-[8px] md:mt-[60px]"
            role="tablist"
            aria-label="Filter news by category"
          >
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full border px-[14px] py-[8px] text-[12px] uppercase leading-none tracking-[0.16em] transition-colors md:text-[13px] ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/25 text-black/70 hover:border-black hover:text-black"
                  }`}
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="px-[16px] pb-[120px] text-[15px] text-black/60 md:px-[28px]">
          No articles in this category yet.
        </p>
      ) : (
        <>
          {/* Mobile: 2-column compact grid */}
          <div className="px-[16px] pb-[100px] md:hidden">
            <div className="grid grid-cols-2 gap-x-[12px] gap-y-[36px]">
              {filtered.map((article, i) => (
                <div key={article._id} ref={setMobileCardRef(i)}>
                  <NewsCard article={article} index={i} />
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
              {filtered.map((article, i) => (
                <div
                  key={article._id}
                  ref={setDesktopCardRef(i)}
                  className="w-[420px] shrink-0 lg:w-[460px]"
                >
                  <NewsCard article={article} horizontal index={i} />
                </div>
              ))}
            </div>

            <div
              className="pointer-events-none absolute left-[40px] right-[40px] top-[32px] flex items-center justify-between text-[12px] uppercase leading-none tracking-[0.16em] text-black/55"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span>SCROLL HORIZONTALLY</span>
              <span ref={progressLabelRef}>
                01 / {String(filtered.length).padStart(2, "0")}
              </span>
            </div>

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
