"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getArchetype, getArchetypePrimaryColor } from "@/lib/archetypeMap";
import type { Archetype } from "@/lib/archetypeMap";
import {
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Layers,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Phone,
  MapPin,
  Clock,
  Gauge,
  SlidersHorizontal,
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
  [key: string]: unknown;
}

const leadsData = rawLeads as Lead[];

/**
 * Returns a consistent hex color for each industry & archetype
 */
function getPrimaryColor(industry: string = "", archetype: Archetype): string {
  return getArchetypePrimaryColor(industry, archetype);
}

/**
 * Returns dynamic styles for industry badges
 */
function getIndustryBadgeStyle(industry: string = ""): {
  bg: string;
  text: string;
  border: string;
} {
  const norm = (industry || "").toLowerCase().trim();
  if (norm.includes("plumb")) {
    return {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
    };
  }
  if (norm.includes("hvac")) {
    return {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/30",
    };
  }
  if (norm.includes("roof")) {
    return {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    };
  }
  if (norm.includes("electr")) {
    return {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
    };
  }
  if (norm.includes("mechanic") || norm.includes("auto")) {
    return {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "border-rose-500/30",
    };
  }
  if (norm.includes("law") || norm.includes("legal")) {
    return {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
    };
  }
  if (norm.includes("cpa") || norm.includes("account")) {
    return {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    };
  }
  if (norm.includes("dent")) {
    return {
      bg: "bg-sky-500/10",
      text: "text-sky-400",
      border: "border-sky-500/30",
    };
  }
  if (norm.includes("medspa")) {
    return {
      bg: "bg-fuchsia-500/10",
      text: "text-fuchsia-400",
      border: "border-fuchsia-500/30",
    };
  }
  return {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-500/30",
  };
}

/**
 * Returns Archetype badge styles & icon
 */
function getArchetypeBadge(archetype: Archetype) {
  switch (archetype) {
    case "UrgentService":
      return {
        label: "UrgentService",
        bg: "bg-red-500/15",
        text: "text-red-400",
        border: "border-red-500/40",
        icon: Zap,
      };
    case "ProfessionalTrust":
      return {
        label: "ProfessionalTrust",
        bg: "bg-blue-500/15",
        text: "text-blue-400",
        border: "border-blue-500/40",
        icon: Shield,
      };
    case "AestheticBooking":
      return {
        label: "AestheticBooking",
        bg: "bg-fuchsia-500/15",
        text: "text-fuchsia-400",
        border: "border-fuchsia-500/40",
        icon: Sparkles,
      };
    case "Generic":
    default:
      return {
        label: "Generic",
        bg: "bg-slate-500/15",
        text: "text-slate-400",
        border: "border-slate-500/40",
        icon: Layers,
      };
  }
}

export default function QAGalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArchetype, setSelectedArchetype] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Compute enriched leads
  const enrichedLeads = useMemo(() => {
    return leadsData.map((lead, idx) => {
      const rawIndustry = lead.industry || lead.niche || "";
      const archetype = getArchetype(rawIndustry);
      const primaryColor =
        lead.primaryColor || getPrimaryColor(rawIndustry, archetype);
      const slug = (lead.company || `lead-${idx}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const previewUrl = `/preview/${slug}?name=${encodeURIComponent(
        lead.company
      )}&industry=${encodeURIComponent(rawIndustry)}&city=${encodeURIComponent(
        lead.city || ""
      )}&phone=${encodeURIComponent(
        lead.phone || ""
      )}&primaryColor=${encodeURIComponent(primaryColor)}`;

      return {
        ...lead,
        id: `${slug}-${idx}`,
        slug,
        rawIndustry,
        archetype,
        primaryColor,
        previewUrl,
      };
    });
  }, []);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return enrichedLeads.filter((lead) => {
      const matchesSearch =
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.rawIndustry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.website || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArchetype =
        selectedArchetype === "All" || lead.archetype === selectedArchetype;

      return matchesSearch && matchesArchetype;
    });
  }, [enrichedLeads, searchTerm, selectedArchetype]);

  // Archetype distribution counts
  const stats = useMemo(() => {
    const counts = {
      Total: enrichedLeads.length,
      UrgentService: 0,
      ProfessionalTrust: 0,
      AestheticBooking: 0,
      Generic: 0,
    };
    enrichedLeads.forEach((l) => {
      counts[l.archetype] = (counts[l.archetype] || 0) + 1;
    });
    return counts;
  }, [enrichedLeads]);

  const handleCopyPitch = (lead: (typeof enrichedLeads)[0]) => {
    const placeholderPitch =
      lead.coldEmailBody ||
      `Subject: ${lead.coldEmailSubject || `PageSpeed Opportunity / ${lead.company}`}\n\nHi ${
        lead.contactName || `${lead.company} Team`
      },\n\nI noticed your mobile site at ${
        lead.website || "your website"
      } takes ${
        lead.mobileLoadTimeSec || 4.5
      }s to load. To show you the performance difference, I built an instant-loading prototype of your landing page:\n\nhttps://agency-landing-page-smoky-psi.vercel.app${lead.previewUrl}\n\nBest,\nSpeedcraft Studio Team`;

    navigator.clipboard
      .writeText(placeholderPitch)
      .then(() => {
        setCopiedId(lead.id);
        setTimeout(() => setCopiedId(null), 2500);
      })
      .catch(() => {
        // Fallback alert if clipboard is blocked
        alert("Copied pitch to clipboard!");
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. SECURITY WARNING BANNER (Top Notice)
      ────────────────────────────────────────────────────────────────────── */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 px-4 sm:px-6 py-2.5 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>
            <strong className="text-amber-200">INTERNAL QA ENVIRONMENT:</strong>{" "}
            This route is for internal prototype inspection only. Protect with
            authentication or remove before deploying to production.
          </span>
        </div>
        <span className="hidden md:inline-block bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
          CONFIDENTIAL
        </span>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          2. DASHBOARD HEADER & STATS BAR
      ────────────────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Targeted Leads QA Gallery
                  </h1>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Pre-outreach prototype verification • {stats.Total} Total Qualified Leads
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {(["All", "UrgentService", "ProfessionalTrust", "AestheticBooking"] as const).map(
                (category) => {
                  const count =
                    category === "All"
                      ? stats.Total
                      : stats[category as Archetype];
                  const isSelected = selectedArchetype === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedArchetype(category)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer border ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-500 shadow-md"
                          : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <span>{category}</span>
                      <span className="ml-1.5 opacity-70 text-[10px]">
                        ({count})
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by company name, industry, city, or website domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          3. MAIN CONTENT: 3-COLUMN RESPONSIVE GRID
      ────────────────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-white font-bold">{filteredLeads.length}</span> of{" "}
            <span className="text-white font-bold">{enrichedLeads.length}</span> prototypes
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sorted by Qualified Ad Spend</span>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">
              No matching prototypes found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search query or reset the archetype filter to see all leads.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedArchetype("All");
              }}
              className="text-xs font-mono text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 3 Columns on Desktop */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => {
              const indBadge = getIndustryBadgeStyle(lead.rawIndustry);
              const archBadge = getArchetypeBadge(lead.archetype);
              const ArchetypeIcon = archBadge.icon;
              const isCopied = copiedId === lead.id;

              return (
                <div
                  key={lead.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 group"
                >
                  <div>
                    {/* Top Row: Industry & Archetype Badges */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Industry Badge */}
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${indBadge.bg} ${indBadge.text} ${indBadge.border}`}
                      >
                        {lead.rawIndustry || "Local Business"}
                      </span>

                      {/* Archetype Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${archBadge.bg} ${archBadge.text} ${archBadge.border}`}
                      >
                        <ArchetypeIcon className="w-3.5 h-3.5" />
                        <span>{archBadge.label}</span>
                      </span>
                    </div>

                    {/* Company Name (Large, Bold) */}
                    <h2 className="text-xl font-bold text-white mb-2 leading-snug tracking-tight group-hover:text-blue-300 transition-colors">
                      {lead.company}
                    </h2>

                    {/* Meta Row: City, Phone, Website */}
                    <div className="space-y-1.5 text-xs text-slate-400 mb-5">
                      {lead.city && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{lead.city}</span>
                        </div>
                      )}
                      {lead.website && (
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate max-w-[240px]">
                            {lead.website.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-mono">{lead.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Performance & Primary Color Details Box */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 mb-6 space-y-2.5 text-xs">
                      {/* Primary Color Swatch */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono">
                          Primary Color
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

                      {/* Performance Audit Stats */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className="text-slate-400 font-mono flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-red-400" />
                          Mobile Speed
                        </span>
                        <span className="font-mono font-bold text-red-400">
                          {lead.mobilePageSpeed ? `${lead.mobilePageSpeed}/100` : "Audit Ready"}
                          {lead.mobileLoadTimeSec && (
                            <span className="text-slate-500 font-normal ml-1">
                              ({lead.mobileLoadTimeSec}s)
                            </span>
                          )}
                        </span>
                      </div>

                      {lead.estLostMonthlySpend && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                          <span className="text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            Est. Wasted Ads
                          </span>
                          <span className="font-mono font-bold text-amber-300">
                            ${lead.estLostMonthlySpend.toLocaleString()}/mo
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ────────────────────────────────────────────────────────────
                      4. ACTION BUTTONS
                      Primary: "View Live Prototype" (opens /preview/[slug] in new tab)
                      Secondary: "Copy Email Pitch" (copies pitch placeholder)
                  ──────────────────────────────────────────────────────────── */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {/* Primary Button */}
                    <Link
                      href={lead.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all duration-200 hover:shadow-blue-900/40"
                    >
                      <span>View Live Prototype</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Secondary Button */}
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
                          <span>Copy Email Pitch</span>
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
        <p>Speedcraft Studio • Private Targeted Leads QA & Prototype Inspection Suite</p>
      </footer>
    </div>
  );
}
