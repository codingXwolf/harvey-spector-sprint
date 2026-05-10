"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const disciplines = ["Branding", "Web", "Engineering", "Photography"];

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRefs = useRef<HTMLSpanElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const metaRef = useRef<HTMLParagraphElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const disciplineRefs = useRef<HTMLLIElement[]>([]);

  const setHeadlineRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) headlineRefs.current[idx] = el;
  };
  const setDisciplineRef = (idx: number) => (el: HTMLLIElement | null) => {
    if (el) disciplineRefs.current[idx] = el;
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
        .from(subRef.current, { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(
          disciplineRefs.current,
          { autoAlpha: 0, x: -20, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#f7f7f6] text-black"
    >
      {/* Soft radial glow */}
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

      <div className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col px-[18px] pb-[40px] md:px-[40px] md:pb-[56px]">
        <div className="flex items-start justify-between pt-[24px] md:pt-[48px]">
          <p
            ref={labelRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ SERVICES — 002 ]
          </p>
          <p
            ref={metaRef}
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            FOUR DISCIPLINES / ONE STUDIO
          </p>
        </div>

        <h1
          className="mt-auto text-[72px] font-medium capitalize leading-[0.88] tracking-[-0.06em] md:text-[clamp(120px,_15vw,_220px)]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          <span className="block overflow-hidden">
            <span ref={setHeadlineRef(0)} className="block will-change-transform">
              Built
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={setHeadlineRef(1)}
              className="block italic will-change-transform"
              style={{ fontWeight: 400 }}
            >
              with
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={setHeadlineRef(2)} className="block will-change-transform">
              intent.
            </span>
          </span>
        </h1>

        <div className="mt-[40px] grid gap-[28px] md:mt-[64px] md:grid-cols-12 md:items-end md:gap-[40px]">
          <div className="md:col-span-5">
            <p
              ref={subRef}
              className="text-[15px] leading-[1.45] text-black/75 md:text-[18px]"
            >
              From the first brand mark to the last shipped pixel — we run the
              full arc of identity, product, and story so nothing gets lost in
              the handoff.
            </p>
          </div>

          <ul
            className="md:col-span-6 md:col-start-7 grid grid-cols-2 gap-y-[14px] gap-x-[24px] text-[14px] uppercase leading-none tracking-[0.16em] text-black/65 md:text-[15px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {disciplines.map((d, i) => (
              <li
                key={d}
                ref={setDisciplineRef(i)}
                className="flex items-baseline gap-[10px]"
              >
                <span className="text-black/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-black">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
