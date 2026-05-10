"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectBody({ paragraphs }: { paragraphs: string[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const paraRefs = useRef<HTMLParagraphElement[]>([]);

  const setParaRef = (idx: number) => (el: HTMLParagraphElement | null) => {
    if (el) paraRefs.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(paraRefs.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!paragraphs?.length) return null;

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ STORY — 002 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            002
          </p>
        </div>

        <div className="mt-[60px] grid gap-[28px] md:mt-[100px] md:grid-cols-12 md:gap-[40px]">
          <div className="md:col-span-7 md:col-start-3 space-y-[24px] md:space-y-[32px]">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                ref={setParaRef(i)}
                className="text-[16px] leading-[1.6] text-black/80 md:text-[18px]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
