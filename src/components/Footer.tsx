import CtaButton from "@/components/CtaButton";

export default function Footer() {
  return (
    <footer
      className="relative z-0 h-[514px] bg-black text-white"
      data-nav-theme="dark"
    >
      <div className="fixed bottom-0 left-0 right-0 z-0 min-h-[514px] overflow-hidden bg-black px-[16px] pt-[49px] md:min-h-[514px] md:px-[32px] md:pt-[49px]">
        <div className="md:flex md:justify-between">
          <div>
            <p className="text-[24px] italic leading-none tracking-[-0.05em] md:text-[25px]">
              HAVE A <strong className="not-italic">PROJECT</strong> IN MIND?
            </p>
            <CtaButton
              variant="outline-light"
              className="mt-[16px] px-[17px] py-[12px] md:mt-[15px]"
            >
              Let&apos;s talk
            </CtaButton>
          </div>

          <nav className="mt-[21px] flex flex-col gap-[17px] text-[18px] uppercase leading-none md:absolute md:left-[672px] md:top-[50px] md:mt-0 md:gap-[4px] md:text-[18px]">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </nav>

          <nav className="mt-[17px] flex flex-col gap-[17px] text-[18px] uppercase leading-none md:absolute md:right-[32px] md:top-[50px] md:mt-0 md:items-end md:gap-[4px] md:text-[18px]">
            <a href="#">X.com</a>
            <a href="#">Linkedin</a>
          </nav>
        </div>

        <div className="mt-[24px] border-t border-white md:mt-[80px]" />

        <div className="mt-[48px] flex justify-center gap-[39px] text-[12px] uppercase underline md:absolute md:bottom-[31px] md:right-[32px] md:mt-0 md:gap-[32px]">
          <a href="#">Licences</a>
          <a href="#">Privacy Policy</a>
        </div>

        <p
          className="mt-[48px] text-[10px] uppercase leading-none md:absolute md:bottom-[28px] md:left-[33px] md:mt-0 md:origin-bottom-left md:-rotate-90"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          [ CODED BY CLAUDE ]
        </p>

        <p className="absolute bottom-[-18px] left-[17px] text-[87px] font-semibold leading-[0.82] tracking-[-0.08em] md:bottom-[-40px] md:left-[55px] md:text-[245px]">
          H.Studio
        </p>
      </div>
    </footer>
  );
}
