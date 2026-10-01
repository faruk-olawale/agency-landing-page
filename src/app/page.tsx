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
  Terminal,
  Sparkles,
  Layers,
  Send,
  ChevronRight,
  Smartphone,
  Monitor,
  X,
  TrendingUp,
  Sliders,
  ChevronLeft,
  Phone,
  Video,
  Plus,
  Mic,
  ArrowUp,
  RotateCcw,
} from "lucide-react";

export default function WhiteCreativeStudioAgency() {
  // Navigation & Scroll state
  const [scrolled, setScrolled] = useState(false);
  
  // Pricing toggle state: 'subscription' | 'lumpSum'
  const [billingPlan, setBillingPlan] = useState<"subscription" | "lumpSum">("subscription");
  
  // Interactive Speed Benchmark Simulator in Bento Box
  const [isSimulating, setIsSimulating] = useState(false);
  const [speedProgress, setSpeedProgress] = useState(100);
  const [wpProgress, setWpProgress] = useState(24);

  // Interactive ROI Calculator State
  const [dealValue, setDealValue] = useState<number>(750);
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(1200);

  // Interactive Live iMessage unfolding animation state
  const [chatStep, setChatStep] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);

  useEffect(() => {
    if (!chatStarted) return;
    
    const t1 = setTimeout(() => setChatStep(1), 800);
    const t2 = setTimeout(() => setChatStep(2), 1600);
    const t3 = setTimeout(() => setChatStep(3), 2300);
    const t4 = setTimeout(() => setChatStep(4), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [chatStarted]);

  const handleReplayChat = () => {
    setChatStep(0);
    setTimeout(() => setChatStep(1), 800);
    setTimeout(() => setChatStep(2), 1600);
    setTimeout(() => setChatStep(3), 2300);
    setTimeout(() => setChatStep(4), 3600);
  };

  // Form State
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

  // Template demo modal state
  const [activeModalDemo, setActiveModalDemo] = useState<null | {
    title: string;
    category: string;
    fcp: string;
    lcp: string;
    tbt: string;
    cls: string;
    highlights: string[];
    sampleName: string;
    tagline: string;
  }>(null);
  const [modalDeviceView, setModalDeviceView] = useState<"desktop" | "mobile">("desktop");

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
          ? "Zero-Upfront Subscription ($150/mo)"
          : "Full Build & Care ($1,200 + $50/mo)",
    }));
  };

  // Speed simulator handler
  const handleRunSpeedBenchmark = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSpeedProgress(0);
    setWpProgress(0);

    // Fast Next.js finishes in ~280ms
    setTimeout(() => {
      setSpeedProgress(100);
    }, 280);

    // Bloated WP finishes in ~4800ms
    const interval = setInterval(() => {
      setWpProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 380);
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

  // ROI calculations: 2.2% average conversion lift on sub-second sites
  const estimatedExtraLeads = Math.max(1, Math.round((monthlyTraffic * 0.022)));
  const estimatedAddedRevenue = estimatedExtraLeads * dealValue;
  const roiMultiple = Math.round((estimatedAddedRevenue / 150) * 10) / 10;

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950 font-sans selection:bg-cyan-200 selection:text-zinc-950 relative overflow-x-hidden antialiased">
      
      {/* BACKGROUND ARCHITECTURAL GRID & SUBTLE AMBIENT CONES (GODLY / AWWWARDS AESTHETIC) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Engineering Dot Matrix */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, #000 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, #000 50%, transparent 100%)"
          }}
        />

        {/* Top Center Spotlight Glow */}
        <div className="absolute top-[-12%] left-1/2 -translate-x-1/2 w-[70vw] h-[400px] max-w-[900px] bg-gradient-to-b from-cyan-400/[0.12] via-emerald-300/[0.05] to-transparent rounded-full blur-[130px]" />
        
        {/* Subtle Right Horizon Glow */}
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />
      </div>

      {/* FIXED TOP NAVIGATION BAR WITH STRATEGIC GLASSMORPHISM */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-zinc-200/60 py-3 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/60"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Studio Moniker */}
          <a
            href="#"
            className="group flex items-center gap-3 text-sm tracking-wider font-mono uppercase text-zinc-900 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-black text-base tracking-tight font-sans text-zinc-950 flex items-center">
              SPEEDCRAFT<span className="text-cyan-600 font-mono">.</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-800 border border-emerald-300/60 rounded-full bg-emerald-50/80 backdrop-blur-md tracking-normal shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              100/100 AUDIT GUARANTEED
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-600">
            <a
              href="#why-custom"
              className="hover:text-cyan-600 transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-400 font-bold">{"//"} 01</span> Why Custom
            </a>
            <a
              href="#work"
              className="hover:text-cyan-600 transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-400 font-bold">{"//"} 02</span> Selected Work
            </a>
            <a
              href="#roi-calculator"
              className="hover:text-cyan-600 transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-400 font-bold">{"//"} 03</span> ROI Calculator
            </a>
            <a
              href="#pricing"
              className="hover:text-cyan-600 transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-400 font-bold">{"//"} 04</span> Pricing
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#prototype"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 bg-zinc-950 text-white hover:bg-cyan-500 hover:text-zinc-950 active:scale-[0.97] shadow-sm"
            >
              <span>Get Free Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10">

        {/* 1. HERO SECTION (EDITORIAL BRUTALIST + STUDIO POLISH) */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-28 px-6 sm:px-8 border-b border-zinc-200/80 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Top Telemetry Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/75 border border-white/80 text-zinc-700 text-xs font-mono tracking-wide mb-8 shadow-2xs backdrop-blur-md ring-1 ring-zinc-200/60"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-zinc-900">HAND-CRAFTED NEXT.JS 15 ENGINE</span>
              <span className="text-zinc-300">|</span>
              <span className="text-cyan-700 font-bold">0.28S TIME-TO-INTERACTIVE</span>
            </motion.div>

            {/* Left-Aligned Massive Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-black tracking-[-0.04em] leading-[0.94] text-zinc-950 mb-7">
                Stop Losing <br />
                Customers to a <br />
                <span
                  className="inline-block relative text-transparent cursor-default transition-all duration-300 hover:text-cyan-600 hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                  style={{
                    WebkitTextStroke: "2px #09090b",
                  }}
                  title="Hand-coded sub-second sites convert 3x more local traffic"
                >
                  Slow Website.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 font-normal leading-relaxed max-w-2xl mb-10">
                I hand-code sub-second web experiences for local businesses and high-ticket service clinics.{" "}
                <span className="text-zinc-950 font-semibold">No bloated WordPress, no fragile plugins</span>—just pure performance engineered to turn paid clicks into phone calls.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                {/* Pill-shaped glowing button (tactile press) */}
                <a
                  href="#prototype"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#00f0ff] text-zinc-950 font-black text-sm tracking-wider uppercase transition-all duration-200 hover:bg-[#00d8e6] active:scale-[0.97] glow-cyan-btn cursor-pointer"
                >
                  <span>Request a Free Prototype</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Secondary Proof Strip */}
                <a
                  href="#why-custom"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white border border-zinc-300 hover:border-zinc-950 text-zinc-800 hover:text-zinc-950 text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-[0.97]"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </motion.div>

            {/* TELEMETRY STATS GRID (STUDIO GRADE, ZERO EMOJIS, TACTILE CARDS WITH FROSTED GLASS) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 pt-10 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {/* Stat 1: Google Lighthouse Verification Gauge */}
              <div className="p-5 rounded-2xl flex flex-col justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-zinc-200/60 transition-all duration-200 hover:bg-white/85 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider uppercase mb-3">
                    <span>{"// CORE WEB VITALS"}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                      100/100
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 my-1">
                    {/* SVG Radial Progress Dial */}
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="19" stroke="#e4e4e7" strokeWidth="3.5" fill="none" />
                        <circle
                          cx="24"
                          cy="24"
                          r="19"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          fill="none"
                          strokeDasharray="119.38"
                          strokeDashoffset="0"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-mono text-xs font-black text-emerald-600">100</span>
                    </div>

                    <div>
                      <div className="text-2xl font-black text-zinc-950 tracking-tight font-mono">100/100</div>
                      <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mobile & Desktop 4G
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                  CLS: 0.00 · TBT: 0ms · FID: 12ms
                </div>
              </div>

              {/* Stat 2: Edge Network Latency */}
              <div className="p-5 rounded-2xl flex flex-col justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-zinc-200/60 transition-all duration-200 hover:bg-white/85 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider uppercase mb-3">
                    <span>{"// FIRST CONTENTFUL PAINT"}</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold text-[10px]">
                      TOP 0.1%
                    </span>
                  </div>

                  <div className="my-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-950 tracking-tight font-mono">0.28s</span>
                      <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        280ms cold
                      </span>
                    </div>
                    <div className="text-xs font-mono text-zinc-600 mt-1 flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Global edge node cache</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                  TTFB &lt; 40ms worldwide
                </div>
              </div>

              {/* Stat 3: Vulnerability Surface */}
              <div className="p-5 rounded-2xl flex flex-col justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-zinc-200/60 transition-all duration-200 hover:bg-white/85 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider uppercase mb-3">
                    <span>{"// ATTACK SURFACE"}</span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200 font-bold text-[10px]">
                      IMMUTABLE
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 my-1">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200/90 flex items-center justify-center text-zinc-900 shrink-0">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-mono">0.00%</div>
                      <div className="text-xs font-mono text-zinc-600 font-semibold">Zero SQL Database</div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                  Pre-compiled static HTML & Edge SSL
                </div>
              </div>

              {/* Stat 4: Verified Client Conversion Lift with Sparkline */}
              <div className="p-5 rounded-2xl flex flex-col justify-between bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-zinc-200/60 transition-all duration-200 hover:bg-white/85 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider uppercase mb-3">
                    <span>{"// REVENUE UPTICK"}</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold text-[10px]">
                      +3.4x CALLS
                    </span>
                  </div>

                  <div className="flex items-center justify-between my-1">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-mono">+185%</div>
                      <div className="text-xs font-mono text-zinc-600 font-semibold">Average lead lift</div>
                    </div>

                    {/* SVG Sparkline Graph */}
                    <div className="w-20 h-10 shrink-0">
                      <svg viewBox="0 0 100 45" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 38 Q 25 32, 50 20 T 100 6"
                          fill="none"
                          stroke="#0891b2"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 0 38 Q 25 32, 50 20 T 100 6 L 100 45 L 0 45 Z"
                          fill="url(#sparkline-grad)"
                        />
                        <circle cx="100" cy="6" r="3.5" fill="#0891b2" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                  Verified across 140k+ local ad clicks
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. WHY CUSTOM SECTION (BENTO GRID ARCHITECTURE) */}
        <section id="why-custom" className="py-24 md:py-32 px-6 sm:px-8 border-b border-zinc-200/80 relative bg-[#fdfdfd]">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 uppercase tracking-widest mb-3 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{"// 01 ARCHITECTURE DEEP DIVE"}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950">
                  Why Custom Code <br className="hidden sm:block" />
                  Obliterates WordPress.
                </h2>
              </div>
              <p className="text-zinc-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
                Standard WordPress templates come bloated with 40+ plugins, slow MySQL queries, and perpetual security holes. We engineer pure static performance.
              </p>
            </div>

            {/* BENTO GRID (White Theme Surfaces) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* BENTO ITEM 1: INTERACTIVE SPEED BENCHMARK SIMULATOR (SPAN 8) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-8 card-surface rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-2 font-semibold">
                      <Gauge className="w-4 h-4 text-cyan-600" />
                      LIVE NETWORK BENCHMARK SIMULATION
                    </span>
                    <button
                      onClick={handleRunSpeedBenchmark}
                      disabled={isSimulating}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-zinc-950 text-white hover:bg-cyan-500 hover:text-zinc-950 active:scale-[0.97] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSimulating ? "Testing Network..." : "Run Test Again ↺"}
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mb-2">
                    Sub-Second Edge Rendering vs Monolithic Bloat
                  </h3>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                    Every 100ms of latency drops visitor conversion by 7%. See how your site actually loads on a standard 4G mobile device:
                  </p>

                  {/* Benchmark Meter 1: SPEEDCRAFT NEXT.JS */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-baseline text-xs font-mono mb-2">
                        <span className="font-bold text-zinc-900 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                          SPEEDCRAFT (Next.js 15 Static Edge Engine)
                        </span>
                        <span className="text-cyan-700 font-bold font-mono">
                          {isSimulating ? `${Math.round(speedProgress * 0.28)}ms` : "0.28s (Instant)"}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200">
                        <motion.div
                          className="h-full bg-cyan-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                          style={{ width: `${speedProgress}%` }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1.5">
                        <span>Payload: 45 KB · TTFB: 28ms</span>
                        <span className="text-emerald-700 font-bold">100/100 Core Web Vitals</span>
                      </div>
                    </div>

                    {/* Benchmark Meter 2: BLOATED WORDPRESS */}
                    <div>
                      <div className="flex justify-between items-baseline text-xs font-mono mb-2">
                        <span className="text-zinc-600 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          Average Local WordPress Site (38 Plugins + Elementor)
                        </span>
                        <span className="text-rose-600 font-bold font-mono">
                          {isSimulating ? `${(wpProgress * 0.048).toFixed(2)}s` : "4.8s (Lagging)"}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200">
                        <div
                          className="h-full bg-rose-500/80 rounded-full transition-all duration-300"
                          style={{ width: `${wpProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1.5">
                        <span>Payload: 4.8 MB · 42 Database Queries</span>
                        <span className="text-rose-600 font-bold">Failing Mobile Vitals</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Zero server-side database bottlenecks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Global CDN points of presence in 300+ cities
                  </span>
                </div>
              </motion.div>

              {/* BENTO ITEM 2: ZERO-DATABASE SECURITY (SPAN 4) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-4 card-surface rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block mb-1">
                    ZERO ATTACK SURFACE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mb-3">
                    Impossible to Hack.
                  </h3>

                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                    Over 90% of hacked small business sites trace back to vulnerable WordPress plugins and outdated MySQL databases. We compile to static assets with zero breach vectors.
                  </p>

                  <ul className="space-y-2.5 text-xs font-mono text-zinc-700">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> No SQL injection vectors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> No vulnerable wp-login portals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> Automatic edge SSL & DDoS mitigation
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Security SLA</span>
                  <span className="text-emerald-700 font-bold">99.99% Guaranteed</span>
                </div>
              </motion.div>

              {/* BENTO ITEM 3: DONE-FOR-YOU CONCIERGE CHAT MOCKUP (STREAMLINED & DYNAMIC GLASS) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onViewportEnter={() => {
                  if (!chatStarted) setChatStarted(true);
                }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="md:col-span-12 relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] ring-1 ring-zinc-950/5"
              >
                {/* Colorful Ambient Mesh Glows behind frosted glass */}
                <div className="absolute -top-24 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 via-emerald-300/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/15 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

                <div className="max-w-xl relative z-10">
                  <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                    <div className="w-8 h-8 rounded-xl bg-cyan-50/80 border border-cyan-200/80 backdrop-blur-md flex items-center justify-center text-cyan-700 shadow-2xs">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-zinc-100/80 border border-zinc-200/80 backdrop-blur-md text-zinc-700 font-semibold shadow-2xs">
                      DIRECT DEV ACCESS // ZERO DASHBOARDS
                    </span>
                    <button
                      type="button"
                      onClick={handleReplayChat}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-cyan-800 hover:text-cyan-950 bg-white/80 hover:bg-white px-2.5 py-0.5 rounded-full border border-cyan-200/80 backdrop-blur-md transition-all cursor-pointer shadow-2xs"
                      title="Replay live message interaction"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Replay Interaction</span>
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mb-2">
                    100% Done-For-You Concierge Maintenance
                  </h3>

                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-4">
                    Never wrestle with WordPress admin passwords, plugin updates, or broken layouts again. Just text or email us what you need changed—pricing updates, new photos, seasonal promotions. We handle it directly in hours.
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <Check className="w-4 h-4" /> Unlimited content edits
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <Check className="w-4 h-4" /> &lt; 2h turnaround SLA
                    </span>
                  </div>
                </div>

                {/* Compact, Ultra-Realistic iPhone 16 Pro Dynamic Chat */}
                <div className="w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[380px] shrink-0 mx-auto relative z-10">
                  {/* Physical iPhone 16 Pro Chassis */}
                  <div className="relative rounded-[46px] p-2 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)]">
                    {/* Hardware Buttons */}
                    <div className="absolute -left-[3px] top-20 w-[3px] h-6 bg-zinc-700 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-30 w-[3px] h-10 bg-zinc-700 rounded-l-sm" />
                    <div className="absolute -left-[3px] top-44 w-[3px] h-10 bg-zinc-700 rounded-l-sm" />
                    <div className="absolute -right-[3px] top-28 w-[3px] h-12 bg-zinc-700 rounded-r-sm" />

                    {/* iPhone Display Glass */}
                    <div className="rounded-[38px] bg-white overflow-hidden flex flex-col relative border border-zinc-200/40 select-none">
                      
                      {/* iOS Status Bar */}
                      <div className="pt-2.5 pb-1 px-5 bg-[#f6f6f6]/95 backdrop-blur-md flex items-center justify-between text-zinc-950">
                        {/* Time */}
                        <span className="text-xs font-semibold tracking-tight font-sans">9:41</span>
                        
                        {/* Dynamic Island */}
                        <div className="w-[84px] h-[19px] bg-black rounded-full mx-auto relative flex items-center justify-end px-2 shadow-inner">
                          <div className="w-2 h-2 rounded-full bg-[#0d1326] ring-1 ring-blue-500/20" />
                        </div>

                        {/* Status Icons: Cellular, 5G, Battery */}
                        <div className="flex items-center gap-1 text-zinc-900">
                          <svg className="w-3.5 h-2.5 fill-current" viewBox="0 0 17 12">
                            <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                            <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.5" />
                            <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
                            <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
                          </svg>

                          <span className="text-[9px] font-bold tracking-tighter leading-none">5G</span>

                          <svg className="w-4.5 h-2.5 text-zinc-900" viewBox="0 0 25 12" fill="none">
                            <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" strokeWidth="1" />
                            <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
                            <path d="M23 4v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>

                      {/* iOS Navigation Bar */}
                      <div className="px-3.5 py-1.5 bg-[#f6f6f6]/95 backdrop-blur-md border-b border-[#e5e5ea] flex items-center justify-between">
                        {/* Back to Messages */}
                        <div className="flex items-center text-[#007aff] text-xs font-medium cursor-default">
                          <ChevronLeft className="w-4 h-4 stroke-[2.5] -ml-1" />
                          <span>12</span>
                        </div>

                        {/* Center Contact Header */}
                        <div className="flex flex-col items-center">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 via-cyan-500 to-emerald-400 p-[1.2px] shadow-2xs">
                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center font-bold text-[10px] text-white tracking-tight">
                              FO
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5 mt-0.5">
                            <span className="font-semibold text-[11px] text-zinc-950">Faruk (Speedcraft)</span>
                            <ChevronRight className="w-2.5 h-2.5 text-zinc-400 stroke-[2]" />
                          </div>
                          <span className="text-[9px] text-zinc-400 font-medium leading-none">iMessage</span>
                        </div>

                        {/* FaceTime & Phone Icons */}
                        <div className="flex items-center gap-2.5 text-[#007aff]">
                          <Video className="w-3.5 h-3.5 stroke-[2]" />
                          <Phone className="w-3 h-3 stroke-[2]" />
                        </div>
                      </div>

                      {/* Compact Conversation Scroll Body */}
                      <div className="p-3 space-y-2 bg-[#ffffff] text-[12.5px] sm:text-[13px] leading-snug font-sans min-h-[205px] flex flex-col justify-end">
                        {/* Timestamp */}
                        <div className="text-center text-[9.5px] text-zinc-400 font-medium my-0.5">
                          Today 10:14 AM
                        </div>

                        {/* Message 1: Incoming Emergency Request */}
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="flex justify-start"
                        >
                          <div className="relative bg-[#e9e9eb] text-zinc-950 px-3 py-1.5 rounded-[18px] rounded-bl-[4px] max-w-[85%] font-normal">
                            Hey Faruk! Emergency — board approved a $50 promo. Can we get the banner live before 11 AM?
                            {/* Incoming Bubble Tail */}
                            <svg className="absolute -bottom-[0.5px] -left-[5px] w-[14px] h-[14px] text-[#e9e9eb] fill-current pointer-events-none" viewBox="0 0 14 14">
                              <path d="M14,0 C14,7.732 7.732,14 0,14 C4.5,14 8,11 9.5,8 C10.2,6 10.5,3.5 10.5,0 Z" />
                            </svg>
                          </div>
                        </motion.div>

                        {/* Message 2: Outgoing Live Deployment & Tapback (Unfolds at Step 1+) */}
                        <AnimatePresence>
                          {chatStep >= 1 && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="flex flex-col items-end pt-0.5"
                            >
                              {/* Compact Live Audit Badge */}
                              <div className="bg-zinc-950 text-white rounded-xl px-2.5 py-1 mb-1 flex items-center justify-between text-[10px] w-fit max-w-[88%] border border-zinc-800 shadow-2xs gap-2.5">
                                <div className="flex items-center gap-1.5 truncate">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                                  <span className="font-semibold text-zinc-200 truncate">speedcraft.dev/live</span>
                                </div>
                                <span className="font-mono text-emerald-400 font-bold shrink-0 text-[9.5px]">100/100 · 0.28s</span>
                              </div>

                              {/* Message bubble with Loved Tapback reaction */}
                              <div className="relative bg-[#007aff] text-white px-3 py-1.5 rounded-[18px] rounded-br-[4px] max-w-[88%] font-normal">
                                Done! Live across all 310 global edge nodes in 9 minutes. Cache purged &amp; PageSpeed 100/100.
                                
                                {/* Outgoing Bubble Tail */}
                                <svg className="absolute -bottom-[0.5px] -right-[5px] w-[14px] h-[14px] text-[#007aff] fill-current pointer-events-none" viewBox="0 0 14 14">
                                  <path d="M0,0 C0,7.732 6.268,14 14,14 C9.5,14 6,11 4.5,8 C3.8,6 3.5,3.5 3.5,0 Z" />
                                </svg>

                                {/* Loved Tapback Sticker - Springs in at Step 2 */}
                                <AnimatePresence>
                                  {chatStep >= 2 && (
                                    <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ type: "spring", stiffness: 450, damping: 16 }}
                                      className="absolute -top-3 -left-2 flex items-center z-10 select-none"
                                    >
                                      <div className="bg-white rounded-full px-1.5 py-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.18)] border border-zinc-200/80 flex items-center gap-0.5">
                                        <span className="text-[11px] leading-none">❤️</span>
                                        <span className="text-[9px] font-bold text-zinc-600 font-sans">1</span>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Delivered status receipt */}
                              <div className="text-[9px] text-zinc-400 font-medium mt-0.5 pr-1">
                                Delivered · 10:23 AM
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Step 3: Brief Client Typing Indicator before final response */}
                        <AnimatePresence>
                          {chatStep === 3 && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              className="flex justify-start pt-0.5"
                            >
                              <div className="relative bg-[#e9e9eb] px-3 py-2 rounded-[18px] rounded-bl-[4px] flex items-center gap-1.5 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                                {/* Incoming Bubble Tail */}
                                <svg className="absolute -bottom-[0.5px] -left-[5px] w-[14px] h-[14px] text-[#e9e9eb] fill-current pointer-events-none" viewBox="0 0 14 14">
                                  <path d="M14,0 C14,7.732 7.732,14 0,14 C4.5,14 8,11 9.5,8 C10.2,6 10.5,3.5 10.5,0 Z" />
                                </svg>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Step 4: Final Enthusiastic Client Response */}
                        <AnimatePresence>
                          {chatStep >= 4 && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className="flex justify-start pt-0.5"
                            >
                              <div className="relative bg-[#e9e9eb] text-zinc-950 px-3 py-1.5 rounded-[18px] rounded-bl-[4px] max-w-[85%] font-normal">
                                Holy cow that was fast! 😭 Our old agency took 4 days just to reply. You guys are unreal 🙌
                                {/* Incoming Bubble Tail */}
                                <svg className="absolute -bottom-[0.5px] -left-[5px] w-[14px] h-[14px] text-[#e9e9eb] fill-current pointer-events-none" viewBox="0 0 14 14">
                                  <path d="M14,0 C14,7.732 7.732,14 0,14 C4.5,14 8,11 9.5,8 C10.2,6 10.5,3.5 10.5,0 Z" />
                                </svg>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* iOS Bottom Input Bar */}
                      <div className="px-3 py-1.5 bg-[#f6f6f6]/95 border-t border-[#e5e5ea] flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-[#e5e5ea] flex items-center justify-center text-zinc-600 shrink-0">
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        
                        <div className="flex-1 bg-white border border-[#d1d1d6] rounded-full px-2.5 py-1 flex items-center justify-between text-[11px] text-zinc-400 shadow-2xs">
                          <span>iMessage</span>
                          <Mic className="w-3 h-3 text-zinc-400" />
                        </div>

                        <div className="w-6 h-6 rounded-full bg-[#007aff] flex items-center justify-center text-white shrink-0 shadow-2xs">
                          <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>

                      {/* iOS Home Indicator Bar */}
                      <div className="bg-[#f6f6f6]/95 pb-1 pt-0.5 flex justify-center">
                        <div className="w-28 h-1 bg-zinc-300 rounded-full" />
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK (HIGH-CONVERSION SHOWCASE) */}
        <section id="work" className="py-24 md:py-32 px-6 sm:px-8 border-b border-zinc-200/80 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 uppercase tracking-widest mb-3 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{"// 02 HIGH-CONVERSION SHOWCASE"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 mb-4">
                See the Speed.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base max-w-xl font-normal">
                Edge-to-edge architectures hand-crafted for high-ticket local trades and private clinical practices.
              </p>
            </div>

            {/* Showcase Grid (Large, Edge-to-Edge Cards in White Theme) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">

              {/* CARD 1: HOME SERVICE TEMPLATE */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group rounded-3xl bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between hover:border-cyan-500/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl"
              >
                {/* Visual Header / Mockup Preview */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200/80 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b border-zinc-200">
                  {/* Subtle Grid in Mockup */}
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
                      backgroundSize: "32px 32px"
                    }}
                  />

                  {/* Floating Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-white/95 border border-zinc-300 text-zinc-800 backdrop-blur-md shadow-2xs font-semibold">
                      {"HOME SERVICE // HVAC & ROOFING"}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 backdrop-blur-md font-bold shadow-2xs">
                      <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" /> 0.31s First Paint
                    </span>
                  </div>

                  {/* Visual Interface Preview Element */}
                  <div className="relative z-10 my-auto py-4">
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/95 border border-zinc-300/80 shadow-lg backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs font-mono text-zinc-500">
                        <span className="font-bold text-zinc-800">VANGUARD ROOFING & SOLAR</span>
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          ● Instant Dispatch
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-bold text-zinc-950 leading-tight">
                          24/7 Storm Damage Emergency Response
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-zinc-500">Quotes returned in 4 mins · Zero spam</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="h-8 px-4 rounded-lg bg-[#00f0ff] text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                            Book Inspection <ArrowRight className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-mono text-zinc-600 font-medium">Google Rating 4.9 ★ (140+)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Mockup Metric Footnote */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>STACK: NEXT.JS 15 + TAILWIND</span>
                    <span className="text-emerald-700 font-bold">+184% Lead Inquiries</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-950 tracking-tight group-hover:text-cyan-700 transition-colors">
                      Apex Home Services Template
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mt-1">
                      Engineered for high emergency click-to-call conversion and local SEO domination.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setActiveModalDemo({
                        title: "Apex Home Services Template",
                        category: "HVAC, Plumbing & Roofing",
                        fcp: "0.31s",
                        lcp: "0.62s",
                        tbt: "0ms",
                        cls: "0.00",
                        highlights: [
                          "Click-to-Call Emergency Hero Strip",
                          "Zip Code Service Area Checker",
                          "Instant Quote Estimator Form",
                        ],
                        sampleName: "Vanguard Roofing & Solar",
                        tagline: "24/7 Storm Damage Emergency Response",
                      })
                    }
                    className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950 transition-all duration-200 shrink-0 cursor-pointer"
                    title="Inspect template details"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* CARD 2: HIGH-TICKET MEDICAL & CLINIC TEMPLATE */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group rounded-3xl bg-white border border-zinc-200/90 overflow-hidden flex flex-col justify-between hover:border-cyan-500/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl"
              >
                {/* Visual Header / Mockup Preview */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200/80 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b border-zinc-200">
                  {/* Subtle Grid in Mockup */}
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
                      backgroundSize: "32px 32px"
                    }}
                  />

                  {/* Floating Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-white/95 border border-zinc-300 text-zinc-800 backdrop-blur-md shadow-2xs font-semibold">
                      {"HEALTHCARE // MEDICAL & CLINIC"}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-cyan-800 bg-cyan-50 border border-cyan-300 backdrop-blur-md font-bold shadow-2xs">
                      <Zap className="w-3 h-3 text-cyan-600 fill-cyan-600" /> 0.28s First Paint
                    </span>
                  </div>

                  {/* Visual Interface Preview Element */}
                  <div className="relative z-10 my-auto py-4">
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/95 border border-zinc-300/80 shadow-lg backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs font-mono text-zinc-500">
                        <span className="font-bold text-zinc-800">LUMINA AESTHETICS & SURGERY</span>
                        <span className="text-cyan-700 flex items-center gap-1 font-semibold">
                          ● HIPAA Verified
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-bold text-zinc-950 leading-tight">
                          Private Consultation & Facial Rejuvenation
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-zinc-500">Board-Certified Specialists · VIP Concierge</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="h-8 px-4 rounded-lg bg-zinc-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                            Book VIP Visit <ArrowRight className="w-3 h-3 text-cyan-400" />
                          </div>
                          <span className="text-xs font-mono text-zinc-600 font-medium">99.8% Patient Satisfaction</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Mockup Metric Footnote */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>STACK: REACT 19 + CLOUDFLARE EDGE</span>
                    <span className="text-cyan-700 font-bold">3.2x Consultation Inquiries</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-950 tracking-tight group-hover:text-cyan-700 transition-colors">
                      Lumina Medical Practice Template
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mt-1">
                      Designed for high-ticket cash procedures, cosmetic clinics, and private medical practices.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setActiveModalDemo({
                        title: "Lumina Medical Practice Template",
                        category: "Aesthetics & Clinical Practice",
                        fcp: "0.28s",
                        lcp: "0.58s",
                        tbt: "0ms",
                        cls: "0.00",
                        highlights: [
                          "HIPAA Compliant Contact Intake",
                          "Before / After Slider Gallery",
                          "Direct Doctor Credential Badging",
                        ],
                        sampleName: "Lumina Aesthetics & Surgery",
                        tagline: "Private Consultation & Facial Rejuvenation",
                      })
                    }
                    className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950 transition-all duration-200 shrink-0 cursor-pointer"
                    title="Inspect template details"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE CLIENT ROI CALCULATOR SECTION (PULLS FROM SAASFRAME & LAND-BOOK TO CONVERT CLIENTS) */}
        <section id="roi-calculator" className="py-20 md:py-28 px-6 sm:px-8 border-b border-zinc-200/80 bg-[#f9fafb]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 uppercase tracking-widest mb-3 font-semibold">
                <Sliders className="w-3.5 h-3.5" />
                <span>{"// 03 ESTIMATED CLIENT ROI"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 mb-3">
                Calculate Your Real Revenue Lift.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto">
                See how much revenue you are leaving on the table every month from slow mobile load times and bounce rates.
              </p>
            </div>

            <div className="card-surface rounded-3xl p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Sliders Input Column */}
                <div className="lg:col-span-7 space-y-7">
                  {/* Slider 1: Average Customer / Deal Value */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-bold">
                        Average Customer / Job Value
                      </label>
                      <span className="font-mono text-lg font-black text-zinc-950">
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
                      className="w-full accent-cyan-600 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1">
                      <span>$150 (Service call)</span>
                      <span>$2,500+ (High-ticket contract)</span>
                    </div>
                  </div>

                  {/* Slider 2: Monthly Visitors */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-bold">
                        Monthly Website Visitors
                      </label>
                      <span className="font-mono text-lg font-black text-zinc-950">
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
                      className="w-full accent-cyan-600 h-2 bg-zinc-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1">
                      <span>300 (Local contractor)</span>
                      <span>10,000+ (High-traffic clinic)</span>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-zinc-500 leading-relaxed pt-2">
                    *Based on Google data showing sub-second sites experience a 2.2% - 3.4% median conversion lift over sites with 3+ second mobile load times.
                  </p>
                </div>

                {/* Calculated ROI Output Card */}
                <div className="lg:col-span-5 bg-zinc-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                      PROJECTED MONTHLY VALUE
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight my-2">
                      +${estimatedAddedRevenue.toLocaleString()}
                      <span className="text-xs font-mono text-zinc-400 font-normal">/mo</span>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>~{estimatedExtraLeads} extra high-intent calls / month</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800">
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-300 mb-4">
                      <span>Return on $150/mo Plan:</span>
                      <span className="text-cyan-400 font-bold text-sm">{roiMultiple}x ROI</span>
                    </div>
                    <a
                      href="#prototype"
                      className="w-full py-3 rounded-full bg-[#00f0ff] hover:bg-[#00d8e6] text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors active:scale-[0.97]"
                    >
                      <span>Claim Your Free Prototype</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PRICING & INVESTMENT SECTION */}
        <section id="pricing" className="py-24 md:py-32 px-6 sm:px-8 border-b border-zinc-200/80 relative bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading & Plan Toggle */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 uppercase tracking-widest mb-3 font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>{"// 04 TRANSPARENT INVESTMENT"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 mb-4">
                Predictable ROI. <br />
                No Technical Debt.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base font-normal mb-8">
                Choose between zero upfront investment with lifetime full-service care, or complete source code ownership.
              </p>

              {/* Interactive Toggle Switch with Floating Glassmorphism */}
              <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-100/70 backdrop-blur-lg border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-white/60">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("subscription")}
                  className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    billingPlan === "subscription"
                      ? "bg-white/95 backdrop-blur-md text-zinc-950 shadow-xs border border-white/80"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Zero-Upfront Subscription ($150/mo)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPlan("lumpSum")}
                  className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    billingPlan === "lumpSum"
                      ? "bg-white/95 backdrop-blur-md text-zinc-950 shadow-xs border border-white/80"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Build & Own Package ($1,200)
                </button>
              </div>
            </div>

            {/* DUAL PRICING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

              {/* CARD 1: $150/MONTH SUBSCRIPTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 bg-white ${
                  billingPlan === "subscription"
                    ? "border-2 border-zinc-950 shadow-[0_12px_40px_rgba(0,0,0,0.08)] scale-[1.01]"
                    : "card-surface"
                }`}
              >
                {/* Popular Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-cyan-50 border border-cyan-300 text-cyan-800 font-bold">
                    {"MOST POPULAR // ZERO RISK"}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">12-Month Agreement</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-zinc-950 mb-2">Zero-Upfront Monthly</h3>
                  <p className="text-xs font-mono text-zinc-500 mb-6">
                    A completely custom Next.js site with zero upfront capital. We handle design, development, hosting, and unlimited edits.
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-zinc-200">
                    <span className="text-5xl sm:text-6xl font-black text-zinc-950 tracking-tight font-mono">$150</span>
                    <span className="text-zinc-500 font-mono text-sm">/ month</span>
                    <span className="ml-auto text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                      $0 DOWNPAYMENT
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 text-sm text-zinc-700 mb-10">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span><strong>$0 upfront build cost</strong> (normally $2,500+ at standard agencies)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Custom hand-coded Next.js architecture (100% bespoke)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Ultra-fast global Edge CDN hosting & SSL certificates included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span><strong>Unlimited edits</strong> (text changes, photos, special promotions)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>24/7 uptime monitoring & Core Web Vitals guarantees</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Direct phone & email support with your lead engineer</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#prototype"
                  onClick={() => handleSelectPlan("subscription")}
                  className="w-full py-4 rounded-full bg-[#00f0ff] hover:bg-[#00d8e6] text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 glow-cyan-btn transition-all active:scale-[0.97]"
                >
                  <span>Select $150/Mo Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* CARD 2: $1,200 BUILD + $50/MONTH */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 bg-white ${
                  billingPlan === "lumpSum"
                    ? "border-2 border-zinc-950 shadow-[0_12px_40px_rgba(0,0,0,0.08)] scale-[1.01]"
                    : "card-surface"
                }`}
              >
                {/* Ownership Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-zinc-100 border border-zinc-300 text-zinc-800 font-bold">
                    MAXIMUM LONG-TERM ROI
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Full Code Ownership</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-zinc-950 mb-2">Build & Own Package</h3>
                  <p className="text-xs font-mono text-zinc-500 mb-6">
                    Own 100% of your source code and design assets outright with minimal ongoing cloud overhead.
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-zinc-200">
                    <span className="text-5xl sm:text-6xl font-black text-zinc-950 tracking-tight font-mono">$1,200</span>
                    <span className="text-zinc-500 font-mono text-sm">build</span>
                    <span className="text-zinc-400 font-mono text-sm">+ $50/mo care</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 text-sm text-zinc-700 mb-10">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Complete source code ownership</strong> (full GitHub repository transfer)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Custom hand-crafted Next.js build designed exclusively for you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Guaranteed 98+ Google PageSpeed mobile benchmarks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Managed Cloudflare Edge deployment & SSL included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Includes 1 hour of dedicated content edits per month</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Freedom to self-host or transfer anywhere at zero penalty</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#prototype"
                  onClick={() => handleSelectPlan("lumpSum")}
                  className="w-full py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.97]"
                >
                  <span>Select Build & Own ($1,200)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

            </div>

            {/* Performance Guarantee Callout */}
            <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200/90 max-w-3xl mx-auto flex items-center gap-4 text-xs font-mono text-zinc-600 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p>
                <strong className="text-zinc-900 font-bold">The 1.0-Second Guarantee:</strong> If your new website scores below 95 on Google Mobile PageSpeed or takes longer than 1.0 second to load, we refund every cent of your initial month.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FOOTER / PROTOTYPE REQUEST INTAKE */}
        <footer id="prototype" className="pt-24 pb-16 px-6 sm:px-8 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pb-20 border-b border-zinc-200">
              
              {/* Left Column: Direct Agency Pitch */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 uppercase tracking-widest mb-4 font-semibold">
                    <Send className="w-3.5 h-3.5" />
                    <span>{"// 05 HIGH-SPEED ENGAGEMENT"}</span>
                  </div>

                  <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 leading-[0.98] mb-6">
                    Reserve Your Free Custom Prototype.
                  </h2>

                  <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-8">
                    Send me your current business URL or project details. I will hand-code a working Next.js demo showing your exact branding loaded in under 300 milliseconds.
                  </p>

                  {/* Guarantee Checkpoints */}
                  <div className="space-y-4 mb-10 text-xs font-mono text-zinc-700">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>No payment info required · 100% free demonstration</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Live Google PageSpeed audit included with analysis</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>Ready to review within 24 business hours</span>
                    </div>
                  </div>
                </div>

                {/* Direct Engineer Contact */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-mono">
                  <div className="text-zinc-400 uppercase tracking-wider mb-1">Direct Studio Line</div>
                  <div className="text-sm font-bold text-zinc-950 font-sans mb-1">
                    farukolawale509@gmail.com
                  </div>
                  <div className="text-zinc-500">Zero offshore subcontractors. Code you can inspect.</div>
                </div>
              </div>

              {/* Right Column: Minimalist Contact Form with Bottom-Border-Only Inputs */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-white border border-zinc-200/90 p-8 sm:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.06)]">
                  
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-200">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold">
                      {"REQUEST INTAKE // 05"}
                    </span>
                    <span className="font-mono text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300 font-bold">
                      24H PROTOTYPE SLA
                    </span>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-950 mb-2">Prototype Request Received.</h3>
                      <p className="text-zinc-600 text-sm max-w-sm font-mono mb-8">
                        I am analyzing <span className="text-cyan-700 font-semibold">{formData.website || "your current website"}</span>. Expect a live, private Next.js staging link in your inbox shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-zinc-950 underline cursor-pointer"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitForm} className="space-y-8">
                      {/* Anti-spam honeypot */}
                      <input
                        type="text"
                        name="website_verify_hp"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden absolute -left-[9999px]"
                      />

                      {/* Error feedback banner */}
                      {errorMessage && (
                        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono flex items-center gap-2.5">
                          <span>⚠️</span>
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Name Field */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                          Your Name or Business *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Marcus Vance (Apex Plumbing)"
                          className="w-full bg-transparent border-b border-zinc-300 focus:border-cyan-600 text-zinc-950 text-base py-3 outline-none transition-colors placeholder:text-zinc-400 font-sans"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                          Direct Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="marcus@apexplumbing.com"
                          className="w-full bg-transparent border-b border-zinc-300 focus:border-cyan-600 text-zinc-950 text-base py-3 outline-none transition-colors placeholder:text-zinc-400 font-sans"
                        />
                      </div>

                      {/* Website Field */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                          Current Website URL (or &apos;New Build&apos;)
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://apexplumbing.com"
                          className="w-full bg-transparent border-b border-zinc-300 focus:border-cyan-600 text-zinc-950 text-base py-3 outline-none transition-colors placeholder:text-zinc-400 font-sans"
                        />
                      </div>

                      {/* Selected Tier Preference */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                          Target Package
                        </label>
                        <select
                          value={formData.selectedTier}
                          onChange={(e) => setFormData({ ...formData, selectedTier: e.target.value })}
                          className="w-full bg-white border-b border-zinc-300 focus:border-cyan-600 text-zinc-800 text-sm py-3 outline-none transition-colors font-mono cursor-pointer"
                        >
                          <option value="Zero-Upfront Subscription ($150/mo)">
                            Zero-Upfront Subscription ($150/month)
                          </option>
                          <option value="Full Build & Care ($1,200 + $50/mo)">
                            Lump Sum Build & Own ($1,200 + $50/month)
                          </option>
                          <option value="Need Advice on Best Option">
                            Need advice on what fits best
                          </option>
                        </select>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full py-4 rounded-full bg-zinc-950 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#00f0ff] hover:text-zinc-950 hover:shadow-[0_4px_25px_rgba(0,240,255,0.45)] cursor-pointer active:scale-[0.97] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Compiling Prototype Ticket...
                          </span>
                        ) : (
                          <>
                            <span>Get My Free Prototype</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500 text-center pt-2">
                        <span>● No Credit Card Required</span>
                        <span>● Free Performance Audit</span>
                        <span>● 100% Confidential</span>
                      </div>
                    </form>
                  )}

                </div>
              </div>

            </div>

            {/* Bottom Colophon & Studio Status */}
            <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="font-bold text-zinc-950 tracking-tight font-sans">SPEEDCRAFT {"//"} STUDIO</span>
                <span>—</span>
                <span>© {new Date().getFullYear()} Hand-Coded Architecture.</span>
              </div>

              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-700 font-semibold">Available for 2 Local Clients Q4</span>
                </span>
                <a href="#" className="hover:text-zinc-950 transition-colors">
                  Back to Top ↑
                </a>
              </div>
            </div>

          </div>
        </footer>

      </main>

      {/* TEMPLATE DETAIL DEMO MODAL WITH STRATEGIC GLASSMORPHISM */}
      <AnimatePresence>
        {activeModalDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-md transition-all">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-white/80 ring-1 ring-zinc-900/10 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-zinc-200/70 flex items-center justify-between bg-white/60 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="h-4 w-px bg-zinc-300 mx-1" />
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 font-mono">
                    {activeModalDemo.title} — Technical Audit
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Viewport switch */}
                  <div className="hidden sm:flex items-center bg-zinc-100/80 backdrop-blur-md border border-zinc-200/60 p-0.5 rounded-lg text-xs font-mono">
                    <button
                      onClick={() => setModalDeviceView("desktop")}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                        modalDeviceView === "desktop"
                          ? "bg-white text-zinc-950 shadow-xs font-bold border border-white/80"
                          : "text-zinc-600 hover:text-zinc-950"
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Desktop</span>
                    </button>
                    <button
                      onClick={() => setModalDeviceView("mobile")}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                        modalDeviceView === "mobile"
                          ? "bg-white text-zinc-950 shadow-xs font-bold border border-white/80"
                          : "text-zinc-600 hover:text-zinc-950"
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveModalDemo(null)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-200/60 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Core Web Vitals Audit */}
                <div className="p-5 rounded-2xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-black text-xl">
                      100
                    </div>
                    <div>
                      <div className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400">
                        Google PageSpeed Verified
                      </div>
                      <div className="text-base font-bold text-white">
                        100/100 Core Web Vitals Score
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center w-full sm:w-auto font-mono">
                    <div className="bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800">
                      <div className="text-[10px] text-zinc-400">FCP</div>
                      <div className="text-sm font-bold text-emerald-400">{activeModalDemo.fcp}</div>
                    </div>
                    <div className="bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800">
                      <div className="text-[10px] text-zinc-400">LCP</div>
                      <div className="text-sm font-bold text-emerald-400">{activeModalDemo.lcp}</div>
                    </div>
                    <div className="bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800">
                      <div className="text-[10px] text-zinc-400">TBT</div>
                      <div className="text-sm font-bold text-emerald-400">{activeModalDemo.tbt}</div>
                    </div>
                    <div className="bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-800">
                      <div className="text-[10px] text-zinc-400">CLS</div>
                      <div className="text-sm font-bold text-emerald-400">{activeModalDemo.cls}</div>
                    </div>
                  </div>
                </div>

                {/* Simulated Device Frame Preview */}
                <div className="flex justify-center bg-zinc-100 p-6 sm:p-10 rounded-2xl border border-zinc-200">
                  <div
                    className={`transition-all duration-300 overflow-hidden bg-white shadow-xl border border-zinc-300 ${
                      modalDeviceView === "mobile"
                        ? "w-[320px] max-w-full rounded-3xl border-4 border-zinc-900 p-4"
                        : "w-full rounded-xl p-6"
                    }`}
                  >
                    <div className="border-b border-zinc-200 pb-3 flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span className="font-bold text-zinc-900">{activeModalDemo.sampleName}</span>
                      <span className="text-emerald-600 font-semibold">● 0.28s Load</span>
                    </div>
                    <div className="py-6">
                      <h4 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                        {activeModalDemo.tagline}
                      </h4>
                      <p className="text-zinc-600 text-xs sm:text-sm mt-2">
                        Optimized for immediate tap-to-call conversion, local search ranking, and instant mobile responsiveness.
                      </p>
                      <div className="mt-5 flex gap-3">
                        <div className="px-4 py-2 rounded-lg bg-[#00f0ff] text-zinc-950 font-bold text-xs">
                          Request Instant Quote
                        </div>
                        <div className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-xs font-mono">
                          View Services
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeModalDemo.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-zinc-500 text-center sm:text-left font-mono">
                  Want this exact high-speed architecture customized for your business?
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveModalDemo(null)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-600 hover:text-zinc-950 border border-zinc-300 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#prototype"
                    onClick={() => setActiveModalDemo(null)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-bold text-zinc-950 bg-[#00f0ff] hover:bg-[#00d2e0] shadow-sm transition-all"
                  >
                    <span>Request Free Prototype</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
