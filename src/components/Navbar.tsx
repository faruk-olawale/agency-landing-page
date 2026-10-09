"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Zap, Phone, ArrowRight, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scroll lock for mobile menu
  const setMenu = useCallback((open: boolean) => {
    setMobileMenuOpen(open);
    const root = document.documentElement;
    const body = document.body;

    if (open) {
      const scrollY = window.pageYOffset || 0;
      body.setAttribute("data-lock-scroll-y", String(scrollY));
      root.classList.add("qf-menu-open");
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    } else {
      const scrollY = parseInt(body.getAttribute("data-lock-scroll-y") || "0", 10);
      root.classList.remove("qf-menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[rgba(12,7,48,0.08)] shadow-[0_1px_0_rgba(12,7,48,0.06)]"
            : "bg-white/80 backdrop-blur-sm border-b border-[rgba(12,7,48,0.05)]"
        }`}
        style={{ fontFamily: 'var(--font, "Geist", sans-serif)' }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 text-decoration-none group shrink-0"
            aria-label="Speedcraft Studio"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0C0730] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-[#6FD9C1] fill-[#6FD9C1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#0C0730]">
                  Speedcraft<span className="text-[#0A997D]">.</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[rgba(10,153,125,0.09)] text-[#0A997D] text-[10px] font-mono font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A997D] animate-pulse" />
                  SUB-SECOND
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#0C0730]/55 uppercase tracking-wider">
                High-Performance Web Studio
              </div>
            </div>
          </a>

          {/* Desktop Nav Links (QuickFleet Floating Pill) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F3F1EC] p-1.5 rounded-full border border-[rgba(12,7,48,0.05)]">
            <button
              onClick={() => scrollToSection("features")}
              className="px-4 py-1.5 rounded-full text-[14px] font-medium text-[#0C0730] hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              Why Custom
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="px-4 py-1.5 rounded-full text-[14px] font-medium text-[#0C0730] hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              Live Demos
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-4 py-1.5 rounded-full text-[14px] font-medium text-[#0C0730] hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("mockup-form")}
              className="px-4 py-1.5 rounded-full text-[14px] font-medium text-[#0C0730] hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              Free Mockup
            </button>
          </nav>

          {/* Desktop CTA & Mobile Burger Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("mockup-form")}
              className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#0C0730] hover:bg-[#22184A] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <span>Request Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* QuickFleet Mobile Labelled Burger Pill */}
            <button
              type="button"
              onClick={() => setMenu(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center gap-2 h-10 px-3 pl-3.5 rounded-full bg-[#0C0730] text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span>Menu</span>
              <span className="w-6 h-6 rounded-full bg-white/15 flex flex-col items-center justify-center gap-1">
                <span className={`block w-3 h-[1.5px] bg-white rounded-full transition-transform ${mobileMenuOpen ? "translate-y-[2.75px] rotate-45" : ""}`} />
                <span className={`block w-3 h-[1.5px] bg-white rounded-full transition-transform ${mobileMenuOpen ? "-translate-y-[2.75px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* QuickFleet Full-Screen Brand Deep Navy Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#0C0730] text-white transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
        style={{ fontFamily: 'var(--font, "Geist", sans-serif)' }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between h-18 px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Zap className="w-4 h-4 text-[#6FD9C1] fill-[#6FD9C1]" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">Speedcraft.</span>
              <span className="block text-[10px] font-mono text-[#6FD9C1] uppercase tracking-wider">
                100/100 Core Web Vitals
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenu(false)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 flex flex-col justify-center px-6 py-6 space-y-4">
          <button
            onClick={() => scrollToSection("features")}
            className="w-full flex items-center justify-between py-3 border-b border-white/10 text-left text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Why Custom</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="w-full flex items-center justify-between py-3 border-b border-white/10 text-left text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Live Demos</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="w-full flex items-center justify-between py-3 border-b border-white/10 text-left text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Pricing</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </button>
          <button
            onClick={() => scrollToSection("mockup-form")}
            className="w-full flex items-center justify-between py-3 border-b border-white/10 text-left text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Free Mockup</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 pb-8 border-t border-white/10 space-y-3">
          <button
            onClick={() => scrollToSection("mockup-form")}
            className="w-full flex items-center justify-center gap-2 h-13 rounded-full bg-white text-[#0C0730] font-bold text-base shadow-lg transition active:scale-98"
          >
            <span>Request Free Mockup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-center text-xs font-mono text-white/40 uppercase tracking-widest pt-1">
            Engineered with Next.js & Sub-Second Speeds
          </div>
        </div>
      </div>
    </>
  );
}
