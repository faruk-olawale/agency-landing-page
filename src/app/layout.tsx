import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

// Automatically detect production URL on Vercel or localhost
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SPEEDCRAFT Studio — High-Performance Websites for Local Businesses",
    template: "%s | SPEEDCRAFT Studio",
  },
  description:
    "Bespoke, high-converting Next.js web applications engineered for sub-second speeds, zero WordPress bloat, and maximum local client acquisition.",
  keywords: [
    "creative studio",
    "web performance agency",
    "ultra fast websites",
    "Next.js agency",
    "custom web design for local business",
    "PageSpeed 100",
    "Core Web Vitals guaranteed",
    "hand coded website",
    "high conversion landing page",
  ],
  authors: [{ name: "Faruk Olawale", url: siteUrl }],
  creator: "Faruk Olawale",
  publisher: "SPEEDCRAFT Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SPEEDCRAFT // High-Performance Web Studio", // 41 chars - fits under 60-char limit
    description:
      "Hand-coded, sub-second websites for local businesses with guaranteed 100/100 Google PageSpeed.", // 95 chars - fits optimal range
    siteName: "SPEEDCRAFT Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SPEEDCRAFT // High-Performance Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPEEDCRAFT // High-Performance Web Studio", // 41 chars
    description:
      "Hand-coded, sub-second websites for local businesses with guaranteed 100/100 Google PageSpeed.", // 95 chars
    creator: "@speedcraft",
    images: ["/og-image.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SPEEDCRAFT Studio",
    image: `${siteUrl}/og-image.png`,
    description:
      "Hand-coded, sub-second web experiences for local businesses. Guaranteed 100/100 Core Web Vitals and zero bloated WordPress plugins.",
    url: siteUrl,
    priceRange: "$150/mo - $1,200",
    founder: {
      "@type": "Person",
      name: "Faruk Olawale",
    },
    areaServed: "United States",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Performance Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Zero-Upfront Monthly Subscription",
            description: "Custom hand-coded Next.js site, hosting, and unlimited edits for $150/month.",
          },
          price: "150.00",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Build & Own Package",
            description: "Full source code ownership, GitHub transfer, and 98+ PageSpeed for $1,200.",
          },
          price: "1200.00",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-zinc-950 font-sans antialiased selection:bg-cyan-200 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
