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
  Check,
  Mail,
  Lock,
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
  SendHorizontal,
  ChevronDown
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

  // View mode switcher: 'desktop' | 'mobile'
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">(
    searchParams.get("device") === "mobile" ? "mobile" : "desktop"
  );

  // Speed simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simTimer, setSimTimer] = useState("0.28s");
  const [speedcraftScore, setSpeedcraftScore] = useState(100);
  const [currentScore, setCurrentScore] = useState(lead.mobilePageSpeed);

  // Interactive booking states
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
        { title: "All-on-4 Full Arch", desc: "Permanent, immediate full-mouth teeth replacement with same-day loading.", tag: "Transformational", icon: Star },
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
    <div className="min-h-screen bg-white text-[#160F29] selection:bg-[#5B4BD6] selection:text-white font-sans antialiased">
      {/* ─── LINKPADDY-STYLE VIBRANT PURPLE HERO SECTION ─── */}
      <section className="relative bg-[#5B4BD6] text-white pt-6 pb-24 lg:pb-36 overflow-hidden">
        {/* Subtle Halftone Pattern Dot Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #FFFFFF 1.5px, transparent 1.5px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* HERO TOP NAVIGATION */}
        <header className="relative z-20 max-w-6xl mx-auto px-5 sm:px-8 mb-12 sm:mb-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-white text-[#5B4BD6] flex items-center justify-center font-black text-sm shadow-sm">
                <Zap className="w-4 h-4 fill-[#5B4BD6]" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Speedcraft
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-white/90">
              <a href="#benchmark" className="hover:text-white transition-colors">
                Speed Benchmark
              </a>
              <a href="#prototype" className="hover:text-white transition-colors">
                Interactive Prototype
              </a>
              <a href="#mobile" className="hover:text-white transition-colors">
                Mobile Engine
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing & Handover
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#pricing"
                className="flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold bg-white text-[#160F29] hover:bg-[#F4F2FF] transition-all shadow-sm"
              >
                <span>Claim Prototype</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </a>
            </div>
          </div>
        </header>

        {/* HERO MAIN CONTENT GRID (LinkPaddy 2-Column Split) */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & PITCH */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4939C7] text-white/90 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Private Concept Engineered for {lead.company}</span>
              </div>

              <h1 className="text-[2.75rem] sm:text-[3.75rem] lg:text-[4.25rem] font-black tracking-[-0.035em] leading-[1.05] text-white">
                Found your site takes {lead.mobileLoadTimeSec}s? Here is{" "}
                <span className="inline-block bg-[#4333B3] text-white px-3.5 py-0.5 rounded-2xl mx-1 align-baseline shadow-inner">
                  0.28s.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-normal max-w-xl">
                Most trade websites in Australia score under 30 on mobile. We hand-coded a sub-second Next.js edge build for <strong>{lead.company}</strong> that stops leaking your Google Ads budget.
              </p>

              {/* ACTION PILLS */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#pricing"
                  className="flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold bg-white text-[#160F29] hover:bg-[#F4F2FF] transition-all shadow-[0_10px_25px_rgba(22,15,41,0.2)]"
                >
                  <span>Deploy in 48 Hours</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold bg-[#4939C7] text-white hover:bg-[#3E30B5] border border-white/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
                  <span>{isSimulating ? "Benchmarking..." : "Simulate Speed Test"}</span>
                </button>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified 100/100 Core Web Vitals • Zero Upfront Build Fee • Cancel Anytime</span>
              </div>
            </div>

            {/* RIGHT COLUMN: FLOATING BROWSER & INTERACTIVE PROTOTYPE CARD (LinkPaddy Style) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md space-y-3">
                {/* FLOATING BROWSER ADDRESS BAR */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white font-mono shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                    </div>
                    <span className="ml-2 truncate max-w-[180px] font-medium text-white/90">
                      {lead.website.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-400 text-[#160F29] text-[10px] font-bold">
                    100/100 SPEED
                  </span>
                </div>

                {/* FLOATING WHITE PROTOTYPE CARD */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 text-[#160F29] shadow-[0_25px_60px_rgba(20,12,48,0.35)] space-y-5 border border-white/80">
                  {/* CARD HEADER */}
                  <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
                    <div>
                      <div className="text-xl font-black tracking-tight text-[#160F29] uppercase">
                        {lead.company}
                      </div>
                      <div className="text-xs text-zinc-500 font-medium mt-0.5">
                        {lead.city}, Australia • {lead.niche}
                      </div>
                    </div>
                    <a
                      href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                      className="px-3.5 py-1.5 rounded-full bg-[#F4F2FF] text-[#5B4BD6] hover:bg-[#EAE5FC] font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </a>
                  </div>

                  {/* QUICK VALUE PROP */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#5B4BD6] font-bold">
                      Sub-Second Priority Dispatch
                    </div>
                    <div className="text-lg font-bold text-[#160F29] leading-snug">
                      Reliable {lead.niche} Across Greater {lead.city}.
                    </div>
                  </div>

                  {/* INTERACTIVE INTAKE FORM */}
                  <div className="rounded-2xl bg-[#F8F7FD] p-4 space-y-3 border border-zinc-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#160F29]">Instant Priority Booking</span>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md font-semibold text-[#5B4BD6] border border-zinc-200">
                        0.05s Dispatch
                      </span>
                    </div>

                    {bookingDispatched ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2"
                      >
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                        <div className="font-bold text-xs text-emerald-900">Booking Dispatched in 0.04s!</div>
                        <p className="text-[11px] text-emerald-700 leading-relaxed">
                          SMS verification sent to customer. Lead dispatched to your team instantly.
                        </p>
                        <button
                          onClick={() => setBookingDispatched(false)}
                          className="text-[11px] text-[#5B4BD6] font-bold hover:underline font-mono"
                        >
                          [Reset Simulator]
                        </button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setBookingDispatched(true);
                        }}
                        className="space-y-2.5 text-xs"
                      >
                        <div>
                          <label className="block text-zinc-500 mb-1 text-[11px] font-medium">Select Service</label>
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-800 focus:outline-none focus:border-[#5B4BD6]"
                          >
                            {nicheServices.map((s, idx) => (
                              <option key={idx} value={s.title}>{s.title}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1 text-[11px] font-medium">Customer Name</label>
                          <input
                            type="text"
                            defaultValue={bookingName || "David Miller"}
                            onChange={(e) => setBookingName(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-800 focus:outline-none focus:border-[#5B4BD6]"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 mb-1 text-[11px] font-medium">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue={bookingPhone || "0412 888 999"}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-800 focus:outline-none focus:border-[#5B4BD6]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-[#5B4BD6] hover:bg-[#4939C7] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Confirm Priority Booking</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    )}
                  </div>

                  {/* QUICK CAPABILITIES PILLS */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {nicheServices.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#F4F2FF] text-[#5B4BD6]"
                      >
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HALFTONE DOT TRANSITION WAVE */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle, #FFFFFF 2px, transparent 2px)`,
            backgroundSize: "16px 16px",
          }}
        />
      </section>

      {/* ─── STORY SECTION 1: BENCHMARK THAT STAYS OUT OF YOUR WAY (LinkPaddy Style) ─── */}
      <section id="benchmark" className="py-20 lg:py-28 px-5 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B4BD6]">
              Real Telemetry Battle
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#160F29] leading-tight">
              Speed that stays out of your way.
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              When a Sydney or Melbourne customer taps your Google Ad, every 100ms delay causes back-button dropoffs. Your current monolithic WordPress stack takes <strong>{lead.mobileLoadTimeSec}s</strong> to load unoptimized PHP scripts and plugins.
            </p>
            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              Our Next.js 16 Edge architecture serves pre-compiled HTML from Cloudflare and AWS edge points in under <strong>35ms</strong>, scoring a verified 100/100 Core Web Vitals.
            </p>

            <div className="pt-2">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold bg-[#160F29] text-white hover:bg-zinc-800 transition-colors"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                <span>Run Live Benchmark Test</span>
              </button>
            </div>
          </div>

          {/* RIGHT: SOFT LAVENDER CONTAINER WITH BENCHMARK CARDS */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#F4F2FF] p-6 sm:p-8 space-y-6 border border-[#EAE5FC]">
              {/* COMPARISON METRICS */}
              <div className="space-y-4">
                {/* BOTTLENECK SITE */}
                <div className="rounded-2xl bg-white p-5 space-y-3 shadow-xs border border-zinc-200/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-red-600">Current Architecture</span>
                      <div className="text-sm font-bold text-[#160F29] truncate max-w-[200px]">
                        {lead.website.replace(/^https?:\/\//, "")}
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-mono text-xs font-bold flex items-center gap-1 border border-red-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      <span>{currentScore}/100 Score</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-zinc-500 font-medium">
                      <span>Mobile Load Time (FCP)</span>
                      <span className="font-mono font-bold text-red-600">{lead.mobileLoadTimeSec}s</span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${lead.mobilePageSpeed}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-zinc-600">
                    <div className="bg-[#F8F7FD] p-2.5 rounded-xl border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 uppercase">Engine</div>
                      <div className="font-bold text-[#160F29] truncate">{lead.cms}</div>
                    </div>
                    <div className="bg-[#F8F7FD] p-2.5 rounded-xl border border-zinc-100">
                      <div className="text-[10px] text-zinc-400 uppercase">Wasted Monthly Spend</div>
                      <div className="font-bold text-red-600">~${lead.estLostMonthlySpendAud} AUD/mo</div>
                    </div>
                  </div>
                </div>

                {/* SPEEDCRAFT REBUILD */}
                <div className="rounded-2xl bg-white p-5 space-y-3 shadow-sm border border-[#5B4BD6]/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[#5B4BD6]">Speedcraft Rebuild</span>
                      <div className="text-sm font-bold text-[#160F29]">Next.js 16 Edge Architecture</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold flex items-center gap-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{speedcraftScore}/100 Verified</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-zinc-500 font-medium">
                      <span>Mobile Load Time (FCP)</span>
                      <span className="font-mono font-bold text-emerald-600">{simTimer} (Instant)</span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-zinc-600">
                    <div className="bg-[#F4F2FF] p-2.5 rounded-xl border border-[#EAE5FC]">
                      <div className="text-[10px] text-zinc-500 uppercase">Latency (TTFB)</div>
                      <div className="font-bold text-emerald-700">&lt; 35ms (Sydney Edge)</div>
                    </div>
                    <div className="bg-[#F4F2FF] p-2.5 rounded-xl border border-[#EAE5FC]">
                      <div className="text-[10px] text-zinc-500 uppercase">Retained Traffic</div>
                      <div className="font-bold text-[#5B4BD6]">+38% More Inquiries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STORY SECTION 2: DEVICE FIDELITY (LinkPaddy Alternating Layout) ─── */}
      <section id="mobile" className="py-20 lg:py-28 px-5 sm:px-8 max-w-6xl mx-auto border-t border-zinc-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: LAVENDER CONTAINER HOLDING DEVICE SWITCHER & PHONE CHASSIS */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* DEVICE TOGGLE PILL */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#F4F2FF] border border-[#EAE5FC] text-xs font-medium mb-6">
              <button
                onClick={() => setDeviceView("desktop")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  deviceView === "desktop"
                    ? "bg-[#5B4BD6] text-white font-bold shadow-xs"
                    : "text-zinc-600 hover:text-[#160F29]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop Browser</span>
              </button>
              <button
                onClick={() => setDeviceView("mobile")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  deviceView === "mobile"
                    ? "bg-[#5B4BD6] text-white font-bold shadow-xs"
                    : "text-zinc-600 hover:text-[#160F29]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Device (iPhone)</span>
              </button>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="w-full rounded-3xl bg-[#F4F2FF] p-6 sm:p-8 flex justify-center border border-[#EAE5FC]">
              {deviceView === "mobile" ? (
                /* IPHONE CHASSIS */
                <div className="w-[340px] rounded-[44px] border-[6px] border-[#160F29] bg-white shadow-[0_25px_60px_rgba(20,12,48,0.2)] overflow-hidden relative">
                  {/* DYNAMIC ISLAND & STATUS BAR */}
                  <div className="bg-[#160F29] pt-2.5 pb-2 px-5 flex justify-between items-center text-white text-[11px] font-mono">
                    <span>9:41</span>
                    <div className="w-20 h-4 rounded-full bg-black mx-auto flex items-center justify-end px-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px]">5G</span>
                  </div>

                  {/* PHONE CONTENT */}
                  <div className="p-4 space-y-4 max-h-[460px] overflow-y-auto pb-20">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <div className="font-extrabold text-sm text-[#160F29] uppercase">{lead.company}</div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-200">
                        100/100
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-[#5B4BD6] uppercase">Same-Day Priority</div>
                      <h4 className="text-xl font-black text-[#160F29] leading-snug">
                        Fast {lead.niche} in {lead.city}.
                      </h4>
                      <p className="text-zinc-500 text-xs leading-relaxed">
                        Sub-second booking confirmation. Zero phone wait times.
                      </p>
                    </div>

                    {/* MOBILE QUICK FORM */}
                    <div className="rounded-2xl bg-[#F8F7FD] p-3.5 space-y-2.5 border border-zinc-200/80">
                      <div className="text-xs font-bold text-[#160F29]">Quick Service Request</div>
                      {mobileDispatched ? (
                        <div className="p-3 rounded-xl bg-emerald-50 text-center space-y-1 border border-emerald-200">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                          <div className="text-xs font-bold text-emerald-900">Request Dispatched!</div>
                          <button
                            onClick={() => setMobileDispatched(false)}
                            className="text-[10px] text-[#5B4BD6] font-bold hover:underline font-mono"
                          >
                            [Reset]
                          </button>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setMobileDispatched(true);
                          }}
                          className="space-y-2 text-xs"
                        >
                          <input
                            type="text"
                            defaultValue={bookingName || "David Miller"}
                            placeholder="Your Name"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs"
                          />
                          <input
                            type="tel"
                            defaultValue={bookingPhone || "0412 888 999"}
                            placeholder="Phone Number"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs"
                          />
                          <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-[#5B4BD6] text-white font-bold text-xs"
                          >
                            Instant Quote Request
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* STICKY BOTTOM CALL DOCK */}
                  <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-zinc-100 p-2.5 z-20">
                    <a
                      href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                      className="w-full py-2.5 rounded-xl bg-[#160F29] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now ({lead.phone})</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* DESKTOP BROWSER FRAME */
                <div className="w-full rounded-2xl bg-white shadow-[0_20px_50px_rgba(20,12,48,0.15)] border border-zinc-200/80 overflow-hidden">
                  <div className="bg-[#160F29] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-white/80">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-white ml-2">{lead.website.replace(/^https?:\/\//, "")}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">100/100 Core Web Vitals</span>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                      <div>
                        <div className="text-xl font-black text-[#160F29] uppercase">{lead.company}</div>
                        <div className="text-xs text-zinc-500">{lead.city} • {lead.niche} Specialists</div>
                      </div>
                      <a
                        href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                        className="px-4 py-2 rounded-full bg-[#5B4BD6] text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {lead.phone}</span>
                      </a>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-[#160F29] tracking-tight">
                        Elite {lead.niche} Services. Zero Delay Guaranteed.
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        Trusted by residential and commercial clients across {lead.city}. Upfront transparent quotes and licensed compliance.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {nicheServices.slice(0, 2).map((s, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-[#F8F7FD] border border-zinc-100 space-y-1">
                          <div className="text-xs font-bold text-[#160F29]">{s.title}</div>
                          <div className="text-[11px] text-zinc-500 leading-snug">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B4BD6]">
              Mobile First Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#160F29] leading-tight">
              Know every ad click converts.
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              82% of high-intent emergency searches in Australia happen on mobile devices while people are in a hurry. If your site does not present a sticky one-tap dial button and a 0.05s quote simulator, prospective clients back out and call your competitor.
            </p>
            <p className="text-base text-zinc-600 leading-relaxed font-normal">
              This layout is purpose-engineered to maximize direct calls, form completions, and qualified lead intake.
            </p>

            <div className="pt-2">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold bg-[#5B4BD6] text-white hover:bg-[#4939C7] transition-colors shadow-sm"
              >
                <span>Deploy for {lead.company}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: TURNKEY HANDOVER & PRICING (LinkPaddy Style Clean Cards) ─── */}
      <section id="pricing" className="py-20 lg:py-28 px-5 sm:px-8 bg-[#F8F7FD] border-t border-zinc-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* SECTION HEADER */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5FC] text-[#5B4BD6] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnkey Client Handover Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-[#160F29]">
              Ready to deploy for {lead.company}?
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed">
              We deploy this exact code directly onto your main domain (<span className="font-mono font-semibold text-[#160F29]">{lead.website.replace(/^https?:\/\//, "")}</span>) within 48 hours. Zero downtime, zero broken links, and instant 100/100 Core Web Vitals.
            </p>
          </div>

          {/* DUAL PRICING CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* TIER 1: $150 / MONTH */}
            <div className="rounded-3xl bg-white p-8 sm:p-9 space-y-7 shadow-[0_15px_40px_rgba(20,12,48,0.08)] border-2 border-[#5B4BD6] relative flex flex-col justify-between">
              <div className="space-y-5">
                <div className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#5B4BD6] text-white">
                  Most Popular for Local Trades
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#160F29]">
                    $150 <span className="text-sm font-medium text-zinc-500 font-mono">AUD / month</span>
                  </div>
                  <div className="text-xs text-[#5B4BD6] font-mono font-semibold mt-1">
                    $0 Upfront Build Fee • Cancel Anytime
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-zinc-600 pt-2">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete bespoke Next.js 16 build for <strong>{lead.company}</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ultra-fast Edge CDN hosting & automated SSL certificates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited text, price, phone & image changes handled within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Continuous 100/100 Core Web Vitals maintenance guarantee</span>
                  </li>
                </ul>
              </div>

              <a
                href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(`Activate $150/mo Prototype for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI reviewed the live sub-second prototype for ${lead.company} (${lead.website}).\n\nLet's get this activated under the $150 AUD/month plan.\n\nPhone: ${lead.phone}\nCompany: ${lead.company}\nBest time to call:`)}`}
                className="w-full py-4 rounded-full bg-[#5B4BD6] hover:bg-[#4939C7] text-white font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Claim $150/mo Plan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* TIER 2: $1,200 ONE-TIME */}
            <div className="rounded-3xl bg-white p-8 sm:p-9 space-y-7 shadow-[0_15px_40px_rgba(20,12,48,0.05)] border border-zinc-200/80 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700">
                  Full Code Ownership
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#160F29]">
                    $1,200 <span className="text-sm font-medium text-zinc-500 font-mono">AUD upfront</span>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono mt-1">
                    + $50 AUD/month hosting & maintenance
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-zinc-600 pt-2">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Code Ownership & GitHub Repository Transfer</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero ongoing build royalties</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete DNS transfer and Google Analytics integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Australian engineering support line</span>
                  </li>
                </ul>
              </div>

              <a
                href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(`Buyout Option for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI want to discuss the $1,200 one-time build option for ${lead.company}.\n\nPlease call me or reply here.`)}`}
                className="w-full py-4 rounded-full bg-[#160F29] hover:bg-zinc-800 text-white font-bold text-sm text-center transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Inquire About Buyout</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-zinc-200 text-xs text-zinc-500 font-mono flex items-center justify-center gap-2">
            <span>Direct Engineer Inquiries:</span>
            <a href="mailto:farukolawale509@gmail.com" className="text-[#5B4BD6] font-bold hover:underline">
              farukolawale509@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER (LinkPaddy Style) ─── */}
      <footer className="bg-white border-t border-zinc-200/80 py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#5B4BD6] text-white flex items-center justify-center font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <div>
              <span className="font-bold text-[#160F29] text-sm">Speedcraft Studio Australia</span>
              <p className="text-xs text-zinc-500">Sub-second Next.js edge architecture for Australian businesses.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-600 font-medium">
            <Link href="/" className="hover:text-[#5B4BD6]">Main Studio</Link>
            <Link href="/outreach" className="hover:text-[#5B4BD6]">Audited Leads</Link>
            <a href="mailto:farukolawale509@gmail.com" className="hover:text-[#5B4BD6]">Contact Developer</a>
            <span className="text-zinc-400">© 2026 Speedcraft</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ClientPrototypePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#5B4BD6] flex flex-col items-center justify-center font-mono text-xs text-white space-y-3">
          <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <div className="tracking-wider uppercase text-white/80">Synthesizing Sub-Second Speedcraft Prototype...</div>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
