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
  Shield,
  Layers,
  Target,
  Database,
} from "lucide-react";
import leadsData from "../../../leads/global_leads_audit.json";
import qualifiedTargetedLeads from "../../../qualified_targeted_leads.json";
import { auditWebsiteAction } from "@/app/actions/audit";
import { getArchetype, getArchetypePrimaryColor } from "@/lib/archetypeMap";
import type { Archetype } from "@/lib/archetypeMap";

export const TARGET_NICHES = [
  "Plumber",
  "HVAC",
  "Roofer",
  "Electrician",
  "Auto Mechanic",
  "Law Firm",
  "CPA",
  "Dentist",
  "MedSpa",
  "Other",
] as const;

export interface Lead {
  company: string;
  website: string;
  country: string;
  countryCode: string;
  city: string;
  niche: string;
  industry?: string;
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
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [selectedArchetype, setSelectedArchetype] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingMap, setSendingMap] = useState<Record<string, "idle" | "sending" | "sent" | "error">>({});
  const [errorMsgMap, setErrorMsgMap] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pitch Angle & Modal States (Zero-Jargon Conversion Messaging)
  const [pitchAngle, setPitchAngle] = useState<"wasted_ads" | "direct_punchy">("wasted_ads");
  const [activePitchLead, setActivePitchLead] = useState<Lead | null>(null);
  const [pitchModalTab, setPitchModalTab] = useState<"email_wasted" | "email_direct" | "linkedin">("email_wasted");

  // Google Maps Search States
  const [mapsQuery, setMapsQuery] = useState("Emergency Plumber");
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

  // Curated Targeted Ad Leads (69 high-value leads with verified ad spend)
  const targetedLeadsPool = useMemo(() => {
    return (qualifiedTargetedLeads as Lead[]).map((l) => {
      const arch = l.archetype || getArchetype(l.industry || l.niche);
      const color = l.primaryColor || getArchetypePrimaryColor(l.industry || l.niche, arch);
      return {
        ...l,
        archetype: arch,
        primaryColor: color,
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
  const [auditIndustry, setAuditIndustry] = useState<string>("Plumber");
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
      counts[l.country] = (counts[l.country] || 0) + 1;
    });
    return ["all", ...Object.keys(counts).sort()];
  }, [currentLeadsPool]);

  // Dynamic City list (scoped to selected country)
  const cities = useMemo(() => {
    const scoped = selectedCountry === "all" ? currentLeadsPool : currentLeadsPool.filter((l) => l.country === selectedCountry);
    return ["all", ...new Set(scoped.map((l) => l.city))].sort();
  }, [currentLeadsPool, selectedCountry]);

  // Dynamic Niche list
  const niches = useMemo(() => {
    const scoped = selectedCountry === "all" ? currentLeadsPool : currentLeadsPool.filter((l) => l.country === selectedCountry);
    return ["all", ...new Set(scoped.map((l) => l.niche || l.industry || ""))].filter(Boolean).sort();
  }, [currentLeadsPool, selectedCountry]);

  // Filtered Leads
  const filteredAll = useMemo(() => {
    return currentLeadsPool.filter((lead) => {
      const matchesSearch =
        lead.company.toLowerCase().includes(search.toLowerCase()) ||
        (lead.website && lead.website.toLowerCase().includes(search.toLowerCase())) ||
        (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
        (lead.city && lead.city.toLowerCase().includes(search.toLowerCase())) ||
        (lead.country && lead.country.toLowerCase().includes(search.toLowerCase()));

      if (sourceMode === "google_maps") return matchesSearch;

      const matchesCountry = selectedCountry === "all" || lead.country === selectedCountry;
      const matchesCity = selectedCity === "all" || lead.city.toLowerCase() === selectedCity.toLowerCase();
      const rawNiche = (lead.niche || lead.industry || "").toLowerCase();
      const matchesNiche = selectedNiche === "all" || rawNiche === selectedNiche.toLowerCase();
      const leadArchetype = lead.archetype || getArchetype(lead.industry || lead.niche || "");
      const matchesArchetype = selectedArchetype === "all" || leadArchetype === selectedArchetype;

      return matchesSearch && matchesCountry && matchesCity && matchesNiche && matchesArchetype;
    });
  }, [currentLeadsPool, search, selectedCountry, selectedCity, selectedNiche, selectedArchetype, sourceMode]);

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

  // Google Maps Search Action
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
        showToast(`Discovered ${data.uncontactedCount} uncontacted businesses on Google Maps.`);
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
          ? "🟢 Active Ad Spend Detected (Wasted Ad Spend Pitch)"
          : "⚪ No Ad Tags Found (Lost Organic SEO Pitch)";
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
          industry: niche || auditIndustry || "Other",
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
    showToast(`Successfully audited & imported ${successCount} leads into queue!`);
    setShowImportDrawer(false);
    setSourceMode("vault");
  };

  // Generate accurate preview URL for any lead (Targeted, Vault, or Google Maps)
  const getPreviewUrlForLead = (lead: Lead, absolute: boolean = false): string => {
    const slug = slugify(lead.company);
    const origin = typeof window !== "undefined"
      ? window.location.origin
      : "https://agency-landing-page-smoky-psi.vercel.app";
    const base = absolute ? origin : "";

    const params = new URLSearchParams();
    if (lead.company) params.set("name", lead.company);
    if (lead.city) params.set("city", lead.city);
    const ind = lead.industry || lead.niche;
    if (ind) {
      params.set("industry", ind);
      params.set("niche", ind);
    }
    if (lead.phone) params.set("phone", lead.phone);
    const brandColor = lead.primaryColor || getArchetypePrimaryColor(ind, lead.archetype);
    if (brandColor) params.set("primaryColor", brandColor);
    if (lead.website) params.set("domain", lead.website);
    if (lead.mobilePageSpeed) params.set("speed", String(lead.mobilePageSpeed));
    if (lead.mobileLoadTimeSec) params.set("load", String(lead.mobileLoadTimeSec));
    if (lead.estLostMonthlySpend) params.set("waste", String(lead.estLostMonthlySpend));

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

    // Update state immediately in real time
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

  const getEmailSubject = (lead: Lead, angle: "wasted_ads" | "direct_punchy" = pitchAngle): string => {
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const hasAds = lead.hasAdTags !== undefined ? lead.hasAdTags : (lead.hasMarketingPixels ?? false);

    // If hasAdTags is false: Pitch "Lost Organic SEO Traffic due to slow mobile speeds"
    if (!hasAds) {
      return `Lost organic SEO traffic due to slow mobile speeds / ${domainClean}`;
    }

    // If hasAdTags is true: Pitch "Wasted Ad Spend / Leaked Paid Clicks"
    if (angle === "wasted_ads") {
      return `Your Google Ads / ${lead.company}`;
    }
    return `Wasted ad spend & mobile site speed for ${domainClean}`;
  };

  const getEmailBody = (lead: Lead, angle: "wasted_ads" | "direct_punchy" = pitchAngle): string => {
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = getPreviewUrlForLead(lead, true);
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;
    const hasAds = lead.hasAdTags !== undefined ? lead.hasAdTags : (lead.hasMarketingPixels ?? false);
    const leadIndustry = lead.industry || lead.niche || "local";

    // Pitch Angle: Lost Organic SEO Traffic due to slow mobile speeds (when hasAdTags is false)
    if (!hasAds) {
      if (angle === "direct_punchy") {
        return `Hey ${greeting},

I noticed your mobile site at ${domainClean} takes ${lead.mobileLoadTimeSec} seconds to load.

Google's search algorithm heavily penalizes slow mobile pages, meaning you are steadily dropping in organic rankings and losing search visitors to faster competitors before they even view your services.

I built a sub-second, lightning-fast test version of your exact landing page:
Link: ${previewUrl}

If you want to recapture lost organic SEO traffic and boost your mobile Google ranking, would you be open to a quick chat about getting this live on your main domain?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: farukolawale509@gmail.com`;
      }

      return `Hey ${greeting},

I was looking up top ${leadIndustry} businesses in ${lead.city || "your area"} and came across ${domainClean}, but noticed your mobile site takes about ${lead.mobileLoadTimeSec} seconds to load.

Because Google strongly penalizes slow mobile load times in organic search rankings, you are steadily losing prospective clients and organic search traffic to faster competitors before your page even loads.

I run Speedcraft Studio. To demonstrate what a modern, high-performance site feels like, I built a custom, instant-loading version of your landing page that opens in under half a second.

Take a look on your phone to feel the speed difference:
Link: ${previewUrl}

Zero strings attached. If you'd like to recapture lost organic SEO traffic and boost your mobile Google ranking, would you be open to a quick chat about deploying this to your actual domain?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: farukolawale509@gmail.com`;
    }

    // Pitch Angle: Wasted Ad Spend / Leaked Paid Clicks (when hasAdTags is true)
    if (angle === "wasted_ads") {
      return `Hey ${greeting},

I noticed you're driving search traffic to ${domainClean}, but the mobile landing page takes about ${lead.mobileLoadTimeSec} seconds to load.

Because mobile users are impatient, you are likely losing about a third of your paid visitors before your site even loads. Wasted ad spend and leaked paid clicks mean Google is charging you for clicks that bounce before prospective clients ever see your phone number.

I run Speedcraft Studio. To show you what you're missing, I went ahead and built a custom, lightning-fast version of your landing page. It loads instantly (under half a second).

Take a look on your phone to feel the speed difference:
Link: ${previewUrl}

Zero strings attached. If you like the feel of it, would you like me to set this up on your actual domain so you stop leaking paid ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: farukolawale509@gmail.com`;
    }

    return `Hey ${greeting},

I noticed you are paying for search ads, but your mobile landing page takes ${lead.mobileLoadTimeSec} seconds to load. Wasted ad spend due to slow mobile load times means you are losing a massive chunk of paid clicks before they even see your phone number.

I help businesses fix this. I actually built a lightning-fast test version of your exact landing page to show you the difference.

Tap this link on your phone to see how fast your site should be:
Link: ${previewUrl}

If you want to stop losing paid traffic to slow load times, would you be open to a quick chat about getting this new version running on your main domain?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: farukolawale509@gmail.com`;
  };

  const getLinkedInText = (lead: Lead): string => {
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = getPreviewUrlForLead(lead, true);
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;
    const hasAds = lead.hasAdTags !== undefined ? lead.hasAdTags : (lead.hasMarketingPixels ?? false);

    if (!hasAds) {
      return `Hey ${greeting}, saw ${domainClean}. Your mobile site takes ${lead.mobileLoadTimeSec}s to load, which hurts your organic search rankings and causes visitors to bounce. I built a lightning-fast test version that loads in under half a second: ${previewUrl} — want to check it out?`;
    }

    return `Hey ${greeting}, saw ${domainClean}. Your mobile site takes ${lead.mobileLoadTimeSec}s to load, which means you're likely losing paid leads before they can call you. I built a lightning-fast test version that loads in under half a second so customers don't bounce: ${previewUrl} — want to check it out?`;
  };

  const copyPitch = (lead: Lead) => {
    setActivePitchLead(lead);
    setPitchModalTab("email_wasted");
  };

  const getGmailUrl = (lead: Lead, angle: "wasted_ads" | "direct_punchy" = pitchAngle) => {
    const subject = getEmailSubject(lead, angle);
    const body = getEmailBody(lead, angle);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleGmailClick = (lead: Lead, angle: "wasted_ads" | "direct_punchy" = pitchAngle) => {
    const url = getGmailUrl(lead, angle);
    window.open(url, "_blank", "noopener,noreferrer");
    markAsSent(lead, "gmail");
  };

  const sendViaApi = async (lead: Lead, angle: "wasted_ads" | "direct_punchy" = pitchAngle) => {
    setSendingMap((prev) => ({ ...prev, [lead.company]: "sending" }));
    const previewUrl = getPreviewUrlForLead(lead, true);
    const subject = getEmailSubject(lead, angle);
    const body = getEmailBody(lead, angle);

    try {
      const res = await fetch("/api/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.email,
          subject,
          body,
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

      {/* ─── PITCH ASSISTANT & JARGON-FREE MODAL ─── */}
      {activePitchLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0e1017] rounded-2xl max-w-2xl w-full border border-white/[0.12] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-black/40 border-b border-white/[0.08] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm tracking-tight text-white">{activePitchLead.company}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {activePitchLead.industry || activePitchLead.niche} • {activePitchLead.city}
                  </span>
                  {(() => {
                    const arch = activePitchLead.archetype || getArchetype(activePitchLead.industry || activePitchLead.niche || "");
                    return (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/15">
                        {arch} Archetype
                      </span>
                    );
                  })()}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {(activePitchLead.hasAdTags ?? activePitchLead.hasMarketingPixels ?? false)
                    ? "High-converting, zero-jargon pitch focused strictly on wasted ad spend & leaked paid clicks."
                    : "High-converting pitch focused on recovering lost organic SEO traffic due to slow mobile speeds."}
                </p>
              </div>
              <button
                onClick={() => setActivePitchLead(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Angle Selection Tabs */}
            <div className="p-3.5 bg-white/[0.02] border-b border-white/[0.08] flex flex-wrap items-center gap-2 text-xs font-medium">
              <button
                onClick={() => setPitchModalTab("email_wasted")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "email_wasted"
                    ? "bg-violet-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                {(activePitchLead.hasAdTags ?? activePitchLead.hasMarketingPixels ?? false)
                  ? "Angle 1: Wasted Ad Spend / Leaked Paid Clicks (Recommended)"
                  : "Angle 1: Lost Organic SEO Traffic (Recommended)"}
              </button>
              <button
                onClick={() => setPitchModalTab("email_direct")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "email_direct"
                    ? "bg-violet-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                Angle 2: Direct & Punchy
              </button>
              <button
                onClick={() => setPitchModalTab("linkedin")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  pitchModalTab === "linkedin"
                    ? "bg-sky-600 text-white font-semibold shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                Angle 3: LinkedIn DM
              </button>
            </div>

            {/* Pitch Content Display */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {pitchModalTab !== "linkedin" && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Subject Line</div>
                  <div className="p-2.5 bg-black/60 rounded-lg text-xs font-mono font-medium text-zinc-200 border border-white/[0.08] select-all">
                    {getEmailSubject(activePitchLead, pitchModalTab === "email_wasted" ? "wasted_ads" : "direct_punchy")}
                  </div>
                </div>
              )}

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  {pitchModalTab === "linkedin" ? "LinkedIn Direct Message" : "Email Body"}
                </div>
                <pre className="p-4 bg-black/50 border border-white/[0.08] rounded-xl text-xs font-sans text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
                  {pitchModalTab === "linkedin"
                    ? getLinkedInText(activePitchLead)
                    : getEmailBody(activePitchLead, pitchModalTab === "email_wasted" ? "wasted_ads" : "direct_punchy")}
                </pre>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-black/40 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text =
                      pitchModalTab === "linkedin"
                        ? getLinkedInText(activePitchLead)
                        : `Subject: ${getEmailSubject(
                            activePitchLead,
                            pitchModalTab === "email_wasted" ? "wasted_ads" : "direct_punchy"
                          )}\n\n${getEmailBody(
                            activePitchLead,
                            pitchModalTab === "email_wasted" ? "wasted_ads" : "direct_punchy"
                          )}`;
                    navigator.clipboard.writeText(text);
                    setCopiedId(activePitchLead.company);
                    setTimeout(() => setCopiedId(null), 2000);
                    showToast(`Copied pitch for ${activePitchLead.company} to clipboard!`);
                  }}
                  className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg text-xs font-semibold text-zinc-200 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{copiedId === activePitchLead.company ? "Copied!" : "Copy Pitch"}</span>
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
                        const angle = pitchModalTab === "email_wasted" ? "wasted_ads" : "direct_punchy";
                        handleGmailClick(activePitchLead, angle);
                        setActivePitchLead(null);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail</span>
                    </button>

                    <button
                      onClick={() => {
                        const angle = pitchModalTab === "email_wasted" ? "wasted_ads" : "direct_punchy";
                        sendViaApi(activePitchLead, angle);
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
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-violet-500/30">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">SPEEDCRAFT</span>
            <span className="text-zinc-700 font-mono">/</span>
            <span className="text-xs text-zinc-400 font-mono tracking-wider">LIVE DISCOVERY &amp; OUTREACH ENGINE</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 px-1.5">Angle:</span>
              <button
                onClick={() => setPitchAngle("wasted_ads")}
                className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-all ${
                  pitchAngle === "wasted_ads" ? "bg-violet-600 text-white font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
                }`}
                title="Framed around wasted Google Ads budget & impatient mobile visitors"
              >
                Wasted Ad Spend
              </button>
              <button
                onClick={() => setPitchAngle("direct_punchy")}
                className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-all ${
                  pitchAngle === "direct_punchy" ? "bg-violet-600 text-white font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
                }`}
                title="Direct, punchy message highlighting lost phone calls & leads"
              >
                Direct &amp; Punchy
              </button>
            </div>
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Deduplication Active</span>
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* ─── HEADER COMMAND BAR ─── */}
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/25 text-xs font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>Real-Time Business Discovery &amp; 3 UI Archetypes</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Live Outreach, Google Maps &amp; Prototype Engine
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Seamlessly target high-intent local businesses mapped into 3 conversion archetypes: Urgent Service, Professional Trust, and Aesthetic Booking. Contacted targets vanish immediately from your dashboard to prevent duplicate outreach.
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
              <div className="bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/30 rounded-xl p-3.5 min-w-[130px] flex-1 sm:flex-none transition-all">
                <div className="text-[11px] text-violet-300 font-medium">Active Mode</div>
                <div className="text-xs font-bold text-zinc-200 mt-1 uppercase font-mono">
                  {sourceMode === "targeted"
                    ? "Targeted Ad Pool"
                    : sourceMode === "google_maps"
                    ? "Google Maps Live"
                    : "Audited Vault"}
                </div>
              </div>
            </div>
          </div>

          {/* ─── LIVE GOOGLE MAPS SEARCH BAR ─── */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.015] border border-white/[0.08] space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span>Fetch Directly From Google Maps:</span>
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
                  placeholder="Target Niche (e.g. Emergency Plumber, Roofing)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
                />
              </div>

              <div className="sm:col-span-4 relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mapsLocation}
                  onChange={(e) => setMapsLocation(e.target.value)}
                  placeholder="City, State / Country (e.g. Dallas, TX or London, UK)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  onClick={() => handleGoogleMapsSearch()}
                  disabled={isSearchingMaps}
                  className="w-full py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-violet-600/25 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSearchingMaps ? "animate-spin" : ""}`} />
                  <span>{isSearchingMaps ? "Querying Maps..." : "Search Google Maps"}</span>
                </button>
              </div>
            </div>

            {/* QUICK PRESET CHIPS */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="text-zinc-500">Quick Searches:</span>
              <button
                onClick={() => {
                  setMapsQuery("Emergency Plumber");
                  setMapsLocation("Dallas, TX");
                  handleGoogleMapsSearch("Emergency Plumber", "Dallas, TX");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Dallas Plumbers
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Boiler Repair");
                  setMapsLocation("London, UK");
                  handleGoogleMapsSearch("Boiler Repair", "London, UK");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                London Boiler Repair
              </button>
              <button
                onClick={() => {
                  setMapsQuery("HVAC Services");
                  setMapsLocation("Toronto, Canada");
                  handleGoogleMapsSearch("HVAC Services", "Toronto, Canada");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Toronto HVAC
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Commercial Roofing");
                  setMapsLocation("Miami, FL");
                  handleGoogleMapsSearch("Commercial Roofing", "Miami, FL");
                }}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.16] text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Miami Roofing
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
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 border border-violet-500/25"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Audit Any Website / Import</span>
              </button>
            </div>

            {/* SOURCE SWITCHER: TARGETED AD LEADS vs AUDITED VAULT vs GOOGLE MAPS */}
            {activeTab === "active" && (
              <div className="flex flex-wrap items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.08] text-xs font-medium">
                <button
                  onClick={() => setSourceMode("targeted")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    sourceMode === "targeted"
                      ? "bg-violet-600/30 text-violet-200 border border-violet-500/30 font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-violet-400" />
                  <span>Targeted Ad Leads ({targetedLeadsPool.length})</span>
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
                  <span>Audited Vault ({vaultLeads.length})</span>
                </button>
                <button
                  onClick={() => setSourceMode("google_maps")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    sourceMode === "google_maps"
                      ? "bg-violet-600/30 text-violet-200 border border-violet-500/30 font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-violet-400" />
                  <span>Google Maps ({mapsResults.length})</span>
                </button>
              </div>
            )}
          </div>

          {/* ─── LIVE AUDITOR & LEAD IMPORTER DRAWER ─── */}
          {showImportDrawer && (
            <div className="bg-[#0e1017] border border-violet-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-violet-500/30">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Live Website Speed Auditor &amp; Lead Importer</h3>
                    <p className="text-[11px] text-zinc-400">
                      Audit any live website on the internet: calculates real PageSpeed, detects CMS bloat, and creates an instant sub-second Next.js prototype.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg bg-black/50 border border-white/[0.08] p-0.5 text-xs font-medium">
                    <button
                      onClick={() => setImportTab("single")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        importTab === "single" ? "bg-violet-600 text-white font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Single URL Audit
                    </button>
                    <button
                      onClick={() => setImportTab("bulk")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        importTab === "bulk" ? "bg-violet-600 text-white font-semibold shadow-xs" : "text-zinc-400 hover:text-white"
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
                        Business Website URL <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="audit-website-url"
                        type="url"
                        required
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        placeholder="https://exampleplumber.com"
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
                      />
                    </div>

                    {/* Client Industry Dropdown */}
                    <div>
                      <label htmlFor="audit-client-industry" className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Client Industry <span className="text-rose-400">*</span>
                      </label>
                      <select
                        id="audit-client-industry"
                        required
                        value={auditIndustry}
                        onChange={(e) => setAuditIndustry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white font-medium focus:outline-none focus:border-violet-500"
                      >
                        <option value="" disabled>Select client industry...</option>
                        {TARGET_NICHES.map((niche) => (
                          <option key={niche} value={niche} className="bg-zinc-900 text-white">
                            {niche}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Optional Metadata Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="audit-company-name" className="block text-[11px] font-medium text-zinc-300 mb-1">
                          Company Name (Optional)
                        </label>
                        <input
                          id="audit-company-name"
                          type="text"
                          value={auditCompany}
                          onChange={(e) => setAuditCompany(e.target.value)}
                          placeholder="Auto-detected if blank"
                          className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
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
                          placeholder="e.g. Austin, TX or London"
                          className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <p className="text-[11px] text-zinc-400">
                      Calculates live mobile load speed, detects CMS bloat (WordPress, Elementor, Divi), computes lost ad spend, and prepares cold outreach email.
                    </p>
                    <button
                      type="submit"
                      disabled={isAuditing || !auditUrl.trim()}
                      className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 shadow-md shadow-violet-600/25"
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
                      placeholder={`https://austinemergencyplumbing.com\nhttps://dfwmasterelectric.com\n"Summit Roofing", https://summitroofing.com, "Denver", "Roofing"`}
                      className="w-full p-3 font-mono text-xs bg-black/60 border border-white/[0.1] rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] text-zinc-400">
                      Accepts direct URLs or CSV rows: <code className="bg-black/60 px-1.5 py-0.5 rounded border border-white/[0.1] font-mono text-[10px] text-violet-300">Company, Website, City, Niche</code>.
                    </p>
                    <button
                      onClick={handleBulkAudit}
                      disabled={isBulkImporting || !bulkText.trim()}
                      className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 shadow-md shadow-violet-600/25"
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
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Filter ${sourceMode === "targeted" ? "targeted leads" : "vault"}...`}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <select
                  value={selectedArchetype}
                  onChange={(e) => setSelectedArchetype(e.target.value as "all" | Archetype)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-violet-300 focus:outline-none focus:border-violet-500 font-semibold"
                >
                  <option value="all" className="bg-zinc-900 text-white">All Archetypes</option>
                  <option value="UrgentService" className="bg-zinc-900 text-white">⚡ Urgent Service (5 Niches)</option>
                  <option value="ProfessionalTrust" className="bg-zinc-900 text-white">🛡️ Professional Trust (Law / CPA)</option>
                  <option value="AestheticBooking" className="bg-zinc-900 text-white">✨ Aesthetic Booking (Dentist / MedSpa)</option>
                  <option value="Generic" className="bg-zinc-900 text-white">📦 Generic</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-zinc-200 focus:outline-none focus:border-violet-500 font-medium"
                >
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-zinc-900 text-white">
                      {c === "all" ? `All Countries (${currentLeadsPool.length})` : c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-zinc-200 focus:outline-none focus:border-violet-500"
                >
                  {cities.map((city) => (
                    <option key={city} value={city} className="bg-zinc-900 text-white">
                      {city === "all" ? "All Cities" : city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/50 border border-white/[0.08] hover:border-white/[0.14] rounded-lg text-zinc-200 focus:outline-none focus:border-violet-500"
                >
                  {niches.map((niche) => (
                    <option key={niche} value={niche} className="bg-zinc-900 text-white">
                      {niche === "all" ? "All Niches" : niche}
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
                    setSelectedArchetype("all");
                    setSelectedCountry("all");
                    setSelectedCity("all");
                    setSelectedNiche("all");
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
                              <span className="font-bold text-sm tracking-tight text-white group-hover:text-violet-200 transition-colors">
                                {lead.company}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                                {lead.countryCode || "AU"}
                              </span>
                              <span className="text-[10px] font-medium bg-white/[0.03] text-zinc-400 border border-white/[0.06] px-1.5 py-0.5 rounded">
                                {lead.city}
                              </span>

                              {/* ARCHETYPE BADGE */}
                              {(() => {
                                const leadArchetype = lead.archetype || getArchetype(lead.industry || lead.niche || "");
                                return (
                                  <span
                                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                                      leadArchetype === "UrgentService"
                                        ? "bg-amber-500/10 text-amber-300 border-amber-500/25"
                                        : leadArchetype === "ProfessionalTrust"
                                        ? "bg-sky-500/10 text-sky-300 border-sky-500/25"
                                        : leadArchetype === "AestheticBooking"
                                        ? "bg-rose-500/10 text-rose-300 border-rose-500/25"
                                        : "bg-zinc-500/10 text-zinc-400 border-zinc-500/25"
                                    }`}
                                    title={`UI Archetype: ${leadArchetype}`}
                                  >
                                    {leadArchetype === "UrgentService" && <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />}
                                    {leadArchetype === "ProfessionalTrust" && <Shield className="w-2.5 h-2.5 text-sky-400" />}
                                    {leadArchetype === "AestheticBooking" && <Sparkles className="w-2.5 h-2.5 text-rose-400" />}
                                    {leadArchetype === "Generic" && <Layers className="w-2.5 h-2.5 text-zinc-400" />}
                                    <span>{leadArchetype}</span>
                                  </span>
                                );
                              })()}

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

                              {/* INDUSTRY / NICHE PILL */}
                              {(lead.industry || lead.niche) && (
                                <span className="text-[10px] font-medium bg-white/[0.03] text-zinc-400 border border-white/[0.06] px-1.5 py-0.5 rounded">
                                  {lead.industry || lead.niche}
                                </span>
                              )}

                              {/* AD-STATUS PILL */}
                              {(lead.hasAdTags !== undefined ? lead.hasAdTags : lead.hasMarketingPixels !== undefined ? lead.hasMarketingPixels : lead.coldEmailSubject?.toLowerCase().includes("ads")) ? (
                                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>Active Ad Spend</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                  <span>Organic SEO Pitch</span>
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

                        {/* EMAIL & AD/ORGANIC WASTE (RECESSED TELEMETRY STRIP) */}
                        <div className="bg-black/50 rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2 border border-white/[0.06]">
                          <div className="space-y-0.5">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Target Contact:</div>
                            <div className="font-mono text-zinc-200 font-medium truncate max-w-[220px]">
                              {lead.email || lead.phone || "Contact via Website"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                              {(lead.hasAdTags === false || (lead.hasAdTags === undefined && lead.hasMarketingPixels === false)) ? "Organic Penalty:" : "Est. Ad Waste:"}
                            </div>
                            <div className={`font-bold font-mono ${(lead.hasAdTags === false || (lead.hasAdTags === undefined && lead.hasMarketingPixels === false)) ? "text-amber-400" : "text-rose-400"}`}>
                              {(lead.hasAdTags === false || (lead.hasAdTags === undefined && lead.hasMarketingPixels === false))
                                ? `~${Math.round((1 - lead.mobilePageSpeed / 100) * 45)}% Bounce Rate`
                                : `~${lead.currencySymbol || "$"}${lead.estLostMonthlySpend} ${lead.currency || "USD"}/mo`}
                            </div>
                          </div>
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
                          <ExternalLink className="w-3 h-3 text-violet-300" />
                        </Link>

                        {/* 1-CLICK SEND VIA GMAIL & CLEAR */}
                        {lead.email ? (
                          <button
                            onClick={() => handleGmailClick(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-semibold transition-all text-xs shadow-md shadow-violet-600/20 cursor-pointer"
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
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/25 rounded-lg font-medium transition-all text-xs cursor-pointer"
                          title="View and customize zero-jargon pitch angles"
                        >
                          <Sparkles className="w-3 h-3 text-violet-400" />
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
