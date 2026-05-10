import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — H.Studio",
  description:
    "Send us a brief, a deck, or a paragraph. We reply within two business days.",
};

export default function ContactPage() {
  return (
    <main>
      <div className="relative z-10 bg-[#f7f7f6]">
        <ContactHero />
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
