"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const articles = [
  {
    image: "/maker.png",
  },
  {
    image: "/eames.png",
  },
  {
    image: "/books.png",
  },
];

function NewsCard({
  article,
  className = "",
}: {
  article: (typeof articles)[number];
  className?: string;
}) {
  return (
    <article className={`w-[299px] shrink-0 md:w-[354px] ${className}`}>
      <div className="relative h-[398px] overflow-hidden bg-zinc-200 md:h-[471px]">
        <Image
          src={article.image}
          alt="Latest news and achievements"
          fill
          sizes="(min-width: 768px) 354px, 299px"
          className="object-cover"
        />
      </div>
      <p className="mt-[18px] text-[16px] leading-[1.19] md:mt-[15px] md:text-[14px] md:leading-[1.2]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>
  );
}

export default function NewsSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

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
    const clamped = Math.max(0, Math.min(articles.length - 1, idx));
    const el = itemsRef.current[clamped];
    if (!scroller || !el) return;
    const target =
      el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2;
    scroller.scrollTo({ left: target, behavior: "smooth" });
    setActiveIdx(clamped);
  };

  return (
    <section className="overflow-hidden bg-[#f1f1f1] text-black">
      <div className="relative min-h-[742px] pb-[50px] pt-[68px] md:min-h-[930px] md:px-0 md:py-0">
        <h2 className="ml-[17px] max-w-[330px] text-[30px] font-light uppercase leading-[0.9] tracking-[-0.05em] md:absolute md:left-[35px] md:top-[832px] md:ml-0 md:max-w-none md:origin-top-left md:-rotate-90 md:text-[57px]">
          Keep up with my
          <br />
          latest news &amp; achievements
        </h2>

        {/* Mobile: swipeable carousel with dots */}
        <div className="md:hidden">
          <div
            ref={scrollerRef}
            className="mt-[33px] flex snap-x snap-mandatory gap-[17px] overflow-x-auto overflow-y-hidden px-[17px] pb-[8px] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingLeft: 17, scrollPaddingRight: 17 }}
          >
            {articles.map((article, idx) => (
              <div
                key={article.image}
                ref={(el) => {
                  if (el) el.dataset.idx = String(idx);
                  itemsRef.current[idx] = el;
                }}
                className="flex-none snap-center"
              >
                <NewsCard article={article} />
              </div>
            ))}
          </div>

          <div className="mt-[20px] flex items-center justify-center gap-[8px]">
            {articles.map((a, idx) => (
              <button
                key={a.image}
                type="button"
                aria-label={`Go to article ${idx + 1}`}
                onClick={() => goTo(idx)}
                className={`h-[8px] w-[8px] rounded-full transition-colors ${
                  idx === activeIdx ? "bg-black" : "bg-black/25"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: original scattered absolute layout */}
        <div className="hidden md:block">
          <NewsCard article={articles[0]} className="md:absolute md:left-[388px] md:top-[125px]" />
          <div className="md:absolute md:left-[772px] md:top-[125px] md:h-[702px] md:w-px md:bg-black/10" />
          <NewsCard article={articles[1]} className="md:absolute md:left-[804px] md:top-[245px]" />
          <div className="md:absolute md:left-[1188px] md:top-[125px] md:h-[702px] md:w-px md:bg-black/10" />
          <NewsCard article={articles[2]} className="md:absolute md:left-[1220px] md:top-[125px]" />
        </div>
      </div>
    </section>
  );
}
