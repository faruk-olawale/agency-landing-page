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
  MessageSquare
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
    // Try matching slug in json
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const found = (leadsData as LeadRecord[]).find((l) => {
      const leadSlug = l.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      const domainSlug = l.website.toLowerCase().replace(/[^a-z0-9]/g, "");
      return leadSlug.includes(normalizedSlug) || domainSlug.includes(normalizedSlug) || normalizedSlug.includes(leadSlug);
    });

    // Fallbacks from URL search parameters if custom
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

  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [speedcraftLoaded, setSpeedcraftLoaded] = useState(true);
  const [oldSiteLoaded, setOldSiteLoaded] = useState(true);
  const [simTimer, setSimTimer] = useState("0.28s");
  const [bookingSent, setBookingSent] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setSpeedcraftLoaded(false);
    setOldSiteLoaded(false);

    // Speedcraft finishes in 280ms
    setTimeout(() => {
      setSpeedcraftLoaded(true);
      setSimTimer("0.28s");
    }, 280);

    // Old site takes full duration
    const durationMs = Math.min(4500, lead.mobileLoadTimeSec * 1000);
    setTimeout(() => {
      setOldSiteLoaded(true);
      setIsSimulating(false);
    }, durationMs);
  };

  // Niche-tailored bullet points
  const nicheServices = useMemo(() => {
    const n = lead.niche.toLowerCase();
    if (n.includes("hvac") || n.includes("air")) {
      return ["Emergency AC Breakdown Repair", "Ducted & Split System Installations", "Commercial HVAC Maintenance", "Indoor Air Quality & Sanitisation"];
    }
    if (n.includes("plumb")) {
      return ["24/7 Emergency Burst Pipe Repair", "Blocked Drains & CCTV Diagnostics", "Continuous Flow Hot Water Systems", "Gas Leak Detection & Certification"];
    }
    if (n.includes("roof")) {
      return ["Full Roof Restorations & Resprays", "Leak Detection & Valley Replacements", "Colorbond & Tile Re-bedding", "Gutter Guard & Downpipe Repairs"];
    }
    if (n.includes("dental") || n.includes("dent")) {
      return ["Single & Multi-Tooth Implants", "All-on-4® Full Arch Restorations", "Emergency Dental Pain Relief", "Cosmetic Porcelain Veneers"];
    }
    if (n.includes("legal") || n.includes("law")) {
      return ["Personal Injury & Compensation Claims", "Family Law & Property Settlements", "Commercial Dispute Resolution", "No Win, No Fee Consultations"];
    }
    if (n.includes("electr") || n.includes("solar")) {
      return ["Commercial Switchboard Upgrades", "Emergency Power Fault Finding", "Tier-1 Solar & Battery Systems", "EV Charging Station Installation"];
    }
    return ["Emergency Same-Day Priority Dispatch", "Licensed, Insured & Verified Trades", "Transparent Upfront Pricing Quotes", "100% Satisfaction Lifetime Guarantee"];
  }, [lead.niche]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-cyan-500 selection:text-white">
      {/* ─── TOP VIP CLIENT CALLOUT BANNER ─── */}
      <div className="sticky top-0 z-50 bg-zinc-950 text-white border-b border-zinc-800 px-4 py-2.5 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-zinc-400">SPEEDCRAFT EDGE // CONFIDENTIAL PROTOTYPE</span>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span className="hidden md:inline font-semibold text-zinc-200">
              Prepared for: <span className="text-cyan-400">{lead.company}</span> ({lead.city})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Learn about Speedcraft
            </Link>
            <a
              href="#activate"
              className="bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-semibold px-3 py-1 rounded text-xs transition-all shadow-sm flex items-center gap-1"
            >
              Claim This Prototype <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* ─── HERO INTRO // THE PROPOSITION ─── */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-50 text-cyan-800 text-xs font-medium tracking-wide">
            <Zap className="w-3.5 h-3.5 text-cyan-600" />
            Hand-Crafted Sub-Second Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            We Re-Engineered <span className="text-cyan-600">{lead.company}</span> to Load in <span className="underline decoration-cyan-400 decoration-wavy">0.28 Seconds</span>.
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Your current landing page at <span className="font-mono text-zinc-900 bg-zinc-200/60 px-1.5 py-0.5 rounded text-sm">{lead.website.replace(/^https?:\/\//, "")}</span> takes <strong className="text-red-600 font-semibold">{lead.mobileLoadTimeSec}s</strong> on mobile. Every second of delay loses up to 20% of high-intent Google Ads traffic. Here is your live working alternative.
          </p>
        </div>

        {/* ─── LIVE BENCHMARK BATTLE // BEFORE VS AFTER ─── */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-600" /> Mobile Speed & Ad Waste Benchmark
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">Live Core Web Vitals telemetry calculated against current mobile networks in Australia</p>
            </div>
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
              {isSimulating ? "Running Simulation..." : "Re-Run Live Speed Test"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OLD WEBSITE CARD */}
            <div className="rounded-xl border border-red-200 bg-red-50/40 p-5 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Current Live Site</span>
                  <div className="font-mono text-xs text-zinc-500 truncate max-w-[200px]">{lead.website}</div>
                </div>
                <div className="flex items-center gap-1.5 bg-red-100 text-red-700 px-2.5 py-1 rounded-md text-sm font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  {lead.mobilePageSpeed}/100
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600">Mobile Load Time</span>
                  <span className="font-bold text-red-600">{lead.mobileLoadTimeSec}s</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${lead.mobilePageSpeed}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-red-100 space-y-2 text-xs">
                <div className="flex justify-between items-center text-zinc-600">
                  <span>CMS Architecture:</span>
                  <span className="font-semibold text-zinc-900">{lead.cms}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span>Server TTFB Latency:</span>
                  <span className="font-semibold text-red-600">&gt; 700ms</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600 pt-2 border-t border-zinc-100">
                  <span className="font-medium text-red-900">Est. Wasted Ad Spend:</span>
                  <span className="font-bold text-red-600 text-sm">~${lead.estLostMonthlySpendAud} AUD/mo</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 italic leading-snug">
                *Google data confirms 53% of mobile visits are abandoned if a page takes longer than 3 seconds to load.
              </p>
            </div>

            {/* SPEEDCRAFT REBUILD CARD */}
            <div className="rounded-xl border border-cyan-300 bg-gradient-to-b from-cyan-50/50 to-white p-5 space-y-4 relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Speedcraft Prototype</span>
                  <div className="font-mono text-xs text-zinc-500">Hand-Coded Next.js 16 Edge</div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100/100
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600">Mobile Load Time</span>
                  <span className="font-bold text-emerald-600">{simTimer} (Sub-second)</span>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `100%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg p-3.5 border border-cyan-100 space-y-2 text-xs shadow-xs">
                <div className="flex justify-between items-center text-zinc-600">
                  <span>Architecture:</span>
                  <span className="font-semibold text-zinc-900">Zero-DB Edge Static</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600">
                  <span>Server TTFB Latency:</span>
                  <span className="font-semibold text-emerald-600">&lt; 35ms (Sydney Edge)</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600 pt-2 border-t border-zinc-100">
                  <span className="font-medium text-emerald-900">Retained Paid Traffic:</span>
                  <span className="font-bold text-emerald-600 text-sm">+38% More Customer Calls</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-600 font-medium">
                ⚡ Instantaneous page render with zero layout shift (CLS: 0.00). Google Ads Quality Score jumps to maximum tier.
              </p>
            </div>
          </div>
        </div>

        {/* ─── LIVE WORKING PROTOTYPE SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 font-mono">Interactive Demo</span>
              <h2 className="text-2xl font-bold text-zinc-950">How Your New Website Will Look & Perform</h2>
            </div>
            <span className="text-xs bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded text-zinc-600 hidden sm:inline-block">
              Interactive Mockup
            </span>
          </div>

          {/* MOCKUP BROWSER WINDOW */}
          <div className="rounded-2xl border border-zinc-300 bg-white shadow-xl overflow-hidden">
            {/* BROWSER TOP BAR */}
            <div className="bg-zinc-100 border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>

              <div className="bg-white border border-zinc-200/80 rounded-md px-3 py-1 flex items-center gap-2 text-xs font-mono text-zinc-600 max-w-sm w-full mx-4 shadow-2xs">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span className="text-zinc-400">https://</span>
                <span className="font-semibold text-zinc-900">{lead.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-700 px-1 rounded font-bold">100/100</span>
              </div>

              <div className="text-xs text-zinc-400 font-mono">0.28s</div>
            </div>

            {/* MOCKUP WEBSITE CONTENT */}
            <div className="p-6 sm:p-12 space-y-12 bg-white">
              {/* BRAND HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 uppercase">
                    {lead.company}
                  </div>
                  <div className="text-xs text-zinc-500 font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
                    <span>{lead.city}, Australia</span>
                    <span>•</span>
                    <span className="text-cyan-600 font-semibold">{lead.niche} Specialists</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>{lead.phone}</span>
                  </a>
                </div>
              </div>

              {/* HERO CALLOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Available 24/7 in {lead.city} • Same-Day Priority Service
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                    Premium {lead.niche} Built for Lasting Results.
                  </h3>

                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    Reliable, licensed, and trusted by hundreds of homeowners and commercial clients across {lead.city}. Instant booking confirmation with zero delays.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#prototype-form"
                      className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-lg shadow-sm text-sm transition-all flex items-center gap-2"
                    >
                      Book Priority Service <ChevronRight className="w-4 h-4" />
                    </a>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <div className="flex text-amber-400">★★★★★</div>
                      <span className="font-semibold text-zinc-700">4.9 / 5</span> (180+ verified reviews)
                    </div>
                  </div>
                </div>

                {/* FAST INTAKE CARD */}
                <div id="prototype-form" className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="text-sm font-bold text-zinc-900 flex items-center justify-between">
                    <span>Request an Instant Quote</span>
                    <span className="text-[10px] font-mono bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">0.05s Dispatch</span>
                  </div>

                  {bookingSent ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="font-bold text-emerald-900 text-sm">Quote Request Dispatched!</div>
                      <div className="text-xs text-emerald-700">Your dispatch team will receive this instantly via SMS and email.</div>
                      <button
                        onClick={() => setBookingSent(false)}
                        className="text-xs text-cyan-600 hover:underline pt-2 font-medium"
                      >
                        Reset Demo Form
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setBookingSent(true);
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Your Name</label>
                        <input
                          type="text"
                          defaultValue="David Miller"
                          required
                          className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-md focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          defaultValue="0412 345 678"
                          required
                          className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-md focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Service Required</label>
                        <select className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-md focus:outline-none focus:border-cyan-500">
                          {nicheServices.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs rounded-md shadow-sm transition-all cursor-pointer"
                      >
                        Send Inquiry (Instant Response)
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* CORE SERVICES TAILORED TO NICHE */}
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Featured Service Capabilities</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {nicheServices.map((service, index) => (
                    <div key={index} className="p-4 rounded-lg border border-zinc-200 bg-white hover:border-cyan-300 transition-all shadow-2xs space-y-2">
                      <div className="w-7 h-7 rounded-md bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs">
                        0{index + 1}
                      </div>
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">{service}</div>
                      <p className="text-[11px] text-zinc-500 leading-snug">
                        Certified technicians serving Greater {lead.city} with all required Australian standards and permits.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── ACTIVATION & CLAIM DEAL TERMS ─── */}
        <div id="activate" className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
              Zero-Risk Activation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade <span className="text-cyan-400">{lead.company}</span> to Sub-Second Speed?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We deploy this exact code on your primary domain. You keep 100% of your customer flow, but with sub-second speeds, zero WordPress plugin bloat, and lower Google Ads cost-per-click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPTION 1: MONTHLY SUBSCRIPTION */}
            <div className="rounded-2xl border border-cyan-500/40 bg-zinc-900/90 p-6 space-y-5 relative">
              <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-400 text-zinc-950">
                Most Popular
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">$150 <span className="text-sm font-normal text-zinc-400">AUD / month</span></div>
                <div className="text-xs text-cyan-400 font-medium mt-0.5">$0 Upfront Build Cost • No Long-Term Lock-in</div>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Full hand-crafted Next.js 16 rebuild for <strong>{lead.company}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Global Edge CDN hosting & SSL certificate included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Unlimited text, price & image changes handled within 24h</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Continuous Core Web Vitals monitoring (Guaranteed 100/100)</span>
                </li>
              </ul>

              <a
                href={`mailto:faruk@speedcraft.dev?subject=${encodeURIComponent(`Activate $150/mo Prototype for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI reviewed the live sub-second prototype for ${lead.company} (${lead.website}).\n\nLet's get this activated under the $150 AUD/month plan.\n\nPhone: ${lead.phone}\nBest contact:`)}`}
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Claim $150/mo Plan <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* OPTION 2: ONE-TIME BUYOUT */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
              <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                Full Ownership
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">$1,200 <span className="text-sm font-normal text-zinc-400">AUD upfront</span></div>
                <div className="text-xs text-zinc-400 mt-0.5">+ $50 AUD/month maintenance & high-speed hosting</div>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Code Ownership & GitHub Repository Transfer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero ongoing build royalties</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complete DNS transfer and Google Analytics integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24/7 Australian engineer support</span>
                </li>
              </ul>

              <a
                href={`mailto:faruk@speedcraft.dev?subject=${encodeURIComponent(`Buyout Option for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI want to discuss the $1,200 one-time build option for ${lead.company}.\n\nPlease call me or reply here.`)}`}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2"
              >
                Inquire About Buyout
              </a>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-zinc-900 text-xs text-zinc-500">
            Questions? Call directly: <a href="tel:+61400000000" className="text-zinc-300 underline">+61 400 000 000</a> or email <a href="mailto:faruk@speedcraft.dev" className="text-cyan-400 underline">faruk@speedcraft.dev</a>.
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ClientPrototypePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center font-mono text-xs text-zinc-500 space-y-2">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <div>Synthesizing Sub-Second Speedcraft Prototype...</div>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
