import Image from "next/image";

export default function CameraSection() {
  return (
    <section className="relative h-[565px] w-full overflow-hidden bg-black md:h-[900px]">
      <Image
        src="/service-brand.jpg"
        alt="Photographer holding a camera"
        fill
        priority
        quality={95}
        sizes="(min-width: 768px) 1440px, 100vw"
        className="object-cover"
      />
    </section>
  );
}
