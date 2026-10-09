"use client";

import React, { useState } from "react";
import {
  Clock,
  AlertTriangle,
  Disc,
  Zap,
  Activity,
  Check,
  Cpu,
  Camera,
  Video,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  Phone,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export interface DiagnosticBentoProps {
  city?: string;
  phone?: string;
  primaryColor?: string;
  companyName?: string;
}

interface SymptomOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  scanProtocol: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: "check-engine",
    title: "Check Engine Light",
    description: "Flashing or solid MIL, misfires, erratic sensor readings",
    icon: AlertTriangle,
    scanProtocol: "Live OEM CAN-Bus PID Telemetry + Electronic Smoke & Cylinder Pressure Scan",
  },
  {
    id: "squealing-brakes",
    title: "Squealing Brakes",
    description: "High-frequency squeal, pedal pulsation, reduced bite",
    icon: Disc,
    scanProtocol: "Digital Micrometer Rotor Runout Audit + Hydraulic Line Pressure Test",
  },
  {
    id: "transmission-slip",
    title: "Transmission Slip",
    description: "Harsh gear engagement, delayed shifting, clutch slippage",
    icon: Zap,
    scanProtocol: "TCM Line-Pressure Telemetry + Solenoid Resistance & Clutch Adaptation Audit",
  },
  {
    id: "ac-failure",
    title: "AC Failure",
    description: "Warm air discharge, compressor clutch noise, refrigerant leak",
    icon: Activity,
    scanProtocol: "Nitrogen Ultrasonic Leak Sniff + Dual-Zone Refrigerant Recovery & Pressure Test",
  },
];

export function DiagnosticBento({
  city = "Metropolitan Area",
  phone = "(555) 019-2834",
  primaryColor = "#F97316",
  companyName = "Precision Auto Diagnostics",
}: DiagnosticBentoProps) {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // Interactive symptom selection state (defaults to check-engine selected)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["check-engine"]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedProtocols = SYMPTOMS.filter((s) =>
    selectedSymptoms.includes(s.id)
  );

  return (
    <section
      aria-label="Diagnostic Capability Bento Grid"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border shadow-sm"
          style={{
            backgroundColor: `${primaryColor}15`,
            borderColor: `${primaryColor}30`,
            color: primaryColor,
          }}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Precision Diagnostic Architecture</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          Engineered Diagnostic Operations
        </h2>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We do not guess with customer money. High-ticket automotive repairs require factory-grade
          scan telemetry, transparent evidence, and rapid bay intake.
        </p>
      </div>

      {/* Asymmetric Bento Grid (4 Primary Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── CARD 1: Live Bay Availability Operations Dashboard (7 Cols) ──── */}
        <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />

          <div>
            {/* Header: Status & Metric */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                    Bay Telemetry // {city.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Live Bay Intake Operations
                </h3>
              </div>

              {/* Highlight Metric */}
              <div className="bg-black/40 border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-2xl font-black text-white tracking-tight leading-none">
                    20 min
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                    average diagnostic intake
                  </div>
                </div>
              </div>
            </div>

            {/* Live Bay Telemetry Status Board */}
            <div className="py-6 space-y-3 font-mono text-xs">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
                <span>Active Diagnostic Stations:</span>
                <span className="text-emerald-400">3/4 Bays Dispatched</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span>BAY 01 // EUROPEAN</span>
                    <span className="text-amber-400 font-semibold">● IN PROGRESS</span>
                  </div>
                  <div className="text-slate-200 font-sans font-bold text-xs truncate">
                    BMW M4 Competition
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    Live CAN-Bus ECU Tracing
                  </div>
                </div>

                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span>BAY 02 // POWERTRAIN</span>
                    <span className="text-sky-400 font-semibold">● CLEARING IN 18M</span>
                  </div>
                  <div className="text-slate-200 font-sans font-bold text-xs truncate">
                    Porsche Macan GTS
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    PDK Line Pressure Diagnostic
                  </div>
                </div>

                <div
                  className="rounded-xl p-3 flex flex-col justify-between border"
                  style={{
                    backgroundColor: `${primaryColor}12`,
                    borderColor: `${primaryColor}40`,
                  }}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="font-bold text-white">BAY 03 // PRIORITY</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE NOW
                    </span>
                  </div>
                  <div className="text-white font-sans font-bold text-xs">
                    Dedicated Diagnostic Intake Bay
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    Factory OEM Scan Tools Staged
                  </div>
                </div>

                <div className="bg-black/30 border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span>BAY 04 // CHASSIS</span>
                    <span className="text-amber-400 font-semibold">● IN PROGRESS</span>
                  </div>
                  <div className="text-slate-200 font-sans font-bold text-xs truncate">
                    Mercedes-AMG C63
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    Twin-Turbo Boost Leak Trace
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Commitment */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Same-Day Diagnostic Intake Guarantee</span>
            </div>
            <a
              href={`tel:${cleanPhone}`}
              className="text-white font-bold hover:underline inline-flex items-center gap-1 text-xs"
            >
              <span>Call For Bay Status</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ── CARD 2: Interactive Symptom Diagnostic (5 Cols) ──── */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
          <div>
            {/* Header */}
            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/10">
                Interactive Triage Checklist
              </span>
              <h3 className="text-xl font-bold text-white mt-2 tracking-tight">
                Symptom Diagnostic Protocol
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select your vehicle&apos;s symptoms to generate an immediate diagnostic protocol:
              </p>
            </div>

            {/* 4 Interactive Symptom Checkboxes */}
            <div className="space-y-2.5">
              {SYMPTOMS.map((symptom) => {
                const IconComponent = symptom.icon;
                const isSelected = selectedSymptoms.includes(symptom.id);

                return (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => toggleSymptom(symptom.id)}
                    className="w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    style={{
                      borderColor: isSelected ? primaryColor : "rgba(255,255,255,0.08)",
                      backgroundColor: isSelected
                        ? `${primaryColor}18`
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors"
                        style={{
                          backgroundColor: isSelected
                            ? primaryColor
                            : "rgba(255,255,255,0.06)",
                          borderColor: isSelected ? primaryColor : "rgba(255,255,255,0.1)",
                          color: "#ffffff",
                        }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div
                          className="text-xs font-bold font-sans tracking-tight truncate transition-colors"
                          style={{ color: isSelected ? "#ffffff" : "#e2e8f0" }}
                        >
                          {symptom.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {symptom.description}
                        </div>
                      </div>
                    </div>

                    {/* Toggle Indicator */}
                    <div
                      className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all"
                      style={{
                        borderColor: isSelected ? primaryColor : "rgba(255,255,255,0.2)",
                        backgroundColor: isSelected ? primaryColor : "transparent",
                      }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Protocol Assessment Readout */}
            <div className="mt-4 p-3.5 bg-black/40 border border-white/10 rounded-2xl font-mono text-[11px]">
              <div className="text-slate-400 uppercase tracking-wider text-[10px] mb-1 flex items-center justify-between">
                <span>Diagnostic Assessment Output:</span>
                <span className="text-emerald-400 font-bold">
                  {selectedProtocols.length} Flagged
                </span>
              </div>

              {selectedProtocols.length > 0 ? (
                <div className="space-y-1.5 text-slate-200">
                  {selectedProtocols.map((p) => (
                    <div key={p.id} className="flex items-start gap-1.5 text-xs font-sans">
                      <span className="text-amber-400 font-mono mt-0.5">•</span>
                      <span className="leading-tight">{p.scanProtocol}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 italic font-sans text-xs">
                  Click one or more symptoms above to preview the recommended scan protocol.
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-5">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-md border border-white/20 font-mono"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>
                {selectedProtocols.length > 0
                  ? `Dispatch Bay For ${selectedProtocols.length} Symptoms`
                  : "Call For Diagnostic Intake"}
              </span>
            </a>
          </div>
        </div>

        {/* ── CARD 3: Advanced Scan Tooling & Oscilloscope Telemetry (5 Cols) ──── */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/15"
                style={{ backgroundColor: primaryColor }}
              >
                <Cpu className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">
                OEM FACTORY LEVEL
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              Advanced Scan Tooling & Oscilloscope
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 font-normal">
              Generic OBD-II readers miss 70% of manufacturer-specific fault codes. We invest in
              dedicated factory diagnostic platforms to communicate directly with all vehicle ECUs.
            </p>

            {/* Technical Tooling Protocols */}
            <div className="space-y-2.5 mb-5 font-mono text-xs">
              <div className="bg-black/40 border border-white/[0.08] rounded-xl p-3">
                <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider">
                  Supported Factory Protocols:
                </span>
                <span className="text-white font-bold text-xs">
                  BMW ISTA • Mercedes Xentry • Audi/VW ODIS • Ford IDS • Autel Ultra
                </span>
              </div>

              <div className="bg-black/40 border border-white/[0.08] rounded-xl p-3">
                <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider">
                  Signal Trace Capabilities:
                </span>
                <span className="text-slate-200 font-sans text-xs block">
                  CAN-Bus oscilloscope waveform capture, live bidirectional solenoid tests, and
                  microsecond ignition spark duration tracing.
                </span>
              </div>
            </div>

            {/* Restrained Waveform Graphic */}
            <div className="p-3 bg-black/50 border border-white/[0.08] rounded-xl flex items-center justify-between font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">CAN High/Low Signal: 2.5V Bias OK</span>
              </div>
              <span className="text-emerald-400 font-bold">0 Dropouts</span>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Bidirectional Component Testing</span>
            <span className="text-white font-bold">100% Dealership Equivalent</span>
          </div>
        </div>

        {/* ── CARD 4: Digital Vehicle Inspection DVI (7 Cols) ──── */}
        <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative group">
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08] mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-bold">
                  Total Transparency
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mt-2">
                  Digital Vehicle Inspection (DVI)
                </h3>
              </div>

              <div className="text-xs font-mono text-slate-400">
                <span className="text-white font-bold block sm:text-right">SMS Delivered</span>
                <span>Direct to your smartphone</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              See the exact photographic and video evidence before approving any repair.
              Our master technicians document every finding with digital precision.
            </p>

            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <div className="p-2 rounded-xl bg-white/[0.06] text-white shrink-0">
                  <Camera className="w-4 h-4" style={{ color: primaryColor }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Macro Photo Evidence</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    High-res closeups of hairline cracks, worn rotors, and gasket leaks.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <div className="p-2 rounded-xl bg-white/[0.06] text-white shrink-0">
                  <Video className="w-4 h-4" style={{ color: primaryColor }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Technician Video Walkarounds</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Narrated video under the hoist showing exactly why a repair is needed.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <div className="p-2 rounded-xl bg-white/[0.06] text-white shrink-0">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">1-Click SMS Approvals</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Transparent line-item estimates sent via text. Authorize with one tap.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <div className="p-2 rounded-xl bg-white/[0.06] text-white shrink-0">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">3-Yr / 36k-Mi Warranty</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Nationwide written backing on all installed parts and precision labor.
                  </div>
                </div>
              </div>
            </div>

            {/* DVI Report Preview Snippet */}
            <div className="p-3.5 bg-black/40 border border-white/[0.08] rounded-2xl font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-bold">DVI REPORT #{companyName.replace(/[^a-zA-Z]/g, "").slice(0, 4).toUpperCase()}-9401</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-[11px]">18 Points Audited</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                100% Upfront Written Estimate
              </span>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Zero Unapproved Work Ever Performed</span>
            <a href={`tel:${cleanPhone}`} className="text-white font-bold hover:underline">
              Request Diagnostic Intake →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiagnosticBento;
