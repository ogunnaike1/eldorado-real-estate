
import ContactHero from "../../components/contact/ContactHero";
import ContactForm from "../../components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Eldorado Real Estate",
  description: "Get in touch with Eldorado Real Estate. Schedule a consultation, visit our office, or reach us by phone and email.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}