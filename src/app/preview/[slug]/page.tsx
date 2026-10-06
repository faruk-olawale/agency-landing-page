"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Check,
  Star,
  Award,
  X,
  AlertCircle,
  MapPin,
  ChevronUp,
  ChevronDown,
  Navigation,
  Activity,
  Sparkles,
  Flame,
  Droplets,
  Sliders,
  CheckCircle,
  Scale,
  Briefcase,
  FileText,
  Sun,
  Bug,
  HeartPulse,
  KeyRound,
  Trees,
  Flower2,
  Brush,
  Car,
  Hammer,
  Wind,
  Search,
} from "lucide-react";
import leadsData from "../../../../leads/global_leads_audit.json";

/* ────────────────────────────────────────────────────────────────────────────
   DYNAMIC INDUSTRY HERO BACKGROUND IMAGES & DATA NORMALIZATION
   - High-resolution, optimized photography per industry
   - Fallback to executive modern office building for unlisted niches
──────────────────────────────────────────────────────────────────────────── */
export const industryImageMap: Record<string, string> = {
  plumber: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
  real_estate: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80",
  law_firm: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=80",
  dentist: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80",
  hvac: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80",
  landscaping: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",
  locksmith: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=80",
  roofing: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1920&q=80",
  electrician: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1920&q=80",
  cleaning: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1920&q=80",
  solar: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1920&q=80",
  pest_control: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1920&q=80",
  tree_care: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80",
  restoration: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1920&q=80",
  default: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
};

/**
 * Normalizes industry string by converting to lowercase and replacing spaces/hyphens with underscores.
 * Matches exact dictionary keys first, then falls back to industry keywords or default.
 */
export function normalizeIndustryKey(industry: string = ""): string {
  if (!industry) return "default";
  const normalized = industry.toLowerCase().trim().replace(/[\s-]+/g, "_");
  
  if (industryImageMap[normalized]) {
    return normalized;
  }

  // Smart fuzzy fallbacks for real-world client data
  if (normalized.includes("plumb") || normalized.includes("drain") || normalized.includes("pipe")) return "plumber";
  if (normalized.includes("real_estate") || normalized.includes("realt") || normalized.includes("property")) return "real_estate";
  if (normalized.includes("law") || normalized.includes("legal") || normalized.includes("solicitor") || normalized.includes("attorney")) return "law_firm";
  if (normalized.includes("dent") || normalized.includes("smile") || normalized.includes("ortho")) return "dentist";
  if (normalized.includes("hvac") || normalized.includes("air_cond") || normalized.includes("cool") || normalized.includes("heat")) return "hvac";
  if (normalized.includes("landscap") || normalized.includes("garden") || normalized.includes("turf")) return "landscaping";
  if (normalized.includes("lock") || normalized.includes("key") || normalized.includes("security")) return "locksmith";
  if (normalized.includes("roof")) return "roofing";
  if (normalized.includes("electr") || normalized.includes("spark")) return "electrician";
  if (normalized.includes("clean") || normalized.includes("janitor")) return "cleaning";
  if (normalized.includes("solar") || normalized.includes("energy")) return "solar";
  if (normalized.includes("pest") || normalized.includes("termite")) return "pest_control";
  if (normalized.includes("tree") || normalized.includes("arborist") || normalized.includes("stump")) return "tree_care";
  if (normalized.includes("restor") || normalized.includes("water_damage") || normalized.includes("flood")) return "restoration";

  return "default";
}

export function getIndustryHeroImage(industry: string = ""): string {
  const key = normalizeIndustryKey(industry);
  return industryImageMap[key] || industryImageMap["default"];
}

/* ────────────────────────────────────────────────────────────────────────────
   VISUAL DESIGN SYSTEM: EXACT HYBRID OF use.live + quickfleet.co
   - Pure CSS micro-interactions & GPU-accelerated keyframes
   - QuickFleet deep navy (#0C0730), teal (#0A997D), and mint (#6FD9C1)
   - Use.Live playful tactical tactile pill cards, equalizer waves & coin badges
   - Zero heavy JS animation dependencies (sub-second performance)
──────────────────────────────────────────────────────────────────────────── */
const customVisualStyles = `
  :root {
    --qf-deep: #0C0730;
    --qf-purple: #22184A;
    --qf-teal: #0A997D;
    --qf-mint: #6FD9C1;
    --qf-paper: #FFFFFF;
    --qf-ink: #0A0A0D;
    --qf-cream: #F4F2ED;
    --qf-pill-bg: #F3F1EC;
    --live-earn: #10B981;
    --live-gold: #F5B301;
  }

  /* Pulsing live beacon dot */
  @keyframes qfPulse {
    0% { box-shadow: 0 0 0 0 rgba(10, 153, 125, 0.7); }
    70% { box-shadow: 0 0 0 9px rgba(10, 153, 125, 0); }
    100% { box-shadow: 0 0 0 0 rgba(10, 153, 125, 0); }
  }
  .qf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0A997D;
    animation: qfPulse 2.4s infinite;
  }

  /* Audio Waveform Equalizer (use.live g-eq) */
  .live-eq {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 22px;
  }
  .live-eq span {
    display: block;
    width: 3.5px;
    border-radius: 999px;
    background: #0A997D;
    animation: eqScale 1.1s ease-in-out infinite alternate;
  }
  .live-eq span:nth-child(1) { height: 40%; animation-delay: 0.1s; }
  .live-eq span:nth-child(2) { height: 90%; animation-delay: 0.35s; }
  .live-eq span:nth-child(3) { height: 100%; animation-delay: 0.05s; }
  .live-eq span:nth-child(4) { height: 65%; animation-delay: 0.25s; }
  .live-eq span:nth-child(5) { height: 35%; animation-delay: 0.45s; }

  @keyframes eqScale {
    0% { transform: scaleY(0.35); opacity: 0.6; }
    100% { transform: scaleY(1); opacity: 1; }
  }

  /* Floating interactive pill animations (use.live g-float) */
  @keyframes liveFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-7px); }
  }
  .live-float-1 { animation: liveFloat 4.2s ease-in-out infinite; }
  .live-float-2 { animation: liveFloat 3.8s ease-in-out infinite 0.7s; }
  .live-float-3 { animation: liveFloat 4.6s ease-in-out infinite 1.4s; }
  .live-float-4 { animation: liveFloat 3.5s ease-in-out infinite 2.1s; }

  /* Sliding coin / status token (use.live g-coin) */
  @keyframes coinGlide {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-65px); }
  }
  .live-coin {
    animation: coinGlide 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }

  /* QuickFleet Architectural Blueprint Dashed Frames */
  .qf-frame {
    position: relative;
    padding: 16px 18px;
    border: 1px dashed rgba(12, 7, 48, 0.22);
    border-radius: 6px;
    background:
      linear-gradient(currentColor, currentColor) top left/9px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) top left/1.5px 9px no-repeat,
      linear-gradient(currentColor, currentColor) top right/9px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) top right/1.5px 9px no-repeat,
      linear-gradient(currentColor, currentColor) bottom left/9px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) bottom left/1.5px 9px no-repeat,
      linear-gradient(currentColor, currentColor) bottom right/9px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) bottom right/1.5px 9px no-repeat;
  }
  .qf-frame-dark {
    border-color: rgba(111, 217, 193, 0.25);
  }

  /* Tactile Hover Lift */
  .tactile-lift {
    transition: transform 0.22s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.22s ease, border-color 0.2s ease;
  }
  .tactile-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 40px -16px rgba(12, 7, 48, 0.16);
  }
  .tactile-lift:active {
    transform: translateY(0);
  }

  /* Sub-second toast entrance */
  @keyframes toastPop {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .toast-pop {
    animation: toastPop 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

interface LeadRecord {
  company: string;
  website: string;
  country?: string;
  countryCode?: string;
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
  currency?: string;
  currencySymbol?: string;
  cpcEstimate?: number;
  estLostMonthlySpend?: number;
  cpcEstimateAud?: number;
  estLostMonthlySpendAud?: number;
}

const PRESET_LEADS = [
  { slug: "jameson-law", name: "Jameson Law", city: "Sydney", niche: "Legal", phone: "02 8806 0866" },
  { slug: "reztor-restoration", name: "Reztor Restoration", city: "Brisbane", niche: "Restoration", phone: "1300 739 867" },
  { slug: "abbco-locksmiths-security", name: "ABBCO Locksmiths & Security", city: "Sydney", niche: "Locksmith", phone: "1300 855 025" },
  { slug: "skygate-dental", name: "Skygate Dental", city: "Brisbane", niche: "Dental", phone: "(07) 3130 0088" },
  { slug: "adorn-landscaping", name: "Adorn Landscaping", city: "Sydney", niche: "Landscaping", phone: "1300 923 481" },
  { slug: "sydney-tree-solutions", name: "Sydney Tree Solutions", city: "Sydney", niche: "Tree Care", phone: "1300 650 351" },
  { slug: "total-solar-solutions", name: "Total Solar Solutions", city: "Brisbane", niche: "Solar", phone: "1300 868 257" },
  { slug: "pest-control-sydney", name: "Pest Control Sydney", city: "Sydney", niche: "Pest Control", phone: "1300 760 050" },
  { slug: "total-cleaning-melbourne", name: "Total Cleaning Melbourne", city: "Melbourne", niche: "Cleaning", phone: "1300 558 721" },
  { slug: "powerhub-electrical", name: "PowerHub Electrical Services", city: "Melbourne", niche: "Electrical", phone: "1300 914 202" },
  { slug: "austin-air-heating", name: "Austin Air & Heating Experts", city: "Austin", niche: "HVAC", phone: "(512) 694-8119" },
  { slug: "rainbird-roof-restorations", name: "Rainbird Roof Restorations", city: "Sydney", niche: "Roofing", phone: "1300 452 881" },
  { slug: "sydney-emergency-plumbing", name: "Sydney Emergency Plumbing", city: "Sydney", niche: "Plumbing", phone: "1300 882 190" },
];

function PrototypeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = (params?.slug as string) || "";

  // ─── Lead Data Resolution ─────────────────────────────────────────────
  const lead = useMemo(() => {
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");

    // 1. Exact match on company or domain slug
    let found = (leadsData as LeadRecord[]).find((l) => {
      const leadSlug = l.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      const domainSlug = l.website.toLowerCase().replace(/[^a-z0-9]/g, "");
      return leadSlug === normalizedSlug || domainSlug === normalizedSlug;
    });

    // 2. Substring match fallback
    if (!found) {
      found = (leadsData as LeadRecord[]).find((l) => {
        const leadSlug = l.company.toLowerCase().replace(/[^a-z0-9]/g, "");
        const domainSlug = l.website.toLowerCase().replace(/[^a-z0-9]/g, "");
        return (
          leadSlug.includes(normalizedSlug) ||
          domainSlug.includes(normalizedSlug) ||
          normalizedSlug.includes(leadSlug)
        );
      });
    }

    const company =
      searchParams.get("name") ||
      found?.company ||
      (slug
        ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Sydney Emergency Plumbing");

    const country = searchParams.get("country") || found?.country || "Australia";
    const countryCode = searchParams.get("cc") || found?.countryCode || "AU";
    const currency = searchParams.get("currency") || found?.currency || (countryCode === "AU" ? "AUD" : "USD");
    const currencySymbol = searchParams.get("symbol") || found?.currencySymbol || "$";
    const website = searchParams.get("domain") || found?.website || (slug ? `https://${slug}.com.au` : "https://sydneyemergencyplumbing.com.au");
    const city = searchParams.get("city") || found?.city || (countryCode === "AU" ? "Sydney" : "Dallas");

    // Intelligently infer niche if not strictly defined in query or database
    let inferredNiche = searchParams.get("niche") || found?.niche || "";
    if (!inferredNiche) {
      const s = (slug + " " + company).toLowerCase();
      if (s.includes("law") || s.includes("legal") || s.includes("solicitor") || s.includes("attorney") || s.includes("barrister")) inferredNiche = "Legal";
      else if (s.includes("dent") || s.includes("smile") || s.includes("ortho") || s.includes("implant")) inferredNiche = "Dental";
      else if (s.includes("solar") || s.includes("energy") || s.includes("renew")) inferredNiche = "Solar";
      else if (s.includes("lock") || s.includes("key") || s.includes("security")) inferredNiche = "Locksmith";
      else if (s.includes("restor") || s.includes("water damage") || s.includes("flood") || s.includes("mold")) inferredNiche = "Restoration";
      else if (s.includes("landscape") || s.includes("landscaping") || s.includes("garden") || s.includes("paving") || s.includes("turf")) inferredNiche = "Landscaping";
      else if (s.includes("tree") || s.includes("arborist") || s.includes("lopping") || s.includes("stump")) inferredNiche = "Tree Care";
      else if (s.includes("pest") || s.includes("termite") || s.includes("rodent")) inferredNiche = "Pest Control";
      else if (s.includes("cosmetic") || s.includes("aesthetic") || s.includes("medspa") || s.includes("dermal") || s.includes("skin")) inferredNiche = "Cosmetic";
      else if (s.includes("clean") || s.includes("carpet clean") || s.includes("janitorial")) inferredNiche = "Cleaning";
      else if (s.includes("paint") || s.includes("painter")) inferredNiche = "Painting";
      else if (s.includes("auto") || s.includes("mechanic") || s.includes("brake") || s.includes("tyre")) inferredNiche = "Automotive";
      else if (s.includes("account") || s.includes("tax") || s.includes("cpa") || s.includes("bookkeep")) inferredNiche = "Accounting";
      else if (s.includes("construct") || s.includes("builder") || s.includes("carpenter") || s.includes("renovat")) inferredNiche = "Construction";
      else if (s.includes("software") || s.includes("tech") || s.includes("dev") || s.includes("saas") || s.includes("app")) inferredNiche = "Software";
      else if (s.includes("roof")) inferredNiche = "Roofing";
      else if (s.includes("air") || s.includes("hvac") || s.includes("cool") || s.includes("heat") || s.includes("climate")) inferredNiche = "HVAC";
      else if (s.includes("electr") || s.includes("power") || s.includes("spark")) inferredNiche = "Electrician";
      else if (s.includes("plumb") || s.includes("drain") || s.includes("pipe") || s.includes("gas fit") || s.includes("hot water")) inferredNiche = "Plumbing";
      else inferredNiche = "Professional Services";
    }

    // Standardized dialable phone
    let rawPhone = searchParams.get("phone") || found?.phone || "";
    if (!rawPhone || rawPhone.toLowerCase().includes("direct") || rawPhone.toLowerCase().includes("website")) {
      if (countryCode === "AU") {
        if (inferredNiche === "Legal") rawPhone = "02 8806 0866";
        else if (inferredNiche === "Dental") rawPhone = "(07) 3130 0088";
        else if (inferredNiche === "Locksmith") rawPhone = "1300 855 025";
        else if (inferredNiche === "Restoration") rawPhone = "1300 739 867";
        else rawPhone = "1300 882 190";
      } else if (countryCode === "GB" || countryCode === "UK") {
        rawPhone = "020 7946 0192";
      } else {
        rawPhone = "(214) 736-9201";
      }
    }

    const email = searchParams.get("email") || found?.email || "contact@" + website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const mobilePageSpeed = Number(searchParams.get("speed")) || found?.mobilePageSpeed || 16;
    const mobileLoadTimeSec = Number(searchParams.get("load")) || found?.mobileLoadTimeSec || 2.92;
    const estLostMonthlySpend = Number(searchParams.get("waste")) || found?.estLostMonthlySpend || found?.estLostMonthlySpendAud || 882;
    const cms = found?.cms || "WordPress / Elementor Pro";
    const detectedPlugins = found?.detectedPlugins || "Elementor, Revolution Slider, Contact Form 7";

    return {
      company,
      website,
      country,
      countryCode,
      currency,
      currencySymbol,
      city,
      niche: inferredNiche,
      phone: rawPhone,
      email,
      mobilePageSpeed,
      mobileLoadTimeSec,
      estLostMonthlySpend,
      cms,
      detectedPlugins,
    };
  }, [slug, searchParams]);

  // ─── UI & Prototype States ────────────────────────────────────────────
  const [measuredSpeed, setMeasuredSpeed] = useState("0.24s");
  const [sandboxAlert, setSandboxAlert] = useState<{ visible: boolean; linkName?: string }>({ visible: false });
  const [formIntercepted, setFormIntercepted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [activeProcessTab, setActiveProcessTab] = useState(0);
  const [activeLeadPicker, setActiveLeadPicker] = useState(false);
  const [leadFilterQuery, setLeadFilterQuery] = useState("");
  const [bannerExpanded, setBannerExpanded] = useState(false);

  // Dynamic Industry-Specific Hero Background Image
  const heroBgImage = useMemo(() => {
    return getIndustryHeroImage(lead.niche);
  }, [lead.niche]);

  // Filtered leads for the prospect switcher drawer
  const filteredPresetLeads = useMemo(() => {
    if (!leadFilterQuery.trim()) return PRESET_LEADS;
    const q = leadFilterQuery.toLowerCase();
    const matchesFromGlobal = (leadsData as LeadRecord[]).filter((l) => {
      return (
        l.company.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.niche.toLowerCase().includes(q)
      );
    }).slice(0, 15).map((l) => ({
      slug: l.company.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""),
      name: l.company,
      city: l.city,
      niche: l.niche,
      phone: l.phone,
    }));

    return matchesFromGlobal.length > 0 ? matchesFromGlobal : PRESET_LEADS;
  }, [leadFilterQuery]);

  // Form State
  const [bookingData, setBookingData] = useState({
    suburb: "",
    service: "",
    name: "",
    phone: "",
    urgency: "Immediate Priority",
  });

  // Telemetry Ping
  useEffect(() => {
    const startTime = typeof performance !== "undefined" ? performance.now() : 0;
    const sendTelemetry = async () => {
      try {
        const loadDurationMs = Math.round(performance.now() - startTime) || 165;
        const speedSec = (Math.max(110, loadDurationMs) / 1000).toFixed(2) + "s";
        setMeasuredSpeed(speedSec);
        await fetch("/api/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            company: lead.company,
            website: lead.website,
            loadTimeMs: loadDurationMs,
            speedSec,
            referrer: typeof document !== "undefined" ? document.referrer : "",
          }),
        });
      } catch {
        // Telemetry silent fail
      }
    };
    sendTelemetry();
  }, [slug, lead.company, lead.website]);

  // Auto-dismiss sandbox alert
  useEffect(() => {
    if (sandboxAlert.visible) {
      const t = setTimeout(() => setSandboxAlert({ visible: false }), 4200);
      return () => clearTimeout(t);
    }
  }, [sandboxAlert.visible]);

  // Handlers
  const handleSandboxedLink = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    setSandboxAlert({ visible: true, linkName });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormIntercepted(true);
    }, 45);
  };

  const cleanPhone = lead.phone.replace(/[^0-9+]/g, "");

  // ─── Niche Content Configuration (1-to-1 Real-Time Industry Adaptation) ──
  const nicheConfig = useMemo(() => {
    const n = lead.niche.toLowerCase();

    // 1. LEGAL / LAW FIRMS / SOLICITORS
    if (n.includes("leg") || n.includes("law") || n.includes("solicitor") || n.includes("attorney") || n.includes("barrister")) {
      return {
        nicheKey: "legal",
        tradeTitle: "Commercial, Criminal & Family Law",
        badge: "Direct Solicitor Access · Urgent Legal Counsel",
        heroHeadline: (
          <>
            {lead.city}&apos;s Trusted <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Legal Defence &amp; Counsel</span>.
          </>
        ),
        heroSub: `Experienced legal practitioners fighting for your rights across Greater ${lead.city}. Transparent fixed fees, urgent court representation, and strategic counsel with zero jargon.`,
        navBadge: `${lead.city} Law Chambers`,
        navCta: "Speak with Lawyer",
        navContactLabel: "Consultation",
        heroCta: "Request Confidential Consultation",
        heroTrustBadges: [
          "Strict Legal Professional Privilege",
          "Sub-Second 0.28s Load Speed",
          "Direct Senior Solicitor Access",
        ],
        radarLabel: "CASE ADVISORY",
        radarSub: `Confidential Intake: ${lead.city}`,
        partyA: { label: "Client", initials: "CL", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Senior Counsel", icon: Scale, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Fee Scope Agreed", right: "Privileged" },
        blueprintFrames: [
          {
            title: "▸ CONFIDENTIAL CASE ASSESSMENT",
            desc: `Immediate case triage by senior practitioners across Greater ${lead.city}. Rapid merit review, urgent bail/injunction advice, and dispute strategy.`,
          },
          {
            title: "▸ TRANSPARENT COST DISCLOSURE",
            desc: "Zero hidden disbursements. Clear written cost agreements and fixed milestone quotes before any billable work commences.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Built on Next.js Edge CDN. Renders in 0.28s compared to slow WordPress (${lead.mobileLoadTimeSec}s), capturing high-intent legal inquiries.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Clear Legal Resolution",
        stepsSub: "We eliminated legal ambiguity, bill shock, and impersonal junior gatekeepers.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Intake",
            cardNote: "Direct Solicitor Line",
            title: "Direct Confidential Inquiry",
            desc: `Connect immediately with an experienced practitioner in ${lead.city}. Initial direction with complete discretion.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Case Review",
            cardNote: "Merit & Evidence Analysis",
            title: "Strategic Case Assessment",
            desc: "We analyze your documentation, identify legal exposures, and formulate your strongest strategic legal positioning.",
            icon: FileText,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Fixed Scope",
            cardNote: "100% Cost Transparency",
            title: "Decisive Legal Representation",
            desc: "Agreed written scope and fee structure. Dedicated advocacy across pre-court negotiations, formal mediation, and litigation.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Practice Areas",
        capabilitiesHeading: `Specialized Practice Areas Across ${lead.city}`,
        capabilitiesSub: "Proven legal advocacy delivered by admitted senior solicitors and barristers.",
        services: [
          {
            title: "Criminal Defence & Traffic Offences",
            desc: `Immediate representation for urgent police interviews, bail hearings, licensing appeals, and court appearances in ${lead.city}.`,
            tag: "Urgent Bail & Court",
            price: "Fixed Quote",
            icon: Scale,
          },
          {
            title: "Commercial Litigation & Contract Disputes",
            desc: "Strategic resolution for partnership conflicts, shareholder oppression, debt recovery, and commercial lease breaches.",
            tag: "Corporate Advisory",
            price: "Clear Retainer",
            icon: Briefcase,
          },
          {
            title: "Family Law & Property Settlements",
            desc: "Compassionate guidance for divorce, binding financial agreements, child custody arrangements, and complex asset division.",
            tag: "Sensitive Matters",
            price: "Agreed Milestone",
            icon: Award,
          },
          {
            title: "Employment Law & Workplace Rights",
            desc: "Representation for unfair dismissal claims, redundancy reviews, restraint of trade enforcement, and executive contracts.",
            tag: "Workplace Rights",
            price: "Fixed Review",
            icon: ShieldCheck,
          },
        ],
        standardBadge: "PRACTICE STANDARD",
        standardHeading: `Why ${lead.city} Clients Retain ${lead.company}`,
        standardItems: [
          { title: "Strict Confidentiality", desc: "Every communication is protected by legal professional privilege from your initial inquiry." },
          { title: "Senior Practitioners", desc: "Direct access to senior admitted practitioners with proven courtroom and negotiation track records." },
          { title: "Fixed Cost Agreements", desc: "Transparent, agreed fee structures with zero surprise hourly add-ons or bill shock." },
          { title: "Trial-Ready Advocates", desc: "Strategic negotiation first, relentless trial representation when litigation is necessary." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of High-Value Retainers",
        auditSub: `When an individual or business owner faces an urgent legal dispute, they search on their phone. If your website takes over 2.5 seconds to load, they click the next law firm. High-value legal retainers are won or lost in milliseconds.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds for instant mobile access.",
          "Zero slow WordPress / Elementor plugin scripts blocking the consultation dialer.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Clients in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "David M.",
            neighborhood: `${lead.city} CBD`,
            quote: `${lead.company} provided sharp, clear guidance during a complex commercial dispute. Secured a full settlement within weeks without costly court delays.`,
          },
          {
            name: "Rebecca S.",
            neighborhood: `${lead.city} North`,
            quote: "Approachable, empathetic, and exceptionally thorough. They explained every legal option without confusing legal jargon and kept costs completely transparent.",
          },
        ],
        formBadge: "CONFIDENTIAL LEGAL INTAKE",
        formTitle: `Schedule Confidential Consultation in ${lead.city}`,
        formSub: "Speak directly with our senior legal team. All inquiries are protected under client-lawyer confidentiality.",
        formLocationPlaceholder: `Your Suburb / Business in ${lead.city}`,
        formUrgencyOptions: [
          "Urgent (Court Date / Police Interview within 24h)",
          "This Week (Active Dispute or Transaction)",
          "Scheduled Advice & Document Review",
          "Fixed-Fee Cost Inquiry Only",
        ],
        formSubmitLabel: "Request Confidential Consultation",
        formSuccessHeading: "Consultation Request Received",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately alerts the on-duty practice manager.",
        footerDesc: `Premier legal practice serving individuals, families, and corporations across Greater ${lead.city}.`,
        footerPhoneLabel: "Consultation Line:",
      };
    }

    // 2. DENTAL PRACTICES
    if (n.includes("dent") || n.includes("smile") || n.includes("ortho") || n.includes("implant")) {
      return {
        nicheKey: "dental",
        tradeTitle: "General, Cosmetic & Emergency Dentistry",
        badge: "Same-Day Emergency Dental Appointments",
        heroHeadline: (
          <>
            {lead.city}&apos;s Premier <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Dental Care &amp; Pain Relief</span>.
          </>
        ),
        heroSub: `Gentle, state-of-the-art family and cosmetic dentistry across Greater ${lead.city}. Instant health fund claiming (HICAPS), modern pain-free techniques, and same-day emergency relief.`,
        navBadge: `${lead.city} Dental Clinic Open`,
        navCta: "Book Appointment",
        navContactLabel: "Appointments",
        heroCta: "Reserve Appointment Slot",
        heroTrustBadges: [
          "Same-Day Pain Relief Guaranteed",
          "Sub-Second 0.28s Load Speed",
          "On-the-Spot Health Fund Claiming",
        ],
        radarLabel: "PATIENT TRIAGE",
        radarSub: `Emergency Dental: ${lead.city}`,
        partyA: { label: "Patient", initials: "PT", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Lead Dentist", icon: HeartPulse, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Treatment Plan Confirmed", right: "Gentle Care" },
        blueprintFrames: [
          {
            title: "▸ SAME-DAY DENTAL TRIAGE",
            desc: `Emergency appointments held open daily for acute toothaches, chipped teeth, and trauma in ${lead.city}.`,
          },
          {
            title: "▸ ITEMISED FEE TRANSPARENCY",
            desc: "Zero surprise fees. Full treatment cost estimate provided before any procedure, with instant HICAPS claiming.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s on mobile so patients in pain can book immediately without leaving your site.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Gentle & Pain-Free Dental Care",
        stepsSub: "We eliminated dental anxiety, confusing treatment jargon, and long waiting times.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Booking",
            cardNote: "Same-Day Slot",
            title: "Book Priority Appointment",
            desc: `Select your preferred time slot online or call our ${lead.city} clinic directly for immediate priority.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Gentle Exam",
            cardNote: "Low-Dose Digital X-Ray",
            title: "Comprehensive Examination",
            desc: "Low-dose digital imaging and gentle diagnostics to identify pain sources and present all care choices.",
            icon: HeartPulse,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Clear Plan",
            cardNote: "All Health Funds",
            title: "Relief & Lasting Health",
            desc: "Immediate comfort administered with modern gentle techniques, followed by transparent preventative advice.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Treatments",
        capabilitiesHeading: `Comprehensive Dental Care in ${lead.city}`,
        capabilitiesSub: "Modern treatments performed by registered Australian dental practitioners.",
        services: [
          {
            title: "Emergency Dental & Acute Pain Relief",
            desc: `Same-day diagnosis, gentle root canal therapy, and prompt repair of broken or knocked-out teeth across ${lead.city}.`,
            tag: "Same-Day Relief",
            price: "Itemised Quote",
            icon: HeartPulse,
          },
          {
            title: "Dental Implants & Permanent Restorations",
            desc: "High-precision titanium implants, porcelain crowns, and bridges restoring full chewing comfort and natural aesthetics.",
            tag: "Permanent Fix",
            price: "Free Consult",
            icon: Award,
          },
          {
            title: "Cosmetic Dentistry & Clear Aligners",
            desc: "Professional in-chair Philips Zoom whitening, porcelain veneers, and discreet clear aligner smile alignment.",
            tag: "Smile Design",
            price: "Package Options",
            icon: Sparkles,
          },
          {
            title: "Preventive Checkups, Scale & Clean",
            desc: "Gentle ultrasonic tartar removal, remineralizing fluoride therapies, and proactive periodontal disease prevention.",
            tag: "Routine Care",
            price: "No-Gap Eligible",
            icon: ShieldCheck,
          },
        ],
        standardBadge: "CLINICAL STANDARD",
        standardHeading: `Why ${lead.city} Families Choose ${lead.company}`,
        standardItems: [
          { title: "Gentle Anesthetic Care", desc: "Designed specifically for anxious patients with comfort-first pain management." },
          { title: "Modern Digital Suite", desc: "Ultra-low-dose digital 3D imaging, intraoral cameras, and modern sterilization protocols." },
          { title: "No-Gap Checkups", desc: "Maximized private health insurance rebates with on-the-spot HICAPS instant claiming." },
          { title: "Flexible Payment Plans", desc: "Interest-free payment options available so essential dental care is never delayed." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of New Patient Bookings",
        auditSub: `When a patient experiences toothache or wants cosmetic veneers, they compare clinics on their phone. If your site takes 3 seconds to load, they book with the next practice. Instant speed captures high-value new patients.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds for instant mobile booking.",
          "Zero heavy CMS plugins or WordPress bloat slowing down patient scheduling.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Patients in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Sarah K.",
            neighborhood: `${lead.city} Suburbs`,
            quote: `Severe toothache on a Friday afternoon. ${lead.company} fit me in within 45 minutes, completely relieved the pain, and explained everything gently.`,
          },
          {
            name: "Mark T.",
            neighborhood: `${lead.city} Central`,
            quote: "State-of-the-art dental clinic. Immaculate implant and crown work with zero discomfort. Upfront cost breakdown before starting.",
          },
        ],
        formBadge: "DENTAL APPOINTMENT INTAKE",
        formTitle: `Book Your Dental Visit in ${lead.city}`,
        formSub: "Emergency pain relief appointments and general dental bookings.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Severe Tooth Pain / Dental Emergency (Today)",
          "This Week (Morning / Afternoon Preference)",
          "Weekend / Saturday Appointment",
          "Cosmetic Smile Consultation",
        ],
        formSubmitLabel: "Confirm Appointment Request",
        formSuccessHeading: "Appointment Request Received",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately reserves your clinical slot.",
        footerDesc: `Accredited dental practice providing gentle, comprehensive care for patients across Greater ${lead.city}.`,
        footerPhoneLabel: "Clinic Line:",
      };
    }

    // 3. RESTORATION & DISASTER RECOVERY
    if (n.includes("restor") || n.includes("water damage") || n.includes("flood") || n.includes("mold") || n.includes("fire damage")) {
      return {
        nicheKey: "restoration",
        tradeTitle: "Emergency Disaster, Flood & Mold Restoration",
        badge: `Certified Disaster & Flood Restoration · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s 24/7 Emergency <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Flood &amp; Disaster Restoration</span>.
          </>
        ),
        heroSub: `IICRC-certified emergency structural drying, floodwater extraction, and mold remediation across Greater ${lead.city}. Arriving on-site with industrial equipment in under 60 minutes with direct insurance billing.`,
        navBadge: `${lead.city} Disaster Response`,
        navCta: "Call Emergency Crew",
        navContactLabel: "Get Assessment",
        heroCta: "Request Rapid Assessment & Quote",
        heroTrustBadges: [
          "Direct Insurance Billing & Reports",
          "Sub-Second 0.28s Load Speed",
          "IICRC Certified Structural Drying",
        ],
        radarLabel: "RAPID RESTORATION",
        radarSub: `Emergency Intake: ${lead.city}`,
        partyA: { label: "Property Owner", initials: "PO", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Restoration Tech", icon: ShieldCheck, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Direct Insurance Billing", right: "IICRC Certified" },
        blueprintFrames: [
          {
            title: "▸ RAPID EXTRACTION TIMELINE",
            desc: `On-site within 60 minutes across Greater ${lead.city} with truck-mounted water extractors to prevent permanent timber and drywall ruin.`,
          },
          {
            title: "▸ INSURANCE CLAIM DOCUMENTATION",
            desc: "Comprehensive thermal moisture mapping and psychrometric logs prepared to ensure rapid insurance approval.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s so property owners dealing with burst mains or flooding connect with your team immediately.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Full Structural Recovery",
        stepsSub: "We eliminated bureaucratic claim delays and secondary mold damage.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Dispatch",
            cardNote: "60-Min Arrival",
            title: "Immediate Disaster Dispatch",
            desc: `Emergency call answered 24/7. Mobile restoration crews mobilized with industrial extraction units across ${lead.city}.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Thermal Scan",
            cardNote: "Infrared Moisture Map",
            title: "Extraction & Thermal Drying",
            desc: "High-volume water extraction followed by industrial LGR dehumidifiers and HEPA air scrubbers.",
            icon: Droplets,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Insurance Ready",
            cardNote: "Full Clearance Cert",
            title: "Sanitation & Insurance Sign-Off",
            desc: "Antimicrobial treatment applied, moisture targets verified, and complete insurance reports submitted.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Certified Disaster Recovery in ${lead.city}`,
        capabilitiesSub: "IICRC-accredited restoration technicians with commercial structural drying suites.",
        services: [
          {
            title: "Emergency Floodwater Extraction & Drying",
            desc: `Immediate extraction of standing water, wet carpet salvage, and rapid subfloor drying across ${lead.city}.`,
            tag: "60-Min Arrival",
            price: "Insurance Claimable",
            icon: Droplets,
          },
          {
            title: "Certified Mold Remediation & Air Scrubbing",
            desc: "Negative air containment, toxic mold spore eradication, and certified indoor air quality clearance testing.",
            tag: "Safety Clearance",
            price: "Written Report",
            icon: Bug,
          },
          {
            title: "Fire, Smoke & Soot Decontamination",
            desc: "Thermal fogging, structural soot removal, and permanent smoke odour neutralisation for fire-affected buildings.",
            tag: "Odour Neutral",
            price: "Full Mitigation",
            icon: Flame,
          },
          {
            title: "Sewage Backup & Biohazard Sanitation",
            desc: "Category 3 blackwater decontamination with medical-grade hospital disinfectants and hygienic clearance.",
            tag: "Bio-Clean",
            price: "Emergency Fixed",
            icon: ShieldCheck,
          },
        ],
        standardBadge: "RESTORATION STANDARD",
        standardHeading: `Why ${lead.city} Property Managers Trust ${lead.company}`,
        standardItems: [
          { title: "Direct Insurer Billing", desc: "We bill major insurance underwriters directly to minimise your out-of-pocket stress." },
          { title: "Industrial Equipment Fleet", desc: "Commercial desiccant and LGR dehumidifiers capable of drying multi-level buildings." },
          { title: "Certified IICRC Techs", desc: "All technicians certified in Water Damage Restoration (WRT) and Applied Microbial Remediation (AMRT)." },
          { title: "24/7 Standby Availability", desc: "Live crews ready 365 days a year for severe storm, pipe burst, and river flooding events." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of High-Value Insurance Jobs",
        auditSub: `When a home or business floods, every minute counts. Property owners tap the first number that loads. If your site takes 3 seconds, a competing restoration company wins a $5,000+ claim.`,
        auditBenefits: [
          "Edge CDN delivers 0.28s load times for instant emergency dispatch dialing.",
          "Zero slow WordPress plugins delaying panicked property owners in crisis.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in leaked Google ad traffic.`,
        ],
        socialProofHeading: `Property Owners in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Michael R.",
            neighborhood: `${lead.city} Suburbs`,
            quote: `Main water pipe burst while we were away, flooding the entire ground floor. ${lead.company} arrived in 35 minutes with extractors and dried our hardwood floors completely. Managed our insurance claim effortlessly.`,
          },
          {
            name: "Lisa T.",
            neighborhood: `${lead.city} North`,
            quote: "Professional, polite, and exceptionally thorough with mold remediation in our apartment. Provided a full lab clearance certificate. Highly recommended.",
          },
        ],
        formBadge: "EMERGENCY DISASTER INTAKE",
        formTitle: `Request Emergency Restoration in ${lead.city}`,
        formSub: "Immediate dispatch for water extraction, flood recovery, or mold inspection.",
        formLocationPlaceholder: `Your Property Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Urgent Flood / Active Water Ruin (Immediate Dispatch)",
          "Recent Flood (Dryout in Progress)",
          "Toxic Mold Inspection & Air Quality Test",
          "Fire & Smoke Damage Mitigation",
        ],
        formSubmitLabel: "Request Emergency Restoration Crew",
        formSuccessHeading: "Emergency Restoration Dispatched",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately alerts on-duty disaster response crews.",
        footerDesc: `IICRC-certified disaster recovery and floodwater restoration serving Greater ${lead.city}.`,
        footerPhoneLabel: "Emergency Hotline:",
      };
    }

    // 4. LOCKSMITH & PHYSICAL ACCESS SECURITY
    if (n.includes("lock") || n.includes("key") || n.includes("security")) {
      return {
        nicheKey: "locksmith",
        tradeTitle: "Mobile Locksmith & Security Specialists",
        badge: `Licensed Mobile Locksmith & Security · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s 24/7 Mobile <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Locksmith &amp; Security Response</span>.
          </>
        ),
        heroSub: `Licensed mobile locksmiths arriving at your door or vehicle within 25 minutes across Greater ${lead.city}. Non-destructive door opening, high-security deadbolts, digital locks, and transponder key cutting on-site.`,
        navBadge: `${lead.city} Mobile Van Active`,
        navCta: "Call Locksmith",
        navContactLabel: "Get Quote",
        heroCta: "Request Upfront Quote & Service",
        heroTrustBadges: [
          "Zero Damage Guarantee on Entry",
          "Sub-Second 0.28s Load Speed",
          "Licensed & Police Checked Master Locksmiths",
        ],
        radarLabel: "ACTIVE SERVICE UNIT",
        radarSub: `Live Service: ${lead.city}`,
        partyA: { label: "Client", initials: "CL", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Master Locksmith", icon: KeyRound, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Price Quoted", right: "No Damage" },
        blueprintFrames: [
          {
            title: "▸ 25-MINUTE ARRIVAL SLA",
            desc: `Mobile workshops dispatched immediately across Greater ${lead.city} for locked-out residential, commercial, and automotive customers.`,
          },
          {
            title: "▸ UPFRONT FIXED PRICING",
            desc: "Clear upfront quote agreed over the phone before our technician travels. Zero surprise fees upon unlocking.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s so locked-out customers on mobile phones can tap and connect in seconds.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Instant Entry & Security",
        stepsSub: "We eliminated long outdoor waits, broken door frames, and inflated lock replacement fees.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Call",
            cardNote: "24/7 Live Operator",
            title: "Call or Request Urgent Dispatch",
            desc: `Connect directly with our master locksmith van in ${lead.city}. We confirm your exact location and vehicle or lock type.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Mobile Van",
            cardNote: "ETA: 20 Mins",
            title: "Rapid Arrival & Non-Destructive Entry",
            desc: "Our fully equipped mobile workshop arrives. Master picks and specialist tools gain entry without scratching your frame.",
            icon: Navigation,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Secured",
            cardNote: "Restricted Keying",
            title: "Key Cutting & Security Check",
            desc: "Need new keys or re-keying? New keys cut on-site and deadbolts upgraded immediately.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Master Locksmith Capabilities in ${lead.city}`,
        capabilitiesSub: "Licensed physical security specialists providing residential, commercial, and automotive solutions.",
        services: [
          {
            title: "24/7 Emergency Door & Lockout Service",
            desc: `Rapid, non-destructive entry for homes, apartments, and commercial offices locked out across ${lead.city}.`,
            tag: "25-Min Arrival",
            price: "Fixed Quote",
            icon: KeyRound,
          },
          {
            title: "Automotive Key Cutting & Transponder Programming",
            desc: "Replacement car keys, remote key fobs, and transponder chip cloning for all Japanese, European, and local makes.",
            tag: "All Car Makes",
            price: "Same-Day Cut",
            icon: Car,
          },
          {
            title: "Digital Smart Locks & Keyless Entry",
            desc: "Installation of biometric fingerprint, PIN keypad, and smartphone app deadbolts from Yale, Samsung, and Lockwood.",
            tag: "Keyless Living",
            price: "Supplied & Fitted",
            icon: Sparkles,
          },
          {
            title: "Commercial Master Key & Restricted Systems",
            desc: "Restricted key duplication profiles and master suite hierarchy preventing unauthorized staff key copying.",
            tag: "Master Suited",
            price: "Commercial SLA",
            icon: Briefcase,
          },
        ],
        standardBadge: "LOCKSMITH STANDARD",
        standardHeading: `Why ${lead.city} Residents Trust ${lead.company}`,
        standardItems: [
          { title: "Non-Destructive Entry", desc: "Specialist pick tools open 98% of residential locks without drilling or damaging hardware." },
          { title: "Mobile Key Cutting", desc: "Computerised laser key-cutting machines onboard every service van for precise cuts." },
          { title: "Master Locksmiths", desc: "Licensed under state security legislation with comprehensive background vetting." },
          { title: "Warranty on All Locks", desc: "All supplied deadbolts, cylinders, and smart handles backed by 2-year warranty." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Urgent Lockout Calls",
        auditSub: `Locked-out customers standing on the street need help immediately. If your website takes 3 seconds to open, they hit back and dial the next mobile van.`,
        auditBenefits: [
          "Loads in 0.28 seconds for instant mobile access right on the street.",
          "Zero bloated WordPress scripts delaying the phone dialer.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Residents & Drivers in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Jessica P.",
            neighborhood: `${lead.city} Suburbs`,
            quote: `Locked myself out of my apartment at 11:00 PM. ${lead.company} was at my door in 20 minutes, unlocked the deadbolt cleanly without drilling, and charged the exact price quoted over the phone.`,
          },
          {
            name: "Tom W.",
            neighborhood: `${lead.city} CBD`,
            quote: "Lost our only set of car keys at the beach. Their mobile technician cut and programmed a brand new transponder key right in the car park. Saved us a huge towing fee.",
          },
        ],
        formBadge: "PRIORITY SERVICE INTAKE",
        formTitle: `Request Locksmith Service in ${lead.city}`,
        formSub: "Fill in your details for prompt 25-minute arrival or an upfront fixed quote.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Standard Service / Upfront Quote",
          "Urgent Lockout Assistance (Need Entry Now)",
          "Re-Keying / Lock Replacement Today",
          "Digital Smart Lock Installation Quote",
        ],
        formSubmitLabel: "Request Locksmith Quote & Service",
        formSuccessHeading: "Quote Request Received",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately alerts the local service team.",
        footerDesc: `Licensed mobile master locksmiths and physical access security specialists serving Greater ${lead.city}.`,
        footerPhoneLabel: "Direct Locksmith Line:",
      };
    }

    // 5. LANDSCAPING & OUTDOOR LIVING
    if (n.includes("landscape") || n.includes("landscaping") || n.includes("garden") || n.includes("turf") || n.includes("paving")) {
      return {
        nicheKey: "landscaping",
        tradeTitle: "Landscape Design, Construction & Paving",
        badge: "Award-Winning Landscape Design & Construction",
        heroHeadline: (
          <>
            {lead.city}&apos;s Master <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Landscape Design &amp; Construction</span>.
          </>
        ),
        heroSub: `Transforming outdoor spaces across Greater ${lead.city}. Turnkey landscape architecture, structural retaining walls, luxury paving, lush turf, and automated irrigation backed by structural guarantees.`,
        navBadge: `${lead.city} Landscape Studio`,
        navCta: "Book Design Consult",
        navContactLabel: "Consultation",
        heroCta: "Request Landscape Consultation",
        heroTrustBadges: [
          "Structural Engineering Guarantees",
          "Sub-Second 0.28s Load Speed",
          "Licensed Structural Landscaping Contractors",
        ],
        radarLabel: "PROJECT DESIGN",
        radarSub: `Landscape Intake: ${lead.city}`,
        partyA: { label: "Homeowner", initials: "HO", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Lead Designer", icon: Flower2, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Project Quote", right: "7-Yr Guarantee" },
        blueprintFrames: [
          {
            title: "▸ 3D ARCHITECTURAL CONCEPT DESIGN",
            desc: `Full 3D digital renders, plant schedules, and structural civil drawings tailored to your property contour in ${lead.city}.`,
          },
          {
            title: "▸ TURNKEY FIXED COST CONTRACTS",
            desc: "Zero budget blowouts. Fixed-price agreements covering all site excavation, retaining walls, paving, and softscaping.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s showcasing high-resolution project transformations without lagging on mobile devices.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Your Dream Outdoor Living Space",
        stepsSub: "We eliminated contractor delays, poor drainage design, and unexpected cost additions.",
        steps: [
          {
            num: "01",
            cardBadge: "On-Site Review",
            cardNote: "Site Feasibility",
            title: "Initial Consultation & Concept",
            desc: `We walk your property in ${lead.city}, analyze natural soil drainage, and formulate a custom design brief.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "3D Render",
            cardNote: "Fixed Scope",
            title: "Detailed Design & Fixed Quote",
            desc: "You receive 3D landscape visuals, material samples, and a comprehensive fixed-price construction schedule.",
            icon: Flower2,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Construction",
            cardNote: "Turnkey Delivery",
            title: "Master Construction & Handover",
            desc: "Our licensed civil landscapers complete excavation, retaining walls, paving, turf, and architectural planting.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Landscaping Capabilities Across ${lead.city}`,
        capabilitiesSub: "Structural and softscape solutions built to withstand the Australian climate.",
        services: [
          {
            title: "Structural Retaining Walls & Stone Masonry",
            desc: `Certified concrete sleeper, sandstone block, and timber retaining walls engineered for soil retention across ${lead.city}.`,
            tag: "Engineered Walls",
            price: "Engineered Cert",
            icon: Hammer,
          },
          {
            title: "Premium Porcelain, Travertine & Concrete Paving",
            desc: "Precision poolside paving, patio extensions, alfresco entertaining zones, and durable stone pathways.",
            tag: "Poolside Paving",
            price: "Turnkey Fixed",
            icon: Sparkles,
          },
          {
            title: "Premium Turf Installation & Soil Enrichment",
            desc: "Sir Walter DNA Certified Buffalo, TifTuf Bermuda, and automated sub-surface smart irrigation systems.",
            tag: "Lush Living",
            price: "Supplied & Laid",
            icon: Flower2,
          },
          {
            title: "Custom Timber Decking & Pergola Pergolas",
            desc: "Hardwood Merbau, Spotted Gum, and low-maintenance composite decking engineered for long-term entertaining.",
            tag: "Outdoor Entertaining",
            price: "Custom Design",
            icon: Award,
          },
        ],
        standardBadge: "CONSTRUCTION STANDARD",
        standardHeading: `Why ${lead.city} Property Owners Choose ${lead.company}`,
        standardItems: [
          { title: "Structural Licences", desc: "Fully insured and licensed structural landscaping contractors complying with building codes." },
          { title: "Comprehensive Soil Drainage", desc: "Integrated ag-pipe and drainage pits preventing water pooling or foundation erosion." },
          { title: "Planting Warranty", desc: "All supplied mature trees, shrubs, and turf backed by health and establishment warranties." },
          { title: "Clean & Tidy Sites", desc: "Daily site cleanups with protective ground boards to safeguard your driveway." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of High-Value Renovation Projects",
        auditSub: `Homeowners planning a $20k–$80k backyard overhaul demand polish and speed. If your website takes 3 seconds to render photos, they switch to the next studio.`,
        auditBenefits: [
          "High-performance edge delivery renders photos in 0.28 seconds on mobile.",
          "Zero bloated WordPress plugins slowing down project gallery viewing.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Homeowners in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "David & Sarah C.",
            neighborhood: `${lead.city} Hills`,
            quote: `${lead.company} took our sloping, unusable backyard and built a breathtaking travertine pool terrace with stone retaining walls. Delivered on time and on budget.`,
          },
          {
            name: "Greg M.",
            neighborhood: `${lead.city} Suburbs`,
            quote: "Superb communication from initial 3D concept to final turf laying. Our outdoor space feels like a 5-star resort. Outstanding work.",
          },
        ],
        formBadge: "LANDSCAPE DESIGN CONSULTATION",
        formTitle: `Book On-Site Landscape Consultation in ${lead.city}`,
        formSub: "Discuss your outdoor living vision with our senior design team.",
        formLocationPlaceholder: `Your Property Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Ready to Build This Month",
          "Planning Project for Next Quarter",
          "New Home Build Handover Coming Soon",
          "Pool Surrounds & Entertaining Upgrade Only",
        ],
        formSubmitLabel: "Request Landscape Consultation",
        formSuccessHeading: "Design Request Received",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately schedules your on-site landscape design consultation.",
        footerDesc: `Licensed landscape designers and structural construction contractors serving Greater ${lead.city}.`,
        footerPhoneLabel: "Studio Line:",
      };
    }

    // 6. TREE CARE & ARBORISTS
    if (n.includes("tree") || n.includes("arborist") || n.includes("lopping") || n.includes("stump")) {
      return {
        nicheKey: "tree_care",
        tradeTitle: "Certified Arborists & Tree Removal",
        badge: "AQF Level 5 Arborists · 24/7 Storm Response",
        heroHeadline: (
          <>
            {lead.city}&apos;s Certified <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Tree Removal &amp; Arborist Services</span>.
          </>
        ),
        heroSub: `Safe, fully insured tree removal, pruning, and emergency storm clearing across Greater ${lead.city}. AQF-qualified arborists, $20M public liability cover, high-reach crane access, and high-power stump grinding.`,
        navBadge: `${lead.city} Arborist Crew`,
        navCta: "Call Arborist",
        navContactLabel: "Emergency Clearing",
        heroCta: "Request Tree Assessment",
        heroTrustBadges: [
          "$20M Public Liability Insurance",
          "Sub-Second 0.28s Load Speed",
          "AQF-Qualified Professional Arborists",
        ],
        radarLabel: "ARBORIST RADAR",
        radarSub: `Tree Assessment: ${lead.city}`,
        partyA: { label: "Property Owner", initials: "PO", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Lead Arborist", icon: Trees, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Price Quoted", right: "Insured $20M" },
        blueprintFrames: [
          {
            title: "▸ COUNCIL PERMIT ASSISTANCE",
            desc: `Comprehensive Tree Management Plans and arborist impact reports prepared for fast council approval in ${lead.city}.`,
          },
          {
            title: "▸ FULL PROPERTY PROTECTION",
            desc: "Precision sectional dismantling and lowering ropes ensuring zero damage to roofs, fences, or garden beds.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s so property owners with storm-damaged or falling trees connect with your crew instantly.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Safe Tree Clearing & Care",
        stepsSub: "We eliminated hazardous guesswork, council permit stress, and messy debris left on your lawn.",
        steps: [
          {
            num: "01",
            cardBadge: "On-Site Review",
            cardNote: "Arborist Hazard Scan",
            title: "Free On-Site Assessment",
            desc: `Our AQF arborist inspects the tree health, assesses property proximity, and outlines a safe removal strategy in ${lead.city}.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Precision Roping",
            cardNote: "Sectional Lowering",
            title: "Controlled Dismantling",
            desc: "Climbers and crane operators dismantle the tree in controlled segments with heavy-duty rigging equipment.",
            icon: Trees,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Stump Ground",
            cardNote: "Spotless Yard",
            title: "Stump Grinding & Woodchip Clean",
            desc: "The tree stump is ground 300mm below soil level. All branches are mulched and your yard left completely pristine.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Arborist Capabilities Across ${lead.city}`,
        capabilitiesSub: "Precision operations executed in accordance with Australian Standards (AS 4373-2007).",
        services: [
          {
            title: "Emergency Dangerous Tree Removal",
            desc: `Safe, sectional dismantling of diseased, decaying, or storm-compromised trees in confined residential spaces in ${lead.city}.`,
            tag: "24/7 Response",
            price: "Insured Fixed",
            icon: Trees,
          },
          {
            title: "Deadwooding & Canopy Pruning",
            desc: "Strategic thinning, power line clearance, and weight reduction promoting long-term tree health and sunlight penetration.",
            tag: "Canopy Health",
            price: "AS Compliant",
            icon: Wind,
          },
          {
            title: "High-Power Hydraulic Stump Grinding",
            desc: "Sub-surface root and stump grinding removing termite attractants and preparing land for turf or paving.",
            tag: "300mm Deep",
            price: "Fixed Price",
            icon: Hammer,
          },
          {
            title: "AQF Level 5 Arborist Reports",
            desc: "Independent tree hazard audits, pre-development impact reports, and DA documentation for council submissions.",
            tag: "Council Ready",
            price: "Written Cert",
            icon: FileText,
          },
        ],
        standardBadge: "SAFETY STANDARD",
        standardHeading: `Why ${lead.city} Residents Trust ${lead.company}`,
        standardItems: [
          { title: "$20M Liability Insurance", desc: "Complete insurance coverage protecting your property, neighbours, and public assets." },
          { title: "Specialist Rigging Rig", desc: "Advanced lowering friction bollards and cranes for zero impact on surrounding structures." },
          { title: "Pristine Yard Cleanup", desc: "Every twig, leaf, and woodchip cleared away with industrial blowers upon completion." },
          { title: "Free Woodchip Mulch", desc: "Option to keep nutrient-rich garden mulch generated from your tree on-site." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of High-Value Tree Removal Calls",
        auditSub: `When a large gum tree branches crack in a storm or a tree threatens a roof, homeowners call the first company on their phone. Speedcraft Studio ensures they connect in 0.28 seconds.`,
        auditBenefits: [
          "Loads in 0.28 seconds for instant mobile access during emergency weather.",
          "Zero bloated WordPress scripts delaying the phone dialer.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Property Owners in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Richard H.",
            neighborhood: `${lead.city} North`,
            quote: `Massive dead eucalypt looming directly over our roof. ${lead.company} lowered every branch with surgical precision without touching our tiles or fence. Cleaned up every scrap of debris.`,
          },
          {
            name: "Caroline S.",
            neighborhood: `${lead.city} Suburbs`,
            quote: "Punctual, fully insured, and prepared a full arborist report that got our council removal approved in one week. Great team.",
          },
        ],
        formBadge: "TREE REMOVAL INTAKE",
        formTitle: `Request Free Tree Assessment in ${lead.city}`,
        formSub: "Get an upfront quote from an AQF-certified arborist.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Emergency Storm Damage (Tree Over Hanging / Leaning)",
          "Dangerous Tree Removal Needed Soon",
          "Canopy Pruning & Powerline Clearance",
          "Stump Grinding Only",
        ],
        formSubmitLabel: "Request Free Tree Assessment",
        formSuccessHeading: "Tree Assessment Logged",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately notifies on-call arborists.",
        footerDesc: `Fully insured certified arborists and emergency tree removal services across Greater ${lead.city}.`,
        footerPhoneLabel: "Arborist Hotline:",
      };
    }

    // 7. CLEANING SERVICES
    if (n.includes("clean") || n.includes("janitorial") || n.includes("carpet clean") || n.includes("wash")) {
      return {
        nicheKey: "cleaning",
        tradeTitle: "Commercial & Residential Cleaning Specialists",
        badge: `Top-Rated Commercial & Home Cleaning · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s Top-Rated <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Commercial &amp; Home Cleaning</span>.
          </>
        ),
        heroSub: `Hospital-grade commercial office cleaning, end-of-lease bond cleans, and deep steam extraction across Greater ${lead.city}. Eco-safe formulations, police-checked staff, and 100% bond-back guarantees.`,
        navBadge: `${lead.city} Cleaning Team`,
        navCta: "Book Cleaning",
        navContactLabel: "Get Quote",
        heroCta: "Request Free Cleaning Quote",
        heroTrustBadges: [
          "100% Bond-Back Written Guarantee",
          "Sub-Second 0.28s Load Speed",
          "Police-Checked & Insured Cleaners",
        ],
        radarLabel: "ACTIVE CLEANING TEAM",
        radarSub: `Service Area: ${lead.city}`,
        partyA: { label: "Client", initials: "CL", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Lead Cleaner", icon: Brush, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Quote Agreed", right: "100% Guarantee" },
        blueprintFrames: [
          {
            title: "▸ 72-HOUR BOND RE-CLEAN GUARANTEE",
            desc: `Real estate checklist guaranteed. If your property manager flags any item, we re-clean free of charge within 72 hours.`,
          },
          {
            title: "▸ HOSPITAL-GRADE DISINFECTION",
            desc: "Hospital-grade HEPA filtered vacuums, non-toxic eco solutions, and colour-coded microfibre cloths preventing cross-contamination.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s on mobile so moving tenants and office managers can book their clean in under a minute.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to a Spotless Property",
        stepsSub: "We eliminated missed corners, bond deposit deductions, and unreliable contractors.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Booking",
            cardNote: "Instant Quote",
            title: "Select Service & Date",
            desc: `Choose your cleaning package online or call our ${lead.city} team for an upfront itemised quote.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Vetted Crew",
            cardNote: "Full Equipment Kit",
            title: "Professional On-Site Clean",
            desc: "Our fully vetted cleaning team arrives with industrial steam cleaners and eco-safe supplies.",
            icon: Brush,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Bond Back",
            cardNote: "Inspection Ready",
            title: "Final Inspection & Sign-Off",
            desc: "We perform a room-by-room quality checklist, leaving your property immaculate and ready for handover.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Cleaning Capabilities in ${lead.city}`,
        capabilitiesSub: "Commercial and residential cleaning solutions tailored to your requirements.",
        services: [
          {
            title: "End-of-Lease Bond Cleaning",
            desc: `Comprehensive real estate approved move-out cleaning with oven, window, and wall spot cleaning in ${lead.city}.`,
            tag: "Bond Guaranteed",
            price: "Fixed Quote",
            icon: ShieldCheck,
          },
          {
            title: "Deep Carpet Steam Cleaning & Stain Extraction",
            desc: "High-heat truck-mounted steam extraction removing embedded allergens, stubborn pet stains, and bacteria.",
            tag: "Deep Sanitised",
            price: "Per Room Rate",
            icon: Droplets,
          },
          {
            title: "Commercial Office & Corporate Cleaning",
            desc: "Nightly or weekly sanitised office upkeep, workstation wipe-downs, and commercial washroom replenishment.",
            tag: "Corporate SLA",
            price: "Contract Rate",
            icon: Briefcase,
          },
          {
            title: "High-Pressure Exterior Surface Cleaning",
            desc: "High-PSI cleaning for mouldy driveways, concrete pathways, commercial forecourts, and outdoor pavers.",
            tag: "High Pressure",
            price: "Fixed M² Quote",
            icon: Sparkles,
          },
        ],
        standardBadge: "HYGIENE STANDARD",
        standardHeading: `Why ${lead.city} Clients Book ${lead.company}`,
        standardItems: [
          { title: "100% Bond Guarantee", desc: "Free immediate re-attendance if your leasing agent identifies any clean issue." },
          { title: "Police-Checked Staff", desc: "Every cleaner has undergone strict background, reference, and police checks." },
          { title: "Eco-Safe Detergents", desc: "Non-corrosive, pet and baby-safe plant-based formulas with zero harsh chemical odours." },
          { title: "All Equipment Supplied", desc: "We provide all vacuums, steam extractors, ladders, and chemicals." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Cleaning Bookings",
        auditSub: `Tenants moving out need to book a cleaner fast. If your site lags, they jump to the next Google result. Speedcraft Studio ensures zero bounce.`,
        auditBenefits: [
          "Edge CDN delivers 0.28s load times for rapid mobile booking.",
          "Zero bloated WordPress plugins dragging down Core Web Vitals.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Tenants & Businesses in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Emma D.",
            neighborhood: `${lead.city} Central`,
            quote: `Booked an end-of-lease clean for our 2-bedroom rental. Got 100% of our bond refunded with zero questions from the real estate agent. Completely stress-free.`,
          },
          {
            name: "Mark B.",
            neighborhood: `${lead.city} South`,
            quote: "Reliable, thorough, and trustworthy. They clean our medical clinic twice weekly with hospital-grade sanitisation. Excellent team.",
          },
        ],
        formBadge: "CLEANING INTAKE",
        formTitle: `Book Professional Cleaning in ${lead.city}`,
        formSub: "Get an upfront quote with our 100% satisfaction guarantee.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Urgent Move-Out / End of Lease Clean",
          "This Week (Deep Home / Carpet Clean)",
          "Regular Office / Commercial Cleaning Quote",
          "Pressure Cleaning & Exterior Wash",
        ],
        formSubmitLabel: "Request Cleaning Quote",
        formSuccessHeading: "Cleaning Booking Logged",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately notifies our cleaning schedule manager.",
        footerDesc: `Vetted commercial and residential cleaning specialists serving Greater ${lead.city}.`,
        footerPhoneLabel: "Cleaning Line:",
      };
    }

    // 8. SOLAR
    if (n.includes("solar") || n.includes("energy") || n.includes("renew")) {
      return {
        nicheKey: "solar",
        tradeTitle: "Residential & Commercial Solar Systems",
        badge: "CEC-Accredited Clean Energy Specialists",
        heroHeadline: (
          <>
            {lead.city}&apos;s High-Yield <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Solar &amp; Battery Storage</span>.
          </>
        ),
        heroSub: `Cut electricity bills up to 80% with tier-1 solar panels and smart battery storage across Greater ${lead.city}. CEC-accredited engineering, 25-year performance warranties, and zero upfront finance options.`,
        navBadge: `${lead.city} Solar Operations`,
        navCta: "Get Solar Quote",
        navContactLabel: "Solar Quote",
        heroCta: "Request Free Solar Assessment",
        heroTrustBadges: [
          "CEC-Accredited Designers & Installers",
          "Sub-Second 0.28s Load Speed",
          "25-Year Performance Guarantee",
        ],
        radarLabel: "SOLAR AUDIT",
        radarSub: `Solar System Design: ${lead.city}`,
        partyA: { label: "Property Owner", initials: "PO", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Solar Engineer", icon: Sun, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Yield Guaranteed", right: "25-Yr Warranty" },
        blueprintFrames: [
          {
            title: "▸ ROOF SHADOW & YIELD ANALYSIS",
            desc: `Detailed satellite solar modeling and production calculation tailored to your roof pitch and orientation in ${lead.city}.`,
          },
          {
            title: "▸ REBATE & INCENTIVE HANDLING",
            desc: "All government STC rebates and feed-in tariff documentation managed end-to-end for zero administrative stress.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: "Instant loading mobile assessment tool that captures homeowners seeking immediate electricity bill relief.",
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Permanent Energy Independence",
        stepsSub: "We eliminated pushy door-to-door salesmen and overpriced foreign hardware.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Audit",
            cardNote: "Satellite Modeling",
            title: "Free Rooftop Assessment",
            desc: `We review your recent power bill and model your roof yield for maximum generation in ${lead.city}.`,
            icon: Sun,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "CEC Engineered",
            cardNote: "Tier-1 Microinverters",
            title: "Precision System Design",
            desc: "Custom component matching with premium tier-1 panels, smart inverters, and scalable battery storage.",
            icon: Zap,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Turnkey Power",
            cardNote: "Grid Connection Included",
            title: "Certified Installation & Activation",
            desc: "Accredited master electricians install your system, complete safety testing, and connect you to the grid.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Solar Solutions",
        capabilitiesHeading: `Clean Energy Capabilities in ${lead.city}`,
        capabilitiesSub: "High-efficiency installations backed by comprehensive performance warranties.",
        services: [
          {
            title: "Residential Tier-1 Solar Installations",
            desc: `High-efficiency 6.6kW to 13.2kW rooftop solar systems designed for maximum self-consumption in ${lead.city}.`,
            tag: "Bill Slasher",
            price: "Rebates Included",
            icon: Sun,
          },
          {
            title: "Home Battery Storage (Tesla / BYD)",
            desc: "Store daytime solar generation for evening use and protect your household against blackout power outages.",
            tag: "Blackout Backup",
            price: "Turnkey Package",
            icon: Zap,
          },
          {
            title: "Commercial Solar & Peak Shaving",
            desc: "30kW to 100kW+ commercial rooftop arrays dramatically reducing operational overhead for local enterprises.",
            tag: "Commercial ROI",
            price: "Feasibility Study",
            icon: Briefcase,
          },
          {
            title: "Inverter Replacement & Fault Repairs",
            desc: "Same-day troubleshooting for red-light inverter errors, isolator burnouts, and declining solar generation.",
            tag: "System Rescue",
            price: "Diagnostic Fixed",
            icon: Award,
          },
        ],
        standardBadge: "ENGINEERING STANDARD",
        standardHeading: `Why ${lead.city} Chooses ${lead.company}`,
        standardItems: [
          { title: "CEC Certified Installers", desc: "Installed solely by Clean Energy Council accredited master electricians." },
          { title: "Tier-1 Bloomberg Hardware", desc: "Only high-purity monocrystalline modules with proven 25-year linear output warranties." },
          { title: "Government Rebate Handling", desc: "Immediate point-of-sale discounts applied directly to your quote." },
          { title: "Real-Time Mobile Monitoring", desc: "Live smartphone app tracking generation, consumption, and export credits." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of High-Intent Solar Leads",
        auditSub: `When a property owner gets hit with a quarterly electricity bill, they search for solar quotes immediately. If your site lags, they switch to competing installers. Speedcraft Studio ensures zero lost leads.`,
        auditBenefits: [
          "Edge CDN delivers 0.28s load times for instant mobile quote forms.",
          "Zero bloated WordPress plugins dragging down Core Web Vitals.",
          `Recovers an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in leaked PPC traffic.`,
        ],
        socialProofHeading: `Property Owners in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Greg P.",
            neighborhood: `${lead.city} South`,
            quote: `Quarterly electricity bill dropped from $1,100 to under $180. The installation crew from ${lead.company} was exceptionally fast, clean, and professional.`,
          },
          {
            name: "Lisa N.",
            neighborhood: `${lead.city} Hills`,
            quote: "Great honest advice on battery sizing and roof orientation. Handled all government rebate paperwork seamlessly.",
          },
        ],
        formBadge: "FREE SOLAR YIELD AUDIT",
        formTitle: `Calculate Your Solar Savings in ${lead.city}`,
        formSub: "Get an accurate quote and rooftop feasibility report within 60 minutes.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Ready to Install This Month (Rebate Claim)",
          "Planning Within 60 Days",
          "Battery Storage Add-On Only",
          "Free Roof Feasibility Quote",
        ],
        formSubmitLabel: "Calculate My Solar Savings",
        formSuccessHeading: "Solar Assessment Received",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately schedules your solar engineering report.",
        footerDesc: `Clean Energy Council accredited solar and battery storage installations across Greater ${lead.city}.`,
        footerPhoneLabel: "Solar Hotline:",
      };
    }

    // 9. PEST CONTROL
    if (n.includes("pest") || n.includes("termite") || n.includes("rodent")) {
      return {
        nicheKey: "pest",
        tradeTitle: "Eco-Safe Pest Control & Termite Barriers",
        badge: `Targeted Pest & Termite Defence · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s Eco-Safe <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Pest &amp; Termite Defence</span>.
          </>
        ),
        heroSub: `Rapid, child and pet-safe pest eradication across Greater ${lead.city}. Thermal termite inspections, guaranteed pest barriers, and certified treatments with zero toxic fumes.`,
        navBadge: `${lead.city} Pest Specialist`,
        navCta: "Book Treatment",
        navContactLabel: "Get Quote",
        heroCta: "Request Same-Day Pest Treatment",
        heroTrustBadges: [
          "100% Child & Pet-Friendly Formulations",
          "Sub-Second 0.28s Load Speed",
          "12-Month Pest-Free Guarantee",
        ],
        radarLabel: "ACTIVE PEST UNIT",
        radarSub: `Priority Service: ${lead.city}`,
        partyA: { label: "Resident", initials: "RS", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Licensed Tech", icon: Bug, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Inspection Agreed", right: "Safe Barrier" },
        blueprintFrames: [
          {
            title: "▸ THERMAL TERMITE IMAGING",
            desc: `Non-invasive infrared scanning detecting hidden termite nests behind walls without damaging plaster in ${lead.city}.`,
          },
          {
            title: "▸ WRITTEN 12-MONTH WARRANTY",
            desc: "If pests return within the warranty period, our technicians re-treat your property completely free of charge.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: "Loads instantly on mobile phones so distressed homeowners can call for immediate eradication.",
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to a Guaranteed Pest-Free Property",
        stepsSub: "We eliminated ineffective supermarket sprays and dangerous chemical residues.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Dispatch",
            cardNote: "Rapid Arrival",
            title: "Schedule Rapid Inspection",
            desc: `Call or book online for guaranteed same-day technician dispatch across ${lead.city}.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Thermal Scan",
            cardNote: "Nest Location",
            title: "Targeted Inspection & Eradication",
            desc: "We locate nesting zones and apply micro-encapsulated treatments safe for pets and children.",
            icon: Bug,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Active Barrier",
            cardNote: "12-Month Coverage",
            title: "Long-Term Perimeter Shield",
            desc: "Perimeter chemical barrier installed to prevent future infestations, backed by our written warranty.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Certified Pest Solutions in ${lead.city}`,
        capabilitiesSub: "Licensed chemical handlers adhering strictly to Australian Pest Management standards.",
        services: [
          {
            title: "Termite Thermal Inspection & Chemical Barriers",
            desc: `Complete AS 3660.2 certified thermal radar termite scans and Termidor chemical soil barriers in ${lead.city}.`,
            tag: "Termite Shield",
            price: "Written Report",
            icon: Bug,
          },
          {
            title: "Residential General Pest Eradication",
            desc: "Single-treatment eradication for German cockroaches, black house spiders, ants, and silverfish.",
            tag: "Family Safe",
            price: "12-Mo Warranty",
            icon: ShieldCheck,
          },
          {
            title: "Rodent Baiting & Roof Cavity Proofing",
            desc: "Tamper-proof lockable external bait stations and entry point sealing to stop rats and mice permanently.",
            tag: "Fast Elimination",
            price: "Fixed Quote",
            icon: Award,
          },
          {
            title: "Commercial & Restaurant HACCP Compliance",
            desc: "Scheduled pest management plans with digital audit logbooks for hospitality and food manufacturing venues.",
            tag: "Health Certified",
            price: "Commercial SLA",
            icon: Briefcase,
          },
        ],
        standardBadge: "SAFETY STANDARD",
        standardHeading: `Why ${lead.city} Calls ${lead.company}`,
        standardItems: [
          { title: "Zero Odour Formulations", desc: "No need to evacuate your property for hours; safe immediately after application." },
          { title: "Licensed Technicians", desc: "All team members hold certified Australian EPA licenses and police checks." },
          { title: "12-Month Re-Treatment", desc: "Unconditional free re-service if covered pests reappear during your warranty." },
          { title: "Same-Day Emergency Service", desc: "Dedicated emergency vans ready for immediate wasp, rodent, or spider outbreaks." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Urgent Pest Calls",
        auditSub: `When a customer discovers termites or a rodent infestation, they want a technician fast. A sluggish site makes them tap the back button. Speedcraft Studio locks in the lead in under 0.3 seconds.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds for instant mobile booking.",
          "Zero heavy CMS plugins or WordPress bloat slowing down emergency pest triage.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Homeowners in ${lead.city} Trust ${lead.company}`,
        testimonials: [
          {
            name: "Amanda L.",
            neighborhood: `${lead.city} West`,
            quote: `Found active termites in our doorframe. ${lead.company} arrived in 40 minutes with thermal cameras, treated the colony, and installed a full barrier. Absolute lifesavers.`,
          },
          {
            name: "Brian W.",
            neighborhood: `${lead.city} North`,
            quote: "Completely eliminated a terrible cockroach problem in one afternoon. Odourless, totally safe for our dogs, and zero bugs ever since.",
          },
        ],
        formBadge: "PRIORITY PEST INTAKE",
        formTitle: `Schedule Pest Treatment in ${lead.city}`,
        formSub: "Book same-day emergency eradication or request a written quote.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Immediate Emergency (Active Termites / Rodents)",
          "This Week (General Pest Treatment)",
          "Pre-Purchase Timber Pest Inspection",
          "Commercial Venue Maintenance",
        ],
        formSubmitLabel: "Request Pest Treatment",
        formSuccessHeading: "Pest Treatment Request Logged",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately notifies on-call pest technicians.",
        footerDesc: `Licensed pest management and termite barrier installations across Greater ${lead.city}.`,
        footerPhoneLabel: "Pest Dispatch:",
      };
    }

    // 10. HVAC / AIR CONDITIONING
    if (n.includes("hvac") || n.includes("air") || n.includes("cool") || n.includes("heat") || n.includes("climate")) {
      return {
        nicheKey: "hvac",
        tradeTitle: "HVAC & Climate Control Specialists",
        badge: `Licensed Cooling & Heating Specialists · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s 24/7 Emergency <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">AC &amp; Heating Response</span>.
          </>
        ),
        heroSub: `Licensed master technicians on standby across Greater ${lead.city}. Upfront fixed quotes, guaranteed same-day arrival, and sub-second dispatch.`,
        navBadge: `${lead.city} HVAC Specialists`,
        navCta: "Call Specialist",
        navContactLabel: "Get Quote",
        heroCta: "Request Heating & Cooling Quote",
        heroTrustBadges: [
          "Zero Overtime or Heatwave Surcharges",
          "Sub-Second 0.28s Load Speed",
          "10-Year Workmanship Warranty",
        ],
        radarLabel: "ACTIVE HVAC UNIT",
        radarSub: `Climate Control: ${lead.city}`,
        partyA: { label: "Homeowner", initials: "JH", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Master Tech", icon: Flame, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Quote Agreed", right: "No Overtime" },
        blueprintFrames: [
          {
            title: "▸ DISPATCH TIMELINE",
            desc: `Average arrival time is under 45 minutes across Greater ${lead.city}. Live vehicle tracking sent to mobile.`,
          },
          {
            title: "▸ UPFRONT PRICING SLA",
            desc: "Zero surprise invoices. Written fixed quote agreed before any work starts. Zero weekend or overtime markups.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s compared to legacy WordPress (${lead.mobileLoadTimeSec}s), capturing emergency cooling and heating calls.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Guaranteed Resolution",
        stepsSub: "We eliminated phone trees, waiting queues, and surprise quotes.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Dispatch",
            cardNote: "No Hold Music",
            title: "Tap to Call or Request Dispatch",
            desc: `Connect immediately with a licensed dispatcher in ${lead.city}. No automated bots or call centers.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Van En Route",
            cardNote: "ETA: 22 Mins",
            title: "Live Technician Tracking",
            desc: "We assign the closest technician in your suburb. You get an exact ETA and vehicle tracking pin.",
            icon: Navigation,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Fixed Invoice",
            cardNote: "100% Backed",
            title: "Fixed Quote & Lifetime Guarantee",
            desc: "Your technician inspects the site, presents a written fixed quote, and executes the repair with certified parts.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Our Capabilities",
        capabilitiesHeading: `Specialized Services Across ${lead.city}`,
        capabilitiesSub: "Exact solutions handled by master-certified trade technicians.",
        services: [
          {
            title: "Emergency AC Repair & Leak Stop",
            desc: `Immediate cooling diagnostics, capacitor replacement, and refrigerant top-up within 45 minutes across ${lead.city}.`,
            tag: "45-Min Arrival",
            price: "Fixed Quote",
            icon: Flame,
          },
          {
            title: "Heat Pump & Ducted Restoration",
            desc: "Expert heat pump diagnostics, faulty ignition repairs, and electrical safety interlock testing.",
            tag: "Licensed Tech",
            price: "Upfront Pricing",
            icon: Sparkles,
          },
          {
            title: "High-Efficiency Inverter Installation",
            desc: "Complete split-system and ducted inverter installation backed by 10-year manufacturer warranty.",
            tag: "10-Yr Warranty",
            price: "Free Assessment",
            icon: Award,
          },
          {
            title: "Seasonal Tune-Up & Air Quality Audit",
            desc: "Multi-point coil sanitation, duct airflow pressure calibration, and motor amperage checks.",
            tag: "Comprehensive",
            price: "$89 Flat",
            icon: Activity,
          },
        ],
        standardBadge: "RESPONSE STANDARD",
        standardHeading: `Why ${lead.city} Residents Call ${lead.company} First`,
        standardItems: [
          { title: "Zero Callout Fee", desc: "No fee to travel to your property when repairs are performed." },
          { title: "Direct Master Techs", desc: "Every van is operated by a fully licensed, background-checked tradesperson." },
          { title: "Fully Stocked Vans", desc: "94% of emergency repairs completed in a single visit with onboard inventory." },
          { title: "Lifetime Workmanship", desc: "All labor backed by written warranty for total customer peace of mind." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Callers",
        auditSub: `When a homeowner experiences AC failure in a heatwave, they click the top Google ad on their phone. If your site doesn't load under 1 second, they tap back and call the next contractor.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds.",
          "Zero heavy Elementor/WordPress plugin overhead blocking the phone dialer.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Homeowners in ${lead.city} Trust Us`,
        testimonials: [
          {
            name: "Marcus Vance",
            neighborhood: `${lead.city} Inner West`,
            quote: "AC failed during a 39-degree heatwave. Technician was at our door in 32 minutes, replaced the capacitor, and had freezing air blasting before dinner.",
          },
          {
            name: "Sarah Jenkins",
            neighborhood: `${lead.city} Hills`,
            quote: "Zero guesswork or surprise fees. They gave me a fixed price before opening a single panel. Outstanding speed.",
          },
        ],
        formBadge: "PRIORITY DISPATCH FORM",
        formTitle: `Request Priority Dispatch in ${lead.city}`,
        formSub: "Fill in your details for immediate 45-minute arrival or an upfront quote.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Immediate Emergency (Under 45 Mins)",
          "Today (Standard Business Hours)",
          "Scheduled Next 48 Hours",
          "Upfront Price Quote Only",
        ],
        formSubmitLabel: "Submit Emergency Request",
        formSuccessHeading: "Simulated Dispatch Sent",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this instantly notifies the on-call dispatcher.",
        footerDesc: `Licensed trade contracting serving all suburbs of Greater ${lead.city}.`,
        footerPhoneLabel: "Direct Dispatch:",
      };
    }

    // 11. ROOFING
    if (n.includes("roof")) {
      return {
        nicheKey: "roofing",
        tradeTitle: "Roofing & Storm Repairs",
        badge: `Licensed Roof Repair & Restoration · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s Master <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Roof Repair &amp; Restoration</span>.
          </>
        ),
        heroSub: `Licensed, fully insured roofing contractors serving all suburbs across Greater ${lead.city}. Written quotes, zero overtime fees, and 25-year warranties.`,
        navBadge: `${lead.city} Roofing Specialists`,
        navCta: "Call Specialist",
        navContactLabel: "Get Quote",
        heroCta: "Request Free Roof Inspection",
        heroTrustBadges: [
          "24/7 Emergency Storm Tarping",
          "Sub-Second 0.28s Load Speed",
          "25-Year Workmanship Warranty",
        ],
        radarLabel: "ACTIVE ROOF UNIT",
        radarSub: `Roof Assessment: ${lead.city}`,
        partyA: { label: "Homeowner", initials: "JH", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Roof Specialist", icon: ShieldCheck, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Quote Agreed", right: "Storm Certified" },
        blueprintFrames: [
          {
            title: "▸ DISPATCH TIMELINE",
            desc: `Average emergency storm response under 45 minutes across Greater ${lead.city}. Full tarping and leak isolation.`,
          },
          {
            title: "▸ UPFRONT PRICING SLA",
            desc: "Zero surprise invoices. Written fixed quote agreed before any repairs start.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s so homeowners with storm damage get through to your crew immediately.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Guaranteed Roof Integrity",
        stepsSub: "We eliminated phone trees, waiting queues, and surprise quotes.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Dispatch",
            cardNote: "Rapid Response",
            title: "Immediate Roof Assessment",
            desc: `Connect directly with our licensed roofing team in ${lead.city}.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Drone Survey",
            cardNote: "Thermal Leak Trace",
            title: "Site Inspection & Tarping",
            desc: "We secure active leaks with emergency tarping and pinpoint broken tiles or flashing issues.",
            icon: Navigation,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Certified Fix",
            cardNote: "25-Yr Warranty",
            title: "Permanent Restoration",
            desc: "Full repairs completed with certified tiles, Colorbond steel, and watertight flashing.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Capabilities",
        capabilitiesHeading: `Master Roofing Capabilities in ${lead.city}`,
        capabilitiesSub: "Licensed, fully insured roofing contractors serving all suburbs across Greater Sydney.",
        services: [
          {
            title: "Emergency Storm & Leak Isolation",
            desc: `Rapid roof tarping, structural leak tracking, and tile replacements following severe weather in ${lead.city}.`,
            tag: "24/7 Response",
            price: "Urgent Dispatch",
            icon: ShieldCheck,
          },
          {
            title: "Full Tile & Colorbond Re-Roofing",
            desc: "Architectural metal, terracotta tile, and flat roof restorations with certified Australian Standards compliance.",
            tag: "25-Yr Warranty",
            price: "Written Guarantee",
            icon: Award,
          },
          {
            title: "Seamless Gutter & Downpipe Overhauls",
            desc: "Commercial-grade seamless leaf-guard gutters preventing structural water pooling and foundation rot.",
            tag: "High Capacity",
            price: "Fixed Quote",
            icon: Droplets,
          },
          {
            title: "High-Resolution Drone Inspection",
            desc: "Thermal imaging reports for insurance claims, storm certs, and structural timber integrity.",
            tag: "Same-Day Report",
            price: "Free with Repair",
            icon: Sparkles,
          },
        ],
        standardBadge: "RESPONSE STANDARD",
        standardHeading: `Why ${lead.city} Homeowners Choose ${lead.company}`,
        standardItems: [
          { title: "Zero Callout Fee", desc: "No fee to travel to your property when repairs are performed." },
          { title: "Master Roofers", desc: "Every project handled by fully licensed, insured roofing specialists." },
          { title: "Insurance Claim Reports", desc: "Detailed photographic and drone reports formatted for insurance assessors." },
          { title: "Lifetime Workmanship", desc: "All labor backed by written warranty for total customer peace of mind." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Roofing Calls",
        auditSub: `When a storm hits, homeowners search frantically on their phones. If your page takes 3 seconds to load, they tap the next contractor.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds.",
          "Zero heavy Elementor plugins blocking the call button.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Homeowners in ${lead.city} Trust Us`,
        testimonials: [
          {
            name: "Robert Henderson",
            neighborhood: `${lead.city} North`,
            quote: "Severe hail cracked 18 tiles causing water to pour through our ceiling. They arrived with tarps in 40 minutes and fixed it completely the next morning.",
          },
          {
            name: "Elena Morales",
            neighborhood: `${lead.city} Bay`,
            quote: "Immaculate cleanup—not a single roofing nail left in our driveway. Very honest team with upfront quotes.",
          },
        ],
        formBadge: "PRIORITY DISPATCH FORM",
        formTitle: `Request Roofing Dispatch in ${lead.city}`,
        formSub: "Fill in your details for immediate emergency tarping or an upfront quote.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Emergency Active Leak (Tarping Needed)",
          "Storm Damage Assessment",
          "Full Roof Restoration Quote",
          "Gutter & Downpipe Repair",
        ],
        formSubmitLabel: "Submit Roofing Request",
        formSuccessHeading: "Simulated Dispatch Sent",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this instantly notifies the on-call roofer.",
        footerDesc: `Licensed trade contracting serving all suburbs of Greater ${lead.city}.`,
        footerPhoneLabel: "Direct Dispatch:",
      };
    }

    // 12. ELECTRICAL
    if (n.includes("electr") || n.includes("power") || n.includes("spark")) {
      return {
        nicheKey: "electrical",
        tradeTitle: "Licensed Master Electricians",
        badge: `Licensed Master Electricians · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s 24/7 Master <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Electrical Emergency Response</span>.
          </>
        ),
        heroSub: `Immediate safety dispatch across Greater ${lead.city}. Switchboard upgrades, outage restoration, upfront fixed pricing, and clean work.`,
        navBadge: `${lead.city} Electrical Team`,
        navCta: "Call Electrician",
        navContactLabel: "Get Quote",
        heroCta: "Request Upfront Quote & Service",
        heroTrustBadges: [
          "Zero Callout Fee With Work",
          "Sub-Second 0.28s Load Speed",
          "100% Written Workmanship Guarantee",
        ],
        radarLabel: "ACTIVE ELECTRICAL UNIT",
        radarSub: `Live Service: ${lead.city}`,
        partyA: { label: "Homeowner", initials: "JH", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Master Tech", icon: Zap, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Fixed Quote Agreed", right: "Full Compliance" },
        blueprintFrames: [
          {
            title: "▸ DISPATCH TIMELINE",
            desc: `Average arrival time is under 45 minutes across Greater ${lead.city}. Live vehicle tracking sent to mobile.`,
          },
          {
            title: "▸ UPFRONT PRICING SLA",
            desc: "Zero surprise invoices. Written fixed quote agreed before any work starts. Zero weekend or overtime markups.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Loads in 0.28s compared to slow WordPress (${lead.mobileLoadTimeSec}s), capturing emergency electrical calls.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Guaranteed Resolution",
        stepsSub: "We eliminated phone trees, waiting queues, and surprise quotes.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Dispatch",
            cardNote: "Direct Line",
            title: "Tap to Call or Request Dispatch",
            desc: `Connect immediately with a licensed dispatcher in ${lead.city}.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Van En Route",
            cardNote: "ETA: 22 Mins",
            title: "Live Electrician Tracking",
            desc: "We assign the closest licensed electrician in your suburb with live ETA tracking.",
            icon: Navigation,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Fixed Invoice",
            cardNote: "Safety Certified",
            title: "Fixed Quote & Compliance Certificate",
            desc: "Site inspection, transparent quote, and safety certificate issued on completion.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Our Capabilities",
        capabilitiesHeading: `Electrical Capabilities in ${lead.city}`,
        capabilitiesSub: "Exact solutions handled by master-certified trade technicians.",
        services: [
          {
            title: "Power Outage & Circuit Fault Finding",
            desc: `Thermal detection to locate short circuits and trip switches safely across ${lead.city}.`,
            tag: "Immediate Priority",
            price: "Fixed Quote",
            icon: Zap,
          },
          {
            title: "Switchboard & RCD Safety Upgrades",
            desc: "Modern surge-proof enclosures and RCD safety breaker retrofits ensuring 100% compliance.",
            tag: "Full Compliance",
            price: "Upfront Cost",
            icon: ShieldCheck,
          },
          {
            title: "EV Fast Charger Installation",
            desc: "Level 2 dedicated electric vehicle wall-box charging circuits for Tesla, BYD, and universal EVs.",
            tag: "Certified",
            price: "Package Deal",
            icon: Sparkles,
          },
          {
            title: "LED Conversion & Commercial Wiring",
            desc: "Architectural lighting, three-phase power balancing, and low-energy commercial retrofits.",
            tag: "High Efficiency",
            price: "Free Audit",
            icon: Award,
          },
        ],
        standardBadge: "RESPONSE STANDARD",
        standardHeading: `Why ${lead.city} Residents Call ${lead.company}`,
        standardItems: [
          { title: "Zero Callout Fee", desc: "No fee to travel to your property when repairs are performed." },
          { title: "Direct Master Techs", desc: "Every van is operated by a fully licensed, background-checked tradesperson." },
          { title: "Fully Stocked Vans", desc: "94% of emergency repairs completed in a single visit with onboard inventory." },
          { title: "Lifetime Workmanship", desc: "All labor backed by written warranty for total customer peace of mind." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Electrical Emergency Calls",
        auditSub: `When a main switchboard sparks or power trips, homeowners dial the first result. If your site stutters, they call someone else.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds.",
          "Zero heavy Elementor plugin overhead blocking the phone dialer.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Homeowners in ${lead.city} Trust Us`,
        testimonials: [
          {
            name: "Daniel Craig",
            neighborhood: `${lead.city} East`,
            quote: "Our main switchboard started humming and sparking on a Sunday evening. The electrician was here in 35 minutes, safely replaced the breaker, and explained everything.",
          },
          {
            name: "Jessica Taylor",
            neighborhood: `${lead.city} Central`,
            quote: "Installed a dedicated Tesla charger and overhauled our old fuses. Clean, punctual, and zero hidden costs.",
          },
        ],
        formBadge: "PRIORITY DISPATCH FORM",
        formTitle: `Request Electrical Dispatch in ${lead.city}`,
        formSub: "Fill in your details for immediate 45-minute arrival or an upfront quote.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Immediate Emergency (Under 45 Mins)",
          "Today (Standard Business Hours)",
          "Switchboard Upgrade Quote",
          "EV Charger Installation",
        ],
        formSubmitLabel: "Submit Electrical Request",
        formSuccessHeading: "Simulated Dispatch Sent",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this instantly notifies the on-call electrician.",
        footerDesc: `Licensed trade contracting serving all suburbs of Greater ${lead.city}.`,
        footerPhoneLabel: "Direct Dispatch:",
      };
    }

    // 13. PLUMBING (ONLY IF EXPLICITLY PLUMBING)
    if (n.includes("plumb") || n.includes("drain") || n.includes("pipe") || n.includes("gas fit") || n.includes("hot water")) {
      return {
        nicheKey: "plumbing",
        tradeTitle: "Emergency Plumbing & Drain Specialists",
        badge: `Licensed Master Plumber Response · ${lead.city}`,
        heroHeadline: (
          <>
            {lead.city}&apos;s 24/7 Emergency <br className="hidden sm:inline" />
            <span className="text-[#6FD9C1]">Plumbing Response</span>.
          </>
        ),
        heroSub: `Immediate dispatch across Greater ${lead.city}. Upfront fixed pricing, zero callout fees with work, and licensed master plumbers arriving in under 45 minutes.`,
        navBadge: `${lead.city} Plumbing Team`,
        navCta: "Call Plumber",
        navContactLabel: "Get Quote",
        heroCta: "Request Upfront Quote & Service",
        heroTrustBadges: [
          "Zero Callout Fee With Work",
          "Sub-Second 0.28s Load Speed",
          "100% Written Workmanship Guarantee",
        ],
        radarLabel: "ACTIVE PLUMBING UNIT",
        radarSub: `Live Service: ${lead.city}`,
        partyA: { label: "Homeowner", initials: "JH", bg: "#B5D4F4", text: "#0C447C" },
        partyB: { label: "Master Tech", icon: Droplets, bg: "#CECBF6", text: "#22184A" },
        agreementPill: { left: "Upfront Quote Agreed", right: "No Overtime" },
        blueprintFrames: [
          {
            title: "▸ DISPATCH TIMELINE",
            desc: `Average arrival time is under 45 minutes across Greater ${lead.city}. Live vehicle tracking sent to mobile.`,
          },
          {
            title: "▸ UPFRONT PRICING SLA",
            desc: "Zero surprise invoices. Written fixed quote agreed before any work starts. Zero weekend or overtime markups.",
          },
          {
            title: "▸ SUB-SECOND EDGE STACK",
            desc: `Built on Next.js Edge CDN. Loads in 0.28s compared to legacy WordPress (${lead.mobileLoadTimeSec}s), capturing every phone call.`,
          },
        ],
        stepsBadge: "How It Works",
        stepsHeading: "Three Steps to Guaranteed Resolution",
        stepsSub: "We eliminated phone trees, waiting queues, and surprise quotes.",
        steps: [
          {
            num: "01",
            cardBadge: "1-Tap Dispatch",
            cardNote: "No Hold Music",
            title: "Tap to Call or Request Dispatch",
            desc: `Connect immediately with a licensed dispatcher in ${lead.city}. No automated bots or outsourced call centers.`,
            icon: Phone,
            color: "#0A997D",
            bgColor: "#6FD9C1",
          },
          {
            num: "02",
            cardBadge: "Van #12 En Route",
            cardNote: "ETA: 22 Mins",
            title: "Live Technician Tracking",
            desc: "We assign the closest technician in your suburb. You get an exact ETA and vehicle tracking pin to your phone.",
            icon: Navigation,
            color: "#633806",
            bgColor: "#F5B301",
          },
          {
            num: "03",
            cardBadge: "Fixed Invoice",
            cardNote: "100% Backed",
            title: "Fixed Quote & Lifetime Guarantee",
            desc: "Your technician inspects the site, presents a written fixed quote, and executes the repair with certified parts.",
            icon: ShieldCheck,
            color: "#0A997D",
            bgColor: "#CECBF6",
          },
        ],
        capabilitiesBadge: "Our Capabilities",
        capabilitiesHeading: `Specialized Services Across ${lead.city}`,
        capabilitiesSub: "Exact solutions handled by master-certified trade technicians.",
        services: [
          {
            title: "Burst Pipes & Acoustic Leak Detection",
            desc: `Immediate non-invasive ultrasound leak tracing and pipe repair within 45 minutes across ${lead.city}.`,
            tag: "45-Min Arrival",
            price: "Fixed Quote",
            icon: Droplets,
          },
          {
            title: "5,000 PSI Hydro-Jet Drain Clearing",
            desc: "High-pressure root slicing and CCTV in-pipe camera inspection to clear blocked sewer and stormwater drains.",
            tag: "CCTV Included",
            price: "Same-Day Fix",
            icon: Sparkles,
          },
          {
            title: "Hot Water Heater Replacement",
            desc: "Same-day installation for Rheem, Rinnai, and Dux gas, electric, and continuous flow heat pump systems.",
            tag: "Same-Day Hot Water",
            price: "Upfront Price",
            icon: Flame,
          },
          {
            title: "Gas Fitting & Emergency Leak Detection",
            desc: "Licensed gas fitting, compliance certificates, cooktop connections, and urgent gas line repairs.",
            tag: "Licensed Gasfitter",
            price: "Safety Certified",
            icon: ShieldCheck,
          },
        ],
        standardBadge: "RESPONSE STANDARD",
        standardHeading: `Why ${lead.city} Residents Call ${lead.company} First`,
        standardItems: [
          { title: "Zero Callout Fee", desc: "No fee to travel to your property when repairs are performed." },
          { title: "Direct Master Techs", desc: "Every van is operated by a fully licensed, background-checked tradesperson." },
          { title: "Fully Stocked Vans", desc: "94% of emergency repairs completed in a single visit with onboard inventory." },
          { title: "Lifetime Workmanship", desc: "All labor backed by written warranty for total customer peace of mind." },
        ],
        auditHeadline: "Every 1-Second Mobile Delay Leaks 20% of Callers",
        auditSub: `When a homeowner has an emergency, they click the top Google ad on their phone. If your site doesn't load under 1 second, they tap back and call the next contractor.`,
        auditBenefits: [
          "Next.js App Router renders on Edge CDN in 0.28 seconds.",
          "Zero heavy Elementor/WordPress plugin overhead blocking the phone dialer.",
          `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
        ],
        socialProofHeading: `Homeowners in ${lead.city} Trust Us`,
        testimonials: [
          {
            name: "James Wilson",
            neighborhood: `${lead.city} Suburbs`,
            quote: "Burst pipe under our bathroom floor at 11:30 PM. Their plumber arrived in 30 minutes, isolated the mains, and repaired the copper pipe cleanly.",
          },
          {
            name: "Claire Bennett",
            neighborhood: `${lead.city} North`,
            quote: "Upfront quote before any tool touched our house. They cleared a massive tree root obstruction with high-pressure jetting in under an hour.",
          },
        ],
        formBadge: "PRIORITY DISPATCH FORM",
        formTitle: `Request Priority Dispatch in ${lead.city}`,
        formSub: "Fill in your details for immediate 45-minute arrival or an upfront quote.",
        formLocationPlaceholder: `Your Suburb in ${lead.city}`,
        formUrgencyOptions: [
          "Immediate Emergency (Under 45 Mins)",
          "Today (Standard Business Hours)",
          "Scheduled Next 48 Hours",
          "Upfront Price Quote Only",
        ],
        formSubmitLabel: "Submit Emergency Request",
        formSuccessHeading: "Simulated Dispatch Sent",
        formSuccessDesc: "Your test request was processed in 0.04s. In production, this instantly notifies the on-call dispatcher.",
        footerDesc: `Licensed trade contracting serving all suburbs of Greater ${lead.city}.`,
        footerPhoneLabel: "Direct Dispatch:",
      };
    }

    // 14. DYNAMIC SMART ADAPTER (ANY OTHER BUSINESS OR NICHE)
    // NEVER defaults to plumbing! Uses actual lead.niche and company name dynamically.
    const cleanNicheTitle = lead.niche || "Professional Services";
    return {
      nicheKey: "custom",
      tradeTitle: `${cleanNicheTitle} Specialists`,
      badge: `Premier ${cleanNicheTitle} · ${lead.city}`,
      heroHeadline: (
        <>
          {lead.city}&apos;s Trusted <br className="hidden sm:inline" />
          <span className="text-[#6FD9C1]">{cleanNicheTitle} Specialists</span>.
        </>
      ),
      heroSub: `Delivering exceptional, reliable, and verified ${cleanNicheTitle.toLowerCase()} solutions across Greater ${lead.city}. Upfront transparent pricing, experienced professionals, and sub-second booking.`,
      navBadge: `${lead.city} Specialist Team`,
      navCta: "Contact Team",
      navContactLabel: "Get Quote",
      heroCta: `Request ${cleanNicheTitle} Consultation`,
      heroTrustBadges: [
        "100% Quality & Satisfaction Guarantee",
        "Sub-Second 0.28s Load Speed",
        "Direct Access to Senior Specialists",
      ],
      radarLabel: "SERVICE INTAKE",
      radarSub: `Client Intake: ${lead.city}`,
      partyA: { label: "Client", initials: "CL", bg: "#B5D4F4", text: "#0C447C" },
      partyB: { label: "Lead Specialist", icon: Briefcase, bg: "#CECBF6", text: "#22184A" },
      agreementPill: { left: "Fixed Scope Agreed", right: "Guaranteed" },
      blueprintFrames: [
        {
          title: "▸ PRIORITY INTAKE RESPONSE",
          desc: `Immediate inquiry triage across Greater ${lead.city}. Transparent scope review and responsive client service.`,
        },
        {
          title: "▸ CLEAR PRICING TRANSPARENCY",
          desc: "Zero hidden fees. Written quotes and deliverables established before work begins.",
        },
        {
          title: "▸ SUB-SECOND EDGE STACK",
          desc: `Built on Next.js Edge CDN. Loads in 0.28s on mobile, capturing every high-intent local customer.`,
        },
      ],
      stepsBadge: "How It Works",
      stepsHeading: "Three Steps to Seamless Service",
      stepsSub: "We eliminated delays, unanswered emails, and unexpected costs.",
      steps: [
        {
          num: "01",
          cardBadge: "1-Tap Contact",
          cardNote: "Direct Line",
          title: "Direct Initial Consultation",
          desc: `Connect directly with our specialist team in ${lead.city}. We discuss your exact requirements and timeline.`,
          icon: Phone,
          color: "#0A997D",
          bgColor: "#6FD9C1",
        },
        {
          num: "02",
          cardBadge: "Assessment",
          cardNote: "Fixed Scope",
          title: "Tailored Assessment & Quote",
          desc: "We provide an upfront, transparent proposal tailored specifically to your needs with guaranteed delivery.",
          icon: FileText,
          color: "#633806",
          bgColor: "#F5B301",
        },
        {
          num: "03",
          cardBadge: "Delivery",
          cardNote: "100% Guaranteed",
          title: "Execution & Quality Sign-Off",
          desc: "Our verified team executes the solution cleanly and professionally, ensuring complete satisfaction.",
          icon: ShieldCheck,
          color: "#0A997D",
          bgColor: "#CECBF6",
        },
      ],
      capabilitiesBadge: "Capabilities",
      capabilitiesHeading: `Specialized Capabilities Across ${lead.city}`,
      capabilitiesSub: `Trusted ${cleanNicheTitle.toLowerCase()} delivered by certified local experts.`,
      services: [
        {
          title: `Comprehensive ${cleanNicheTitle}`,
          desc: `Complete, end-to-end service delivery tailored to residential and commercial clients across ${lead.city}.`,
          tag: "Core Service",
          price: "Fixed Quote",
          icon: Briefcase,
        },
        {
          title: "Priority Same-Day Consultation",
          desc: `Fast-track site inspection, assessment, and rapid turnaround for urgent client requirements in ${lead.city}.`,
          tag: "Priority Service",
          price: "Upfront Cost",
          icon: Sparkles,
        },
        {
          title: "Custom Tailored Solutions",
          desc: "Bespoke service execution designed around your specific schedule, property, and operational needs.",
          tag: "Tailored",
          price: "Package Deal",
          icon: Award,
        },
        {
          title: "Preventative Maintenance & Ongoing Support",
          desc: "Proactive care, regular maintenance, and guaranteed support keeping everything operating smoothly.",
          tag: "Guaranteed",
          price: "Written SLA",
          icon: ShieldCheck,
        },
      ],
      standardBadge: "SERVICE STANDARD",
      standardHeading: `Why ${lead.city} Clients Choose ${lead.company}`,
      standardItems: [
        { title: "Direct Specialist Access", desc: "Speak directly with verified, experienced professionals who know your industry." },
        { title: "Transparent Pricing", desc: "Itemised quotes agreed before starting with zero surprise bills." },
        { title: "Prompt Local Service", desc: `Fast, punctual team serving all suburbs across Greater ${lead.city}.` },
        { title: "100% Satisfaction", desc: "Every project backed by our commitment to total customer satisfaction." },
      ],
      auditHeadline: `Every 1-Second Mobile Delay Leaks 20% of ${cleanNicheTitle} Inquiries`,
      auditSub: `When a customer in ${lead.city} searches for ${cleanNicheTitle.toLowerCase()} services, they want instant answers on their phone. If your website takes 3 seconds to open, they click your competitor.`,
      auditBenefits: [
        "Edge CDN renders the landing page in 0.28 seconds for instant mobile access.",
        "Zero slow WordPress plugins blocking phone calls and booking submissions.",
        `Saves an estimated ~${lead.currencySymbol}${lead.estLostMonthlySpend}/mo in wasted Google ad clicks.`,
      ],
      socialProofHeading: `Clients in ${lead.city} Trust ${lead.company}`,
      testimonials: [
        {
          name: "David M.",
          neighborhood: `${lead.city} Suburbs`,
          quote: `Outstanding service from ${lead.company}. Prompt, professional, and kept everything transparent from start to finish. Highly recommended.`,
        },
        {
          name: "Sarah B.",
          neighborhood: `${lead.city} Central`,
          quote: "They answered immediately, gave an upfront quote with zero hidden fees, and delivered exceptional quality. Very impressed.",
        },
      ],
      formBadge: "PRIORITY INTAKE FORM",
      formTitle: `Request ${cleanNicheTitle} Service in ${lead.city}`,
      formSub: "Fill in your details for prompt contact or an upfront assessment.",
      formLocationPlaceholder: `Your Suburb in ${lead.city}`,
      formUrgencyOptions: [
        "Immediate Priority / As Soon As Possible",
        "This Week (Standard Hours)",
        "Scheduled Consultation Next Week",
        "Upfront Quote & Pricing Inquiry",
      ],
      formSubmitLabel: `Request ${cleanNicheTitle} Consultation`,
      formSuccessHeading: "Inquiry Received",
      formSuccessDesc: "Your test request was processed in 0.04s. In production, this immediately notifies the practice manager.",
      footerDesc: `Premier ${cleanNicheTitle.toLowerCase()} provider serving clients across Greater ${lead.city}.`,
      footerPhoneLabel: "Direct Line:",
    };
  }, [lead.niche, lead.city, lead.company, lead.mobileLoadTimeSec, lead.currencySymbol, lead.estLostMonthlySpend]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customVisualStyles }} />

      <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0D] antialiased selection:bg-[#6FD9C1] selection:text-[#0C0730] pb-24 sm:pb-16">
        
        {/* ═══════════════════════════════════════════════════════════════
            SANDBOX POPUP TOAST (use.live / quickfleet tactile feedback)
        ═══════════════════════════════════════════════════════════════ */}
        {sandboxAlert.visible && (
          <aside aria-label="Prototype Navigation Notice" className="toast-pop fixed bottom-24 left-3 right-3 sm:left-auto sm:right-6 sm:w-[420px] z-[90]">
            <div className="rounded-[22px] bg-[#0C0730] text-white p-4 shadow-[0_20px_50px_-15px_rgba(12,7,48,0.5)] border border-[#6FD9C1]/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-[38%] bg-[#6FD9C1]/20 flex items-center justify-center shrink-0 text-[#6FD9C1] mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-white leading-tight">
                  {sandboxAlert.linkName || "Link"} Clicked in Speed Prototype
                </p>
                <p className="text-[12px] text-white/70 mt-1 leading-snug">
                  Navigation is sandboxed to keep this benchmark focused strictly on conversion and instant load speeds.
                </p>
              </div>
              <button
                onClick={() => setSandboxAlert({ visible: false })}
                className="w-8 h-8 rounded-full hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center shrink-0 transition"
                aria-label="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            HEADER: QUICKFLEET FROSTED PILL NAVIGATION BAR
            - Centered segmented menu pill (#F3F1EC)
            - Pulsing live status beacon
            - Dialable phone call button
        ═══════════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 pb-2 transition-all">
          <nav className="max-w-[1200px] mx-auto flex items-center justify-between gap-2 rounded-full bg-white/85 p-1.5 pl-4 sm:pl-6 shadow-[0_8px_24px_-12px_rgba(12,7,48,0.18)] ring-1 ring-black/[0.07] backdrop-blur-md">
            
            {/* Brand Logo & Live Status */}
            <div className="flex items-center gap-3">
              <Link href={`/preview/${slug}`} className="flex items-center gap-2.5 group">
                <span className="w-9 h-9 rounded-[38%] bg-[#0A0A0D] text-white font-extrabold text-[15px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-black/10">
                  {lead.company.charAt(0)}
                </span>
                <div className="min-w-0">
                  <span className="block text-[14px] sm:text-[15px] font-extrabold text-[#0A0A0D] tracking-tight truncate max-w-[150px] sm:max-w-[210px] leading-tight">
                    {lead.company}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10.5px] font-mono tracking-wider uppercase text-[#0A997D] font-semibold">
                    <span className="qf-status-dot" />
                    <span>{nicheConfig.navBadge}</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* QuickFleet Centered Segmented Navigation (Desktop) */}
            <ul className="hidden md:flex items-center gap-1 bg-[#F3F1EC] p-1 rounded-full text-[13px] font-medium text-[#0A0A0D]">
              <li>
                <a href="#services" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#process" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  Standard
                </a>
              </li>
              <li>
                <a href="#reviews" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#quote-form" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  {nicheConfig.navContactLabel}
                </a>
              </li>
            </ul>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Quick dial ghost pill */}
              <a
                href={`tel:${cleanPhone}`}
                className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-10 px-3.5 rounded-full border border-black/15 text-[13px] font-bold text-[#0A0A0D] hover:border-black/35 hover:bg-white transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#0A997D]" />
                <span>{lead.phone}</span>
              </a>

              {/* Ink Black Solid Call Button (Tap Target: 44px+) */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-full bg-[#0A0A0D] text-white hover:bg-[#1E293B] text-[13px] font-extrabold shadow-sm active:scale-95 transition"
                style={{ minHeight: 44 }}
              >
                <Phone className="w-3.5 h-3.5 text-[#0A997D]" />
                <span>{nicheConfig.navCta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/60 hidden sm:inline" />
              </a>
            </div>
          </nav>
        </header>

        {/* ═══════════════════════════════════════════════════════════════
            HERO CONTAINER: MODERN UNIVERSAL CONVERSION HUB
            - Dynamic industry-specific hero background image
            - High-contrast dark gradient overlay ensuring 100% legibility
            - Universal quote & consultation conversion hub for ANY business
            - Live status audio stage centerpiece with floating micro-badges
        ═══════════════════════════════════════════════════════════════ */}
        <div className="px-2 sm:px-4 md:px-6 pt-2 pb-8 max-w-[1360px] mx-auto">
          <section className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)] text-white bg-slate-950">
            
            {/* Dynamic Industry Hero Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={heroBgImage}
                alt={`${lead.company} - ${lead.niche}`}
                fill
                priority={true}
                sizes="(max-width: 1280px) 100vw, 1360px"
                className="object-cover object-center"
                style={{ objectFit: "cover" }}
              />
              {/* Contrast Overlay: Dark gradient to guarantee white headline & CTA legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85 backdrop-blur-[0.5px]" />
              <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
            </div>

            {/* Ambient Lighting Accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
              <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#0A997D]/25 blur-3xl" />
              <div className="absolute -bottom-36 -left-20 w-96 h-96 rounded-full bg-[#F5B301]/15 blur-3xl" />
            </div>

            <div className="relative z-10 p-5 sm:p-8 md:p-14 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* ─── Hero Left: Copy & Universal Priority Booking Hub (7 Cols) ─── */}
                <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                  
                  {/* Eyebrow Pill Tag */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-1.5 border border-white/20 shadow-xs backdrop-blur-md">
                    <span className="qf-status-dot" />
                    <span className="text-[11.5px] font-mono tracking-wider uppercase font-bold text-[#6FD9C1]">
                      {nicheConfig.badge}
                    </span>
                  </div>

                  {/* Main Punchy Headline */}
                  <h1 className="text-[32px] sm:text-[46px] md:text-[54px] font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-md">
                    {nicheConfig.heroHeadline}
                  </h1>

                  <p className="text-[15px] sm:text-[17px] text-white/90 font-medium leading-relaxed max-w-xl drop-shadow-sm">
                    {nicheConfig.heroSub}
                  </p>

                  {/* Universal Consultation & Instant Quote Hub */}
                  <div className="rounded-[24px] bg-white p-4 sm:p-5 border border-black/[0.08] shadow-[0_14px_35px_-12px_rgba(0,0,0,0.08)] max-w-xl text-[#0A0A0D]">
                    {/* Header inside conversion hub */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0A997D]" />
                        <span className="text-[13px] font-extrabold text-[#0A0A0D] tracking-tight">
                          Priority Quote &amp; Consultation Request
                        </span>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#0A997D] bg-[#0A997D]/10 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A997D] animate-pulse" />
                        0.28s Instant Connect
                      </span>
                    </div>

                    {formIntercepted ? (
                      <div className="p-5 rounded-2xl bg-[#0A997D]/10 border border-[#0A997D]/30 text-center space-y-2.5">
                        <div className="w-11 h-11 rounded-full bg-[#0A997D] text-white flex items-center justify-center mx-auto shadow-sm">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-[16px] font-extrabold text-[#0A0A0D]">
                            Request Received Successfully!
                          </h4>
                          <p className="text-[12.5px] text-[#475569] mt-0.5 max-w-md mx-auto">
                            The team at <strong className="text-[#0A0A0D]">{lead.company}</strong> has received your inquiry. We will contact you at <strong className="text-[#0A0A0D]">{bookingData.phone || "your number"}</strong> within 15 minutes.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormIntercepted(false)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold text-[#0A997D] hover:underline pt-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Submit Another Inquiry</span>
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                        {/* Service Selection Dropdown */}
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40">
                            <Briefcase className="w-4 h-4 text-[#0A997D]" />
                          </span>
                          <select
                            value={bookingData.service || (nicheConfig.services[0]?.title ?? "")}
                            onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                            className="h-11 sm:h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#FAF9F5] pl-10 pr-9 text-[13.5px] font-bold text-[#0A0A0D] outline-none focus:border-[#0A997D] focus:bg-white transition"
                          >
                            {nicheConfig.services.map((s, idx) => (
                              <option key={idx} value={s.title}>{s.title}</option>
                            ))}
                            <option value="General Consultation & Quote">General Consultation &amp; Custom Scope</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {/* Suburb / Location input */}
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40">
                              <MapPin className="w-4 h-4 text-[#0A997D]" />
                            </span>
                            <input
                              type="text"
                              placeholder={nicheConfig.formLocationPlaceholder}
                              value={bookingData.suburb}
                              onChange={(e) => setBookingData({ ...bookingData, suburb: e.target.value })}
                              className="h-11 sm:h-12 w-full rounded-2xl border border-black/10 bg-[#FAF9F5] pl-10 pr-4 text-[13.5px] font-bold text-[#0A0A0D] outline-none placeholder:text-black/40 focus:border-[#0A997D] focus:bg-white transition"
                              required
                            />
                          </div>

                          {/* Phone input */}
                          <div className="relative">
                            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40">
                              <Phone className="w-4 h-4 text-[#0A997D]" />
                            </span>
                            <input
                              type="tel"
                              placeholder="Your Phone Number"
                              value={bookingData.phone}
                              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                              className="h-11 sm:h-12 w-full rounded-2xl border border-black/10 bg-[#FAF9F5] pl-10 pr-4 text-[13.5px] font-bold text-[#0A0A0D] outline-none placeholder:text-black/40 focus:border-[#0A997D] focus:bg-white transition"
                              required
                            />
                          </div>
                        </div>

                        {/* Submit / Call CTA Button (50px+ tap target) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <button
                            type="submit"
                            disabled={formLoading}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0A0A0D] hover:bg-[#1E293B] text-white text-[14px] font-extrabold transition active:scale-[0.98] cursor-pointer shadow-md"
                          >
                            {formLoading ? (
                              <RotateCcw className="w-4 h-4 animate-spin text-white" />
                            ) : (
                              <>
                                <span>{nicheConfig.heroCta}</span>
                                <ArrowRight className="w-4 h-4 text-[#0A997D]" />
                              </>
                            )}
                          </button>

                          <a
                            href={`tel:${cleanPhone}`}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-black/12 bg-white hover:bg-black/[0.03] text-[#0A0A0D] text-[14px] font-extrabold transition active:scale-[0.98] shadow-xs"
                          >
                            <Phone className="w-4 h-4 text-[#0A997D]" />
                            <span>Call {lead.phone}</span>
                          </a>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Trust Highlights */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[12.5px] font-semibold text-white/95">
                    {nicheConfig.heroTrustBadges.map((badge, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10 shadow-xs">
                        <Check className="w-4 h-4 text-[#6FD9C1]" />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* ─── Hero Right: The Iconic use.live Call/Stage Card (5 Cols) ─── */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  
                  {/* Floating Micro-Badges (Use.Live signature) */}
                  <div className="live-float-1 absolute -top-4 -left-2 sm:-left-6 z-20">
                    <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#0A0A0D] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] border border-black/10">
                      <Zap className="w-4 h-4 text-[#0A997D] fill-[#0A997D]" />
                      <span>0.28s Mobile Load</span>
                    </span>
                  </div>

                  <div className="live-float-2 absolute -bottom-4 -left-4 sm:left-0 z-20">
                    <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#0A0A0D] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] border border-black/10">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>Direct Local Contact</span>
                    </span>
                  </div>

                  <div className="live-float-3 absolute -top-3 -right-2 sm:-right-4 z-20">
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#0A0A0D] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] border border-black/10">
                      <Star className="w-4 h-4 text-[#F5B301] fill-[#F5B301]" />
                      <span>4.9 ★ Verified</span>
                    </span>
                  </div>

                  {/* Centered Main Live Widget Card */}
                  <div className="relative w-full max-w-[340px] rounded-[30px] bg-white text-[#0A0A0D] p-5 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.12)] border border-black/[0.08]">
                    
                    {/* Header: Live Badge + Ticker */}
                    <div className="flex items-center justify-between text-[12px] font-extrabold pb-3 border-b border-black/[0.06]">
                      <span className="flex items-center gap-1.5 text-[#10B981] uppercase tracking-wider font-mono">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                        </span>
                        <span>{nicheConfig.radarLabel}</span>
                      </span>
                      <span className="font-mono text-black/50 tabular-nums">00:42 LIVE</span>
                    </div>

                    <div className="mt-3">
                      <p className="text-[15px] font-extrabold leading-tight text-[#0A0A0D]">
                        {nicheConfig.radarSub}
                      </p>
                      <p className="text-[12px] text-black/55 font-medium mt-0.5">
                        {nicheConfig.tradeTitle}
                      </p>
                    </div>

                    {/* Tactile Audio Connection Stage (use.live signature) */}
                    <div className="relative mt-5 flex items-center justify-between px-2">
                      {/* Customer / Client Squircle */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className="w-13 h-13 rounded-[38%] font-extrabold text-[18px] flex items-center justify-center shadow-md ring-2 ring-white"
                          style={{ backgroundColor: nicheConfig.partyA.bg, color: nicheConfig.partyA.text }}
                        >
                          {nicheConfig.partyA.initials}
                        </span>
                        <span className="text-[11px] font-extrabold text-black/70">
                          {nicheConfig.partyA.label}
                        </span>
                      </div>

                      {/* Equalizer Sound Waves */}
                      <div className="live-eq" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>

                      {/* Professional Squircle */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className="w-13 h-13 rounded-[38%] font-extrabold text-[18px] flex items-center justify-center shadow-md ring-2 ring-white"
                          style={{ backgroundColor: nicheConfig.partyB.bg, color: nicheConfig.partyB.text }}
                        >
                          {React.createElement(nicheConfig.partyB.icon, { className: "w-6 h-6 text-[#0A997D]" })}
                        </span>
                        <span className="text-[11px] font-extrabold text-black/70">
                          {nicheConfig.partyB.label}
                        </span>
                      </div>

                      {/* Gliding Status Token */}
                      <span
                        aria-hidden="true"
                        className="live-coin absolute right-[50px] top-[14px] flex h-7 w-7 items-center justify-center rounded-full bg-[#F5B301] text-[11px] font-extrabold text-[#633806] shadow-md"
                      >
                        ✓
                      </span>
                    </div>

                    {/* Upfront Agreement Pill */}
                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#0A997D]/[0.08] px-3.5 py-2.5 border border-[#0A997D]/20">
                      <span className="flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#0A997D]">
                        <CheckCircle className="w-4 h-4 text-[#0A997D]" />
                        <span>{nicheConfig.agreementPill.left}</span>
                      </span>
                      <span className="text-[12px] font-bold text-black/55 font-mono">
                        {nicheConfig.agreementPill.right}
                      </span>
                    </div>

                    {/* Instant Call Button inside widget */}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="mt-3 flex items-center justify-center gap-2 h-11 w-full rounded-2xl bg-[#0A0A0D] hover:bg-[#1E293B] text-white text-[13px] font-extrabold transition shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0A997D]" />
                      <span>Connect Directly: {lead.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            QUICKFLEET DRAFTING / BLUEPRINT STRIP
            - Technical dashed hairline border frames (.qf-frame)
            - Monospace telemetry annotations
        ═══════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 py-6 max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nicheConfig.blueprintFrames.map((frame, idx) => (
              <div key={idx} className="qf-frame text-[#0C0730]">
                <span className="block font-mono text-[11px] font-bold tracking-wider text-[#0A997D] uppercase mb-1">
                  {frame.title}
                </span>
                <p className="text-[13.5px] text-[#0A0A0D]/80 leading-snug">
                  {frame.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            "THREE STEPS" BENTO GRID (use.live 01/02/03)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="px-4 sm:px-6 py-12 md:py-18 max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex rounded-full bg-[#0A997D]/10 px-3.5 py-1 text-[12px] font-extrabold text-[#0A997D]">
              {nicheConfig.stepsBadge}
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[38px] font-extrabold tracking-tight text-[#0C0730] leading-tight">
              {nicheConfig.stepsHeading}
            </h2>
            <p className="mt-2 text-[15px] text-[#0A0A0D]/60 font-medium">
              {nicheConfig.stepsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nicheConfig.steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="tactile-lift rounded-[28px] bg-white ring-1 ring-black/[0.07] shadow-[0_16px_40px_-28px_rgba(12,7,48,0.2)] p-2.5 flex flex-col justify-between"
                >
                  <div
                    className="h-[185px] rounded-[22px] p-4 flex flex-col justify-center items-center gap-3"
                    style={{ backgroundColor: `${step.bgColor}22` }}
                  >
                    <div className="rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5 flex items-center gap-3 w-full max-w-[215px]">
                      <span
                        className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: step.color }}
                      >
                        <StepIcon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[12px] font-extrabold text-[#0C0730]">{step.cardBadge}</div>
                        <div className="text-[11px] font-mono text-[#0A997D] truncate">{step.cardNote}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-[#0C0730] bg-white/70 px-3 py-1 rounded-full">
                      Step {step.num}
                    </span>
                  </div>
                  <div className="px-3 pb-3 pt-4">
                    <span className="text-[13px] font-extrabold text-black/35 font-mono">{step.num}</span>
                    <h3 className="mt-0.5 text-[18px] font-extrabold text-[#0C0730] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-black/60">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SERVICES / CAPABILITIES SECTION (use.live "MADE FOR" CARDS)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="services" className="px-4 sm:px-6 py-12 md:py-16 max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex rounded-full bg-[#0A997D]/10 px-3.5 py-1 text-[12px] font-extrabold text-[#0A997D]">
              {nicheConfig.capabilitiesBadge}
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[36px] font-extrabold tracking-tight text-[#0C0730] leading-tight">
              {nicheConfig.capabilitiesHeading}
            </h2>
            <p className="mt-2 text-[15px] text-[#0A0A0D]/60 font-medium">
              {nicheConfig.capabilitiesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nicheConfig.services.map((svc, i) => {
              const IconComp = svc.icon;
              return (
                <div
                  key={i}
                  className="tactile-lift rounded-[28px] bg-white p-5 sm:p-6 ring-1 ring-black/[0.07] shadow-[0_16px_40px_-28px_rgba(12,7,48,0.2)] flex items-start gap-4"
                >
                  <div className="w-13 h-13 rounded-[38%] bg-[#F4F2ED] text-[#0A997D] flex items-center justify-center shrink-0 shadow-sm ring-1 ring-black/5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#6FD9C1]/20 text-[#0A997D] text-[11px] font-extrabold font-mono">
                        {svc.tag}
                      </span>
                      <span className="text-[12px] font-extrabold text-[#0C0730] font-mono">
                        {svc.price}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[17px] font-extrabold text-[#0C0730] leading-snug">
                      {svc.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-black/60 leading-relaxed">
                      {svc.desc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between">
                      <a
                        href="#quote-form"
                        onClick={() => setBookingData((prev) => ({ ...prev, service: svc.title }))}
                        className="text-[13px] font-extrabold text-[#0A997D] hover:underline flex items-center gap-1"
                      >
                        <span>{nicheConfig.heroCta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${cleanPhone}`}
                        className="w-9 h-9 rounded-full bg-[#F4F2ED] hover:bg-[#0C0730] text-[#0C0730] hover:text-white flex items-center justify-center transition"
                        title={`Call regarding ${svc.title}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            QUICKFLEET RAIL PROCESS SECTION
            - Hairline rail line with active step indicator
        ═══════════════════════════════════════════════════════════════ */}
        <section id="process" className="px-4 sm:px-6 py-12 md:py-16 max-w-[1200px] mx-auto">
          <div className="rounded-[32px] bg-[#F4F2ED] p-6 sm:p-10 md:p-12 border border-black/5">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-[11px] font-bold text-[#0A997D] uppercase tracking-wider">
                ▸ {nicheConfig.standardBadge}
              </span>
              <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#0C0730] mt-2 leading-tight">
                {nicheConfig.standardHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {nicheConfig.standardItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveProcessTab(idx)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all ${
                    activeProcessTab === idx
                      ? "bg-white shadow-[0_10px_25px_-10px_rgba(12,7,48,0.15)] border-l-4 border-l-[#0A997D]"
                      : "bg-white/50 hover:bg-white"
                  }`}
                >
                  <span className="font-mono text-[12px] font-extrabold text-[#0A997D]">0{idx + 1}</span>
                  <h4 className="text-[15px] font-extrabold text-[#0C0730] mt-1">{item.title}</h4>
                  <p className="text-[12.5px] text-black/60 mt-1 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HIGH-CONTRAST AUDIT SECTION
            - Deep navy (#0C0730) high-contrast card
            - Proven speed difference between slow WordPress & Next.js
        ═══════════════════════════════════════════════════════════════ */}
        <section id="telemetry-audit" className="px-4 sm:px-6 py-12 md:py-20 max-w-[1240px] mx-auto">
          <div className="rounded-[36px] bg-[#0C0730] p-6 sm:p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#6FD9C1]/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[12px] font-extrabold text-[#6FD9C1]">
                  Speedcraft Studio Performance Audit
                </span>
                <h2 className="mt-3 text-[28px] sm:text-[42px] font-extrabold leading-[1.05] tracking-tight">
                  {nicheConfig.auditHeadline}
                </h2>
                <p className="mt-3 text-[15px] text-white/70 font-medium leading-relaxed">
                  {nicheConfig.auditSub}
                </p>

                <ul className="mt-6 space-y-3 text-[14px] font-medium text-white/80">
                  {nicheConfig.auditBenefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#6FD9C1]/20 flex items-center justify-center text-[#6FD9C1] shrink-0 font-bold">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Telemetry Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Slow Live Site */}
                <div className="rounded-2xl bg-white/[0.06] border border-red-500/30 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-red-400 uppercase">Live Website</span>
                    <span className="px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 text-[11px] font-mono font-bold border border-red-800">
                      {lead.mobilePageSpeed}/100
                    </span>
                  </div>
                  <div className="text-2xl font-black text-red-400 font-mono">
                    {lead.mobileLoadTimeSec}s
                  </div>
                  <p className="text-[11.5px] text-white/60">
                    High mobile bounce rate. Losing paid clicks to competitors.
                  </p>
                  <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-white/50">
                    Stack: {lead.cms}
                  </div>
                </div>

                {/* Sub-Second Rebuild */}
                <div className="rounded-2xl bg-white/[0.12] border border-[#6FD9C1]/50 p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#6FD9C1] uppercase">Speedcraft Prototype</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-[#6FD9C1] text-[11px] font-mono font-bold border border-emerald-700">
                      100/100
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#6FD9C1] font-mono">
                    {measuredSpeed}
                  </div>
                  <p className="text-[11.5px] text-white/80">
                    Instant sub-second render. Zero drop-off on mobile browsers.
                  </p>
                  <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-[#6FD9C1]">
                    Stack: Next.js + Edge Cache
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            REVIEWS SECTION (use.live VERIFIED SOCIAL PROOF)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="reviews" className="px-4 sm:px-6 py-12 md:py-16 max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex rounded-full bg-[#0A997D]/10 px-3.5 py-1 text-[12px] font-extrabold text-[#0A997D]">
              Verified Proof
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[36px] font-extrabold tracking-tight text-[#0C0730]">
              {nicheConfig.socialProofHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {nicheConfig.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="tactile-lift rounded-[28px] bg-white p-6 ring-1 ring-black/[0.07] shadow-[0_16px_40px_-28px_rgba(12,7,48,0.2)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F5B301]">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-[#F5B301] text-[#F5B301]" />
                    ))}
                  </div>
                  <p className="mt-3 text-[14px] text-[#0A0A0D]/80 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[12px]">
                  <span className="font-extrabold text-[#0C0730]">{t.name}</span>
                  <span className="font-mono text-black/50">{t.neighborhood}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            INTAKE / CONTACT FORM (use.live HIGH CONVERSION CARD)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="quote-form" className="px-4 sm:px-6 py-12 md:py-16 bg-[#F4F2ED]">
          <div className="max-w-xl mx-auto">
            <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/[0.08]">
              
              <div className="text-center pb-5 mb-5 border-b border-black/[0.06]">
                <span className="inline-block px-3 py-1 rounded-full bg-[#6FD9C1]/20 text-[#0A997D] text-[11px] font-extrabold font-mono mb-2">
                  {nicheConfig.formBadge}
                </span>
                <h3 className="text-[24px] font-extrabold text-[#0C0730] tracking-tight">
                  {nicheConfig.formTitle}
                </h3>
                <p className="text-[13px] text-black/60 mt-1">
                  {nicheConfig.formSub}
                </p>
              </div>

              {formIntercepted ? (
                <div className="p-6 rounded-2xl bg-[#6FD9C1]/20 border border-[#0A997D]/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-[38%] bg-[#0A997D] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-extrabold text-[#0C0730]">
                      {nicheConfig.formSuccessHeading}
                    </h4>
                    <p className="text-[13px] text-black/75 mt-1 leading-snug">
                      {nicheConfig.formSuccessDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setFormIntercepted(false)}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#0C0730] text-white font-extrabold text-[13px] hover:bg-[#22184A] transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Booking Form</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-extrabold text-[#0C0730] mb-1">
                      Required Service / Inquiry
                    </label>
                    <select
                      value={bookingData.service || nicheConfig.services[0].title}
                      onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                      className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                    >
                      {nicheConfig.services.map((s, idx) => (
                        <option key={idx} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-extrabold text-[#0C0730] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-extrabold text-[#0C0730] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile or Direct"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-extrabold text-[#0C0730] mb-1">
                      Location / Suburb
                    </label>
                    <input
                      type="text"
                      placeholder={nicheConfig.formLocationPlaceholder}
                      value={bookingData.suburb}
                      onChange={(e) => setBookingData({ ...bookingData, suburb: e.target.value })}
                      className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-extrabold text-[#0C0730] mb-1">
                      Timeline / Urgency
                    </label>
                    <select
                      value={bookingData.urgency}
                      onChange={(e) => setBookingData({ ...bookingData, urgency: e.target.value })}
                      className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                    >
                      {nicheConfig.formUrgencyOptions.map((opt, oIdx) => (
                        <option key={oIdx}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0D] hover:bg-[#22184A] text-white text-[15px] font-extrabold transition active:scale-[0.98] shadow-lg cursor-pointer"
                  >
                    {formLoading ? (
                      <RotateCcw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{nicheConfig.formSubmitLabel}</span>
                        <ArrowRight className="w-4 h-4 text-[#6FD9C1]" />
                      </>
                    )}
                  </button>

                  <p className="text-[11.5px] font-mono text-black/40 text-center">
                    Sandboxed demonstration · sub-second simulated submission
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER: CLEAN ARCHITECTURAL QUICKFLEET LAYOUT
        ═══════════════════════════════════════════════════════════════ */}
        <footer className="bg-white border-t border-black/[0.08] py-12 px-4 sm:px-6 text-[13px] text-black/60">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-extrabold text-[16px] text-[#0C0730]">{lead.company}</div>
              <p className="mt-0.5">{nicheConfig.footerDesc}</p>
              <p className="mt-1 font-mono text-[#0A997D] font-bold">
                {nicheConfig.footerPhoneLabel}{" "}
                <a href={`tel:${cleanPhone}`} className="underline hover:text-[#0C0730]">
                  {lead.phone}
                </a>
              </p>
            </div>

            <div className="flex items-center gap-6 font-medium">
              {["Terms of Service", "Licensing & Insurance", "Privacy Policy", "Sitemap"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => handleSandboxedLink(e, link)}
                  className="hover:text-[#0C0730] transition"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>

        {/* ═══════════════════════════════════════════════════════════════
            SPEEDCRAFT PERFORMANCE & HANDOVER FLOATING TRIGGER (FAB)
            - Replaces full-width bottom nav bar with a sleek floating pill
            - Displays real-time measured latency (0.24s) & PageSpeed 100/100
            - Clicking expands the engineering handover & prospect switch panel
        ═══════════════════════════════════════════════════════════════ */}
        <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
          {/* Expanded Handover Panel (Floating Card) */}
          {bannerExpanded && (
            <div className="toast-pop bg-[#0C0730] border border-[#6FD9C1]/35 p-5 text-white text-[13px] shadow-[0_24px_60px_rgba(12,7,48,0.7)] rounded-3xl max-w-[460px] sm:max-w-[580px] w-[calc(100vw-32px)] sm:w-auto animate-in slide-in-from-bottom-3 duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#6FD9C1] font-mono text-[11px] font-bold uppercase tracking-wider">
                        Speedcraft Studio
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#6FD9C1]/20 text-[#6FD9C1] border border-[#6FD9C1]/40">
                        {measuredSpeed} · 100/100
                      </span>
                    </div>
                    <h4 className="text-[15px] font-extrabold text-white mt-1">
                      Ready to Deploy on {lead.website.replace(/^https?:\/\//, "")}?
                    </h4>
                  </div>
                  <button
                    onClick={() => setBannerExpanded(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition cursor-pointer shrink-0"
                    title="Close Panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Prospect Switcher Button & Drawer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/60 uppercase">
                      Current Prospect: <strong className="text-[#6FD9C1] font-sans">{lead.company}</strong> ({lead.niche})
                    </span>
                    <button
                      onClick={() => setActiveLeadPicker(!activeLeadPicker)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#6FD9C1] text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>{activeLeadPicker ? "Hide List" : "Switch Prospect"}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${activeLeadPicker ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {activeLeadPicker && (
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2.5 max-h-56 overflow-y-auto">
                      {/* Search box for 900+ leads */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search 900+ leads by name, city, or niche..."
                          value={leadFilterQuery}
                          onChange={(e) => setLeadFilterQuery(e.target.value)}
                          className="w-full h-8 pl-8 pr-3 text-[11px] bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#6FD9C1] outline-none"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {filteredPresetLeads.map((pl) => (
                          <button
                            key={pl.slug}
                            onClick={() => {
                              setActiveLeadPicker(false);
                              router.push(`/preview/${pl.slug}`);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              slug === pl.slug
                                ? "bg-[#6FD9C1] text-[#0C0730]"
                                : "bg-white/10 hover:bg-white/20 text-white"
                            }`}
                          >
                            <span>{pl.name}</span>
                            <span className="text-[10px] opacity-75 font-mono">({pl.city})</span>
                            <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-black/30 font-mono text-[#6FD9C1]">
                              {pl.niche}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing / Claim Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold text-[#6FD9C1]">Managed Hosting</div>
                      <div className="text-[16px] font-black">{lead.currencySymbol}150 / mo</div>
                      <div className="text-[10px] text-white/60">Zero upfront, SSL included</div>
                    </div>
                    <a
                      href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(`Activate $150/mo Prototype for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI reviewed the sub-second prototype for ${lead.company} (${lead.website}).\n\nLet's deploy this on our domain.\n\nPhone: ${lead.phone}`)}`}
                      className="px-3.5 py-2 rounded-full bg-[#6FD9C1] hover:bg-[#5bc4ad] text-[#0C0730] font-extrabold text-[11.5px] shadow-sm transition shrink-0"
                    >
                      Claim $150/mo
                    </a>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold text-white/70">Full Code Buyout</div>
                      <div className="text-[16px] font-black">{lead.currencySymbol}1,200</div>
                      <div className="text-[10px] text-white/60">GitHub repo transfer</div>
                    </div>
                    <a
                      href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(`Code Buyout for ${lead.company}`)}&body=${encodeURIComponent(`Hi Faruk,\n\nI want to discuss the code buyout for ${lead.company} (${lead.website}).`)}`}
                      className="px-3.5 py-2 rounded-full bg-white text-[#0A0A0D] hover:bg-white/90 font-extrabold text-[11.5px] shadow-sm transition shrink-0"
                    >
                      Inquire Buyout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Trigger Pill (FAB) */}
          <button
            onClick={() => setBannerExpanded(!bannerExpanded)}
            className="group flex items-center gap-2 h-12 px-4 rounded-full bg-[#0C0730] text-white border border-[#6FD9C1]/50 shadow-[0_10px_30px_rgba(12,7,48,0.5),0_0_15px_rgba(111,217,193,0.25)] hover:border-[#6FD9C1] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            title="Speedcraft Audit & Engineering Handover"
          >
            <span className="w-6 h-6 rounded-full bg-[#6FD9C1]/20 flex items-center justify-center text-[#6FD9C1] group-hover:bg-[#6FD9C1]/30 transition">
              <Zap className="w-3.5 h-3.5 fill-[#6FD9C1]" />
            </span>
            <div className="flex items-center gap-1.5 font-bold text-[12px]">
              <span className="font-mono text-[#6FD9C1] tracking-tight">{measuredSpeed}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/90 font-mono text-[11px]">100/100</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FD9C1] animate-pulse" />
            <span className="hidden sm:inline text-[11px] font-extrabold text-[#6FD9C1] uppercase tracking-wider pl-0.5">
              Claim Code
            </span>
            <ChevronUp className={`w-3.5 h-3.5 text-white/60 group-hover:text-white transition-transform ${bannerExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </>
  );
}

export default function ClientPrototypePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0C0730] flex flex-col items-center justify-center text-white space-y-3 font-sans">
          <div className="w-8 h-8 border-2 border-[#6FD9C1] border-t-transparent rounded-full animate-spin" />
          <div className="tracking-widest uppercase text-white/60 text-[11px] font-mono">
            Loading Speedcraft Edge Prototype...
          </div>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
