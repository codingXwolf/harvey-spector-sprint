"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const tween = gsap.fromTo(
      headlineRef.current,
      { backgroundPositionX: "100%" },
      {
        backgroundPositionX: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 45%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="relative px-[11px] pt-[34px] pb-[40px] md:px-[40px] md:pt-[40px] md:pb-[60px]">
        {/* Top: [ 8+ YEARS IN INDUSTRY ] above thin divider line (right on desktop, centered on mobile) */}
        <p
          className="pb-[8px] text-center text-[10px] leading-none md:pb-[10px] md:text-right"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ 8+ YEARS IN INDUSTRY ]
        </p>
        <div className="mb-[24px] border-t border-black md:mb-[40px]" />

        {/* Mobile-only 001 (its own centered line). On desktop, 001 is a superscript next to the slash. */}
        <div
          className="mb-[12px] text-center text-[10px] leading-none md:hidden"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          001
        </div>

        <h2
          ref={headlineRef}
          className="mx-auto text-center font-light uppercase leading-[0.95] tracking-[-0.02em] text-[#050505] md:mx-0 md:max-w-none md:text-left md:leading-[0.84]"
          style={{
            fontSize: "clamp(26px, 7.2vw, 96px)",
            backgroundImage:
              "linear-gradient(to right, #050505 0%, #050505 50%, rgba(5, 5, 5, 0.16) 50%, rgba(5, 5, 5, 0.16) 100%)",
            backgroundClip: "text",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {/* Line 1: flush left */}
          <span className="block">
            A CREATIVE DIRECTOR
            <span>&nbsp;/</span>
            <sup
              className="ml-[2px] align-super text-[0.18em] tracking-normal"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              001
            </sup>
          </span>
          {/* Line 2: ~20% indent on desktop */}
          <span className="block md:ml-[20%]">PHOTOGRAPHER</span>
          {/* Line 3: ~40% indent on desktop */}
          <span className="block md:ml-[40%]">
            BORN{" "}
            <em
              className="font-serif italic"
              style={{ fontWeight: 400 }}
            >
              &amp;
            </em>{" "}
            RAISED
          </span>
          {/* Line 4: flush left */}
          <span className="block">ON THE SOUTH SIDE</span>
          {/* Line 5: ~30% indent on desktop, with [ CREATIVE FREELANCER ] inline at bottom-right */}
          <span className="block md:ml-[40%]">
            <span className="md:inline">OF CHICAGO.</span>
            <span
              className="ml-[-60px] hidden -translate-y-[4em] align-baseline text-[10px] tracking-normal md:inline-block"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ CREATIVE FREELANCER ]
            </span>
          </span>
        </h2>

        {/* Mobile-only [ CREATIVE FREELANCER ] */}
        <p
          className="mt-[16px] text-center text-[10px] leading-none md:hidden"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ CREATIVE FREELANCER ]
        </p>
      </div>
    </section>
  );
}
