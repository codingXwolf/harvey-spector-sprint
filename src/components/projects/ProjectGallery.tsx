"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectGalleryImage } from "@/sanity/lib/queries";

gsap.registerPlugin(ScrollTrigger);

function GalleryItem({ item }: { item: ProjectGalleryImage }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!frameRef.current || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.from(frameRef.current, {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top 85%",
        },
      });
    }, frameRef);
    return () => ctx.revert();
  }, []);

  const aspect = item.wide ? "aspect-[16/9]" : "aspect-[4/5]";

  return (
    <figure className={item.wide ? "md:col-span-12" : "md:col-span-6"}>
      <div
        ref={frameRef}
        className={`relative ${aspect} overflow-hidden bg-zinc-200`}
      >
        <div ref={imgRef} className="absolute inset-[-8%]">
          <Image
            src={item.imagePath}
            alt={item.caption ?? "Project image"}
            fill
            quality={95}
            sizes={
              item.wide
                ? "(min-width: 768px) calc(100vw - 80px), 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            style={{ objectPosition: item.objectPosition ?? "center" }}
            className="object-cover"
          />
        </div>
      </div>
      {item.caption ? (
        <figcaption
          className="mt-[12px] text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:mt-[16px] md:text-[13px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function ProjectGallery({
  items,
}: {
  items: ProjectGalleryImage[];
}) {
  if (!items?.length) return null;

  return (
    <section className="bg-[#f1f1f1] text-black">
      <div className="px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ GALLERY — 003 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            003
          </p>
        </div>

        <div className="mt-[40px] grid gap-[24px] md:mt-[80px] md:grid-cols-12 md:gap-[24px]">
          {items.map((item, i) => (
            <GalleryItem key={`${item.imagePath}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
