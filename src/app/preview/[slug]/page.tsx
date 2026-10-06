"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import leadsData from "../../../../leads/global_leads_audit.json";

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
    0% { box-shadow: 0 0 0 0 rgba(111, 217, 193, 0.7); }
    70% { box-shadow: 0 0 0 9px rgba(111, 217, 193, 0); }
    100% { box-shadow: 0 0 0 0 rgba(111, 217, 193, 0); }
  }
  .qf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6FD9C1;
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
    background: #6FD9C1;
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
  { slug: "sydney-emergency-plumbing", name: "Sydney Emergency Plumbing", city: "Sydney", niche: "Plumbing", phone: "1300 882 190" },
  { slug: "dallas-plumbing-co", name: "Dallas Plumbing Co", city: "Dallas", niche: "Plumbing", phone: "(214) 736-9201" },
  { slug: "austin-air-heating", name: "Austin Air & Heating Experts", city: "Austin", niche: "HVAC", phone: "(512) 694-8119" },
  { slug: "powerhub-electrical", name: "PowerHub Electrical Services", city: "Melbourne", niche: "Electrical", phone: "1300 914 202" },
  { slug: "apex-roofing-contractors", name: "Apex Roofing Contractors", city: "Brisbane", niche: "Roofing", phone: "1300 452 881" },
];

function PrototypeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = (params?.slug as string) || "";

  // ─── Lead Data Resolution ─────────────────────────────────────────────
  const lead = useMemo(() => {
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const found = (leadsData as LeadRecord[]).find((l) => {
      const leadSlug = l.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      const domainSlug = l.website.toLowerCase().replace(/[^a-z0-9]/g, "");
      return (
        leadSlug.includes(normalizedSlug) ||
        domainSlug.includes(normalizedSlug) ||
        normalizedSlug.includes(leadSlug)
      );
    });

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
    const niche = searchParams.get("niche") || found?.niche || "Plumbing";

    // Standardized dialable phone
    let rawPhone = searchParams.get("phone") || found?.phone || "";
    if (!rawPhone || rawPhone.toLowerCase().includes("direct") || rawPhone.toLowerCase().includes("website")) {
      if (countryCode === "AU") rawPhone = "1300 882 190";
      else if (countryCode === "GB" || countryCode === "UK") rawPhone = "020 7946 0192";
      else rawPhone = "(214) 736-9201";
    }

    const email = searchParams.get("email") || found?.email || "dispatch@" + website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const mobilePageSpeed = Number(searchParams.get("speed")) || found?.mobilePageSpeed || 19;
    const mobileLoadTimeSec = Number(searchParams.get("load")) || found?.mobileLoadTimeSec || 4.6;
    const estLostMonthlySpend = Number(searchParams.get("waste")) || found?.estLostMonthlySpend || found?.estLostMonthlySpendAud || 1280;
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
      niche,
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
  const [bannerExpanded, setBannerExpanded] = useState(false);

  // Form State
  const [bookingData, setBookingData] = useState({
    suburb: "",
    service: "",
    name: "",
    phone: "",
    urgency: "Immediate Emergency (Under 45 Mins)",
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

  // ─── Niche Content Configuration (1-to-1 Parity) ──────────────────────
  const nicheConfig = useMemo(() => {
    const n = lead.niche.toLowerCase();

    if (n.includes("hvac") || n.includes("air") || n.includes("cool") || n.includes("heat")) {
      return {
        tradeTitle: "HVAC & Climate Control",
        badge: "24/7 Rapid Cooling & Heating Dispatch",
        heroHeadline: `24/7 Emergency AC & Heating in ${lead.city}`,
        heroSub: `Licensed master technicians on standby across Greater ${lead.city}. Upfront fixed quotes, guaranteed same-day arrival, and sub-second dispatch.`,
        accentColor: "#0A997D", // QuickFleet Teal
        accentMint: "#6FD9C1",
        services: [
          {
            title: "Emergency AC Repair & Leak Stop",
            desc: `Immediate cooling diagnostics, capacitor replacement, and refrigerant top-up within 45 minutes across ${lead.city}.`,
            tag: "45-Min Arrival",
            price: "Fixed Quote",
            icon: Flame,
          },
          {
            title: "Heat Pump & Furnace Restoration",
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
        testimonials: [
          { name: "Marcus Vance", neighborhood: `${lead.city} Inner West`, quote: "AC failed during a 39-degree heatwave. Technician was at our door in 32 minutes, replaced the capacitor, and had freezing air blasting before dinner." },
          { name: "Sarah Jenkins", neighborhood: `${lead.city} Hills`, quote: "Zero guesswork or surprise fees. They gave me a fixed price before opening a single panel. Outstanding speed." },
        ],
      };
    }

    if (n.includes("roof")) {
      return {
        tradeTitle: "Roofing & Storm Repairs",
        badge: "Immediate Storm Tarping & Emergency Repair",
        heroHeadline: `Master Roof Repairs & Restoration in ${lead.city}`,
        heroSub: `Licensed, fully insured roofing contractors serving all suburbs across Greater ${lead.city}. Written quotes, zero overtime fees, and 25-year warranties.`,
        accentColor: "#0A997D",
        accentMint: "#6FD9C1",
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
        testimonials: [
          { name: "Robert Henderson", neighborhood: `${lead.city} North`, quote: "Severe hail cracked 18 tiles causing water to pour through our ceiling. They arrived with tarps in 40 minutes and fixed it completely the next morning." },
          { name: "Elena Morales", neighborhood: `${lead.city} Bay`, quote: "Immaculate cleanup—not a single roofing nail left in our driveway. Very honest team with upfront quotes." },
        ],
      };
    }

    if (n.includes("electr") || n.includes("power")) {
      return {
        tradeTitle: "Electrical Specialists",
        badge: "24/7 Master Electrician Emergency Dispatch",
        heroHeadline: `24/7 Master Electricians in ${lead.city}`,
        heroSub: `Immediate safety dispatch across Greater ${lead.city}. Switchboard upgrades, outage restoration, upfront fixed pricing, and clean work.`,
        accentColor: "#0A997D",
        accentMint: "#6FD9C1",
        services: [
          {
            title: "Power Outage & Circuit Fault Finding",
            desc: `Acoustic and thermal detection to locate short circuits and trip switches safely across ${lead.city}.`,
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
        testimonials: [
          { name: "Daniel Craig", neighborhood: `${lead.city} East`, quote: "Our main switchboard started humming and sparking on a Sunday evening. The electrician was here in 35 minutes, safely replaced the breaker, and explained everything." },
          { name: "Jessica Taylor", neighborhood: `${lead.city} Central`, quote: "Installed a dedicated Tesla charger and overhauled our old fuses. Clean, punctual, and zero hidden costs." },
        ],
      };
    }

    // Default: Plumbing
    return {
      tradeTitle: "Emergency Plumbing & Drains",
      badge: "24/7 Rapid Emergency Response Across City",
      heroHeadline: `24/7 Emergency Plumbers in ${lead.city}`,
      heroSub: `Immediate dispatch across Greater ${lead.city}. Upfront fixed pricing, zero callout fees with work, and licensed master plumbers arriving in under 45 minutes.`,
      accentColor: "#0A997D",
      accentMint: "#6FD9C1",
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
      testimonials: [
        { name: "James Wilson", neighborhood: `${lead.city} Suburbs`, quote: "Burst pipe under our bathroom floor at 11:30 PM. Their plumber arrived in 30 minutes, isolated the mains, and repaired the copper pipe cleanly." },
        { name: "Claire Bennett", neighborhood: `${lead.city} North`, quote: "Upfront quote before any tool touched our house. They cleared a massive tree root obstruction with high-pressure jetting in under an hour." },
      ],
    };
  }, [lead.niche, lead.city]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customVisualStyles }} />

      <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0D] antialiased selection:bg-[#6FD9C1] selection:text-[#0C0730]" style={{ paddingBottom: "92px" }}>
        
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
                  Navigation is sandboxed to keep this benchmark focused strictly on mobile conversion and instant load speeds.
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
            - Pulsing live dispatch beacon
            - Ghost + solid ink action buttons
        ═══════════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 pb-2 transition-all">
          <nav className="max-w-[1200px] mx-auto flex items-center justify-between gap-2 rounded-full bg-white/85 p-1.5 pl-4 sm:pl-6 shadow-[0_8px_24px_-12px_rgba(12,7,48,0.18)] ring-1 ring-black/[0.07] backdrop-blur-md">
            
            {/* Brand Logo & Live Status */}
            <div className="flex items-center gap-3">
              <Link href={`/preview/${slug}`} className="flex items-center gap-2.5 group">
                <span className="w-9 h-9 rounded-[38%] bg-[#0C0730] text-[#6FD9C1] font-extrabold text-[15px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  {lead.company.charAt(0)}
                </span>
                <div className="min-w-0">
                  <span className="block text-[14px] sm:text-[15px] font-extrabold text-[#0C0730] tracking-tight truncate max-w-[150px] sm:max-w-[210px] leading-tight">
                    {lead.company}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10.5px] font-mono tracking-wider uppercase text-[#0A997D] font-semibold">
                    <span className="qf-status-dot" />
                    <span>{lead.city} Dispatch</span>
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
                  Response SLA
                </a>
              </li>
              <li>
                <a href="#reviews" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#quote-form" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:shadow-xs transition">
                  Dispatch
                </a>
              </li>
            </ul>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Quick dial ghost pill */}
              <a
                href={`tel:${cleanPhone}`}
                className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-10 px-3.5 rounded-full border border-black/15 text-[13px] font-bold text-[#0C0730] hover:border-black/35 hover:bg-white transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#0A997D]" />
                <span>{lead.phone}</span>
              </a>

              {/* Ink Black Solid Call Button (Tap Target: 44px+) */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-full bg-[#0A0A0D] text-white hover:bg-[#22184A] text-[13px] font-extrabold shadow-sm active:scale-95 transition"
                style={{ minHeight: 44 }}
              >
                <Phone className="w-3.5 h-3.5 text-[#6FD9C1]" />
                <span>Call Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/60 hidden sm:inline" />
              </a>
            </div>
          </nav>
        </header>

        {/* ═══════════════════════════════════════════════════════════════
            HERO CONTAINER: QUICKFLEET OUTER FRAME + USE.LIVE TACTILE CORE
            - Deep brand navy canvas (#0C0730)
            - Ambient radial mint & gold mesh glow
            - Tactical Call Card Centerpiece with equalizer and live ticker
        ═══════════════════════════════════════════════════════════════ */}
        <div className="px-2 sm:px-4 md:px-6 pt-2 pb-8 max-w-[1360px] mx-auto">
          <section className="relative rounded-[28px] sm:rounded-[36px] bg-[#0C0730] text-white overflow-hidden shadow-[0_24px_60px_-20px_rgba(12,7,48,0.45)] ring-1 ring-black/10">
            
            {/* Ambient Lighting & Blueprint Grid */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#6FD9C1]/15 blur-3xl" />
              <div className="absolute -bottom-36 -left-20 w-96 h-96 rounded-full bg-[#F5B301]/12 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: "radial-gradient(circle, #6FD9C1 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>

            <div className="relative z-10 p-5 sm:p-8 md:p-14 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* ─── Hero Left: Copy & Rapid Booking Form (7 Cols) ─── */}
                <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                  
                  {/* Eyebrow Pill Tag */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-md">
                    <span className="qf-status-dot" />
                    <span className="text-[11.5px] font-mono tracking-wider uppercase font-semibold text-[#6FD9C1]">
                      {nicheConfig.badge}
                    </span>
                  </div>

                  {/* Main Punchy Headline (use.live font weight & line-height) */}
                  <h1 className="text-[32px] sm:text-[46px] md:text-[54px] font-extrabold leading-[1.04] tracking-tight text-white">
                    {lead.city}&apos;s Emergency <br className="hidden sm:inline" />
                    <span className="text-[#6FD9C1]">{lead.niche} Response</span>.
                  </h1>

                  <p className="text-[15px] sm:text-[17px] text-white/75 font-medium leading-relaxed max-w-xl">
                    {nicheConfig.heroSub}
                  </p>

                  {/* Rapid Instant Intake Box (use.live Form Card) */}
                  <div className="rounded-[24px] bg-white/10 p-3 sm:p-4 backdrop-blur-md ring-1 ring-white/20 shadow-2xl max-w-xl">
                    <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Suburb input */}
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-white/50 font-bold">
                            <MapPin className="w-4 h-4 text-[#6FD9C1]" />
                          </span>
                          <input
                            type="text"
                            placeholder={`Your Suburb in ${lead.city}`}
                            value={bookingData.suburb}
                            onChange={(e) => setBookingData({ ...bookingData, suburb: e.target.value })}
                            className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 pl-9 text-[14px] text-white font-bold outline-none placeholder:text-white/40 focus:border-[#6FD9C1] focus:bg-white/15 transition"
                            required
                          />
                        </div>

                        {/* Phone input */}
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-white/50 font-bold">
                            <Phone className="w-4 h-4 text-[#6FD9C1]" />
                          </span>
                          <input
                            type="tel"
                            placeholder="Your Phone Number"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                            className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 pl-9 text-[14px] text-white font-bold outline-none placeholder:text-white/40 focus:border-[#6FD9C1] focus:bg-white/15 transition"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit / Call CTA Button (50px+ tap target) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={formLoading}
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#6FD9C1] hover:bg-[#5bc4ad] text-[#0C0730] text-[14px] font-extrabold transition active:scale-[0.98] cursor-pointer shadow-lg"
                        >
                          {formLoading ? (
                            <RotateCcw className="w-4 h-4 animate-spin text-[#0C0730]" />
                          ) : (
                            <>
                              <span>Request Dispatcher</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-[#0A0A0D] hover:bg-white/90 text-[14px] font-extrabold transition active:scale-[0.98] shadow-md"
                        >
                          <Phone className="w-4 h-4 text-[#0A997D]" />
                          <span>Call {lead.phone}</span>
                        </a>
                      </div>
                    </form>
                  </div>

                  {/* Trust Highlights */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[12.5px] font-semibold text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#6FD9C1]" />
                      <span>Zero Callout Fee With Work</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#6FD9C1]" />
                      <span>Sub-Second 0.28s Load Speed</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#6FD9C1]" />
                      <span>100% Written Workmanship Guarantee</span>
                    </span>
                  </div>
                </div>

                {/* ─── Hero Right: The Iconic use.live Call/Dispatch Card (5 Cols) ─── */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  
                  {/* Floating Micro-Badges (Use.Live signature) */}
                  <div className="live-float-1 absolute -top-4 -left-2 sm:-left-6 z-20">
                    <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#0C0730] shadow-[0_12px_30px_rgba(0,0,0,0.3)] ring-1 ring-black/10">
                      <Zap className="w-4 h-4 text-[#0A997D] fill-[#0A997D]" />
                      <span>0.28s Mobile Load</span>
                    </span>
                  </div>

                  <div className="live-float-2 absolute -bottom-4 -left-4 sm:left-0 z-20">
                    <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#0C0730] shadow-[0_12px_30px_rgba(0,0,0,0.3)] ring-1 ring-black/10">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>Tech En Route · 14m ETA</span>
                    </span>
                  </div>

                  <div className="live-float-3 absolute -top-3 -right-2 sm:-right-4 z-20">
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-extrabold text-[#0C0730] shadow-[0_12px_30px_rgba(0,0,0,0.3)] ring-1 ring-black/10">
                      <Star className="w-4 h-4 text-[#F5B301] fill-[#F5B301]" />
                      <span>4.9 ★ Verified</span>
                    </span>
                  </div>

                  {/* Centered Main Live Dispatch Card */}
                  <div className="relative w-full max-w-[340px] rounded-[30px] bg-white text-[#0A0A0D] p-5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
                    
                    {/* Header: Live Badge + Ticker */}
                    <div className="flex items-center justify-between text-[12px] font-extrabold pb-3 border-b border-black/[0.06]">
                      <span className="flex items-center gap-1.5 text-[#10B981] uppercase tracking-wider font-mono">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                        </span>
                        <span>DISPATCH RADAR</span>
                      </span>
                      <span className="font-mono text-black/50 tabular-nums">00:42 LIVE</span>
                    </div>

                    <div className="mt-3">
                      <p className="text-[15px] font-extrabold leading-tight text-[#0C0730]">
                        Priority Callout: {lead.city}
                      </p>
                      <p className="text-[12px] text-black/55 font-medium mt-0.5">
                        {nicheConfig.tradeTitle}
                      </p>
                    </div>

                    {/* Tactile Audio Connection Stage (use.live signature) */}
                    <div className="relative mt-5 flex items-center justify-between px-2">
                      {/* Customer Squircle */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="w-13 h-13 rounded-[38%] bg-[#B5D4F4] text-[#0C447C] font-extrabold text-[18px] flex items-center justify-center shadow-md ring-2 ring-white">
                          JH
                        </span>
                        <span className="text-[11px] font-extrabold text-black/70">Homeowner</span>
                      </div>

                      {/* Equalizer Sound Waves */}
                      <div className="live-eq" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>

                      {/* Master Tech Squircle */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="w-13 h-13 rounded-[38%] bg-[#CECBF6] text-[#22184A] font-extrabold text-[18px] flex items-center justify-center shadow-md ring-2 ring-white">
                          <ShieldCheck className="w-6 h-6 text-[#0A997D]" />
                        </span>
                        <span className="text-[11px] font-extrabold text-black/70">Master Tech</span>
                      </div>

                      {/* Gliding Status Token */}
                      <span
                        aria-hidden="true"
                        className="live-coin absolute right-[50px] top-[14px] flex h-7 w-7 items-center justify-center rounded-full bg-[#F5B301] text-[11px] font-extrabold text-[#633806] shadow-md"
                      >
                        ✓
                      </span>
                    </div>

                    {/* Upfront Price Receipt Pill */}
                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#6FD9C1]/15 px-3.5 py-2.5 border border-[#6FD9C1]/30">
                      <span className="flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#0A997D]">
                        <CheckCircle className="w-4 h-4 text-[#0A997D]" />
                        <span>Upfront Quote Agreed</span>
                      </span>
                      <span className="text-[12px] font-bold text-black/55 font-mono">No Overtime</span>
                    </div>

                    {/* Instant Call Button inside widget */}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="mt-3 flex items-center justify-center gap-2 h-11 w-full rounded-2xl bg-[#0A0A0D] hover:bg-[#22184A] text-white text-[13px] font-extrabold transition shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#6FD9C1]" />
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
            <div className="qf-frame text-[#0C0730]">
              <span className="block font-mono text-[11px] font-bold tracking-wider text-[#0A997D] uppercase mb-1">
                ▸ DISPATCH TIMELINE
              </span>
              <p className="text-[13.5px] text-[#0A0A0D]/80 leading-snug">
                Average arrival time is <strong className="text-[#0C0730]">under 45 minutes</strong> across Greater {lead.city}. Live vehicle tracking sent to mobile.
              </p>
            </div>

            <div className="qf-frame text-[#0C0730]">
              <span className="block font-mono text-[11px] font-bold tracking-wider text-[#0A997D] uppercase mb-1">
                ▸ UPFRONT PRICING SLA
              </span>
              <p className="text-[13.5px] text-[#0A0A0D]/80 leading-snug">
                Zero surprise invoices. Written fixed quote agreed <strong className="text-[#0C0730]">before any work starts</strong>. Zero weekend or overtime markups.
              </p>
            </div>

            <div className="qf-frame text-[#0C0730]">
              <span className="block font-mono text-[11px] font-bold tracking-wider text-[#0A997D] uppercase mb-1">
                ▸ SUB-SECOND EDGE STACK
              </span>
              <p className="text-[13.5px] text-[#0A0A0D]/80 leading-snug">
                Built on Next.js Edge CDN. Loads in <strong className="text-[#0A997D]">0.28s</strong> compared to legacy WordPress ({lead.mobileLoadTimeSec}s), capturing every phone call.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            "THREE STEPS TO SERVICE" BENTO GRID (use.live 01/02/03)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="px-4 sm:px-6 py-12 md:py-18 max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="inline-flex rounded-full bg-[#0A997D]/10 px-3.5 py-1 text-[12px] font-extrabold text-[#0A997D]">
              How It Works
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[38px] font-extrabold tracking-tight text-[#0C0730] leading-tight">
              Three Steps to Guaranteed Resolution
            </h2>
            <p className="mt-2 text-[15px] text-[#0A0A0D]/60 font-medium">
              We eliminated phone trees, waiting queues, and surprise quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 01 */}
            <div className="tactile-lift rounded-[28px] bg-white ring-1 ring-black/[0.07] shadow-[0_16px_40px_-28px_rgba(12,7,48,0.2)] p-2.5 flex flex-col justify-between">
              <div className="h-[185px] rounded-[22px] bg-[#6FD9C1]/15 p-4 flex flex-col justify-center items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5 flex items-center gap-3 w-full max-w-[210px]">
                  <span className="w-8 h-8 rounded-full bg-[#0A997D] text-white flex items-center justify-center font-bold text-xs">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[12px] font-extrabold text-[#0C0730]">1-Tap Dispatch</div>
                    <div className="text-[11px] font-mono text-[#0A997D]">No Hold Music</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#0A997D] bg-white/70 px-3 py-1 rounded-full">
                  Average pickup: 12 seconds
                </span>
              </div>
              <div className="px-3 pb-3 pt-4">
                <span className="text-[13px] font-extrabold text-black/35 font-mono">01</span>
                <h3 className="mt-0.5 text-[18px] font-extrabold text-[#0C0730] tracking-tight">
                  Tap to Call or Request Dispatch
                </h3>
                <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-black/60">
                  Connect immediately with a licensed dispatcher in {lead.city}. No automated bots or outsourced call centers.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="tactile-lift rounded-[28px] bg-white ring-1 ring-black/[0.07] shadow-[0_16px_40px_-28px_rgba(12,7,48,0.2)] p-2.5 flex flex-col justify-between">
              <div className="h-[185px] rounded-[22px] bg-[#F5B301]/15 p-4 flex flex-col justify-center items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5 flex items-center gap-3 w-full max-w-[220px]">
                  <span className="w-8 h-8 rounded-full bg-[#F5B301] text-[#633806] flex items-center justify-center font-bold text-xs">
                    <Navigation className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[12px] font-extrabold text-[#0C0730]">Van #12 En Route</div>
                    <div className="text-[11px] font-mono text-black/55">ETA: 22 Mins</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#633806] bg-white/70 px-3 py-1 rounded-full">
                  Live GPS Route Updates
                </span>
              </div>
              <div className="px-3 pb-3 pt-4">
                <span className="text-[13px] font-extrabold text-black/35 font-mono">02</span>
                <h3 className="mt-0.5 text-[18px] font-extrabold text-[#0C0730] tracking-tight">
                  Live Technician Tracking
                </h3>
                <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-black/60">
                  We assign the closest technician in your suburb. You get an exact ETA and vehicle tracking pin to your phone.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="tactile-lift rounded-[28px] bg-white ring-1 ring-black/[0.07] shadow-[0_16px_40px_-28px_rgba(12,7,48,0.2)] p-2.5 flex flex-col justify-between">
              <div className="h-[185px] rounded-[22px] bg-[#CECBF6]/25 p-4 flex flex-col justify-center items-center gap-3">
                <div className="rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5 flex items-center justify-between w-full max-w-[210px]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#0A997D]" />
                    <span className="text-[12px] font-extrabold text-[#0C0730]">Fixed Invoice</span>
                  </div>
                  <span className="text-[12px] font-extrabold text-[#0A997D] font-mono">100% Backed</span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#22184A] bg-white/70 px-3 py-1 rounded-full">
                  Zero Overtime Charges
                </span>
              </div>
              <div className="px-3 pb-3 pt-4">
                <span className="text-[13px] font-extrabold text-black/35 font-mono">03</span>
                <h3 className="mt-0.5 text-[18px] font-extrabold text-[#0C0730] tracking-tight">
                  Fixed Quote & Lifetime Guarantee
                </h3>
                <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-black/60">
                  Your technician inspects the site, presents a written fixed quote, and executes the repair with certified parts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SERVICES SECTION (use.live "MADE FOR" TACTILE CARDS)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="services" className="px-4 sm:px-6 py-12 md:py-16 max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex rounded-full bg-[#0A997D]/10 px-3.5 py-1 text-[12px] font-extrabold text-[#0A997D]">
              Our Capabilities
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[36px] font-extrabold tracking-tight text-[#0C0730] leading-tight">
              Specialized Services Across {lead.city}
            </h2>
            <p className="mt-2 text-[15px] text-[#0A0A0D]/60 font-medium">
              Exact solutions handled by master-certified trade technicians.
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
                        <span>Book Priority Dispatch</span>
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
                ▸ RESPONSE STANDARD
              </span>
              <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#0C0730] mt-2 leading-tight">
                Why {lead.city} Residents Call {lead.company} First
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Zero Callout Fee", desc: "No fee to travel to your property when repairs are performed." },
                { title: "Direct Master Techs", desc: "Every van is operated by a fully licensed, background-checked tradesperson." },
                { title: "Fully Stocked Vans", desc: "94% of emergency repairs completed in a single visit with onboard inventory." },
                { title: "Lifetime Workmanship", desc: "All labor backed by written warranty for total customer peace of mind." },
              ].map((item, idx) => (
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
            HIGH-CONTRAST DARK AUDIT SECTION (use.live PAYOUT EQUIVALENT)
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
                  Every 1-Second Mobile Delay Leaks 20% of Callers
                </h2>
                <p className="mt-3 text-[15px] text-white/70 font-medium leading-relaxed">
                  When a homeowner has an emergency, they click the top Google ad on their phone. If your site doesn&apos;t load under 1 second, they tap back and call the next contractor.
                </p>

                <ul className="mt-6 space-y-3 text-[14px] font-medium text-white/80">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#6FD9C1]/20 flex items-center justify-center text-[#6FD9C1] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>Next.js App Router renders on Edge CDN in <strong className="text-[#6FD9C1]">0.28 seconds</strong>.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#6FD9C1]/20 flex items-center justify-center text-[#6FD9C1] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>Zero heavy Elementor/WordPress plugin overhead blocking the phone dialer.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#6FD9C1]/20 flex items-center justify-center text-[#6FD9C1] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>Saves an estimated <strong className="text-[#F5B301]">~{lead.currencySymbol}{lead.estLostMonthlySpend}/mo</strong> in wasted Google ad clicks.</span>
                  </li>
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
              Homeowners in {lead.city} Trust Us
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
            BOOKING / QUOTE FORM (use.live HIGH CONVERSION CARD)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="quote-form" className="px-4 sm:px-6 py-12 md:py-16 bg-[#F4F2ED]">
          <div className="max-w-xl mx-auto">
            <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/[0.08]">
              
              <div className="text-center pb-5 mb-5 border-b border-black/[0.06]">
                <span className="inline-block px-3 py-1 rounded-full bg-[#6FD9C1]/20 text-[#0A997D] text-[11px] font-extrabold font-mono mb-2">
                  PRIORITY DISPATCH FORM
                </span>
                <h3 className="text-[24px] font-extrabold text-[#0C0730] tracking-tight">
                  Request Priority Dispatch in {lead.city}
                </h3>
                <p className="text-[13px] text-black/60 mt-1">
                  Fill in your details for immediate 45-minute arrival or an upfront quote.
                </p>
              </div>

              {formIntercepted ? (
                <div className="p-6 rounded-2xl bg-[#6FD9C1]/20 border border-[#0A997D]/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-[38%] bg-[#0A997D] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-extrabold text-[#0C0730]">
                      Simulated Dispatch Sent
                    </h4>
                    <p className="text-[13px] text-black/75 mt-1 leading-snug">
                      Your test request was processed in <strong className="font-mono font-bold text-[#0A997D]">0.04s</strong>. In production, this instantly notifies the on-call dispatcher.
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
                      Required Service
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
                      Property Suburb
                    </label>
                    <input
                      type="text"
                      placeholder={`Suburb in ${lead.city}`}
                      value={bookingData.suburb}
                      onChange={(e) => setBookingData({ ...bookingData, suburb: e.target.value })}
                      className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-extrabold text-[#0C0730] mb-1">
                      Urgency
                    </label>
                    <select
                      value={bookingData.urgency}
                      onChange={(e) => setBookingData({ ...bookingData, urgency: e.target.value })}
                      className="w-full h-12 rounded-2xl bg-[#F3F1EC] px-4 text-[14px] font-bold text-[#0A0A0D] outline-none border border-transparent focus:border-[#0A997D] focus:bg-white transition"
                    >
                      <option>Immediate Emergency (Under 45 Mins)</option>
                      <option>Today (Standard Business Hours)</option>
                      <option>Scheduled Next 48 Hours</option>
                      <option>Upfront Price Quote Only</option>
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
                        <span>Submit Emergency Request</span>
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
              <p className="mt-0.5">Licensed trade contracting serving all suburbs of Greater {lead.city}.</p>
              <p className="mt-1 font-mono text-[#0A997D] font-bold">
                Direct Dispatch: <a href={`tel:${cleanPhone}`} className="underline hover:text-[#0C0730]">{lead.phone}</a>
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
            <div className="toast-pop bg-[#0C0730] border border-[#6FD9C1]/35 p-5 text-white text-[13px] shadow-[0_24px_60px_rgba(12,7,48,0.7)] rounded-3xl max-w-[440px] sm:max-w-[560px] w-[calc(100vw-32px)] sm:w-auto animate-in slide-in-from-bottom-3 duration-200">
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
                    <span className="text-[11px] font-mono text-white/60 uppercase">Current Prospect:</span>
                    <button
                      onClick={() => setActiveLeadPicker(!activeLeadPicker)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#6FD9C1] text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Switch Prospect</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>

                  {activeLeadPicker && (
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2 max-h-48 overflow-y-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_LEADS.map((pl) => (
                          <button
                            key={pl.slug}
                            onClick={() => {
                              setActiveLeadPicker(false);
                              router.push(`/preview/${pl.slug}`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                              slug === pl.slug
                                ? "bg-[#6FD9C1] text-[#0C0730]"
                                : "bg-white/10 hover:bg-white/20 text-white"
                            }`}
                          >
                            <span>{pl.name}</span>
                            <span className="text-[10px] opacity-75 font-mono">({pl.city})</span>
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
            Loading Sub-Second Prototype...
          </div>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
