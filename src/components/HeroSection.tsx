import Image from "next/image";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden bg-[#f7f7f6]">
      <Image
        src="/work-cyberpunk.jpg"
        alt="Harvey Specter portrait"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-[center_35%] scale-100 md:scale-[1.25] md:object-[center_30%]"
      />

      <h1
        className="absolute left-[18px] right-[18px] top-[49%] z-10 -translate-y-1/2 text-center capitalize text-white [mix-blend-mode:overlay] md:left-[32px] md:right-[32px] md:top-[58%] md:whitespace-nowrap"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          fontSize: "clamp(76px, 13.75vw, 198px)",
          lineHeight: 1.1,
          letterSpacing: "-0.07em",
        }}
      >
        Harvey Specter
      </h1>

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <Image
          src="/work-cyberpunk.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] scale-100 md:scale-[1.35] md:object-[center_30%] [clip-path:ellipse(13%_42%_at_50%_45%)] md:[clip-path:ellipse(9%_1%_at_50%_47%)]"
        />
      </div>

      {/* Bottom blur/fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[140px] md:h-[180px]"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[140px] bg-gradient-to-b from-transparent to-[#f7f7f6]/60 md:h-[180px]"
      />

      <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[18px] py-[24px] text-black md:px-[40px] md:py-[30px]">
        <a
          href="#"
          className="text-[18px] font-semibold leading-none tracking-[-0.04em]"
        >
          H.Studio
        </a>

        <div className="hidden items-center gap-[42px] text-[15px] font-medium leading-none md:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </div>

        <button className="rounded-full bg-black px-[18px] py-[12px] text-[14px] font-medium leading-none text-white">
          Let&apos;s talk
        </button>
      </nav>

      <p
        className="absolute left-[18px] top-[55%] z-30 -translate-y-[92px] text-[12px] uppercase leading-none tracking-[0.12em] text-white md:left-[42px] md:top-[58%] md:-translate-y-[128px] md:text-[14px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        [ HELLO I&apos;M ]
      </p>

      <div className="absolute bottom-[30px] right-[18px] z-30 w-[280px] md:bottom-[42px] md:right-[40px]">
        <p className="text-[13px] font-bold uppercase leading-[1.08] tracking-[-0.04em] text-black md:text-[14px]">
          H.Studio is a <em className="font-normal">full-service</em> creative
          studio creating beautiful digital experiences and products. We are an{" "}
          <em className="font-normal">award winning</em> design and art group
          specializing in branding, web design and engineering.
        </p>
        <button className="mt-[17px] rounded-full bg-black px-[18px] py-[12px] text-[14px] font-medium leading-none text-white">
          Let&apos;s talk
        </button>
      </div>
    </section>
  );
}
