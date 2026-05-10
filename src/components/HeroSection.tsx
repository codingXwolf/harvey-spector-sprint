'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/CtaButton";

const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

gsap.registerPlugin(ScrollTrigger);

// Animated nav link with an underline that wipes in on hover.
function NavLink({ label, href }: { label: string; href: string }) {
  const underlineRef = useRef<HTMLSpanElement | null>(null);

  const onEnter = () => {
    if (!underlineRef.current) return;
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.35, ease: "power3.out" }
    );
  };
  const onLeave = () => {
    if (!underlineRef.current) return;
    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.3,
      ease: "power3.in",
    });
  };

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-block"
    >
      {label}
      <span
        ref={underlineRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[2px] left-0 right-0 block h-[1.5px] origin-left bg-current scale-x-0"
      />
    </Link>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const harveyDesktopRef = useRef<HTMLSpanElement | null>(null);
  const specterDesktopRef = useRef<HTMLSpanElement | null>(null);
  const harveyMobileRef = useRef<HTMLSpanElement | null>(null);
  const specterMobileRef = useRef<HTMLSpanElement | null>(null);
  const helloRef = useRef<HTMLParagraphElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLLIElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const alignHelloLabel = () => {
      const section = sectionRef.current;
      const hello = helloRef.current;
      const harvey = window.matchMedia("(min-width: 768px)").matches
        ? harveyDesktopRef.current
        : harveyMobileRef.current;

      if (!section || !hello || !harvey) return;

      const range = document.createRange();
      range.selectNodeContents(harvey);
      const harveyRect = range.getBoundingClientRect();
      range.detach();

      const sectionRect = section.getBoundingClientRect();
      hello.style.left = `${harveyRect.left - sectionRect.left}px`;
    };

    alignHelloLabel();
    document.fonts?.ready.then(alignHelloLabel);
    window.addEventListener("resize", alignHelloLabel);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      gsap.set(bgRef.current, { scale: 1.35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(harveyMobileRef.current, { xPercent: -55, ease: "none" }, 0)
        .to(specterMobileRef.current, { xPercent: 55, ease: "none" }, 0)
        .to(helloRef.current, { xPercent: -55, ease: "none" }, 0)
        .to(bgRef.current, { scale: 1.55, ease: "none" }, 0);
    });

    mm.add("(min-width: 768px)", () => {
      gsap.set(bgRef.current, { scale: 1.35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(harveyDesktopRef.current, { xPercent: -38, ease: "none" }, 0)
        .to(specterDesktopRef.current, { xPercent: 38, ease: "none" }, 0)
        .to(helloRef.current, { x: -220, ease: "none" }, 0)
        .to(bgRef.current, { scale: 1.5, ease: "none" }, 0);
    });

    return () => {
      window.removeEventListener("resize", alignHelloLabel);
      mm.revert();
    };
  }, []);

  // Build the open/close timeline once. We keep the menu mounted and use
  // `pointer-events-none` + autoAlpha so it's invisible/inert when closed.
  useLayoutEffect(() => {
    if (!overlayRef.current) return;
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      overlayRef.current,
      { autoAlpha: 0, yPercent: -100 },
      { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: "power3.out" }
    );
    tl.fromTo(
      linksRef.current,
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power3.out",
      },
      "-=0.25"
    );
    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (menuOpen) tl.play();
    else tl.reverse();
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']")
    );

    const updateNavTheme = () => {
      const sampleY = 32;
      const isOnDark = darkSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= sampleY && rect.bottom >= sampleY;
      });

      setNavOnDark(isOnDark);
    };

    updateNavTheme();
    window.addEventListener("scroll", updateNavTheme, { passive: true });
    window.addEventListener("resize", updateNavTheme);

    return () => {
      window.removeEventListener("scroll", updateNavTheme);
      window.removeEventListener("resize", updateNavTheme);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#d6d8d6]"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 will-change-transform md:left-[2%] md:right-[-15%]"
      >
        <Image
          src="/hero-bg-photo.jpg"
          alt="Harvey Specter portrait"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover [object-position:40%_10%] md:[object-position:70%_10%]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[40%]"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
        }}
      />

      <h1
        aria-hidden="true"
        className="pointer-events-none absolute left-[32px] right-[32px] top-[55%] z-30 hidden -translate-y-1/2 text-center text-[clamp(48px,_13.5vw,_198px)] capitalize leading-[1.1] tracking-[-0.07em] text-white [mix-blend-mode:overlay] md:block xl:whitespace-nowrap"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
        }}
      >
        <span
          ref={harveyDesktopRef}
          className="inline-block will-change-transform"
        >
          Harvey
        </span>
        <span className="inline-block w-[0.58em]" />
        <span
          ref={specterDesktopRef}
          className="inline-block will-change-transform"
        >
          Specter
        </span>
      </h1>

      <h1
        className="absolute left-[18px] right-[18px] top-[60%] z-30 -translate-y-1/2 break-words text-center text-[96px] capitalize leading-[0.8] tracking-[-0.07em] text-white [mix-blend-mode:overlay] md:hidden"
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 500,
        }}
      >
        <span ref={harveyMobileRef} className="block will-change-transform">
          Harvey
        </span>
        <span
          ref={specterMobileRef}
          className="mt-[24px] block will-change-transform"
        >
          Specter
        </span>
      </h1>

      <h1 className="sr-only">Harvey Specter</h1>

      <nav
        className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-[18px] py-[24px] transition-colors duration-300 md:px-[40px] md:py-[30px] ${
          navOnDark ? "text-white" : "text-black"
        }`}
      >
        <Link
          href="/"
          className="text-[18px] font-semibold leading-none tracking-[-0.04em]"
        >
          H.Studio
        </Link>

        <div className="hidden items-center gap-[42px] text-[15px] font-medium leading-none md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>

        <div className="hidden md:block">
          <CtaButton variant={navOnDark ? "outline-light" : "dark"}>
            Let&apos;s talk
          </CtaButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
        className="flex h-[36px] w-[36px] flex-col items-center justify-center gap-[6px] md:hidden"
      >
          <span className="block h-[2px] w-[22px] bg-current" />
          <span className="block h-[2px] w-[22px] bg-current" />
          <span className="block h-[2px] w-[22px] bg-current" />
        </button>
      </nav>

      {/* Mobile fullscreen menu overlay (always mounted; GSAP-controlled) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex flex-col bg-black text-white opacity-0 invisible md:hidden"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-[18px] py-[24px]">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-[18px] font-semibold leading-none tracking-[-0.04em] text-white"
          >
            H.Studio
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="relative h-[36px] w-[36px]"
          >
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <span className="absolute left-1/2 top-1/2 block h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-[28px] text-[28px] font-medium">
          {navLinks.map((link, idx) => (
            <li
              key={link.label}
              ref={(el) => {
                if (el) linksRef.current[idx] = el;
              }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li
            ref={(el) => {
              if (el) linksRef.current[navLinks.length] = el;
            }}
          >
            <CtaButton variant="light" onClick={() => setMenuOpen(false)}>
              Let&apos;s talk
            </CtaButton>
          </li>
        </ul>
      </div>

      <p
        ref={helloRef}
        className="absolute top-[60%] z-30 -translate-y-[100px] text-[12px] uppercase leading-none tracking-[0.12em] text-white md:top-[58%] md:-translate-y-[128px] md:text-[14px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        [ HELLO I&apos;M ]
      </p>

      <div className="absolute left-1/2 top-[60%] z-30 flex w-[293px] -translate-x-1/2 translate-y-[100px] flex-col items-start text-left md:bottom-[42px] md:left-auto md:right-[40px] md:top-auto md:w-[280px] md:translate-x-0 md:translate-y-0">
        <p className="text-[14px] font-bold uppercase leading-[1.1] tracking-[-0.04em] text-black md:text-[14px]">
          H.Studio is a <em className="font-normal">full-service</em> creative
          studio creating beautiful digital experiences and products. We are an{" "}
          <em className="font-normal">award winning</em> design and art group
          specializing in branding, web design and engineering.
        </p>
        <div className="mt-[17px]">
          <CtaButton variant="dark">Let&apos;s talk</CtaButton>
        </div>
      </div>
    </section>
  );
}
