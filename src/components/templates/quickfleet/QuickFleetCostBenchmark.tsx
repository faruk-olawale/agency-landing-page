"use client";

import React, { useState } from "react";
import { ArrowRight, Check, X, Clock } from "lucide-react";

import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetCostBenchmarkProps {
  companyName?: string;
  city?: string;
  truth?: AutomotiveTruth;
}

interface RepairScenario {
  id: string;
  name: string;
  dealerPrice: number;
  dealerDays: string;
  specialistPrice: number;
  specialistDays: string;
  description: string;
}

const SCENARIOS: RepairScenario[] = [
  {
    id: "fuel",
    name: "HPFP Fuel Rail Pressure Fault",
    dealerPrice: 4450,
    dealerDays: "14–18 Days",
    specialistPrice: 2180,
    specialistDays: "24 Hours",
    description: "Dealer replaces entire high-pressure pump & rail assembly. We diagnose failed sensor O-ring and harness drop.",
  },
  {
    id: "timing",
    name: "Cam Timing Correlation (P0016)",
    dealerPrice: 5800,
    dealerDays: "18–21 Days",
    specialistPrice: 2650,
    specialistDays: "48 Hours",
    description: "Dealer quotes full engine-out timing cassette teardown. We verify solenoid stretch with PicoScope lab scope.",
  },
  {
    id: "transmission",
    name: "Transmission Valve Body Slipping",
    dealerPrice: 8900,
    dealerDays: "21–28 Days",
    specialistPrice: 3800,
    specialistDays: "48 Hours",
    description: "Dealer demands replacement of entire transmission assembly. We rebuild valve body solenoids with OEM kits.",
  },
  {
    id: "alignment",
    name: "Hunter 3D Laser Alignment & ADAS",
    dealerPrice: 1250,
    dealerDays: "5–7 Days",
    specialistPrice: 480,
    specialistDays: "Same-Day",
    description: "Dealer sublets to third party with 100% markup. We calibrate in-house on Hunter Hawkeye Elite bays.",
  },
];

export function QuickFleetCostBenchmark({
  companyName: propCompanyName = "Independent Diagnostic Specialist",
  city: propCity,
  truth,
}: QuickFleetCostBenchmarkProps) {
  const companyName = truth?.companyName || propCompanyName;
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;

  const [selectedScenario, setSelectedScenario] = useState<RepairScenario>(SCENARIOS[0]);

  const savings = selectedScenario.dealerPrice - selectedScenario.specialistPrice;
  const savingsPercent = Math.round((savings / selectedScenario.dealerPrice) * 100);

  return (
    <section id="cost-benchmark" className="qf-cost">
      <div className="qf-cost__in">
        {/* Left Column: Visual Stack Comparison & Interactive Metrics */}
        <div className="bg-[#E9F3EF] rounded-3xl p-6 sm:p-9 border border-[rgba(10,153,125,0.18)] shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,153,125,0.18)] font-mono text-xs">
            <span className="text-[#0C0730]/60 font-semibold uppercase tracking-wider">
              {truth ? truth.costBenchmark.label : (hasCity ? `Diagnostic & Repair Benchmark · ${city}` : "Diagnostic & Repair Benchmark")}
            </span>
            <span className="text-[#0A997D] font-bold">50%+ AVERAGE SAVINGS</span>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap gap-2 my-5">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all border ${
                  selectedScenario.id === scenario.id
                    ? "bg-[#0C0730] text-white border-[#0C0730] shadow-sm"
                    : "bg-white/80 text-[#0C0730]/80 border-transparent hover:border-slate-300"
                }`}
              >
                {scenario.name.split(" ")[0]} {scenario.name.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Side-by-Side Visual Metric Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {/* Dealer Column */}
            <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-red-500/15">
              <div className="font-mono text-[11px] text-slate-500 flex items-center justify-between">
                <span>FRANCHISE DEALERSHIP</span>
                <X className="w-3.5 h-3.5 text-red-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0C0730] mt-2 font-mono">
                ${selectedScenario.dealerPrice.toLocaleString()}
              </div>
              <div className="text-xs text-red-600 font-mono mt-1 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{selectedScenario.dealerDays} backlog</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>$265 / hr labor rate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Parts-cannon assembly swaps</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>1-Yr limited dealer warranty</span>
                </div>
              </div>
            </div>

            {/* Specialist Column */}
            <div className="bg-[#0C0730] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-white/10 relative overflow-hidden">
              <div className="font-mono text-[11px] text-[#6FD9C1] flex items-center justify-between">
                <span>{companyName.toUpperCase().slice(0, 14)}</span>
                <Check className="w-3.5 h-3.5 text-[#6FD9C1]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mt-2 font-mono">
                ${selectedScenario.specialistPrice.toLocaleString()}
              </div>
              <div className="text-xs text-[#6FD9C1] font-mono mt-1 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{selectedScenario.specialistDays} turnaround</span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6FD9C1] font-bold">✓</span>
                  <span>$165 / hr flat rate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6FD9C1] font-bold">✓</span>
                  <span>Component-level lab diagnosis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6FD9C1] font-bold">✓</span>
                  <span>{truth ? truth.warranty.term : "Written Parts & Labor Guarantee"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Callout */}
          <div className="p-3 bg-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[rgba(10,153,125,0.2)] text-xs font-mono">
            <div>
              <span className="text-slate-500 block">TOTAL DIRECT SAVINGS</span>
              <span className="text-sm font-bold text-[#0A997D]">
                ${savings.toLocaleString()} saved ({savingsPercent}%)
              </span>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-500 block">TIME RETURNED</span>
              <span className="text-sm font-bold text-[#0C0730]">
                Up to 3 weeks faster
              </span>
            </div>
          </div>

          {/* Industry Benchmark Transparency Disclaimer */}
          <div className="mt-4 p-3.5 rounded-xl bg-white/70 border border-[rgba(10,153,125,0.2)] text-[11px] text-[#0C0730]/75 leading-relaxed font-sans">
            <strong className="text-[#0C0730] font-semibold block mb-0.5">
              {truth?.costBenchmark.label || "Industry Benchmark Disclaimer"}:
            </strong>
            {truth?.costBenchmark.disclaimer ||
              "Benchmark metrics reflect independent industry diagnostic averages vs. typical authorized dealer list pricing. Binding upfront quotes are provided directly to the vehicle owner prior to work commencing."}
          </div>
        </div>

        {/* Right Column: Editorial Copy & Logic */}
        <div className="flex flex-col items-start">
          <span className="qf-eyebrow">
            <i>05</i>
            <span>Cost Transparency</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0C0730] tracking-[-0.028em] mt-5 leading-tight max-w-[14ch]">
            Dealership markup vs. precision independent.
          </h2>

          <p className="text-base sm:text-[17px] text-[#0C0730]/75 leading-relaxed mt-6 max-w-[44ch]">
            <b>Why pay for dealership marble lobbies and service advisor commissions?</b> We
            invest directly into OEM diagnostic tooling and master-certified talent, diagnosing
            vehicles accurately in hours rather than leaving them in dealer backlogs for weeks.
          </p>

          <div className="mt-8 space-y-3 font-sans text-sm text-[#0C0730]/85">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#0A997D]/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#0A997D]" />
              </div>
              <span>
                <strong>Itemized Digital Estimates:</strong> Every line item approved via phone
                with zero surprise shop supply surcharges.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#0A997D]/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#0A997D]" />
              </div>
              <span>
                <strong>No Parts Guesswork:</strong> We verify failing components with
                oscilloscope waveforms, never replacing healthy assemblies.
              </span>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#book-intake"
              className="qf-control qf-control--ink text-sm font-medium"
            >
              <span>Book Diagnostic Intake</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
