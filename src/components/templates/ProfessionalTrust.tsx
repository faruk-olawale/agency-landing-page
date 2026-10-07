"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "@/lib/archetypeMap";
import { InfiniteReviewMarquee, MasonryProofGallery } from "@/components/universal";
import { AnimatedCounter, CaseResultsVault } from "./professional";
import {
  Scale,
  Briefcase,
  Calculator,
  FileText,
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  Lock,
  Phone,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  FileKey,
  BadgeAlert,
} from "lucide-react";

/**
 * Dynamic Helper:
 * Normalizes industry strings for high-authority legal & financial firms.
 * If lawyer -> "Legal Defense", If cpa -> "Financial & Tax".
 */
function formatIndustryNoun(industry: string = ""): string {
  const norm = (industry || "").toLowerCase().trim();
  if (
    norm.includes("cpa") ||
    norm.includes("account") ||
    norm.includes("tax") ||
    norm.includes("bookkeep")
  ) {
    return "Financial & Tax";
  }
  if (
    norm.includes("law") ||
    norm.includes("legal") ||
    norm.includes("attorney") ||
    norm.includes("solicitor")
  ) {
    return "Legal Defense";
  }
  return "Legal Defense";
}

export function ProfessionalTrust({ clientData }: TemplateProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    matterType: "Corporate / Commercial",
    situation: "",
  });

  // Extract dynamic client data
  const companyName =
    clientData.name || clientData.company || "Prestige Advisory Partners";
  const rawIndustry = clientData.industry || clientData.niche || "lawyer";
  const industryNoun = formatIndustryNoun(rawIndustry);
  const isCpa = industryNoun === "Financial & Tax";
  const city = clientData.city || "Metropolitan Area";
  const phone = clientData.phone || "(212) 555-0188";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // Dynamic Theme Colors
  const primaryColor =
    clientData.primaryColor ||
    clientData.colors?.primary ||
    "#1E3A8A"; // Deep Navy/Royal Blue default
  const secondaryColor =
    clientData.secondaryColor ||
    clientData.colors?.secondary ||
    "#0F172A";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Practice Areas tailored to niche
  const practiceAreas = isCpa
    ? [
        {
          title: "Corporate Tax Strategy",
          subtitle: "Mergers, Entity Structuring & Growth",
          description:
            "Strategic advisory on corporate restructurings, multi-entity tax optimizations, and capitalization models to protect earnings.",
          stat: "$2.1M Avg Savings",
          icon: Briefcase,
        },
        {
          title: "IRS Audit & Controversy",
          subtitle: "Audit Shield & Penalty Abatement",
          description:
            "Relentless defense against federal and state revenue audits, unfiled returns, offer in compromise, and payroll tax levies.",
          stat: "99.4% Penalty Dismissals",
          icon: Calculator,
        },
        {
          title: "Forensic Accounting",
          subtitle: "Asset Discovery & Expert Witness",
          description:
            "Courtroom-admissible forensic tracing, hidden asset discovery, and partner dispute valuations for high-stakes litigation.",
          stat: "Court-Certified Reports",
          icon: Scale,
        },
        {
          title: "GAAP & SEC Compliance",
          subtitle: "Fiduciary Reviews & Financial Audits",
          description:
            "Full-scale financial statement reviews, compilations, and rigorous risk assessments ensuring clean regulatory compliance.",
          stat: "Zero-Deficiency Audits",
          icon: FileText,
        },
      ]
    : [
        {
          title: "Corporate & Commercial Law",
          subtitle: "Governance, M&A & Enterprise Defense",
          description:
            "High-stakes contract disputes, corporate acquisitions, partnership dissolution, and fiduciary governance for regional enterprises.",
          stat: "$50M+ Preserved",
          icon: Briefcase,
        },
        {
          title: "High-Exposure Civil Litigation",
          subtitle: "Courtroom Trials & Appellate Defense",
          description:
            "Aggressive courtroom representation in commercial lawsuits, catastrophic liability claims, and shareholder disputes in state and federal court.",
          stat: "100+ Verdicts Won",
          icon: Scale,
        },
        {
          title: "White-Collar & Regulatory Defense",
          subtitle: "Agency Inquiries & Government Investigations",
          description:
            "Defending business executives against aggressive DOJ, SEC, and agency enforcement actions, subpoenas, and compliance inquiries.",
          stat: "Zero Indictment Record",
          icon: ShieldAlert,
        },
        {
          title: "Asset Protection & Trust Structuring",
          subtitle: "Fiduciary Risk Shields & Generational Wealth",
          description:
            "Bulletproof wealth preservation architectures designed to shield high-net-worth generational assets from creditor vulnerability.",
          stat: "100% Asset Shielding",
          icon: FileKey,
        },
      ];

  // Authority media recognition logos
  const authorityLogos = [
    { name: "Forbes", label: "Forbes", quote: "Top Regional Legal & Financial Counsel" },
    { name: "The Wall Street Journal", label: "THE WALL STREET JOURNAL.", quote: "Recognized for High-Stakes Corporate Representation" },
    { name: "Bloomberg", label: "Bloomberg", quote: "Industry Leaders in Commercial Asset Protection" },
    { name: "Reuters", label: "REUTERS", quote: "Trusted Defense in Complex Regulatory Matters" },
    { name: "Financial Times", label: "FINANCIAL TIMES", quote: "Premier Advisors for Strategic Corporate Growth" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. HEADER (Professional & Subdued)
          Left: Company Name/Logo
          Right: "Schedule a Confidential Consultation" & Phone
      ────────────────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Company Name / Logo */}
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md border border-white/10 shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white block leading-tight">
                {companyName}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                {industryNoun} Counsel • {city} Office
              </span>
            </div>
          </div>

          {/* Right: Subdued Consultation Text & Subtle Phone Number */}
          <div className="flex items-center gap-4 text-right">
            <div className="hidden md:flex flex-col">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold">
                Schedule a Confidential Consultation
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Direct Senior Partner Access • Strict Privilege
              </span>
            </div>
            {phone && (
              <a
                href={`tel:${cleanPhone}`}
                id="header-phone-link"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold font-mono text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{phone}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          2. HERO SECTION (Split Layout)
          Clean premium background (deep slate/navy)
          Left: Massive Serif H1, Subheadline, 3 Trust Badges
          Right: Elevated white confidential consultation intake card
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60 overflow-hidden py-14 lg:py-20">
        {/* Subtle executive architectural backdrop overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ── Left Side (Authority & Social Proof) ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col justify-center text-left"
            >
              {/* Live Intake Availability Ticker */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 text-xs font-mono uppercase tracking-widest mb-6 w-fit shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Q4 Confidential Intake Active • {city} Practice</span>
              </div>

              {/* Headline (H1, Serif Font) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-6">
                Voted #1 {industryNoun} Firm in {city}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal">
                Protecting your future with aggressive, experienced representation.
                Over $50M recovered and preserved for our clients with total discretion.
              </p>

              {/* Key Proof Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-xl">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Senior Partner Assigned Directly</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict Confidential Privilege</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pre-Trial & Trial Depth</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Rapid 2-Hour Response Time</span>
                </div>
              </div>

              {/* Trust Badges: 3 small side-by-side badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
                {/* Badge 1 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block leading-snug">
                      {isCpa ? "Top 100 Financial CPAs" : "Top 100 Trial Lawyers"}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      National Recognition
                    </span>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block leading-snug">
                      {isCpa ? "AICPA Board Certified" : "Local Bar Association"}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Standing in Good Order
                    </span>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Star className="w-5 h-5 fill-emerald-400/30" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block leading-snug">
                      {isCpa ? "5-Star Advisory Rating" : "Avvo Rated 10.0 Superb"}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Peer & Client Endorsed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right Side (The Elevated Confidential Lead Form) ────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100 relative">
                {/* 256-Bit SSL Encryption Banner */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded">
                    <Lock className="w-3.5 h-3.5 text-blue-800" />
                    <span>256-Bit Encrypted Intake</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active Review</span>
                  </span>
                </div>

                <div className="mb-5">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
                    Schedule a Confidential Consultation
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct Senior Partner evaluation. Absolutely zero financial obligation.
                  </p>
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <Check className="w-9 h-9 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        Privileged Intake Received
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-1">
                        Confirmation Ref: CONF-{(Math.random() * 10000).toFixed(0).padStart(4, "0")}-SEC
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700">Client Inquirer:</span>
                        <span>{formData.fullName || "Confidential Client"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700">Jurisdiction:</span>
                        <span>{city} Practice</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700">Assigned Reviewer:</span>
                        <span className="text-blue-700 font-semibold">Managing Senior Partner</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                      Your inquiry has been placed under immediate confidential review.
                      Our senior counsel will contact you directly within 2 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Legal Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Vance"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Direct Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Confidential Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. robert@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>

                    {/* Matter Classification Dropdown */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Matter Classification
                      </label>
                      <select
                        value={formData.matterType}
                        onChange={(e) =>
                          setFormData({ ...formData, matterType: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      >
                        <option value="Corporate / Commercial">
                          {isCpa ? "Corporate Tax & Restructuring" : "Commercial & Corporate Law"}
                        </option>
                        <option value="Audit & Controversy">
                          {isCpa ? "IRS Audit Shield & Controversy" : "High-Exposure Civil Litigation"}
                        </option>
                        <option value="Forensic / Criminal">
                          {isCpa ? "Forensic Accounting & Valuation" : "White-Collar & Regulatory Defense"}
                        </option>
                        <option value="Asset Shielding">
                          {isCpa ? "High Net Worth Wealth Preservation" : "Trusts & Asset Protection"}
                        </option>
                      </select>
                    </div>

                    {/* Textarea: Briefly describe your situation */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Briefly Describe Your Situation
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Key timeline, exposure magnitude, or matters requiring review..."
                        value={formData.situation}
                        onChange={(e) =>
                          setFormData({ ...formData, situation: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                      />
                    </div>

                    {/* Button: Secure Your Consultation colored in clientData.primaryColor */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      id="submit-consultation-btn"
                      className="w-full inline-flex items-center justify-center gap-2 text-white font-bold py-3.5 px-6 rounded-lg text-sm sm:text-base shadow-xl transition-all duration-200 hover:brightness-110 active:scale-[0.98] mt-2 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Lock className="w-4 h-4" />
                      <span>Request Confidential Consultation</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.button>

                    <p className="text-[11px] text-center text-slate-500 pt-1.5 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>
                        Protected by {isCpa ? "CPA-Client Fiduciary Privilege" : "Attorney-Client Privilege"}
                      </span>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          3. AS SEEN IN / AUTHORITY BAR (Grayscale Media Strip)
          Recognized in top financial & legal media
      ────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Media and Recognition"
        className="w-full bg-slate-900/95 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 shrink-0 font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Recognized & Featured In</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {authorityLogos.map((logo, idx) => (
              <span
                key={idx}
                title={logo.quote}
                className="font-serif text-sm sm:text-base font-bold tracking-tight text-slate-400 hover:text-white transition-colors select-none cursor-default"
              >
                {logo.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. ANIMATED NUMBER COUNTERS (Data-Driven Authority)
          $50M+ Recovered / 99.2% Success Rate / 25+ Years / < 24 Hr Response
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCounter
            prefix="$"
            value={50}
            suffix="M+"
            label={isCpa ? "Tax Savings Recovered" : "Recovered For Clients"}
            sublabel="Direct financial settlements & audit deficiencies reduced"
            badge="Audited Figures"
            primaryColor={primaryColor}
          />
          <AnimatedCounter
            value={99.2}
            suffix="%"
            decimals={1}
            label="Matter Success Rate"
            sublabel="Pre-trial settlements, verdicts & agency dismissals"
            badge="Verified Precedent"
            primaryColor={primaryColor}
          />
          <AnimatedCounter
            value={25}
            suffix="+"
            label={`Years Serving ${city}`}
            sublabel="Unbroken track record of aggressive advocacy"
            badge="Senior Partners"
            primaryColor={primaryColor}
          />
          <AnimatedCounter
            value={24}
            prefix="< "
            suffix=" Hr"
            label="Confidential Response"
            sublabel="Direct partner evaluation with priority case scheduling"
            badge="Guaranteed SLA"
            primaryColor={primaryColor}
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5. PRACTICE AREAS / EXPERTISE GRID (Staggered Animations)
          2x2 Grid of High-Authority Practice Areas
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border"
            style={{
              color: primaryColor === "#1E3A8A" ? "#60A5FA" : primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <span>Core Practice Specialties</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Practice Areas & Expertise
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Representing corporations, private investors, and individuals with
            uncompromising precision, discretion, and strategic rigor in {city}.
          </p>
        </div>

        {/* 2x2 Grid of High-Authority Practice Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practiceAreas.map((area, index) => {
            const IconComp = area.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-8 transition-all duration-300 hover:bg-slate-900/90 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        borderColor: `${primaryColor}30`,
                        color: primaryColor === "#1E3A8A" ? "#60A5FA" : primaryColor,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {area.stat}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4">
                    {area.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {area.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    Senior Partner Led
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("submit-consultation-btn");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1 transition-colors group-hover:text-blue-400 cursor-pointer"
                  >
                    <span>Request Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          6. CASE RESULTS / FINANCIAL WINS GRID (Verified Settlements)
          3-Column data-driven grid with outcome badges & modal inspection
      ────────────────────────────────────────────────────────────────────── */}
      <CaseResultsVault
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        isCpa={isCpa}
      />

      {/* ──────────────────────────────────────────────────────────────────────
          7. 3-STEP CONFIDENTIAL INTAKE WORKFLOW
          Reassures cautious clients of absolute security & immediate action
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block mb-2">
            The Consultation Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            How We Handle Your Matter
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm mb-4">
              01
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Confidential Intake & Conflict Check
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your inquiry is scrubbed for conflicts of interest within 60 minutes.
              Immediate privilege applies to all communication before any commitment.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm mb-4">
              02
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Strategic Exposure Analysis
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A managing senior partner reviews your documentation and formulates
              an aggressive tactical roadmap with quantifiable risk modeling.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm mb-4">
              03
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Decisive Execution & Protection
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We deploy seasoned trial litigation or technical tax defense procedures
              to insulate your assets and force optimal terms.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          8. CASE RESULTS & DOCUMENTATION PROOF VAULT
      ────────────────────────────────────────────────────────────────────── */}
      <MasonryProofGallery
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="dark"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          9. CLIENT RESOLUTIONS & VERIFIED REVIEWS MARQUEE
      ────────────────────────────────────────────────────────────────────── */}
      <InfiniteReviewMarquee
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="dark"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          10. FINAL CALL TO ACTION (Executive Banner)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-700/80 text-center"
          style={{
            background: `linear-gradient(135deg, ${secondaryColor} 0%, #020617 100%)`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />

          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block mb-3">
            Immediate Senior Partner Representation
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4 max-w-3xl mx-auto">
            Do Not Wait Until Exposure Escalates in {city}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every day of delay grants opposing counsel or regulatory examiners the tactical advantage.
            Protect your assets and future with immediate seasoned counsel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => {
                const el = document.getElementById("submit-consultation-btn");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl text-base shadow-xl transition-all duration-200 hover:brightness-110 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Lock className="w-4 h-4" />
              <span>Schedule Confidential Intake</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.button>

            {phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-slate-200 hover:text-white font-mono font-semibold py-3.5 px-6 rounded-xl text-base bg-slate-900 border border-slate-700 hover:bg-slate-800 transition shadow-sm"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call {phone}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          11. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-white font-serif font-bold text-xs shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-slate-300 text-sm block">
                {companyName}
              </span>
              <span className="text-[11px] text-slate-500">
                {industryNoun} Counsel • {city} Office
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 max-w-md leading-relaxed">
            The information provided on this site does not constitute formal legal
            or financial counsel. An attorney-client or fiduciary relationship is
            formed solely upon execution of a mutual engagement retainer.
          </p>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-xs">
            <span>Privileged & Confidential</span>
            <span>•</span>
            <a
              href={`tel:${cleanPhone}`}
              className="text-white hover:underline font-bold"
            >
              {phone}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfessionalTrust;
