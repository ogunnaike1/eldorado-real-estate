import type { Metadata } from "next";
import ToastProvider  from "./components/shared/ToastProvider";
import "./globals.css";
import GoogleAnalytics from "./components/shared/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://eldoradolmtd.com"),
  title: {
    default: "Eldorado Real Estate | Premium Luxury Properties",
    template: "%s | Eldorado Real Estate",
  },
  description: "Nigeria's premier luxury real estate developer...",
  
  // Favicon
  icons: {
    icon: "/favicon.ico.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Social sharing preview
  openGraph: {
    type: "website",
    url: "https://your-domain.com",
    siteName: "Eldorado Real Estate",
    title: "Eldorado Real Estate | Premium Luxury Properties",
    description: "Nigeria's premier luxury real estate developer...",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eldorado Real Estate",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Eldorado Real Estate",
    description: "Nigeria's premier luxury real estate developer",
    images: ["/images/og-image.jpg"],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Libre+Caslon+Display&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ToastProvider />
        <GoogleAnalytics />
        <main>{children}</main>
      </body>
    </html>
  );
}