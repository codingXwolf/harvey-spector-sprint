"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsHero({ count }: { count: number }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRefs = useRef<HTMLSpanElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

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

      // Scroll: headline lines split apart horizontally (home page pattern).
      const split = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      split
        .to(headlineRefs.current[0], { xPercent: -28, ease: "none" }, 0)
        .to(headlineRefs.current[1], { xPercent: 22, ease: "none" }, 0);

      // Tick the project count up from 00.
      if (counterRef.current && count > 0) {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: count,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.4,
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(obj.v)
              ).padStart(2, "0");
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#f7f7f6] text-black"
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

      <div className="relative z-10 flex flex-col px-[18px] pb-[60px] md:min-h-[calc(100vh-96px)] md:px-[40px] md:pb-[56px]">
        <div className="flex items-start justify-between pt-[24px] md:pt-[48px]">
          <p
            ref={labelRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ PROJECTS — 003 ]
          </p>
          <p
            ref={metaRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            <span ref={counterRef}>{String(count).padStart(2, "0")}</span>{" "}
            / SELECTED WORK
          </p>
        </div>

        <h1
          className="mt-[96px] text-center text-[96px] font-medium capitalize leading-[0.88] tracking-[-0.06em] md:mt-auto md:text-left md:text-[clamp(120px,_15vw,_220px)]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          <span className="block overflow-hidden">
            <span ref={setHeadlineRef(0)} className="block will-change-transform">
              The
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={setHeadlineRef(1)}
              className="block italic will-change-transform"
              style={{ fontWeight: 400 }}
            >
              receipts.
            </span>
          </span>
        </h1>

        <div className="mt-[40px] grid gap-[28px] md:mt-[64px] md:grid-cols-12 md:items-end md:gap-[40px]">
          <div className="md:col-span-5">
            <p
              ref={subRef}
              className="mx-auto max-w-[40ch] text-center text-[17px] leading-[1.5] text-black/75 md:mx-0 md:max-w-none md:text-left md:text-[18px]"
            >
              A working archive of brands, products, and stories shipped from
              the studio. Some recent, some old enough to be embarrassing — all
              honest about what we made and why.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
