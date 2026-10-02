"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Phone,
  ArrowRight,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Clock,
  Laptop,
  Check,
  Mail,
  Calendar,
  Lock,
  MessageSquare,
  Smartphone,
  Monitor,
  Star,
  Award,
  MapPin,
  Users,
  Activity,
  Layers,
  Sparkle,
  Radio,
  Sliders,
  SendHorizontal
} from "lucide-react";
import leadsData from "../../../../leads/australia_leads_audit.json";

interface LeadRecord {
  company: string;
  website: string;
  city: string;
  niche: string;
  contactName: string;
  phone: string;
  email: string;
  mobilePageSpeed: number;
  mobileLoadTimeSec: number;
  ttfbMs: number;
  cms: string;
  detectedPlugins: string;
  htmlWeightKb: number;
  scriptsCount: number;
  cpcEstimateAud: number;
  estLostMonthlySpendAud: number;
}

function PrototypeContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = (params?.slug as string) || "";

  // 1. Resolve lead data from JSON database or search parameters
  const lead = useMemo(() => {
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const found = (leadsData as LeadRecord[]).find((l) => {
      const leadSlug = l.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      const domainSlug = l.website.toLowerCase().replace(/[^a-z0-9]/g, "");
      return leadSlug.includes(normalizedSlug) || domainSlug.includes(normalizedSlug) || normalizedSlug.includes(leadSlug);
    });

    const company = searchParams.get("name") || found?.company || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Your Company";
    const website = searchParams.get("domain") || found?.website || (slug ? `https://${slug}.com.au` : "https://yourcompany.com.au");
    const city = searchParams.get("city") || found?.city || "Australia";
    const niche = searchParams.get("niche") || found?.niche || "Professional Services";
    const phone = searchParams.get("phone") || found?.phone || "1300 000 000";
    const email = searchParams.get("email") || found?.email || "info@" + website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const mobilePageSpeed = Number(searchParams.get("speed")) || found?.mobilePageSpeed || 24;
    const mobileLoadTimeSec = Number(searchParams.get("load")) || found?.mobileLoadTimeSec || 3.8;
    const estLostMonthlySpendAud = Number(searchParams.get("waste")) || found?.estLostMonthlySpendAud || 780;
    const cms = found?.cms || "WordPress / Monolith";
    const detectedPlugins = found?.detectedPlugins || "Elementor, Revolution Slider, Contact Form 7";

    return {
      company,
      website,
      city,
      niche,
      phone,
      email,
      mobilePageSpeed,
      mobileLoadTimeSec,
      estLostMonthlySpendAud,
      cms,
      detectedPlugins,
    };
  }, [slug, searchParams]);

  // View mode switcher: 'desktop' | 'mobile' (Mobbin / Refero pattern)
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">(
    searchParams.get("device") === "mobile" ? "mobile" : "desktop"
  );

  // Active showcase tab
  const [activeTab, setActiveTab] = useState<"overview" | "booking" | "reviews">("overview");

  // Speed simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTimer, setSimTimer] = useState("0.28s");
  const [speedcraftScore, setSpeedcraftScore] = useState(100);
  const [currentScore, setCurrentScore] = useState(lead.mobilePageSpeed);

  // Interactive booking state
  const [selectedService, setSelectedService] = useState<string>("");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDispatched, setBookingDispatched] = useState(false);
  const [mobileDispatched, setMobileDispatched] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimTimer("0.05s");
    setSpeedcraftScore(0);
    setCurrentScore(0);

    // Fast Next.js finish
    const t1 = setTimeout(() => {
      setSpeedcraftScore(100);
      setSimTimer("0.28s");
    }, 280);

    // Old site crawls
    const t2 = setTimeout(() => {
      setCurrentScore(lead.mobilePageSpeed);
      setIsSimulating(false);
    }, Math.min(3800, lead.mobileLoadTimeSec * 1000));
  };

  // Niche-tailored bullet points & services
  const nicheServices = useMemo(() => {
    const n = lead.niche.toLowerCase();
    if (n.includes("hvac") || n.includes("air")) {
      return [
        { title: "24/7 Breakdown Response", desc: "Emergency diagnostic and split / ducted repairs within 60 minutes across " + lead.city, tag: "Emergency Priority", icon: Zap },
        { title: "Split & Ducted Installs", desc: "Premium Daikin, Mitsubishi & Panasonic installs with 5-year workmanship warranties.", tag: "Fixed Price", icon: Award },
        { title: "Annual AC Deep Clean", desc: "Coil sanitation, antimicrobial treatment, filter restoration & airflow balancing.", tag: "Preventative", icon: ShieldCheck },
        { title: "Commercial Air Solutions", desc: "VRV/VRF rooftop packages, chillers & multi-tenancy HVAC preventative service.", tag: "Commercial", icon: Activity },
      ];
    }
    if (n.includes("plumb")) {
      return [
        { title: "24/7 Burst Pipe & Leaks", desc: "Immediate isolation and pipe relining with zero excavation damage.", tag: "60-Min Arrival", icon: Zap },
        { title: "CCTV Drain Jetting", desc: "High-pressure water jetting & pipe camera diagnosis for recurring blockages.", tag: "Same Day", icon: Activity },
        { title: "Hot Water Systems", desc: "Same-day replacement for gas, electric and continuous heat pump systems.", tag: "Top Rated", icon: Award },
        { title: "Gas Fitting & Compliance", desc: "Licensed gas fitting, leak detection, bayonet installations & certificates.", tag: "Licensed Trades", icon: ShieldCheck },
      ];
    }
    if (n.includes("roof")) {
      return [
        { title: "Complete Roof Restorations", desc: "Pressure cleaning, re-pointing, primer and 3-coat thermal membrane seal.", tag: "10-Year Warranty", icon: Award },
        { title: "Emergency Leak Detection", desc: "Valley iron replacement, cracked tile repair, and storm damage response.", tag: "24/7 Rapid", icon: Zap },
        { title: "Colorbond Re-Roofing", desc: "Full conversion from old tile to ultra-durable Australian Colorbond steel.", tag: "Architectural", icon: ShieldCheck },
        { title: "Gutter & Downpipe Guards", desc: "Heavy-gauge mesh guards and seamless downpipe upgrades to stop overflows.", tag: "Maintenance", icon: Activity },
      ];
    }
    if (n.includes("dental") || n.includes("dent")) {
      return [
        { title: "Single & Multi Implants", desc: "Titanium & zirconia biocompatible implants with 3D digital guided surgery.", tag: "Precision Care", icon: Award },
        { title: "All-on-4® Full Arch", desc: "Permanent, immediate full-mouth teeth replacement with same-day loading.", tag: "Transformational", icon: Star },
        { title: "Emergency Tooth Relief", desc: "Priority appointments for acute toothaches, chipped teeth, and infections.", tag: "Same-Day Bookings", icon: Zap },
        { title: "Cosmetic Veneers", desc: "Hand-crafted ultra-thin porcelain veneers for natural symmetry and whitening.", tag: "Aesthetic", icon: Sparkles },
      ];
    }
    if (n.includes("legal") || n.includes("law")) {
      return [
        { title: "No Win, No Fee Injury", desc: "Maximum compensation for motor vehicle accidents and workplace injuries.", tag: "Risk-Free", icon: ShieldCheck },
        { title: "Family Law & Custody", desc: "Compassionate, decisive guidance through property settlement and parenting.", tag: "Confidential", icon: Users },
        { title: "Commercial Litigation", desc: "High-stakes contract disputes, debt recovery and shareholder protection.", tag: "Corporate", icon: Award },
        { title: "Estate & Will Disputes", desc: "Contested estates, probate claims, and asset protection structuring.", tag: "Estate Planning", icon: Lock },
      ];
    }
    return [
      { title: "Priority Emergency Dispatch", desc: "Same-day attendance across Greater " + lead.city + " with licensed professionals.", tag: "Rapid SLA", icon: Zap },
      { title: "Fixed Upfront Quotes", desc: "Zero surprise charges or hidden travel fees. Guaranteed in writing before starting.", tag: "Transparent", icon: Award },
      { title: "Full Workmanship Warranty", desc: "Every project backed by comprehensive Australian compliance and warranty guarantees.", tag: "Certified", icon: ShieldCheck },
      { title: "Commercial Contract Servicing", desc: "Dedicated account management, priority response windows, and scheduled audits.", tag: "Commercial Tier", icon: Activity },
    ];
  }, [lead.niche, lead.city]);

  useEffect(() => {
    if (nicheServices.length > 0 && !selectedService) {
      setSelectedService(nicheServices[0].title);
    }
  }, [nicheServices, selectedService]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-zinc-200 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* ─── AMBIENT SUBTLE BACKDROP (Linear / Vercel Style) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/20 blur-[130px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ─── TOP EDITORIAL STATUS BAR ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090b]/80 border-b border-zinc-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-100 font-bold text-xs">
                <Zap className="w-3.5 h-3.5 text-zinc-100" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-white">
                Speedcraft
              </span>
            </Link>
            <span className="text-zinc-700 font-mono text-xs">/</span>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LIVE CONCEPT // {lead.company.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white transition-colors hidden sm:inline-block font-mono"
            >
              ← Back to Main Studio
            </Link>
            <a
              href="#activate"
              className="rounded-lg px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>Claim Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-20">
        {/* ─── HERO INTRO // EDITORIAL HOOK ─── */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-wide">
            <Sparkle className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>Private Concept Engineered for {lead.company} ({lead.city}, Australia)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            We re-engineered <span className="text-white underline decoration-zinc-700 underline-offset-8">{lead.company}</span> to load in <span className="text-emerald-400 font-mono font-medium">0.28s</span>.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto font-normal">
            Your current site takes <strong className="text-red-400 font-semibold">{lead.mobileLoadTimeSec}s</strong> to render on mobile networks. In Australia, slow load times penalize your Google Ads Quality Score by up to 40%. Here is what happens when your site responds instantly.
          </p>
        </section>

        {/* ─── LIVE BENCHMARK BATTLE (Linear / Stripe Metric Cards) ─── */}
        <section className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-6 sm:p-10 shadow-sm space-y-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase font-semibold">
                <Gauge className="w-4 h-4 text-zinc-300" /> Telemetry Benchmark Battle
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Before & After Speed Comparison
              </h2>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/80 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 text-zinc-300 ${isSimulating ? "animate-spin" : ""}`} />
              {isSimulating ? "Benchmarking..." : "Simulate Speed Test"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CURRENT BOTTLENECK SITE */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-6 space-y-5 relative">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-semibold">
                    Current Architecture
                  </span>
                  <div className="text-sm font-semibold text-zinc-200 truncate max-w-[220px]">
                    {lead.website}
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {currentScore}/100 Score
                </div>
              </div>

              {/* METRIC ROWS */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Mobile Paint Time (FCP):</span>
                  <span className="font-mono font-semibold text-red-400">{lead.mobileLoadTimeSec}s</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${lead.mobilePageSpeed}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800/60">
                  <div className="text-zinc-500 text-[10px] uppercase">Engine</div>
                  <div className="text-zinc-200 font-semibold mt-0.5 truncate">{lead.cms}</div>
                </div>
                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800/60">
                  <div className="text-zinc-500 text-[10px] uppercase">Wasted Ad Spend</div>
                  <div className="text-red-400 font-semibold mt-0.5">~${lead.estLostMonthlySpendAud} AUD/mo</div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-snug">
                Monolithic PHP database execution and unoptimized scripts create back-button dropoffs before the hero loads.
              </p>
            </div>

            {/* SPEEDCRAFT NEXT.JS 16 EDGE */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-5 relative">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    Speedcraft Rebuild
                  </span>
                  <div className="text-sm font-semibold text-white">
                    Next.js 16 Edge Architecture
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {speedcraftScore}/100 Verified
                </div>
              </div>

              {/* METRIC ROWS */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Mobile Paint Time (FCP):</span>
                  <span className="font-mono font-semibold text-emerald-400">{simTimer} (Instant)</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800/60">
                  <div className="text-zinc-500 text-[10px] uppercase">Latency (TTFB)</div>
                  <div className="text-emerald-400 font-semibold mt-0.5">&lt; 35ms (Sydney Edge)</div>
                </div>
                <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800/60">
                  <div className="text-zinc-500 text-[10px] uppercase">Retained Traffic</div>
                  <div className="text-emerald-400 font-semibold mt-0.5">+38% More Inquiries</div>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 leading-snug">
                Static edge caching serves pages instantaneously without database queries. Google Ads Quality Scores reach tier 10.
              </p>
            </div>
          </div>
        </section>

        {/* ─── MOBBIN / GODLY INTERACTIVE SHOWCASE SECTION ─── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Interactive Design System
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Live Prototype for {lead.company}
              </h2>
            </div>

            {/* DEVICE VIEW TOGGLE (Mobbin / Refero Pattern) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono shadow-xs">
              <button
                onClick={() => setDeviceView("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  deviceView === "desktop"
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop Browser</span>
              </button>
              <button
                onClick={() => setDeviceView("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  deviceView === "mobile"
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Device (iPhone)</span>
              </button>
            </div>
          </div>

          {/* ─── DESKTOP BROWSER CHASSIS (Godly / Awwwards / Land-book) ─── */}
          {deviceView === "desktop" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/[0.15] bg-[#0c0d12] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* BROWSER TOP BAR WITH GODLY METRICS */}
              <div className="bg-zinc-950 border-b border-white/[0.08] px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
                </div>

                <div className="bg-zinc-900 border border-white/[0.1] rounded-lg px-4 py-1.5 flex items-center gap-2 text-xs font-mono text-zinc-300 max-w-md w-full shadow-inner">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span className="text-zinc-500">https://</span>
                  <span className="font-semibold text-white">{lead.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    100/100 Core Web Vitals
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>0.28s Edge</span>
                </div>
              </div>

              {/* MOCKUP DESKTOP WEBSITE CANVAS */}
              <div className="p-8 sm:p-12 space-y-14 bg-gradient-to-b from-[#0c0d12] via-[#090a0f] to-[#070709]">
                {/* NAV IN THE MOCKUP */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                      {lead.company}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono flex items-center gap-2 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                      <span>{lead.city}, Australia</span>
                      <span>•</span>
                      <span className="text-zinc-300 font-semibold">{lead.niche} Specialists</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-sm transition-all shadow-xs"
                    >
                      <Phone className="w-4 h-4 fill-zinc-950" />
                      <span>Call {lead.phone}</span>
                    </a>
                  </div>
                </div>

                {/* HERO GRID INSIDE PROTOTYPE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Same-Day Priority Dispatch Active Across Greater {lead.city}</span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12]">
                      Elite {lead.niche} Services. Zero Delay Guaranteed.
                    </h3>

                    <p className="text-zinc-400 text-base leading-relaxed">
                      Trusted by hundreds of residential and commercial property owners in {lead.city}. Licensed technicians, upfront pricing quotes, and sub-second confirmation.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-amber-400 text-sm">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="font-bold text-white ml-1">4.9 / 5.0</span>
                        <span className="text-zinc-500 text-xs">(210+ Australian Reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* HIGH CONVERTING INTAKE CARD */}
                  <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="font-bold text-white text-sm">Instant Priority Booking</div>
                      <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-md">
                        0.05s Dispatch
                      </span>
                    </div>

                    {bookingDispatched ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3"
                      >
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                        <div className="text-white font-bold text-base">Booking Dispatched in 0.04s!</div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          Your customer receives an instant SMS verification, and your dispatcher receives full lead telemetry immediately.
                        </p>
                        <button
                          onClick={() => setBookingDispatched(false)}
                          className="text-xs text-zinc-300 hover:text-white hover:underline pt-2 cursor-pointer font-mono"
                        >
                          [Reset Demo Intake]
                        </button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setBookingDispatched(true);
                        }}
                        className="space-y-3 text-xs"
                      >
                        <div>
                          <label className="block text-zinc-400 mb-1 font-mono text-[11px]">Select Service</label>
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500 font-sans"
                          >
                            {nicheServices.map((s, idx) => (
                              <option key={idx} value={s.title}>{s.title}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-zinc-400 mb-1 font-mono text-[11px]">Customer Name</label>
                          <input
                            type="text"
                            defaultValue={bookingName || "David Miller"}
                            onChange={(e) => setBookingName(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500 font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-400 mb-1 font-mono text-[11px]">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue={bookingPhone || "0412 888 999"}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-500 font-sans"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 mt-1 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Confirm Priority Booking</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* BENTO CAPABILITIES CARDS (Aceternity / 21st.dev Style) */}
                <div className="space-y-4 pt-8 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      Core Trade Capabilities
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Australian Standards Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {nicheServices.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <div
                          key={index}
                          className="group rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 p-5 space-y-3 transition-all hover:border-zinc-700 relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                              {service.tag}
                            </span>
                          </div>

                          <div className="font-semibold text-white text-sm group-hover:text-zinc-200 transition-colors">
                            {service.title}
                          </div>

                          <p className="text-zinc-400 text-xs leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── MOBILE DEVICE IPHONE 16 PRO CHASSIS (Mobbin / Refero) ─── */}
          {deviceView === "mobile" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center py-4"
            >
              {/* IPHONE CHASSIS */}
              <div className="w-[390px] rounded-[52px] border-[8px] border-zinc-800 bg-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden relative">
                {/* DYNAMIC ISLAND */}
                <div className="bg-zinc-950 pt-3 pb-2 px-6 flex justify-between items-center text-white text-[12px] font-mono relative z-20">
                  <span>9:41</span>
                  <div className="w-24 h-5 rounded-full bg-black mx-auto border border-zinc-800 flex items-center justify-end px-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span>5G</span>
                    <div className="w-4 h-2.5 rounded-xs border border-white flex items-center p-0.5">
                      <div className="w-full h-full bg-emerald-400 rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* MOBILE PAGE CONTENT */}
                <div className="bg-[#090a0f] text-white p-5 space-y-6 pb-28 max-h-[640px] overflow-y-auto">
                  {/* MOBILE HEADER */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="text-lg font-bold tracking-tight uppercase text-white">
                        {lead.company}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        {lead.city} • {lead.niche}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      100/100
                    </span>
                  </div>

                  {/* HERO */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      <span>Same-Day Priority Service</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white leading-tight">
                      Fast {lead.niche} in {lead.city}.
                    </h3>

                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Instant booking confirmation with zero delay. Sub-second mobile speeds.
                    </p>
                  </div>

                  {/* FAST MOBILE INTAKE FORM */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 space-y-3">
                    <div className="font-bold text-xs text-white">Quick Service Request</div>
                    {mobileDispatched ? (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                        <div className="text-white font-bold text-xs">Dispatched in 0.04s!</div>
                        <p className="text-zinc-400 text-[10px] leading-relaxed">
                          SMS verification and lead telemetry queued for dispatch.
                        </p>
                        <button
                          onClick={() => setMobileDispatched(false)}
                          className="text-[10px] text-zinc-300 hover:text-white hover:underline font-mono"
                        >
                          [Reset Demo]
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setMobileDispatched(true);
                        }}
                        className="space-y-2.5"
                      >
                        <input
                          type="text"
                          placeholder="Your Name"
                          defaultValue={bookingName || "David Miller"}
                          onChange={(e) => setBookingName(e.target.value)}
                          required
                          className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500 font-sans"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          defaultValue={bookingPhone || "0412 888 999"}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          required
                          className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500 font-sans"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Instant Quote Request</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </form>
                    )}
                  </div>

                  {/* SERVICES LIST */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Services</div>
                    {nicheServices.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-200">{s.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* STICKY BOTTOM DOCK (Mobbin conversion standard) */}
                <div className="absolute bottom-0 inset-x-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 p-3 flex gap-2 z-30">
                  <a
                    href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex-1 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs text-center flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 fill-zinc-950" />
                    <span>Call Now ({lead.phone})</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* ─── ACTIVATION & BUYOUT TIERS (Linear / Stripe Pricing Cards) ─── */}
        <section id="activate" className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-8 sm:p-14 space-y-10 shadow-sm overflow-hidden">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Turnkey Client Handover Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Ready to deploy for <span className="text-white underline decoration-zinc-700 underline-offset-8">{lead.company}</span>?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We deploy this exact code directly onto your main domain (<span className="font-mono text-zinc-200">{lead.website.replace(/^https?:\/\//, "")}</span>) within 48 hours. Zero downtime, zero broken links, and instant 100/100 Core Web Vitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* TIER 1: $150 / MONTH */}
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-8 space-y-6 relative flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white text-zinc-950">
                  Most Popular for Local Trades
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white">
                    $150 <span className="text-sm font-normal text-zinc-400 font-mono">AUD / month</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    $0 Upfront Build Fee • Cancel Anytime
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-zinc-300 pt-2">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complete bespoke Next.js 16 build for <strong>{lead.company}</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ultra-fast Edge CDN hosting & automated SSL certificates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited text, price, phone & image changes handled within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Continuous 100/100 Core Web Vitals maintenance guarantee</span>
                  </li>
                </ul>
              </div>

              <a
                href={`mailto:faruk@speedcraft.dev?subject=${encodeURIComponent(`Activate $150/mo Prototype for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI reviewed the live sub-second prototype for ${lead.company} (${lead.website}).\n\nLet's get this activated under the $150 AUD/month plan.\n\nPhone: ${lead.phone}\nCompany: ${lead.company}\nBest time to call:`)}`}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Claim $150/mo Plan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* TIER 2: $1,200 ONE-TIME */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                  Full Code Ownership
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white">
                    $1,200 <span className="text-sm font-normal text-zinc-400 font-mono">AUD upfront</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    + $50 AUD/month hosting & maintenance
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-zinc-300 pt-2">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>100% Code Ownership & GitHub Repository Transfer</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero ongoing build royalties</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complete DNS transfer and Google Analytics integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Australian engineering support line</span>
                  </li>
                </ul>
              </div>

              <a
                href={`mailto:faruk@speedcraft.dev?subject=${encodeURIComponent(`Buyout Option for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI want to discuss the $1,200 one-time build option for ${lead.company}.\n\nPlease call me or reply here.`)}`}
                className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 border border-zinc-700/60"
              >
                <span>Inquire About Buyout</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-white/[0.08] text-xs text-zinc-500 font-mono">
            Direct Developer Line: <a href="tel:+61400000000" className="text-zinc-300 hover:underline">+61 400 000 000</a> • Email: <a href="mailto:faruk@speedcraft.dev" className="text-cyan-400 hover:underline">faruk@speedcraft.dev</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ClientPrototypePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center font-mono text-xs text-cyan-400 space-y-3">
          <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <div className="tracking-widest uppercase text-zinc-400">Synthesizing Sub-Second Speedcraft Prototype...</div>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
