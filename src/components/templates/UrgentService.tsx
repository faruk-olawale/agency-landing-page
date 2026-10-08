"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { TemplateProps } from "@/lib/archetypeMap";
import {
  getArchetypePrimaryColor,
  getArchetypeSecondaryColor,
} from "@/lib/archetypeMap";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteReviewMarquee, MasonryProofGallery } from "@/components/universal";
import {
  Phone,
  CheckCircle2,
  Clock,
  Wrench,
  Zap,
  AlertTriangle,
  ArrowRight,
  Check,
  ShieldCheck,
  BadgeCheck,
  Award,
  Star,
  MapPin,
  Droplets,
  Flame,
  Activity,
  Radio,
  Gauge,
  X,
} from "lucide-react";

/**
 * Normalizes industry strings for high-converting trade services.
 */
function formatIndustryNoun(industry: string = ""): string {
  const norm = (industry || "").toLowerCase().trim();
  if (norm.includes("plumb")) return "Plumbing";
  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) return "HVAC & Heating";
  if (norm.includes("roof")) return "Roofing";
  if (norm.includes("electr")) return "Electrical";
  if (norm.includes("mechanic") || norm.includes("auto")) return "Auto Repair";
  return industry.charAt(0).toUpperCase() + industry.slice(1);
}

/**
 * Returns an industry-relevant high-resolution background image.
 */
function getHeroBackground(industry: string = ""): string {
  const norm = (industry || "").toLowerCase();
  if (norm.includes("plumb")) {
    return "/images/plumber-hero.jpg";
  }
  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) {
    return "/images/hvac-hero.jpg";
  }
  if (norm.includes("roof")) {
    return "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2000&q=80";
  }
  if (norm.includes("electr")) {
    return "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2000&q=80";
  }
  return "/images/plumber-hero.jpg";
}

/**
 * Maps out 3 core emergency services customized by industry with technical precision.
 */
function getCoreServices(industryNoun: string) {
  const norm = industryNoun.toLowerCase();

  if (norm.includes("plumb")) {
    return [
      {
        tag: "SECTOR 01 // CRITICAL",
        title: "Burst Mains & Active Flooding",
        subtitle: "Rapid Acoustic Pinpointing & Pipe Freezing",
        description:
          "Immediate emergency isolation of burst water mains, ceiling ruptures, and pressurized supply lines. Mobile units deploy cryogenic pipe-freezing clamps and high-pressure PEX press lines to stop flooding without destructive wall demolition.",
        hardware: "Ridgid Ultrasonic Sensor • Cryo Freezing Clamps",
        features: ["Sub-25 min rapid emergency dispatch", "Non-invasive acoustic leak pinpointing", "Lifetime copper press joint warranty"],
        icon: Droplets,
      },
      {
        tag: "SECTOR 02 // SANITATION",
        title: "Blocked Drains & Sewer Jetting",
        subtitle: "5,000 PSI Hydro-Jetting & CCTV Camera Inspection",
        description:
          "Fiber-optic color drain camera telemetry combined with 5,000 PSI pulsed water jetting to pulverize tree roots, grease calcification, and collapsed lines with zero yard trenching.",
        hardware: "5,000 PSI Water Cannon • Ridgid SeaSnake CCTV",
        features: ["Full HD fiber-optic CCTV recording included", "Zero-excavation hydro-clearing", "Root barrier chemical treatment"],
        icon: Zap,
      },
      {
        tag: "SECTOR 03 // THERMAL",
        title: "Hot Water System Replacements",
        subtitle: "Same-Day Gas, Electric & Heat Pump Restoration",
        description:
          "Rapid emergency changeover of failed hot water tanks. Vans carry manufacturer-authorized Rheem, Rinnai, Dux, and Bosch systems for same-day supply and code-compliant installation.",
        hardware: "Full Mobile Stock: Rheem, Rinnai, Dux Units",
        features: ["Same-day emergency tank changeover", "Manufacturer warranty & compliance cert", "Free removal & eco-disposal of old tank"],
        icon: Flame,
      },
    ];
  }

  if (norm.includes("hvac")) {
    return [
      {
        tag: "SECTOR 01 // CLIMATE",
        title: "Emergency AC & Compressor Triage",
        subtitle: "Frozen Coils, Capacitors & Motor Lockups",
        description:
          "24/7 priority triage for sudden compressor failure, frozen evaporator coils, and total cooling lockouts during severe heatwave conditions.",
        hardware: "Digital Manifold Gauges • Dual-Run Capacitors",
        features: ["Universal truck components stock", "All major VRF & split systems serviced", "Transparent fixed diagnostic quote"],
        icon: AlertTriangle,
      },
      {
        tag: "SECTOR 02 // THERMAL",
        title: "Furnace & Heating Restoration",
        subtitle: "Heat Exchanger & Electronic Ignition Repair",
        description:
          "Code-compliant restoration of dead furnaces, heat pumps, and gas heaters. Certified carbon monoxide testing on every callout.",
        hardware: "Electronic Combustion Analyzer • Universal Igniters",
        features: ["Digital carbon monoxide safety test", "Same-day igniter & blower replacement", "10-year workmanship warranty"],
        icon: Flame,
      },
      {
        tag: "SECTOR 03 // MECHANICAL",
        title: "Refrigerant & Safety Audits",
        subtitle: "High-Precision Leak Detection & Vacuum Recharge",
        description:
          "Nitrogen pressure isolation and ultrasonic leak testing to restore system efficiency and prevent catastrophic compressor burnout.",
        hardware: "Micron Vacuum Pump • EPA Recovery Setup",
        features: ["Certified EPA refrigerant handling", "Complete line pressure test", "Precision airflow & ductwork balancing"],
        icon: Wrench,
      },
    ];
  }

  return [
    {
      tag: "SECTOR 01 // RAPID",
      title: "24/7 Rapid Emergency Response",
      subtitle: "Immediate On-Site Triage & Stabilization",
      description:
        "Mission-critical property stabilization and hazardous failure repair. Certified tradesmen arrive in fully equipped mobile workshops.",
      hardware: "Commercial Diagnostic & Repair Arsenal",
      features: ["On-call 24 hours a day, 365 days a year", "Fully equipped mobile workshops", "Upfront written price before work begins"],
      icon: AlertTriangle,
    },
    {
      tag: "SECTOR 02 // RESTORATION",
      title: "Infrastructure Replacements",
      subtitle: "Code-Compliant System Upgrades",
      description:
        "Engineered replacements executed with premium components, certified tradesmen, and full compliance documentation.",
      hardware: "Master Trades Spec Components",
      features: ["Certified master tradesmen", "Full equipment warranty", "Guaranteed workmanship"],
      icon: Zap,
    },
    {
      tag: "SECTOR 03 // DIAGNOSTIC",
      title: "Preventative Safety Audits",
      subtitle: "Multi-Point Mechanical Health Testing",
      description:
        "Comprehensive diagnostic testing to prevent catastrophic failures and extend the operational life of your property's systems.",
      hardware: "Electronic Multi-Point Diagnostic Gear",
      features: ["Detailed health checklist report", "Clear photographic documentation", "Priority emergency dispatch access"],
      icon: Wrench,
    },
  ];
}

interface EmergencyScenario {
  id: string;
  label: string;
  code: string;
  shortTag: string;
  icon: React.ComponentType<{ className?: string }>;
  problemSummary: string;
  actionTaken: string;
  truckEquipment: string;
  arrivalSla: string;
  pricingNote: string;
}

function getEmergencyScenarios(industryNoun: string): EmergencyScenario[] {
  const norm = industryNoun.toLowerCase();

  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) {
    return [
      {
        id: "ac-breakdown",
        label: "AC System Failure",
        code: "CODE 1 // COOLING",
        shortTag: "Cooling Triage",
        icon: Zap,
        problemSummary: "Unit blowing warm air, frozen evaporator coils, or complete electrical shutoff.",
        actionTaken: "Electronic refrigerant pressure test, dual-run capacitor diagnostic, same-day defrost.",
        truckEquipment: "Digital manifold gauges, dual-run capacitors, R410A & R32 stock on van.",
        arrivalSla: "Priority dispatch < 30 mins",
        pricingNote: "Fixed diagnosis fee waived with repair",
      },
      {
        id: "heating-outage",
        label: "Furnace / Heating",
        code: "CODE 2 // HEATING",
        shortTag: "Heat Restored",
        icon: Flame,
        problemSummary: "Furnace blowing cold air, ignition lockout, or pilot light continuously blowing out.",
        actionTaken: "Heat exchanger safety inspection, flame sensor cleaning, pressure switch calibration.",
        truckEquipment: "Multimeter diagnostics, universal hot surface igniters, inducer motors.",
        arrivalSla: "Priority dispatch < 30 mins",
        pricingNote: "Safety certified carbon-monoxide test included",
      },
      {
        id: "freon-leak",
        label: "Refrigerant Leak",
        code: "CODE 3 // FREON",
        shortTag: "Leak Sealing",
        icon: Droplets,
        problemSummary: "Hissing sounds from lines, ice buildup on copper tubes, declining cooling capacity.",
        actionTaken: "Nitrogen pressure leak detection, ultrasonic sniff test, line repair & vacuum recharge.",
        truckEquipment: "Nitrogen purge kit, micron vacuum recovery pump, oxy-acetylene braze setup.",
        arrivalSla: "Arrives in < 45 mins",
        pricingNote: "EPA-certified handling & pressure test guarantee",
      },
      {
        id: "thermostat-wiring",
        label: "Thermostat / Wiring",
        code: "CODE 4 // ELECTRICAL",
        shortTag: "Controls Fix",
        icon: Wrench,
        problemSummary: "Thermostat blank, short-cycling every 3 minutes, or high-limit safety trip.",
        actionTaken: "Low-voltage 24V transformer check, smart thermostat rewiring, control relay swap.",
        truckEquipment: "Smart thermostats (Nest/Ecobee), 24V step-down transformers, diagnostic meters.",
        arrivalSla: "Arrives in < 35 mins",
        pricingNote: "Upfront transparent pricing",
      },
    ];
  }

  // Default to plumbing (Burst pipe, Hot water, Blocked drain, Gas leak)
  return [
    {
      id: "burst-pipe",
      label: "Burst Mains & Flooding",
      code: "CODE 1 // CRITICAL",
      shortTag: "Flood Isolation",
      icon: Droplets,
      problemSummary: "Active water mains rupture or burst ceiling/wall pipe causing flooding.",
      actionTaken: "Acoustic sensor identifies exact rupture through 150mm concrete. Cryogenic pipe-freezing clamps stop flow with zero wall demolition.",
      truckEquipment: "Ridgid Ultrasonic Sensor • Cryogenic Clamps • Milwaukee M18 ForceLogic Press",
      arrivalSla: "Rapid Emergency Dispatch < 25 mins",
      pricingNote: "Fixed upfront written quote before work begins • Zero hidden fees",
    },
    {
      id: "hot-water",
      label: "Hot Water Failure",
      code: "CODE 2 // THERMAL",
      shortTag: "Same-Day Restore",
      icon: Flame,
      problemSummary: "Total loss of hot water, ruptured cylinder leaking from base, or pilot valve fault.",
      actionTaken: "Diagnostic element & thermostat test. Same-day emergency changeover with factory-certified Rheem/Rinnai units.",
      truckEquipment: "Mobile Van Stock: Rheem, Rinnai, Dux Tanks • Pressure Relief Valves",
      arrivalSla: "Technician on-site < 30 mins",
      pricingNote: "10-Year manufacturer warranty & compliance certificate included",
    },
    {
      id: "blocked-drain",
      label: "Blocked Drain & Sewer",
      code: "CODE 3 // SEWERAGE",
      shortTag: "Instant Clear",
      icon: AlertTriangle,
      problemSummary: "Overflowing toilet, backing-up exterior drain, or sewer gas escaping into property.",
      actionTaken: "5,000 PSI pulsed water jetting pulverizes tree roots and grease obstructions. High-definition color CCTV camera maps line integrity.",
      truckEquipment: "5,000 PSI Hydro-Jetter • Ridgid SeaSnake Color CCTV (60m Cable)",
      arrivalSla: "Arrives in < 30 mins",
      pricingNote: "Complimentary full HD color CCTV video inspection report provided",
    },
    {
      id: "gas-leak",
      label: "Hazardous Gas Odor",
      code: "CODE 0 // IMMEDIATE",
      shortTag: "Hazard Priority",
      icon: Zap,
      problemSummary: "Rotten egg sulfur odor, hissing sound at meter, or suspected appliance leak.",
      actionTaken: "Immediate safety line isolation, digital manometer pressure-decay testing, compliant copper repipe.",
      truckEquipment: "Calibrated Combustible Gas Sniffer • Digital Manometer • Safety Shutoffs",
      arrivalSla: "Code 0 Priority Response < 20 mins",
      pricingNote: "NSW Fair Trading Master Gasfitter compliance certification",
    },
  ];
}

export function UrgentService({ clientData }: TemplateProps) {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);

  const companyName = clientData.name || clientData.company || "Network Plumbing";
  const rawIndustry = clientData.industry || clientData.niche || "plumber";
  const industryNoun = formatIndustryNoun(rawIndustry);
  const city = clientData.city || "Sydney";
  const phone = clientData.phone || "02 9023 3232";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const primaryColor =
    clientData.primaryColor ||
    clientData.colors?.primary ||
    getArchetypePrimaryColor(rawIndustry, "UrgentService");

  const coreServices = getCoreServices(industryNoun);
  const emergencyScenarios = getEmergencyScenarios(industryNoun);
  const activeScenario = emergencyScenarios[activeScenarioIndex] || emergencyScenarios[0];
  const heroBackground = getHeroBackground(rawIndustry);

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 font-sans selection:bg-sky-500 selection:text-white pb-20 sm:pb-0 relative overflow-hidden dark-dot-pattern">
      {/* ──────────────────────────────────────────────────────────────────────
          AMBIENT LUMINOUS GLOW (Godly / Aceternity style atmospheric light)
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-sky-500/15 via-sky-600/4 to-transparent blur-3xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% -10%, ${primaryColor}25, transparent 75%)`,
        }}
      />

      {/* ──────────────────────────────────────────────────────────────────────
          1. MISSION-CONTROL HEADER (Precision glass bar with telemetry)
      ────────────────────────────────────────────────────────────────────── */}
      <header className="bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Operational Status */}
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0 border border-white/10"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, #0284c7)`,
              }}
            >
              <Wrench className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white block leading-tight">
                  {companyName}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  24/7 ON DUTY
                </span>
              </div>
              <span className="text-xs text-zinc-400 hidden sm:flex items-center gap-2 font-mono mt-0.5">
                <span>NSW MASTER LIC #248194C</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">{city.toUpperCase()} RAPID RESPONSE</span>
              </span>
            </div>
          </div>

          {/* Right Action: Telemetry + Dispatch Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex flex-col text-right font-mono">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-end gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                GPS DISPATCH ACTIVE
              </span>
              <span className="text-xs text-zinc-400">
                Zero Callout Surcharge
              </span>
            </div>

            <a
              href={`tel:${cleanPhone}`}
              id="header-call-btn"
              className="relative inline-flex items-center gap-2 text-white font-extrabold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-[0_0_25px_-5px_rgba(14,165,233,0.4)] transition-all hover:brightness-110 active:scale-95 text-xs sm:text-sm border border-white/15 overflow-hidden group"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              <Phone className="w-4 h-4 animate-pulse shrink-0" />
              <span className="hidden xs:inline font-mono tracking-tight">{phone}</span>
              <span className="xs:hidden">Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          2. HERO SECTION: BENTO GRID OF OPERATIONAL PRECISION
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* ── Left Column: Operational Authority & Instant Hotline ──── */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Telemetry Micro-Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono tracking-wider text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span>CODE 1 EMERGENCY DISPATCH // {city.toUpperCase()}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400 font-bold">&lt; 25 MIN ARRIVAL</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.035em] leading-[1.1]">
                Precision Emergency {industryNoun} in {city} —{" "}
                <span
                  className="block mt-1 bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${primaryColor}, #38bdf8, #34d399)`,
                  }}
                >
                  Restoring Infrastructure. Zero Demolition.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl font-normal">
                Burst water mains, blocked sewers, or no hot water? Certified master tradesmen
                arrive in fully equipped mobile workshops with upfront flat-rate pricing. Zero hidden callout fees.
              </p>

              {/* Technical SLA Telemetry Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-1 font-mono text-xs">
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-200">24-Min Avg Arrival</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-zinc-200">$20M Public Liability</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-zinc-200">Upfront Fixed Quote</span>
                </div>
              </div>

              {/* Tactical Direct Dispatch Hotline */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`tel:${cleanPhone}`}
                  id="hero-call-now-btn"
                  className="relative inline-flex items-center justify-center gap-3 text-white font-black px-8 py-4.5 rounded-2xl text-lg sm:text-xl shadow-[0_0_35px_-5px_rgba(14,165,233,0.5)] transition-all hover:brightness-110 active:scale-98 border border-white/20 group overflow-hidden"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                  <Phone className="w-6 h-6 animate-pulse" />
                  <span className="font-mono tracking-tight">Call Dispatch: {phone}</span>
                </a>

                <div className="text-xs text-zinc-400 flex flex-col justify-center font-mono">
                  <span className="text-zinc-200 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    LIVE MASTER TRADESMEN ON FREQUENCY
                  </span>
                  <span>Direct phone line • Zero hold times</span>
                </div>
              </div>
            </div>

            {/* ── Right Column: Hardware Viewport & Interactive Diagnostic Console ── */}
            <div className="lg:col-span-6">
              <div className="glass-card-dark rounded-3xl p-2 sm:p-3 relative overflow-hidden">
                {/* 1. Tactical Viewport Stage with Photo & Telemetry Overlays */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 group border border-white/10">
                  <Image
                    src={heroBackground}
                    alt={`${companyName} Licensed Master ${industryNoun}`}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* High-tech Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/20 to-black/40" />

                  {/* Top Floating Glass Telemetry HUDs */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none font-mono">
                    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/15 text-zinc-200 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                      <span>[UNIT 04 DISPATCHED] ETA: 18 MIN</span>
                    </div>

                    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>4.97 ★ 520+ AUDITED JOBS</span>
                    </div>
                  </div>

                  {/* Bottom Audio/Frequency Waveform HUD (Aceternity / Awwwards aesthetic) */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                    <div className="bg-zinc-950/85 backdrop-blur-md border border-white/10 text-white px-3.5 py-2.5 rounded-xl flex items-center justify-between font-mono">
                      <div className="flex items-center gap-2.5">
                        <Activity className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                            ACOUSTIC LEAK TELEMETRY
                          </div>
                          <div className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                            <span>1,420 Hz RESONANCE PINPOINTED</span>
                            <span className="text-emerald-400 text-[10px]">● ZERO WALL DAMAGE</span>
                          </div>
                        </div>
                      </div>

                      {/* Animated Sound Wave Graphic */}
                      <div className="hidden sm:flex items-center gap-1 h-4">
                        <span className="w-1 bg-sky-400 h-3 rounded-full animate-pulse" />
                        <span className="w-1 bg-emerald-400 h-4 rounded-full animate-pulse delay-75" />
                        <span className="w-1 bg-sky-400 h-2 rounded-full animate-pulse delay-150" />
                        <span className="w-1 bg-emerald-400 h-3.5 rounded-full animate-pulse delay-100" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Tactical Scenario Switcher (Segmented Hardware Controller) */}
                <div className="p-3 sm:p-4 mt-2">
                  <div className="flex items-center justify-between mb-2.5 font-mono text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-sky-400" />
                      SELECT EMERGENCY TO INSPECT HARDWARE & PROTOCOL:
                    </span>
                    <span className="text-zinc-500 hidden sm:inline">
                      INTERACTIVE TELEMETRY
                    </span>
                  </div>

                  {/* 4 Segmented Hardware Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {emergencyScenarios.map((sc, idx) => {
                      const IconComponent = sc.icon;
                      const isActive = idx === activeScenarioIndex;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => setActiveScenarioIndex(idx)}
                          type="button"
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer font-mono ${
                            isActive
                              ? "bg-white/[0.08] text-white shadow-lg border-2 font-bold ring-1 ring-white/20"
                              : "bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 border border-white/[0.06] font-medium"
                          }`}
                          style={{
                            borderColor: isActive ? primaryColor : undefined,
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white"
                            style={{
                              backgroundColor: isActive ? primaryColor : "rgba(255,255,255,0.08)",
                            }}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="text-xs truncate">{sc.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Active Scenario Detailed Visual Card */}
                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScenario.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4 font-mono"
                    >
                      {/* Priority Tag & Problem Description */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {activeScenario.code}
                          </span>
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            {activeScenario.arrivalSla}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-2 font-sans leading-relaxed">
                          {activeScenario.problemSummary}
                        </p>
                      </div>

                      {/* Equipment & Action Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                            Technician Immediate Action:
                          </span>
                          <p className="text-xs font-medium text-zinc-200 leading-snug font-sans">
                            {activeScenario.actionTaken}
                          </p>
                        </div>

                        <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                            Truck Arsenal Dispatched:
                          </span>
                          <p className="text-xs font-medium text-zinc-200 leading-snug font-sans">
                            {activeScenario.truckEquipment}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Guarantee & Direct Dispatch Call */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08]">
                        <div className="text-[11px] text-zinc-400 text-left w-full sm:w-auto font-sans">
                          <strong className="text-zinc-200 font-mono">Guarantee: </strong>
                          <span>{activeScenario.pricingNote}</span>
                        </div>

                        <a
                          href={`tel:${cleanPhone}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl font-bold text-white text-xs shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0 border border-white/20"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Dispatch for {activeScenario.label}</span>
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          3. CREDIBILITY ANCHORS MATRIX (Dark Obsidian & Titanium Badges)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="border-b border-white/[0.06] py-10 px-4 sm:px-6 lg:px-8 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card-interactive rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg border border-white/10"
              style={{ backgroundColor: primaryColor }}
            >
              <BadgeCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight font-mono">NSW Master Lic</div>
              <div className="text-xs text-zinc-400 font-sans">Fair Trading #248194C</div>
            </div>
          </div>

          <div className="glass-card-interactive rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight font-mono">$20,000,000 Insured</div>
              <div className="text-xs text-zinc-400 font-sans">Zero Homeowner Liability</div>
            </div>
          </div>

          <div className="glass-card-interactive rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight font-mono">Fixed Upfront Price</div>
              <div className="text-xs text-zinc-400 font-sans">Zero Callout Surcharge</div>
            </div>
          </div>

          <div className="glass-card-interactive rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Star className="w-5 h-5 fill-sky-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight font-mono">4.97 / 5.0 Rating</div>
              <div className="text-xs text-zinc-400 font-sans">520+ Audited Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. CORE INFRASTRUCTURE CAPABILITIES (Bento Grid of Engineering Specs)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1 rounded-full mb-3 inline-block">
            MISSION-CRITICAL CAPABILITIES // {city.toUpperCase()}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Core Infrastructure Emergency Services
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            From midnight mains ruptures to high-capacity commercial changeovers, our master tradesmen
            provide guaranteed workmanship across all {city} sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coreServices.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <div
                key={index}
                className="glass-card-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider mb-4">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Hardware Specification Tag */}
                  <div className="bg-black/50 border border-white/[0.06] rounded-xl p-3 mb-6 font-mono">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                      TRUCK ARSENAL SPECIFICATION:
                    </span>
                    <span className="text-xs font-bold text-zinc-200">
                      {service.hardware}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-8 font-sans">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Call For {service.title.split("&")[0]}</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5. THE PROMISE & GUARANTEE MATRIX (Engineering vs Typical Contractors)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950/70 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full mb-3 inline-block">
              CRO BENCHMARK // {city.toUpperCase()}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Why {city} Homeowners Choose {companyName}
            </h3>
            <p className="text-sm text-zinc-400 font-normal">
              Direct commitments that protect your home, wallet, and peace of mind.
            </p>
          </div>

          <div className="glass-card-dark rounded-3xl overflow-hidden font-mono text-xs sm:text-sm">
            <div className="grid grid-cols-3 bg-white/[0.04] p-4 font-bold text-xs uppercase tracking-wider border-b border-white/[0.08] text-zinc-400">
              <div>Metric</div>
              <div className="text-sky-400">{companyName}</div>
              <div className="text-zinc-400">Typical Trade Brokers</div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-zinc-200">Fixed Upfront Quote</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Guaranteed in Writing</span>
                </div>
                <div className="text-zinc-400 font-sans">Surprise bill after work starts</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-zinc-200">Arrival Speed SLA</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Under 25 Minutes</span>
                </div>
                <div className="text-zinc-400 font-sans">Vague 4-hour window</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-zinc-200">Tradesmen Licensing</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>100% In-House Master Trades</span>
                </div>
                <div className="text-zinc-400 font-sans">Untracked subcontractors</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-zinc-200">Workmanship Warranty</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Lifetime Guarantee</span>
                </div>
                <div className="text-zinc-400 font-sans">30 days or zero recourse</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-zinc-200">Truck Hardware Arsenal</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Mobile Workshop Stock</span>
                </div>
                <div className="text-zinc-400 font-sans">Multiple hardware store trips</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          6. REAL FIELD DOCUMENTATION & PROOF GALLERY (Dark Luxe Theme)
      ────────────────────────────────────────────────────────────────────── */}
      <MasonryProofGallery
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="dark"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          7. AUDITED CLIENT REVIEWS MARQUEE (Dark Luxe Theme)
      ────────────────────────────────────────────────────────────────────── */}
      <InfiniteReviewMarquee
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="dark"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          8. MISSION-CRITICAL DISPATCH COMMAND CENTER (Bottom Callout)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] overflow-hidden bg-gradient-to-b from-zinc-950 to-[#07090e]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${primaryColor}20, transparent 70%)`,
          }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1 rounded-full">
            24/7 RAPID DISPATCH // ON-SITE IN &lt; 25 MIN
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.035em]">
            Don&apos;t Let Water Damage Destroy Your {city} Property
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            Active pipe bursts and sewage backups cause thousands of dollars in damage per hour.
            Our on-duty technicians are on frequency right now.
          </p>

          <div className="pt-2">
            <a
              href={`tel:${cleanPhone}`}
              className="relative inline-flex items-center gap-3 text-white font-black px-8 sm:px-10 py-4.5 rounded-2xl text-lg sm:text-xl shadow-[0_0_40px_-5px_rgba(14,165,233,0.5)] transition-all hover:brightness-110 active:scale-98 border border-white/20 group overflow-hidden"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              <Phone className="w-6 h-6 animate-pulse" />
              <span className="font-mono tracking-tight">Call Direct: {phone}</span>
            </a>
          </div>

          <div className="text-xs text-zinc-400 flex items-center justify-center gap-4 pt-2 font-mono">
            <span>✓ ZERO OVERTIME CHARGES</span>
            <span>•</span>
            <span>✓ FIXED UPFRONT PRICE</span>
            <span>•</span>
            <span>✓ LICENSED MASTER TRADES</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          9. MINIMALIST MISSION-CONTROL FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.08] bg-[#05070a] py-10 px-4 sm:px-6 lg:px-8 text-zinc-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px]"
              style={{ backgroundColor: primaryColor }}
            >
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-zinc-200">{companyName}</span>
            <span>•</span>
            <span>24/7 EMERGENCY INFRASTRUCTURE DISPATCH IN {city.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>NSW MASTER LIC #248194C</span>
            <span>•</span>
            <span>$20M PUBLIC LIABILITY</span>
            <span>•</span>
            <a
              href={`tel:${cleanPhone}`}
              className="text-white font-bold hover:underline"
            >
              {phone}
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────────────────
          10. STICKY MOBILE EMERGENCY HOTLINE BAR (Dark Glass Pill)
      ────────────────────────────────────────────────────────────────────── */}
      <aside
        role="region"
        aria-label="Mobile Emergency Hotline"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl flex items-center justify-between gap-3 font-mono"
      >
        <div>
          <div className="text-[11px] font-bold text-white leading-tight">
            24/7 {industryNoun.toUpperCase()} DISPATCH
          </div>
          <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ON FREQUENCY • &lt; 25 MIN</span>
          </div>
        </div>

        <a
          href={`tel:${cleanPhone}`}
          id="sticky-mobile-phone-btn"
          className="px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-sm border border-white/15"
          style={{ backgroundColor: primaryColor }}
        >
          <Phone className="w-3.5 h-3.5 animate-pulse" />
          <span>Call: {phone}</span>
        </a>
      </aside>
    </div>
  );
}

export default UrgentService;
