"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    logo: "Logoipsum",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    desktop: { left: 102, top: 105, rotate: -6.85 },
    mobileRotate: -3.5,
  },
  {
    logo: "Logoipsum",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    desktop: { left: 676, top: 180, rotate: 2.9 },
    mobileRotate: 2,
  },
  {
    logo: "Logoipsum University",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    desktop: { left: 305, top: 470, rotate: 2.23 },
    mobileRotate: -2.5,
  },
  {
    logo: "Logoipsum",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    desktop: { left: 987, top: 466, rotate: -4.15 },
    mobileRotate: 2,
  },
];

function Card({
  item,
  width,
  className = "",
}: {
  item: (typeof testimonials)[number];
  width: number;
  className?: string;
}) {
  return (
    <article
      className={`flex flex-col gap-[16px] rounded-[4px] border border-[#ddd] bg-[#f1f1f1] p-[24px] ${className}`}
      style={{ width }}
    >
      <p className="text-[16px] font-semibold italic leading-none text-black/35">
        {item.logo}
      </p>
      <p className="text-[16px] leading-[1.3] tracking-[-0.03em] text-[#1f1f1f]">
        {item.quote}
      </p>
      <p className="text-[15px] font-black uppercase leading-[1.1] tracking-[-0.04em]">
        {item.name}
      </p>
    </article>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const tweens = parallaxRefs.current
      .filter((card): card is HTMLDivElement => Boolean(card))
      .map((card, idx) =>
        gsap.fromTo(
          card,
          {
            x: idx % 2 === 0 ? -26 : 24,
            y: idx % 2 === 0 ? 46 : -34,
          },
          {
            x: idx % 2 === 0 ? 28 : -24,
            y: idx % 2 === 0 ? -34 : 46,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Infinity;
      itemsRef.current.forEach((el, idx) => {
        if (!el) return;
        const itemCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(center - itemCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = idx;
        }
      });
      setActiveIdx(nearest);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (idx: number) => {
    const scroller = scrollerRef.current;
    const clamped = Math.max(0, Math.min(testimonials.length - 1, idx));
    const el = itemsRef.current[clamped];
    if (!scroller || !el) return;
    const target =
      el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2;
    scroller.scrollTo({ left: target, behavior: "smooth" });
    setActiveIdx(clamped);
  };

  return (
    <section ref={sectionRef} className="overflow-x-hidden bg-[#f7f7f6] text-black">
      {/* Mobile (<1024px): swipeable horizontal carousel with click controls */}
      <div className="lg:hidden">
        <div className="px-[16px] py-[64px]">
          <h2 className="text-center text-[64px] font-medium capitalize leading-[0.8] tracking-[-0.07em] md:text-[96px]">
            Testimonials
          </h2>
          <div
            ref={scrollerRef}
            className="-mx-[16px] mt-[32px] flex snap-x snap-mandatory gap-[18px] overflow-x-auto overflow-y-hidden px-[16px] pb-[40px] pt-[20px] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [overscroll-behavior-x:contain] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingLeft: 16, scrollPaddingRight: 16 }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={item.name}
                ref={(el) => {
                  if (el) el.dataset.idx = String(idx);
                  itemsRef.current[idx] = el;
                }}
                className="flex-none snap-center"
                style={{ transform: `rotate(${item.mobileRotate}deg)` }}
              >
                <div
                  ref={(el) => {
                    parallaxRefs.current[idx] = el;
                  }}
                  className="will-change-transform"
                >
                  <Card item={item} width={260} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[8px] flex items-center justify-center gap-[8px]">
            {testimonials.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => goTo(idx)}
                className={`h-[8px] w-[8px] rounded-full transition-colors ${
                  idx === activeIdx ? "bg-black" : "bg-black/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop (≥1024px): scattered composition with absolute positioning. */}
      <div className="hidden lg:block">
        <div className="relative mx-auto h-[900px] w-full max-w-[1440px] px-[32px] py-[120px]">
          <div className="relative mx-auto h-[800px] w-[1400px] max-w-full origin-top scale-[0.78] xl:scale-100">
            <h2 className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[198px] font-medium capitalize leading-[1.1] tracking-[-0.07em]">
              Testimonials
            </h2>

            {testimonials.map((item, idx) => (
              <div
                key={item.name}
                className="absolute z-0"
                style={{
                  left: item.desktop.left,
                  top: item.desktop.top,
                  transform: `rotate(${item.desktop.rotate}deg)`,
                }}
              >
                <div
                  ref={(el) => {
                    parallaxRefs.current[testimonials.length + idx] = el;
                  }}
                  className="will-change-transform"
                >
                  <Card item={item} width={353} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
