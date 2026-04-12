import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/shared/WhatsAppButton";
import LoadingScreen from "../components/shared/LoadingScreen";

export const metadata: Metadata = {
  title: {
    default: "Eldorado Real Estate | Premium Luxury Properties in Nigeria",
    template: "%s | Eldorado Real Estate",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}