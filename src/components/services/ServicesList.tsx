"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  number: string;
  title: string;
  tagline?: string;
  description?: string;
  deliverables?: string[];
};

const fallbackServices: Service[] = [
  {
    number: "01",
    title: "Branding",
    tagline: "Identity systems built to age well.",
    description:
      "Naming, marks, type systems, motion guidelines, and the long-form rationale behind every choice. Brands that hold up at a billboard and a favicon.",
    deliverables: [
      "Strategy & positioning",
      "Logo & wordmark",
      "Type & color systems",
      "Brand guidelines",
    ],
  },
  {
    number: "02",
    title: "Web Design",
    tagline: "Sites that feel like the brand, not a template.",
    description:
      "Marketing sites, editorial platforms, and product surfaces designed in close partnership with the engineers building them. No throwaway comps.",
    deliverables: [
      "Art direction",
      "Wireframes & flows",
      "High-fidelity design",
      "Interaction & motion",
    ],
  },
  {
    number: "03",
    title: "Engineering",
    tagline: "Production code, not design-system theater.",
    description:
      "Next.js, GSAP, headless CMS, and the boring infrastructure that keeps it all running. We ship and we maintain.",
    deliverables: [
      "Next.js & React builds",
      "Headless CMS integration",
      "Performance & SEO",
      "Long-term maintenance",
    ],
  },
  {
    number: "04",
    title: "Photography",
    tagline: "The frame is the brief.",
    description:
      "Editorial portraits, brand stories, and on-location campaigns shot to live across web, print, and social without compromise.",
    deliverables: [
      "Editorial portraits",
      "Brand campaigns",
      "Product & still life",
      "Retouch & color",
    ],
  },
];

export default function ServicesList({ items }: { items?: Service[] }) {
  const services = items && items.length > 0 ? items : fallbackServices;
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const setRowRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) rowRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(rowRefs.current, {
        autoAlpha: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f7f7f6] text-black"
    >
      <div className="px-[18px] pb-[100px] pt-[12px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ WHAT WE DO — 003 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            003
          </p>
        </div>

        <h2
          className="mt-[60px] max-w-[18ch] text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:mt-[120px] md:text-[clamp(48px,_5.5vw,_84px)]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          A full-stack studio that finishes what it starts.
        </h2>

        <div className="mt-[60px] border-t border-black/15 md:mt-[100px]">
          {services.map((s, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={s.title}
                ref={setRowRef(i)}
                className="border-b border-black/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="group flex w-full items-baseline justify-between gap-[20px] py-[28px] text-left md:py-[40px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-[16px] md:gap-[28px]">
                    <span
                      className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[14px]"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      {s.number}
                    </span>
                    <span
                      className="text-[32px] font-medium leading-[1] tracking-[-0.04em] md:text-[clamp(40px,_4.4vw,_64px)]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {s.title}
                    </span>
                  </div>
                  <span
                    className="text-[24px] leading-none md:text-[32px]"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="grid gap-[28px] pb-[36px] md:grid-cols-12 md:gap-[40px] md:pb-[56px]">
                      <p
                        className="text-[20px] italic leading-[1.25] tracking-[-0.02em] md:col-span-6 md:col-start-3 md:text-[28px]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s.tagline}
                      </p>
                      <p className="text-[15px] leading-[1.55] text-black/75 md:col-span-6 md:col-start-3 md:text-[16px]">
                        {s.description}
                      </p>
                      <ul
                        className="space-y-[10px] text-[12px] uppercase leading-none tracking-[0.16em] text-black/60 md:col-span-3 md:col-start-10 md:text-[13px]"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {(s.deliverables ?? []).map((d) => (
                          <li key={d} className="flex items-start gap-[8px]">
                            <span className="text-black/30">→</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
