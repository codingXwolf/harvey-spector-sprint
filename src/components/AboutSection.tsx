"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
  const desktopOverlayRef = useRef<HTMLDivElement | null>(null);
  const mobileTextCardRef = useRef<HTMLDivElement | null>(null);
  const desktopTextCardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const overlays = [mobileOverlayRef.current, desktopOverlayRef.current];
    const textCards = [mobileTextCardRef.current, desktopTextCardRef.current];

    const tweens = overlays
      .filter((overlay): overlay is HTMLDivElement => Boolean(overlay))
      .map((overlay) =>
        gsap.fromTo(
          overlay,
          { width: "100%" },
          {
            width: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: overlay.parentElement,
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        )
      );

    const textTweens = textCards
      .filter((card): card is HTMLDivElement => Boolean(card))
      .map((card) =>
        gsap.fromTo(
          card,
          { x: 0 },
          {
            x: -120,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 25%",
              scrub: true,
            },
          }
        )
      );

    return () => {
      [...tweens, ...textTweens].forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section className="bg-[#f7f7f6] text-black">
      <div className="relative pt-[39px] pb-[40px] md:min-h-[640px] md:px-[23px] md:pt-[96px] md:pb-[60px]">
        {/* Mobile column — everything aligned to a 343px-wide left-aligned stack */}
        <div className="w-full px-[18px] md:hidden">
          <p
            className="text-[10px] leading-none"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            002
          </p>
          <p
            className="mt-[14px] text-[10px] leading-none"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ ABOUT ]
          </p>

          <div
            ref={mobileTextCardRef}
            className="relative mt-[18px] px-[18px] py-[18px] will-change-transform"
          >
            <span className="absolute left-0 top-0 h-[12px] w-[12px] border-l border-t border-black" />
            <span className="absolute right-0 top-0 h-[12px] w-[12px] border-r border-t border-black" />
            <span className="absolute bottom-0 left-0 h-[12px] w-[12px] border-b border-l border-black" />
            <span className="absolute bottom-0 right-0 h-[12px] w-[12px] border-b border-r border-black" />

            <p className="text-left text-[12px] leading-[1.45]">
              Placeholder paragraph one. This is where you introduce yourself —
              your background, your passion for your craft, and what drives you
              creatively. Two to three sentences work best here. Placeholder
              paragraph two. Here you can describe your technical approach, how
              you collaborate with clients, or what sets your work apart from
              others in your field.
            </p>
          </div>

          <div className="relative mt-[40px] aspect-[343/483] w-full overflow-hidden bg-black">
            <Image
              src="/about-portrait.jpg"
              alt="Portrait"
              fill
              priority={false}
              sizes="100vw"
              className="object-cover"
            />
            <div
              ref={mobileOverlayRef}
              aria-hidden="true"
              className="absolute bottom-0 right-0 top-0 z-10 bg-black"
            />
          </div>
        </div>

        {/* Desktop layout */}
        <p
          className="hidden text-[10px] leading-none md:absolute md:left-[23px] md:top-[116px] md:block"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ ABOUT ]
        </p>
        <p
          className="hidden text-[10px] leading-none md:absolute md:right-[23px] md:top-[116px] md:block"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          002
        </p>

        <div className="hidden md:flex md:items-end md:justify-end md:gap-[24px]">
          <div
            ref={desktopTextCardRef}
            className="relative h-[160px] w-[360px] flex-shrink-0 px-[27px] py-[16px] will-change-transform"
          >
            <span className="absolute left-0 top-0 h-[13px] w-[13px] border-l border-t border-black" />
            <span className="absolute right-0 top-0 h-[13px] w-[13px] border-r border-t border-black" />
            <span className="absolute bottom-0 left-0 h-[13px] w-[13px] border-b border-l border-black" />
            <span className="absolute bottom-0 right-0 h-[13px] w-[13px] border-b border-r border-black" />

            <p className="text-left text-[12px] leading-[1.45]">
              Placeholder paragraph one. This is where you introduce yourself —
              your background, your passion for your craft, and what drives you
              creatively. Two to three sentences work best here. Placeholder
              paragraph two. Here you can describe your technical approach, how
              you collaborate with clients, or what sets your work apart from
              others in your field.
            </p>
          </div>

          <div className="relative h-[520px] w-[380px] flex-shrink-0 overflow-hidden bg-black">
            <Image
              src="/about-image.png"
              alt="Portrait"
              fill
              priority={false}
              sizes="380px"
              className="object-cover"
            />
            <div
              ref={desktopOverlayRef}
              aria-hidden="true"
              className="absolute bottom-0 right-0 top-0 z-10 bg-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
