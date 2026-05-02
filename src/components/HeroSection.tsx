import Image from "next/image";

/**
 * HERO SECTION
 *
 * Layered composition (back → front):
 *   z-0  : background portrait photo
 *   z-10 : "Harvey Specter" H1 (mix-blend-overlay, sits "behind" the subject)
 *   z-20 : same photo clipped to an ellipse around the subject — this is the
 *          fake cutout that lets his head/body break through the H1 letters
 *   z-20 : bottom blur + light gradient fade into the page background
 *   z-30 : nav, [HELLO I'M] eyebrow, paragraph + CTA — always on top
 *
 * Tailwind responsive prefix conventions used here:
 *   (no prefix) = mobile / base styles (≤ 767px)
 *   md:        = tablet + desktop (≥ 768px)
 */

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function HeroSection() {
  return (
    // Full-viewport hero. min-h prevents collapse on very short screens.
    // overflow-hidden so the scaled background can't bleed out.
    <section className="relative h-screen min-h-[640px] overflow-hidden bg-[#f7f7f6]">
      {/*
        BACKGROUND PHOTO (z-0)
        - `fill` makes it cover the whole section.
        - object-[center_35%]: shifts focal point upward on mobile so the face
          isn't cropped by the bottom blur band.
        - md:scale-[1.25]: zooms in on desktop for a tighter chest-up framing
          (matches Figma). Mobile keeps scale-100 so the subject doesn't get
          cut off on a narrow viewport.
      */}
      <Image
        src="/work-cyberpunk.jpg"
        alt="Harvey Specter portrait"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-[center_35%] scale-100 md:scale-[1.25] md:object-[center_30%]"
      />

      {/*
        H1 — "Harvey Specter" (z-10)
        - mix-blend-overlay tints the photo with the text instead of pasting
          opaque white over it, giving the bleed-through look.
        - clamp(76px, 13.75vw, 198px): scales fluidly between mobile and
          desktop without hard breakpoints.
        - md:whitespace-nowrap: forces single-line on desktop (where there's
          room). On mobile the text wraps naturally.
        - top-[49%] mobile / top-[58%] desktop: vertical position differs
          because mobile has no big horizontal headline-to-image relationship
          to preserve.
      */}
      <h1
        className="absolute left-[18px] right-[18px] top-[60%] z-10 -translate-y-1/2 text-center capitalize text-white [mix-blend-mode:overlay] md:left-[32px] md:right-[32px] md:top-[58%] md:whitespace-nowrap"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
          fontSize: "clamp(86px, 25.6vw, 198px)",
          lineHeight: 0.95,
          letterSpacing: "-0.07em",
        }}
      >
        Harvey Specter
      </h1>

      {/*
        SUBJECT CUTOUT OVERLAY (z-20)
        - Same source image, clipped to an ellipse positioned over the
          subject's head/shoulders.
        - This duplicate sits ABOVE the H1, so wherever the ellipse covers,
          the photo "punches through" the letters — creating the illusion of
          the body wrapping in front of the text.
        - Mobile ellipse:  13% × 42% at 50% 45% — wider/taller because the
          subject occupies more of the viewport.
        - Desktop ellipse: 9% × 1% at 50% 47% — narrow sliver matching the
          tighter desktop crop.
        - pointer-events-none so it never blocks clicks on what's underneath.
      */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <Image
          src="/work-cyberpunk.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] scale-100 md:scale-[1.35] md:object-[center_30%] [clip-path:ellipse(0%_8%_at_50%_44%)] md:[clip-path:ellipse(9%_1%_at_50%_47%)]"
        />
      </div>

      {/*
        BOTTOM BLUR BAND (z-20)
        - backdrop-filter blurs everything painted behind it.
        - mask-image fades the blur in from transparent at the top edge to
          fully visible at 55% — soft transition so it doesn't look like a
          hard band.
        - Mobile h-[140px], desktop h-[180px].
      */}
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
      {/*
        BOTTOM COLOR FADE (z-20)
        - Sits over the blur and pulls the photo color toward the page
          background (#f7f7f6) so the hero blends into the next section.
        - Mobile is taller (h-[350px]) to give the bottom-right copy block
          more contrast against the photo.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[350px] bg-gradient-to-b from-transparent to-[#f7f7f6]/60 md:h-[180px]"
      />

      {/*
        TOP NAV (z-30)
        - Logo left, links center (desktop only), CTA right.
        - md:flex on the link group hides the nav links on mobile — on mobile
          the nav is just logo + CTA. (A hamburger menu would replace this on
          a real build.)
      */}
      <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[18px] py-[24px] text-black md:px-[40px] md:py-[30px]">
        <a
          href="#"
          className="text-[18px] font-semibold leading-none tracking-[-0.04em]"
        >
          H.Studio
        </a>

        {/* Mobile: hidden. Desktop: shows the 5 link items. */}
        <div className="hidden items-center gap-[42px] text-[15px] font-medium leading-none md:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </div>

        {/* "Let's talk" CTA — visible on both mobile and desktop. */}
        <button className="rounded-full bg-black px-[18px] py-[12px] text-[14px] font-medium leading-none text-white">
          Let&apos;s talk
        </button>
      </nav>

      {/*
        EYEBROW LABEL — "[ HELLO I'M ]" (z-30)
        - Geist Mono for the bracketed/code-like feel.
        - Positioned above the H1 by translating up from the H1's vertical
          anchor (top-[55%] mobile / top-[58%] desktop, then -translate-y).
        - Stays white because it sits over the photo, not over the blur band.
      */}
      <p
        className="absolute left-[180px] top-[55%] z-30 -translate-y-[92px] text-[12px] uppercase leading-none tracking-[0.12em] text-white md:left-[42px] md:top-[58%] md:-translate-y-[128px] md:text-[14px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        [ HELLO I&apos;M ]
      </p>

      {/*
        BOTTOM-RIGHT COPY BLOCK + CTA (z-30)
        - Studio description + "Let's talk" button.
        - Anchored bottom-right on both mobile and desktop. Width capped at
          280px so the line length stays readable.
        - Sits over the blur band, which is why the text is dark (#1f1f1f)
          rather than white.
        - Mobile: bottom-[30px] right-[18px]
          Desktop: bottom-[42px] right-[40px]
      */}
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
