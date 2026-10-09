"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  AUTOMOTIVE_SPECIALIZATIONS,
  qualifyAutomotiveLead,
  getArchetypePrimaryColor,
} from "@/lib/archetypeMap";
import type { AutomotiveSpecialization } from "@/lib/archetypeMap";
import {
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Sparkles,
  Zap,
  Globe,
  Phone,
  MapPin,
  Gauge,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import rawLeads from "../../../qualified_targeted_leads.json";

interface Lead {
  company: string;
  website?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  industry?: string;
  niche?: string;
  specialization?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  mobilePageSpeed?: number;
  mobileLoadTimeSec?: number;
  estLostMonthlySpend?: number;
  coldEmailSubject?: string;
  coldEmailBody?: string;
  primaryColor?: string;
  hasAdTags?: boolean;
  hasMarketingPixels?: boolean;
  qualificationReason?: string;
  [key: string]: unknown;
}

const leadsData = rawLeads as Lead[];

/**
 * Returns dynamic styles for automotive specialization badges
 */
function getSpecializationBadgeStyle(spec: string = ""): {
  bg: string;
  text: string;
  border: string;
} {
  const norm = spec.toLowerCase();
  if (norm.includes("european") || norm.includes("bmw") || norm.includes("audi") || norm.includes("porsche")) {
    return {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
    };
  }
  if (norm.includes("transmission")) {
    return {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/30",
    };
  }
  if (norm.includes("engine") || norm.includes("rebuild")) {
    return {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/30",
    };
  }
  if (norm.includes("electrical") || norm.includes("ecu")) {
    return {
      bg: "bg-teal-500/10",
      text: "text-teal-400",
      border: "border-teal-500/30",
    };
  }
  if (norm.includes("diesel") || norm.includes("fleet")) {
    return {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    };
  }
  if (norm.includes("performance") || norm.includes("tuning")) {
    return {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/30",
    };
  }
  return {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  };
}

export default function QAGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("All");
  const [selectedAdFilter, setSelectedAdFilter] = useState<"all" | "verified" | "no_tags">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Compute enriched automotive leads
  const enrichedLeads = useMemo(() => {
    return leadsData.map((lead, idx) => {
      const qual = qualifyAutomotiveLead({
        company: lead.company,
        niche: lead.niche,
        industry: lead.industry,
        website: lead.website,
      });

      const specialization =
        lead.specialization || qual.specialization || lead.niche || "Independent Auto Repair Shop";
      const primaryColor =
        lead.primaryColor || getArchetypePrimaryColor(specialization, "UrgentService");
      const hasAds = lead.hasAdTags ?? lead.hasMarketingPixels ?? false;
      const slug = (lead.company || `lead-${idx}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const previewUrl = `/preview/${slug}?name=${encodeURIComponent(
        lead.company
      )}&industry=${encodeURIComponent(specialization)}&city=${encodeURIComponent(
        lead.city || ""
      )}&phone=${encodeURIComponent(
        lead.phone || ""
      )}&primaryColor=${encodeURIComponent(primaryColor)}`;

      return {
        ...lead,
        id: `${slug}-${idx}`,
        slug,
        specialization,
        archetype: "UrgentService" as const,
        primaryColor,
        hasAds,
        isQualified: qual.isQualified,
        qualificationReason: lead.qualificationReason || qual.reason,
        previewUrl,
      };
    });
  }, []);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return enrichedLeads.filter((lead) => {
      const matchesSearch =
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.website || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpec =
        selectedSpecialization === "All" ||
        lead.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());

      const matchesAd =
        selectedAdFilter === "all" ||
        (selectedAdFilter === "verified" && lead.hasAds) ||
        (selectedAdFilter === "no_tags" && !lead.hasAds);

      return matchesSearch && matchesSpec && matchesAd;
    });
  }, [enrichedLeads, searchTerm, selectedSpecialization, selectedAdFilter]);

  // Statistics
  const stats = useMemo(() => {
    let verifiedAdsCount = 0;
    let noTagsCount = 0;
    enrichedLeads.forEach((l) => {
      if (l.hasAds) verifiedAdsCount++;
      else noTagsCount++;
    });
    return {
      total: enrichedLeads.length,
      verifiedAds: verifiedAdsCount,
      noTags: noTagsCount,
    };
  }, [enrichedLeads]);

  const handleCopyPitch = (lead: (typeof enrichedLeads)[0]) => {
    const greeting = lead.contactName || `${lead.company} Service Team`;
    const domainClean = (lead.website || "your website").replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const fullPreviewUrl = `https://agency-landing-page-smoky-psi.vercel.app${lead.previewUrl}`;

    let subject = `Mobile landing experience for ${lead.company}`;
    let body = "";

    if (lead.hasAds) {
      subject = `Quick question regarding ${lead.company} mobile intake`;
      body = `Hey ${greeting},

I was looking at ${domainClean} and noticed you have advertising tags configured for your search traffic, but your mobile landing experience takes about ${lead.mobileLoadTimeSec || 3.8} seconds to load.

When drivers search for a specialist with an urgent warning light or repair need in ${lead.city || "your area"}, every second of delay causes them to bounce back to the search results before reaching your service advisor.

To show what a dedicated mobile experience looks like, I put together a lightweight, instant-loading diagnostic prototype customized for ${lead.company}:
Link: ${fullPreviewUrl}

It gives drivers one-tap access to your service desk, an interactive diagnostic intake breakdown, and immediate reassurance of your ${lead.specialization} capabilities on any smartphone.

Take a look on your phone whenever you have a moment. If you'd like to put something similar in place for your incoming search traffic, I'd be glad to walk through the implementation.

Best,
Faruk — Lead Engineer, Speedcraft Studio`;
    } else {
      body = `Hey ${greeting},

I came across ${domainClean} while researching reputable ${lead.specialization} shops in ${lead.city || "your area"}. Your shop clearly has strong technical capabilities, but your current mobile site takes about ${lead.mobileLoadTimeSec || 4.2} seconds to load.

Most vehicle owners searching for a repair shop on mobile need two things immediately: clear confirmation that you specialize in their vehicle's issue, and frictionless contact with your service advisor.

To illustrate how that can look, I built a high-performance mobile prototype tailored specifically for ${lead.company}:
Link: ${fullPreviewUrl}

It features instant sub-second loading, clear specialist service categories, and a streamlined repair order intake flow.

Take a look on your phone when convenient. If you're interested in upgrading your local search conversion experience, I'd be happy to discuss getting this live for your shop.

Best,
Faruk — Lead Engineer, Speedcraft Studio`;
    }

    const textToCopy = `Subject: ${subject}\n\n${body}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedId(lead.id);
        setTimeout(() => setCopiedId(null), 2500);
      })
      .catch(() => {
        alert("Copied pitch to clipboard!");
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. SECURITY WARNING & NICHE PIVOT NOTICE BANNER
      ────────────────────────────────────────────────────────────────────── */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 px-4 sm:px-6 py-2.5 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>
            <strong className="text-amber-200">AUTOMOTIVE QA INSPECTION ENVIRONMENT:</strong>{" "}
            Dedicated prototype review for independent auto repair, diagnostics, transmission, and European specialist shops.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/outreach"
            className="text-amber-300 hover:text-white underline text-[11px]"
          >
            Go to Outreach Dashboard →
          </Link>
          <span className="hidden md:inline-block bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
            AUTOMOTIVE ONLY
          </span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          2. DASHBOARD HEADER & STATS BAR
      ────────────────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Automotive QA Prototype Gallery
                  </h1>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Pre-outreach prototype inspection • {stats.total} Qualified Automotive Repair Facilities
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Strategy Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedAdFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer border ${
                  selectedAdFilter === "all"
                    ? "bg-white text-zinc-950 border-white shadow-md font-bold"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                All Shops ({stats.total})
              </button>
              <button
                onClick={() => setSelectedAdFilter("verified")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer border flex items-center gap-1.5 ${
                  selectedAdFilter === "verified"
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md font-bold"
                    : "bg-slate-900 text-emerald-400/80 border-slate-800 hover:text-emerald-300"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Strategy A: Ads Verified ({stats.verifiedAds})</span>
              </button>
              <button
                onClick={() => setSelectedAdFilter("no_tags")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer border ${
                  selectedAdFilter === "no_tags"
                    ? "bg-zinc-700 text-white border-zinc-600 shadow-md font-bold"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                Strategy B: Organic ({stats.noTags})
              </button>
            </div>
          </div>

          {/* Specialization Filter & Search Bar */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by shop name, automotive specialty, city, or website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-3 text-xs text-slate-500 hover:text-slate-300 font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              >
                <option value="All" className="bg-zinc-900 text-white">All Specializations ({stats.total})</option>
                {AUTOMOTIVE_SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec} className="bg-zinc-900 text-white">
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          3. MAIN CONTENT: 3-COLUMN RESPONSIVE AUTOMOTIVE GRID
      ────────────────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-white font-bold">{filteredLeads.length}</span> of{" "}
            <span className="text-white font-bold">{enrichedLeads.length}</span> automotive prototypes
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Mapped to QuickFleet UrgentService Engine</span>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">
              No matching automotive prototypes found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search query or reset the specialization filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialization("All");
                setSelectedAdFilter("all");
              }}
              className="text-xs font-mono text-amber-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => {
              const specBadge = getSpecializationBadgeStyle(lead.specialization);
              const isCopied = copiedId === lead.id;

              return (
                <div
                  key={lead.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group"
                >
                  <div>
                    {/* Top Row: Specialization & Ad Signals Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Specialization Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${specBadge.bg} ${specBadge.text} ${specBadge.border}`}
                      >
                        <Zap className="w-3 h-3" />
                        <span>{lead.specialization}</span>
                      </span>

                      {/* Ad Status Badge */}
                      {lead.hasAds ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Ads Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          <span>No Tags Detected</span>
                        </span>
                      )}
                    </div>

                    {/* Shop Name */}
                    <h2 className="text-xl font-bold text-white mb-2 leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                      {lead.company}
                    </h2>

                    {/* Meta Row: City, Website, Phone */}
                    <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                      {lead.city && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{lead.city} {lead.countryCode ? `(${lead.countryCode})` : ""}</span>
                        </div>
                      )}
                      {lead.website ? (
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate max-w-[240px]">
                            {lead.website.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-400/80 text-[11px]">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span>Website domain unlisted</span>
                        </div>
                      )}
                      {lead.phone ? (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-mono">{lead.phone}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-400/80 text-[11px]">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span>Direct phone number missing</span>
                        </div>
                      )}
                    </div>

                    {/* Evidence and Telemetry Strip */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 mb-6 space-y-2.5 text-xs">
                      {/* Brand Color Swatch */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono">
                          Brand Theme Color
                        </span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-md border border-white/20 shadow-sm shrink-0"
                            style={{ backgroundColor: lead.primaryColor }}
                            title={`Hex: ${lead.primaryColor}`}
                          />
                          <span className="font-mono text-slate-300 font-bold">
                            {lead.primaryColor}
                          </span>
                        </div>
                      </div>

                      {/* Measured Mobile Speed */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className="text-slate-400 font-mono flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-amber-400" />
                          Measured Mobile Speed
                        </span>
                        <span className="font-mono font-bold text-amber-300">
                          {lead.mobilePageSpeed ? `${lead.mobilePageSpeed}/100` : "Audit Ready"}
                          {lead.mobileLoadTimeSec && (
                            <span className="text-slate-500 font-normal ml-1">
                              ({lead.mobileLoadTimeSec}s load)
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Outreach Positioning Strategy */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className="text-slate-400 font-mono flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-violet-400" />
                          Outreach Strategy
                        </span>
                        <span className={`font-mono font-bold text-[11px] ${lead.hasAds ? "text-emerald-400" : "text-slate-300"}`}>
                          {lead.hasAds ? "Strategy A (Paid Traffic)" : "Strategy B (Organic)"}
                        </span>
                      </div>

                      {/* Verification Status */}
                      <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{lead.qualificationReason || "Verified automotive repair workshop"}</span>
                      </div>
                    </div>
                  </div>

                  {/* ────────────────────────────────────────────────────────────
                      4. ACTION BUTTONS
                  ──────────────────────────────────────────────────────────── */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <Link
                      href={lead.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all duration-200 hover:shadow-amber-900/40"
                    >
                      <span>View Automotive Prototype</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleCopyPitch(lead)}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold font-mono transition-all duration-200 border cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-300"
                          : "bg-slate-800 hover:bg-slate-700/80 border-slate-700/80 text-slate-300 hover:text-white"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Email Pitch!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Personalized Pitch</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────────────────────────────
          5. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-600 font-mono">
        <p>Speedcraft Studio • Automotive Repair &amp; Diagnostics QA Prototype Engine</p>
      </footer>
    </div>
  );
}
