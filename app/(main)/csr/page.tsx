import CSRHero from "../../components/csr/CSRHero";
import CSRIntro from "../../components/csr/CSRIntro";
import CSRInitiatives from "../../components/csr/CSRInitiatives";
import CSRImpact from "../../components/csr/CSRImpact";
import CSRGallery from "../../components/csr/CSRGallery";

export const metadata = { title: "CSR | Eldorado Real Estate", description: "Discover how Eldorado gives back to communities through education, welfare, sustainability, and empowerment initiatives." };

export default function CSRPage() {
  return (
    <>
      <CSRHero />
      <CSRIntro />
      <CSRInitiatives />
      <CSRImpact />
      <CSRGallery />
    </>
  );
}