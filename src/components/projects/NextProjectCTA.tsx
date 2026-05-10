"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectDetail } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

export default function NextProjectCTA({
  next,
}: {
  next: NonNullable<ProjectDetail["nextProject"]>;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from([labelRef.current, titleRef.current], {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#0e0e0e] text-white"
    >
      <Link
        href={`/projects/${next.slug}`}
        className="group block px-[18px] py-[100px] md:px-[40px] md:py-[160px]"
      >
        <p
          ref={labelRef}
          className="text-[12px] uppercase leading-none tracking-[0.16em] text-white/55 md:text-[14px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ NEXT PROJECT ]
        </p>

        <div className="mt-[40px] grid items-center gap-[40px] md:mt-[60px] md:grid-cols-12 md:gap-[60px]">
          <h2
            ref={titleRef}
            className="md:col-span-7 text-[48px] font-medium capitalize leading-[0.95] tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-[12px] md:text-[clamp(72px,_8vw,_140px)]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            {next.title}
          </h2>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
              <div ref={imgRef} className="absolute inset-[-6%]">
                <Image
                  src={next.imagePath}
                  alt={`${next.title} preview`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  style={{ objectPosition: next.objectPosition ?? "center" }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
