"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Search,
  Send,
  AlertCircle,
  CheckCircle2,
  Globe,
  CheckCheck,
  RotateCcw,
  MapPin,
  Sparkles,
  RefreshCw,
  Compass,
  Plus,
  UploadCloud,
  X,
  Target,
  Database,
} from "lucide-react";
import leadsData from "../../../leads/global_leads_audit.json";
import qualifiedTargetedLeads from "../../../qualified_targeted_leads.json";
import { auditWebsiteAction } from "@/app/actions/audit";
import {
  getArchetypePrimaryColor,
  AUTOMOTIVE_SPECIALIZATIONS,
  qualifyAutomotiveLead,
} from "@/lib/archetypeMap";
import type { Archetype, AutomotiveSpecialization } from "@/lib/archetypeMap";

export const TARGET_NICHES = AUTOMOTIVE_SPECIALIZATIONS;

export interface Lead {
  company: string;
  website: string;
  country: string;
  countryCode: string;
  city: string;
  niche: string;
  industry?: string;
  specialization?: AutomotiveSpecialization | string;
  archetype?: Archetype;
  primaryColor?: string;
  contactName: string;
  phone: string;
  email: string;
  rating?: number;
  userRatingsTotal?: number;
  address?: string;
  mobilePageSpeed: number;
  mobileLoadTimeSec: number;
  ttfbMs: number;
  cms: string;
  detectedPlugins: string;
  htmlWeightKb: number;
  scriptsCount: number;
  currency: string;
  currencySymbol: string;
  cpcEstimate: number;
  estLostMonthlySpend: number;
  coldEmailSubject: string;
  coldEmailBody: string;
  linkedInMessage: string;
  hasAdTags?: boolean;
  hasMarketingPixels?: boolean;
  adEvidenceStatus?: "verified_ads" | "no_detected_ads" | "inconclusive";
  qualificationStatus?: "qualified" | "unverified" | "disqualified";
  qualificationReason?: string;
  adTrackingVerified?: {
    activeAdPixels: boolean;
    detectedTags: string[];
    scannedAt: string;
  };
}

export interface SentRecord {
  company: string;
  email?: string;
  sentAt: string;
  method?: string;
  status: string;
  previewUrl?: string;
  id?: string;
  viewedAt?: string;
  viewCount?: number;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

interface OutreachClientProps {
  initialSentRecords?: SentRecord[];
}

export function OutreachDashboardClient({ initialSentRecords = [] }: OutreachClientProps) {
  const [activeTab, setActiveTab] = useState<"active" | "sent">("active");
  const [sourceMode, setSourceMode] = useState<"targeted" | "vault" | "google_maps">("targeted");
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [selectedAdEvidence, setSelectedAdEvidence] = useState<string>("all");
  const [selectedQualification, setSelectedQualification] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingMap, setSendingMap] = useState<Record<string, "idle" | "sending" | "sent" | "error">>({});
  const [errorMsgMap, setErrorMsgMap] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pitch Assistant Modal States (Automotive Conversion Focus)
  const [activePitchLead, setActivePitchLead] = useState<Lead | null>(null);
  const [pitchModalTab, setPitchModalTab] = useState<"initial" | "followup_1" | "followup_2" | "linkedin">("initial");

  // Google Maps Search States (Automotive Default)
  const [mapsQuery, setMapsQuery] = useState("European Auto Repair");
  const [mapsLocation, setMapsLocation] = useState("Dallas, TX");
  const [isSearchingMaps, setIsSearchingMaps] = useState(false);
  const [mapsResults, setMapsResults] = useState<Lead[]>([]);
  const [mapsMetadata, setMapsMetadata] = useState<{ source?: string; hint?: string } | null>(null);

  // Sent list state initialized immediately from server-provided records
  const [sentRecords, setSentRecords] = useState<SentRecord[]>(initialSentRecords);

  // Sync with localStorage on client mount (in case offline actions happened)
  useEffect(() => {
    try {
      const cached = localStorage.getItem("speedcraft_sent_records");
      if (cached) {
        const parsed: SentRecord[] = JSON.parse(cached);
        if (parsed.length > initialSentRecords.length) {
          setTimeout(() => {
            setSentRecords(parsed);
          }, 0);
        }
      } else if (initialSentRecords.length > 0) {
        localStorage.setItem("speedcraft_sent_records", JSON.stringify(initialSentRecords));
      }
    } catch (e) {
      console.error("Failed to sync localStorage:", e);
    }
  }, [initialSentRecords]);

  // Quick lookup set for fast O(1) deduplication
  const sentCompanySet = useMemo(() => {
    const s = new Set<string>();
    sentRecords.forEach((r) => {
      if (r.company) s.add(r.company.toLowerCase());
      if (r.email) s.add(r.email.toLowerCase());
    });
    return s;
  }, [sentRecords]);

  // Curated Targeted Automotive Pool (verified automotive repair & diagnostic specialists)
  const targetedLeadsPool = useMemo(() => {
    return (qualifiedTargetedLeads as Lead[]).map((l) => {
      const qual = qualifyAutomotiveLead({
        company: l.company,
        niche: l.niche,
        industry: l.industry,
        website: l.website,
      });
      const spec = l.specialization || qual.specialization || l.niche || "Independent Auto Repair";
      const arch = "UrgentService" as Archetype;
      const color = l.primaryColor || getArchetypePrimaryColor(spec, arch);
      const hasAds = l.hasAdTags !== undefined ? l.hasAdTags : (l.hasMarketingPixels ?? false);
      const adStatus: "verified_ads" | "no_detected_ads" = hasAds ? "verified_ads" : "no_detected_ads";

      return {
        ...l,
        specialization: spec,
        archetype: arch,
        primaryColor: color,
        adEvidenceStatus: l.adEvidenceStatus || adStatus,
        qualificationStatus: l.qualificationStatus || (qual.isQualified ? "qualified" : "unverified"),
        qualificationReason: l.qualificationReason || qual.reason,
      };
    });
  }, []);

  const [vaultLeads, setVaultLeads] = useState<Lead[]>(leadsData as Lead[]);

  // Instant URL Auditor & Importer States
  const [showImportDrawer, setShowImportDrawer] = useState(false);
  const [importTab, setImportTab] = useState<"single" | "bulk">("single");
  const [auditUrl, setAuditUrl] = useState("");
  const [auditCompany, setAuditCompany] = useState("");
  const [auditCity, setAuditCity] = useState("");
  const [auditIndustry, setAuditIndustry] = useState<string>("European Vehicle Specialist");
  const [isAuditing, setIsAuditing] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [isBulkImporting, setIsBulkImporting] = useState(false);

  // Active dataset depending on mode
  const currentLeadsPool =
    sourceMode === "google_maps"
      ? mapsResults
      : sourceMode === "targeted"
      ? targetedLeadsPool
      : vaultLeads;

  // Dynamic Country list
  const countries = useMemo(() => {
    const counts: Record<string, number> = {};
    currentLeadsPool.forEach((l) => {
      if (l.country) counts[l.country] = (counts[l.country] || 0) + 1;
    });
    return ["all", ...Object.keys(counts).sort()];
  }, [currentLeadsPool]);


  // Filtered Leads strictly adhering to Automotive Qualification & Evidence
  const filteredAll = useMemo(() => {
    return currentLeadsPool.filter((lead) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        lead.company.toLowerCase().includes(searchLower) ||
        (lead.website && lead.website.toLowerCase().includes(searchLower)) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower)) ||
        (lead.city && lead.city.toLowerCase().includes(searchLower)) ||
        (lead.country && lead.country.toLowerCase().includes(searchLower)) ||
        ((lead.niche || lead.industry || "").toLowerCase().includes(searchLower));

      if (sourceMode === "google_maps") return matchesSearch;

      const matchesCountry = selectedCountry === "all" || lead.country === selectedCountry;
      const matchesCity = selectedCity === "all" || lead.city.toLowerCase() === selectedCity.toLowerCase();

      const leadSpec = (lead.specialization || lead.niche || lead.industry || "").toLowerCase();
      const matchesSpec =
        selectedSpecialization === "all" || leadSpec.includes(selectedSpecialization.toLowerCase());

      const hasAds = lead.hasAdTags !== undefined ? lead.hasAdTags : (lead.hasMarketingPixels ?? false);
      const matchesAdEvidence =
        selectedAdEvidence === "all" ||
        (selectedAdEvidence === "verified_ads" && hasAds) ||
        (selectedAdEvidence === "no_detected_ads" && !hasAds);

      const qual = qualifyAutomotiveLead({
        company: lead.company,
        niche: lead.niche,
        industry: lead.industry,
        website: lead.website,
      });

      const matchesQualification =
        selectedQualification === "all" ||
        (selectedQualification === "qualified" && qual.isQualified) ||
        (selectedQualification === "unverified" && !qual.isQualified);

      // In targeted mode, strictly exclude non-repair businesses
      if (sourceMode === "targeted" && qual.isDisqualified) return false;

      return matchesSearch && matchesCountry && matchesCity && matchesSpec && matchesAdEvidence && matchesQualification;
    });
  }, [
    currentLeadsPool,
    search,
    selectedCountry,
    selectedCity,
    selectedSpecialization,
    selectedAdEvidence,
    selectedQualification,
    sourceMode,
  ]);

  // ACTIVE UNCONTACTED QUEUE (Strictly excludes sent companies in real time)
  const activeLeads = useMemo(() => {
    return filteredAll.filter(
      (lead) =>
        !sentCompanySet.has(lead.company.toLowerCase()) &&
        !(lead.email && sentCompanySet.has(lead.email.toLowerCase()))
    );
  }, [filteredAll, sentCompanySet]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Google Maps Search Action (Automotive-first)
  const handleGoogleMapsSearch = async (q?: string, loc?: string) => {
    const searchQuery = q || mapsQuery;
    const searchLocation = loc || mapsLocation;

    if (!searchQuery || !searchLocation) return;

    setIsSearchingMaps(true);
    setSourceMode("google_maps");

    try {
      const res = await fetch(
        `/api/outreach/places?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`
      );
      const data = await res.json();

      if (data.results && Array.isArray(data.results)) {
        setMapsResults(data.results);
        setMapsMetadata({ source: data.source, hint: data.hint });
        showToast(`Discovered ${data.uncontactedCount} uncontacted repair facilities on Google Maps.`);
      } else {
        throw new Error(data.error || "No results found");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Search error: ${msg}`);
    } finally {
      setIsSearchingMaps(false);
    }
  };

  const handleSingleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl.trim() || !auditIndustry) return;

    setIsAuditing(true);
    try {
      const data = await auditWebsiteAction({
        url: auditUrl.trim(),
        industry: auditIndustry,
        company: auditCompany.trim() || undefined,
        city: auditCity.trim() || undefined,
      });

      if (data.success && data.lead) {
        setVaultLeads((prev) => [data.lead as Lead, ...prev]);
        setAuditUrl("");
        setAuditCompany("");
        setAuditCity("");
        const adStatusText = data.hasAdTags
          ? "🟢 Detected Ad Tracking Tags (Strategy A)"
          : "⚪ No Detected Ad Tags (Strategy B)";
        showToast(`Audited ${data.lead.company} (${data.lead.mobilePageSpeed}/100 Speed • ${adStatusText}) — added to queue!`);
        setShowImportDrawer(false);
        setSourceMode("vault");
      } else {
        throw new Error(data.error || "Failed to audit website");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast(`Audit error: ${msg}`);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleBulkAudit = async () => {
    if (!bulkText.trim()) return;
    setIsBulkImporting(true);
    const lines = bulkText.split("\n").map((l) => l.trim()).filter(Boolean);
    let successCount = 0;

    for (const line of lines) {
      const parts = line.split(",").map((p) => p.trim());
      let url = parts[0];
      let company = "";
      let city = "";
      let niche = auditIndustry;

      if (parts.length > 1) {
        if (parts[1].startsWith("http") || parts[1].includes(".")) {
          company = parts[0];
          url = parts[1];
          city = parts[2] || "";
          niche = parts[3] || auditIndustry;
        } else {
          url = parts[0];
          company = parts[1] || "";
          city = parts[2] || "";
          niche = parts[3] || auditIndustry;
        }
      }

      try {
        const data = await auditWebsiteAction({
          url,
          industry: niche || auditIndustry,
          company: company || undefined,
          city: city || undefined,
        });
        if (data.success && data.lead) {
          setVaultLeads((prev) => [data.lead as Lead, ...prev]);
          successCount++;
        }
      } catch {}
    }

    setIsBulkImporting(false);
    setBulkText("");
    showToast(`Successfully audited & imported ${successCount} automotive leads into queue!`);
    setShowImportDrawer(false);
    setSourceMode("vault");
  };

  // Generate accurate automotive prototype preview URL
  const getPreviewUrlForLead = (lead: Lead, absolute: boolean = false): string => {
    const slug = slugify(lead.company);
    const origin = typeof window !== "undefined"
      ? window.location.origin
      : "https://agency-landing-page-smoky-psi.vercel.app";
    const base = absolute ? origin : "";

    const params = new URLSearchParams();
    if (lead.company) params.set("name", lead.company);
    const spec = lead.specialization || lead.industry || lead.niche || "European Vehicle Specialist";
    params.set("industry", spec);
    if (lead.city) params.set("city", lead.city);
    if (lead.phone) params.set("phone", lead.phone);
    const brandColor = lead.primaryColor || getArchetypePrimaryColor(spec, "UrgentService");
    if (brandColor) params.set("primaryColor", brandColor);

    const queryString = params.toString();
    return queryString ? `${base}/preview/${slug}?${queryString}` : `${base}/preview/${slug}`;
  };

  // Register a lead as sent in real time
  const markAsSent = async (lead: Lead, method: string = "manual") => {
    const previewUrl = getPreviewUrlForLead(lead, true);

    const newRecord: SentRecord = {
      company: lead.company,
      email: lead.email,
      sentAt: new Date().toISOString(),
      method,
      status: "sent",
      previewUrl,
    };

    const updated = [newRecord, ...sentRecords.filter((r) => r.company.toLowerCase() !== lead.company.toLowerCase())];
    setSentRecords(updated);

    if (sourceMode === "google_maps") {
      setMapsResults((prev) => prev.filter((item) => item.company.toLowerCase() !== lead.company.toLowerCase()));
    }

    try {
      localStorage.setItem("speedcraft_sent_records", JSON.stringify(updated));
    } catch {}

    showToast(`Marked ${lead.company} as contacted — removed from active queue.`);

    try {
      await fetch("/api/outreach/sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: lead.company,
          email: lead.email,
          method,
          previewUrl,
          action: "mark_sent",
        }),
      });
    } catch (err) {
      console.error("Failed to sync sent record with server:", err);
    }
  };

  // Restore a lead back to the active queue in real time
  const restoreLead = async (company: string, email?: string) => {
    const updated = sentRecords.filter(
      (r) => r.company.toLowerCase() !== company.toLowerCase() && (email ? r.email?.toLowerCase() !== email.toLowerCase() : true)
    );
    setSentRecords(updated);
    try {
      localStorage.setItem("speedcraft_sent_records", JSON.stringify(updated));
    } catch {}

    showToast(`Restored ${company} back to active queue.`);

    try {
      await fetch("/api/outreach/sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          email,
          action: "restore",
        }),
      });
    } catch (err) {
      console.error("Failed to restore on server:", err);
    }
  };

  // Helper to format natural industry phrasing for email copy
  const getIndustrySearchPhrase = (niche?: string): string => {
    const lower = (niche || "").toLowerCase();
    if (lower.includes("european")) return "European auto repair shops";
    if (lower.includes("transmission")) return "transmission and drivetrain repair shops";
    if (lower.includes("ecu") || lower.includes("diagnostic")) return "engine diagnostic and repair shops";
    if (lower.includes("diesel") || lower.includes("fleet")) return "commercial fleet and diesel repair shops";
    return "auto repair shops";
  };

  // ─── CREDIBLE AUTOMOTIVE OUTREACH MESSAGING STRATEGY ───
  const getEmailSubject = (lead: Lead): string => {
    return `Idea for ${lead.company}`;
  };

  const getInitialEmail = (lead: Lead): string => {
    const previewUrl = getPreviewUrlForLead(lead, true);
    const greeting = lead.contactName && lead.contactName !== "there" && !lead.contactName.includes("Team")
      ? lead.contactName
      : `${lead.company} Team`;
    const spec = lead.specialization || lead.niche || "auto repair";
    const industryPhrase = getIndustrySearchPhrase(spec);
    const city = lead.city || "your area";

    return `Hi ${greeting},

I came across your website while looking at ${industryPhrase} in ${city} and wanted to share an idea.

For drivers dealing with a warning light or an unexpected repair, finding the right service and contacting the shop quickly matters. I put together a mobile-focused prototype for ${lead.company} to demonstrate how the experience could be streamlined, with clearer service information, a more direct path to your service desk, and a guided diagnostic intake.

Here’s the prototype:
${previewUrl}

It’s a concept, not a replacement for your existing website. I’d be happy to walk you through the idea and discuss whether it could be useful for your business.

Best,
Faruk
Lead Engineer, Speedcraft Studio`;
  };

  const getFollowUp1 = (lead: Lead): string => {
    const previewUrl = getPreviewUrlForLead(lead, true);
    const greeting = lead.contactName && lead.contactName !== "there" && !lead.contactName.includes("Team")
      ? lead.contactName
      : `${lead.company} Team`;

    return `Hi ${greeting},

Following up on my note with the mobile concept I put together for ${lead.company}:
${previewUrl}

The goal was to demonstrate a clearer path for drivers looking for service or diagnostic help on their phones.

Did you have a chance to take a look?

Best,
Faruk
Lead Engineer, Speedcraft Studio`;
  };

  const getFollowUp2 = (lead: Lead): string => {
    const previewUrl = getPreviewUrlForLead(lead, true);
    const greeting = lead.contactName && lead.contactName !== "there" && !lead.contactName.includes("Team")
      ? lead.contactName
      : `${lead.company} Team`;

    return `Hi ${greeting},

Quick final check to see if reviewing the mobile prototype was of interest for ${lead.company}.

If the timing isn’t right, no worries at all—I'll leave the prototype active at ${previewUrl} in case it’s helpful down the road.

Best,
Faruk
Lead Engineer, Speedcraft Studio`;
  };

  const getLinkedInText = (lead: Lead): string => {
    const previewUrl = getPreviewUrlForLead(lead, true);
    const greeting = lead.contactName && lead.contactName !== "there" && !lead.contactName.includes("Team")
      ? lead.contactName
      : `${lead.company} Team`;
    const spec = lead.specialization || lead.niche || "auto repair";
    const city = lead.city || "your area";

    return `Hi ${greeting}, came across ${lead.company} while looking at ${getIndustrySearchPhrase(spec)} in ${city}. Put together a mobile prototype to show how service information and diagnostic intake could be streamlined for drivers on their phones: ${previewUrl} — thought you might find the concept interesting!`;
  };

  const getModalContent = (lead: Lead, tab: "initial" | "followup_1" | "followup_2" | "linkedin") => {
    switch (tab) {
      case "initial":
        return {
          subject: getEmailSubject(lead),
          body: getInitialEmail(lead),
        };
      case "followup_1":
        return {
          subject: `Re: ${getEmailSubject(lead)}`,
          body: getFollowUp1(lead),
        };
      case "followup_2":
        return {
          subject: `Re: ${getEmailSubject(lead)}`,
          body: getFollowUp2(lead),
        };
      case "linkedin":
        return {
          subject: "",
          body: getLinkedInText(lead),
        };
    }
  };

  const copyPitch = (lead: Lead) => {
    setActivePitchLead(lead);
    setPitchModalTab("initial");
  };

  const getGmailUrl = (lead: Lead, tab: "initial" | "followup_1" | "followup_2" | "linkedin" = "initial") => {
    const content = getModalContent(lead, tab);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(content.subject)}&body=${encodeURIComponent(content.body)}`;
  };

  const handleGmailClick = (lead: Lead, tab: "initial" | "followup_1" | "followup_2" | "linkedin" = "initial") => {
    const url = getGmailUrl(lead, tab);
    window.open(url, "_blank", "noopener,noreferrer");
    markAsSent(lead, "gmail");
  };

  const sendViaApi = async (lead: Lead, tab: "initial" | "followup_1" | "followup_2" | "linkedin" = "initial") => {
    setSendingMap((prev) => ({ ...prev, [lead.company]: "sending" }));
    const previewUrl = getPreviewUrlForLead(lead, true);
    const content = getModalContent(lead, tab);

    try {
      const res = await fetch("/api/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.email,
          subject: content.subject,
          body: content.body,
          company: lead.company,
          previewUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSendingMap((prev) => ({ ...prev, [lead.company]: "sent" }));
      markAsSent(lead, "resend");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSendingMap((prev) => ({ ...prev, [lead.company]: "error" }));
      setErrorMsgMap((prev) => ({ ...prev, [lead.company]: msg }));
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-100 selection:bg-violet-500/30 selection:text-white antialiased">
      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12131a] text-zinc-100 px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 text-xs font-mono backdrop-blur-xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ─── PITCH ASSISTANT & AUTOMOTIVE CONVERSION MODAL ─── */}
      {activePitchLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0e1017] rounded-2xl max-w-2xl w-full border border-white/[0.12] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-black/40 border-b border-white/[0.08] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm tracking-tight text-white">{activePitchLead.company}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {activePitchLead.specialization || activePitchLead.niche || "Automotive Repair"} • {activePitchLead.city}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-amber-400" />
                    <span>QuickFleet UrgentService</span>
                  </span>
                  {(activePitchLead.hasAdTags ?? activePitchLead.hasMarketingPixels ?? false) ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1" title="Evidence of advertising tracking instrumentation (pixels/tags), not verified active ad spend">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Detected Ad Tracking Tags (Strategy A)</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                      <span>No Detected Ad Tags (Strategy B)</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-1.5">
                  {activePitchLead.qualificationReason ||
                    "Verified independent automotive repair facility. Outreach strictly focused on mobile diagnostic booking & service phone access."}
                </p>
              </div>
              <button
                onClick={() => setActivePitchLead(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sequence Selection Tabs */}
            <div className="p-3 bg-white/[0.02] border-b border-white/[0.08] flex flex-wrap items-center gap-2 text-xs font-medium">
              <button
                onClick={() => setPitchModalTab("initial")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "initial"
                    ? "bg-violet-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                {(activePitchLead.hasAdTags ?? activePitchLead.hasMarketingPixels ?? false)
                  ? "Strategy A: Verified Ad Traffic (Initial)"
                  : "Strategy B: Organic Search Conversion (Initial)"}
              </button>
              <button
                onClick={() => setPitchModalTab("followup_1")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "followup_1"
                    ? "bg-violet-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                Follow-up 1 (Day 3)
              </button>
              <button
                onClick={() => setPitchModalTab("followup_2")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "followup_2"
                    ? "bg-violet-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                Follow-up 2 (Final)
              </button>
              <button
                onClick={() => setPitchModalTab("linkedin")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "linkedin"
                    ? "bg-sky-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                LinkedIn DM
              </button>
            </div>

            {/* Pitch Content Display */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {pitchModalTab !== "linkedin" && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Subject Line</div>
                  <div className="p-2.5 bg-black/60 rounded-lg text-xs font-mono font-medium text-zinc-200 border border-white/[0.08] select-all">
                    {getModalContent(activePitchLead, pitchModalTab).subject}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  {pitchModalTab === "linkedin" ? "LinkedIn Direct Message" : "Email Body"}
                </div>
                <pre className="p-4 bg-black/50 border border-white/[0.08] rounded-xl text-xs font-sans text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
                  {getModalContent(activePitchLead, pitchModalTab).body}
                </pre>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-black/40 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const content = getModalContent(activePitchLead, pitchModalTab);
                    const text =
                      pitchModalTab === "linkedin"
                        ? content.body
                        : `Subject: ${content.subject}\n\n${content.body}`;
                    navigator.clipboard.writeText(text);
                    setCopiedId(activePitchLead.company);
                    setTimeout(() => setCopiedId(null), 2000);
                    showToast(`Copied pitch for ${activePitchLead.company} to clipboard!`);
                  }}
                  className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg text-xs font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{copiedId === activePitchLead.company ? "Copied!" : "Copy Draft"}</span>
                </button>

                <button
                  onClick={() => {
                    markAsSent(activePitchLead, "manual");
                    setActivePitchLead(null);
                  }}
                  className="px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg text-xs font-medium text-zinc-300 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Check className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Mark Sent</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {activePitchLead.email && (
                  <>
                    <button
                      onClick={() => {
                        handleGmailClick(activePitchLead, pitchModalTab);
                        setActivePitchLead(null);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail</span>
                    </button>

                    <button
                      onClick={() => {
                        sendViaApi(activePitchLead, pitchModalTab);
                        setActivePitchLead(null);
                      }}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch API</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TOP BAR ─── */}
      <div className="bg-[#090A0F]/90 backdrop-blur-xl text-white border-b border-white/[0.08] px-4 py-3 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/30">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">SPEEDCRAFT</span>
            <span className="text-zinc-700 font-mono">/</span>
            <span className="text-xs text-zinc-400 font-mono tracking-wider">AUTOMOTIVE OUTREACH &amp; DIAGNOSTIC ENGINE</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Niche Pivot: Automotive Only</span>
            </span>
            <Link
              href="/qa-gallery"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/25 hover:bg-violet-500/20 hover:text-white transition-all text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>QA Gallery ({targetedLeadsPool.length})</span>
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Main Studio
            </Link>
            <span className="text-zinc-700">•</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Deduplication Active</span>
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* ─── HEADER COMMAND BAR ─── */}
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>Automotive Repair &amp; Diagnostics • 9 Specialist Segments</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Automotive Outreach, Diagnostic Intake &amp; Prototype Engine
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Target verified independent auto repair shops, European marque specialists, transmission rebuilders, and diesel fleet workshops. Every qualified prospect routes directly to the QuickFleet automotive diagnostic prototype with evidence-based conversion outreach.
              </p>
            </div>

            {/* METRICS WIDGETS */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <div className="bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.14] rounded-xl p-3.5 min-w-[130px] flex-1 sm:flex-none transition-all">
                <div className="text-[11px] text-zinc-400 font-medium">Unsent Prospects</div>
                <div className="text-2xl font-bold text-white font-mono mt-0.5">{activeLeads.length}</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/30 rounded-xl p-3.5 min-w-[130px] flex-1 sm:flex-none transition-all">
                <div className="text-[11px] text-emerald-400 font-medium">Contacted / Dispatched</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">{sentRecords.length}</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/30 rounded-xl p-3.5 min-w-[130px] flex-1 sm:flex-none transition-all">
                <div className="text-[11px] text-amber-300 font-medium">Active Mode</div>
                <div className="text-xs font-bold text-zinc-200 mt-1 uppercase font-mono">
                  {sourceMode === "targeted"
                    ? "Targeted Auto Pool"
                    : sourceMode === "google_maps"
                    ? "Google Maps Live"
                    : "Archived Vault"}
                </div>
              </div>
            </div>
          </div>

          {/* ─── LIVE GOOGLE MAPS SEARCH BAR ─── */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.015] border border-white/[0.08] space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Discover Auto Mechanics On Google Maps:</span>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">
                Worldwide: US, UK, Canada, Australia, etc.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  placeholder="Automotive Specialty (e.g. European Auto Repair, Transmission)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="sm:col-span-4 relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mapsLocation}
                  onChange={(e) => setMapsLocation(e.target.value)}
                  placeholder="City, State / Country (e.g. Dallas, TX or London, UK)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  onClick={() => handleGoogleMapsSearch()}
                  disabled={isSearchingMaps}
                  className="w-full py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-600/25 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSearchingMaps ? "animate-spin" : ""}`} />
                  <span>{isSearchingMaps ? "Querying Maps..." : "Search Auto Shops"}</span>
                </button>
              </div>
            </div>

            {/* QUICK PRESET CHIPS */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="text-zinc-500">Automotive Presets:</span>
              <button
                onClick={() => {
                  setMapsQuery("European Auto Repair");
                  setMapsLocation("Dallas, TX");
                  handleGoogleMapsSearch("European Auto Repair", "Dallas, TX");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Dallas European Auto
              </button>
              <button
                onClick={() => {
                  setMapsQuery("BMW Specialist Repair");
                  setMapsLocation("Austin, TX");
                  handleGoogleMapsSearch("BMW Specialist Repair", "Austin, TX");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Austin BMW &amp; Audi
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Transmission Repair");
                  setMapsLocation("Houston, TX");
                  handleGoogleMapsSearch("Transmission Repair", "Houston, TX");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Houston Transmission
              </button>
              <button
                onClick={() => {
                  setMapsQuery("ECU Automotive Diagnostics");
                  setMapsLocation("London, UK");
                  handleGoogleMapsSearch("ECU Automotive Diagnostics", "London, UK");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                London Euro Diagnostics
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Diesel Fleet Repair");
                  setMapsLocation("Sydney, Australia");
                  handleGoogleMapsSearch("Diesel Fleet Repair", "Sydney, Australia");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Sydney Diesel Fleet
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Engine Diagnostics & Repair");
                  setMapsLocation("Toronto, Canada");
                  handleGoogleMapsSearch("Engine Diagnostics & Repair", "Toronto, Canada");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Toronto Engine Repair
              </button>
            </div>
          </div>

          {/* ─── TABS & SOURCE SELECTOR ─── */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "active"
                    ? "bg-white text-zinc-950 font-bold shadow-sm"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Active Queue ({activeLeads.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("sent")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "sent"
                    ? "bg-emerald-500 text-white font-bold shadow-sm"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Contacted Archive ({sentRecords.length})</span>
              </button>

              <button
                onClick={() => setShowImportDrawer(!showImportDrawer)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  showImportDrawer
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/25"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Audit Shop Website / Import</span>
              </button>
            </div>

            {/* SOURCE SWITCHER: TARGETED AUTO LEADS vs AUDITED VAULT vs GOOGLE MAPS */}
            {activeTab === "active" && (
              <div className="flex flex-wrap items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.08] text-xs font-medium">
                <button
                  onClick={() => setSourceMode("targeted")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    sourceMode === "targeted"
                      ? "bg-amber-600/30 text-amber-200 border border-amber-500/30 font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>Targeted Auto Pool ({targetedLeadsPool.length})</span>
                </button>
                <button
                  onClick={() => setSourceMode("vault")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    sourceMode === "vault"
                      ? "bg-white/[0.1] text-white border border-white/[0.15] font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Archived Vault ({vaultLeads.length})</span>
                </button>
                <button
                  onClick={() => setSourceMode("google_maps")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    sourceMode === "google_maps"
                      ? "bg-amber-600/30 text-amber-200 border border-amber-500/30 font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Maps ({mapsResults.length})</span>
                </button>
              </div>
            )}
          </div>

          {/* ─── LIVE AUDITOR & LEAD IMPORTER DRAWER ─── */}
          {showImportDrawer && (
            <div className="bg-[#0e1017] border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Live Automotive Website Speed Auditor &amp; Lead Importer</h3>
                    <p className="text-[11px] text-zinc-400">
                      Audit any live automotive repair website: scans for advertising tags (Google Ads, Meta Pixel, GTM), tests real mobile page speed, and builds an instant QuickFleet automotive prototype.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg bg-black/50 border border-white/[0.08] p-0.5 text-xs font-medium">
                    <button
                      onClick={() => setImportTab("single")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        importTab === "single" ? "bg-amber-600 text-white font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Single URL Audit
                    </button>
                    <button
                      onClick={() => setImportTab("bulk")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        importTab === "bulk" ? "bg-amber-600 text-white font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Batch CSV / Paste
                    </button>
                  </div>
                  <button
                    onClick={() => setShowImportDrawer(false)}
                    className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* TAB 1: SINGLE URL AUDIT */}
              {importTab === "single" && (
                <form onSubmit={handleSingleAudit} className="space-y-3">
                  <div className="space-y-3">
                    {/* Business Website URL */}
                    <div>
                      <label htmlFor="audit-website-url" className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Repair Shop Website URL <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="audit-website-url"
                        type="url"
                        required
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        placeholder="https://lonestarbimmer.com"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                      />
                    </div>

                    {/* Automotive Specialization Dropdown */}
                    <div>
                      <label htmlFor="audit-client-industry" className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Automotive Specialization <span className="text-rose-400">*</span>
                      </label>
                      <select
                        id="audit-client-industry"
                        required
                        value={auditIndustry}
                        onChange={(e) => setAuditIndustry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white font-medium focus:outline-none focus:border-amber-500"
                      >
                        <option value="" disabled>Select automotive specialization...</option>
                        {AUTOMOTIVE_SPECIALIZATIONS.map((spec) => (
                          <option key={spec} value={spec} className="bg-zinc-900 text-white">
                            {spec}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Optional Metadata Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="audit-company-name" className="block text-[11px] font-medium text-zinc-300 mb-1">
                          Shop Name (Optional)
                        </label>
                        <input
                          id="audit-company-name"
                          type="text"
                          value={auditCompany}
                          onChange={(e) => setAuditCompany(e.target.value)}
                          placeholder="Auto-detected if blank"
                          className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="audit-city-name" className="block text-[11px] font-medium text-zinc-300 mb-1">
                          City / Metro (Optional)
                        </label>
                        <input
                          id="audit-city-name"
                          type="text"
                          value={auditCity}
                          onChange={(e) => setAuditCity(e.target.value)}
                          placeholder="e.g. Dallas, TX or London"
                          className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-[11px] text-zinc-400">
                      Calculates live mobile load speed, scans Google Ads/Meta tags, and generates an evidence-based QuickFleet prototype.
                    </p>
                    <button
                      type="submit"
                      disabled={isAuditing || !auditUrl.trim()}
                      className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 shadow-md shadow-amber-600/25"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
                      <span>{isAuditing ? "Auditing Website..." : "Audit &amp; Add to Active Queue"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: BATCH CSV / URL PASTE */}
              {importTab === "bulk" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Paste List of URLs or CSV Rows (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      placeholder={`Lone Star Bimmer, https://lonestarbimmer.com, Dallas, European Vehicle Specialist\nPrecision Auto Works, https://precisionautonyc.com, New York, Independent Auto Repair`}
                      className="w-full p-3 font-mono text-xs bg-black/60 border border-white/[0.1] rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] text-zinc-400">
                      Accepts direct URLs or CSV rows: <code className="bg-black/60 px-1.5 py-0.5 rounded border border-white/[0.1] font-mono text-[10px] text-amber-300">Shop Name, Website, City, Specialization</code>.
                    </p>
                    <button
                      onClick={handleBulkAudit}
                      disabled={isBulkImporting || !bulkText.trim()}
                      className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 shadow-md shadow-amber-600/25"
                    >
                      <UploadCloud className={`w-3.5 h-3.5 ${isBulkImporting ? "animate-spin" : ""}`} />
                      <span>{isBulkImporting ? "Batch Auditing..." : "Batch Audit &amp; Add to Queue"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── FILTERS (When viewing Targeted or Vault leads) ─── */}
          {activeTab === "active" && sourceMode !== "google_maps" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-white/[0.08]">
              {/* 1. Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search automotive leads...`}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* 2. Specialization filter */}
              <div>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-amber-300 focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="all" className="bg-zinc-900 text-white">All Specializations ({currentLeadsPool.length})</option>
                  {AUTOMOTIVE_SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec} className="bg-zinc-900 text-white">
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Advertising Evidence filter */}
              <div>
                <select
                  value={selectedAdEvidence}
                  onChange={(e) => setSelectedAdEvidence(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="all" className="bg-zinc-900 text-white">All Ad Evidence Status</option>
                  <option value="verified_ads" className="bg-zinc-900 text-emerald-400">🟢 Detected Ad Tracking Tags (Strategy A)</option>
                  <option value="no_detected_ads" className="bg-zinc-900 text-zinc-400">⚪ No Detected Ad Tags (Strategy B)</option>
                </select>
              </div>

              {/* 4. Qualification filter */}
              <div>
                <select
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="all" className="bg-zinc-900 text-white">All Qualifications</option>
                  <option value="qualified" className="bg-zinc-900 text-white">✅ Qualified Repair Shops</option>
                  <option value="unverified" className="bg-zinc-900 text-zinc-400">⚠️ Needs Verification</option>
                </select>
              </div>

              {/* 5. Country filter */}
              <div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-zinc-200 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-zinc-900 text-white">
                      {c === "all" ? `All Countries` : c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ─── TAB 1: ACTIVE PROSPECTS QUEUE ─── */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {sourceMode === "google_maps" && mapsResults.length === 0 ? (
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-10 text-center space-y-4 shadow-xl">
                <MapPin className="w-12 h-12 text-violet-400 mx-auto opacity-75" />
                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-base font-bold text-white">Google Maps Discovery Status</h3>
                  {mapsMetadata?.hint ? (
                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 text-left space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-amber-300">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Google Cloud Action Required</span>
                      </div>
                      <p className="leading-relaxed">{mapsMetadata.hint}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400">
                      Query any city and trade niche in the search bar above to fetch live prospects.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setSourceMode("vault")}
                    className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    View Audited Lead Vault ({vaultLeads.length} Verified Leads)
                  </button>
                  <button
                    onClick={() => handleGoogleMapsSearch(mapsQuery, mapsLocation)}
                    className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-violet-600/25 cursor-pointer"
                  >
                    Retry Google Maps Query
                  </button>
                </div>
              </div>
            ) : activeLeads.length === 0 ? (
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-12 text-center space-y-3 shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Zero Unsent Leads in Current Filter</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  All businesses discovered for this query have been contacted and moved to the Contacted Archive!
                </p>
                <button
                  onClick={() => {
                    setSourceMode("targeted");
                    setSelectedSpecialization("all");
                    setSelectedAdEvidence("all");
                    setSelectedQualification("all");
                    setSelectedCountry("all");
                    setSelectedCity("all");
                    setSearch("");
                  }}
                  className="px-4 py-2 bg-white text-zinc-950 rounded-lg text-xs font-semibold mt-2 cursor-pointer hover:bg-zinc-200 transition-all shadow-sm"
                >
                  Reset Filters &amp; View Targeted Pool
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLeads.map((lead) => {
                  const sendStatus = sendingMap[lead.company] || "idle";
                  const errorMsg = errorMsgMap[lead.company];
                  const hasAds = lead.hasAdTags !== undefined ? lead.hasAdTags : (lead.hasMarketingPixels ?? false);
                  const qual = qualifyAutomotiveLead({
                    company: lead.company,
                    niche: lead.niche,
                    industry: lead.industry,
                    website: lead.website,
                  });
                  const spec = lead.specialization || qual.specialization || lead.niche || "Independent Auto Repair";

                  return (
                    <div
                      key={lead.company}
                      className="bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl p-5 sm:p-6 transition-all duration-200 space-y-4 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-0.5 relative"
                    >
                      {/* CARD TOP INFO */}
                      <div className="space-y-3.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm tracking-tight text-white group-hover:text-amber-200 transition-colors">
                                {lead.company}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                                {lead.countryCode || "US"}
                              </span>
                              <span className="text-[10px] font-medium bg-white/[0.03] text-zinc-400 border border-white/[0.06] px-1.5 py-0.5 rounded">
                                {lead.city}
                              </span>

                              {/* AUTOMOTIVE SPECIALIZATION BADGE */}
                              <span
                                className="text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 border bg-amber-500/10 text-amber-300 border-amber-500/25"
                                title={`Automotive Specialization: ${spec}`}
                              >
                                <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                                <span>{spec}</span>
                              </span>

                              {/* QUALIFICATION BADGE */}
                              {qual.isQualified ? (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                  <span>Verified Repair Shop</span>
                                </span>
                              ) : qual.isDisqualified ? (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 border bg-rose-500/10 text-rose-400 border-rose-500/20">
                                  <X className="w-2.5 h-2.5 text-rose-400" />
                                  <span>Disqualified</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 border bg-zinc-500/10 text-zinc-400 border-zinc-500/20">
                                  <span>Needs Review</span>
                                </span>
                              )}

                              {/* BRAND COLOR SWATCH */}
                              {lead.primaryColor && (
                                <span
                                  className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/[0.08] text-zinc-400"
                                  title={`Brand Color: ${lead.primaryColor}`}
                                >
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0 inline-block ring-1 ring-white/20"
                                    style={{ backgroundColor: lead.primaryColor }}
                                  />
                                  <span>{lead.primaryColor}</span>
                                </span>
                              )}

                              {/* AD-STATUS PILL */}
                              {hasAds ? (
                                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5" title="Evidence of tracking tags (e.g., GTM, Google Ads, Meta Pixel), not proof of active ad spend">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>Detected Ad Tracking Tags (Strategy A)</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                  <span>No Detected Ad Tags (Strategy B)</span>
                                </span>
                              )}

                              {lead.rating && (
                                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                  {lead.rating}★ ({lead.userRatingsTotal || 0})
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                              <Globe className="w-3 h-3 text-zinc-500 shrink-0" />
                              <a
                                href={lead.website || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline text-zinc-300 hover:text-white truncate max-w-[220px]"
                              >
                                {lead.website ? lead.website.replace(/^https?:\/\//, "") : "No website on file"}
                              </a>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                                lead.mobilePageSpeed < 30
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                  : lead.mobilePageSpeed < 70
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              }`}
                            >
                              {lead.mobilePageSpeed}/100 Speed
                            </span>
                            <div className="text-[11px] text-zinc-400 font-mono mt-1">
                              Load: {lead.mobileLoadTimeSec}s
                            </div>
                          </div>
                        </div>

                        {/* TARGET CONTACT & POSITIONING ANGLE STRIP */}
                        <div className="bg-black/50 rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2 border border-white/[0.06]">
                          <div className="space-y-0.5">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Target Contact:</div>
                            <div className="font-mono text-zinc-200 font-medium truncate max-w-[220px]">
                              {lead.email || lead.phone || "Direct Service Desk"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                              Outreach Positioning:
                            </div>
                            <div className={`font-semibold font-mono text-xs ${hasAds ? "text-emerald-400" : "text-amber-400"}`}>
                              {hasAds ? "Strategy A: Ad Click-to-Phone Friction" : "Strategy B: Organic Mobile Intake"}
                            </div>
                          </div>
                        </div>

                        {/* QUALIFICATION EVIDENCE / REASON LINE */}
                        <div className="text-[11px] text-zinc-400 bg-white/[0.02] border border-white/[0.06] rounded-lg px-2.5 py-1.5 font-sans leading-relaxed">
                          <span className="text-zinc-500 font-mono uppercase text-[9px] mr-1.5 font-bold">Evidence:</span>
                          <span>{lead.qualificationReason || qual.reason || "Independent automotive repair shop verified for active diagnostic outreach."}</span>
                        </div>

                        {/* ERROR ALERT IF RESEND RESTRICTED */}
                        {sendStatus === "error" && errorMsg && (
                          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-300 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-rose-200">Resend Restricted:</div>
                              <div className="text-[11px] mt-0.5 text-zinc-300">{errorMsg}</div>
                              <div className="text-[11px] mt-1 font-semibold text-white">
                                Use &quot;Send via Gmail&quot; below to dispatch from your verified inbox and clear this lead from your queue.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.08] text-xs">
                        {/* LIVE PROTOTYPE LINK */}
                        <Link
                          href={getPreviewUrlForLead(lead, false)}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all text-xs border border-white/10 shadow-sm"
                        >
                          <span>Open Prototype</span>
                          <ExternalLink className="w-3 h-3 text-amber-300" />
                        </Link>

                        {/* 1-CLICK SEND VIA GMAIL & CLEAR */}
                        {lead.email ? (
                          <button
                            onClick={() => handleGmailClick(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-all text-xs shadow-md shadow-amber-600/20 cursor-pointer"
                            title="Opens in Gmail and removes from active queue"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Send via Gmail</span>
                          </button>
                        ) : (
                          <a
                            href={lead.website || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 rounded-lg font-semibold transition-all text-xs border border-white/[0.08]"
                            title="No direct email on file - visit website form"
                          >
                            <Globe className="w-3 h-3 text-zinc-400" />
                            <span>Website Form</span>
                          </a>
                        )}

                        {/* PITCH ASSISTANT MODAL TRIGGER */}
                        <button
                          onClick={() => copyPitch(lead)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 rounded-lg font-medium transition-all text-xs cursor-pointer"
                          title="View and customize zero-jargon pitch angles"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Pitch Assistant</span>
                        </button>

                        {/* MANUAL MARK AS CONTACTED / CLEAR */}
                        <button
                          onClick={() => markAsSent(lead, "manual")}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200 border border-white/[0.08] rounded-lg font-medium transition-all text-xs cursor-pointer"
                          title="Mark contacted on LinkedIn/Phone and remove from active queue"
                        >
                          <Check className="w-3 h-3 text-zinc-400" />
                          <span>Mark Sent</span>
                        </button>

                        {/* API SEND BUTTON (RESEND) */}
                        {lead.email && (
                          <button
                            onClick={() => sendViaApi(lead)}
                            disabled={sendStatus === "sending"}
                            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-300 border border-white/[0.06] rounded-lg font-mono text-[11px] cursor-pointer disabled:opacity-40 transition-all"
                          >
                            {sendStatus === "sending" ? (
                              <span>Sending...</span>
                            ) : (
                              <>
                                <Send className="w-3 h-3 text-zinc-500" />
                                <span>Resend API</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: CONTACTED ARCHIVE ─── */}
        {activeTab === "sent" && (
          <div className="space-y-4">
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-bold text-sm text-white">Contacted &amp; Dispatched History</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    These businesses have received cold outreach and are excluded from the main queue to prevent duplicate emails.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {sentRecords.length} Contacted
                </span>
              </div>

              {sentRecords.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500">
                  No outreach dispatched yet. Send an email or mark a lead to populate your archive.
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {sentRecords.map((record, idx) => {
                    const slug = slugify(record.company);
                    return (
                      <div key={idx} className="py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white">{record.company}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06] uppercase">
                              {record.method || "manual"}
                            </span>
                            {record.viewedAt && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400" />
                                <span>Opened Prototype ({record.viewCount || 1}x)</span>
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-400 flex items-center gap-2 flex-wrap">
                            <span>{record.email || "No email listed"}</span>
                            <span>•</span>
                            <span className="font-mono text-zinc-400">
                              Dispatched: {new Date(record.sentAt).toLocaleString()}
                            </span>
                            {record.viewedAt && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-emerald-400 font-medium">
                                  Last viewed: {new Date(record.viewedAt).toLocaleTimeString()}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={record.previewUrl || `/preview/${slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/10"
                          >
                            <span>Prototype</span>
                            <ExternalLink className="w-3 h-3 text-violet-300" />
                          </Link>

                          <button
                            onClick={() => restoreLead(record.company, record.email)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 rounded-lg font-medium cursor-pointer transition-all"
                            title="Restore this business to the active queue"
                          >
                            <RotateCcw className="w-3 h-3 text-zinc-400" />
                            <span>Restore to Queue</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
