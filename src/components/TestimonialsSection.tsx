"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    logo: "Logipsum",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    name: "Marko Stojković",
    className:
      "md:left-[-88px] md:top-[180px] md:z-20 md:w-[354px] md:-rotate-[7deg]",
  },
  {
    logo: "Logoipsum",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    name: "Lukas Weber",
    className:
      "md:left-[754px] md:top-[240px] md:z-0 md:w-[356px] md:rotate-[2.5deg]",
  },
  {
    logo: "Logoipsum University",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    name: "Sarah Jenkins",
    className:
      "md:left-[200px] md:top-[565px] md:z-20 md:w-[361px] md:rotate-[1.8deg]",
  },
  {
    logo: "Logoipsum",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    name: "Sofia Martínez",
    className:
      "md:left-[725px] md:top-[567px] md:z-20 md:w-[354px] md:-rotate-[3.5deg]",
  },
];

function TestimonialCard({
  item,
  className = "",
  cardRef,
  style,
}: {
  item: (typeof testimonials)[number];
  className?: string;
  cardRef?: (el: HTMLElement | null) => void;
  style?: React.CSSProperties;
}) {
  return (
    <article
      ref={cardRef}
      style={style}
      className={`shrink-0 rounded-[3px] border border-black/10 bg-[#f1f1f1] px-[27px] py-[24px] shadow-[0_1px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out md:absolute md:px-[30px] md:py-[28px] ${className}`}
    >
      <p className="mb-[23px] text-[18px] font-semibold italic leading-none text-black/30 md:text-[17px]">
        {item.logo}
      </p>
      <p className="text-[20px] leading-[1.13] tracking-[-0.03em] md:text-[18px]">
        {item.quote}
      </p>
      <p className="mt-[23px] text-[16px] font-black uppercase leading-none tracking-[-0.05em] md:text-[15px]">
        {item.name}
      </p>
    </article>
  );
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = { idx: activeIdx, ratio: 0 };
        entries.forEach((entry) => {
          const idx = Number(
            (entry.target as HTMLElement).dataset.idx ?? "0"
          );
          if (entry.intersectionRatio > best.ratio) {
            best = { idx, ratio: entry.intersectionRatio };
          }
        });
        if (best.ratio > 0) setActiveIdx(best.idx);
      },
      {
        root: scroller,
        threshold: [0.5, 0.7, 0.9, 1],
      }
    );

    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="overflow-hidden bg-[#f7f7f6] text-black">
      <div className="relative min-h-[520px] pt-[65px] md:min-h-[987px] md:pt-0">
        {/* H1: 198px medium, centered */}
        <h2 className="relative z-10 px-[22px] text-[62px] font-medium leading-none tracking-[-0.07em] md:absolute md:left-1/2 md:top-[400px] md:-translate-x-1/2 md:px-0 md:text-[198px]">
          Testimonials
        </h2>

        {/* Desktop: centered scattered composition */}
        <div className="hidden md:block">
          <div className="relative mx-auto h-[987px] w-[1200px]">
            {testimonials.map((item) => (
              <TestimonialCard
                key={item.name}
                item={item}
                className={item.className}
              />
            ))}
          </div>
        </div>

        {/* Mobile: scroll-snap with active-card scale focus */}
        <div
          ref={scrollerRef}
          className="mt-[41px] flex snap-x snap-mandatory gap-[20px] overflow-x-auto px-[40px] pb-[40px] pt-[20px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
        >
          {testimonials.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <TestimonialCard
                key={item.name}
                item={item}
                cardRef={(el) => {
                  if (el) el.dataset.idx = String(idx);
                  cardsRef.current[idx] = el;
                }}
                className={`w-[257px] snap-center ${
                  isActive ? "" : "opacity-70"
                }`}
                style={{
                  transform: isActive ? "scale(1.08)" : "scale(0.92)",
                  transformOrigin: "center center",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
