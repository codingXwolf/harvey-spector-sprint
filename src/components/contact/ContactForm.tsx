"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const budgets = ["< $25k", "$25–60k", "$60–120k", "$120k+", "Not sure yet"];
const services = ["Branding", "Web design", "Engineering", "Photography", "Other"];

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fieldsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const setFieldRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (el) fieldsRef.current[idx] = el;
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          autoAlpha: 0,
          y: 14,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }
      gsap.from(fieldsRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Backend wiring intentionally deferred; show the confirmation state.
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="bg-[#f7f7f6] text-black">
      <div className="px-[18px] py-[80px] md:px-[40px] md:py-[140px]">
        <div ref={headerRef} className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ BRIEF — 002 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            002
          </p>
        </div>

        <div className="mt-[60px] grid gap-[40px] md:mt-[100px] md:grid-cols-12 md:gap-[40px]">
          <div className="md:col-span-4">
            <h2
              className="text-[36px] font-medium leading-[1.05] tracking-[-0.04em] md:text-[clamp(40px,_4vw,_56px)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Tell us
              <br />
              <span className="italic" style={{ fontWeight: 400 }}>
                everything.
              </span>
            </h2>
            <p className="mt-[24px] text-[14px] leading-[1.55] text-black/65 md:text-[15px]">
              Required fields are marked. The more context you can share now,
              the more useful the first call will be.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {submitted ? (
              <div
                role="status"
                className="rounded-[2px] border border-black/15 bg-white/60 p-[28px] md:p-[36px]"
              >
                <p
                  className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/55"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  [ RECEIVED ]
                </p>
                <p
                  className="mt-[16px] text-[24px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[28px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Thanks — we&apos;ll be in touch within two business days.
                </p>
                <p className="mt-[12px] text-[14px] leading-[1.55] text-black/70 md:text-[15px]">
                  In the meantime, drop a follow-up to{" "}
                  <a
                    href="mailto:hello@hstudio.com"
                    className="underline underline-offset-4"
                  >
                    hello@hstudio.com
                  </a>{" "}
                  if anything else comes up.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="space-y-[28px] md:space-y-[36px]"
                noValidate
              >
                <div ref={setFieldRef(0)} className="grid gap-[28px] md:grid-cols-2 md:gap-[32px]">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>

                <div ref={setFieldRef(1)} className="grid gap-[28px] md:grid-cols-2 md:gap-[32px]">
                  <Field label="Company" name="company" />
                  <Field label="Website" name="website" type="url" />
                </div>

                <div ref={setFieldRef(2)}>
                  <FieldsetLabel>What do you need?</FieldsetLabel>
                  <div className="mt-[16px] flex flex-wrap gap-[8px]">
                    {services.map((s) => (
                      <PillCheckbox key={s} name="services" value={s} />
                    ))}
                  </div>
                </div>

                <div ref={setFieldRef(3)}>
                  <FieldsetLabel>Budget range</FieldsetLabel>
                  <div className="mt-[16px] flex flex-wrap gap-[8px]">
                    {budgets.map((b) => (
                      <PillRadio key={b} name="budget" value={b} />
                    ))}
                  </div>
                </div>

                <div ref={setFieldRef(4)}>
                  <FieldsetLabel htmlFor="message">Project brief</FieldsetLabel>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="What are you building, who's it for, and what does winning look like?"
                    className="mt-[12px] block w-full resize-y border-b border-black/30 bg-transparent py-[12px] text-[16px] leading-[1.5] outline-none placeholder:text-black/35 focus:border-black md:text-[17px]"
                  />
                </div>

                <div ref={setFieldRef(5)} className="flex flex-col items-start gap-[16px] pt-[8px] md:flex-row md:items-center md:justify-between">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-[12px] bg-black px-[22px] py-[14px] text-[14px] uppercase leading-none tracking-[0.16em] text-white transition-transform duration-300 hover:translate-y-[-2px] md:text-[15px]"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    Send brief
                    <span className="transition-transform duration-300 group-hover:translate-x-[3px]">↗</span>
                  </button>
                  <p
                    className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/45"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    Or email{" "}
                    <a
                      href="mailto:hello@hstudio.com"
                      className="text-black underline underline-offset-4"
                    >
                      hello@hstudio.com
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldsetLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[12px]"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <FieldsetLabel htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </FieldsetLabel>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-[10px] block w-full border-b border-black/30 bg-transparent py-[10px] text-[16px] leading-[1.4] outline-none focus:border-black md:text-[17px]"
      />
    </div>
  );
}

function PillCheckbox({ name, value }: { name: string; value: string }) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" name={name} value={value} className="peer sr-only" />
      <span
        className="inline-block rounded-full border border-black/25 px-[14px] py-[8px] text-[12px] uppercase leading-none tracking-[0.16em] text-black/70 transition-colors hover:border-black hover:text-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white md:text-[13px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {value}
      </span>
    </label>
  );
}

function PillRadio({ name, value }: { name: string; value: string }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} value={value} className="peer sr-only" />
      <span
        className="inline-block rounded-full border border-black/25 px-[14px] py-[8px] text-[12px] uppercase leading-none tracking-[0.16em] text-black/70 transition-colors hover:border-black hover:text-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white md:text-[13px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {value}
      </span>
    </label>
  );
}
