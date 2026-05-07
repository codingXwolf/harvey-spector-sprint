"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headline =
  "I don't just design things — I craft experiences that leave a mark.";

export default function StorySection() {
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

  const words = headline.split(" ");

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="relative px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
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

        <h2
          className="mt-[60px] text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:mt-[120px] md:text-[clamp(48px,_5.5vw,_84px)]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {words.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block">
              <span ref={setWordRef(i)} className="inline-block">
                {w}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <div className="mt-[80px] grid gap-[40px] md:mt-[140px] md:grid-cols-12 md:gap-[40px]">
          <div className="md:col-span-3">
            <p
              className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[13px]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ THE BIO ]
            </p>
          </div>
          <div className="space-y-[24px] text-[15px] leading-[1.6] md:col-span-7 md:col-start-6 md:space-y-[28px] md:text-[17px]">
            <p>
              I started behind a borrowed camera and a stubborn belief that the
              best work sits where art and engineering meet. A decade later,
              that belief has shaped identity systems, photo essays, product
              launches, and a long list of late nights I&apos;d happily do
              again.
            </p>
            <p>
              The studio runs small on purpose. Every project — every frame,
              every line of code — passes through the same hands from kickoff
              to launch. No handoffs, no junior dropoffs, no surprise lines on
              the invoice.
            </p>
            <p>
              The work has been recognized by Awwwards, FWA, CSSDA, and
              Communication Arts. The relationships have been better than the
              awards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
