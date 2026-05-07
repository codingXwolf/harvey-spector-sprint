"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);

  const setLineRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) lineRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial zoom on the bg image so the scroll zoom continues outward.
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(bgRef.current, isMobile ? { scale: 1.35, yPercent: 8, xPercent: 18 } : { scale: 1 });

      // Staggered reveal of the three headline lines.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(lineRefs.current, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
        })
        .from(
          [labelRef.current, metaRef.current],
          { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.06 },
          "-=0.7"
        )
        .from(subRef.current, { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4");

      // Scroll: image zooms further, words split apart horizontally.
      const split = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      split
        .to(bgRef.current, { scale: 1.35, ease: "none" }, 0)
        .to(lineRefs.current[0], { xPercent: -28, ease: "none" }, 0)
        .to(lineRefs.current[1], { xPercent: 18, ease: "none" }, 0)
        .to(lineRefs.current[2], { xPercent: -22, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative h-screen min-h-[680px] overflow-hidden bg-black text-white"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform md:left-[2%] md:right-[-15%]"
      >
        <Image
          src="/hero-bg-photo.jpg"
          alt="Behind the lens"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover [object-position:50%_0%] md:[object-position:70%_10%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"
        />
      </div>

      <div className="relative z-20 px-[18px] md:px-[40px]">
        <Navbar theme="dark" />
      </div>

      <div className="relative z-10 flex h-[calc(100%-96px)] flex-col px-[18px] pb-[40px] md:px-[40px] md:pb-[56px]">
        <div className="flex items-start justify-between pt-[24px] md:pt-[48px]">
          <p
            ref={labelRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ ABOUT — 001 ]
          </p>
          <p
            ref={metaRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            EST. 2014 / NYC
          </p>
        </div>

        <h1
          className="mt-auto text-[88px] font-medium capitalize leading-[0.85] tracking-[-0.07em] md:text-[clamp(120px,_16vw,_240px)]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          <span className="block overflow-hidden">
            <span ref={setLineRef(0)} className="block will-change-transform">
              A life
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={setLineRef(1)}
              className="block italic will-change-transform"
              style={{ fontWeight: 400 }}
            >
              measured
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={setLineRef(2)} className="block will-change-transform">
              in frames.
            </span>
          </span>
        </h1>

        <div className="mt-[32px] grid gap-[20px] md:mt-[48px] md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p
              className="text-[12px] uppercase leading-none tracking-[0.16em] text-white/60 md:text-[13px]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ Scroll to enter ]
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p
              ref={subRef}
              className="text-[15px] leading-[1.45] text-white/85 md:text-[17px]"
            >
              A designer, photographer, and engineer obsessed with the craft of
              telling honest stories — frame by frame, pixel by pixel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
