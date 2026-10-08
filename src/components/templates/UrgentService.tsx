"use client";

import React, { useState } from "react";
import type { TemplateProps } from "@/lib/archetypeMap";
import {
  getArchetypePrimaryColor,
  getArchetypeSecondaryColor,
} from "@/lib/archetypeMap";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteReviewMarquee, MasonryProofGallery } from "@/components/universal";
import { EmergencyTriageGuide } from "./urgent/EmergencyTriageGuide";
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
  Calendar,
  Lock,
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
        title: "Burst Pipes & Water Leaks",
        subtitle: "Rapid Leak Detection & Pipe Freezing",
        description:
          "Immediate emergency isolation of burst mains, ceiling leaks, and wall leaks. We carry commercial pipe-freezing clamps and high-grade PEX lines on all vehicles.",
        features: ["Under 30-min emergency response", "Non-destructive acoustic leak detection", "Lifetime workmanship guarantee"],
        icon: AlertTriangle,
      },
      {
        title: "Blocked Drains & Sewer Jetting",
        subtitle: "CCTV Camera Inspection & Hydro-Jetting",
        description:
          "High-definition fiber-optic drain camera inspection and 5000 PSI hydro-jetting to permanently clear tree roots, grease, and collapsed lines without digging up your yard.",
        features: ["Full CCTV video report provided", "Zero excavation drain clearing", "Permanent root barrier treatment"],
        icon: Zap,
      },
      {
        title: "Hot Water System Replacements",
        subtitle: "Same-Day Gas, Electric & Heat Pump Supply",
        description:
          "Emergency supply and installation of leading brand hot water systems. We replace failed tanks on the exact same day so your family is never left without hot water.",
        features: ["Same-day emergency installation", "Rheem, Rinnai, Dux & Bosch in stock", "Old tank removal & eco-disposal"],
        icon: Wrench,
      },
    ];
  }

  if (norm.includes("hvac")) {
    return [
      {
        title: "Emergency AC & Heating Repairs",
        subtitle: "Frozen Coils & Blower Motor Fixes",
        description:
          "Immediate 24/7 dispatch for sudden compressor lockups, frozen lines, and failed heating systems during peak extreme weather.",
        features: ["Universal truck parts stock", "All major manufacturers serviced", "Clear flat-rate diagnostic quote"],
        icon: AlertTriangle,
      },
      {
        title: "Complete System Replacement",
        subtitle: "High-Efficiency Inverter & Heat Pumps",
        description:
          "Code-compliant replacement of obsolete heating and cooling units with whisper-quiet, energy-star certified systems.",
        features: ["Up to 30% lower energy bills", "10-year manufacturer warranty", "Precision ductwork airflow balance"],
        icon: Zap,
      },
      {
        title: "Safety Audits & Tune-Ups",
        subtitle: "Refrigerant & Carbon Monoxide Checks",
        description:
          "Comprehensive multi-point mechanical inspection to ensure air quality, leak prevention, and peak seasonal efficiency.",
        features: ["Carbon monoxide safety test", "Deep coil antimicrobial clean", "Thermostat calibration"],
        icon: Wrench,
      },
    ];
  }

  // Default trade service trio
  return [
    {
      title: "24/7 Emergency Repairs",
      subtitle: "Immediate Rapid Response Dispatch",
      description:
        "Emergency triage and immediate on-site repair for sudden breakdowns, hazardous failures, and critical property restoration.",
      features: ["On-call 24 hours a day", "Fully equipped service vehicles", "Upfront quote before we begin"],
      icon: AlertTriangle,
    },
    {
      title: "System Replacements & Upgrades",
      subtitle: "Residential & Commercial Installations",
      description:
        "Code-compliant, certified replacements executed with premium-grade components and comprehensive warranties.",
      features: ["Certified master tradesmen", "Full equipment warranty", "Guaranteed workmanship"],
      icon: Zap,
    },
    {
      title: "Preventative Maintenance",
      subtitle: "Multi-Point Safety & Health Inspections",
      description:
        "Thorough diagnostic testing to prevent catastrophic failures and extend the operational life of your building systems.",
      features: ["Detailed health checklist", "Clear photographic report", "Priority maintenance scheduling"],
      icon: Wrench,
    },
  ];
}

export function UrgentService({ clientData }: TemplateProps) {
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    issueType: "Burst Pipe / Active Leak",
    address: "",
    phone: "",
  });

  const companyName = clientData.name || clientData.company || "Elite Emergency Plumbing";
  const rawIndustry = clientData.industry || clientData.niche || "plumber";
  const industryNoun = formatIndustryNoun(rawIndustry);
  const city = clientData.city || "Metropolitan Area";
  const phone = clientData.phone || "(02) 9555 0192";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const primaryColor =
    clientData.primaryColor ||
    clientData.colors?.primary ||
    getArchetypePrimaryColor(rawIndustry, "UrgentService");

  const secondaryColor =
    clientData.secondaryColor ||
    clientData.colors?.secondary ||
    getArchetypeSecondaryColor(rawIndustry, "UrgentService");

  const coreServices = getCoreServices(industryNoun);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900 pb-16 sm:pb-0">
      {/* ──────────────────────────────────────────────────────────────────────
          1. TOP UTILITY BAR (Clean, high-trust emergency indicator)
      ────────────────────────────────────────────────────────────────────── */}
      <aside
        role="region"
        aria-label="Emergency Dispatch Status"
        className="bg-slate-950 text-white px-4 py-2 border-b border-slate-800 text-xs"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-slate-200">
              24/7 Emergency Dispatch Active in {city}
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              Average On-Site Arrival: Under 30 Mins
            </span>
          </div>

          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-sky-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Emergency Hotline: {phone}</span>
          </a>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────────────────
          2. MAIN HEADER (Clean, bright, corporate trust)
      ────────────────────────────────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Company Identity */}
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                {companyName}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Licensed & Insured Master {industryNoun} • {city}
              </span>
            </div>
          </div>

          {/* Right Action: Call Button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Direct On-Duty Tradesmen
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Zero Callout Surcharge
              </span>
            </div>

            <a
              href={`tel:${cleanPhone}`}
              id="header-call-btn"
              className="inline-flex items-center gap-2 text-white font-bold px-5 py-3 rounded-xl shadow-sm transition-all hover:brightness-110 active:scale-98 text-sm sm:text-base"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          3. HERO SECTION (Split Layout: Authority Left, Instant Dispatch Right)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* ── Left Column: Authority & Fast Phone Dispatch ──────────── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Availability Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>On-Duty Technicians Ready in {city}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Fast 30-Min Arrival</span>
              </div>

              {/* Primary Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Emergency {industryNoun} in {city} — Fast, Reliable & Guaranteed.
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Burst pipes, blocked drains, or no hot water? Our certified master tradesmen
                arrive fully equipped in under 30 minutes with upfront flat-rate pricing.
                Zero hidden callout fees.
              </p>

              {/* Trust Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>30-Min Arrival Window</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Upfront Fixed Quotes</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>$20M Insured Work</span>
                </div>
              </div>

              {/* Big Direct Call Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`tel:${cleanPhone}`}
                  id="hero-call-now-btn"
                  className="inline-flex items-center justify-center gap-3 text-white font-extrabold px-8 py-4 rounded-xl text-lg sm:text-xl shadow-lg transition-all hover:brightness-110 active:scale-98"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Phone className="w-6 h-6" />
                  <span>Call Now: {phone}</span>
                </a>

                <div className="text-xs text-slate-500 flex flex-col justify-center">
                  <span className="font-bold text-slate-800">24/7 Live Emergency Line</span>
                  <span>Speak directly to an on-duty technician</span>
                </div>
              </div>
            </div>

            {/* ── Right Column: Instant Dispatch Card ───────────────────── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md inline-block mb-1.5">
                    Priority Online Request
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Request Immediate Dispatch
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Need urgent service? Submit below or call us for instant response.
                  </p>
                </div>

                {leadFormSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Dispatch Request Logged
                    </h3>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                      Thank you. Your request has been sent directly to our on-duty {city} team.
                      We will call you at <strong className="text-slate-800">{formData.phone}</strong> in under 5 minutes to confirm our technician&apos;s arrival.
                    </p>
                    <div className="pt-2">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Need faster help? Tap to call now</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        What is your emergency?
                      </label>
                      <select
                        value={formData.issueType}
                        onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option>Burst Pipe / Flooding Leak</option>
                        <option>Blocked Drain / Toilet Overflow</option>
                        <option>No Hot Water / Tank Leak</option>
                        <option>Gas Leak / Odor</option>
                        <option>General Urgent Repair</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Street Address or Suburb in {city} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 14 Elm Street or Suburb"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (04) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-white text-sm shadow-md transition-all hover:brightness-110 active:scale-98 cursor-pointer mt-2"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Request Rapid Technician Dispatch
                    </button>

                    <p className="text-[11px] text-center text-slate-400">
                      Zero upfront payment. All quotes approved in writing before work starts.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. CREDIBILITY ANCHORS BAR (Clean, high-contrast badges)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <BadgeCheck className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">Master Licensed</div>
              <div className="text-xs text-slate-500">Fully Certified Trades</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">$20,000,000 Insured</div>
              <div className="text-xs text-slate-500">Zero Homeowner Liability</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">Fixed Upfront Pricing</div>
              <div className="text-xs text-slate-500">No Hidden Callout Surcharges</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">4.9/5 Rating</div>
              <div className="text-xs text-slate-500">450+ Verified Local Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5. EMERGENCY TRIAGE & DAMAGE CONTROL GUIDE (Replaces fake chat)
      ────────────────────────────────────────────────────────────────────── */}
      <EmergencyTriageGuide
        industryNoun={industryNoun}
        city={city}
        companyName={companyName}
        phone={phone}
        primaryColor={primaryColor}
      />

      {/* ──────────────────────────────────────────────────────────────────────
          6. CORE SERVICES GRID (Clean, practical, authentic cards)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full mb-3 inline-block">
            Emergency & General Coverage
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Our Core Emergency Services
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            From midnight pipe bursts to full water heater replacements, our certified technicians
            provide guaranteed workmanship across all {city} suburbs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-slate-50 border border-slate-200">
                    <IconComponent className="w-6 h-6 text-sky-600" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-4">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call For {service.title.split("&")[0]}</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          7. THE PROMISE & GUARANTEE TABLE (CRO High-Trust Factor)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Why {city} Homeowners Choose {companyName}
            </h3>
            <p className="text-sm text-slate-600">
              Clear commitments that protect your home, wallet, and peace of mind.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="grid grid-cols-3 bg-slate-100/70 p-4 font-bold text-xs text-slate-700 uppercase tracking-wider border-b border-slate-200">
              <div>Service Guarantee</div>
              <div className="text-sky-700">{companyName}</div>
              <div className="text-slate-400">Typical Trade Brokers</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-slate-800">Fixed Upfront Quote</div>
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Guaranteed</span>
                </div>
                <div className="text-slate-500">Surprise invoice at the end</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-slate-800">Arrival Time Guarantee</div>
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Under 30 Minutes</span>
                </div>
                <div className="text-slate-500">Uncertain 4-hour window</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-slate-800">Certified Master Trades</div>
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>100% In-House Staff</span>
                </div>
                <div className="text-slate-500">Untracked subcontractors</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-slate-800">Workmanship Warranty</div>
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Lifetime Guarantee</span>
                </div>
                <div className="text-slate-500">30 days or none</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          8. REAL PROOF GALLERY & VERIFIED REVIEWS MARQUEE (Light Themes)
      ────────────────────────────────────────────────────────────────────── */}
      <MasonryProofGallery
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="light"
      />

      <InfiniteReviewMarquee
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="light"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          9. BOTTOM DIRECT ACTION CALLOUT
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
            24/7 Immediate Help Available
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Don&apos;t Let Water Damage Spread in Your {city} Home
          </h2>

          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Every minute counts during an active leak or sewer blockage. Our on-duty technicians
            are on the road right now.
          </p>

          <div className="pt-2">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-3 text-white font-extrabold px-8 py-4 rounded-xl text-lg sm:text-xl shadow-lg transition-all hover:brightness-110 active:scale-98"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone className="w-5 h-5" />
              <span>Call Direct: {phone}</span>
            </a>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-center gap-4 pt-2">
            <span>✓ No Overtime Charges</span>
            <span>•</span>
            <span>✓ Upfront Pricing</span>
            <span>•</span>
            <span>✓ Licensed Master {industryNoun}</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          10. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px]"
              style={{ backgroundColor: primaryColor }}
            >
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">{companyName}</span>
            <span>•</span>
            <span>24/7 Emergency {industryNoun} in {city}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>Master Trades</span>
            <span>•</span>
            <a
              href={`tel:${cleanPhone}`}
              className="text-slate-800 font-bold hover:underline"
            >
              {phone}
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────────────────
          11. STICKY MOBILE EMERGENCY HOTLINE BAR
      ────────────────────────────────────────────────────────────────────── */}
      <aside
        role="region"
        aria-label="Mobile Emergency Hotline"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white border-t border-slate-200 shadow-2xl flex items-center justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-bold text-slate-900 leading-tight">
            24/7 {industryNoun} Dispatch
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">
            Available Now • ~30 Min Arrival
          </div>
        </div>

        <a
          href={`tel:${cleanPhone}`}
          id="sticky-mobile-phone-btn"
          className="px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-sm"
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
