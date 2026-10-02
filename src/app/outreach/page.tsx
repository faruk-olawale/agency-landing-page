"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import {
  Zap,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
  ArrowRight,
  TrendingDown,
  Gauge,
  Send,
  AlertCircle,
  Phone,
  CheckCircle2,
  Flame,
  Globe
} from "lucide-react";
import leadsData from "../../../leads/australia_leads_audit.json";

interface Lead {
  company: string;
  website: string;
  city: string;
  niche: string;
  contactName: string;
  phone: string;
  email: string;
  mobilePageSpeed: number;
  mobileLoadTimeSec: number;
  ttfbMs: number;
  cms: string;
  detectedPlugins: string;
  htmlWeightKb: number;
  scriptsCount: number;
  cpcEstimateAud: number;
  estLostMonthlySpendAud: number;
  coldEmailSubject: string;
  coldEmailBody: string;
  linkedInMessage: string;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function OutreachDashboardContent() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingMap, setSendingMap] = useState<Record<string, "idle" | "sending" | "sent" | "error">>({});
  const [errorMsgMap, setErrorMsgMap] = useState<Record<string, string>>({});

  const leads = leadsData as Lead[];

  // Dynamic filter lists
  const cities = useMemo(() => ["all", ...new Set(leads.map((l) => l.city))], [leads]);
  const niches = useMemo(() => ["all", ...new Set(leads.map((l) => l.niche))], [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.company.toLowerCase().includes(search.toLowerCase()) ||
        lead.website.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === "all" || lead.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesNiche = selectedNiche === "all" || lead.niche.toLowerCase() === selectedNiche.toLowerCase();
      return matchesSearch && matchesCity && matchesNiche;
    });
  }, [leads, search, selectedCity, selectedNiche]);

  const copyPitch = (lead: Lead) => {
    const slug = slugify(lead.company);
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = typeof window !== "undefined" ? `${window.location.origin}/preview/${slug}` : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;

    const pitch = `Subject: ${lead.coldEmailSubject}

Hey ${greeting},

Noticed you guys are driving traffic to ${domainClean}, but the mobile landing page takes ${lead.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${lead.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're likely paying up to 35% higher cost-per-click while losing ~${Math.round((100 - lead.mobilePageSpeed) * 0.45)}% of mobile visitors to back-button bounces.

I run Speedcraft Studio. I hand-coded a sub-second prototype for ${lead.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
Link: ${previewUrl}

Zero strings attached — take a look on your mobile phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: https://agency-landing-page-smoky-psi.vercel.app`;

    navigator.clipboard.writeText(pitch);
    setCopiedId(lead.company);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGmailUrl = (lead: Lead) => {
    const slug = slugify(lead.company);
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = typeof window !== "undefined" ? `${window.location.origin}/preview/${slug}` : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;

    const subject = `quick question regarding ${domainClean} mobile load speed`;
    const body = `Hey ${greeting},

Noticed you guys are driving traffic to ${domainClean}, but the mobile landing page takes ${lead.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${lead.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're likely paying up to 35% higher cost-per-click while losing ~${Math.round((100 - lead.mobilePageSpeed) * 0.45)}% of mobile visitors to back-button bounces.

I run Speedcraft Studio. I hand-coded a sub-second prototype for ${lead.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
Link: ${previewUrl}

Zero strings attached — take a look on your mobile phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: https://agency-landing-page-smoky-psi.vercel.app`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const sendViaApi = async (lead: Lead) => {
    setSendingMap((prev) => ({ ...prev, [lead.company]: "sending" }));
    setErrorMsgMap((prev) => ({ ...prev, [lead.company]: "" }));

    const slug = slugify(lead.company);
    const domainClean = lead.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = typeof window !== "undefined" ? `${window.location.origin}/preview/${slug}` : `https://agency-landing-page-smoky-psi.vercel.app/preview/${slug}`;
    const greeting = lead.contactName && lead.contactName !== "there" ? lead.contactName : `${lead.company} Team`;

    const subject = `quick question regarding ${domainClean} mobile load speed`;
    const body = `Hey ${greeting},

Noticed you guys are driving traffic to ${domainClean}, but the mobile landing page takes ${lead.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${lead.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're likely paying up to 35% higher cost-per-click while losing ~${Math.round((100 - lead.mobilePageSpeed) * 0.45)}% of mobile visitors to back-button bounces.

I run Speedcraft Studio. I hand-coded a sub-second prototype for ${lead.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
Link: ${previewUrl}

Zero strings attached — take a look on your mobile phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: https://agency-landing-page-smoky-psi.vercel.app`;

    try {
      const res = await fetch("/api/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.email,
          subject,
          body,
          company: lead.company,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSendingMap((prev) => ({ ...prev, [lead.company]: "sent" }));
    } catch (err: any) {
      setSendingMap((prev) => ({ ...prev, [lead.company]: "error" }));
      setErrorMsgMap((prev) => ({ ...prev, [lead.company]: err.message }));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-cyan-500 selection:text-white">
      {/* ─── TOP BAR ─── */}
      <div className="bg-zinc-950 text-white border-b border-zinc-800 px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-extrabold text-sm tracking-tight">SPEEDCRAFT</span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="text-xs text-zinc-400 font-mono">OUTREACH COMMAND CENTER</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Main Site
            </Link>
            <span className="text-zinc-700">•</span>
            <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[11px] font-mono">
              {filteredLeads.length} Targets Ready
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* ─── HEADER METRICS ─── */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" /> High-Value Prospect Pipeline (Australia)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
                1-Click Outreach & Prototype Dispatcher
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                Click <strong>"Send via Gmail"</strong> to open a pre-filled pitch in your Gmail inbox, or click <strong>"Open Prototype"</strong> to view their live 100/100 page.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 min-w-[130px]">
                <div className="text-[11px] text-zinc-500 font-medium">Audited Leads</div>
                <div className="text-2xl font-bold text-zinc-900">{leads.length}</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 min-w-[150px]">
                <div className="text-[11px] text-red-600 font-medium">Ad Waste Found</div>
                <div className="text-2xl font-bold text-red-600">$85,991<span className="text-xs font-normal"> AUD/mo</span></div>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-100">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search business name, website, or email..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:bg-white"
              />
            </div>

            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500"
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
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-cyan-500"
              >
                {niches.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche === "all" ? "All Niches" : niche}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ─── PROSPECT CARDS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLeads.map((lead) => {
            const slug = slugify(lead.company);
            const isCopied = copiedId === lead.company;
            const sendStatus = sendingMap[lead.company] || "idle";
            const errorMsg = errorMsgMap[lead.company];

            return (
              <div
                key={lead.company}
                className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs hover:border-zinc-300 transition-all space-y-4"
              >
                {/* CARD TOP INFO */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-950">{lead.company}</span>
                      <span className="text-[10px] font-semibold bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">
                        {lead.city}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                      <Globe className="w-3 h-3 text-zinc-400" />
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-zinc-600 truncate max-w-[220px]"
                      >
                        {lead.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>

                  <div className="text-right">
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
                    <div className="text-[11px] text-zinc-400">Target Email / Contact:</div>
                    <div className="font-mono text-zinc-900 font-semibold truncate max-w-[240px]">
                      {lead.email || "Contact via Website / Phone"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-zinc-400">Lost Ad Spend:</div>
                    <div className="font-bold text-red-600">~${lead.estLostMonthlySpendAud} AUD/mo</div>
                  </div>
                </div>

                {/* ERROR ALERT IF RESEND NEEDS DOMAIN */}
                {sendStatus === "error" && errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Resend Sending Restricted:</div>
                      <div className="text-[11px] mt-0.5">{errorMsg}</div>
                      <div className="text-[11px] mt-1 font-semibold text-zinc-900">
                        Use the "Send via Gmail" button below to send directly from your personal inbox with 100% deliverability.
                      </div>
                    </div>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-100 text-xs">
                  {/* LIVE PROTOTYPE LINK */}
                  <Link
                    href={`/preview/${slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md font-medium transition-all shadow-2xs"
                  >
                    <span>Open Prototype</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </Link>

                  {/* 1-CLICK SEND VIA GMAIL */}
                  {lead.email ? (
                    <a
                      href={getGmailUrl(lead)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-semibold transition-all shadow-2xs"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Send via Gmail</span>
                    </a>
                  ) : (
                    <span className="text-zinc-400 text-[11px] italic">No direct email found</span>
                  )}

                  {/* COPY PITCH BUTTON */}
                  <button
                    onClick={() => copyPitch(lead)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-md font-medium text-zinc-700 transition-all cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                    <span>{isCopied ? "Copied!" : "Copy Pitch"}</span>
                  </button>

                  {/* API SEND BUTTON (RESEND) */}
                  {lead.email && (
                    <button
                      onClick={() => sendViaApi(lead)}
                      disabled={sendStatus === "sending" || sendStatus === "sent"}
                      className={`ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium text-[11px] transition-all cursor-pointer disabled:opacity-50 ${
                        sendStatus === "sent"
                          ? "bg-emerald-100 text-emerald-800"
                          : "border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {sendStatus === "sending" ? (
                        <span>Sending...</span>
                      ) : sendStatus === "sent" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Sent</span>
                        </>
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
      </main>
    </div>
  );
}

export default function OutreachPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center font-mono text-xs text-zinc-500">
          Loading Outreach Command Center...
        </div>
      }
    >
      <OutreachDashboardContent />
    </Suspense>
  );
}
