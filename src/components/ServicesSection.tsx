import Image from "next/image";

const services = [
  {
    number: "1",
    title: "Brand Discovery",
    image: "/brand.png",
  },
  {
    number: "2",
    title: "Web Design & Dev",
    image: "/web-design.png",
  },
  {
    number: "3",
    title: "Marketing",
    image: "/marketing.png",
  },
  {
    number: "4",
    title: "Photography",
    image: "/photography.png",
  },
];

const desktopDescription =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const mobileDescription =
  "We are a creative studio that loves making beautiful websites and premium products. We've won some awards for our work. We're really good at creating brands, designing cool stuff, and making things work just right.";

export default function ServicesSection() {
  return (
    <section className="bg-black text-white">
      <div className="px-[16px] py-[48px] md:min-h-[1280px] md:px-[32px] md:py-[82px]">
        <p
          className="text-[12px] leading-none md:text-[14px]"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ SERVICES ]
        </p>

        <div className="mt-[37px] grid grid-cols-[90px_1fr] items-start gap-x-[53px] md:mt-[67px] md:grid-cols-[1fr_1fr] md:gap-x-0">
          <p className="text-[37px] font-light leading-none md:text-[75px]">
            [4]
          </p>
          <h2 className="text-[32px] font-light uppercase leading-none md:text-[94px]">
            Deliverables
          </h2>
        </div>

        <div className="mt-[36px] md:mt-[58px]">
          {services.map((service) => (
            <article
              key={service.number}
              className="border-t border-white/80 pb-[47px] pt-[15px] md:grid md:min-h-[231px] md:grid-cols-[58%_29%_13%] md:gap-0 md:pb-0 md:pt-[10px]"
            >
              <div>
                <p
                  className="mb-[22px] text-[14px] leading-none md:mb-[21px] md:text-[14px]"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  [ {service.number} ]
                </p>
                <h3 className="text-[33px] font-black italic uppercase leading-[0.9] tracking-[-0.04em] md:text-[34px]">
                  {service.title}
                </h3>
              </div>

              <p className="mt-[23px] max-w-[346px] text-[16px] leading-[1.2] md:mt-[2px] md:max-w-[405px] md:text-[14px] md:leading-[1.15]">
                <span className="md:hidden">{mobileDescription}</span>
                <span className="hidden md:inline">{desktopDescription}</span>
              </p>

              <div className="relative mt-[18px] h-[151px] w-[151px] overflow-hidden bg-zinc-900 md:ml-auto md:mt-0 md:h-[151px] md:w-[151px]">
                <Image
                  src={service.image}
                  alt={`${service.title} service thumbnail`}
                  fill
                  sizes="151px"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
