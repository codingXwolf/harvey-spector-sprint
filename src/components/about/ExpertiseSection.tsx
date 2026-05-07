const expertise = [
  {
    title: "Brand Identity",
    items: ["Logos & marks", "Type systems", "Editorial design", "Guidelines"],
  },
  {
    title: "Web Design & Dev",
    items: ["Marketing sites", "Next.js & React", "Headless CMS", "Animation"],
  },
  {
    title: "Photography",
    items: ["Editorial", "Portrait", "Product", "Documentary"],
  },
  {
    title: "Creative Direction",
    items: ["Art direction", "Brand strategy", "Campaigns", "Workshops"],
  },
];

export default function ExpertiseSection() {
  return (
    <section className="bg-[#f7f7f6] text-black">
      <div className="relative px-[18px] py-[100px] md:px-[40px] md:py-[160px]">
        <div className="flex items-start justify-between">
          <p
            className="text-[12px] uppercase leading-none tracking-[0.16em] md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            [ EXPERTISE — 005 ]
          </p>
          <p
            className="text-[12px] leading-none md:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            005
          </p>
        </div>

        <h2
          className="mt-[60px] max-w-[18ch] text-[44px] font-medium leading-[0.95] tracking-[-0.05em] md:mt-[120px] md:text-[clamp(64px,_7vw,_104px)]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          What I&apos;m
          <br />
          good at.
        </h2>

        <div className="mt-[60px] grid grid-cols-1 gap-y-[40px] border-t border-black/15 sm:grid-cols-2 md:mt-[100px] md:grid-cols-4 md:gap-[24px]">
          {expertise.map((e, idx) => (
            <article
              key={e.title}
              className="border-black/15 pt-[24px] sm:[&:not(:first-child)]:md:border-l sm:[&:not(:first-child)]:md:pl-[24px]"
            >
              <p
                className="text-[12px] uppercase leading-none tracking-[0.16em] text-black/55 md:text-[13px]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                [ 0{idx + 1} ]
              </p>
              <h3
                className="mt-[20px] text-[22px] font-medium leading-[1.1] tracking-[-0.03em] md:mt-[28px] md:text-[24px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {e.title}
              </h3>
              <ul className="mt-[20px] space-y-[8px] md:mt-[28px]">
                {e.items.map((i) => (
                  <li
                    key={i}
                    className="text-[14px] leading-[1.45] text-black/75 md:text-[15px]"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
