"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do you take on solo disciplines, or only full projects?",
    a: "Both. About a third of our work is single-discipline — a brand refresh, a one-page site, an editorial shoot. Most clients eventually pull more in, but we never push.",
  },
  {
    q: "What's a typical timeline?",
    a: "Most full projects ship in 8–14 weeks from kickoff. Brand-only engagements run 4–6 weeks. We'll always give you a calendar before we start, and we keep it.",
  },
  {
    q: "How does pricing actually work?",
    a: "Fixed-fee per phase, never hourly. You'll see the full investment before we sign, broken out by deliverable so there's no ambiguity about what you're paying for.",
  },
  {
    q: "Who actually does the work?",
    a: "The same small team that pitched it. No junior handoffs, no agency-of-record shuffle. The names on the proposal are the names on Slack.",
  },
  {
    q: "What if we already have a brand or a site?",
    a: "Often the best work. We slot into existing systems all the time — auditing, extending, or quietly rebuilding the parts that aren't pulling weight.",
  },
  {
    q: "Do you work with startups or only established brands?",
    a: "Both, with a preference for teams that have something real to say. Stage matters less than clarity of intent.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-[#f7f7f6] text-black">
      <div className="px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ FAQ — 006 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            006
          </p>
        </div>

        <div className="mt-[60px] grid gap-[40px] md:mt-[120px] md:grid-cols-12 md:gap-[40px]">
          <h2
            className="text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:col-span-4 md:text-[clamp(40px,_4.4vw,_64px)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Things people usually ask first.
          </h2>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border-t border-black/15">
              {faqs.map((f, i) => {
                const isOpen = openIdx === i;
                return (
                  <div key={f.q} className="border-b border-black/15">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-[20px] py-[22px] text-left md:py-[28px]"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-[16px] font-medium leading-[1.3] tracking-[-0.02em] md:text-[20px]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {f.q}
                      </span>
                      <span
                        className="flex-shrink-0 text-[20px] leading-none md:text-[24px]"
                        aria-hidden="true"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="pb-[24px] pr-[36px] text-[14px] leading-[1.6] text-black/70 md:pb-[32px] md:text-[16px]">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
