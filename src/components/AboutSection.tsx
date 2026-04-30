import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-[#f7f7f6] text-black">
      <div className="relative pt-[39px] pb-[40px] md:min-h-[640px] md:px-[23px] md:pt-[96px] md:pb-[60px]">
        {/* Mobile column — everything aligned to a 343px-wide left-aligned stack */}
        <div className="mx-auto w-full max-w-[343px] px-[13px] md:hidden">
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

          <div className="relative mt-[18px] px-[18px] py-[18px]">
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

          <div className="relative mt-[18px] h-[482.8px] w-full overflow-hidden bg-black">
            <Image
              src="/about-portrait.jpg"
              alt="Portrait"
              fill
              priority={false}
              sizes="343px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Desktop layout */}
        <p
          className="hidden text-[10px] leading-none md:absolute md:right-[360px] md:top-[116px] md:block"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          002
        </p>
        <p
          className="hidden text-[10px] leading-none md:absolute md:left-[23px] md:top-[116px] md:block"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ ABOUT ]
        </p>

        <div className="hidden md:absolute md:left-1/2 md:top-[460px] md:block md:h-[99px] md:w-[338px] md:-translate-x-1/2 md:px-[27px] md:py-[12px]">
          <span className="absolute left-0 top-0 h-[13px] w-[13px] border-l border-t border-black" />
          <span className="absolute right-0 top-0 h-[13px] w-[13px] border-r border-t border-black" />
          <span className="absolute bottom-0 left-0 h-[13px] w-[13px] border-b border-l border-black" />
          <span className="absolute bottom-0 right-0 h-[13px] w-[13px] border-b border-r border-black" />

          <p className="text-left text-[10px] leading-[1.13]">
            Placeholder paragraph one. This is where you introduce yourself —
            your background, your passion for your craft, and what drives you
            creatively. Two to three sentences work best here. Placeholder
            paragraph two. Here you can describe your technical approach, how
            you collaborate with clients, or what sets your work apart from
            others in your field.
          </p>
        </div>

        <div className="hidden md:absolute md:right-[25px] md:top-[96px] md:block md:h-[520px] md:w-[380px] md:overflow-hidden md:bg-black">
          <Image
            src="/about-image.png"
            alt="Portrait"
            fill
            priority={false}
            sizes="380px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
