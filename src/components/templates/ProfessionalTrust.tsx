"use client";

import React, { useState } from "react";
import type { TemplateProps } from "@/lib/archetypeMap";
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
          title: "Corporate Strategy",
          subtitle: "Mergers, Entity Structuring & Growth",
          description:
            "Strategic advisory on corporate restructurings, multi-entity tax optimizations, and capitalization models.",
          icon: Briefcase,
        },
        {
          title: "Tax Defense",
          subtitle: "IRS Representation & Audit Shield",
          description:
            "Aggressive resolution of federal and state audits, unfiled returns, offer in compromise, and payroll tax disputes.",
          icon: Calculator,
        },
        {
          title: "Civil Litigation",
          subtitle: "Forensic Accounting & Expert Witness",
          description:
            "Detailed asset discovery, forensic tracing, and courtroom-admissible valuation audits for complex legal disputes.",
          icon: Scale,
        },
        {
          title: "Regulatory Compliance",
          subtitle: "GAAP Audits & SEC Standards",
          description:
            "Full-scale financial statement reviews, compilations, and rigorous risk assessments ensuring regulatory compliance.",
          icon: FileText,
        },
      ]
    : [
        {
          title: "Corporate Strategy",
          subtitle: "Governance, M&A & Commercial Contracts",
          description:
            "High-stakes contract negotiations, corporate acquisitions, partner disputes, and bulletproof fiduciary structuring.",
          icon: Briefcase,
        },
        {
          title: "Civil Litigation",
          subtitle: "High-Exposure Courtroom Defense",
          description:
            "Aggressive courtroom representation in commercial lawsuits, catastrophic injury claims, and shareholder disputes.",
          icon: Scale,
        },
        {
          title: "Tax Defense",
          subtitle: "White Collar & Regulatory Enforcement",
          description:
            "Defending business owners and executives against aggressive agency inquiries, IRS investigations, and compliance actions.",
          icon: Calculator,
        },
        {
          title: "Asset Protection",
          subtitle: "Trusts, Estates & Risk Shielding",
          description:
            "Comprehensive wealth preservation architectures designed to shield generational assets from creditor vulnerability.",
          icon: FileText,
        },
      ];

  // Authority logos for the "As Seen In" bar
  const authorityLogos = [
    { name: "Forbes", label: "Forbes" },
    { name: "The Wall Street Journal", label: "THE WALL STREET JOURNAL." },
    { name: "Bloomberg", label: "Bloomberg" },
    { name: "Reuters", label: "REUTERS" },
    { name: "Financial Times", label: "FINANCIAL TIMES" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. HEADER (Professional & Subdued)
          Left: Company Name/Logo
          Right: Text saying "Schedule a Confidential Consultation" & Phone
      ────────────────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Company Name / Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md border border-white/10"
              style={{ backgroundColor: primaryColor }}
            >
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white block leading-tight">
                {companyName}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                {industryNoun} Specialists • {city}
              </span>
            </div>
          </div>

          {/* Right: Subdued Consultation Text & Subtle Phone Number */}
          <div className="flex items-center gap-4 text-right">
            <div className="hidden md:flex flex-col">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Schedule a Confidential Consultation
              </span>
              <span className="text-xs text-slate-500">
                Direct Senior Partner Access
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
          Right: White elevated lead form overlapping the hero
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60 overflow-hidden py-16 lg:py-24">
        {/* Subtle executive architectural backdrop overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ── Left Side (Authority) ─────────────────────────────────── */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Practice Location Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-blue-300 text-xs font-mono uppercase tracking-widest mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Private Client & Corporate Practice • {city}</span>
              </div>

              {/* Headline (H1, Serif Font) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-6">
                Voted #1 {industryNoun} Firm in {city}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal">
                Protecting your future with aggressive, experienced representation.
                Over $50M recovered for our clients.
              </p>

              {/* Trust Badges: 3 small side-by-side badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
                {/* Badge 1 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
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
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
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
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
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
            </div>

            {/* ── Right Side (The Lead Form) ────────────────────────────── */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100 relative">
                {/* Header of Form */}
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded mb-2">
                    <Lock className="w-3 h-3 text-blue-800" />
                    <span>Confidential Intake Form</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">
                    Request a Free Consultation
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct attorney review. Zero financial obligation.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Consultation Request Received
                    </h3>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                      Thank you, {formData.fullName || "valued client"}. Our senior
                      partner in {city} will review your inquiry and contact you
                      confidentially within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Vance"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rvance@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>

                    {/* Textarea: Briefly describe your situation */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Briefly describe your situation
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Please summarize key dates, exposure, or matters requiring review..."
                        value={formData.situation}
                        onChange={(e) =>
                          setFormData({ ...formData, situation: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                      />
                    </div>

                    {/* Button: Secure Your Consultation colored in clientData.primaryColor */}
                    <button
                      type="submit"
                      id="submit-consultation-btn"
                      className="w-full inline-flex items-center justify-center gap-2 text-white font-bold py-3.5 px-6 rounded-lg text-base shadow-lg transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] mt-2 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Lock className="w-4 h-4" />
                      <span>Secure Your Consultation</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                    <p className="text-[11px] text-center text-slate-500 pt-2 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>
                        Protected by {isCpa ? "CPA-Client Privilege" : "Attorney-Client Privilege"}
                      </span>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          3. AS SEEN IN / AUTHORITY BAR (Grayscale Logo Strip)
          Directly under hero section to establish immediate credibility
      ────────────────────────────────────────────────────────────────────── */}
      <section
        aria-label="Media and Recognition"
        className="w-full bg-slate-900/90 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 shrink-0 font-semibold">
            Recognized & Featured In
          </span>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {authorityLogos.map((logo, idx) => (
              <span
                key={idx}
                className="font-serif text-sm sm:text-base font-bold tracking-tight text-slate-400 hover:text-white transition-colors select-none"
              >
                {logo.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. PRACTICE AREAS / EXPERTISE GRID (2x2 or 3-Column Grid)
          Lucide icons (Scale, Briefcase, Calculator, FileText) colored in primaryColor
          Card titles like: "Corporate Strategy", "Civil Litigation", "Tax Defense"
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
              <div
                key={index}
                className="group relative bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:bg-slate-900/90 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-13 h-13 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        borderColor: `${primaryColor}30`,
                        color: primaryColor === "#1E3A8A" ? "#60A5FA" : primaryColor,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-mono text-slate-500 font-semibold uppercase tracking-wider">
                      Area 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
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
                    Senior Partner Handled
                  </span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5. CREDENTIALS & STATS STRIP
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900/80 border-y border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
              $50M+
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
              {isCpa ? "Tax Savings Recovered" : "Recovered For Clients"}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
              99.2%
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
              Case Success Rate
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
              25+
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
              Years Serving {city}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
              24 Hr
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
              Confidential Response
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          6. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-white font-serif font-bold text-xs"
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
