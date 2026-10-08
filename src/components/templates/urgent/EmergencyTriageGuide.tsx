"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Wrench,
  ArrowRight,
  Clock,
  HelpCircle,
} from "lucide-react";

interface EmergencyTriageGuideProps {
  industryNoun: string;
  city: string;
  companyName: string;
  phone: string;
  primaryColor?: string;
}

export function EmergencyTriageGuide({
  industryNoun,
  city,
  companyName,
  phone,
  primaryColor = "#0284C7",
}: EmergencyTriageGuideProps) {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const [selectedEmergency, setSelectedEmergency] = useState<number>(0);

  const emergencyScenarios = [
    {
      id: "burst-pipe",
      label: "Burst Pipe or Major Leak",
      icon: Droplets,
      severity: "CRITICAL ACTION REQUIRED",
      immediateAction:
        "Locate your main water shut-off valve (usually near your water meter or under the kitchen sink) and turn it fully clockwise. Switch off electricity at your breaker box if water is near fixtures.",
      technicianResponse:
        "Our emergency response truck arrives equipped with commercial pipe-freezing clamps, PEX replacement lines, and moisture extraction tools to stop flooding within minutes.",
      typicalArrival: "15 - 25 Minutes",
    },
    {
      id: "blocked-drain",
      label: "Overflowing Toilet or Sewer Backup",
      icon: AlertTriangle,
      severity: "HEALTH & SANITATION HAZARD",
      immediateAction:
        "Do not flush the toilet or run any sinks, washing machines, or showers. If an exterior sewer overflow relief gully (ORG) is outside, check if water is escaping there.",
      technicianResponse:
        "We deploy commercial high-pressure water jetters and CCTV drain cameras to locate the tree root intrusion or blockage and clear the line with zero excavation.",
      typicalArrival: "20 - 30 Minutes",
    },
    {
      id: "hot-water",
      label: "No Hot Water or Leaking Tank",
      icon: Flame,
      severity: "SAME-DAY REPLACEMENT",
      immediateAction:
        "If water is pooling around your hot water tank base, turn off the cold water isolation valve on the side of the unit. Do not attempt to reignite pilot lights if you smell gas.",
      technicianResponse:
        "We carry emergency temporary hot water systems and carry top brand replacements (Rheem, Rinnai, Dux) on our trucks for immediate same-day changeover.",
      typicalArrival: "Same-Day Priority",
    },
    {
      id: "general-repair",
      label: "Gas Odor or Unknown Pipe Noise",
      icon: Wrench,
      severity: "IMMEDIATE SAFETY PROTOCOL",
      immediateAction:
        "If you smell gas (rotten egg odor), turn off the main gas valve at your gas meter immediately. Open all windows, extinguish naked flames, and do not switch any lights or electrical appliances on or off.",
      technicianResponse:
        "Certified gas-fitting specialists deploy digital combustible gas sniffers and pressure testing manometers to pinpoint and isolate the leak safely.",
      typicalArrival: "Urgent Priority (< 20 Mins)",
    },
  ];

  const current = emergencyScenarios[selectedEmergency];
  const CurrentIcon = current.icon;

  return (
    <section
      aria-label="Emergency Diagnostic and Triage Guide"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Emergency Triage Protocol</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            What To Do Right Now While Our Team Dispatches
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Select your emergency below for immediate damage-prevention instructions.
            Our on-duty technicians in {city} are on call 24 hours a day.
          </p>
        </div>

        {/* 2-Column Interactive Triage Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Scenario Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-200 bg-slate-50/70">
            {emergencyScenarios.map((scenario, idx) => {
              const Icon = scenario.icon;
              const isSelected = selectedEmergency === idx;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setSelectedEmergency(idx)}
                  className={`p-4 sm:p-5 text-left transition-all flex items-center gap-3 border-r last:border-r-0 border-slate-200 cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-xs border-b-2 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                  style={{
                    borderBottomColor: isSelected ? primaryColor : "transparent",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isSelected ? `${primaryColor}15` : "#F1F5F9",
                      color: isSelected ? primaryColor : "#64748B",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm leading-snug line-clamp-2">
                    {scenario.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scenario Action Plan Display */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Immediate Safety Steps */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {current.severity}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Est. Arrival: {current.typicalArrival}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Step 1: Immediate Damage Control
                  </h3>
                </div>

                <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/80 text-sm text-slate-800 leading-relaxed flex items-start gap-3.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p>{current.immediateAction}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Step 2: How {companyName} Resolves It
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {current.technicianResponse}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No Callout Surcharges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Upfront Fixed Quote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Licensed Master Trades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Cleanup Included</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Dispatch Hotline Card */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-white/10 text-white">
                  <Phone className="w-6 h-6" />
                </div>

                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                  On-Duty Emergency Team Available
                </span>

                <h4 className="text-xl font-bold text-white mb-2">
                  Dispatch a Master {industryNoun} in {city}
                </h4>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Direct connection to local technicians. We confirm our exact arrival window before leaving the depot.
                </p>

                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-white text-base transition-all hover:brightness-110 active:scale-98 shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call {phone}</span>
                </a>

                <p className="text-[11px] text-slate-500 mt-3">
                  Average response time: 24 minutes in the {city} metropolitan area
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyTriageGuide;
