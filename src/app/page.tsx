"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  X,
  TrendingUp,
} from "lucide-react";

export default function WhiteCreativeStudioAgency() {
  // Navigation & Scroll state
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pricing toggle state: 'subscription' | 'lumpSum'
  const [billingPlan, setBillingPlan] = useState<"subscription" | "lumpSum">("subscription");

  // Interactive ROI Calculator State
  const [dealValue, setDealValue] = useState<number>(750);
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(1200);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    notes: "",
    selectedTier: "Zero-Upfront Partnership ($150/mo)",
  });
  const [honeypot, setHoneypot] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Scroll listener for sticky glass header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update selected plan text when toggle changes
  const handleSelectPlan = (plan: "subscription" | "lumpSum") => {
    setBillingPlan(plan);
    setFormData((prev) => ({
      ...prev,
      selectedTier:
        plan === "subscription"
          ? "Zero-Upfront Partnership ($150/mo)"
          : "Build & Own Package ($1,200 + optional $50/mo care)",
    }));
  };

  // Live API form submission handler
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          honeypot,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request.");
      }

      setFormSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please email directly.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ROI calculations
  const estimatedExtraLeads = Math.max(1, Math.round(monthlyTraffic * 0.024));
  const estimatedAddedRevenue = estimatedExtraLeads * dealValue;
  const roiMultiple = Math.round((estimatedAddedRevenue / 150) * 10) / 10;

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white relative overflow-x-hidden antialiased">
      {/* ──────────────────────────────────────────────────────────────────────
          TOP NAVIGATION BAR (Clean, restrained, studio aesthetic)
      ────────────────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-[rgba(12,7,48,0.08)] py-3 shadow-[0_1px_0_rgba(12,7,48,0.06)]"
            : "bg-transparent py-4 sm:py-5"
        }`}
        style={{ fontFamily: 'var(--font, "Geist", sans-serif)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Studio Moniker */}
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-bold text-[#0C0730] tracking-tight group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0C0730]" />
            <span className="font-extrabold text-base tracking-tight text-[#0C0730]">
              SPEEDCRAFT<span className="text-[#0A997D]">.</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10.5px] font-mono font-semibold text-[#0A997D] border border-[#0A997D]/20 rounded-full bg-[rgba(10,153,125,0.08)] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A997D] animate-pulse" />
              Sub-Second Studio
            </span>
          </Link>

          {/* Desktop Nav Links (QuickFleet Centered Pill) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F3F1EC] p-1.5 rounded-full border border-[rgba(12,7,48,0.05)] text-xs font-semibold tracking-normal text-[#0C0730]">
            <a href="#performance" className="px-4 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all">
              Performance
            </a>
            <a href="#work" className="px-4 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all">
              Featured Work
            </a>
            <a href="#concierge" className="px-4 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all">
              Concierge Care
            </a>
            <a href="#roi-calculator" className="px-4 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all">
              ROI Calculator
            </a>
            <a href="#pricing" className="px-4 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition-all">
              Pricing
            </a>
          </nav>

          {/* Action CTA & Mobile Burger Pill */}
          <div className="flex items-center gap-3">
            <a
              href="#prototype"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-[#0C0730] hover:bg-[#22184A] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Request Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* QuickFleet Mobile Labelled Burger Pill */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      {/* QuickFleet Mobile Full-Screen Navy Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#0C0730] text-white transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
        style={{ fontFamily: 'var(--font, "Geist", sans-serif)' }}
      >
        <div className="flex items-center justify-between h-18 px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6FD9C1]" />
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">SPEEDCRAFT</span>
              <span className="block text-[10px] font-mono text-[#6FD9C1] uppercase tracking-wider">
                100/100 Core Web Vitals
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-6 py-6 space-y-3" aria-label="Mobile Navigation">
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-3 border-b border-white/10 text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Performance</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-3 border-b border-white/10 text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Featured Work</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </a>
          <a
            href="#concierge"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-3 border-b border-white/10 text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Concierge Care</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </a>
          <a
            href="#roi-calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-3 border-b border-white/10 text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>ROI Calculator</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-3 border-b border-white/10 text-2xl font-medium tracking-tight text-white hover:text-[#6FD9C1] transition-colors"
          >
            <span>Pricing</span>
            <ArrowRight className="w-5 h-5 text-white/40" />
          </a>
        </nav>

        <div className="p-6 pt-2 pb-8 border-t border-white/10 space-y-3">
          <a
            href="#prototype"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 h-13 rounded-full bg-white text-[#0C0730] font-bold text-base shadow-lg transition active:scale-98"
          >
            <span>Request Free Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="text-center text-xs font-mono text-white/40 uppercase tracking-widest pt-1">
            Sub-Second Engineering · Next.js · Zero Bloat
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          1. HERO SECTION (Editorial, Authoritative, High-Trust)
      ────────────────────────────────────────────────────────────────────── */}
      <main className="relative z-10">
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 sm:px-8 border-b border-zinc-200/80 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Top Credibility Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Bespoke Web Engineering for High-Intent Local Businesses</span>
            </div>

            {/* Left-Aligned Massive Headline */}
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-zinc-950 mb-6">
                Websites engineered to turn local visitors into paying clients.
              </h1>

              {/* Grounded Subheadline */}
              <p className="text-lg sm:text-xl text-zinc-600 font-normal leading-relaxed max-w-2xl mb-10">
                We replace sluggish WordPress templates and fragile plugins with custom,
                sub-second Next.js web applications. Faster loading, higher Google visibility,
                and frictionless click-to-call conversion.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                <a
                  href="#prototype"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm studio-btn-primary cursor-pointer"
                >
                  <span>Request a Custom Prototype</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-xs font-bold studio-btn-secondary"
                >
                  <span>Explore Live Prototypes</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>

            {/* 4 CORE VALUE PILLARS (Clean, Solid Cards) */}
            <div className="mt-16 pt-10 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Stat 1: Core Web Vitals */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Speed & Performance
                  </div>
                  <div className="text-3xl font-extrabold text-zinc-950 tracking-tight mb-1">
                    0.3s Load
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Near-instant mobile rendering designed to capture urgent high-intent calls.
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-4 pt-3 border-t border-zinc-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100/100 Core Web Vitals
                </div>
              </div>

              {/* Stat 2: Security & Reliability */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Reliability
                  </div>
                  <div className="text-3xl font-extrabold text-zinc-950 tracking-tight mb-1">
                    Zero Plugins
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Pure pre-rendered code with no database bottlenecks or vulnerable login portals.
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-4 pt-3 border-t border-zinc-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.99% Uptime SLA
                </div>
              </div>

              {/* Stat 3: Conversion Design */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Conversion Rate
                  </div>
                  <div className="text-3xl font-extrabold text-zinc-950 tracking-tight mb-1">
                    +25% Calls
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Frictionless click-to-call bars, verified social proof, and upfront triage.
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-4 pt-3 border-t border-zinc-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Proven Niche Funnels
                </div>
              </div>

              {/* Stat 4: Fully Managed */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Ongoing Care
                  </div>
                  <div className="text-3xl font-extrabold text-zinc-950 tracking-tight mb-1">
                    100% Done
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Text or email us your updates. We handle copy, photos, and seasonal changes.
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-4 pt-3 border-t border-zinc-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Unlimited Minor Edits
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            2. PERFORMANCE & ARCHITECTURE COMPARISON (Replaces Fake Simulator)
        ────────────────────────────────────────────────────────────────────── */}
        <section id="performance" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200 bg-[#fbfbfb]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">
                Technical Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight mb-4">
                Why custom code outperforms template builders.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Standard WordPress and Wix sites load 30+ redundant stylesheets and plugins on every page view.
                We compile static, pre-rendered assets distributed across global edge nodes.
              </p>
            </div>

            {/* Side-by-Side Comparison Table */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 bg-zinc-100/80 p-4 sm:p-5 font-bold text-xs uppercase tracking-wider border-b border-zinc-200 text-zinc-700">
                <div className="md:col-span-4">Metric & Capability</div>
                <div className="md:col-span-4 text-emerald-800 font-extrabold">SPEEDCRAFT (Bespoke Next.js)</div>
                <div className="md:col-span-4 text-zinc-500">Typical WordPress Site</div>
              </div>

              <div className="divide-y divide-zinc-100 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 p-5 items-center gap-2">
                  <div className="md:col-span-4 font-bold text-zinc-900">
                    Mobile Page Load Time
                  </div>
                  <div className="md:col-span-4 text-emerald-700 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>0.2s – 0.5s (Near Instant)</span>
                  </div>
                  <div className="md:col-span-4 text-zinc-500">
                    3.8s – 6.5s (High bounce rate)
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 p-5 items-center gap-2">
                  <div className="md:col-span-4 font-bold text-zinc-900">
                    Google PageSpeed Score
                  </div>
                  <div className="md:col-span-4 text-emerald-700 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>95 – 100 / 100 Guaranteed</span>
                  </div>
                  <div className="md:col-span-4 text-zinc-500">
                    30 – 60 / 100 (Failing Core Vitals)
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 p-5 items-center gap-2">
                  <div className="md:col-span-4 font-bold text-zinc-900">
                    Security & Maintenance
                  </div>
                  <div className="md:col-span-4 text-emerald-700 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Zero database attack surface</span>
                  </div>
                  <div className="md:col-span-4 text-zinc-500">
                    Constant plugin updates & spam risks
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 p-5 items-center gap-2">
                  <div className="md:col-span-4 font-bold text-zinc-900">
                    Mobile Conversion Architecture
                  </div>
                  <div className="md:col-span-4 text-emerald-700 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>One-tap click-to-call & local triage</span>
                  </div>
                  <div className="md:col-span-4 text-zinc-500">
                    Cluttered generic menus & buried phone numbers
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 p-5 items-center gap-2">
                  <div className="md:col-span-4 font-bold text-zinc-900">
                    Ongoing Changes & Support
                  </div>
                  <div className="md:col-span-4 text-emerald-700 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Same-day turnaround by real engineers</span>
                  </div>
                  <div className="md:col-span-4 text-zinc-500">
                    DIY dashboard wrestling or slow hourly agencies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            3. FEATURED PROTOTYPES (Clean Showcase with Direct Links)
        ────────────────────────────────────────────────────────────────────── */}
        <section id="work" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">
                  Industry Prototypes
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight">
                  Tailored for high-ticket local niches.
                </h2>
              </div>
              <p className="text-zinc-600 text-sm sm:text-base max-w-md">
                Every archetype is structured around the exact conversion psychology of that specific trade.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Archetype 1: Emergency & Home Services */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                      Emergency Services
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">Plumbing, HVAC, Roofing</span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 mb-2">
                    Urgent Service Archetype
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    Designed for panicked homeowners with flooded basements, broken ACs, or leaking roofs.
                    Features instant triage, 30-minute arrival SLAs, and prominent click-to-call hotline.
                  </p>

                  <ul className="space-y-2 text-xs text-zinc-700 mb-8 border-t border-zinc-100 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Instant Emergency Dispatch Intake Card</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Interactive Damage Control Shut-Off Guide</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Upfront Flat-Rate Pricing Guarantee Table</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/preview/network-plumbing"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold studio-btn-secondary"
                >
                  <span>Preview Plumber Prototype</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Archetype 2: Professional & High-Trust */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
                      Professional Counsel
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">Attorneys, CPAs, Wealth</span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 mb-2">
                    Professional Trust Archetype
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    Engineered for high-stakes corporate disputes and tax audits. Emphasizes senior partner
                    credentials, peer ratings (AV Preeminent), verified case settlements, and confidentiality.
                  </p>

                  <ul className="space-y-2 text-xs text-zinc-700 mb-8 border-t border-zinc-100 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Confidential Senior Partner Consultation Intake</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Case Results & Settlement Vault</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Authoritative Media & Legal Peer Credentials</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/preview/corporate-defense-counsel?name=Metropolitan+Legal+Defense&industry=lawyer&city=Dallas"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold studio-btn-secondary"
                >
                  <span>Preview Legal Prototype</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Archetype 3: Boutique Aesthetic & Clinic */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                      Boutique Healthcare
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">Cosmetic Dental, MedSpa</span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 mb-2">
                    Aesthetic Booking Archetype
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                    Clean, calming visual editorial built for cosmetic dentistry and aesthetic clinics.
                    Features before/after comparison sliders, treatment portfolios, and easy online scheduling.
                  </p>

                  <ul className="space-y-2 text-xs text-zinc-700 mb-8 border-t border-zinc-100 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Interactive Before & After Transformation Slider</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2-Step Concierge Treatment Reservation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Patient Testimonials with Real Timeframes</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/preview/radiance-cosmetic-dentistry?name=Radiance+Cosmetic+Dental&industry=dentist&city=Austin"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold studio-btn-secondary"
                >
                  <span>Preview Dental Prototype</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            4. CONCIERGE CARE & HUMAN MAINTENANCE (Replaces Toy iPhone Chat)
        ────────────────────────────────────────────────────────────────────── */}
        <section id="concierge" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200 bg-[#fbfbfb]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Concierge Support
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                  Zero dashboard logins. <br />
                  Real human support.
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Most business owners hate logging into WordPress, wrestling with broken Gutenberg blocks,
                  or figuring out why an update crashed their contact form.
                </p>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  With our partnership model, you get a dedicated engineering team. Just send us a quick
                  text or email with what you want updated—new staff members, seasonal discounts, or updated
                  pricing. We make the change and confirm within hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                    <div className="text-xs font-bold text-zinc-900 mb-1">Same-Day Turnaround</div>
                    <div className="text-xs text-zinc-500">Most edits live within 2 to 4 business hours.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                    <div className="text-xs font-bold text-zinc-900 mb-1">Direct Communication</div>
                    <div className="text-xs text-zinc-500">Reach us directly via phone, text, or email.</div>
                  </div>
                </div>
              </div>

              {/* Right Side: What's Included Card */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-10 shadow-xs">
                  <h3 className="text-xl font-bold text-zinc-950 mb-2">
                    What Our Concierge Care Covers
                  </h3>
                  <p className="text-xs text-zinc-500 mb-6">
                    Included with every website under our managed partnership plan.
                  </p>

                  <div className="space-y-4 text-xs sm:text-sm text-zinc-700">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 block">Unlimited Content & Copy Updates</strong>
                        <span className="text-zinc-500">Add reviews, update pricing, change service descriptions, upload team photos.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 block">Global Edge Hosting & Automated SSL</strong>
                        <span className="text-zinc-500">Continuous sub-second delivery with automatic renewal of security certificates.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 block">Core Web Vitals & Uptime Monitoring</strong>
                        <span className="text-zinc-500">24/7 automated monitoring ensuring your mobile speeds never degrade over time.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-zinc-900 block">Form & Lead Delivery Verification</strong>
                        <span className="text-zinc-500">Spam filtering and verified instant email and SMS routing for every customer inquiry.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            5. ROI CALCULATOR (Clean, Clear Math)
        ────────────────────────────────────────────────────────────────────── */}
        <section id="roi-calculator" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">
                Estimated Impact
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight mb-3">
                Calculate your potential revenue lift.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto">
                Google research indicates that every 1-second improvement in mobile speed increases
                conversion rates by up to 27%.
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Sliders Input Column */}
                <div className="lg:col-span-7 space-y-7">
                  {/* Slider 1: Average Customer / Deal Value */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Average Job / Client Value
                      </label>
                      <span className="text-lg font-black text-zinc-950">
                        ${dealValue.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={5000}
                      step={50}
                      value={dealValue}
                      onChange={(e) => setDealValue(Number(e.target.value))}
                      className="w-full accent-zinc-900 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                      <span>$150 (Service call)</span>
                      <span>$2,500+ (High-ticket contract)</span>
                    </div>
                  </div>

                  {/* Slider 2: Monthly Visitors */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Estimated Monthly Visitors
                      </label>
                      <span className="text-lg font-black text-zinc-950">
                        {monthlyTraffic.toLocaleString()} visits
                      </span>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={10000}
                      step={100}
                      value={monthlyTraffic}
                      onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                      className="w-full accent-zinc-900 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                      <span>300 (Local contractor)</span>
                      <span>10,000+ (Regional practice)</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed pt-2">
                    *Estimated conversion lift calculated conservatively at 2.4% additional converted visitors from eliminating 4G mobile loading lag.
                  </p>
                </div>

                {/* Calculated ROI Output Card */}
                <div className="lg:col-span-5 bg-zinc-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Estimated Monthly Revenue Lift
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
                      +${estimatedAddedRevenue.toLocaleString()}
                      <span className="text-xs text-zinc-400 font-normal">/mo</span>
                    </div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>~{estimatedExtraLeads} extra high-intent calls / month</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800">
                    <div className="flex justify-between items-center text-xs text-zinc-300 mb-4">
                      <span>Monthly Plan Cost:</span>
                      <span className="font-bold text-white text-sm">$150/month ({roiMultiple}x Return)</span>
                    </div>
                    <a
                      href="#prototype"
                      className="w-full py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-98"
                    >
                      <span>Request Free Prototype</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            6. PRICING & INVESTMENT SECTION (Clear & Transparent)
        ────────────────────────────────────────────────────────────────────── */}
        <section id="pricing" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200 bg-[#fbfbfb]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight mb-4">
                Predictable investment. <br />
                Zero hidden surprises.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base font-normal mb-8">
                Choose between our popular all-inclusive partnership model or full upfront source code ownership.
              </p>

              {/* Clean Plan Toggle */}
              <div className="inline-flex items-center p-1 rounded-xl bg-zinc-200/80 border border-zinc-300/80">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("subscription")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    billingPlan === "subscription"
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  All-Inclusive Partnership ($150/mo)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPlan("lumpSum")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    billingPlan === "lumpSum"
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Build & Own Package ($1,200)
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Plan 1: Subscription */}
              <div
                className={`rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all bg-white border ${
                  billingPlan === "subscription"
                    ? "border-zinc-950 shadow-lg ring-1 ring-zinc-950"
                    : "border-zinc-200 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-800">
                      Most Popular
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">Zero Upfront Cost</span>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-950 mb-1">
                    Managed Partnership
                  </h3>
                  <p className="text-xs text-zinc-500 mb-6">
                    Complete bespoke build with lifetime hosting, security, and ongoing updates.
                  </p>

                  <div className="mb-6 pb-6 border-b border-zinc-100">
                    <span className="text-4xl font-extrabold text-zinc-950">$150</span>
                    <span className="text-zinc-500 text-sm font-medium"> / month</span>
                    <p className="text-xs text-zinc-500 mt-1">$0 down payment to build and launch.</p>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-700 mb-8">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Custom Next.js design & development</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Unlimited minor text & photo edits</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High-speed global edge hosting & SSL</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>24/7 Core Web Vitals monitoring</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cancel anytime after 12 months</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#prototype"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center studio-btn-primary"
                >
                  Get Started with $0 Down
                </a>
              </div>

              {/* Plan 2: Lump Sum */}
              <div
                className={`rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all bg-white border ${
                  billingPlan === "lumpSum"
                    ? "border-zinc-950 shadow-lg ring-1 ring-zinc-950"
                    : "border-zinc-200 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-800">
                      Code Ownership
                    </span>
                    <span className="text-xs font-semibold text-zinc-600">Full Hand-Off</span>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-950 mb-1">
                    Build & Own Package
                  </h3>
                  <p className="text-xs text-zinc-500 mb-6">
                    You own 100% of the repository, source code, and design assets outright.
                  </p>

                  <div className="mb-6 pb-6 border-b border-zinc-100">
                    <span className="text-4xl font-extrabold text-zinc-950">$1,200</span>
                    <span className="text-zinc-500 text-sm font-medium"> one-time</span>
                    <p className="text-xs text-zinc-500 mt-1">Optional $50/mo hosting & maintenance retainer.</p>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-700 mb-8">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Complete Next.js source code ownership</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Deployed to your Vercel/Cloudflare account</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Custom domain & DNS routing setup</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Google Analytics & Search Console connected</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>30 days of post-launch revision support</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#prototype"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center studio-btn-secondary"
                >
                  Request Build Proposal
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            7. INTAKE FORM (Direct, Professional, Zero Gimmicks)
        ────────────────────────────────────────────────────────────────────── */}
        <section id="prototype" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              {/* Left Column: Studio Pitch */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                  Get Started
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                  Request a custom prototype for your business.
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Share your current website or business name. We will review your mobile load speed,
                  analyze your local market competition, and build a live working prototype before you spend a dime.
                </p>

                <div className="space-y-3.5 pt-4">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No sales pressure. 100% free interactive preview.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Review delivered within 48 hours.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Customized with your business branding and local area data.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Form */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-8 sm:p-10 shadow-xs">
                  {formSubmitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-950">
                        Prototype Request Received
                      </h3>
                      <p className="text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                        Thank you, {formData.name}. We are preparing your custom speed analysis and working prototype.
                        We will follow up via email at <strong className="text-zinc-900">{formData.email}</strong> shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitForm} className="space-y-5">
                      {errorMessage && (
                        <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                          {errorMessage}
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Your Name or Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Marcus Vance or Vance Plumbing"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="marcus@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Current Website (if applicable)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. www.vanceplumbing.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                          Notes or Pain Points
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us about your services, city, or what bothers you about your current site..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                        />
                      </div>

                      {/* Honeypot anti-spam field */}
                      <input
                        type="text"
                        name="website_verify"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl font-bold text-sm studio-btn-primary cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting Request..." : "Request Free Prototype & Speed Audit"}
                      </button>

                      <p className="text-[11px] text-center text-zinc-500">
                        Zero obligation. We build first so you can verify the speed yourself.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────────
            8. FOOTER
        ────────────────────────────────────────────────────────────────────── */}
        <footer className="py-12 px-6 sm:px-8 bg-zinc-950 text-white text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="font-extrabold text-sm tracking-tight">SPEEDCRAFT STUDIO</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">High-Performance Web Design</span>
            </div>

            <div className="flex items-center gap-6 text-zinc-400">
              <Link href="/preview/network-plumbing" className="hover:text-white transition-colors">
                Plumber Preview
              </Link>
              <Link href="/qa-gallery" className="hover:text-white transition-colors">
                QA Gallery
              </Link>
              <Link href="/outreach" className="hover:text-white transition-colors">
                Outreach Dashboard
              </Link>
              <a href="#prototype" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <div className="text-zinc-500">
              © {new Date().getFullYear()} SPEEDCRAFT Studio. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
