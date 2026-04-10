import type { Metadata } from "next";
import "./globals.css"


export const metadata: Metadata = {
  title: {
    default: "Eldorado — Find Your Perfect Property",
    template: "%s | Eldorado",
  },
  description:
    "Discover and explore premium properties for sale and rent. Eldorado connects you with trusted agents, modern homes, and the best real estate deals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}