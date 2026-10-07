"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Building2,
  Lock,
  ChevronRight,
  ExternalLink,
  Filter,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

export interface CaseMatter {
  id: string;
  category: "commercial" | "tax" | "litigation" | "corporate";
  amount: string;
  amountLabel: string;
  outcomeType: string;
  outcomeColor: "emerald" | "blue" | "amber" | "purple";
  title: string;
  matterNumber: string;
  jurisdiction: string;
  timeline: string;
  clientType: string;
  summary: string;
  strategicHighlights: string[];
  citationNote: string;
}

interface CaseResultsVaultProps {
  industry: string;
  city: string;
  companyName: string;
  primaryColor?: string;
  isCpa?: boolean;
}

export function CaseResultsVault({
  industry,
  city,
  companyName,
  primaryColor = "#1E3A8A",
  isCpa = false,
}: CaseResultsVaultProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedMatter, setSelectedMatter] = useState<CaseMatter | null>(null);

  // Niche-specific case results library
  const legalMatters: CaseMatter[] = [
    {
      id: "law-1",
      category: "commercial",
      amount: "$4,850,000",
      amountLabel: "Pre-Trial Settlement",
      outcomeType: "Pre-Trial Settlement",
      outcomeColor: "emerald",
      title: "Commercial Contract Breach & Trade Secret Misappropriation",
      matterNumber: "Matter #2025-CV-8841-FED",
      jurisdiction: `${city} Federal District Court`,
      timeline: "Resolved in 5 Months",
      clientType: "Mid-Market Enterprise",
      summary:
        "Represented regional manufacturing conglomerate in breach of contract and intellectual property theft dispute against international vendor. Aggressive forensic discovery compelled high-figure pre-trial resolution.",
      strategicHighlights: [
        "Secured emergency preliminary injunction freezing infringing assets",
        "Uncovered deleted proprietary CAD schematics via digital forensic subpoena",
        "Negotiated 100% principal reimbursement plus ongoing patent licensing royalties",
      ],
      citationNote: "Confidential settlement agreement executed with court seal.",
    },
    {
      id: "law-2",
      category: "litigation",
      amount: "$2,400,000",
      amountLabel: "Trial Jury Verdict",
      outcomeType: "Trial Jury Verdict",
      outcomeColor: "emerald",
      title: "High-Exposure Commercial Fleet Liability & Catastrophic Defense",
      matterNumber: "Matter #2024-TX-0492-DIST",
      jurisdiction: `${city} County Superior Court`,
      timeline: "Full 7-Day Jury Trial",
      clientType: "Regional Logistics Operator",
      summary:
        "Defended commercial logistics fleet facing an initial $14M multi-party exposure. Leveraged accident reconstruction telemetry and cross-examination to defeat punitive damages and secure favorable verdict within policy reserves.",
      strategicHighlights: [
        "Excluded opposing expert testimony under Daubert challenge guidelines",
        "Demonstrated telematics compliance within 0.2 seconds of incident trigger",
        "Preserved corporate operating balance sheet from piercing of corporate veil",
      ],
      citationNote: "Final Judgment entered; zero post-trial appeals pending.",
    },
    {
      id: "law-3",
      category: "litigation",
      amount: "$1,820,000",
      amountLabel: "Arbitration Award",
      outcomeType: "Arbitration Award",
      outcomeColor: "purple",
      title: "Fiduciary Shareholder Freeze-Out & Buyout Valuation",
      matterNumber: "Matter #2025-AAA-1049-ARB",
      jurisdiction: "American Arbitration Association",
      timeline: "Binding Arbitration",
      clientType: "Founding Equity Partner",
      summary:
        "Advocated on behalf of minority equity founder unlawfully excluded from board decisions and revenue dividends. Secured forensic fair-market enterprise valuation and full cash buyout award.",
      strategicHighlights: [
        "Identified $1.1M in disguised executive distributions to majority owners",
        "Enforced strict statutory buy-sell remedies under Delaware General Corporation Law",
        "Recovered 100% attorney fee disbursements under shareholder agreement clause",
      ],
      citationNote: "Arbitrator's Final Award confirmed by district court decree.",
    },
    {
      id: "law-4",
      category: "commercial",
      amount: "$1,150,000",
      amountLabel: "Contract Recovery",
      outcomeType: "Structured Recovery",
      outcomeColor: "blue",
      title: "Supply Chain Default & Cross-Border Sovereign Enforcement",
      matterNumber: "Matter #2024-CV-3184",
      jurisdiction: `${city} Commercial Division`,
      timeline: "4 Months to Recovery",
      clientType: "Healthcare Distribution Group",
      summary:
        "Recovered substantial non-delivery losses for healthcare distributor when foreign supplier defaulted on PPE and medical hardware delivery contracts.",
      strategicHighlights: [
        "Attached domestic escrow accounts prior to transfer of funds overseas",
        "Invoked UCC Article 2 repudiation protections with statutory interest",
        "Full recovery achieved without protracted international litigation",
      ],
      citationNote: "Consent order and release of claims signed by all parties.",
    },
    {
      id: "law-5",
      category: "tax",
      amount: "$920,000",
      amountLabel: "Exposure Defeated",
      outcomeType: "Complete Dismissal",
      outcomeColor: "emerald",
      title: "White-Collar Regulatory Inquiry & Enforcement Defense",
      matterNumber: "Matter #2024-ENF-7718",
      jurisdiction: "Department of Justice & SEC Regional Office",
      timeline: "Closed Without Indictment",
      clientType: "Executive C-Suite Officer",
      summary:
        "Defended senior corporate officer targeted in aggressive federal parallel inquiry alleging securities disclosure irregularities. Conducted independent internal review leading to immediate declination of charges.",
      strategicHighlights: [
        "Delivered proactive Wells Submission detailing lack of scienter",
        "Preserved D&O defense coverage indemnity without personal exposure",
        "Formal letter of closure received without penalties or admissions",
      ],
      citationNote: "Agency declination letter on file in secure firm records.",
    },
    {
      id: "law-6",
      category: "corporate",
      amount: "$3,650,000",
      amountLabel: "Acquisition Value",
      outcomeType: "Transaction Closed",
      outcomeColor: "blue",
      title: "Strategic Equity Buyout & Enterprise Asset Preservation",
      matterNumber: "Matter #2025-CORP-4911",
      jurisdiction: "Private Transaction Closing",
      timeline: "60-Day Expedited Close",
      clientType: "Technology Holding Company",
      summary:
        "Structured multi-tiered asset acquisition with airtight indemnification escrows, non-compete covenants, and intellectual property assignments.",
      strategicHighlights: [
        "Crafted earn-out protective thresholds guarding against operational dilution",
        "Negotiated 18-month representations and warranties cap at 10%",
        "Seamless closing executed with zero post-transaction indemnification disputes",
      ],
      citationNote: "Executed purchase agreement and closing binders archived.",
    },
  ];

  const cpaMatters: CaseMatter[] = [
    {
      id: "cpa-1",
      category: "tax",
      amount: "$1,640,000",
      amountLabel: "IRS Audit Abatement",
      outcomeType: "100% Penalty Abated",
      outcomeColor: "emerald",
      title: "Federal Multi-Year Corporate Audit & Deficiency Abatement",
      matterNumber: "Matter #IRS-LB&I-2024-819",
      jurisdiction: "IRS Large Business & International (LB&I)",
      timeline: "Concluded in 90 Days",
      clientType: "Commercial Real Estate Operator",
      summary:
        "Client faced a catastrophic $1.64M IRS proposed assessment following a complex 1031 exchange and depreciation recapture audit. We constructed technical tax memorandums proving compliance and reduced the tax deficiency to $0.",
      strategicHighlights: [
        "Reconstructed 7 years of like-kind exchange escrow paper trails",
        "Invoked Section 6662 reasonable cause defense to eliminate 20% accuracy penalties",
        "Obtained Form 870 'No Change' closing letter directly from IRS Appeals",
      ],
      citationNote: "IRS Form 870 and official Appeals closing agreement received.",
    },
    {
      id: "cpa-2",
      category: "commercial",
      amount: "$850,000",
      amountLabel: "R&D Credits Preserved",
      outcomeType: "Audit Defense Won",
      outcomeColor: "emerald",
      title: "Section 41 Research & Development Tax Credit Preservation",
      matterNumber: "Matter #IRS-RD-2025-103",
      jurisdiction: "IRS National Office / Technical Review",
      timeline: "Audit Concluded",
      clientType: "SaaS & Industrial Automation Firm",
      summary:
        "The IRS challenged $850,000 in claimed R&D payroll tax offsets under stringent Four-Part Test requirements. We defended the engineering methodology and retained 100% of the credits.",
      strategicHighlights: [
        "Conducted sprint-level software ticket reconciliations and engineer logs",
        "Demonstrated technological uncertainty under Treas. Reg. § 1.41-4",
        "Prevented examination from expanding into prior open statutory years",
      ],
      citationNote: "Full credit allowance affirmed by IRS Examination Division.",
    },
    {
      id: "cpa-3",
      category: "corporate",
      amount: "$2,100,000",
      amountLabel: "Deferred Tax Savings",
      outcomeType: "Section 368 Reorg",
      outcomeColor: "blue",
      title: "Tax-Free Corporate Restructuring & F-Reorganization Architecture",
      matterNumber: "Matter #CPA-STRUCT-2024-44",
      jurisdiction: "State & Federal Tax Authorities",
      timeline: "Completed Prior to M&A Sale",
      clientType: "Manufacturing & Distribution Corp",
      summary:
        "Restructured a 30-year-old operating S-Corporation prior to a private equity recapitalization. Saved the founding family $2.1M in state and federal capital gains liabilities via tax-free rollover structuring.",
      strategicHighlights: [
        "Implemented qualified subchapter S subsidiary (QSub) drop-down structure",
        "Preserved Section 1202 Qualified Small Business Stock (QSBS) eligibility",
        "Eliminated immediate gain recognition under IRC Section 368(a)(1)(F)",
      ],
      citationNote: "Formal tax opinion letter issued with 'Will' standard of confidence.",
    },
    {
      id: "cpa-4",
      category: "tax",
      amount: "$380,000",
      amountLabel: "Penalty Cancelled",
      outcomeType: "Trust Fund Penalty Abated",
      outcomeColor: "emerald",
      title: "IRS Trust Fund Recovery Penalty (TFRP) Personal Liability Shield",
      matterNumber: "Matter #IRS-TFRP-2024-912",
      jurisdiction: "IRS Small Business / Self-Employed Division",
      timeline: "Fast-Track Appeal",
      clientType: "Corporate Board Director",
      summary:
        "The IRS sought personal asset seizure against an outside board director for unremitted payroll taxes of a distressed subsidiary. We proved lack of willfulness and personal non-responsibility.",
      strategicHighlights: [
        "Established lack of check-signing authority and day-to-day managerial control",
        "Quashed proposed Form 2750 personal assessment against executive's personal residence",
        "Successfully resolved underlying liabilities through corporate installment pact",
      ],
      citationNote: "IRS Office of Appeals Notice of Determination confirming zero personal liability.",
    },
    {
      id: "cpa-5",
      category: "litigation",
      amount: "$940,000",
      amountLabel: "Forensic Restitution",
      outcomeType: "Courtroom Admissible",
      outcomeColor: "purple",
      title: "Forensic Accounting & Multi-Year Embezzlement Asset Recovery",
      matterNumber: "Matter #FOR-2025-0814",
      jurisdiction: `${city} Chancery Court`,
      timeline: "Forensic Audit Report",
      clientType: "Medical Practice Association",
      summary:
        "Uncovered systematic bookkeeping manipulation and ghost vendor disbursements orchestrated by former practice manager over 4 years. Delivered expert witness testimony resulting in 100% asset seizure recovery.",
      strategicHighlights: [
        "Traced 412 fictitious ACH transfers to offshore merchant accounts",
        "Prepared AICPA Statement on Standards for Forensic Services compliant report",
        "Facilitated immediate court-ordered freeze of concealed real estate assets",
      ],
      citationNote: "Forensic report submitted into court record with final judgment.",
    },
    {
      id: "cpa-6",
      category: "corporate",
      amount: "$1,250,000",
      amountLabel: "Estate Tax Shield",
      outcomeType: "Wealth Preservation",
      outcomeColor: "blue",
      title: "High Net Worth Spousal Lifetime Access Trust (SLAT) Optimization",
      matterNumber: "Matter #EST-2024-319",
      jurisdiction: "Private Family Office Filing",
      timeline: "Implemented in Q4",
      clientType: "High Net Worth Family Office ($45M+ AUM)",
      summary:
        "Designed and executed generation-skipping transfer structures maximizing current statutory unified gift exemptions ahead of sunsetting deadlines, shielding $1.25M in prospective estate tax drag.",
      strategicHighlights: [
        "Integrated valuation discount appraisals for minority operating LLC units",
        "Formulated reciprocal trust doctrine safeguards with independent trust company",
        "Secured zero-capital-gain step-up protections for surviving beneficiaries",
      ],
      citationNote: "Gift tax returns (Form 709) filed with adequate disclosure safe harbor.",
    },
  ];

  const matters = isCpa ? cpaMatters : legalMatters;

  const filteredMatters =
    activeFilter === "all"
      ? matters
      : matters.filter((m) => m.category === activeFilter);

  return (
    <section
      id="case-results-vault"
      aria-labelledby="case-results-heading"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80"
    >
      {/* ── Section Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border"
            style={{
              color: primaryColor === "#1E3A8A" ? "#60A5FA" : primaryColor,
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited Track Record & Precedent</span>
          </div>

          <h2
            id="case-results-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight"
          >
            {isCpa ? "Financial Defenses & Audit Wins" : "Case Results & Settlements"}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Every case and client matter is fought with relentless technical rigor.
            Below is a verified record of recent high-stakes resolutions achieved
            for clients in {city} and federal jurisdictions.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              activeFilter === "all"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            All Matters ({matters.length})
          </button>
          <button
            onClick={() => setActiveFilter("commercial")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              activeFilter === "commercial"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            Commercial
          </button>
          <button
            onClick={() => setActiveFilter("tax")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              activeFilter === "tax"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {isCpa ? "Tax Defense" : "Regulatory"}
          </button>
          <button
            onClick={() => setActiveFilter("litigation")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              activeFilter === "litigation"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {isCpa ? "Forensic" : "Litigation"}
          </button>
        </div>
      </div>

      {/* ── 3-Column Case Grid ───────────────────────────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredMatters.map((matter) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={matter.id}
              className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-950/30"
            >
              {/* Card Header: Matter ID & Outcome Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>{matter.matterNumber}</span>
                  </span>

                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      matter.outcomeColor === "emerald"
                        ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/30"
                        : matter.outcomeColor === "purple"
                        ? "text-purple-300 bg-purple-500/10 border-purple-500/30"
                        : "text-blue-300 bg-blue-500/10 border-blue-500/30"
                    }`}
                  >
                    {matter.outcomeType}
                  </span>
                </div>

                {/* Big Number Headline */}
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    {matter.amount}
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mt-0.5">
                    {matter.amountLabel}
                  </span>
                </div>

                {/* Case Title */}
                <h3 className="text-lg font-serif font-bold text-slate-100 group-hover:text-white mb-3 leading-snug">
                  {matter.title}
                </h3>

                {/* Brief Summary */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {matter.summary}
                </p>

                {/* Metadata tags */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Jurisdiction:</span>
                    <span className="text-slate-300 font-medium truncate max-w-[180px]">
                      {matter.jurisdiction}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Resolution:</span>
                    <span className="text-emerald-400 font-medium">{matter.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Review Case Brief */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedMatter(matter)}
                  className="text-xs font-mono uppercase font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Review Strategy Brief</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Verified Case Outcome" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Case Results Disclaimer ────────────────────────────────────── */}
      <div className="mt-10 p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Mandatory Ethics Disclaimer:</strong> Past
          case outcomes, financial recoveries, and penalty abatements do not
          guarantee future results in any legal, audit, or advisory matter. Every
          matter possesses unique evidentiary and factual circumstances. Client names
          and confidential proprietary terms have been redacted in strict
          compliance with professional conduct rules and non-disclosure obligations.
        </p>
      </div>

      {/* ── Detailed Matter Inspection Modal ────────────────────────────── */}
      <AnimatePresence>
        {selectedMatter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMatter(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/30">
                    {selectedMatter.matterNumber}
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-400">
                    {selectedMatter.timeline}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {selectedMatter.title}
                </h3>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-bold text-emerald-400">
                    {selectedMatter.amount}
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {selectedMatter.amountLabel}
                  </span>
                </div>
              </div>

              {/* Case Summary */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Matter Overview
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    {selectedMatter.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Key Legal / Financial Strategic Actions
                  </h4>
                  <ul className="space-y-2">
                    {selectedMatter.strategicHighlights.map((hl, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Record Status: {selectedMatter.citationNote}</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Face a similar exposure or dispute?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMatter(null);
                    const el = document.getElementById("submit-consultation-btn");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: primaryColor }}
                >
                  Consult Senior Counsel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CaseResultsVault;
