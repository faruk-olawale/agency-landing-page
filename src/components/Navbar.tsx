"use client";

import { useState } from "react";
import { Zap, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-slate-900 text-xl tracking-tight group"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
            <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
          </div>
          <span className="flex items-center gap-1">
            Speedcraft<span className="text-emerald-600">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollToSection("features")}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Why Custom
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Live Demos
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("mockup-form")}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Free Mockup
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollToSection("mockup-form")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <span>Request a Free Mockup</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection("features")}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Why Custom
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Live Demos
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("mockup-form")}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Free Mockup
          </button>
          <div className="pt-2">
            <button
              onClick={() => scrollToSection("mockup-form")}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Request a Free Mockup</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
