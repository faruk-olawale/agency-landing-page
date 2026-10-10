"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetServicesInteractiveProps {
  companyName: string;
  city?: string;
  cleanPhone?: string;
  primaryColor?: string;
  truth?: AutomotiveTruth;
}

interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  telemetryMetric: string;
  telemetryVal: string;
  statusBadge: string;
  hudReadout: {
    system: string;
    diagnosticCode: string;
    signalValue: string;
    integrity: string;
  };
  pos: {
    top: string;
    left?: string;
    right?: string;
  };
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "intake",
    stepNumber: "01",
    title: "Fault Triage & ECU Scan",
    subtitle: "Complete CAN-Bus handshake",
    description:
      "We query every onboard control module simultaneously—recording active trouble codes, pending flags, freeze-frame sensor values, and software checksum versions before any component is disconnected.",
    telemetryMetric: "NETWORK LATENCY",
    telemetryVal: "0.42 ms",
    statusBadge: "CAN-BUS HANDSHAKE OK",
    hudReadout: {
      system: "ECU GATEWAY U-01",
      diagnosticCode: "DTC 0x3F82 [PENDING]",
      signalValue: "187.4 BAR RAIL PRESS",
      integrity: "99.8% PACKET INTEGRITY",
    },
    pos: { top: "10%", left: "4%" },
  },
  {
    id: "waveform",
    stepNumber: "02",
    title: "Oscilloscope Waveform Capture",
    subtitle: "PicoScope 400MS/s telemetry",
    description:
      "Direct probe attachment to camshaft/crankshaft position sensors, injector pulse solenoids, and secondary ignition coils isolates physical vs. electrical degradation with zero guesswork.",
    telemetryMetric: "SAMPLE RATE",
    telemetryVal: "400 MS/s",
    statusBadge: "OSCILLOSCOPE SYNCED",
    hudReadout: {
      system: "CAM / CRANK CORRELATION",
      diagnosticCode: "CH-A: 12.4° ADVANCE",
      signalValue: "DUTY CYCLE 88.2%",
      integrity: "ZERO WAVEFORM JITTER",
    },
    pos: { top: "10%", right: "4%" },
  },
  {
    id: "evidence",
    stepNumber: "03",
    title: "4K Video Proof & Cloud DVI",
    subtitle: "Direct video sent to your phone",
    description:
      "High-definition optical borescope footage inside combustion chambers, micrometer brake rotor runouts, and fluid spectrometry are uploaded directly to your personal repair dashboard with instant approval buttons.",
    telemetryMetric: "DVI VIDEO UPLOAD",
    telemetryVal: "60 FPS · 4K",
    statusBadge: "CLIENT DASHBOARD LIVE",
    hudReadout: {
      system: "CLOUD TELEMETRY LINK",
      diagnosticCode: "SECURE PORTAL 40912",
      signalValue: "BORESCOPE FEED LIVE",
      integrity: "IRREVOCABLE TIMESTAMP",
    },
    pos: { top: "54%", left: "2%" },
  },
  {
    id: "repair",
    stepNumber: "04",
    title: "OEM Spec Precision Repair",
    subtitle: "Manufacturer specification execution",
    description:
      "Installed exclusively with Genuine OEM or Tier-1 manufacturer components. Digital torque-angle tightening, hydraulic vacuum coolant evacuation, and manufacturer module adaptation ensure zero rework.",
    telemetryMetric: "TORQUE ACCURACY",
    telemetryVal: "±0.5% CALIBRATED",
    statusBadge: "OEM SCN CODING",
    hudReadout: {
      system: "HYDRAULIC BAY 02",
      diagnosticCode: "TORQUE ANGLE VERIFIED",
      signalValue: "NEW ACTUATOR SYNCED",
      integrity: "FACTORY OEM MATCH",
    },
    pos: { top: "54%", right: "2%" },
  },
  {
    id: "warranty",
    stepNumber: "05",
    title: "Dynamic Road Test & Warranty Handover",
    subtitle: "OBD-II readiness monitors verified",
    description:
      "Dynamic road-load testing confirms all EPA emissions readiness flags are set to ready. Completed work is backed by our written limited repair warranty and digital maintenance log update.",
    telemetryMetric: "READINESS PASS",
    telemetryVal: "8 OF 8 MONITORS",
    statusBadge: "WRITTEN WARRANTY",
    hudReadout: {
      system: "DYNAMIC ROAD TELEMETRY",
      diagnosticCode: "ALL MONITORS READY",
      signalValue: "0 CODES / 0 MISFIRES",
      integrity: "WRITTEN WARRANTY ACTIVE",
    },
    pos: { top: "86%", left: "22%" },
  },
];

interface ServiceDiscipline {
  id: string;
  category: "all" | "diagnostics" | "powertrain" | "chassis" | "maintenance";
  categoryLabel: string;
  title: string;
  highlight: string;
  summary: string;
  symptoms: string[];
  equipment: string[];
  turnaround: string;
  bayAvailability: string;
  iconSvg: React.ReactNode;
}

const SERVICE_DISCIPLINES: ServiceDiscipline[] = [
  {
    id: "diag-ecu",
    category: "diagnostics",
    categoryLabel: "Diagnostics & Electronics",
    title: "Advanced Computer Diagnostics & ECU SCN Coding",
    highlight: "Root-cause pinpointing without dealership markup",
    summary:
      "Factory-level dealer diagnostic suites (BMW ISTA+, Porsche PIWIS III, Mercedes XENTRY, Audi ODIS, Autel MaxiSys Ultra) for module programming, component adaptation, key matching, and CAN-bus parasitic battery drain tracing.",
    symptoms: [
      "Check Engine Light (CEL)",
      "Limp Mode Active",
      "Intermittent No-Start",
      "Overnight Battery Drain",
      "CAN-Bus U-Codes",
    ],
    equipment: ["PicoScope 4425A Lab Scope", "Autel MaxiSys Ultra", "Bosch 100A Flash Power Supply", "Fluke 88V Automotive DMM"],
    turnaround: "Same-Day (2 - 4 hrs)",
    bayAvailability: "2 bays available today",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: "powertrain",
    category: "powertrain",
    categoryLabel: "Engine & Induction",
    title: "Powertrain, Turbocharger & Engine Mechanical Rebuilds",
    highlight: "Micron-level tolerance rebuilds & forced induction",
    summary:
      "Precision diagnosis and mechanical repair for turbocharged and naturally aspirated powerplants. From direct-injection common rail fuel systems to timing chain guide replacements, cylinder head overhauls, and boost-pressure wastegate calibration.",
    symptoms: [
      "Turbo Boost Pressure Drop",
      "Cold-Start Timing Rattle",
      "Excessive Oil Consumption",
      "White or Blue Exhaust Smoke",
      "Loss of Compression",
    ],
    equipment: ["Snap-on 4K Dual Borescope", "Smoke Pro Nitrogen Vapor Rig", "Dynamic Cylinder Compression Tester", "Digital Torque-Angle Meter"],
    turnaround: "1 - 3 Days (Part Dependent)",
    bayAvailability: "1 master bay open",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "brakes-abs",
    category: "chassis",
    categoryLabel: "Braking & Safety",
    title: "Precision Braking, Hydraulic Calibration & ABS Systems",
    highlight: "Zero-vibration stopping power & hydraulic integrity",
    summary:
      "Mitutoyo lateral runout dial-gauge measurement, high-temp ceramic and semi-metallic pad installations, braided stainless line retrofits, electronic parking brake (EPB) service mode activations, and pressurized ABS pump bleed sequences.",
    symptoms: [
      "Steering Shudder Under Braking",
      "Spongy or Sinking Brake Pedal",
      "ABS / ESP Warning Light",
      "High-Pitched Brake Squeal",
      "Uneven Pad Wear",
    ],
    equipment: ["Mitutoyo Dial Indicator Micrometer", "Pneumatic Pressure Bleeder (2.0 Bar)", "On-Car Rotor Truing Lathe", "Infrared Thermal Pyrometer"],
    turnaround: "Same-Day (2 - 3 hrs)",
    bayAvailability: "3 bays available today",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "transmission",
    category: "powertrain",
    categoryLabel: "Drivetrain & Transmission",
    title: "Transmission, Dual-Clutch (DCT/PDK) & Driveline",
    highlight: "Mechatronic adaptations & hydraulic valve bodies",
    summary:
      "Factory fluid exchange with optical refractive validation, dual-clutch clutch pack adaptations, mechatronic module solenoid testing, transfer case actuator motor overhauls, and differential backlash adjustments.",
    symptoms: [
      "Hard 2nd-to-1st Downshifts",
      "Transmission Slipping or Shudder",
      "Gearbox Fault - Safe Mode",
      "Driveline Clunk on Reverse",
      "Transfer Case Binding on Turns",
    ],
    equipment: ["OEM Transmission Diagnostic Flasher", "Digital Fluid Refractometer", "Driveline Vibration Analyzer", "Hydraulic Pressure Test Gauge"],
    turnaround: "1 - 2 Days",
    bayAvailability: "Next available tomorrow",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "electrical-ev",
    category: "diagnostics",
    categoryLabel: "Electrical & EV/Hybrid",
    title: "Automotive Electrical & High-Voltage EV/Hybrid Care",
    highlight: "High-voltage isolation & battery balancing",
    summary:
      "Standard high-voltage isolation safety procedures, 400V/800V DC-DC converter diagnostics, hybrid battery cell pack voltage deviation audits, inverter coolant circuit flushes, and smart alternator current sensor calibration.",
    symptoms: [
      "Hybrid System Warning Message",
      "Reduced Electric EV Range",
      "High-Voltage Isolation Fault",
      "Intermittent Exterior Lighting Glitches",
      "12V Auxiliary System Failure",
    ],
    equipment: ["Fluke 1587 FC 1000V Megohmmeter", "Insulated Class 0 1000V Safety Rig", "EV Battery Telemetry Logger", "Thermal Imaging Camera"],
    turnaround: "Same-Day to 2 Days",
    bayAvailability: "Certified EV master tech on site",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "scheduled-maintenance",
    category: "maintenance",
    categoryLabel: "Preventative Interval Care",
    title: "Factory Scheduled Maintenance (30k · 60k · 90k)",
    highlight: "Warranty-compliant interval care without dealership markup",
    summary:
      "Strict manufacturer-compliant logbook service protecting your active factory warranty. Includes full digital video inspection, European synthetic engine oil exchange, spark plug replacement, brake fluid flush, and micro-filtration.",
    symptoms: [
      "Service Due A/B Notification",
      "30,000 / 60,000 / 90,000 Mile Threshold",
      "Annual Pre-Trip Safety Check",
      "Factory Warranty Compliance Record",
      "Pre-Purchase Comprehensive Audit",
    ],
    equipment: ["OEM Service Interval Reset Flasher", "Laser Tire Tread Depth Scanner", "Brake Fluid Moisture Tester", "Refractive Coolant Hydrometer"],
    turnaround: "Same-Day (1.5 - 2 hrs)",
    bayAvailability: "Express maintenance bays open",
    iconSvg: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function QuickFleetServicesInteractive({
  companyName: propCompanyName,
  city: propCity,
  cleanPhone: propCleanPhone,
  truth,
}: QuickFleetServicesInteractiveProps) {
  const companyName = truth?.companyName || propCompanyName;
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;
  const hasPhone = truth ? truth.hasPhone : Boolean(propCleanPhone && propCleanPhone.length >= 7);
  const cleanPhone = truth?.cleanPhone || propCleanPhone;
  const phone = truth?.phone || propCleanPhone;

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "diagnostics" | "powertrain" | "chassis" | "maintenance"
  >("all");

  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  // Auto-advance the telemetry stage every 4 seconds unless user interacts
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const filteredServices =
    selectedCategory === "all"
      ? SERVICE_DISCIPLINES
      : SERVICE_DISCIPLINES.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="qf-product py-20 sm:py-28 relative overflow-hidden bg-[#FBFBFA]">
      <div className="qf-container max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* ──────────────────────────────────────────────────────────────────
            PART 1: SECTION HEADER & EDITORIAL NARRATIVE
        ────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#0C0730]/10">
          <div className="max-w-[720px]">
            <span className="qf-eyebrow inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-[#0A997D] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A997D] animate-ping" />
              <span>02 · WHAT WE DO &amp; HOW WE OPERATE</span>
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#0C0730] tracking-tight leading-[1.12]">
              A complete diagnostic cockpit. Built to eliminate guesswork.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#0C0730]/75 leading-relaxed">
              Every vehicle entering our {hasCity ? `${city} ` : ""}facility passes through a standardized 5-phase forensic
              workflow. No &ldquo;parts cannon,&rdquo; no speculative labor, and no surprise charges—supported by 4K cloud video proof.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#book-intake"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0C0730] text-white text-sm font-medium hover:bg-[#1E1648] transition-all shadow-sm"
            >
              <span>Book Diagnostic Bay</span>
              <svg className="w-4 h-4 text-[#6FD9C1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            PART 2: QUICKFLEET SIGNATURE INTERACTIVE ORBITING ANIMATION
        ────────────────────────────────────────────────────────────────── */}
        <div className="mt-12 bg-[#0C0730] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 text-white relative shadow-2xl overflow-hidden border border-[#1E1648]">
          {/* Subtle background tech grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Interactive Step Explainer */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A997D]/20 border border-[#0A997D]/40 text-[#6FD9C1] text-xs font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#6FD9C1] animate-pulse" />
                  <span>PHASE {currentStep.stepNumber} OF 05</span>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug">
                  {currentStep.title}
                </h3>
                <p className="text-sm font-mono text-[#6FD9C1] mt-1 tracking-wide">
                  {currentStep.subtitle}
                </p>

                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                  {currentStep.description}
                </p>

                {/* Micro Real-time Telemetry Card */}
                <div className="mt-6 p-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
                    <span>LIVE SENSOR TELEMETRY</span>
                    <span className="text-[#6FD9C1] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6FD9C1]" />
                      CALIBRATED
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div>
                      <div className="text-[11px] text-white/50 font-mono">{currentStep.telemetryMetric}</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">
                        {currentStep.telemetryVal}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-white/50 font-mono">STATUS INTEGRITY</div>
                      <div className="text-xs font-bold font-mono text-[#6FD9C1] mt-0.5">
                        {currentStep.statusBadge}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Navigation Dots & Control */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {WORKFLOW_STEPS.map((step, idx) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setActiveStepIndex(idx);
                        setAutoRotate(false);
                      }}
                      className={`h-2.5 rounded-full transition-all ${
                        activeStepIndex === idx
                          ? "w-8 bg-[#6FD9C1]"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Jump to phase ${step.stepNumber}: ${step.title}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <button
                    type="button"
                    onClick={() => {
                      setAutoRotate(!autoRotate);
                    }}
                    className="hover:text-white transition-colors underline"
                  >
                    {autoRotate ? "Pause Stream" : "Resume Auto"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Central Animated HUD Console & Orbiting Telemetry */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="pstagebox w-full max-w-[560px] aspect-[4/3] sm:aspect-square relative flex items-center justify-center">
                {/* SVG Orbit Tracks */}
                <svg
                  className="otrack absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 600 600"
                  fill="none"
                >
                  <circle
                    cx="300"
                    cy="300"
                    r="230"
                    className="otrack__o"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="300"
                    cy="300"
                    r="150"
                    stroke="rgba(10,153,125,0.15)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                  {/* Rotating orbit beacon ring */}
                  <circle
                    cx="300"
                    cy="300"
                    r="230"
                    stroke="url(#orbitGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="80 1360"
                    className="origin-center animate-[spin_12s_linear_infinite]"
                  />
                  <defs>
                    <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6FD9C1" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0A997D" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Central HUD Scanning Console (.ph) */}
                <div className="ph relative z-20 w-[240px] sm:w-[260px] h-[400px] sm:h-[440px] rounded-[36px] bg-[#07041D] border-4 border-[#1E1648] p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
                  {/* Glowing ambient rim */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />

                  {/* Phone screen header */}
                  <div className="scr__top pb-2 pt-1 px-1 flex items-center justify-between border-b border-white/10 text-[10px] font-mono text-white/70">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#6FD9C1] animate-ping" />
                      <span className="text-white font-semibold">DIAG-OS v4.2</span>
                    </span>
                    <span className="text-[#6FD9C1]">{currentStep.hudReadout.system}</span>
                  </div>

                  {/* Vehicle Blueprint Graphic with Sweeping Laser Beam (.pmap) */}
                  <div className="pmap relative flex-1 flex flex-col items-center justify-center my-2 rounded-2xl bg-[#0C0730]/60 border border-white/5 overflow-hidden p-3">
                    {/* Sweeping Laser Beam */}
                    <div className="scan-beam" />

                    {/* Technical Chassis Blueprint Outline */}
                    <div className="w-full h-full relative flex items-center justify-center">
                      <svg
                        className="w-36 h-48 text-[#6FD9C1]/30 drop-shadow-[0_0_8px_rgba(111,217,193,0.3)]"
                        viewBox="0 0 100 180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        {/* Car Silhouette Chassis */}
                        <path
                          d="M25,30 C25,18 35,12 50,12 C65,12 75,18 75,30 L80,60 C84,70 86,90 86,120 L80,150 C76,165 65,170 50,170 C35,170 24,165 20,150 L14,120 C14,90 16,70 20,60 Z"
                          strokeDasharray="2 2"
                        />
                        {/* Windshield */}
                        <path d="M28,52 L72,52 L68,78 L32,78 Z" />
                        {/* Roof */}
                        <path d="M30,82 L70,82 L68,118 L32,118 Z" strokeDasharray="3 3" />
                        {/* Rear Glass */}
                        <path d="M32,122 L68,122 L72,138 L28,138 Z" />
                        {/* Active Diagnostic Target Crosshair */}
                        <circle cx="50" cy="56" r="12" stroke="#6FD9C1" strokeWidth="1" className="animate-pulse" />
                        <circle cx="50" cy="56" r="4" fill="#6FD9C1" />
                        <line x1="50" y1="38" x2="50" y2="74" stroke="#6FD9C1" strokeWidth="0.75" />
                        <line x1="32" y1="56" x2="68" y2="56" stroke="#6FD9C1" strokeWidth="0.75" />
                      </svg>
                    </div>

                    {/* HUD Status Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 bg-[#07041D]/90 backdrop-blur-md rounded-lg p-2 border border-white/10 text-[10px] font-mono">
                      <div className="text-white/60">{currentStep.hudReadout.diagnosticCode}</div>
                      <div className="text-[#6FD9C1] font-bold mt-0.5">{currentStep.hudReadout.signalValue}</div>
                    </div>
                  </div>

                  {/* Phone screen footer status */}
                  <div className="pt-2 px-1 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white/50">{hasCity && city ? `${city.toUpperCase()} BAY 02` : "FACILITY BAY 02"}</span>
                    <span className="text-[#6FD9C1] font-semibold">{currentStep.hudReadout.integrity}</span>
                  </div>
                </div>

                {/* Orbiting Interactive Telemetry Cards (.orb) */}
                {WORKFLOW_STEPS.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <div
                      key={step.id}
                      onClick={() => {
                        setActiveStepIndex(idx);
                        setAutoRotate(false);
                      }}
                      style={step.pos}
                      className={`orb hidden sm:block absolute cursor-pointer transition-all duration-300 z-30 ${
                        isActive ? "scale-105" : "scale-90 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`frag rounded-xl p-3 backdrop-blur-md border transition-all ${
                          isActive
                            ? "bg-[#0C0730]/95 border-[#6FD9C1] shadow-[0_0_20px_rgba(111,217,193,0.35)] text-white"
                            : "bg-[#1E1648]/80 border-white/15 text-white/80 hover:border-white/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="mono text-[10px] font-mono font-bold text-[#6FD9C1]">
                            PHASE {step.stepNumber}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6FD9C1] animate-ping" />
                          )}
                        </div>
                        <b className="block text-xs font-semibold text-white leading-tight">
                          {step.title}
                        </b>
                        <small className="block text-[10.5px] text-white/60 mt-1 leading-snug line-clamp-2">
                          {step.subtitle}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            PART 3: WHAT WE DO · 6-DISCIPLINE COMPREHENSIVE SERVICES MATRIX
        ────────────────────────────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[#0A997D] uppercase tracking-wider font-semibold">
                CATALOG OF REPAIR &amp; DIAGNOSTIC CAPABILITIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0C0730] mt-1 tracking-tight">
                Primary Service Disciplines · {companyName}
              </h3>
              <p className="text-sm text-[#0C0730]/70 mt-1 max-w-[60ch]">
                Every procedure is performed in our climate-controlled {hasCity ? `${city} ` : ""}workshop according to strict
                factory workshop manuals (TIS/ELSA/WIS).
              </p>
            </div>

            {/* Discipline Filter Tabs */}
            <div className="w-full md:w-auto overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#0C0730]/5 rounded-full border border-[#0C0730]/10 shrink-0">
                {(
                  [
                    { id: "all", label: "All Capabilities (6)" },
                    { id: "diagnostics", label: "Diagnostics & CAN" },
                    { id: "powertrain", label: "Engine & Trans" },
                    { id: "chassis", label: "Brakes & ABS" },
                    { id: "maintenance", label: "Scheduled Care" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedCategory === tab.id
                        ? "text-white font-semibold"
                        : "text-[#0C0730]/70 hover:text-[#0C0730]"
                    }`}
                  >
                    {selectedCategory === tab.id && (
                      <motion.span
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[#0C0730] rounded-full shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="qf-service-card group bg-white rounded-2xl p-6 border border-[#0C0730]/10 hover:border-[#0A997D]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#0A997D]/10 text-[#0A997D] font-mono text-[11px] font-semibold tracking-wide">
                        {service.categoryLabel}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#0C0730]/5 flex items-center justify-center text-[#0C0730] group-hover:bg-[#0A997D] group-hover:text-white transition-colors">
                        {service.iconSvg}
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-[#0C0730] tracking-tight group-hover:text-[#0A997D] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs font-medium text-[#0A997D] mt-1 font-mono">
                      {service.highlight}
                    </p>

                    <p className="text-xs sm:text-sm text-[#0C0730]/75 mt-3 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Common Symptoms / Indications */}
                    <div className="mt-5 pt-4 border-t border-[#0C0730]/8">
                      <div className="text-[11px] font-mono uppercase text-[#0C0730]/50 font-semibold mb-2">
                        Symptom Triggers We Resolve:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.symptoms.map((symptom, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#F3F1EC] text-[#0C0730]/80 text-[11px] font-medium"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Laboratory Tools Deployed */}
                    <div className="mt-4 pt-3 border-t border-[#0C0730]/8">
                      <div className="text-[11px] font-mono uppercase text-[#0C0730]/50 font-semibold mb-1">
                        Factory Tools Deployed:
                      </div>
                      <div className="text-xs text-[#0C0730]/80 leading-snug">
                        {service.equipment.join(" · ")}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Turnaround & Action */}
                  <div className="mt-6 pt-4 border-t border-[#0C0730]/8 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-[#0C0730]/50">ESTIMATED TIMELINE</span>
                      <span className="text-xs font-semibold text-[#0C0730]">{service.turnaround}</span>
                    </div>

                    <a
                      href="#book-intake"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0C0730] text-white text-xs font-medium hover:bg-[#0A997D] transition-colors"
                    >
                      <span>Request Intake</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Transparency Notice */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-[#0C0730]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0A997D]/10 text-[#0A997D] flex items-center justify-center flex-shrink-0 font-bold font-mono">
                ✓
              </div>
              <p className="text-xs sm:text-sm text-[#0C0730]/80">
                <strong className="text-[#0C0730]">Don&rsquo;t see your specific trouble code or mechanical symptom?</strong>{" "}
                Our master technicians diagnose any European or domestic platform.{" "}
                {hasPhone ? (
                  <>
                    Call directly at{" "}
                    <a href={`tel:${cleanPhone}`} className="text-[#0A997D] font-bold hover:underline">
                      {phone}
                    </a>{" "}
                    for an instant technical assessment.
                  </>
                ) : (
                  <>Submit your vehicle details below for an expedited diagnostic assessment.</>
                )}
              </p>
            </div>

            <a
              href="#book-intake"
              className="inline-flex items-center justify-center whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0C0730] text-white text-xs font-semibold hover:bg-[#0A997D] transition-colors"
            >
              Get Direct Fault Diagnosis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuickFleetServicesInteractive;
