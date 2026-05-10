"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import type { NewsArticle } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    .toUpperCase();
}

export default function ArticleHero({ article }: { article: NewsArticle }) {
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
          stagger: 0.08,
        })
        .from(labelRef.current, { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.7")
        .from(
          metaRef.current?.children ?? [],
          { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06 },
          "-=0.5"
        )
        .from(summaryRef.current, { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(imageWrapRef.current, { autoAlpha: 0, y: 40, duration: 0.9 }, "-=0.5");

      // Scroll: title splits horizontally — first word left, last word right.
      if (titleRefs.current.length > 1) {
        const first = titleRefs.current[0];
        const last = titleRefs.current[titleRefs.current.length - 1];
        const split = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        split
          .to(first, { xPercent: -22, ease: "none" }, 0)
          .to(last, { xPercent: 22, ease: "none" }, 0);
      }

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

  const titleWords = article.title.split(" ");

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
          [ NEWS — DISPATCH ]
        </p>

        <h1
          className="mt-[40px] max-w-[18ch] text-[44px] font-medium leading-[1] tracking-[-0.03em] md:mt-[64px] md:text-[clamp(56px,_6.4vw,_104px)]"
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
          className="mt-[40px] flex flex-wrap items-center gap-[20px] text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:mt-[60px] md:text-[13px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          <span>{formatDate(article.date)}</span>
          {article.category ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{article.category}</span>
            </>
          ) : null}
        </div>

        {article.summary ? (
          <p
            ref={summaryRef}
            className="mt-[32px] max-w-[60ch] text-[16px] leading-[1.5] text-black/75 md:mt-[40px] md:text-[20px]"
          >
            {article.summary}
          </p>
        ) : null}
      </div>

      <div
        ref={imageWrapRef}
        className="relative z-10 mx-[18px] mb-[80px] aspect-[4/5] overflow-hidden bg-zinc-200 md:mx-[40px] md:mb-[120px] md:aspect-[16/9]"
      >
        <div ref={imageRef} className="absolute inset-[-6%]">
          <Image
            src={article.coverImage}
            alt={`${article.title} cover`}
            fill
            quality={95}
            priority
            sizes="(min-width: 768px) calc(100vw - 80px), calc(100vw - 36px)"
            style={{ objectPosition: article.objectPosition ?? "center" }}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
