"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const tiers = [
  {
    name: "Sprint",
    starting: "From $12k",
    timeline: "2–3 weeks",
    fit: "A focused engagement to ship one specific thing — a landing page, a brand audit, a microsite.",
    includes: [
      "One discipline, scoped tightly",
      "Weekly check-ins",
      "Source files at handoff",
    ],
  },
  {
    name: "Project",
    starting: "From $48k",
    timeline: "8–14 weeks",
    fit: "Identity + site + launch in one engagement. The most common shape of our work.",
    includes: [
      "Branding and web design",
      "Engineering and CMS",
      "Launch support",
    ],
    featured: true,
  },
  {
    name: "Partnership",
    starting: "Retainer",
    timeline: "6+ months",
    fit: "Embedded with your team across multiple initiatives. Strategy, design, and engineering on call.",
    includes: [
      "Dedicated capacity",
      "Quarterly roadmaps",
      "Priority response",
    ],
  },
];

export default function EngagementSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#f1f1f1] text-black">
      <div className="px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ ENGAGEMENT — 005 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            005
          </p>
        </div>

        <h2
          className="mt-[60px] max-w-[18ch] text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:mt-[120px] md:text-[clamp(48px,_5.5vw,_84px)]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Three ways to work together.
        </h2>

        <div className="mt-[60px] grid gap-[20px] md:mt-[100px] md:grid-cols-3 md:gap-[24px]">
          {tiers.map((t, idx) => {
            const isHovered = hoveredIdx === idx;
            // Only one card is dark at a time. Featured stays dark by default,
            // but yields to whichever card the user is currently hovering.
            const isDark = isHovered || (t.featured && hoveredIdx === null);
            return (
              <div
                key={t.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative flex flex-col rounded-[2px] border p-[28px] transition-all duration-500 ease-out hover:-translate-y-1 md:p-[36px] ${
                  isDark
                    ? "border-black bg-black text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
                    : "border-black/15 bg-white text-black"
                }`}
              >
                {t.featured && (
                  <span
                    className="absolute right-[20px] top-[20px] text-[10px] uppercase leading-none tracking-[0.16em] text-white/70"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    Most chosen
                  </span>
                )}

                <h3
                  className="text-[28px] font-medium leading-[1] tracking-[-0.03em] md:text-[32px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t.name}
                </h3>
                <div
                  className={`mt-[12px] flex items-baseline gap-[12px] text-[12px] uppercase leading-none tracking-[0.16em] transition-colors duration-500 md:text-[13px] ${
                    isDark ? "text-white/70" : "text-black/55"
                  }`}
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  <span>{t.starting}</span>
                  <span>·</span>
                  <span>{t.timeline}</span>
                </div>

                <p
                  className={`mt-[24px] text-[15px] leading-[1.5] transition-colors duration-500 md:text-[16px] ${
                    isDark ? "text-white/85" : "text-black/75"
                  }`}
                >
                  {t.fit}
                </p>

                <ul
                  className={`mt-[24px] space-y-[10px] text-[13px] leading-[1.45] transition-colors duration-500 md:text-[14px] ${
                    isDark ? "text-white/80" : "text-black/70"
                  }`}
                >
                  {t.includes.map((line) => (
                    <li key={line} className="flex items-start gap-[10px]">
                      <span
                        className={`transition-colors duration-500 ${
                          isDark ? "text-white/40" : "text-black/35"
                        }`}
                      >
                        —
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-[28px]">
                  <CtaButton
                    key={isDark ? "light" : "dark"}
                    variant={isDark ? "light" : "dark"}
                    className="px-4 py-3 tracking-[-0.04em]"
                  >
                    Start a {t.name.toLowerCase()}
                  </CtaButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
