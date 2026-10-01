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
};

export const metadata: Metadata = {
  title: "SPEEDCRAFT // High-Performance Creative Studio | Ultra-Fast Web Experiences",
  description:
    "Hand-coded, sub-second web experiences for local businesses. No bloated WordPress, just pure performance that converts with 100/100 PageSpeed guaranteed.",
  keywords: [
    "creative studio",
    "web performance agency",
    "ultra fast websites",
    "Next.js agency",
    "custom web design",
    "PageSpeed 100",
  ],
  authors: [{ name: "Speedcraft Studio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-cyan-200 selection:text-zinc-900">
        {children}
      </body>
    </html>
  );
}
