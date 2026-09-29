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
  title: "SPEEDCRAFT // Dark Mode Creative Studio | Ultra-Fast Web Experiences",
  description:
    "Hand-coded, sub-second web experiences for local businesses. No bloated WordPress, just pure performance that converts with 100/100 PageSpeed guaranteed.",
  keywords: [
    "creative studio",
    "dark mode agency",
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
    <html lang="en" className={`${inter.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans antialiased selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
