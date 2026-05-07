"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FullWidthImage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const tween = gsap.fromTo(
      imageRef.current,
      {
        yPercent: -4,
        scale: 1.08,
        filter: "blur(18px)",
      },
      {
        yPercent: 4,
        scale: 1.04,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
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
    <section ref={sectionRef} className="bg-[#f7f7f6]">
      <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden md:h-[88vh] md:min-h-[680px]">
        <div
          ref={imageRef}
          className="absolute -inset-y-[8%] left-0 right-0 will-change-transform"
        >
          <Image
            src="/camera-section.jpg"
            alt="Behind the lens"
            fill
            quality={95}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex items-start justify-between px-[18px] pb-[40px] pt-[20px] md:px-[40px] md:pb-[60px] md:pt-[28px]">
        <p
          className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ THE STUDIO — BROOKLYN, NY ]
        </p>
        <p
          className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[14px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          FIG. 01
        </p>
      </div>
    </section>
  );
}
