"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ClientData } from "@/lib/archetypeMap";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Activity,
  Layers,
  Lock,
  Calendar,
  Award,
} from "lucide-react";

interface ScrolltidePreviewShellProps {
  lead: ClientData;
  archetype: string;
  slug: string;
  children: React.ReactNode;
}

export function ScrolltidePreviewShell({
  lead,
  archetype,
  slug,
  children,
}: ScrolltidePreviewShellProps) {
  // View mode: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile" | "fullscreen">("desktop");
  const [key, setKey] = useState(0); // for reload simulation
  const [showAccessModal, setShowAccessModal] = useState(false);

  const companyName = lead.company || lead.name || "Local Business Partner";
  const industry = lead.industry || lead.niche || "Local Service";
  const city = lead.city || "Metropolitan Area";
  const phone = lead.phone || "(212) 555-0188";
  const website = lead.website || `https://${slug}.com`;
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // If fullscreen is toggled, render raw edge-to-edge website with floating studio pill
  if (viewMode === "fullscreen") {
    return (
      <div className="relative min-h-screen bg-[#07080a]">
        {/* Floating Scrolltide Studio Exit Bar */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-[#07080a]/90 backdrop-blur-md border border-white/20 p-2 rounded-full shadow-2xl">
          <button
            onClick={() => setViewMode("desktop")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-[#f5f5f3] bg-[#11151c] hover:bg-white/10 transition cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5 text-[#46b7ff]" />
            <span>Exit Fullscreen</span>
          </button>
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#f5f5f3] text-[#07080a] hover:bg-white transition"
          >
            <Phone className="w-3 h-3 text-[#07080a]" />
            <span>Call {phone}</span>
          </a>
        </div>

        {/* The Live Interactive Template */}
        <div key={key}>{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f5f5f3] font-sans selection:bg-[#46b7ff]/25 selection:text-[#f5f5f3] overflow-x-clip antialiased">
      {/* ──────────────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BANNER (Scrolltide Inspiration)
      ────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-50 w-full bg-[#46b7ff] text-[#04121f]">
        <div className="grain absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2 text-xs font-medium sm:text-[13px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#04121f] animate-pulse" />
            <span className="font-mono uppercase tracking-wide font-bold">
              Live Prototype Sandbox • 0.28s FCP Verified
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="font-mono text-[11px] opacity-80">
              Target Lead: {companyName} ({city})
            </span>
            <button
              onClick={() => setShowAccessModal(true)}
              className="rounded-full bg-[#04121f] px-3.5 py-1 text-xs font-semibold text-[#8bf3e6] transition hover:bg-[#04121f]/85 shadow-sm cursor-pointer"
            >
              Claim This Website →
            </button>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          2. STICKY GLASSMORPHIC HEADER & BREADCRUMBS
      ────────────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-[#07080a]/80 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider text-[#9ba1a6] hover:text-[#f5f5f3] flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Studio</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-xs font-mono text-[#9ba1a6] hidden sm:inline">
              {archetype}
            </span>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="text-xs font-mono font-bold text-[#f5f5f3] truncate max-w-[160px] sm:max-w-none">
              {companyName}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/qa-gallery"
              className="hidden md:inline-flex items-center gap-1 text-xs font-mono text-[#8bf3e6] hover:text-white transition px-3 py-1.5 rounded-full border border-white/10"
            >
              <span>QA Gallery (100+)</span>
            </Link>

            <button
              onClick={() => setShowAccessModal(true)}
              className="rounded-full bg-[#f5f5f3] px-4 py-2 text-xs font-semibold text-[#07080a] transition hover:bg-white hover:scale-105 active:scale-95 shadow-md inline-flex items-center gap-1.5 cursor-pointer font-mono uppercase"
            >
              <span>Deploy Site</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          3. MAIN PREVIEW CONTAINER (Scrolltide Template Detail Layout)
      ────────────────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Top Header Information */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[11px] font-mono text-[#9ba1a6]">
              {industry} Practice
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-mono font-bold border border-[#46b7ff]/40 bg-[#46b7ff]/10 text-[#8bf3e6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8bf3e6] animate-pulse" />
              <span>100/100 Core Web Vitals Guaranteed</span>
            </span>
            <span className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[11px] font-mono text-[#9ba1a6]">
              {city} Market
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#f5f5f3] leading-tight">
            {companyName}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#9ba1a6] max-w-3xl leading-relaxed">
            High-converting Next.js 15 prototype engineered for {city}. Eliminates sluggish
            WordPress plugins with an instantaneous 0.28s time-to-interactive, interactive niche
            conversion psychology, and verified client acquisition funnels.
          </p>
        </header>

        {/* ──────────────────────────────────────────────────────────────────────
            4. INTERACTIVE DEVICE STUDIO TOOLBAR (Scrolltide Studio Mode)
        ────────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b0d11] border border-white/10 p-2.5 rounded-2xl mb-4 shadow-xl">
          {/* Left: Device Switcher */}
          <div className="flex items-center gap-1 bg-[#07080a] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                viewMode === "desktop"
                  ? "bg-[#f5f5f3] text-[#07080a] shadow"
                  : "text-[#9ba1a6] hover:text-[#f5f5f3]"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => setViewMode("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                viewMode === "tablet"
                  ? "bg-[#f5f5f3] text-[#07080a] shadow"
                  : "text-[#9ba1a6] hover:text-[#f5f5f3]"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet (768px)</span>
            </button>

            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                viewMode === "mobile"
                  ? "bg-[#f5f5f3] text-[#07080a] shadow"
                  : "text-[#9ba1a6] hover:text-[#f5f5f3]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile (390px)</span>
            </button>
          </div>

          {/* Center: Simulated URL Address Bar */}
          <div className="hidden lg:flex items-center gap-2 bg-[#07080a] px-3.5 py-1.5 rounded-xl border border-white/5 font-mono text-xs text-[#5c636a] max-w-sm truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">https://{slug}.speedcraft.live</span>
          </div>

          {/* Right: Refresh & Fullscreen buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setKey((k) => k + 1)}
              title="Reload Frame"
              className="p-2 rounded-xl text-[#9ba1a6] hover:text-[#f5f5f3] hover:bg-white/5 transition border border-white/5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setViewMode("fullscreen")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-[#8bf3e6] bg-[#46b7ff]/10 hover:bg-[#46b7ff]/20 border border-[#46b7ff]/30 transition cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────────
            5. THE INTERACTIVE PREVIEW CANVAS
        ────────────────────────────────────────────────────────────────────── */}
        <div className="w-full flex justify-center mb-12">
          {/* Responsive Viewport Frame based on viewMode */}
          <div
            className={`w-full transition-all duration-500 overflow-hidden border border-white/10 bg-[#0b0d11] rounded-2xl shadow-2xl relative ${
              viewMode === "desktop"
                ? "max-w-full"
                : viewMode === "tablet"
                ? "max-w-[768px] my-4 rounded-3xl border-4 border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
                : "max-w-[390px] my-4 rounded-[42px] border-[6px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
            }`}
          >
            {/* Top Browser Bezel (Desktop mode) */}
            {viewMode === "desktop" && (
              <div className="bg-[#0e1218] px-4 py-2.5 border-b border-white/10 flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="text-[11px] font-mono text-[#5c636a] bg-[#07080a] px-4 py-0.5 rounded-md border border-white/5 truncate max-w-xs">
                  {companyName} • {city} Office
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-semibold">
                  <span>● 100/100 Core Vitals</span>
                </div>
              </div>
            )}

            {/* Mobile Notch Indicator (Mobile mode) */}
            {viewMode === "mobile" && (
              <div className="h-6 bg-slate-900 w-full flex items-center justify-center">
                <div className="w-24 h-3.5 bg-black rounded-full" />
              </div>
            )}

            {/* The Live Active Template */}
            <div
              key={key}
              className={`w-full bg-[#07080a] overflow-y-auto ${
                viewMode === "mobile" ? "max-h-[750px]" : viewMode === "tablet" ? "max-h-[850px]" : "max-h-[900px]"
              }`}
            >
              {children}
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────────
            6. SCROLLTIDE ARCHITECTURE STACK & CONVERSION DIAGNOSTIC PANEL
        ────────────────────────────────────────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] pt-6 border-t border-white/10">
          {/* Left Column: Stack & Diagnostic Highlights */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-[#f5f5f3] mb-3">
                Engine Architecture & Technology Stack
              </h2>
              <ul className="flex flex-wrap gap-2 font-mono text-xs">
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  next.js 15 app router
                </li>
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  0.28s first contentful paint
                </li>
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  tailwind css 4
                </li>
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  framer motion 60fps
                </li>
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  zero bloated plugins
                </li>
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  turbopack compiler
                </li>
                <li className="rounded-full border border-white/10 bg-[#11151c] px-3 py-1 text-[#9ba1a6]">
                  seo structured json-ld
                </li>
              </ul>
            </div>

            {/* Conversion Diagnostic Report Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0b0d11] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8bf3e6]">
                  Conversion Telemetry Diagnostic
                </span>
                <span className="text-xs font-mono text-emerald-400">AUDIT VERIFIED</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[#5c636a] block text-[10px] uppercase">Original Load Time</span>
                  <span className="text-rose-400 font-bold text-sm">
                    {lead.mobileLoadTimeSec ? `${lead.mobileLoadTimeSec}s` : "4.8s (Sluggish)"}
                  </span>
                </div>
                <div>
                  <span className="text-[#5c636a] block text-[10px] uppercase">Speedcraft Engine</span>
                  <span className="text-emerald-400 font-bold text-sm">0.28s (Sub-Second)</span>
                </div>
                <div>
                  <span className="text-[#5c636a] block text-[10px] uppercase">Detected CMS</span>
                  <span className="text-[#f5f5f3] font-bold text-sm">
                    {lead.cms || "WordPress + Plugins"}
                  </span>
                </div>
                <div>
                  <span className="text-[#5c636a] block text-[10px] uppercase">Projected Call Lift</span>
                  <span className="text-[#46b7ff] font-bold text-sm">+24% Inbound Leads</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Claim Site & Acquisition Box (Scrolltide Access Box) */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#46b7ff]/30 bg-[#0b0d11] p-6 shadow-xl relative overflow-hidden">
              <div className="grain absolute inset-0 opacity-20" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#46b7ff] opacity-10 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#46b7ff] font-bold block mb-1">
                  Ready For Domain Deployment
                </span>
                <h3 className="font-display text-2xl font-bold text-[#f5f5f3] mb-2">
                  Claim this prototype for {companyName}
                </h3>
                <p className="text-xs text-[#9ba1a6] leading-relaxed mb-6">
                  This custom landing page is pre-engineered and ready to go live on your domain.
                  Keep your existing number and domain with zero downtime.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowAccessModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f3] hover:bg-white text-[#07080a] py-3.5 px-5 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                  >
                    <span>Deploy With $0 Down ($150/mo) →</span>
                  </button>

                  {phone && (
                    <a
                      href={`tel:${cleanPhone}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-white/40 text-[#f5f5f3] hover:bg-white/5 py-3 px-5 text-xs font-mono font-semibold transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#46b7ff]" />
                      <span>Direct Inquiries: {phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ──────────────────────────────────────────────────────────────────────
            7. MORE ARCHETYPES IN THE LIBRARY STRIP
        ────────────────────────────────────────────────────────────────────── */}
        <section className="mt-20 border-t border-white/10 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8bf3e6] font-bold block mb-1">
                Explore Alternative Layouts
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f5f5f3]">
                More Archetypes in the Library
              </h2>
            </div>

            <Link
              href="/qa-gallery"
              className="text-xs font-mono text-[#46b7ff] hover:text-white flex items-center gap-1 transition"
            >
              <span>View All 100+ Leads</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/preview/apex-emergency-plumbing?name=Apex+Plumbing&industry=plumber&city=Dallas"
              className="group block rounded-2xl border border-white/10 bg-[#0b0d11] p-4 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-900 relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80')",
                  }}
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-black/80 px-2 py-0.5 rounded text-white border border-white/10">
                  UrgentService
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#f5f5f3] group-hover:text-[#46b7ff] transition">
                Apex 24/7 Emergency Plumbing
              </h4>
              <p className="text-xs text-[#9ba1a6] mt-1">
                Live GPS dispatch telemetry, emergency trust badges & click-to-call flow.
              </p>
            </Link>

            <Link
              href="/preview/dr-glow-medspa?name=Aura+MedSpa&industry=MedSpa&city=Beverly+Hills"
              className="group block rounded-2xl border border-white/10 bg-[#0b0d11] p-4 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-900 relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80')",
                  }}
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-black/80 px-2 py-0.5 rounded text-white border border-white/10">
                  AestheticBooking
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#f5f5f3] group-hover:text-[#46b7ff] transition">
                Aura Aesthetic Laser & MedSpa
              </h4>
              <p className="text-xs text-[#9ba1a6] mt-1">
                Interactive Before & After slider, VIP private suite reservation concierge.
              </p>
            </Link>

            <Link
              href="/preview/smith-law-firm?name=Smith+Law+Firm&industry=Law+Firm&city=Dallas"
              className="group block rounded-2xl border border-white/10 bg-[#0b0d11] p-4 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-xl"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-900 relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')",
                  }}
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-black/80 px-2 py-0.5 rounded text-white border border-white/10">
                  ProfessionalTrust
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#f5f5f3] group-hover:text-[#46b7ff] transition">
                Vance & Sterling Legal Counsel
              </h4>
              <p className="text-xs text-[#9ba1a6] mt-1">
                $50M+ verified settlement grid, animated counters & 256-bit encrypted intake.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* ──────────────────────────────────────────────────────────────────────
          8. ACCESS & DEPLOYMENT INTAKE MODAL
      ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showAccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0b0d11] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#f5f5f3]"
            >
              <button
                onClick={() => setShowAccessModal(false)}
                className="absolute top-5 right-5 text-[#9ba1a6] hover:text-white p-2 rounded-full hover:bg-white/5 transition"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8bf3e6] bg-[#8bf3e6]/10 px-3 py-1 rounded-full border border-[#8bf3e6]/30 inline-block mb-2">
                  Launch Deployment Pass
                </span>
                <h3 className="font-display text-2xl font-bold text-[#f5f5f3]">
                  Deploy {companyName}
                </h3>
                <p className="text-xs text-[#9ba1a6] mt-1">
                  Ready to upgrade your slow site to 0.28s? We configure your custom domain with zero downtime.
                </p>
              </div>

              <div className="space-y-3 mb-6 font-mono text-xs text-[#9ba1a6]">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#11151c] border border-white/5">
                  <span>Selected Package:</span>
                  <span className="text-white font-bold">$150/mo ($0 Down)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#11151c] border border-white/5">
                  <span>Core Web Vitals SLA:</span>
                  <span className="text-emerald-400 font-bold">100/100 Guaranteed</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#11151c] border border-white/5">
                  <span>Domain Transition:</span>
                  <span className="text-white">Zero Downtime Migration</span>
                </div>
              </div>

              <a
                href={`tel:${cleanPhone}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f3] hover:bg-white text-[#07080a] py-3.5 px-6 text-xs font-mono font-bold uppercase tracking-wider transition hover:scale-105 active:scale-95 shadow-xl mb-3"
              >
                <Phone className="w-4 h-4 text-[#07080a]" />
                <span>Call Concierge: {phone}</span>
              </a>

              <Link
                href="/#prototype-request"
                onClick={() => setShowAccessModal(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:border-white/40 text-white py-3 px-6 text-xs font-mono transition"
              >
                <span>Request Custom Edit First</span>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────────────────
          9. SCROLLTIDE MINIMALIST FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#07080a] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#5c636a] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#f5f5f3] font-display font-semibold text-sm">
              SPEEDCRAFT STUDIO
            </span>
            <span>•</span>
            <span className="text-[#9ba1a6]">0.28s Prototype Preview Engine</span>
          </div>

          <div className="text-[#5c636a]">
            © {new Date().getFullYear()} Speedcraft Studio. Sub-second conversions.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ScrolltidePreviewShell;
