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
  Activity,
  Sparkles,
  Server,
  Lock,
  Globe,
  Layers,
  Send,
  ExternalLink,
  ChevronRight,
  Clock,
  Flame,
  Award
} from "lucide-react";

export default function DarkCreativeStudioAgency() {
  // Navigation & Scroll state
  const [scrolled, setScrolled] = useState(false);
  
  // Pricing toggle state: 'subscription' | 'lumpSum'
  const [billingPlan, setBillingPlan] = useState<"subscription" | "lumpSum">("subscription");
  
  // Interactive Speed Benchmark Simulator in Bento Box
  const [isSimulating, setIsSimulating] = useState(false);
  const [speedProgress, setSpeedProgress] = useState(100);
  const [wpProgress, setWpProgress] = useState(24);

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

  // Scroll listener for sticky glass header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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

      if (!res.ok || result.error) {
        throw new Error(result.error || "Failed to submit prototype request.");
      }

      setFormSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Network error. Please try again or email directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#00f0ff] selection:text-black overflow-x-hidden font-sans">
      {/* Background Noise Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-screen bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Atmospheric Engineering Grid & Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Engineering Grid */}
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 60%, transparent 100%)"
          }}
        />

        {/* Electric Cyan Ambient Orb */}
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-[#00f0ff]/[0.07] blur-[150px]" />
        
        {/* Neon Citrus Ambient Orb */}
        <div className="absolute top-[35%] right-[-15%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#ccff00]/[0.05] blur-[160px]" />
        
        {/* Deep Violet Horizon Orb */}
        <div className="absolute bottom-[10%] left-[20%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-[#6366f1]/[0.06] blur-[180px]" />
      </div>

      {/* FIXED TOP NAVIGATION BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Studio Moniker */}
          <a
            href="#"
            className="group flex items-center gap-3 text-sm tracking-widest font-mono uppercase text-white/90 hover:text-white transition-colors"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f0ff]"></span>
            </span>
            <span className="font-black text-base tracking-tight font-sans text-white">
              SPEEDCRAFT<span className="text-[#00f0ff]">.</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#ccff00] border border-[#ccff00]/30 rounded-full bg-[#ccff00]/10 tracking-normal">
              100/100 AUDIT
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-400">
            <a
              href="#why-custom"
              className="hover:text-[#00f0ff] transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-600">// 01</span> Why Custom
            </a>
            <a
              href="#work"
              className="hover:text-[#00f0ff] transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-600">// 02</span> Selected Work
            </a>
            <a
              href="#pricing"
              className="hover:text-[#00f0ff] transition-colors flex items-center gap-1.5"
            >
              <span className="text-zinc-600">// 03</span> Pricing
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#prototype"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wide uppercase transition-all duration-300 bg-white/5 border border-white/20 text-white hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]"
            >
              <span>Get Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10">

        {/* 1. HERO SECTION (LEFT-ALIGNED, IMMERSIVE) */}
        <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 px-6 sm:px-8 border-b border-white/[0.06] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Top Telemetry Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-zinc-300 text-xs font-mono tracking-wide mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span>HAND-CRAFTED REACT & NEXT.JS ENGINE</span>
              <span className="text-zinc-600">/</span>
              <span className="text-[#00f0ff] font-semibold">0.3S FIRST PAINT</span>
            </motion.div>

            {/* Left-Aligned Massive Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-[-0.045em] leading-[0.92] text-[#f5f5f5] mb-8">
                Stop Losing <br />
                Customers to a <br />
                <span
                  className="inline-block relative text-transparent cursor-default transition-all duration-500 hover:text-[#00f0ff] hover:drop-shadow-[0_0_35px_rgba(0,240,255,0.7)]"
                  style={{
                    WebkitTextStroke: "1.5px rgba(245, 245, 245, 0.45)",
                  }}
                  title="Hand-coded sub-second sites convert 3x more traffic"
                >
                  Slow Website.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal leading-relaxed max-w-2xl mb-12">
                I hand-code ultra-fast, custom web experiences for local businesses.
                <span className="text-zinc-200"> No bloated WordPress</span>, just pure performance that converts clicks into paying phone calls.
              </p>

              {/* Action Buttons & Speed Metrics */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
                {/* Pill-shaped glowing button */}
                <a
                  href="#prototype"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#00f0ff] text-black font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#ccff00] hover:scale-[1.02] shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)]"
                >
                  <span>Request a Prototype</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                {/* Secondary Proof Strip */}
                <a
                  href="#why-custom"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.03] border border-white/[0.1] text-zinc-300 hover:text-white hover:border-white/30 text-xs font-mono uppercase tracking-wider transition-all duration-300"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </motion.div>

            {/* Live Performance Audit Strip (Below Hero) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 font-mono"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest">// LIGHTHOUSE SCORE</span>
                <div className="flex items-center gap-2 text-2xl font-sans font-bold text-[#ccff00]">
                  <span>100/100</span>
                  <Award className="w-4 h-4 text-[#ccff00]" />
                </div>
                <span className="text-xs text-zinc-400">Mobile & Desktop verified</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest">// FIRST CONTENTFUL PAINT</span>
                <div className="flex items-center gap-2 text-2xl font-sans font-bold text-white">
                  <span>0.28s</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    TOP 1%
                  </span>
                </div>
                <span className="text-xs text-zinc-400">Instant global edge delivery</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest">// VULNERABILITY SURFACE</span>
                <div className="flex items-center gap-2 text-2xl font-sans font-bold text-white">
                  <span>0.00%</span>
                  <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
                </div>
                <span className="text-xs text-zinc-400">Static HTML · No SQL database</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest">// CLIENT CONVERSION LIFT</span>
                <div className="flex items-center gap-2 text-2xl font-sans font-bold text-[#00f0ff]">
                  <span>+185%</span>
                  <Flame className="w-4 h-4 text-[#00f0ff]" />
                </div>
                <span className="text-xs text-zinc-400">Average local customer uptick</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. THE "WHY CUSTOM" SECTION (ASYMMETRICAL 2X2 BENTO BOX LAYOUT) */}
        <section id="why-custom" className="py-28 md:py-36 px-6 sm:px-8 border-b border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>// 01 ARCHITECTURE DEEP DIVE</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
                  Why Custom Code <br className="hidden sm:inline" />
                  Obliterates WordPress.
                </h2>
              </div>
              <p className="text-sm md:text-base text-zinc-400 max-w-md font-normal leading-relaxed">
                Standard WordPress templates come bloated with 40+ plugins, slow MySQL queries, and perpetual security holes. We engineer pure static performance.
              </p>
            </div>

            {/* Asymmetrical 2x2 Bento Box Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* TILE 1 (LARGE ANCHOR TILE - Spans 7 columns on desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 rounded-3xl bg-[#0c0c0f]/90 border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#00f0ff]/40 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Subtle top edge glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      BENCHMARK: 0.28S
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                    Sub-second Load Times
                  </h3>
                  
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                    Every 100ms of latency costs local businesses 7% in customer drop-off. By hand-compiling static pages straight to 300+ Edge Cloudflare data centers, your website paints before the user even blinks.
                  </p>
                </div>

                {/* Interactive Live Speed Benchmark Visual */}
                <div className="mt-4 p-5 rounded-2xl bg-black/60 border border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[#00f0ff]" />
                      Real-World Mobile Speed Simulation
                    </span>
                    <button
                      onClick={handleRunSpeedBenchmark}
                      disabled={isSimulating}
                      className="px-2.5 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer disabled:opacity-50 text-[11px]"
                    >
                      {isSimulating ? "Simulating..." : "Run Live Race"}
                    </button>
                  </div>

                  {/* Our Custom Next.js Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Our Hand-Coded Next.js Engine
                      </span>
                      <span className="text-emerald-400 font-bold">0.28s (Instant)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-zinc-800/80 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-[#ccff00] transition-all duration-300 rounded-full"
                        style={{ width: `${speedProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Standard Bloated WordPress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-rose-400/90">Standard WordPress + Elementor / Divi</span>
                      <span className="text-zinc-500">4.82s (Laggy)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-zinc-800/80 overflow-hidden relative">
                      <div
                        className="h-full bg-rose-500/70 transition-all duration-700 rounded-full"
                        style={{ width: `${wpProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                    <span>DOM Complete: 142ms</span>
                    <span>Total JS Payload: &lt; 45KB</span>
                    <span>Core Web Vitals: Pass (100%)</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT STACK: TILE 2 & TILE 3 (Spans 5 columns on desktop) */}
              <div className="lg:col-span-5 flex flex-col gap-6">

                {/* TILE 2: Unbreakable Security */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="rounded-3xl bg-[#0c0c0f]/90 border border-white/[0.08] p-8 flex-1 flex flex-col justify-between group hover:border-[#ccff00]/40 transition-all duration-500 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ccff00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/25 text-[#ccff00]">
                        ZERO EXPLOIT VECTORS
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2.5">
                      Unbreakable Security
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                      Zero MySQL databases exposed to the public internet. Zero vulnerable PHP plugins. Because your site compiles into pure static edge assets, there is literally no backend database to inject or hack.
                    </p>
                  </div>

                  {/* Terminal Code Snippet Visual */}
                  <div className="p-3.5 rounded-xl bg-black/70 border border-white/[0.06] font-mono text-[11px] text-zinc-400 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-zinc-600 pb-1 border-b border-white/5">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Terminal className="w-3 h-3 text-[#ccff00]" /> edge_firewall.sh
                      </span>
                      <span className="text-[10px] text-emerald-400">ACTIVE</span>
                    </div>
                    <p className="text-zinc-300 mt-1">$ audit --target=static_cluster</p>
                    <p className="text-emerald-400">&gt; Attack surface: 0 exposed ports</p>
                    <p className="text-zinc-500">&gt; Automated Edge SSL / TLS 1.3 Strict</p>
                  </div>
                </motion.div>

                {/* TILE 3: 100% Done-For-You Maintenance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="rounded-3xl bg-[#0c0c0f]/90 border border-white/[0.08] p-8 flex-1 flex flex-col justify-between group hover:border-[#00f0ff]/40 transition-all duration-500 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                        DIRECT DEV ACCESS
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2.5">
                      100% Done-For-You Maintenance
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                      Need a price updated, a seasonal promotion added, or a new team member featured? Just send a text or email. We handle updates directly within hours—no messy dashboard logins or breaking updates.
                    </p>
                  </div>

                  {/* Concierge Micro-Preview */}
                  <div className="p-3.5 rounded-xl bg-black/70 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                        <span className="animate-ping absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-60" />
                      </div>
                      <span className="text-zinc-300">Dedicated Engineer On-Call</span>
                    </div>
                    <span className="text-[#00f0ff] font-bold">&lt; 2h SLA</span>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK (CINEMATIC SHOWCASE) */}
        <section id="work" className="py-28 md:py-36 px-6 sm:px-8 border-b border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>// 02 HIGH-CONVERSION SHOWCASE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
                See the Speed.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-normal">
                Edge-to-edge dark architectures hand-crafted for local trades and high-ticket clinical practices.
              </p>
            </div>

            {/* Showcase Grid (Large, Edge-to-Edge Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">

              {/* CARD 1: HOME SERVICE TEMPLATE */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group rounded-3xl bg-[#0a0a0c] border border-white/[0.09] overflow-hidden flex flex-col justify-between hover:border-[#00f0ff]/50 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                {/* Visual Header / Mockup Preview */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-zinc-900 via-[#0e0e12] to-black p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b border-white/[0.06]">
                  {/* Subtle Grid in Mockup */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)`,
                      backgroundSize: "32px 32px"
                    }}
                  />

                  {/* Floating Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-black/80 border border-white/20 text-white backdrop-blur-md">
                      HOME SERVICE // HVAC & ROOFING
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 backdrop-blur-md font-semibold">
                      <Zap className="w-3 h-3" /> 0.31s First Paint
                    </span>
                  </div>

                  {/* Visual Interface Preview Element */}
                  <div className="relative z-10 my-auto py-6">
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#141419]/90 border border-white/10 shadow-2xl backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
                        <span>VANGUARD ROOFING & SOLAR</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          ● Instant Dispatch
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-bold text-white leading-tight">
                          24/7 Storm Damage Emergency Response
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-zinc-400">Quotes returned in 4 mins · Zero spam</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="h-8 px-4 rounded-lg bg-[#00f0ff] text-black text-xs font-bold flex items-center gap-1.5">
                            Book Inspection <ArrowRight className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-mono text-zinc-400">Google Rating 4.9 ★ (140+)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Mockup Metric Footnote */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>STACK: NEXT.JS 15 + TAILWIND</span>
                    <span className="text-zinc-400">+184% Lead Inquiries</span>
                  </div>
                </div>

                {/* Minimal Card Details */}
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#00f0ff] transition-colors">
                      Apex Home Services Template
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      Engineered for high emergency click-to-call conversion and local SEO domination.
                    </p>
                  </div>
                  <a
                    href="#prototype"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-[#00f0ff] transition-all duration-300"
                    title="Request this template"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              {/* CARD 2: PROFESSIONAL CLINIC TEMPLATE */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="group rounded-3xl bg-[#0a0a0c] border border-white/[0.09] overflow-hidden flex flex-col justify-between hover:border-[#ccff00]/50 transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                {/* Visual Header / Mockup Preview */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-zinc-900 via-[#101014] to-black p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b border-white/[0.06]">
                  {/* Subtle Grid in Mockup */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(204, 255, 0, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(204, 255, 0, 0.15) 1px, transparent 1px)`,
                      backgroundSize: "32px 32px"
                    }}
                  />

                  {/* Floating Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-black/80 border border-white/20 text-white backdrop-blur-md">
                      HEALTHCARE // MEDICAL CLINIC
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/30 backdrop-blur-md font-semibold">
                      <Zap className="w-3 h-3" /> 0.27s First Paint
                    </span>
                  </div>

                  {/* Visual Interface Preview Element */}
                  <div className="relative z-10 my-auto py-6">
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#141419]/90 border border-white/10 shadow-2xl backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-500">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
                        <span>AURA FACIAL & SURGICAL DERM</span>
                        <span className="text-[#ccff00] flex items-center gap-1">
                          ● Live Calendar Sync
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="text-lg font-bold text-white leading-tight">
                          Private Aesthetic & Reconstructive Consultation
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-zinc-400">Zero wait list · Direct surgeon intake</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="h-8 px-4 rounded-lg bg-[#ccff00] text-black text-xs font-bold flex items-center gap-1.5">
                            Reserve Consultation <ArrowRight className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-mono text-zinc-400">Board Certified MD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Mockup Metric Footnote */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>STACK: EDGE STATIC + HIPPA COMPLIANT</span>
                    <span className="text-zinc-400">+62% High-Ticket Patients</span>
                  </div>
                </div>

                {/* Minimal Card Details */}
                <div className="p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#ccff00] transition-colors">
                      Professional Clinic Template
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      High-end Swiss medical aesthetics with frictionless, privacy-focused intake.
                    </p>
                  </div>
                  <a
                    href="#prototype"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] transition-all duration-300"
                    title="Request this template"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. PRICING (MINIMALIST TOGGLE & ASYMMETRICAL GLASS CARDS) */}
        <section id="pricing" className="py-28 md:py-36 px-6 sm:px-8 border-b border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Header & Minimalist Toggle */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>// 03 TRANSPARENT CONTRACTS</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
                Predictable Pricing.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mb-8">
                No opaque agency retainers or surprise hosting fees. Choose the model that fits your cash flow or balance sheet.
              </p>

              {/* Minimalist Switch Toggle */}
              <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => handleSelectPlan("subscription")}
                  className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    billingPlan === "subscription"
                      ? "bg-[#00f0ff] text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Monthly ($0 Upfront)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPlan("lumpSum")}
                  className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    billingPlan === "lumpSum"
                      ? "bg-[#ccff00] text-black font-bold shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Lump Sum (Build & Own)
                </button>
              </div>
            </div>

            {/* Asymmetrical Bento Style Glassmorphism Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* CARD 1: $150/MONTH (Zero upfront, fully managed) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl ${
                  billingPlan === "subscription"
                    ? "bg-[#0c0c11]/95 border-2 border-[#00f0ff] shadow-[0_0_50px_rgba(0,240,255,0.2)] scale-[1.01]"
                    : "bg-[#08080a]/80 border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Popular Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-semibold">
                    MOST POPULAR FOR CASH FLOW
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Zero Financial Risk</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Zero-Upfront Monthly</h3>
                  <p className="text-xs font-mono text-zinc-400 mb-6">
                    Full custom design, lightning hosting, and unlimited ongoing maintenance in one single monthly check.
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/[0.08]">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$150</span>
                    <span className="text-zinc-400 font-mono text-sm">/ month</span>
                    <span className="ml-auto text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      $0 DOWNPAYMENT
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 text-sm text-zinc-300 mb-10">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span><strong>$0 upfront build cost</strong> (normally $2,500+ at standard agencies)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span>Custom hand-coded Next.js architecture (100% bespoke)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span>Ultra-fast global Edge CDN hosting & SSL certificates included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span><strong>Unlimited edits</strong> (text changes, photos, special promotions)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span>24/7 uptime monitoring & Core Web Vitals guarantees</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                      <span>Direct phone & email support with your lead engineer</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#prototype"
                  onClick={() => handleSelectPlan("subscription")}
                  className="w-full py-4 rounded-full bg-[#00f0ff] text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300"
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
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl ${
                  billingPlan === "lumpSum"
                    ? "bg-[#0c0c11]/95 border-2 border-[#ccff00] shadow-[0_0_50px_rgba(204,255,0,0.2)] scale-[1.01]"
                    : "bg-[#08080a]/80 border border-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Ownership Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] font-semibold">
                    MAXIMUM LONG-TERM ROI
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Full Code Ownership</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Build & Own Package</h3>
                  <p className="text-xs font-mono text-zinc-400 mb-6">
                    Own 100% of your source code and design assets outright with minimal ongoing cloud overhead.
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/[0.08]">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$1,200</span>
                    <span className="text-zinc-400 font-mono text-sm">build</span>
                    <span className="text-zinc-500 font-mono text-sm">+ $50/mo care</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 text-sm text-zinc-300 mb-10">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span><strong>Complete source code ownership</strong> (full GitHub repository transfer)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>Custom hand-crafted Next.js build designed exclusively for you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>Guaranteed 98+ Google PageSpeed mobile benchmarks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>Managed Cloudflare Edge deployment & SSL included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>Includes 1 hour of dedicated content edits per month</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>Freedom to self-host or transfer anywhere at zero penalty</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#prototype"
                  onClick={() => handleSelectPlan("lumpSum")}
                  className="w-full py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300"
                >
                  <span>Select Build & Own ($1,200)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

            </div>

            {/* Performance Guarantee Callout */}
            <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] max-w-3xl mx-auto flex items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="w-9 h-9 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p>
                <strong>The 1.0-Second Guarantee:</strong> If your new website scores below 95 on Google Mobile PageSpeed or takes longer than 1.0 second to load, we refund every cent of your initial month.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FOOTER / PROTOTYPE REQUEST */}
        <footer id="prototype" className="pt-28 pb-16 px-6 sm:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 pb-24 border-b border-white/[0.08]">
              
              {/* Left Column: Stark, Massive Typography */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                    <span>// FREE RISK-FREE DISCOVERY</span>
                  </div>

                  {/* Stark Massive Text Block */}
                  <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-[-0.04em] leading-[0.92] text-white mb-8">
                    Let's build <br />
                    something <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-teal-300 to-[#ccff00]">
                      fast.
                    </span>
                  </h2>

                  <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-md">
                    Send me your current website URL. Within 24 hours, I will hand-code a live, interactive sub-second preview of what your business looks like at maximum speed.
                  </p>
                </div>

                {/* Direct Operator Badge */}
                <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-black border border-white/20 flex items-center justify-center font-mono font-bold text-white text-sm">
                    DEV
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Direct Hand-Coded Architecture</div>
                    <div className="text-xs font-mono text-zinc-500">Zero offshore subcontractors. Code you can inspect.</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Minimalist Contact Form with Bottom-Border-Only Inputs */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-[#09090c] border border-white/[0.09] p-8 sm:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                  
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                      REQUEST INTAKE // 04
                    </span>
                    <span className="font-mono text-xs text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-0.5 rounded border border-[#ccff00]/25">
                      24H PROTOTYPE SLA
                    </span>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Prototype Request Received.</h3>
                      <p className="text-zinc-400 text-sm max-w-sm font-mono mb-8">
                        I am analyzing <span className="text-[#00f0ff]">{formData.website || "your current website"}</span>. Expect a live, private Next.js staging link in your inbox shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white underline cursor-pointer"
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
                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2.5">
                          <span>⚠️</span>
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Name Field */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Your Name or Business *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Marcus Vance (Apex Plumbing)"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#00f0ff] text-white text-base py-3 outline-none transition-colors placeholder:text-zinc-600 font-sans"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Direct Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="marcus@apexplumbing.com"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#00f0ff] text-white text-base py-3 outline-none transition-colors placeholder:text-zinc-600 font-sans"
                        />
                      </div>

                      {/* Website Field */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Current Website URL (or 'New Build')
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://apexplumbing.com"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#00f0ff] text-white text-base py-3 outline-none transition-colors placeholder:text-zinc-600 font-sans"
                        />
                      </div>

                      {/* Selected Tier Preference */}
                      <div className="relative">
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Target Package
                        </label>
                        <select
                          value={formData.selectedTier}
                          onChange={(e) => setFormData({ ...formData, selectedTier: e.target.value })}
                          className="w-full bg-[#050505] border-b border-white/20 focus:border-[#00f0ff] text-zinc-300 text-sm py-3 outline-none transition-colors font-mono cursor-pointer"
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
                        className="group w-full py-4 rounded-full bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#00f0ff] hover:shadow-[0_0_35px_rgba(204,255,0,0.6)] cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
                <span className="font-bold text-white tracking-tight font-sans">SPEEDCRAFT // STUDIO</span>
                <span>—</span>
                <span>© {new Date().getFullYear()} Hand-Coded Architecture.</span>
              </div>

              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Available for 2 Local Clients Q4</span>
                </span>
                <a href="#why-custom" className="hover:text-zinc-300 transition-colors">
                  Back to Top ↑
                </a>
              </div>
            </div>

          </div>
        </footer>

      </main>
    </div>
  );
}
