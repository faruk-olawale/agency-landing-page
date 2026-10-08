"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "@/lib/archetypeMap";
import { CaseResultsVault } from "./professional/CaseResultsVault";
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
  ShieldAlert,
  ChevronRight,
  FileKey,
  BadgeCheck,
} from "lucide-react";

/**
 * Dynamic Helper:
 * Normalizes industry strings for high-authority legal & financial firms.
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
    return "Legal Counsel";
  }
  return "Legal Counsel";
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

  // Dynamic Theme Colors: Classic High-Trust Navy
  const primaryColor =
    clientData.primaryColor ||
    clientData.colors?.primary ||
    "#0F172A"; // Deep Navy default

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
          title: "Corporate & Commercial Litigation",
          subtitle: "Governance, M&A & Enterprise Defense",
          description:
            "High-stakes contract disputes, corporate acquisitions, partnership dissolution, and fiduciary governance for regional enterprises.",
          stat: "$50M+ Preserved",
          icon: Briefcase,
        },
        {
          title: "High-Exposure Civil Defense",
          subtitle: "Courtroom Trials & Appellate Representation",
          description:
            "Aggressive representation in commercial lawsuits, catastrophic liability claims, and shareholder disputes in state and federal court.",
          stat: "100+ Verdicts Won",
          icon: Scale,
        },
        {
          title: "White-Collar & Regulatory Defense",
          subtitle: "Agency Inquiries & Government Investigations",
          description:
            "Defending business executives against aggressive regulatory enforcement actions, subpoenas, and compliance inquiries.",
          stat: "Zero Indictment Record",
          icon: ShieldAlert,
        },
        {
          title: "Asset Protection & Trust Structuring",
          subtitle: "Fiduciary Risk Shields & Generational Wealth",
          description:
            "Wealth preservation architectures designed to shield high-net-worth generational assets from creditor vulnerability.",
          stat: "100% Asset Shielding",
          icon: FileKey,
        },
      ];

  const authorityLogos = [
    { name: "Forbes", label: "Forbes" },
    { name: "The Wall Street Journal", label: "THE WALL STREET JOURNAL" },
    { name: "Bloomberg", label: "Bloomberg" },
    { name: "Reuters", label: "REUTERS" },
    { name: "Financial Times", label: "FINANCIAL TIMES" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white pb-16 sm:pb-0">
      {/* ──────────────────────────────────────────────────────────────────────
          1. HEADER (Prestigious, Dignified, High-Trust)
      ────────────────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Company Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-slate-900 block leading-tight">
                {companyName}
              </span>
              <span className="text-xs font-semibold text-slate-500 block">
                {industryNoun} • {city} Office
              </span>
            </div>
          </div>

          {/* Right: Phone & Consultation */}
          <div className="flex items-center gap-4 text-right">
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-slate-700">
                Confidential Case Review
              </span>
              <span className="text-[11px] text-slate-500">
                Direct Senior Partner Access
              </span>
            </div>
            {phone && (
              <a
                href={`tel:${cleanPhone}`}
                id="header-phone-link"
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-xl transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          2. HERO SECTION (Clean Split Layout: Authority Left, Privileged Intake Right)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-50 border-b border-slate-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ── Left Column: Authority & Reputation ─────────────────────── */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Credibility Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold mb-6 w-fit shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Confidential Client Intake Active • {city}</span>
              </div>

              {/* Serif Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12] mb-6">
                Experienced {industryNoun} Counsel Serving {city}.
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-8 font-normal">
                Protecting your enterprise and high-stakes interests with seasoned courtroom representation
                and strategic advisory. Over $50M in client assets preserved with total discretion.
              </p>

              {/* 4 Proof Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Senior Partner Directly Assigned</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Strict Attorney-Client Privilege</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25+ Years of Courtroom Precedent</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Guaranteed 2-Hour Response Time</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-snug">
                      {isCpa ? "Top 100 Financial CPAs" : "Top 100 Trial Lawyers"}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Peer Recognized
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-snug">
                      {isCpa ? "AICPA Board Certified" : "State Bar Standing"}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Good Standing
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-snug">
                      {isCpa ? "5.0 Advisory Rating" : "AV Preeminent Rated"}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Highest Ethical Standard
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Confidential Intake Card ─────────────────── */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded">
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                    <span>Confidential Case Review</span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>Privileged Channel</span>
                  </span>
                </div>

                <div className="mb-5">
                  <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
                    Schedule a Confidential Consultation
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct partner evaluation. Zero financial obligation.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        Privileged Inquiry Received
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Assigned to our {city} Managing Senior Partner
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700">Client:</span>
                        <span>{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700">Matter:</span>
                        <span>{formData.matterType}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                      Your inquiry has been placed under immediate confidential review.
                      Our senior counsel will contact you at {formData.phone} within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Legal Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Henderson"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Direct Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Confidential Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. robert@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Matter Classification
                      </label>
                      <select
                        value={formData.matterType}
                        onChange={(e) => setFormData({ ...formData, matterType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
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

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Brief Situation Summary
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Key timeline, exposure magnitude, or matters requiring review..."
                        value={formData.situation}
                        onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-white text-sm bg-slate-900 hover:bg-slate-800 transition active:scale-98 cursor-pointer mt-2 shadow-sm"
                    >
                      Request Privileged Case Evaluation
                    </button>

                    <p className="text-[11px] text-center text-slate-500 pt-1">
                      Protected by {isCpa ? "Fiduciary Privilege" : "Attorney-Client Privilege"}.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          3. RECOGNITION & MEDIA STRIP
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Recognized & Cited In</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3 opacity-60">
            {authorityLogos.map((logo, idx) => (
              <span
                key={idx}
                className="font-serif text-sm sm:text-base font-bold text-slate-700"
              >
                {logo.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. PRACTICE AREAS / CORE EXPERTISE
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3 inline-block">
            Practice Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-3">
            Core Practice Specialties
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Representing corporations, private investors, and individuals with
            uncompromising precision, discretion, and strategic depth across {city}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practiceAreas.map((area, index) => {
            const IconComp = area.icon;

            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      {area.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">
                    {area.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    {area.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {area.description}
                  </p>
                </div>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Consult With Practice Lead</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5. CASE RESULTS VAULT (Verified Outcomes)
      ────────────────────────────────────────────────────────────────────── */}
      <CaseResultsVault
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="light"
      />
    </div>
  );
}

export default ProfessionalTrust;
