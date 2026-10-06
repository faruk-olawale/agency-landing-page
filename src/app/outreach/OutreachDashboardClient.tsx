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
  ArrowRight,
  TrendingDown,
  Gauge,
  Send,
  AlertCircle,
  Phone,
  CheckCircle2,
  Flame,
  Globe,
  CheckCheck,
  RotateCcw,
  ShieldCheck,
  Building2,
  Trash2,
  Filter,
  DollarSign,
  MapPin,
  Sparkles,
  RefreshCw,
  Compass,
  Plus,
  UploadCloud,
  X,
  FileSpreadsheet
} from "lucide-react";
import leadsData from "../../../leads/global_leads_audit.json";

export interface Lead {
  company: string;
  website: string;
  country: string;
  countryCode: string;
  city: string;
  niche: string;
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
}

export interface SentRecord {
  company: string;
  email?: string;
  sentAt: string;
  method?: string;
  status: string;
  previewUrl?: string;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

interface OutreachClientProps {
  initialSentRecords?: SentRecord[];
}

export function OutreachDashboardClient({ initialSentRecords = [] }: OutreachClientProps) {
  const [activeTab, setActiveTab] = useState<"active" | "sent">("active");
  const [sourceMode, setSourceMode] = useState<"vault" | "google_maps">("vault");
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingMap, setSendingMap] = useState<Record<string, "idle" | "sending" | "sent" | "error">>({});
  const [errorMsgMap, setErrorMsgMap] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
          setSentRecords(parsed);
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

  const [vaultLeads, setVaultLeads] = useState<Lead[]>(leadsData as Lead[]);

  // Instant URL Auditor & Importer States
  const [showImportDrawer, setShowImportDrawer] = useState(false);
  const [importTab, setImportTab] = useState<"single" | "bulk">("single");
  const [auditUrl, setAuditUrl] = useState("");
  const [auditCompany, setAuditCompany] = useState("");
  const [auditCity, setAuditCity] = useState("");
  const [auditNiche, setAuditNiche] = useState("Plumbing");
  const [isAuditing, setIsAuditing] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [isBulkImporting, setIsBulkImporting] = useState(false);

  // Dynamic Country list from vault
  const countries = useMemo(() => {
    const counts: Record<string, number> = {};
    vaultLeads.forEach((l) => {
      counts[l.country] = (counts[l.country] || 0) + 1;
    });
    return ["all", ...Object.keys(counts).sort()];
  }, [vaultLeads]);

  // Dynamic City list (scoped to selected country)
  const cities = useMemo(() => {
    const scoped = selectedCountry === "all" ? vaultLeads : vaultLeads.filter((l) => l.country === selectedCountry);
    return ["all", ...new Set(scoped.map((l) => l.city))].sort();
  }, [vaultLeads, selectedCountry]);

  // Dynamic Niche list
  const niches = useMemo(() => {
    const scoped = selectedCountry === "all" ? vaultLeads : vaultLeads.filter((l) => l.country === selectedCountry);
    return ["all", ...new Set(scoped.map((l) => l.niche))].sort();
  }, [vaultLeads, selectedCountry]);

  // Active dataset depending on mode
  const currentLeadsPool = sourceMode === "google_maps" ? mapsResults : vaultLeads;

  // Filtered Leads
  const filteredAll = useMemo(() => {
    return currentLeadsPool.filter((lead) => {
      const matchesSearch =
        lead.company.toLowerCase().includes(search.toLowerCase()) ||
        lead.website.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.city.toLowerCase().includes(search.toLowerCase()) ||
        lead.country.toLowerCase().includes(search.toLowerCase());

      if (sourceMode === "google_maps") return matchesSearch;

      const matchesCountry = selectedCountry === "all" || lead.country === selectedCountry;
      const matchesCity = selectedCity === "all" || lead.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesNiche = selectedNiche === "all" || lead.niche.toLowerCase() === selectedNiche.toLowerCase();
      return matchesSearch && matchesCountry && matchesCity && matchesNiche;
    });
  }, [currentLeadsPool, search, selectedCountry, selectedCity, selectedNiche, sourceMode]);

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
    } catch (err: any) {
      showToast(`Search error: ${err.message}`);
    } finally {
      setIsSearchingMaps(false);
    }
  };

  const handleSingleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl.trim()) return;

    setIsAuditing(true);
    try {
      const res = await fetch("/api/outreach/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: auditUrl.trim(),
          company: auditCompany.trim() || undefined,
          city: auditCity.trim() || undefined,
          niche: auditNiche.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setVaultLeads((prev) => [data.lead, ...prev]);
        setAuditUrl("");
        setAuditCompany("");
        setAuditCity("");
        showToast(`Audited ${data.lead.company} (${data.lead.mobilePageSpeed}/100 Speed) — added to queue!`);
        setShowImportDrawer(false);
        setSourceMode("vault");
      } else {
        throw new Error(data.error || "Failed to audit website");
      }
    } catch (err: any) {
      showToast(`Audit error: ${err.message}`);
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
      let niche = "";

      if (parts.length > 1) {
        if (parts[1].startsWith("http") || parts[1].includes(".")) {
          company = parts[0];
          url = parts[1];
          city = parts[2] || "";
          niche = parts[3] || "";
        } else {
          url = parts[0];
          company = parts[1] || "";
          city = parts[2] || "";
          niche = parts[3] || "";
        }
      }

      try {
        const res = await fetch("/api/outreach/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: url, company, city, niche }),
        });
        const data = await res.json();
        if (data.success && data.lead) {
          setVaultLeads((prev) => [data.lead, ...prev]);
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

  // Register a lead as sent in real time
  const markAsSent = async (lead: Lead, method: string = "manual") => {
    const slug = slugify(lead.company);
    const previewUrl = typeof window !== "undefined"
      ? `${window.location.origin}/preview/${slug}`
      : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;

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

  const copyPitch = (lead: Lead) => {
    const slug = slugify(lead.company);
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = typeof window !== "undefined"
      ? `${window.location.origin}/preview/${slug}`
      : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;

    const pitch = `Subject: ${lead.coldEmailSubject}

Hey ${greeting},

Noticed you're driving high-intent search traffic to ${domainClean}, but the mobile landing page takes ${lead.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${lead.mobilePageSpeed}/100).

Because Google penalizes slow mobile pages with lower Quality Scores, you're paying higher cost-per-click while losing ~${Math.round((100 - lead.mobilePageSpeed) * 0.42)}% of mobile visitors before the page renders.

I run Speedcraft Studio. I hand-coded a sub-second Next.js edge prototype for ${lead.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
Link: ${previewUrl}

Zero strings attached — take a look on your mobile phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct Inquiries: farukolawale509@gmail.com`;

    navigator.clipboard.writeText(pitch);
    setCopiedId(lead.company);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGmailUrl = (lead: Lead) => {
    const slug = slugify(lead.company);
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = typeof window !== "undefined"
      ? `${window.location.origin}/preview/${slug}`
      : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;

    const subject = `quick question regarding ${domainClean} mobile load speed`;
    const body = `Hey ${greeting},

Noticed you're driving high-intent search traffic to ${domainClean}, but the mobile landing page takes ${lead.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${lead.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're paying higher cost-per-click while losing ~${Math.round((100 - lead.mobilePageSpeed) * 0.42)}% of mobile visitors before the page renders.

I run Speedcraft Studio. I hand-coded a sub-second Next.js prototype for ${lead.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
Link: ${previewUrl}

Zero strings attached — take a look on your phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct Inquiries: farukolawale509@gmail.com`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleGmailClick = (lead: Lead) => {
    const url = getGmailUrl(lead);
    window.open(url, "_blank", "noopener,noreferrer");
    markAsSent(lead, "gmail");
  };

  const sendViaApi = async (lead: Lead) => {
    setSendingMap((prev) => ({ ...prev, [lead.company]: "sending" }));
    setErrorMsgMap((prev) => ({ ...prev, [lead.company]: "" }));

    const slug = slugify(lead.company);
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = typeof window !== "undefined"
      ? `${window.location.origin}/preview/${slug}`
      : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;

    const subject = `quick question regarding ${domainClean} mobile load speed`;
    const body = `Hey ${greeting},

Noticed you're driving high-intent search traffic to ${domainClean}, but the mobile landing page takes ${lead.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${lead.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're paying higher cost-per-click while losing ~${Math.round((100 - lead.mobilePageSpeed) * 0.42)}% of mobile visitors before the page renders.

I run Speedcraft Studio. I hand-coded a sub-second prototype for ${lead.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
Link: ${previewUrl}

Zero strings attached — take a look on your mobile phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct Inquiries: farukolawale509@gmail.com`;

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
    } catch (err: any) {
      setSendingMap((prev) => ({ ...prev, [lead.company]: "error" }));
      setErrorMsgMap((prev) => ({ ...prev, [lead.company]: err.message }));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-[#5B4BD6] selection:text-white">
      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#160F29] text-white px-4 py-3 rounded-xl shadow-xl border border-zinc-700/60 flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ─── TOP BAR ─── */}
      <div className="bg-[#160F29] text-white border-b border-zinc-800 px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#5B4BD6] text-white flex items-center justify-center font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-extrabold text-sm tracking-tight">SPEEDCRAFT</span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="text-xs text-zinc-300 font-mono tracking-wider">LIVE GOOGLE MAPS DISPATCHER</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Main Studio
            </Link>
            <span className="text-zinc-700">•</span>
            <span className="bg-[#5B4BD6]/30 text-purple-200 border border-[#5B4BD6]/50 px-2.5 py-0.5 rounded-full text-[11px]">
              Deduplication Active
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* ─── HEADER COMMAND BAR ─── */}
        <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#5B4BD6] border border-purple-200 text-xs font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>Real-Time Business Discovery via Google Maps</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#160F29] tracking-tight">
                Live Google Maps Outreach & Prototype Engine
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                Search any city or country on Google Maps to discover live local businesses. Contacted targets vanish immediately from your dashboard to prevent duplicate outreach.
              </p>
            </div>

            {/* METRICS WIDGETS */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 min-w-[125px] flex-1 sm:flex-none">
                <div className="text-[11px] text-zinc-500 font-medium">Unsent Prospects</div>
                <div className="text-2xl font-bold text-zinc-950 font-mono">{activeLeads.length}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 min-w-[125px] flex-1 sm:flex-none">
                <div className="text-[11px] text-emerald-800 font-medium">Contacted / Dispatched</div>
                <div className="text-2xl font-bold text-emerald-700 font-mono">{sentRecords.length}</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 min-w-[125px] flex-1 sm:flex-none">
                <div className="text-[11px] text-[#5B4BD6] font-medium">Active Mode</div>
                <div className="text-sm font-bold text-[#160F29] mt-1 uppercase font-mono">
                  {sourceMode === "google_maps" ? "Google Maps Live" : "Audited Vault"}
                </div>
              </div>
            </div>
          </div>

          {/* ─── LIVE GOOGLE MAPS SEARCH BAR ─── */}
          <div className="p-4 rounded-xl bg-[#F8F7FD] border border-[#5B4BD6]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#160F29]">
                <MapPin className="w-4 h-4 text-[#5B4BD6]" />
                <span>Fetch Directly From Google Maps:</span>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">
                Worldwide: US, UK, Canada, Australia, etc.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  placeholder="Target Niche (e.g. Emergency Plumber, Roofing)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                />
              </div>

              <div className="sm:col-span-4 relative">
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={mapsLocation}
                  onChange={(e) => setMapsLocation(e.target.value)}
                  placeholder="City, State / Country (e.g. Dallas, TX or London, UK)"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  onClick={() => handleGoogleMapsSearch()}
                  disabled={isSearchingMaps}
                  className="w-full py-2 px-4 rounded-lg bg-[#5B4BD6] hover:bg-[#4939C7] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSearchingMaps ? "animate-spin" : ""}`} />
                  <span>{isSearchingMaps ? "Querying Maps..." : "Search Google Maps"}</span>
                </button>
              </div>
            </div>

            {/* QUICK PRESET CHIPS */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="text-zinc-400">Quick Searches:</span>
              <button
                onClick={() => {
                  setMapsQuery("Emergency Plumber");
                  setMapsLocation("Dallas, TX");
                  handleGoogleMapsSearch("Emergency Plumber", "Dallas, TX");
                }}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer"
              >
                Dallas Plumbers
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Boiler Repair");
                  setMapsLocation("London, UK");
                  handleGoogleMapsSearch("Boiler Repair", "London, UK");
                }}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer"
              >
                London Boiler Repair
              </button>
              <button
                onClick={() => {
                  setMapsQuery("HVAC Services");
                  setMapsLocation("Toronto, Canada");
                  handleGoogleMapsSearch("HVAC Services", "Toronto, Canada");
                }}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer"
              >
                Toronto HVAC
              </button>
              <button
                onClick={() => {
                  setMapsQuery("Commercial Roofing");
                  setMapsLocation("Miami, FL");
                  handleGoogleMapsSearch("Commercial Roofing", "Miami, FL");
                }}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 cursor-pointer"
              >
                Miami Roofing
              </button>
            </div>
          </div>

          {/* ─── TABS & SOURCE SELECTOR ─── */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "active"
                    ? "bg-[#5B4BD6] text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Active Queue ({activeLeads.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("sent")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "sent"
                    ? "bg-[#160F29] text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Contacted Archive ({sentRecords.length})</span>
              </button>

              <button
                onClick={() => setShowImportDrawer(!showImportDrawer)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  showImportDrawer
                    ? "bg-[#5B4BD6] text-white shadow-sm"
                    : "bg-purple-50 text-[#5B4BD6] hover:bg-purple-100 border border-purple-200"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Audit Any Website / Import</span>
              </button>
            </div>

            {/* SOURCE SWITCHER: GOOGLE MAPS vs VAULT */}
            {activeTab === "active" && (
              <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setSourceMode("google_maps")}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    sourceMode === "google_maps" ? "bg-white text-[#5B4BD6] font-bold shadow-2xs" : "text-zinc-600"
                  }`}
                >
                  Google Maps Results ({mapsResults.length})
                </button>
                <button
                  onClick={() => setSourceMode("vault")}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    sourceMode === "vault" ? "bg-white text-[#160F29] font-bold shadow-2xs" : "text-zinc-600"
                  }`}
                >
                  Audited Lead Vault ({vaultLeads.length})
                </button>
              </div>
            )}
          </div>

          {/* ─── LIVE AUDITOR & LEAD IMPORTER DRAWER ─── */}
          {showImportDrawer && (
            <div className="bg-purple-50/60 border border-purple-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#5B4BD6] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#160F29]">Live Website Speed Auditor & Lead Importer</h3>
                    <p className="text-[11px] text-zinc-500">
                      Audit any live website on the internet: calculates real PageSpeed, detects CMS bloat, and creates an instant sub-second Next.js prototype.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg bg-white border border-purple-200 p-0.5 text-xs font-medium">
                    <button
                      onClick={() => setImportTab("single")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        importTab === "single" ? "bg-[#5B4BD6] text-white font-semibold shadow-2xs" : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Single URL Audit
                    </button>
                    <button
                      onClick={() => setImportTab("bulk")}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        importTab === "bulk" ? "bg-[#5B4BD6] text-white font-semibold shadow-2xs" : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      Batch CSV / Paste
                    </button>
                  </div>
                  <button
                    onClick={() => setShowImportDrawer(false)}
                    className="p-1 rounded-md hover:bg-purple-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* TAB 1: SINGLE URL AUDIT */}
              {importTab === "single" && (
                <form onSubmit={handleSingleAudit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                        Business Website URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        placeholder="https://exampleplumber.com"
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={auditCompany}
                        onChange={(e) => setAuditCompany(e.target.value)}
                        placeholder="Auto-detected if blank"
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                        City / Metro (Optional)
                      </label>
                      <input
                        type="text"
                        value={auditCity}
                        onChange={(e) => setAuditCity(e.target.value)}
                        placeholder="e.g. Austin, TX or London"
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Trade Niche</label>
                      <select
                        value={auditNiche}
                        onChange={(e) => setAuditNiche(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                      >
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Roofing">Roofing</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Solar">Solar</option>
                        <option value="Locksmith">Locksmith</option>
                        <option value="Restoration">Restoration</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Pest Control">Pest Control</option>
                        <option value="Dental">Dental</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="text-[11px] text-zinc-500">
                      Calculates live mobile load speed, detects CMS bloat (WordPress, Elementor, Divi), computes lost ad spend, and prepares cold outreach email.
                    </p>
                    <button
                      type="submit"
                      disabled={isAuditing || !auditUrl.trim()}
                      className="px-5 py-2 rounded-lg bg-[#5B4BD6] hover:bg-[#4939C7] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 shrink-0 shadow-xs"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? "animate-spin" : ""}`} />
                      <span>{isAuditing ? "Auditing Website..." : "Audit & Add to Active Queue"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: BATCH CSV / URL PASTE */}
              {importTab === "bulk" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                      Paste List of URLs or CSV Rows (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      placeholder={`https://austinemergencyplumbing.com\nhttps://dfwmasterelectric.com\n"Summit Roofing", https://summitroofing.com, "Denver", "Roofing"`}
                      className="w-full p-3 font-mono text-xs bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] text-zinc-500">
                      Accepts direct URLs or CSV rows: <code className="bg-white px-1.5 py-0.5 rounded border border-purple-100 font-mono text-[10px]">Company, Website, City, Niche</code>.
                    </p>
                    <button
                      onClick={handleBulkAudit}
                      disabled={isBulkImporting || !bulkText.trim()}
                      className="px-5 py-2 rounded-lg bg-[#5B4BD6] hover:bg-[#4939C7] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 shrink-0 shadow-xs"
                    >
                      <UploadCloud className={`w-3.5 h-3.5 ${isBulkImporting ? "animate-spin" : ""}`} />
                      <span>{isBulkImporting ? "Batch Auditing..." : "Batch Audit & Add to Queue"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── FILTERS (When viewing Vault) ─── */}
          {activeTab === "active" && sourceMode === "vault" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-zinc-100">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter vault by business name..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#5B4BD6] focus:bg-white"
                />
              </div>

              <div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#5B4BD6] font-medium"
                >
                  <option value="all">All Countries ({vaultLeads.length})</option>
                  <option value="Australia">Australia</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city === "all" ? "All Cities" : city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#5B4BD6]"
                >
                  {niches.map((niche) => (
                    <option key={niche} value={niche}>
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
              <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center space-y-4">
                <MapPin className="w-12 h-12 text-[#5B4BD6] mx-auto opacity-75" />
                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-base font-bold text-zinc-900">Google Maps Discovery Status</h3>
                  {mapsMetadata?.hint ? (
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left space-y-1.5">
                      <div className="font-bold flex items-center gap-1.5 text-amber-950">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Google Cloud Action Required</span>
                      </div>
                      <p className="leading-relaxed">{mapsMetadata.hint}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">
                      Query any city and trade niche in the search bar above to fetch live prospects.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setSourceMode("vault")}
                    className="px-5 py-2.5 bg-[#160F29] hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    View Audited Lead Vault ({vaultLeads.length} Verified Leads)
                  </button>
                  <button
                    onClick={() => handleGoogleMapsSearch(mapsQuery, mapsLocation)}
                    className="px-5 py-2.5 bg-[#5B4BD6] hover:bg-[#4939C7] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Retry Google Maps Query
                  </button>
                </div>
              </div>
            ) : activeLeads.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-zinc-900">Zero Unsent Leads in Current Filter</h3>
                <p className="text-xs text-zinc-500 max-w-md mx-auto">
                  All businesses discovered for this query have been contacted and moved to the Contacted Archive!
                </p>
                <button
                  onClick={() => {
                    setSourceMode("vault");
                    setSelectedCountry("all");
                    setSelectedCity("all");
                    setSelectedNiche("all");
                    setSearch("");
                  }}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-semibold mt-2 cursor-pointer"
                >
                  View Audited Lead Vault
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLeads.map((lead) => {
                  const slug = slugify(lead.company);
                  const isCopied = copiedId === lead.company;
                  const sendStatus = sendingMap[lead.company] || "idle";
                  const errorMsg = errorMsgMap[lead.company];

                  return (
                    <div
                      key={lead.company}
                      className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs hover:border-zinc-300 transition-all space-y-4 flex flex-col justify-between"
                    >
                      {/* CARD TOP INFO */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-[#160F29]">{lead.company}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-[#5B4BD6] border border-purple-100">
                                {lead.countryCode || "AU"}
                              </span>
                              <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">
                                {lead.city}
                              </span>
                              {lead.rating && (
                                <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                  {lead.rating}★ ({lead.userRatingsTotal || 0})
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1">
                              <Globe className="w-3 h-3 text-zinc-400 shrink-0" />
                              <a
                                href={lead.website || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline text-zinc-600 truncate max-w-[220px]"
                              >
                                {lead.website ? lead.website.replace(/^https?:\/\//, "") : "No website on file"}
                              </a>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded ${
                                lead.mobilePageSpeed < 30
                                  ? "bg-red-100 text-red-700"
                                  : lead.mobilePageSpeed < 70
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {lead.mobilePageSpeed}/100 Speed
                            </span>
                            <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                              Load: {lead.mobileLoadTimeSec}s
                            </div>
                          </div>
                        </div>

                        {/* EMAIL & AD WASTE */}
                        <div className="bg-zinc-50 rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-2 border border-zinc-100">
                          <div className="space-y-0.5">
                            <div className="text-[11px] text-zinc-400">Target Contact:</div>
                            <div className="font-mono text-zinc-900 font-semibold truncate max-w-[220px]">
                              {lead.email || lead.phone || "Contact via Website"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] text-zinc-400">Est. Ad Waste:</div>
                            <div className="font-bold text-red-600 font-mono">
                              ~{lead.currencySymbol || "$"}{lead.estLostMonthlySpend} {lead.currency || "USD"}/mo
                            </div>
                          </div>
                        </div>

                        {/* ERROR ALERT IF RESEND RESTRICTED */}
                        {sendStatus === "error" && errorMsg && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs text-red-700 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold">Resend Restricted:</div>
                              <div className="text-[11px] mt-0.5">{errorMsg}</div>
                              <div className="text-[11px] mt-1 font-semibold text-zinc-900">
                                Use "Send via Gmail" below to dispatch from your verified inbox and clear this lead from your queue.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-100 text-xs">
                        {/* LIVE PROTOTYPE LINK */}
                        <Link
                          href={`/preview/${slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#160F29] hover:bg-zinc-800 text-white rounded-md font-medium transition-all shadow-2xs"
                        >
                          <span>Open Prototype</span>
                          <ExternalLink className="w-3 h-3 text-purple-300" />
                        </Link>

                        {/* 1-CLICK SEND VIA GMAIL & CLEAR */}
                        {lead.email ? (
                          <button
                            onClick={() => handleGmailClick(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5B4BD6] hover:bg-[#4939C7] text-white rounded-md font-semibold transition-all shadow-2xs cursor-pointer"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-md font-semibold transition-all shadow-2xs"
                            title="No direct email on file - visit website form"
                          >
                            <Globe className="w-3 h-3 text-zinc-500" />
                            <span>Website Form</span>
                          </a>
                        )}

                        {/* COPY PITCH BUTTON */}
                        <button
                          onClick={() => copyPitch(lead)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-md font-medium text-zinc-700 transition-all cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                          <span>{isCopied ? "Copied!" : "Pitch"}</span>
                        </button>

                        {/* MANUAL MARK AS CONTACTED / CLEAR */}
                        <button
                          onClick={() => markAsSent(lead, "manual")}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 rounded-md font-medium text-zinc-600 transition-all cursor-pointer"
                          title="Mark contacted on LinkedIn/Phone and remove from active queue"
                        >
                          <Check className="w-3 h-3 text-zinc-500" />
                          <span>Mark Sent</span>
                        </button>

                        {/* API SEND BUTTON (RESEND) */}
                        {lead.email && (
                          <button
                            onClick={() => sendViaApi(lead)}
                            disabled={sendStatus === "sending"}
                            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium text-[11px] border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {sendStatus === "sending" ? (
                              <span>Sending...</span>
                            ) : (
                              <>
                                <Send className="w-3 h-3 text-zinc-400" />
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
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
                <div>
                  <h3 className="font-bold text-sm text-[#160F29]">Contacted & Dispatched History</h3>
                  <p className="text-xs text-zinc-500">
                    These businesses have received cold outreach and are excluded from the main queue to prevent duplicate emails.
                  </p>
                </div>
                <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                  {sentRecords.length} Contacted
                </span>
              </div>

              {sentRecords.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-400">
                  No outreach dispatched yet. Send an email or mark a lead to populate your archive.
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {sentRecords.map((record, idx) => {
                    const slug = slugify(record.company);
                    return (
                      <div key={idx} className="py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900">{record.company}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 uppercase">
                              {record.method || "manual"}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                            <span>{record.email || "No email listed"}</span>
                            <span>•</span>
                            <span className="font-mono">
                              Dispatched: {new Date(record.sentAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={record.previewUrl || `/preview/${slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded font-medium"
                          >
                            <span>Prototype</span>
                            <ExternalLink className="w-3 h-3 text-zinc-400" />
                          </Link>

                          <button
                            onClick={() => restoreLead(record.company, record.email)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded font-medium cursor-pointer"
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
