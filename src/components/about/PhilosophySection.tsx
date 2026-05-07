"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quote =
  "“Good work is patient. It listens before it speaks, edits before it ships, and earns its place on the wall.”";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const setWordRef = (idx: number) => (el: HTMLSpanElement | null) => {
    if (el) wordsRef.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(wordsRef.current, { color: "rgba(0,0,0,0.18)" });

      gsap.to(wordsRef.current, {
        color: "rgba(0,0,0,1)",
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center 35%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = quote.split(" ");

  return (
    <section ref={sectionRef} className="bg-[#f1f1f1] text-black">
      <div className="relative px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ PHILOSOPHY — 003 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            003
          </p>
        </div>

        <div className="mt-[60px] grid gap-[60px] md:mt-[120px] md:grid-cols-12 md:gap-[40px]">
          <blockquote
            className="md:col-span-7"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <p
              className="text-[40px] italic leading-[1.05] tracking-[-0.04em] md:text-[clamp(56px,_6vw,_96px)]"
              style={{ fontWeight: 400 }}
            >
              {words.map((w, i) => (
                <span key={`${w}-${i}`} className="inline-block">
                  <span ref={setWordRef(i)} className="inline-block">
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </blockquote>

          <div className="md:col-span-4 md:col-start-9">
            <div className="relative px-[20px] py-[24px] md:px-[24px] md:py-[28px]">
              <span className="absolute left-0 top-0 h-[14px] w-[14px] border-l border-t border-black" />
              <span className="absolute right-0 top-0 h-[14px] w-[14px] border-r border-t border-black" />
              <span className="absolute bottom-0 left-0 h-[14px] w-[14px] border-b border-l border-black" />
              <span className="absolute bottom-0 right-0 h-[14px] w-[14px] border-b border-r border-black" />

              <p
                className="text-[11px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[12px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                [ ON CRAFT ]
              </p>
              <p className="mt-[18px] text-[14px] leading-[1.55] md:text-[15px]">
                Strategy first, visuals last. We build slow on purpose —
                because the things worth keeping are rarely the things made in
                a hurry.
              </p>
              <p className="mt-[16px] text-[14px] leading-[1.55] md:text-[15px]">
                Every project is a system. Brand, site, story — they move
                together or they don&apos;t move at all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
