"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = { number: string; title: string; duration?: string; body?: string };

const fallbackSteps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "1–2 weeks",
    body: "Workshops, audits, and the kind of hard questions that surface what the brand actually needs to do.",
  },
  {
    number: "02",
    title: "Direction",
    duration: "2–3 weeks",
    body: "Strategy, positioning, and a tight set of design directions to align on tone before the heavy build begins.",
  },
  {
    number: "03",
    title: "Design & Build",
    duration: "4–10 weeks",
    body: "Identity, design system, and engineering shipped in close loops. You see the work weekly, not at a final reveal.",
  },
  {
    number: "04",
    title: "Launch & Care",
    duration: "Ongoing",
    body: "We hand off the keys with documentation, then stay on retainer for the inevitable next chapter.",
  },
];

export default function ProcessSection({ items }: { items?: Step[] }) {
  const steps = items && items.length > 0 ? items : fallbackSteps;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  const setStepRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) stepRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(stepRefs.current, {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="bg-[#0e0e0e] text-white"
    >
      <div className="px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ HOW WE WORK — 004 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            004
          </p>
        </div>

        <h2
          className="mt-[60px] max-w-[20ch] text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:mt-[120px] md:text-[clamp(48px,_5.5vw,_84px)]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Four phases. No surprises.
        </h2>

        <div className="mt-[60px] grid gap-[40px] md:mt-[120px] md:grid-cols-4 md:gap-[32px]">
          {steps.map((s, i) => (
            <div
              key={s.title}
              ref={setStepRef(i)}
              className="group/phase relative pt-[20px] transition-transform duration-500 ease-out hover:-translate-y-1 md:pt-[24px]"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px origin-left scale-x-100 bg-white/20 transition-colors duration-500 group-hover/phase:bg-white"
              />
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[12px] uppercase leading-none tracking-[0.16em] text-white/60 transition-colors duration-300 group-hover/phase:text-white md:text-[13px]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {s.number}
                </span>
                <span
                  className="text-[11px] uppercase leading-none tracking-[0.16em] text-white/45 transition-colors duration-300 group-hover/phase:text-white/80 md:text-[12px]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {s.duration}
                </span>
              </div>
              <h3
                className="mt-[18px] text-[24px] font-medium leading-[1.05] tracking-[-0.03em] transition-transform duration-500 ease-out group-hover/phase:translate-x-[4px] md:text-[28px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {s.title}
              </h3>
              <p className="mt-[14px] text-[14px] leading-[1.55] text-white/75 transition-colors duration-300 group-hover/phase:text-white md:text-[15px]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
