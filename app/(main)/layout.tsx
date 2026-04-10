import type { Metadata } from "next";
import "../globals.css"

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/shared/WhatsAppButton";
import LoadingScreen from "../components/shared/LoadingScreen";

export const metadata: Metadata = {
  title: "Eldorado Real Estate | Premium Properties",
  description:
    "Eldorado Real Estate — Premium luxury developments crafted for those who demand excellence. Discover signature residences in the most sought-after locations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}