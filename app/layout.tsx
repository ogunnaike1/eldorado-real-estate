import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "./components/shared/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://eldoradorealestate.com"),
  title: {
    default: "Eldorado Real Estate | Premium Luxury Properties in Nigeria",
    template: "%s | Eldorado Real Estate",
  },
  description:
    "Eldorado Real Estate — Nigeria's premier luxury real estate developer. Discover bespoke residences, commercial spaces, and investment opportunities in Lagos, Abuja, and beyond.",
  keywords: [
    "luxury real estate Nigeria",
    "premium properties Lagos",
    "Banana Island apartments",
    "Ikoyi real estate",
    "luxury homes Lagos",
    "Eldorado Real Estate",
    "real estate investment Nigeria",
    "commercial property Victoria Island",
    "luxury development Abuja",
  ],
  authors: [{ name: "Eldorado Real Estate" }],
  creator: "Eldorado Real Estate",
  publisher: "Eldorado Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://eldoradorealestate.com",
    siteName: "Eldorado Real Estate",
    title: "Eldorado Real Estate | Premium Luxury Properties in Nigeria",
    description:
      "Nigeria's premier luxury real estate developer. Discover bespoke residences and investment opportunities in the most prestigious locations.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eldorado Real Estate — Premium Luxury Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldorado Real Estate | Premium Luxury Properties",
    description:
      "Nigeria's premier luxury real estate developer. Discover bespoke residences in Lagos, Abuja, and beyond.",
    images: ["/images/og-image.jpg"],
    creator: "@eldoradorestate",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Libre+Caslon+Display&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <main>{children}</main>
      </body>
    </html>
  );
}