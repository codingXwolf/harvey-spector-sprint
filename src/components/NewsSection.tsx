import Image from "next/image";

const articles = [
  {
    image: "/maker.png",
  },
  {
    image: "/eames.png",
  },
  {
    image: "/books.png",
  },
];

function NewsCard({
  article,
  className = "",
}: {
  article: (typeof articles)[number];
  className?: string;
}) {
  return (
    <article className={`shrink-0 w-[299px] md:w-[354px] ${className}`}>
      <div className="relative h-[398px] overflow-hidden bg-zinc-200 md:h-[471px]">
        <Image
          src={article.image}
          alt="Latest news and achievements"
          fill
          sizes="(min-width: 768px) 354px, 299px"
          className="object-cover"
        />
      </div>
      <p className="mt-[18px] text-[16px] leading-[1.19] md:mt-[15px] md:text-[14px] md:leading-[1.2]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <a
        href="#"
        className="mt-[25px] inline-flex items-center gap-[15px] border-b border-black pb-[3px] text-[16px] font-medium leading-none md:mt-[25px] md:text-[14px]"
      >
        Read more <span className="text-[14px]">↗</span>
      </a>
    </article>
  );
}

export default function NewsSection() {
  return (
    <section className="overflow-hidden bg-[#f1f1f1] text-black">
      <div className="relative min-h-[742px] px-[17px] pb-[50px] pt-[68px] md:min-h-[930px] md:px-0 md:py-0">
        <h2 className="max-w-[330px] text-[30px] font-light uppercase leading-[0.9] tracking-[-0.05em] md:absolute md:left-[35px] md:top-[832px] md:max-w-none md:origin-top-left md:-rotate-90 md:text-[57px]">
          Keep up with my
          <br />
          latest news &amp; achievements
        </h2>

        <div className="mt-[33px] flex w-max gap-[17px] md:mt-0 md:block">
          <NewsCard article={articles[0]} className="md:absolute md:left-[388px] md:top-[125px]" />
          <div className="hidden md:absolute md:left-[772px] md:top-[125px] md:block md:h-[702px] md:w-px md:bg-black/10" />
          <NewsCard article={articles[1]} className="md:absolute md:left-[804px] md:top-[245px]" />
          <div className="hidden md:absolute md:left-[1188px] md:top-[125px] md:block md:h-[702px] md:w-px md:bg-black/10" />
          <NewsCard article={articles[2]} className="md:absolute md:left-[1220px] md:top-[125px]" />
        </div>
      </div>
    </section>
  );
}
