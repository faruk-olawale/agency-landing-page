"use client";

import React, { useState } from "react";
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
    <section id="service-record" className="py-16 sm:py-24 px-4 sm:px-8">
      <div className="qf-pcard relative">
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
        <div className="qf-pcard__text relative z-10">
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

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="#book-intake"
              className="qf-control qf-control--ink text-sm font-medium"
            >
              <span>Book Diagnostic Intake</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="qf-control qf-control--ghost text-sm font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A997D]" />
              <span>Direct Line: {phone}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Floating Vehicle Repair Order Telemetry Card */}
        <div className="relative z-10 flex justify-center">
          <div className="w-full max-w-lg bg-[#0C0730] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 font-mono">
            {/* RO Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block truncate max-w-[200px]">
                  {companyName.toUpperCase()} · RO NUMBER
                </span>
                <span className="text-base font-bold text-white tracking-wide">RO-40912</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A997D]/20 text-[#6FD9C1] border border-[#0A997D]/40 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#6FD9C1] animate-pulse" />
                BAY 2 ACTIVE
              </span>
            </div>

            {/* Vehicle Identification Strip */}
            <div className="my-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                <span>VEHICLE TELEMETRY</span>
                <span>VIN: WBS33AY08P1***</span>
              </div>
              <div className="font-bold text-sm text-white">
                2023 BMW M3 Competition (G80)
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                3.0L S58 Twin-Turbo · 8-Speed M Steptronic
              </div>
            </div>

            {/* 5-Step Repair Order Status Stepper */}
            <div className="space-y-3.5 my-5 text-xs">
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
                  className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${
                    activeStep === s.step
                      ? "bg-white/10 border-[#6FD9C1]/50 text-white shadow-md"
                      : "border-transparent text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      s.done
                        ? "bg-[#0A997D] text-white"
                        : s.active
                        ? "bg-[#6FD9C1] text-[#0C0730] animate-pulse"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {s.done ? "✓" : s.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans font-medium text-white truncate text-[13px]">
                      {s.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {s.time} · {s.done ? "Logged to vehicle ledger" : s.active ? "Awaiting client click" : "Queued"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Release Security Code Box (QuickFleet Door Code Parity) */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">
                  4-DIGIT HANDOVER CODE
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {["6", "2", "4", "9"].map((digit, i) => (
                    <span
                      key={i}
                      className="w-7 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-[#6FD9C1]"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">
                  MASTER SPECIALIST
                </span>
                <div className="text-xs font-bold text-white mt-1">
                  M. Vance (ASE L1 #4928)
                </div>
                <div className="text-[10px] text-[#6FD9C1]">
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
