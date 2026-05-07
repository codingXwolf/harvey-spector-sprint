"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, suffix: "+", label: "Years in business" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 45, suffix: "", label: "Clients worldwide" },
  { value: 12, suffix: "", label: "Awards & features" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const numberRefs = useRef<HTMLSpanElement[]>([]);

  const setNumberRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) numberRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      stats.forEach((s, idx) => {
        const el = numberRefs.current[idx];
        if (!el) return;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: s.value,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${s.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="bg-[#0d0d0d] text-white"
    >
      <div className="relative px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ BY THE NUMBERS — 004 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            004
          </p>
        </div>

        <div className="mt-[60px] grid grid-cols-2 gap-y-[48px] md:mt-[120px] md:grid-cols-4 md:gap-[24px]">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="border-t border-white/20 pt-[20px] md:pt-[28px]"
            >
              <p
                className="text-[12px] leading-none tracking-[0.16em] text-white/55 md:text-[13px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                0{idx + 1}
              </p>
              <p
                className="mt-[18px] text-[64px] font-medium leading-[0.95] tracking-[-0.06em] tabular-nums md:mt-[28px] md:text-[clamp(72px,_8vw,_128px)]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span ref={setNumberRef(idx)}>0{s.suffix}</span>
              </p>
              <p
                className="mt-[14px] text-[12px] uppercase leading-[1.3] tracking-[0.12em] text-white/75 md:mt-[20px] md:text-[13px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
