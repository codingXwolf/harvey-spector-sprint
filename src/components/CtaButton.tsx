"use client";

import { useRef } from "react";
import gsap from "gsap";

type CtaButtonProps = {
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline-light";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function CtaButton({
  children,
  variant = "dark",
  className = "",
  onClick,
  type = "button",
}: CtaButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const topRef = useRef<HTMLSpanElement | null>(null);
  const bottomRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  const variantStyles = {
    dark: {
      className: "bg-black text-white",
      backgroundColor: "#000000",
      color: "#ffffff",
      borderColor: "#000000",
    },
    light: {
      className: "bg-white text-black",
      backgroundColor: "#ffffff",
      color: "#000000",
      borderColor: "#ffffff",
    },
    "outline-light": {
      className: "border border-white bg-transparent text-white",
      backgroundColor: "transparent",
      color: "#ffffff",
      borderColor: "#ffffff",
    },
  };

  const variantClassNames = {
    dark: variantStyles.dark.className,
    light: variantStyles.light.className,
    "outline-light": variantStyles["outline-light"].className,
  };

  const baseStyle = variantStyles[variant];

  const onEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.04,
      backgroundColor: "#ffffff",
      borderColor: "#ffffff",
      duration: 0.3,
      ease: "power3.out",
    });
    gsap.to([topRef.current, bottomRef.current, arrowRef.current], {
      color: "#000000",
      duration: 0.3,
      ease: "power3.out",
    });
    gsap.fromTo(
      arrowRef.current,
      { x: -8, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out", delay: 0.05 }
    );
  };

  const onLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      backgroundColor: baseStyle.backgroundColor,
      borderColor: baseStyle.borderColor,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to([topRef.current, bottomRef.current, arrowRef.current], {
      color: baseStyle.color,
      duration: 0.3,
      ease: "power3.out",
    });
    gsap.to(arrowRef.current, {
      x: -8,
      autoAlpha: 0,
      duration: 0.2,
      ease: "power3.in",
    });
  };

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: relX * 0.3,
      y: relY * 0.4,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className={`relative inline-flex items-center gap-[10px] overflow-hidden rounded-full px-[18px] py-[12px] text-[14px] font-medium leading-none will-change-transform ${variantClassNames[variant]} ${className}`}
    >
      <span className="relative inline-block leading-[1.2]">
        <span ref={topRef} className="block">
          {children}
        </span>
      </span>
      <span
        ref={arrowRef}
        aria-hidden="true"
        className="inline-block opacity-0"
      >
        ↗
      </span>
    </button>
  );
}
