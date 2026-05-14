"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraSection() {
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
    <section
      ref={sectionRef}
      className="relative h-[565px] w-full overflow-hidden bg-black md:h-[900px]"
      data-nav-theme="dark"
    >
      <div
        ref={imageRef}
        className="absolute -inset-y-[8%] left-0 right-0 will-change-transform"
      >
        <Image
          src="/camera-section.jpg"
          alt="Photographer holding a camera"
          fill
          priority
          quality={95}
          sizes="(min-width: 768px) 1440px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
