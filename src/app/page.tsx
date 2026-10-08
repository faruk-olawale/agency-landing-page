"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Gauge,
  Sparkles,
  Layers,
  Send,
  ChevronRight,
  Phone,
  Sliders,
  SlidersHorizontal,
  Flame,
  Award,
  Lock,
  Eye,
  Activity,
  Play,
  ExternalLink,
  Laptop,
  Smartphone,
  ChevronLeft,
  Calendar,
  Clock,
  Scale,
  Stethoscope,
  Radio,
  FileCheck,
} from "lucide-react";

export default function ScrolltideInspiredAgency() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("featured");

  // Speed simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [speedProgress, setSpeedProgress] = useState(100);
  const [wpProgress, setWpProgress] = useState(24);

  // ROI Calculator state
  const [dealValue, setDealValue] = useState<number>(750);
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(1400);

  // Pricing plan state
  const [billingPlan, setBillingPlan] = useState<"subscription" | "lumpSum">("subscription");

  // Contact / Prototype form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    notes: "",
    selectedTier: "Zero-Upfront Subscription ($150/mo)",
  });
  const [honeypot, setHoneypot] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scroll listener for glassmorphic header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Speed Benchmark Simulator Handler
  const handleRunSpeedBenchmark = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSpeedProgress(0);
    setWpProgress(0);

    setTimeout(() => {
      setSpeedProgress(100);
    }, 280);

    const interval = setInterval(() => {
      setWpProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 12;
      });
    }, 350);
  };

  // Live Contact Submission Handler
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
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

  // Curated Library of Archetypes & Prototypes (Scrolltide-style Showcase)
  const prototypeShowcase = [
    {
      id: "apex-plumbing",
      title: "Apex 24/7 Emergency Plumbing",
      category: "urgent",
      categoryLabel: "UrgentService Archetype",
      niche: "Plumbing & HVAC",
      badge: "Live Telemetry Dispatch",
      badgeColor: "emerald",
      previewUrl: "/preview/apex-emergency-plumbing?name=Apex+24%2F7+Emergency+Plumbing&industry=plumber&city=Dallas",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      stats: "0.26s FCP • 100 PageSpeed",
      description: "High-contrast emergency layout with simulated GPS dispatch, licensed/insured trust bar, and click-to-call mobile conversion engine.",
    },
    {
      id: "dr-glow-medspa",
      title: "Aura Aesthetic Laser & MedSpa",
      category: "aesthetic",
      categoryLabel: "AestheticBooking Archetype",
      niche: "MedSpa & Dermatology",
      badge: "Interactive Before/After Slider",
      badgeColor: "rose",
      previewUrl: "/preview/dr-glow-medspa?name=Aura+Aesthetic+Clinic&industry=MedSpa&city=Beverly+Hills",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
      stats: "0.29s FCP • VIP Suite Booking",
      description: "Luxury glassmorphic clinic experience with real-time draggable Before & After comparison slider and multi-step concierge reservation.",
    },
    {
      id: "smith-law-firm",
      title: "Vance & Sterling Corporate Defense",
      category: "professional",
      categoryLabel: "ProfessionalTrust Archetype",
      niche: "Law Firm & Fiduciary",
      badge: "$50M+ Verified Settlements",
      badgeColor: "cyan",
      previewUrl: "/preview/smith-law-firm?name=Vance+%26+Sterling+Legal+Counsel&industry=Law+Firm&city=Dallas",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      stats: "0.27s FCP • 256-Bit Encrypted",
      description: "Executive slate palette with animated number counters ($50M+ Recovered), 3-column verified case outcomes grid, and confidential intake form.",
    },
    {
      id: "pearly-whites",
      title: "Pearly Whites Cosmetic Dentistry",
      category: "aesthetic",
      categoryLabel: "AestheticBooking Archetype",
      niche: "Cosmetic Dentistry",
      badge: "Itero 3D Smile Design",
      badgeColor: "rose",
      previewUrl: "/preview/pearly-whites-dental?name=Pearly+Whites+Dental&industry=dentist&city=Austin",
      img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
      stats: "0.28s FCP • Zero Impressions",
      description: "Boutique private suite layout featuring porcelain veneer transformations, spa hygiene menu, and direct calendar reservation pass.",
    },
    {
      id: "sterling-cpa",
      title: "Sterling & Partners CPA Advisory",
      category: "professional",
      categoryLabel: "ProfessionalTrust Archetype",
      niche: "CPA & Tax Strategy",
      badge: "IRS Audit Defense Shield",
      badgeColor: "cyan",
      previewUrl: "/preview/sterling-cpa?name=Sterling+Tax+Advisors&industry=CPA&city=Chicago",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      stats: "0.25s FCP • 99.4% Abatements",
      description: "Data-driven tax defense architecture with Section 368 restructuring case briefs, AICPA board accreditation, and client privilege shield.",
    },
    {
      id: "rapid-hvac",
      title: "Rapid Arctic Air & Heating",
      category: "urgent",
      categoryLabel: "UrgentService Archetype",
      niche: "HVAC & Climate Defense",
      badge: "60-Min Dispatch Guarantee",
      badgeColor: "emerald",
      previewUrl: "/preview/rapid-arctic-hvac?name=Rapid+Arctic+HVAC&industry=hvac&city=Phoenix",
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      stats: "0.28s FCP • 24/7 Hotline",
      description: "Engineered for panic-driven climate emergencies. Extreme temperature alerts, emergency response fee waiver, and instant technician routing.",
    },
  ];

  const filteredShowcase =
    activeCategory === "all"
      ? prototypeShowcase
      : prototypeShowcase.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f5f5f3] font-sans selection:bg-[#46b7ff]/25 selection:text-[#f5f5f3] relative overflow-x-clip antialiased">
      {/* ──────────────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BANNER (Scrolltide Inspiration)
          Deep tide blue banner with film grain & pulsing live dot
      ────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-50 w-full bg-[#46b7ff] text-[#04121f]">
        <div className="grain absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[12px] font-medium sm:text-[13px]">
          <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-[#04121f] animate-pulse" />
          <span className="font-mono uppercase tracking-wide font-bold">100/100 Core Web Vitals Guaranteed</span>
          <span className="opacity-60 hidden md:inline">•</span>
          <span className="font-semibold hidden md:inline">Zero Bloated Plugins • Sub-Second Mobile Load Times</span>
          <a
            href="#prototype-request"
            className="ml-1 rounded-full bg-[#04121f] px-3.5 py-1 text-xs font-semibold text-[#8bf3e6] transition hover:bg-[#04121f]/85 shadow-sm"
          >
            Claim Prototype →
          </a>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          2. STICKY GLASSMORPHIC HEADER (Scrolltide Navigation)
          Border-b transparent with subtle blur, pill links, high-contrast CTA
      ────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full transition-colors duration-300">
        <div
          className={`border-b transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-[#07080a]/80 backdrop-blur-md shadow-2xl shadow-black/40"
              : "border-transparent bg-[#07080a]/40 backdrop-blur-sm"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
            {/* Logo Moniker */}
            <a href="#" className="group flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-black ring-1 ring-white/20 shadow-md">
                <span className="w-3.5 h-3.5 rounded-full bg-[#46b7ff] group-hover:scale-125 transition-transform" />
              </span>
              <span className="text-[17px] font-display font-bold tracking-tight text-[#f5f5f3]">
                speed<span className="text-[#9ba1a6]">craft</span>
              </span>
            </a>

            {/* Nav Pill Links */}
            <div className="hidden items-center gap-1 md:flex">
              <a
                href="#library"
                className="rounded-full px-3.5 py-1.5 text-sm text-[#9ba1a6] transition-colors hover:text-[#f5f5f3] hover:bg-white/5"
              >
                Archetypes
              </a>
              <a
                href="#benchmark"
                className="rounded-full px-3.5 py-1.5 text-sm text-[#9ba1a6] transition-colors hover:text-[#f5f5f3] hover:bg-white/5"
              >
                Speed Simulator
              </a>
              <a
                href="#roi"
                className="rounded-full px-3.5 py-1.5 text-sm text-[#9ba1a6] transition-colors hover:text-[#f5f5f3] hover:bg-white/5"
              >
                ROI Calculator
              </a>
              <a
                href="#pricing"
                className="rounded-full px-3.5 py-1.5 text-sm text-[#9ba1a6] transition-colors hover:text-[#f5f5f3] hover:bg-white/5"
              >
                Pricing
              </a>
              <a
                href="/qa-gallery"
                className="rounded-full px-3.5 py-1.5 text-sm text-[#8bf3e6] transition-colors hover:text-white hover:bg-white/5 font-mono"
              >
                QA Gallery
              </a>
            </div>

            {/* Header Right Action */}
            <div className="flex items-center gap-2.5">
              <a
                href="/qa-gallery"
                className="hidden rounded-full px-3.5 py-2 text-xs font-mono font-medium text-[#9ba1a6] transition hover:text-[#f5f5f3] sm:inline-flex"
              >
                Live Gallery (100+)
              </a>
              <a
                href="#prototype-request"
                className="rounded-full bg-[#f5f5f3] px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-[#07080a] transition hover:bg-white hover:scale-105 active:scale-95 shadow-md inline-flex items-center gap-1.5"
              >
                <span>Get Prototype</span>
                <span className="hidden sm:inline">→</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          3. CINEMATIC HERO SECTION (Scrolltide Inspiration)
          Mesh canvas tide-glow, radial dark vignette, massive Bricolage Grotesque H1,
          inverted bone buttons, avatar stack, and play demo capsule
      ────────────────────────────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Background Mesh Glow & Dark Vignette */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="tide-glow absolute inset-0" />
          <div className="grain absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_42%_at_50%_46%,rgba(7,8,10,0.65),transparent_75%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#07080a]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center px-4 text-center">
          {/* Eyebrow Pill */}
          <motion.a
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            href="#library"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#11151c]/70 px-4 py-1.5 text-xs font-medium text-[#9ba1a6] backdrop-blur transition hover:border-white/20 hover:text-[#f5f5f3] shadow-inner mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#8bf3e6] animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[11px]">
              Engineered For Local High-Ticket Conversions
            </span>
            <span className="text-[#5c636a] transition group-hover:translate-x-0.5 group-hover:text-[#f5f5f3]">
              →
            </span>
          </motion.a>

          {/* Massive Display H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-[#f5f5f3]"
          >
            <span>Websites that move at the</span><br />
            <span>speed of light. </span>
            <span className="text-[#46b7ff]">Zero bloat.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-balance text-base sm:text-lg leading-relaxed text-[#9ba1a6]"
          >
            A curated pipeline of sub-second, mathematically conversion-optimized Next.js
            landing pages for local businesses. Guaranteed 100/100 Core Web Vitals, zero bloated
            WordPress plugins, and motion that turns clicks into booked calls.
          </motion.p>

          {/* Hero Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            {/* Primary Inverted Bone Pill */}
            <a
              href="#prototype-request"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#f5f5f3] px-7 py-3.5 text-sm font-semibold text-[#07080a] transition hover:bg-white hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto"
            >
              <span className="absolute inset-0 -z-0 opacity-0 blur-lg transition group-hover:opacity-40 bg-[#46b7ff]" />
              <span className="relative">Claim Free Prototype</span>
              <span className="relative transition group-hover:translate-x-0.5">→</span>
            </a>

            {/* Secondary Border Pill */}
            <a
              href="#library"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[#f5f5f3] transition hover:bg-[#11151c] hover:border-white/30 w-full sm:w-auto"
            >
              <span>Explore Archetypes</span>
            </a>
          </motion.div>

          {/* Video / Interactive Benchmark Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="#benchmark"
              className="group relative isolate inline-flex items-center transition duration-300 gap-3.5 rounded-full border border-[#46b7ff]/30 bg-[#46b7ff]/[0.07] px-6 py-3 hover:border-[#46b7ff]/60 hover:bg-[#46b7ff]/[0.12]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-[#46b7ff] opacity-0 blur-xl transition duration-300 group-hover:opacity-25"
              />
              <span
                aria-hidden="true"
                className="grid shrink-0 place-items-center rounded-full transition duration-300 group-hover:scale-105 h-8 w-8 bg-[#46b7ff] text-[#04121f]"
              >
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="font-semibold text-[#f5f5f3] text-[14px]">
                  Why Speed Converts?
                </span>
                <span className="text-[#9ba1a6] text-[12px]">
                  0.28s interactive speed benchmark
                </span>
              </span>
              <span
                aria-hidden="true"
                className="ml-1 text-[#9ba1a6] transition duration-300 group-hover:translate-x-0.5 group-hover:text-[#f5f5f3]"
              >
                →
              </span>
            </a>
          </motion.div>

          {/* Social Proof Client Counter with Avatar Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm text-[#9ba1a6]"
          >
            <div className="flex -space-x-2">
              <span
                className="h-7 w-7 rounded-full border-2 border-[#07080a]"
                style={{ background: "radial-gradient(circle at 30% 30%, #46b7ff, #0b0d10)" }}
              />
              <span
                className="h-7 w-7 rounded-full border-2 border-[#07080a]"
                style={{ background: "radial-gradient(circle at 30% 30%, #8bf3e6, #0b0d10)" }}
              />
              <span
                className="h-7 w-7 rounded-full border-2 border-[#07080a]"
                style={{ background: "radial-gradient(circle at 30% 30%, #2e7dff, #0b0d10)" }}
              />
              <span
                className="h-7 w-7 rounded-full border-2 border-[#07080a]"
                style={{ background: "radial-gradient(circle at 30% 30%, #7c93ff, #0b0d10)" }}
              />
            </div>
            <span>
              <strong className="font-semibold text-[#f5f5f3]">4,800+</strong> local inbound calls generated
            </span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. INFINITE PERFORMANCE TICKER (Scrolltide Ticker)
          Mask-image fade on left/right with starry asterisks
      ────────────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-y border-white/10 py-5 bg-[#0b0d11]/60">
        <div
          className="flex w-max animate-marquee gap-12 whitespace-nowrap"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {[0, 1].map((copyIdx) => (
            <React.Fragment key={copyIdx}>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                Next.js 15 Engine <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                0.28s Sub-Second TTI <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                100/100 Core Web Vitals <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                Zero WordPress Plugins <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                Live GPS Dispatch Telemetry <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                Before & After Drag Sliders <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                256-Bit Encrypted Intake <span className="ml-12 text-white/20">✦</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5c636a] flex items-center">
                Framer Motion 60fps <span className="ml-12 text-white/20">✦</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          5. THE PROTOTYPE LIBRARY WALL ("The library, at a glance")
          Directly modeled after Scrolltide's iconic template wall
      ────────────────────────────────────────────────────────────────────── */}
      <section id="library" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-6">
          {/* Section Heading & Quick View Tabs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#8bf3e6] font-bold">
                100+ Audited Local Leads & Custom Archetypes
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl text-[#f5f5f3]">
                The Archetype Library, at a glance
              </h2>
            </div>

            {/* Quick Pill Filter Tabs */}
            <div className="inline-flex rounded-full border border-white/10 bg-[#11151c]/70 p-1 shrink-0">
              <button
                onClick={() => setActiveTab("featured")}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeTab === "featured"
                    ? "bg-[#f5f5f3] text-[#07080a] shadow-md"
                    : "text-[#9ba1a6] hover:text-[#f5f5f3]"
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab("popular")}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeTab === "popular"
                    ? "bg-[#f5f5f3] text-[#07080a] shadow-md"
                    : "text-[#9ba1a6] hover:text-[#f5f5f3]"
                }`}
              >
                Highest Converting
              </button>
              <a
                href="/qa-gallery"
                className="relative rounded-full px-4 py-1.5 text-xs font-semibold transition text-[#8bf3e6] hover:text-white"
              >
                Full QA Gallery →
              </a>
            </div>
          </div>

          {/* Category Filter Pills (Scrollable) */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategory("all")}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                activeCategory === "all"
                  ? "border-transparent bg-[#f5f5f3] text-[#07080a] font-semibold"
                  : "border-white/10 text-[#9ba1a6] hover:border-white/20 hover:text-[#f5f5f3]"
              }`}
            >
              All Archetypes
            </button>
            <button
              onClick={() => setActiveCategory("urgent")}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                activeCategory === "urgent"
                  ? "border-transparent bg-[#f5f5f3] text-[#07080a] font-semibold"
                  : "border-white/10 text-[#9ba1a6] hover:border-white/20 hover:text-[#f5f5f3]"
              }`}
            >
              Urgent Service (Plumbing / HVAC / Roofing)
            </button>
            <button
              onClick={() => setActiveCategory("aesthetic")}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                activeCategory === "aesthetic"
                  ? "border-transparent bg-[#f5f5f3] text-[#07080a] font-semibold"
                  : "border-white/10 text-[#9ba1a6] hover:border-white/20 hover:text-[#f5f5f3]"
              }`}
            >
              Aesthetic Booking (Dentists / MedSpas)
            </button>
            <button
              onClick={() => setActiveCategory("professional")}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition cursor-pointer ${
                activeCategory === "professional"
                  ? "border-transparent bg-[#f5f5f3] text-[#07080a] font-semibold"
                  : "border-white/10 text-[#9ba1a6] hover:border-white/20 hover:text-[#f5f5f3]"
              }`}
            >
              Professional Trust (Law Firms / CPAs)
            </button>
          </div>

          {/* 3-Column Scrolltide Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredShowcase.map((card) => (
              <article key={card.id} className="group relative">
                <a
                  href={card.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  {/* Card Container with Scrolltide Hover Dynamics */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d11] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:border-white/20 group-hover:shadow-[0_20px_60px_-18px_rgba(70,183,255,0.4)]">
                    {/* Visual Media Canvas with Scale on Hover */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        style={{ backgroundImage: `url('${card.img}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-[#0b0d11]/30 to-transparent" />

                      {/* Top Niche Tag */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-[#07080a]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[#f5f5f3]">
                          {card.niche}
                        </span>
                      </div>

                      {/* Card Glow Border */}
                      <span className="card-glow z-[5]" aria-hidden="true" />

                      {/* Floating "Preview Prototype →" Pill sliding up on hover */}
                      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end p-3.5">
                        <span className="translate-y-2 rounded-full bg-[#07080a]/85 px-3.5 py-1.5 text-xs font-semibold text-[#f5f5f3] opacity-0 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg">
                          <span>Launch Live Prototype</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#46b7ff]" />
                        </span>
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-base font-semibold tracking-tight text-[#f5f5f3] group-hover:text-white transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-xs font-mono text-[#5c636a] mt-0.5">
                            {card.categoryLabel}
                          </p>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                            card.badgeColor === "emerald"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                              : card.badgeColor === "rose"
                              ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                              : "border-[#46b7ff]/40 bg-[#46b7ff]/10 text-[#8bf3e6]"
                          }`}
                        >
                          {card.badge}
                        </span>
                      </div>

                      <p className="text-xs text-[#9ba1a6] leading-relaxed line-clamp-2 mb-3">
                        {card.description}
                      </p>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#5c636a]">
                        <span className="text-[#8bf3e6] font-semibold">{card.stats}</span>
                        <span className="group-hover:text-[#f5f5f3] transition-colors flex items-center gap-1">
                          <span>Inspect Prototype</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}

            {/* Custom Studio Card (Direct Scrolltide Mirror) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#11151c] to-[#0b0d11] p-6 shadow-xl">
              <div className="grain absolute inset-0 opacity-40" />
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#46b7ff] opacity-20 blur-3xl" />

              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#8bf3e6] font-bold">
                  The Custom Studio
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-[#f5f5f3]">
                  Want a bespoke prototype engineered for your exact business?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9ba1a6]">
                  We scrape your current slow site, identify its conversion leakages, and
                  engineer a bespoke Next.js prototype with zero upfront risk.
                </p>
              </div>

              <a
                href="#prototype-request"
                className="relative mt-6 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#46b7ff] hover:text-white transition-colors"
              >
                <span>Request Custom Build</span>
                <span className="transition group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          6. NARRATIVE FEATURE BAND 01: SUB-SECOND PERFORMANCE
          Interactive Speed Benchmark Simulator in obsidian dark styling
      ────────────────────────────────────────────────────────────────────── */}
      <section id="benchmark" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8bf3e6] font-bold block mb-2">
              Performance Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f5f3] leading-tight">
              Sub-second speed behind every archetype.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9ba1a6] leading-relaxed">
              Google data proves that 53% of mobile visitors abandon a local site if it takes
              longer than 3 seconds to load. Generic WordPress builds with 40 active plugins
              crawl at 4.8 seconds. Speedcraft engines execute in 0.28 seconds.
            </p>

            <div className="mt-6 space-y-3 font-mono text-xs text-[#9ba1a6]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Bloated WordPress Themes or Elementor Scripts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Edge Cached with Next.js 15 Turbopack Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Google Lighthouse 100/100 Core Web Vitals Contract</span>
              </div>
            </div>
          </div>

          {/* Interactive Benchmark Console */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#0b0d11] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#9ba1a6]">
                  <Activity className="w-4 h-4 text-[#46b7ff]" />
                  <span>Head-to-Head Latency Telemetry</span>
                </div>
                <button
                  onClick={handleRunSpeedBenchmark}
                  disabled={isSimulating}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#f5f5f3] text-[#07080a] hover:bg-white transition cursor-pointer shadow-sm"
                >
                  {isSimulating ? "Benchmarking..." : "Re-run Test ⚡"}
                </button>
              </div>

              {/* Next.js Benchmark Metric */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#f5f5f3] font-bold">Speedcraft Next.js 15 Architecture</span>
                  <span className="text-emerald-400 font-bold">0.28s TTI (100/100)</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#8bf3e6] rounded-full"
                    style={{ width: `${speedProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Standard WordPress Metric */}
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#5c636a]">Typical WordPress Agency Build (38 Plugins)</span>
                  <span className="text-rose-400 font-bold">4.82s TTI (24/100)</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-rose-500/80 rounded-full transition-all duration-300"
                    style={{ width: `${wpProgress}%` }}
                  />
                </div>
              </div>

              {/* Metric Breakdown Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center font-mono">
                <div className="p-3 rounded-xl bg-[#11151c]/60 border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">0.28s</div>
                  <div className="text-[10px] text-[#5c636a] uppercase">First Contentful Paint</div>
                </div>
                <div className="p-3 rounded-xl bg-[#11151c]/60 border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">0 ms</div>
                  <div className="text-[10px] text-[#5c636a] uppercase">Total Blocking Time</div>
                </div>
                <div className="p-3 rounded-xl bg-[#11151c]/60 border border-white/5">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">0.000</div>
                  <div className="text-[10px] text-[#5c636a] uppercase">Cumulative Layout Shift</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          7. NARRATIVE FEATURE BAND 02: ROI CALCULATOR
          Interactive ROI revenue projection slider in dark obsidian theme
      ────────────────────────────────────────────────────────────────────── */}
      <section id="roi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl border border-white/10 bg-[#0b0d11] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="grain absolute inset-0 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#46b7ff] opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8bf3e6] font-bold block mb-2">
              Conversion Economics
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5f5f3]">
              The math behind sub-second speed.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9ba1a6] leading-relaxed">
              Every 0.1s improvement in mobile load time increases conversion rate by 2.4%.
              Calculate how many calls and extra monthly revenue you gain simply by fixing your slow site.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Average Customer / Deal Value */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#9ba1a6] uppercase">Average Customer Ticket / Case Value</span>
                  <span className="text-[#f5f5f3] font-bold text-base">${dealValue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="50"
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value))}
                  className="w-full accent-[#46b7ff] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Monthly Website Visitors */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#9ba1a6] uppercase">Estimated Monthly Mobile Visitors</span>
                  <span className="text-[#f5f5f3] font-bold text-base">{monthlyTraffic.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="10000"
                  step="100"
                  value={monthlyTraffic}
                  onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                  className="w-full accent-[#46b7ff] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Right Projected Output Card */}
            <div className="lg:col-span-5 bg-[#11151c] border border-white/10 rounded-2xl p-6 text-center shadow-xl">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9ba1a6] block mb-1">
                Projected New Monthly Inbound Revenue
              </span>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#46b7ff] tracking-tight mb-2">
                +${estimatedAddedRevenue.toLocaleString()}
                <span className="text-sm font-mono font-normal text-[#9ba1a6]">/mo</span>
              </div>
              <p className="text-xs text-[#9ba1a6] mb-4">
                Based on <strong className="text-white">+{estimatedExtraLeads} extra clients/mo</strong> from recovered mobile bounces.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-around font-mono text-xs">
                <div>
                  <div className="text-lg font-bold text-emerald-400">{roiMultiple}x</div>
                  <div className="text-[10px] text-[#5c636a] uppercase">Monthly ROI</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#f5f5f3]">100%</div>
                  <div className="text-[10px] text-[#5c636a] uppercase">Guaranteed Vitals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          8. 3-STEP PIPELINE: COPY, PASTE, LAUNCH (Scrolltide Inspiration)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8bf3e6] font-bold block mb-2">
            Execution Blueprint
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5f5f3]">
            Audit, synthesize, launch.
          </h2>
          <p className="mt-2 text-sm text-[#9ba1a6]">
            Three steps from your current sluggish site to an unstoppable conversion engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#0b0d11] p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-[#46b7ff]/10 border border-[#46b7ff]/30 flex items-center justify-center text-[#46b7ff] font-mono font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-display text-lg font-bold text-[#f5f5f3] mb-2">
              Performance & CRO Audit
            </h3>
            <p className="text-xs text-[#9ba1a6] leading-relaxed">
              We run simulated mobile load diagnostics, extract your core offering, and locate
              every friction point leaking phone calls and form submissions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0d11] p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-[#46b7ff]/10 border border-[#46b7ff]/30 flex items-center justify-center text-[#46b7ff] font-mono font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-display text-lg font-bold text-[#f5f5f3] mb-2">
              Archetype Synthesis
            </h3>
            <p className="text-xs text-[#9ba1a6] leading-relaxed">
              Your business is mapped into one of our high-converting archetypes: UrgentService,
              AestheticBooking, or ProfessionalTrust with customized interactive motion.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0d11] p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-[#46b7ff]/10 border border-[#46b7ff]/30 flex items-center justify-center text-[#46b7ff] font-mono font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-display text-lg font-bold text-[#f5f5f3] mb-2">
              Domain Launch & Zero-Risk Care
            </h3>
            <p className="text-xs text-[#9ba1a6] leading-relaxed">
              We connect your existing domain with zero downtime. Enjoy sub-second speed,
              unlimited content edits, and guaranteed Core Web Vitals maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          9. TRANSPARENT PRICING ("Ride the tide")
          Dark obsidian cards with bone pill CTAs
      ────────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8bf3e6] font-bold block mb-2">
            Predictable Investment
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5f5f3]">
            Simple, honest pricing.
          </h2>
          <p className="mt-2 text-sm text-[#9ba1a6]">
            No $5,000 surprises. No monthly maintenance lock-ins. Choose how you want to invest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Plan 1: Zero-Upfront Monthly Subscription */}
          <div className="rounded-3xl border border-[#46b7ff]/40 bg-[#0b0d11] p-8 sm:p-10 relative flex flex-col justify-between shadow-2xl shadow-[#46b7ff]/10">
            <div className="absolute top-5 right-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#46b7ff] bg-[#46b7ff]/10 border border-[#46b7ff]/30 px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-[#f5f5f3]">
                Zero-Upfront Subscription
              </h3>
              <p className="text-xs text-[#9ba1a6] mt-1 mb-6">
                Complete custom build with zero upfront design cost.
              </p>

              <div className="flex items-baseline gap-1 mb-6 font-display">
                <span className="text-5xl font-extrabold text-[#f5f5f3]">$150</span>
                <span className="text-sm font-mono text-[#9ba1a6]">/month</span>
              </div>

              <ul className="space-y-3 text-xs text-[#9ba1a6] mb-8 font-mono">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#46b7ff] shrink-0" />
                  <span>$0 Upfront Design & Engineering</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#46b7ff] shrink-0" />
                  <span>Next.js 15 Custom Code (No WordPress)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#46b7ff] shrink-0" />
                  <span>Guaranteed 100/100 Google Core Web Vitals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#46b7ff] shrink-0" />
                  <span>Ultra-Fast Edge Hosting & SSL Included</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#46b7ff] shrink-0" />
                  <span>Unlimited Content & Text Edits</span>
                </li>
              </ul>
            </div>

            <a
              href="#prototype-request"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  selectedTier: "Zero-Upfront Subscription ($150/mo)",
                }))
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f3] hover:bg-white text-[#07080a] py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <span>Start With $0 Down →</span>
            </a>
          </div>

          {/* Plan 2: Build & Own */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0d11] p-8 sm:p-10 relative flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#f5f5f3]">
                Build & Full Ownership
              </h3>
              <p className="text-xs text-[#9ba1a6] mt-1 mb-6">
                Pay once. Own 100% of the repository and code.
              </p>

              <div className="flex items-baseline gap-1 mb-6 font-display">
                <span className="text-5xl font-extrabold text-[#f5f5f3]">$1,200</span>
                <span className="text-sm font-mono text-[#9ba1a6]">one-time</span>
              </div>

              <ul className="space-y-3 text-xs text-[#9ba1a6] mb-8 font-mono">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#8bf3e6] shrink-0" />
                  <span>Full GitHub Source Code Transfer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#8bf3e6] shrink-0" />
                  <span>100% Client Ownership (No Lock-In)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#8bf3e6] shrink-0" />
                  <span>Guaranteed 100/100 Google PageSpeed</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#8bf3e6] shrink-0" />
                  <span>Optional $50/mo Care & Security Plan</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#8bf3e6] shrink-0" />
                  <span>Self-Host Anywhere (Vercel, AWS, Cloudflare)</span>
                </li>
              </ul>
            </div>

            <a
              href="#prototype-request"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  selectedTier: "Build & Full Ownership ($1,200 one-time)",
                }))
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-white/40 text-[#f5f5f3] hover:bg-white/5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all"
            >
              <span>Claim Ownership Build →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          10. INTERACTIVE PROTOTYPE REQUEST FORM (Scrolltide Intake)
          Dark glassmorphic card with 256-bit encryption indicator
      ────────────────────────────────────────────────────────────────────── */}
      <section id="prototype-request" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/10">
        <div className="rounded-3xl border border-white/10 bg-[#0b0d11] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grain absolute inset-0 opacity-20" />
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#46b7ff] opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8bf3e6] font-bold block mb-2">
              Free Live Prototype
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5f5f3]">
              Request your custom sub-second prototype.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#9ba1a6]">
              Give us your business name or URL. We will construct a live prototype
              showing your exact niche archetype running at 0.28s. Zero financial obligation.
            </p>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 py-10 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#f5f5f3]">
                Prototype Request Received
              </h3>
              <p className="text-xs text-[#9ba1a6] max-w-md mx-auto">
                Thank you, {formData.name || "valued partner"}. Our engineering team is generating
                your custom prototype. We will dispatch the private preview URL to{" "}
                <strong className="text-white">{formData.email}</strong> within 4 business hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitForm} className="relative z-10 space-y-4 max-w-xl mx-auto">
              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="company_title_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9ba1a6] mb-1">
                    Your Name <span className="text-[#46b7ff]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[#11151c] border border-white/10 rounded-xl text-[#f5f5f3] placeholder-[#5c636a] focus:outline-none focus:border-[#46b7ff] transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9ba1a6] mb-1">
                    Work Email <span className="text-[#46b7ff]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[#11151c] border border-white/10 rounded-xl text-[#f5f5f3] placeholder-[#5c636a] focus:outline-none focus:border-[#46b7ff] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9ba1a6] mb-1">
                  Current Website URL (Or Business Name)
                </label>
                <input
                  type="text"
                  placeholder="e.g. www.apexplumbingdallas.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[#11151c] border border-white/10 rounded-xl text-[#f5f5f3] placeholder-[#5c636a] focus:outline-none focus:border-[#46b7ff] transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9ba1a6] mb-1">
                  Specific Pain Points or Desired Archetype
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need high-converting mobile phone call flow, currently failing PageSpeed..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[#11151c] border border-white/10 rounded-xl text-[#f5f5f3] placeholder-[#5c636a] focus:outline-none focus:border-[#46b7ff] transition resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f3] hover:bg-white text-[#07080a] py-3.5 px-6 text-sm font-mono font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#46b7ff]" />
                <span>{isSubmitting ? "Generating Blueprint..." : "Generate My Custom Prototype →"}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#5c636a] pt-1">
                <Lock className="w-3.5 h-3.5 text-[#46b7ff]" />
                <span>Zero Obligation • 100% Confidential Architecture Review</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          11. MINIMALIST EDITORIAL FOOTER (Scrolltide Inspiration)
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#07080a] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#5c636a] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#f5f5f3] font-display font-semibold text-sm">
              SPEEDCRAFT STUDIO
            </span>
            <span>•</span>
            <span className="text-[#9ba1a6]">All Systems Operational (99.99% Uptime)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[#9ba1a6]">
            <a href="#library" className="hover:text-white transition">Archetypes</a>
            <a href="#benchmark" className="hover:text-white transition">Speed Engine</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="/qa-gallery" className="hover:text-white transition text-[#8bf3e6]">QA Gallery</a>
          </div>

          <div className="text-[#5c636a]">
            © {new Date().getFullYear()} Speedcraft Studio. Sub-second engineering.
          </div>
        </div>
      </footer>
    </div>
  );
}
