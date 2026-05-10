"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRefs = useRef<HTMLSpanElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);

  const setHeadlineRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) headlineRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(headlineRefs.current, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.1,
        })
        .from(
          [labelRef.current, metaRef.current],
          { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.06 },
          "-=0.7"
        )
        .from(subRef.current, { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4");

      // Scroll: headline lines fly off the screen (home page pattern).
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (ctx2) => {
          const isMobile = !!ctx2.conditions?.isMobile;
          const xLeft = isMobile ? -75 : -55;
          const xRight = isMobile ? 75 : 55;
          const split = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          split
            .to(headlineRefs.current[0], { xPercent: xLeft, ease: "none" }, 0)
            .to(headlineRefs.current[1], { xPercent: xRight, ease: "none" }, 0);
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#0e0e0e] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[80%] w-[120%] -translate-x-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-20 px-[18px] md:px-[40px]">
        <Navbar theme="dark" />
      </div>

      <div className="relative z-10 px-[18px] pb-[60px] pt-[24px] md:px-[40px] md:pb-[120px] md:pt-[48px]">
        <div className="flex items-start justify-between">
          <p
            ref={labelRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ CONTACT — 005 ]
          </p>
          <p
            ref={metaRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            REPLIES IN 2 BUSINESS DAYS
          </p>
        </div>

        <h1
          className="mt-[80px] text-[72px] font-medium capitalize leading-[0.88] tracking-[-0.06em] md:mt-[160px] md:text-[clamp(120px,_15vw,_220px)]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          <span className="block overflow-hidden">
            <span ref={setHeadlineRef(0)} className="block will-change-transform">
              Let&apos;s
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={setHeadlineRef(1)}
              className="block italic will-change-transform"
              style={{ fontWeight: 400 }}
            >
              talk.
            </span>
          </span>
        </h1>

        <div className="mt-[40px] grid gap-[28px] md:mt-[64px] md:grid-cols-12 md:items-end md:gap-[40px]">
          <div className="md:col-span-6">
            <p
              ref={subRef}
              className="text-[15px] leading-[1.45] text-white/85 md:text-[18px]"
            >
              Send a brief, a deck, or a paragraph about what you&apos;re trying
              to build. The more context, the better the first reply will be.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
