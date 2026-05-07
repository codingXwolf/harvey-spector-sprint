"use client";

import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

type NavbarProps = {
  theme?: "light" | "dark";
};

export default function Navbar({ theme = "light" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";
  const textClass = isDark ? "text-white" : "text-black";
  const strokeColor = isDark ? "white" : "black";
  const ctaVariant = isDark ? "outline-light" : "dark";

  return (
    <nav className={`flex items-center justify-between py-6 relative z-20 ${textClass}`}>
      <span className="font-semibold text-base capitalize tracking-[-0.04em]">
        H.Studio
      </span>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-14 font-semibold text-base capitalize tracking-[-0.04em]">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`${link.toLowerCase()}`}
            className="hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <CtaButton variant={ctaVariant} className="hidden md:inline-flex px-4 py-3 tracking-[-0.04em]">
        Let&apos;s talk
      </CtaButton>

      {/* Mobile hamburger / close */}
      <button
        className="md:hidden relative z-50"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black flex flex-col px-6 pt-24 pb-12">
          <div className="flex flex-col gap-8 flex-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white text-4xl font-semibold capitalize tracking-[-0.04em] hover:opacity-60 transition-opacity"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
          <CtaButton variant="light" className="w-fit px-4 py-3 tracking-[-0.04em]">
            Let&apos;s talk
          </CtaButton>
        </div>
      )}
    </nav>
  );
}
