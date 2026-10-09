"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

interface QuickFleetLiveRecordProps {
  companyName: string;
  city: string;
  phone: string;
  cleanPhone: string;
  primaryColor?: string;
}

export function QuickFleetLiveRecord({
  companyName,
  city,
  phone,
  cleanPhone,
  primaryColor = "#0A997D",
}: QuickFleetLiveRecordProps) {
  // Strictly enforce QuickFleet teal #0A997D and eliminate orange
  const safeColor =
    !primaryColor ||
    primaryColor.toLowerCase().includes("f97316") ||
    primaryColor.toLowerCase().includes("ea580c") ||
    primaryColor.toLowerCase().includes("d97706") ||
    primaryColor.toLowerCase().includes("orange")
      ? "#0A997D"
      : primaryColor;

  const [activeStep, setActiveStep] = useState<number>(3);

  return (
    <section id="service-record" className="py-12 sm:py-20 lg:py-24 px-3 sm:px-6 lg:px-8 overflow-hidden">
      <div className="qf-pcard relative overflow-hidden !grid !grid-cols-1 lg:!grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] !p-4 sm:!p-8 lg:!p-12 !gap-6 lg:!gap-12">
        {/* Concentric Orbital Drafting Rings in Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-40 hidden xl:block">
          <svg viewBox="0 0 800 800" className="w-full h-full stroke-[#0C0730]/15 fill-none">
            <circle cx="400" cy="400" r="380" strokeDasharray="4 6" />
            <circle cx="400" cy="400" r="300" strokeWidth="1" />
            <circle cx="400" cy="400" r="220" strokeDasharray="2 4" />
            <circle cx="400" cy="400" r="140" strokeWidth="1" />
            <circle cx="400" cy="20" r="4" fill={safeColor} />
            <circle cx="780" cy="400" r="4" fill={safeColor} />
            <circle cx="400" cy="780" r="4" fill={safeColor} />
            <circle cx="20" cy="400" r="4" fill={safeColor} />
          </svg>
        </div>

        {/* Left Column: Editorial Headline & Value Proposition */}
        <div className="qf-pcard__text relative z-10 min-w-0">
          <span className="qf-eyebrow">
            <i>04</i>
            <span>The Service Record</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0C0730] tracking-[-0.028em] mt-5 leading-tight max-w-[14ch]">
            One record, from intake to handover.
          </h2>

          <p className="text-base sm:text-[17px] text-[#0C0730]/75 leading-relaxed mt-6 max-w-[42ch]">
            <b>From the first scan to the handover, your vehicle stays in view.</b> Track
            diagnosis in real time at our {city} facility, watch the technician&apos;s video
            walkthrough, approve line items with a single tap, and verify completion with a 4-digit
            security code.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
            <a
              href="#book-intake"
              className="qf-control qf-control--ink text-sm font-medium justify-center"
            >
              <span>Book Diagnostic Intake</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="qf-control qf-control--ghost text-sm font-mono justify-center"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A997D]" />
              <span className="truncate">Direct Line: {phone}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Floating Vehicle Repair Order Telemetry Card */}
        <div className="relative z-10 flex justify-center w-full min-w-0">
          <div className="w-full max-w-lg bg-[#0C0730] text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-7 shadow-2xl border border-white/10 font-mono min-w-0 overflow-hidden sm:overflow-visible">
            {/* RO Header */}
            <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-white/10 text-xs min-w-0">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 block truncate max-w-full uppercase tracking-wider">
                  {companyName} · RO NUMBER
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-wide">RO-40912</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#0A997D]/20 text-[#6FD9C1] border border-[#0A997D]/40 text-[10px] sm:text-[11px] font-bold shrink-0 tracking-wider">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#6FD9C1] animate-pulse shrink-0" />
                BAY 2 ACTIVE
              </span>
            </div>

            {/* Vehicle Identification Strip */}
            <div className="my-3.5 sm:my-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans min-w-0">
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-slate-400 mb-1 min-w-0">
                <span className="shrink-0 tracking-wider">VEHICLE TELEMETRY</span>
                <span className="truncate text-right">VIN: WBS33AY08P1***</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-white truncate">
                2023 BMW M3 Competition (G80)
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5 truncate">
                3.0L S58 Twin-Turbo · 8-Speed M Steptronic
              </div>
            </div>

            {/* 5-Step Repair Order Status Stepper */}
            <div className="space-y-2.5 sm:space-y-3.5 my-4 sm:my-5 text-xs min-w-0">
              {[
                {
                  step: 1,
                  title: "Intake & 48-System DTC Diagnostic Scan",
                  time: "08:14 AM",
                  done: true,
                },
                {
                  step: 2,
                  title: "Bay 2 Assigned · PicoScope 4425A Lab Scope Connected",
                  time: "08:42 AM",
                  done: true,
                },
                {
                  step: 3,
                  title: "4K HD Video DVI Uploaded & SMS Authorization Sent",
                  time: "09:15 AM",
                  active: true,
                },
                {
                  step: 4,
                  title: "OEM Component Installation & Digital Torque Spec QC",
                  time: "10:30 AM",
                  pending: true,
                },
                {
                  step: 5,
                  title: "Road-Test Telemetry & 4-Digit Handover Verification",
                  time: "11:45 AM",
                  pending: true,
                },
              ].map((s) => (
                <div
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`relative flex items-start gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl cursor-pointer transition-colors min-w-0 ${
                    activeStep === s.step
                      ? "text-white shadow-md"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  {activeStep === s.step && (
                    <motion.div
                      layoutId="activeRecordStep"
                      className="absolute inset-0 bg-white/10 border border-[#6FD9C1]/50 rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <div
                    className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      s.done
                        ? "bg-[#0A997D] text-white"
                        : s.active
                        ? "bg-[#6FD9C1] text-[#0C0730] animate-pulse"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {s.done ? "✓" : s.step}
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <div className="font-sans font-medium text-white text-xs sm:text-[13px] leading-snug break-words">
                      {s.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 leading-tight flex flex-wrap items-center gap-x-1.5">
                      <span>{s.time}</span>
                      <span className="text-slate-600">·</span>
                      <span>{s.done ? "Logged to vehicle ledger" : s.active ? "Awaiting client click" : "Queued"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Release Security Code Box (QuickFleet Door Code Parity) */}
            <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block font-mono tracking-wider">
                  4-DIGIT HANDOVER CODE
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                  {["6", "2", "4", "9"].map((digit, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-6 h-7 sm:w-7 sm:h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs sm:text-sm font-bold text-[#6FD9C1] cursor-pointer select-none"
                    >
                      {digit}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="text-left sm:text-right min-w-0 border-t border-white/5 sm:border-t-0 pt-2.5 sm:pt-0">
                <span className="text-[10px] text-slate-400 block font-mono tracking-wider">
                  MASTER SPECIALIST
                </span>
                <div className="text-xs font-bold text-white mt-0.5 truncate">
                  M. Vance (ASE L1 #4928)
                </div>
                <div className="text-[10px] text-[#6FD9C1] truncate">
                  Verified Digital Signature
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
