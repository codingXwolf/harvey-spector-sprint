"use client";

import CtaButton from "@/components/CtaButton";

export default function ServicesCTA() {
  return (
    <section
      data-nav-theme="dark"
      className="bg-[#0e0e0e] text-white"
    >
      <div className="px-[18px] py-[120px] text-center md:px-[40px] md:py-[200px]">
        <p
          className="text-[12px] uppercase leading-none tracking-[0.16em] text-white/55 md:text-[14px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ START SOMETHING — 007 ]
        </p>

        <h2
          className="mx-auto mt-[40px] max-w-[14ch] text-[48px] font-medium capitalize leading-[0.95] tracking-[-0.05em] md:mt-[56px] md:text-[clamp(80px,_10vw,_160px)]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Tell us what
          <br />
          <span className="italic" style={{ fontWeight: 400 }}>
            you&apos;re building.
          </span>
        </h2>

        <p className="mx-auto mt-[32px] max-w-[40ch] text-[15px] leading-[1.55] text-white/75 md:mt-[40px] md:text-[17px]">
          Send a brief, a deck, or a paragraph. We reply within two business
          days, and the first call is on us.
        </p>

        <div className="mt-[40px] flex flex-col items-center justify-center gap-[16px] md:mt-[56px] md:flex-row">
          <CtaButton
            variant="light"
            className="px-5 py-3 tracking-[-0.04em]"
          >
            Start a project
          </CtaButton>
          <a
            href="mailto:hello@hstudio.com"
            className="text-[14px] uppercase leading-none tracking-[0.16em] text-white/70 underline-offset-4 hover:text-white hover:underline md:text-[15px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            hello@hstudio.com
          </a>
        </div>
      </div>
    </section>
  );
}
