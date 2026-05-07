"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/CtaButton";

gsap.registerPlugin(ScrollTrigger);

export default function PortraitSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { width: "100%" },
        {
          width: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center 40%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="relative px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ NEXT — 006 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            006
          </p>
        </div>

        <div className="mt-[60px] grid gap-[60px] md:mt-[120px] md:grid-cols-12 md:gap-[40px]">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
              <div
                ref={imageRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/about-portrait.jpg"
                  alt="Portrait"
                  fill
                  quality={95}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                ref={overlayRef}
                aria-hidden="true"
                className="absolute bottom-0 right-0 top-0 z-10 bg-black"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 md:col-start-8">
            <p
              className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[13px]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              [ LET&apos;S TALK ]
            </p>
            <h2
              className="mt-[24px] text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:mt-[32px] md:text-[clamp(56px,_5.5vw,_88px)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ready to build
              <br />
              something{" "}
              <em className="italic" style={{ fontWeight: 400 }}>
                meaningful
              </em>
              ?
            </h2>
            <p className="mt-[24px] text-[15px] leading-[1.55] text-black/75 md:mt-[32px] md:text-[17px]">
              I take on a small handful of new projects each year. If
              you&apos;re working on something ambitious — a brand, a product,
              or a story worth telling — I&apos;d love to hear about it.
            </p>
            <div className="mt-[32px] flex items-center gap-[20px] md:mt-[44px]">
              <CtaButton variant="dark">Start a project</CtaButton>
              <a
                href="mailto:hello@hstudio.com"
                className="text-[14px] underline-offset-4 hover:underline md:text-[15px]"
              >
                hello@hstudio.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
