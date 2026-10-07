"use client";

import React from "react";
import type { TemplateProps } from "@/lib/archetypeMap";
import { motion } from "framer-motion";
import { InfiniteReviewMarquee, MasonryProofGallery } from "@/components/universal";
import { LiveDispatchSimulation } from "./urgent/LiveDispatchSimulation";
import {
  Phone,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Wrench,
  Zap,
  AlertTriangle,
  ArrowRight,
  Check,
  Award,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

/**
 * Dynamic Icon/Text Helper:
 * Normalizes industry strings into natural English nouns for headlines & copy.
 * E.g., "mechanic" -> "Auto Repair", "plumber" -> "Plumbing", etc.
 */
function formatIndustryNoun(industry: string = ""): string {
  const norm = (industry || "").toLowerCase().trim();
  if (norm.includes("mechanic") || norm.includes("auto")) return "Auto Repair";
  if (norm.includes("plumb")) return "Plumbing";
  if (
    norm.includes("hvac") ||
    norm.includes("air") ||
    norm.includes("heat") ||
    norm.includes("cool")
  ) {
    return "HVAC";
  }
  if (norm.includes("roof")) return "Roofing";
  if (norm.includes("electr")) return "Electrical";
  if (norm.includes("lock")) return "Locksmith";
  if (norm.includes("restor")) return "Restoration";
  if (norm.includes("clean")) return "Cleaning";
  if (norm.includes("pest")) return "Pest Control";
  if (norm.includes("tree")) return "Tree Care";

  if (!industry) return "Emergency Service";
  return industry.charAt(0).toUpperCase() + industry.slice(1);
}

/**
 * Returns an industry-relevant high-resolution background image.
 */
function getHeroBackground(industry: string = ""): string {
  const norm = (industry || "").toLowerCase();
  if (norm.includes("plumb")) {
    return "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=2000&q=80";
  }
  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) {
    return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=80";
  }
  if (norm.includes("roof")) {
    return "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2000&q=80";
  }
  if (norm.includes("electr")) {
    return "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2000&q=80";
  }
  if (norm.includes("mechanic") || norm.includes("auto")) {
    return "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2000&q=80";
  }
  return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80";
}

/**
 * Maps out 3 core emergency services customized by industry.
 */
function getCoreServices(industryNoun: string) {
  const norm = industryNoun.toLowerCase();

  if (norm.includes("plumb")) {
    return [
      {
        title: "Emergency Repairs",
        subtitle: "Burst Pipes, Major Leaks & Clogs",
        description:
          "Immediate 24/7 isolation and repair of burst water mains, ceiling leaks, and sewer backups to prevent structural flooding.",
        features: ["30-Minute Emergency Arrival", "No Overtime Surcharges", "Licensed Master Plumbers"],
        icon: AlertTriangle,
      },
      {
        title: "Installations",
        subtitle: "Water Heaters & Fixtures",
        description:
          "Same-day installation and code-compliant replacement of tankless systems, garbage disposals, and main shut-off valves.",
        features: ["Energy-Efficient Upgrades", "100% Upfront Pricing", "Parts & Labor Warranties"],
        icon: Zap,
      },
      {
        title: "Maintenance & Inspections",
        subtitle: "Sewer Scopes & Drain Jetting",
        description:
          "High-definition camera inspections and hydro-jetting to permanently clear stubborn blockages and prevent emergency failure.",
        features: ["Fiber-Optic Camera Scan", "Full Diagnostic Report", "Preventative Maintenance"],
        icon: Wrench,
      },
    ];
  }

  if (norm.includes("hvac")) {
    return [
      {
        title: "Emergency Repairs",
        subtitle: "AC & Furnace System Failures",
        description:
          "Immediate emergency dispatch for frozen evaporator coils, broken blower motors, and failed heating systems in extreme weather.",
        features: ["24/7 Priority Response", "Universal Truck Parts Stock", "All Major Brands Serviced"],
        icon: AlertTriangle,
      },
      {
        title: "Installations",
        subtitle: "Complete HVAC & Heat Pumps",
        description:
          "Turnkey replacement of high-efficiency AC units, heat pumps, and furnaces engineered for whisper-quiet performance.",
        features: ["SEER2 Compliant Systems", "Custom Ductwork Fit", "10-Year Warranty Coverage"],
        icon: Zap,
      },
      {
        title: "Maintenance & Inspections",
        subtitle: "Seasonal 28-Point Tune-Ups",
        description:
          "Comprehensive safety checks, refrigerant optimization, and electrical testing to guarantee peak summer and winter reliability.",
        features: ["Airflow & Coil Cleaning", "Thermostat Calibration", "Carbon Monoxide Check"],
        icon: Wrench,
      },
    ];
  }

  if (norm.includes("roof")) {
    return [
      {
        title: "Emergency Repairs",
        subtitle: "Storm Damage & Active Ceiling Leaks",
        description:
          "Emergency tarping, storm mitigation, and structural leak repairs to stop active water infiltration inside your home.",
        features: ["Emergency Shrink Tarping", "Storm Damage Mitigation", "Insurance Claim Assistance"],
        icon: AlertTriangle,
      },
      {
        title: "Installations",
        subtitle: "Full Shingle & Metal Roofs",
        description:
          "Architectural shingles, metal systems, and flat roofs installed with reinforced underlayment and precision drip edges.",
        features: ["Class 4 Impact Resistance", "Lifetime Shingle Warranty", "Certified Master Installers"],
        icon: Zap,
      },
      {
        title: "Maintenance & Inspections",
        subtitle: "Drone Audits & Flashing Checks",
        description:
          "Thorough multi-point roof examinations checking flashing seals, chimney boots, and valley integrity before leaks start.",
        features: ["High-Res Photo Report", "Gutter & Soffit Review", "Free Written Estimate"],
        icon: Wrench,
      },
    ];
  }

  if (norm.includes("electr")) {
    return [
      {
        title: "Emergency Repairs",
        subtitle: "Power Outages & Sparking Breakers",
        description:
          "Immediate electrical hazard diagnostics, circuit restorations, and panel repairs to protect your property from fire hazards.",
        features: ["Rapid Hazard Mitigation", "Thermal Imaging Checks", "Licensed Electricians"],
        icon: AlertTriangle,
      },
      {
        title: "Installations",
        subtitle: "200A Panels & EV Chargers",
        description:
          "Modern panel upgrades, whole-home surge suppressors, and Level-2 EV charging station installations with full city permits.",
        features: ["100% Code Permitted", "Whole-Home Surge Shield", "Commercial-Grade Copper"],
        icon: Zap,
      },
      {
        title: "Maintenance & Inspections",
        subtitle: "Wiring Audits & Safety Certifications",
        description:
          "Comprehensive home safety audits identifying aging aluminum wiring, overloaded circuits, and ungrounded outlets.",
        features: ["Insurance Safety Audits", "GFCI/AFCI Verification", "Clear Written Roadmap"],
        icon: Wrench,
      },
    ];
  }

  if (norm.includes("auto") || norm.includes("mechanic")) {
    return [
      {
        title: "Emergency Repairs",
        subtitle: "Breakdowns & Overheating",
        description:
          "Priority mechanical triage, alternator and starter motor fixes, and urgent cooling system repairs to get you back on the road.",
        features: ["Fast Mobile Diagnostics", "OEM Replacement Parts", "Towing Coordination"],
        icon: AlertTriangle,
      },
      {
        title: "Installations",
        subtitle: "Brakes, Suspensions & Transmissions",
        description:
          "Precision installation of high-performance brake rotors, struts, shocks, and complete transmission assemblies.",
        features: ["Ceramic Brake Pads", "Hydraulic Bleed & Test", "24-Month / 24k-Mile Warranty"],
        icon: Zap,
      },
      {
        title: "Maintenance & Inspections",
        subtitle: "50-Point Road Safety Audits",
        description:
          "Detailed computer diagnostic scans, fluid condition tests, and suspension reviews to ensure flawless road readiness.",
        features: ["Digital Inspection Report", "OBD-II Deep Computer Scan", "Transparent Estimate"],
        icon: Wrench,
      },
    ];
  }

  // Default emergency service trio
  return [
    {
      title: "Emergency Repairs",
      subtitle: "24/7 Rapid Incident Resolution",
      description:
        "Immediate emergency dispatch for unexpected breakdowns, critical system failures, and urgent restoration.",
      features: ["Immediate Dispatch", "Truck Stocked for 90% Fixes", "Clear Upfront Pricing"],
      icon: AlertTriangle,
    },
    {
      title: "Installations",
      subtitle: "Commercial & Residential Replacements",
      description:
        "Seamless new installations and complete system upgrades executed to the highest industry safety standards.",
      features: ["Certified Master Techs", "Full Equipment Warranty", "Guaranteed Workmanship"],
      icon: Zap,
    },
    {
      title: "Maintenance & Inspections",
      subtitle: "Preventative Safety Audits",
      description:
        "Rigorous scheduled maintenance and complete system checks engineered to prevent catastrophic breakdowns.",
      features: ["Multi-Point Checklist", "Detailed Health Audit", "Priority Maintenance Plans"],
      icon: Wrench,
    },
  ];
}

export function UrgentService({ clientData }: TemplateProps) {
  // Extract dynamic lead data
  const companyName =
    clientData.name || clientData.company || "Emergency Response Experts";
  const rawIndustry = clientData.industry || clientData.niche || "Service";
  const industryNoun = formatIndustryNoun(rawIndustry);
  const city = clientData.city || "Your Area";
  const phone = clientData.phone || "(800) 555-0199";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // Dynamic Theme Colors
  const primaryColor =
    clientData.primaryColor ||
    clientData.colors?.primary ||
    "#DC2626"; // Bold high-converting Red-600 default
  const secondaryColor =
    clientData.secondaryColor ||
    clientData.colors?.secondary ||
    "#991B1B";

  const heroBgImage = getHeroBackground(rawIndustry);
  const coreServices = getCoreServices(industryNoun);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-500 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. EMERGENCY TOP BAR (Sticky, High-Contrast Banner at Absolute Top)
      ────────────────────────────────────────────────────────────────────── */}
      <aside
        role="region"
        aria-label="Emergency Dispatch Status"
        className="sticky top-0 z-50 w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2.5 shadow-md border-b border-red-500/40"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-bold tracking-wide">
          <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span>
              🚨 24/7 Emergency {industryNoun} Dispatch in {city} — Available Now
            </span>
          </div>

          <a
            href={`tel:${cleanPhone}`}
            className="hidden sm:inline-flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-white font-mono px-3 py-1 rounded border border-white/20 transition-all text-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Fast Dispatch: {phone}</span>
          </a>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────────────────
          2. NAVIGATION BAR (Clean & Simple, Visible Primary Color Phone CTA)
      ────────────────────────────────────────────────────────────────────── */}
      <header className="w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-[41px] z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Company Name on the Left */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg text-white font-black"
              style={{ backgroundColor: primaryColor }}
            >
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                {companyName}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Licensed & Insured {industryNoun} Specialists • {city}
              </div>
            </div>
          </div>

          {/* Right: Highly Visible Phone Number Button styled with primaryColor */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                Immediate Response Line
              </span>
              <span className="text-sm font-bold text-white">
                Live Dispatch 24/7/365
              </span>
            </div>
            <a
              href={`tel:${cleanPhone}`}
              id="nav-call-button"
              className="inline-flex items-center gap-2.5 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 text-sm sm:text-base"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          3. THE HERO SECTION (Massive H1, Subheadline, Pulsing CTA, Dark Image)
      ────────────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-slate-950 overflow-hidden"
        style={{
          backgroundImage: `url('${heroBgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Heavy bg-black/70 Overlay so text pops cleanly */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/60 to-black/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xl backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Technicians On Call in {city} Right Now</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-mono">Avg Arrival ~24 Mins</span>
          </motion.div>

          {/* Headline (H1, Massive, White) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md max-w-4xl"
          >
            Voted #1 {industryNoun} Experts in {city}
          </motion.h1>

          {/* Subheadline (gray-300) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Fast response times, upfront flat-rate pricing, and guaranteed satisfaction.
            Don&apos;t risk water or electrical damage—call the verified dispatchers today.
          </motion.p>

          {/* Primary CTA: Massive, Pulsing Button using clientData.primaryColor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <motion.a
              href={`tel:${cleanPhone}`}
              id="hero-call-now-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center justify-center gap-3.5 text-white font-black px-9 py-5 rounded-2xl text-xl sm:text-2xl shadow-2xl transition-all duration-300 animate-pulse cursor-pointer"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 45px ${primaryColor}77`,
              }}
            >
              <Phone className="w-7 h-7 transition-transform group-hover:rotate-12" />
              <span>Call Now: {phone}</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          {/* Micro trust row below CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              No Hidden Overtime Fees
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Direct Phone Call, No Call Center Delays
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              100% Satisfaction Guarantee
            </span>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. TRUST BAR (High-Visibility BBB, Master License & Insured Badges)
      ────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Trust and Qualifications"
        className="w-full bg-slate-900 border-y border-slate-800 py-6 px-4 sm:px-6 lg:px-8 relative z-20 shadow-xl"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Indicator 1: State Master Licensed */}
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700/80 shrink-0"
              style={{ color: primaryColor }}
            >
              <BadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight">
                State Master Licensed
              </div>
              <div className="text-xs text-slate-400">
                100% City Code Permitted
              </div>
            </div>
          </div>

          {/* Indicator 2: BBB Accredited A+ */}
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700/80 shrink-0 text-amber-400">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight">
                BBB Accredited A+
              </div>
              <div className="text-xs text-slate-400">
                Over 450+ Verified Reviews
              </div>
            </div>
          </div>

          {/* Indicator 3: $2M General Liability Insured */}
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700/80 shrink-0 text-emerald-400"
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight">
                $2,000,000 Insured
              </div>
              <div className="text-xs text-slate-400">
                Zero Homeowner Liability
              </div>
            </div>
          </div>

          {/* Indicator 4: 24/7 Rapid Response */}
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700/80 shrink-0"
              style={{ color: primaryColor }}
            >
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight">
                24/7 Rapid Response
              </div>
              <div className="text-xs text-slate-400">
                Avg ~24 Min Arrival in {city}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4B. ANIMATED LIVE DISPATCH SMS / CHAT SIMULATION
      ────────────────────────────────────────────────────────────────────── */}
      <LiveDispatchSimulation
        industryNoun={industryNoun}
        city={city}
        companyName={companyName}
        phone={phone}
        primaryColor={primaryColor}
      />

      {/* ──────────────────────────────────────────────────────────────────────
          5. SERVICE GRID (3-Column Grid titled "Our Core Services")
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <span>Priority Emergency Coverage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Our Core Services
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            From emergency repairs to precision installations, our certified{" "}
            {industryNoun} specialists provide prompt, guaranteed workmanship
            across {city}.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/60"
              >
                <div>
                  {/* Top Icon colored in primaryColor */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        borderColor: `${primaryColor}30`,
                        color: primaryColor,
                      }}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider">
                      Service 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-8">
                    {service.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: primaryColor }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <motion.a
                  href={`tel:${cleanPhone}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-800 group-hover:bg-red-600 text-white transition-all duration-200 border border-slate-700 group-hover:border-red-500 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call For Immediate {service.title}</span>
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5B. PROOF GALLERY (Actual on-the-job photographic documentation)
      ────────────────────────────────────────────────────────────────────── */}
      <MasonryProofGallery
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="dark"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          5C. VERIFIED REVIEWS MARQUEE (Infinite ticker of 5-star Google reviews)
      ────────────────────────────────────────────────────────────────────── */}
      <InfiniteReviewMarquee
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="dark"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          6. HIGH-CONVERSION BOTTOM CALLOUT (Second Conversion Touchpoint)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 text-center border shadow-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, ${secondaryColor}25 100%)`,
            borderColor: `${secondaryColor}40`,
          }}
        >
          <div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Need An Emergency {industryNoun} in {city}?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Don&apos;t risk water damage, electrical hazards, or prolonged system
            downtime. Our dispatchers are standing by 24 hours a day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-3 text-white font-extrabold px-8 py-4 rounded-xl text-lg sm:text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 0 30px ${primaryColor}55`,
              }}
            >
              <Phone className="w-6 h-6 animate-pulse" />
              <span>Call Now: {phone}</span>
            </a>

            <div className="text-xs sm:text-sm text-slate-400 font-mono">
              ⚡ Guaranteed arrival window in {city}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          7. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 bg-black/60 py-10 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white font-black text-[10px]"
              style={{ backgroundColor: primaryColor }}
            >
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300">{companyName}</span>
            <span>•</span>
            <span>24/7 {industryNoun} in {city}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>Upfront Pricing</span>
            <span>•</span>
            <a
              href={`tel:${cleanPhone}`}
              className="text-white hover:underline font-mono"
            >
              {phone}
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────────────────
          8. STICKY MOBILE EMERGENCY CALL BAR (Always accessible on phones)
      ────────────────────────────────────────────────────────────────────── */}
      <aside
        role="region"
        aria-label="Mobile Emergency Hotline"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="text-[11px] leading-tight">
            <div className="font-bold text-white">Technicians On Call</div>
            <div className="text-slate-400 text-[10px]">Avg ~24 Min Dispatch</div>
          </div>
        </div>
        <a
          href={`tel:${cleanPhone}`}
          id="sticky-mobile-call-button"
          className="px-4 py-2.5 rounded-xl text-white font-black text-xs flex items-center gap-2 shadow-lg animate-pulse"
          style={{ backgroundColor: primaryColor }}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call: {phone}</span>
        </a>
      </aside>
    </div>
  );
}

export default UrgentService;
