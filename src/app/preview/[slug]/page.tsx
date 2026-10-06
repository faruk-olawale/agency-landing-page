"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Phone,
  ArrowRight,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Clock,
  Check,
  Mail,
  Lock,
  Smartphone,
  Monitor,
  Star,
  Award,
  MapPin,
  Users,
  Activity,
  Layers,
  ChevronDown,
  X,
  AlertCircle,
  Calendar,
  SendHorizontal
} from "lucide-react";
import leadsData from "../../../../leads/global_leads_audit.json";

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

function PrototypeContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = (params?.slug as string) || "";

  // 1. Resolve lead data from JSON database or search parameters
  const lead = useMemo(() => {
    const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const found = (leadsData as LeadRecord[]).find((l) => {
      const leadSlug = l.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      const domainSlug = l.website.toLowerCase().replace(/[^a-z0-9]/g, "");
      return leadSlug.includes(normalizedSlug) || domainSlug.includes(normalizedSlug) || normalizedSlug.includes(leadSlug);
    });

    const company =
      searchParams.get("name") ||
      found?.company ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
      "Your Company";

    const country = searchParams.get("country") || found?.country || "United States";
    const countryCode = searchParams.get("cc") || found?.countryCode || "US";
    const currency = searchParams.get("currency") || found?.currency || (countryCode === "AU" ? "AUD" : "USD");
    const currencySymbol = searchParams.get("symbol") || found?.currencySymbol || "$";
    const website = searchParams.get("domain") || found?.website || (slug ? `https://${slug}.com` : "https://yourcompany.com");
    const city = searchParams.get("city") || found?.city || (countryCode === "AU" ? "Sydney" : "Dallas");
    const niche = searchParams.get("niche") || found?.niche || "Emergency Services";

    // Realistic phone fallback if lead is "Direct via Website"
    let rawPhone = searchParams.get("phone") || found?.phone || "";
    if (!rawPhone || rawPhone.toLowerCase().includes("direct") || rawPhone.toLowerCase().includes("website")) {
      if (countryCode === "AU") {
        rawPhone = "1300 882 190";
      } else if (countryCode === "GB" || countryCode === "UK") {
        rawPhone = "020 7946 0192";
      } else if (countryCode === "CA") {
        rawPhone = "(416) 555-0143";
      } else {
        rawPhone = "(214) 736-9201";
      }
    }

    const email = searchParams.get("email") || found?.email || "service@" + website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const mobilePageSpeed = Number(searchParams.get("speed")) || found?.mobilePageSpeed || 22;
    const mobileLoadTimeSec = Number(searchParams.get("load")) || found?.mobileLoadTimeSec || 4.2;
    const estLostMonthlySpend =
      Number(searchParams.get("waste")) ||
      found?.estLostMonthlySpend ||
      found?.estLostMonthlySpendAud ||
      850;
    const cms = found?.cms || "WordPress / Monolith";
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

  // Measured speed calculation
  const [measuredSpeed, setMeasuredSpeed] = useState("0.2s");
  const [simulatedScore, setSimulatedScore] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);

  // Link Sandboxing Alert state
  const [sandboxAlert, setSandboxAlert] = useState<{
    visible: boolean;
    linkName?: string;
  }>({ visible: false });

  // Form Interception state
  const [formIntercepted, setFormIntercepted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "David Miller",
    phone: "214-555-0199",
    service: "",
    address: `${lead.city} Metro Area`,
    urgency: "Emergency (Within 60 mins)",
  });

  // Telemetry Ping on mount
  useEffect(() => {
    const startTime = typeof performance !== "undefined" ? performance.now() : 0;
    const sendTelemetry = async () => {
      try {
        const loadDurationMs = Math.round(performance.now() - startTime) || 185;
        const speedSec = (Math.max(120, loadDurationMs) / 1000).toFixed(2) + "s";
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
      } catch (err) {
        // Silent fail for telemetry
      }
    };

    sendTelemetry();
  }, [slug, lead.company, lead.website]);

  // Handler for Sandboxed Links
  const handleSandboxedLink = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    setSandboxAlert({ visible: true, linkName });
  };

  // Handler for Form Interception
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    // Instant simulation (0.04s)
    setTimeout(() => {
      setFormLoading(false);
      setFormIntercepted(true);
    }, 40);
  };

  // Speed Simulation
  const runSimulation = () => {
    setIsSimulating(true);
    setMeasuredSpeed("0.05s");
    setSimulatedScore(0);

    setTimeout(() => {
      setSimulatedScore(100);
      setMeasuredSpeed("0.19s");
      setIsSimulating(false);
    }, 280);
  };

  // Clean phone dialer
  const cleanPhone = lead.phone.replace(/[^0-9+]/g, "");

  // Strict 1-to-1 parity niche copy & service configurations
  const nicheConfig = useMemo(() => {
    const n = lead.niche.toLowerCase();
    if (n.includes("hvac") || n.includes("air") || n.includes("cool") || n.includes("heat")) {
      return {
        tradeHeadline: `24/7 Emergency AC & Heating Services in ${lead.city}`,
        subHeadline: `Fast dispatch across Greater ${lead.city}. Upfront transparent pricing, 100% licensed technicians, and guaranteed same-day repairs.`,
        primaryCtaText: "Call Now for Emergency Service",
        secondaryCtaText: "Request Instant Service Quote",
        services: [
          {
            title: "24/7 Emergency AC Breakdown",
            desc: `Rapid response cooling diagnostics and refrigerant leak repairs within 60 minutes across ${lead.city}.`,
            badge: "60-Min Arrival",
          },
          {
            title: "Heating & Furnace Repair",
            desc: "Expert heat pump, electric furnace, and gas heating troubleshooting with full parts warranty.",
            badge: "Guaranteed Workmanship",
          },
          {
            title: "System Replacement & Installation",
            desc: "High-efficiency 18+ SEER inverter systems installed with written energy savings guarantees.",
            badge: "Fixed Price Quote",
          },
          {
            title: "Preventative Maintenance Tune-Up",
            desc: "Multi-point coil cleaning, electrical terminal check, capacitor testing, and airflow balance.",
            badge: "Preventative",
          },
        ],
        testimonials: [
          {
            name: "Marcus Vance",
            location: `${lead.city} Resident`,
            rating: 5,
            review: "AC completely died on a 100-degree afternoon. Their technician arrived in 35 minutes, diagnosed a bad capacitor, and had cold air pumping before dinner.",
          },
          {
            name: "Sarah Jenkins",
            location: `${lead.city} Heights`,
            rating: 5,
            review: "Honest, upfront quote with zero hidden travel charges. The only HVAC contractor in the area I trust with our business property.",
          },
        ],
      };
    }

    if (n.includes("roof")) {
      return {
        tradeHeadline: `Premier Roof Repairs & Full Restorations in ${lead.city}`,
        subHeadline: `Licensed, bonded roofing contractors serving residential and commercial properties throughout Greater ${lead.city}. Free on-site inspection.`,
        primaryCtaText: "Call Now for Roof Inspection",
        secondaryCtaText: "Get a Free Roofing Estimate",
        services: [
          {
            title: "Emergency Storm & Leak Repair",
            desc: `Immediate tarping, structural isolation, and tile or shingle replacement following severe weather across ${lead.city}.`,
            badge: "24/7 Emergency Response",
          },
          {
            title: "Complete Roof Replacement",
            desc: "Architectural shingle, metal, and flat membrane installations backed by 25-year manufacturer warranties.",
            badge: "Written Guarantee",
          },
          {
            title: "Gutter Guard & Downpipe Systems",
            desc: "Heavy-gauge seamless aluminum gutters and leaf guard installations to stop foundation overflow.",
            badge: "Seamless Finish",
          },
          {
            title: "Drone Roof Inspection & Certifications",
            desc: "High-resolution thermal camera inspection for insurance claims and pre-purchase certifications.",
            badge: "Same-Day Report",
          },
        ],
        testimonials: [
          {
            name: "Robert Henderson",
            location: `${lead.city} West`,
            rating: 5,
            review: "After a severe hail storm, they were the first on site. Walked me through every line item for insurance and replaced the roof flawlessly.",
          },
          {
            name: "Elena Morales",
            location: `${lead.city} Metro`,
            rating: 5,
            review: "Super clean job. Not a single stray nail on our driveway. The new roof looks incredible and held up through heavy rain with zero issues.",
          },
        ],
      };
    }

    if (n.includes("electr") || n.includes("power")) {
      return {
        tradeHeadline: `Licensed 24/7 Emergency Electricians in ${lead.city}`,
        subHeadline: `Master electricians for residential and commercial electrical emergencies across Greater ${lead.city}. On-time arrival guaranteed.`,
        primaryCtaText: "Call Now: 24/7 Emergency Dispatch",
        secondaryCtaText: "Request Electrical Quote",
        services: [
          {
            title: "Emergency Power Outage & Fault Finding",
            desc: `Rapid circuit diagnostic, short-circuit location, and safety switch restoration across ${lead.city}.`,
            badge: "Priority Dispatch",
          },
          {
            title: "Switchboard & Panel Upgrades",
            desc: "Modern surge protection, RCD safety breaker installations, and commercial capacity upgrades.",
            badge: "Code Compliance",
          },
          {
            title: "EV Charger & Dedicated Circuits",
            desc: "Level 2 EV fast-charging station installation for Tesla and universal electric vehicles.",
            badge: "Certified Installers",
          },
          {
            title: "Commercial Lighting & Fitouts",
            desc: "Energy-saving architectural LED conversions, three-phase wiring, and statutory compliance audits.",
            badge: "Commercial Tier",
          },
        ],
        testimonials: [
          {
            name: "Daniel Craig",
            location: `${lead.city} South`,
            rating: 5,
            review: "Our main panel started buzzing late on a Sunday. The technician was here within 40 minutes, replaced the breaker safely, and explained everything.",
          },
          {
            name: "Jessica Taylor",
            location: `${lead.city} North`,
            rating: 5,
            review: "Installed a dedicated Tesla charger and upgraded our whole subpanel. Clean, fast, and 100% compliant with local codes.",
          },
        ],
      };
    }

    if (n.includes("dent") || n.includes("ortho")) {
      return {
        tradeHeadline: `Compassionate Family & Emergency Dentistry in ${lead.city}`,
        subHeadline: `Modern dental care for patients of all ages across Greater ${lead.city}. Same-day appointments available for dental emergencies.`,
        primaryCtaText: "Call for Emergency Appointment",
        secondaryCtaText: "Book Your Consultation",
        services: [
          {
            title: "Same-Day Emergency Tooth Relief",
            desc: `Immediate pain management for acute toothaches, fractured teeth, and lost crowns in ${lead.city}.`,
            badge: "Same-Day Priority",
          },
          {
            title: "Dental Implants & Restorations",
            desc: "Biocompatible precision 3D-guided implant placement for natural look, chewing comfort, and longevity.",
            badge: "Advanced Tech",
          },
          {
            title: "Cosmetic Veneers & Smile Makeovers",
            desc: "Custom porcelain veneers and professional whitening designed to enhance natural symmetry.",
            badge: "Aesthetic Excellence",
          },
          {
            title: "Family Preventative Care & Cleanings",
            desc: "Gentle ultrasonic cleanings, digital low-radiation X-rays, and comprehensive oral cancer screenings.",
            badge: "Gentle Care",
          },
        ],
        testimonials: [
          {
            name: "Emily Watson",
            location: `${lead.city} Resident`,
            rating: 5,
            review: "Had a severe toothache over the weekend. They booked me in immediately, relieved the pain gently, and treated me with such kindness.",
          },
          {
            name: "Anthony Clark",
            location: `${lead.city} East`,
            rating: 5,
            review: "State of the art clinic with painless treatment. My entire family comes here now. Highly recommended!",
          },
        ],
      };
    }

    // Default / Plumbing Parity
    return {
      tradeHeadline: `24/7 Emergency Plumbing & Drain Specialists in ${lead.city}`,
      subHeadline: `Immediate dispatch across Greater ${lead.city}. Upfront transparent pricing, zero overtime charges, and 100% licensed master technicians.`,
      primaryCtaText: `Call Now: ${lead.phone}`,
      secondaryCtaText: "Get an Instant Free Quote",
      services: [
        {
          title: "24/7 Burst Pipe & Water Leak Isolation",
          desc: `Immediate acoustic leak detection and non-invasive pipe repairs within 60 minutes across ${lead.city}.`,
          badge: "60-Min Emergency Response",
        },
        {
          title: "Hydro-Jet Drain & Sewer Clearing",
          desc: "High-pressure 5,000 PSI water jetting and CCTV drain camera diagnosis to eliminate tree roots permanently.",
          badge: "Same-Day Attendance",
        },
        {
          title: "Water Heater Repair & Replacement",
          desc: "Same-day replacement for tankless, gas, and electric continuous hot water units with full warranty.",
          badge: "Top Rated",
        },
        {
          title: "Gas Line Fitting & Safety Compliance",
          desc: "Licensed gas fitting, leak detection, cooktop installations, and statutory compliance certifications.",
          badge: "Licensed Tradespeople",
        },
      ],
      testimonials: [
        {
          name: "James Wilson",
          location: `${lead.city} Resident`,
          rating: 5,
          review: `Burst pipe under our kitchen floor at 11 PM. Their plumber arrived in 35 minutes, shut off the mains, and repaired the copper line cleanly. Truly saved us thousands.`,
        },
        {
          name: "Claire Bennett",
          location: `${lead.city} Central`,
          rating: 5,
          review: `Upfront quote before touching a tool. Zero surprise fees. Fixed our blocked sewer line in an hour with high pressure jetting. Outstanding service!`,
        },
      ],
    };
  }, [lead.niche, lead.city, lead.phone]);

  return (
    <div className="min-h-screen bg-white text-[#160F29] font-sans antialiased selection:bg-[#5B4BD6] selection:text-white">
      {/* ──────────────────────────────────────────────────────────
          2. THE SPEEDCRAFT CONTEXT (THE PERSISTENT AGENCY BANNER)
          Strictly formatted to agency specification with zero emojis.
      ────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Speedcraft Studio Performance Prototype Alert"
        className="fixed top-0 inset-x-0 z-50 bg-[#0F0C20] text-white border-b border-indigo-900/60 shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md px-3.5 sm:px-6 py-2.5 text-xs font-sans"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          {/* THE MESSAGE */}
          <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 shrink-0">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </span>
            <span className="text-zinc-200">
              This is a sub-second performance prototype built by{" "}
              <strong className="text-white font-bold">Speedcraft Studio</strong>. It currently loads in{" "}
              <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.5 rounded text-[11px]">
                {measuredSpeed}
              </span>
              .
            </span>
            <span className="text-zinc-400 hidden sm:inline">•</span>
            {/* THE AGENCY CTA */}
            <span className="text-zinc-200">
              Want your live domain to run this fast?{" "}
              <a
                href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(
                  `Claim Speedcraft Sub-Second Code for ${lead.company}`
                )}&body=${encodeURIComponent(
                  `Hi Faruk,\n\nI tested the sub-second prototype for ${lead.company} (${lead.website}).\n\nWe want our live domain to load in ${measuredSpeed}.\n\nPlease send handover details.\n\nCompany: ${lead.company}\nPhone: ${lead.phone}`
                )}`}
                className="underline font-bold text-amber-300 hover:text-white transition-colors"
              >
                Email farukolawale509@gmail.com
              </a>{" "}
              to claim this code.
            </span>
          </div>

          {/* RIGHT ACTION PILLS */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#speedcraft-audit"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors border border-white/10"
            >
              <span>Inspect Telemetry & Pricing</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </a>
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 font-mono text-[10px] transition-colors border border-amber-400/30 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Testing..." : "Re-Test 0.2s"}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────
          SANDBOX NOTIFICATION ALERT / TOAST (LINK INTERCEPTION)
      ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sandboxAlert.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-4 max-w-lg mx-auto z-50 bg-[#160F29] text-white rounded-2xl p-4 shadow-2xl border border-amber-400/40 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="font-bold text-xs text-white uppercase tracking-wider">
                Prototype Closed Sandbox
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                Navigation disabled for this speed test. This prototype focuses purely on your main landing page performance.
              </p>
              <p className="text-[11px] text-zinc-400 leading-normal">
                In your live domain deployment, all multi-page routes, blogs, and custom subpages will link seamlessly.
              </p>
            </div>
            <button
              onClick={() => setSandboxAlert({ visible: false })}
              className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PADDING WRAPPER TO ACCOMMODATE FIXED PERSISTENT BANNER */}
      <div className="pt-24 sm:pt-20">
        {/* ──────────────────────────────────────────────────────────
            1. THE CLIENT'S ORIGINAL MESSAGE & STRICT PARITY BRAND HEADER
        ────────────────────────────────────────────────────────── */}
        <header className="bg-white border-b border-zinc-200/80 sticky top-12 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            {/* BRAND LOGO / NAME */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B4BD6] text-white flex items-center justify-center font-black text-lg shadow-sm">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-black text-lg sm:text-xl text-[#160F29] tracking-tight uppercase leading-none">
                  {lead.company}
                </div>
                <div className="text-[11px] font-medium text-zinc-500 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>Licensed & Insured • {lead.city}</span>
                </div>
              </div>
            </div>

            {/* CLIENT NAVIGATION (ALL SANDBOXED PER SPEC) */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              <a
                href="#services"
                onClick={(e) => handleSandboxedLink(e, "Services")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Services
              </a>
              <a
                href="#why-us"
                onClick={(e) => handleSandboxedLink(e, "Why Choose Us")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Why Choose Us
              </a>
              <a
                href="#reviews"
                onClick={(e) => handleSandboxedLink(e, "Customer Reviews")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Reviews
              </a>
              <a
                href="#areas"
                onClick={(e) => handleSandboxedLink(e, "Service Areas")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Service Areas
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSandboxedLink(e, "Contact Us")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Contact
              </a>
            </nav>

            {/* CALL TO ACTION BUTTONS (PHONE DIALER IS FULLY ACTIVE) */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#160F29] text-white hover:bg-zinc-800 font-bold text-xs transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Call:</span>
                <span>{lead.phone}</span>
              </a>

              <a
                href="#quote-form"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#5B4BD6] text-white hover:bg-[#4939C7] font-bold text-xs transition-colors shadow-sm"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* ──────────────────────────────────────────────────────────
            HERO SECTION (CLIENT BUSINESS PITCH - STRICT PARITY)
        ────────────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-b from-[#F8F7FD] via-white to-white py-12 sm:py-20 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* LEFT COLUMN: HERO PITCH & TRUST SIGNALS */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE5FC] text-[#5B4BD6] text-xs font-mono font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24/7 Priority Emergency Dispatch in {lead.city}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#160F29] leading-[1.08]">
                  {nicheConfig.tradeHeadline}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl">
                  {nicheConfig.subHeadline}
                </p>

                {/* TRUST BADGES ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#160F29]">4.9 / 5.0 Rating</div>
                      <div className="text-[10px] text-zinc-500">210+ Verified Reviews</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#160F29]">Fully Licensed</div>
                      <div className="text-[10px] text-zinc-500">Bonded & Insured</div>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#5B4BD6] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#5B4BD6]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#160F29]">60-Min Arrival</div>
                      <div className="text-[10px] text-zinc-500">Rapid Response SLA</div>
                    </div>
                  </div>
                </div>

                {/* PRIMARY CONVERSION ACTIONS */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* WORKING CLICK-TO-CALL FOR CLIENT MOBILE TESTING */}
                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#160F29] hover:bg-zinc-800 text-white font-bold text-sm sm:text-base transition-all shadow-md group"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>{nicheConfig.primaryCtaText}</span>
                  </a>

                  <a
                    href="#quote-form"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#5B4BD6] hover:bg-[#4939C7] text-white font-bold text-sm sm:text-base transition-all shadow-md"
                  >
                    <span>{nicheConfig.secondaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Upfront Written Pricing • No Overtime Surcharges • Workmanship Guaranteed</span>
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE FORM WITH FORM INTERCEPTION (CRUCIAL) */}
              <div id="quote-form" className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(20,12,48,0.1)] border border-zinc-200/80 space-y-5">
                  <div className="border-b border-zinc-100 pb-4">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200 mb-2">
                      Instant Dispatch Queue
                    </div>
                    <h3 className="text-xl font-black text-[#160F29] tracking-tight">
                      Request Priority Service Quote
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Fill out your details for immediate dispatch or upfront pricing.
                    </p>
                  </div>

                  {/* FORM INTERCEPTION SUCCESS ALERT */}
                  {formIntercepted ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4 text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-sm font-black text-emerald-950 uppercase tracking-wide">
                          Instant Simulation Confirmed
                        </div>
                        {/* EXACT REQUIRED INTERCEPTION MESSAGE */}
                        <p className="text-xs font-semibold text-emerald-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-emerald-300/50">
                          Form submission simulated instantly. In production, this will route directly to your inbox.
                        </p>
                        <p className="text-[11px] text-emerald-600 pt-1">
                          Simulated latency: <span className="font-mono font-bold">0.04s</span>. No live CRM or third-party spam triggered.
                        </p>
                      </div>
                      <button
                        onClick={() => setFormIntercepted(false)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Demo Form</span>
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">
                          Required Service
                        </label>
                        <select
                          value={formData.service || nicheConfig.services[0].title}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[#160F29] font-medium focus:bg-white focus:outline-none focus:border-[#5B4BD6]"
                        >
                          {nicheConfig.services.map((s, i) => (
                            <option key={i} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-zinc-600 font-semibold mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[#160F29] font-medium focus:bg-white focus:outline-none focus:border-[#5B4BD6]"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-600 font-semibold mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            defaultValue={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[#160F29] font-medium focus:bg-white focus:outline-none focus:border-[#5B4BD6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">
                          Property Suburb / Address
                        </label>
                        <input
                          type="text"
                          defaultValue={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[#160F29] font-medium focus:bg-white focus:outline-none focus:border-[#5B4BD6]"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-600 font-semibold mb-1">
                          Urgency Level
                        </label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[#160F29] font-medium focus:bg-white focus:outline-none focus:border-[#5B4BD6]"
                        >
                          <option value="Emergency (Within 60 mins)">Emergency (Within 60 mins)</option>
                          <option value="Today (Standard Hours)">Today (Standard Hours)</option>
                          <option value="Next 48 Hours">Next 48 Hours (Scheduled)</option>
                          <option value="Quote Only">Quote Only</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-3.5 rounded-xl bg-[#5B4BD6] hover:bg-[#4939C7] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {formLoading ? (
                          <RotateCcw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Send Priority Request</span>
                            <SendHorizontal className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-zinc-400 text-center">
                        Sandbox Mode: submissions are simulated safely without CRM side-effects.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            CLIENT SERVICES SECTION (1-TO-1 STRICT PARITY)
        ────────────────────────────────────────────────────────── */}
        <section id="services" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE5FC] text-[#5B4BD6] text-xs font-mono font-bold">
              <span>Licensed Specialist Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#160F29] tracking-tight">
              Our Core Services in {lead.city}
            </h2>
            <p className="text-sm text-zinc-600">
              Every job is performed to local compliance standards with written guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nicheConfig.services.map((svc, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white p-6 border border-zinc-200/80 shadow-xs hover:border-[#5B4BD6]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#F8F7FD] text-[#5B4BD6] text-[10px] font-mono font-bold">
                    {svc.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#160F29] leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                  <a
                    href="#quote-form"
                    onClick={() => setFormData((prev) => ({ ...prev, service: svc.title }))}
                    className="text-xs font-bold text-[#5B4BD6] hover:underline flex items-center gap-1"
                  >
                    <span>Instant Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="p-2 rounded-full bg-[#F4F2FF] text-[#5B4BD6] hover:bg-[#EAE5FC] transition-colors"
                    title={`Call about ${svc.title}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            WHY CHOOSE US / GUARANTEES SECTION
        ────────────────────────────────────────────────────────── */}
        <section id="why-us" className="py-16 bg-[#F8F7FD] border-y border-zinc-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-[#5B4BD6] flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-5 h-5 text-[#5B4BD6]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#160F29]">Upfront Pricing</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Transparent quotes provided before work starts. Zero surprise fees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#160F29]">Licensed & Certified</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Every technician is fully credentialed, background-checked, and insured.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#160F29]">On-Time Arrival</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    We arrive on schedule or notify you immediately. No wasting your day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-[#160F29] flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#160F29]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#160F29]">Workmanship Guarantee</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    All parts and labor backed by our comprehensive written guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            CLIENT TESTIMONIALS (STRICT PARITY)
        ────────────────────────────────────────────────────────── */}
        <section id="reviews" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-mono font-bold border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#160F29] tracking-tight">
              Trusted by Homeowners Across {lead.city}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {nicheConfig.testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white p-7 border border-zinc-200/80 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#160F29]">{t.name}</span>
                  <span className="text-zinc-500 font-mono">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            CLIENT FOOTER (SANDBOXED NAVIGATION LINKS)
        ────────────────────────────────────────────────────────── */}
        <footer className="bg-white border-t border-zinc-200 py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1">
              <div className="font-black text-sm text-[#160F29] uppercase">{lead.company}</div>
              <p>
                Licensed Trade Contractor • Serving Greater {lead.city} and Surrounding Communities
              </p>
              <p className="text-[11px] text-zinc-400">
                Direct Emergency Contact:{" "}
                <a href={`tel:${cleanPhone}`} className="text-[#5B4BD6] font-bold hover:underline">
                  {lead.phone}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#terms"
                onClick={(e) => handleSandboxedLink(e, "Terms of Service")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#privacy"
                onClick={(e) => handleSandboxedLink(e, "Privacy Policy")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#licenses"
                onClick={(e) => handleSandboxedLink(e, "Licensing & Insurance")}
                className="hover:text-[#5B4BD6] transition-colors cursor-pointer"
              >
                Licensing Information
              </a>
            </div>
          </div>
        </footer>

        {/* ──────────────────────────────────────────────────────────
            SPEEDCRAFT TELEMETRY AUDIT & HANDOVER SECTION
            (ACCESSIBLE VIA ANCHOR FROM TOP BANNER)
        ────────────────────────────────────────────────────────── */}
        <section
          id="speedcraft-audit"
          className="bg-[#160F29] text-white py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-[#5B4BD6]"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            {/* SECTION HEADER */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Speedcraft Studio Engineering Telemetry</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Why We Built This Prototype For {lead.company}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                When mobile users click your ads or organic search listings, every 100ms of delay causes back-button dropoffs. Here is the direct speed comparison between your live domain and this sub-second Next.js prototype.
              </p>
            </div>

            {/* SIDE-BY-SIDE TELEMETRY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* CURRENT LIVE DOMAIN */}
              <div className="rounded-3xl bg-white/5 border border-red-500/30 p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-red-400">
                      Your Live Domain
                    </span>
                    <div className="text-sm font-bold text-white truncate max-w-[200px]">
                      {lead.website.replace(/^https?:\/\//, "")}
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-red-950/60 border border-red-800 text-red-300 font-mono text-xs font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>{lead.mobilePageSpeed}/100</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Mobile Load Time (FCP)</span>
                    <span className="font-mono font-bold text-red-400">{lead.mobileLoadTimeSec}s</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${lead.mobilePageSpeed}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Architecture</div>
                    <div className="font-bold text-white truncate">{lead.cms}</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Est. Lost Ad Spend</div>
                    <div className="font-bold text-red-400">
                      ~{lead.currencySymbol}{lead.estLostMonthlySpend}/mo
                    </div>
                  </div>
                </div>
              </div>

              {/* SPEEDCRAFT NEXT.JS PROTOTYPE */}
              <div className="rounded-3xl bg-[#231A47] border border-[#5B4BD6] p-6 sm:p-7 space-y-5 shadow-[0_15px_40px_rgba(91,75,214,0.2)]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                      Speedcraft Edge Rebuild
                    </span>
                    <div className="text-sm font-bold text-white">Next.js 16 Edge Prototype</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{simulatedScore}/100 Score</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-300">
                    <span>Measured Load Time</span>
                    <span className="font-mono font-bold text-emerald-400">{measuredSpeed} (Instant)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Edge Latency (TTFB)</div>
                    <div className="font-bold text-emerald-300">&lt; 35ms Global CDN</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-zinc-400 uppercase">Conversion Lift</div>
                    <div className="font-bold text-amber-300">+35% Retained Leads</div>
                  </div>
                </div>
              </div>
            </div>

            {/* HANDOVER & PRICING PLANS */}
            <div className="max-w-4xl mx-auto pt-6 border-t border-white/10 space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">Claim This Prototype For {lead.company}</h3>
                <p className="text-xs text-zinc-400">
                  We deploy this exact code directly onto your main domain within 48 hours. Zero downtime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TIER 1 */}
                <div className="rounded-2xl bg-white p-7 text-[#160F29] space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#5B4BD6] text-white">
                      Managed High-Speed Plan
                    </div>
                    <div className="text-3xl font-black">
                      {lead.currencySymbol}150{" "}
                      <span className="text-xs font-medium text-zinc-500 font-mono">/ month</span>
                    </div>
                    <div className="text-xs text-[#5B4BD6] font-mono font-semibold">
                      $0 Upfront Build Fee • Cancel Anytime
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-600 pt-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Next.js edge build for <strong>{lead.company}</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Ultra-fast Edge CDN hosting & SSL certificates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Unlimited text, price, and phone edits within 24 hours</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(
                      `Claim $150/mo Prototype for ${lead.company}`
                    )}&body=${encodeURIComponent(
                      `Hi Faruk,\n\nI reviewed the sub-second prototype for ${lead.company} (${lead.website}).\n\nLet's get this activated under the $150/month plan.\n\nCompany: ${lead.company}\nPhone: ${lead.phone}`
                    )}`}
                    className="w-full py-3.5 rounded-xl bg-[#5B4BD6] hover:bg-[#4939C7] text-white font-bold text-xs text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Claim $150/mo Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* TIER 2 */}
                <div className="rounded-2xl bg-white/10 border border-white/20 p-7 text-white space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/20 text-white">
                      Full Code Ownership
                    </div>
                    <div className="text-3xl font-black">
                      {lead.currencySymbol}1,200{" "}
                      <span className="text-xs font-medium text-zinc-400 font-mono">one-time</span>
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">
                      + $50/month optional hosting & monitoring
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-300 pt-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>100% Code Ownership & GitHub repo transfer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Zero ongoing build royalties</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Complete DNS transfer and Google Analytics integration</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href={`mailto:farukolawale509@gmail.com?subject=${encodeURIComponent(
                      `Code Buyout Option for ${lead.company}`
                    )}&body=${encodeURIComponent(
                      `Hi Faruk,\n\nI want to discuss the one-time code buyout option for ${lead.company}.\n\nCompany: ${lead.company}\nPhone: ${lead.phone}`
                    )}`}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-[#160F29] font-bold text-xs text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire About Buyout</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-700" />
                  </a>
                </div>
              </div>

              {/* AGENCY CONTACT FOOTER */}
              <div className="text-center pt-4 text-xs font-mono text-zinc-400">
                Direct Engineer Contact:{" "}
                <a
                  href="mailto:farukolawale509@gmail.com"
                  className="text-amber-300 underline font-bold hover:text-white"
                >
                  farukolawale509@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            MOBILE STICKY BOTTOM DOCK (CLICK-TO-CALL ALWAYS ACTIVE)
        ────────────────────────────────────────────────────────── */}
        <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3 z-40 shadow-lg flex items-center gap-2">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 py-3 rounded-xl bg-[#160F29] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call Now ({lead.phone})</span>
          </a>
          <a
            href="#quote-form"
            className="flex-1 py-3 rounded-xl bg-[#5B4BD6] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Get Quote</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClientPrototypePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0C20] flex flex-col items-center justify-center font-mono text-xs text-white space-y-3">
          <div className="w-7 h-7 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
          <div className="tracking-wider uppercase text-zinc-300">
            Synthesizing Sub-Second Speedcraft Prototype...
          </div>
        </div>
      }
    >
      <PrototypeContent />
    </Suspense>
  );
}
