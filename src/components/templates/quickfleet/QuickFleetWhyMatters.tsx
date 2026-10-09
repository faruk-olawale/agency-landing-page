"use client";

import React from "react";
import { DollarSign, Clock, ShieldCheck, Check } from "lucide-react";
import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetWhyMattersProps {
  city?: string;
  truth?: AutomotiveTruth;
}

export function QuickFleetWhyMatters({ city: propCity, truth }: QuickFleetWhyMattersProps) {
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;

  return (
    <section id="why-it-matters" className="qf-hc">
      <div className="qf-hc__in">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="qf-eyebrow">
            <i>06</i>
            <span>Why It Matters</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#0C0730] tracking-[-0.028em] mt-5 leading-tight">
            {truth ? truth.turnaround.headline : "Transparent estimates. Expedited diagnostic triage."}
          </h2>
          <p className="text-base sm:text-[17px] text-[#0C0730]/75 leading-relaxed mt-5">
            <b>Three standards we guarantee on every vehicle,</b> whether you drive a precision
            German track car, a family luxury SUV, or manage a commercial fleet{hasCity ? ` in ${city}` : ""}.
          </p>
        </div>

        {/* 3 Value Proposition Cards */}
        <ul className="qf-hc__row">
          {/* Card 1: The Upfront Estimate */}
          <li className="qf-hc__card">
            <div className="qf-hc__ic">
              <DollarSign className="w-5 h-5 text-[#6FD9C1]" />
            </div>
            <h3 className="text-xl font-bold text-[#0C0730] mt-3">The Upfront Estimate</h3>
            <p className="text-sm text-[#0C0730]/75 leading-relaxed mt-3 flex-1">
              Binding, itemized pricing sent directly to your phone before any wrench turns. No
              hidden shop supply surcharges or unexpected dealership line items.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs text-[#0A997D] font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Zero Unapproved Work</span>
            </div>
          </li>

          {/* Card 2: The Turnaround */}
          <li className="qf-hc__card">
            <div className="qf-hc__ic">
              <Clock className="w-5 h-5 text-[#6FD9C1]" />
            </div>
            <h3 className="text-xl font-bold text-[#0C0730] mt-3">
              {truth ? truth.turnaround.badge : "Expedited Diagnostic Triage"}
            </h3>
            <p className="text-sm text-[#0C0730]/75 leading-relaxed mt-3 flex-1">
              {truth
                ? truth.turnaround.detail
                : "Most drivability faults diagnosed and scanned on same-day intake, with repairs scheduled transparently according to OEM parts availability."}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs text-[#0A997D] font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>{truth ? truth.turnaround.intakeSLA : "Same-Day Diagnostic Triage"}</span>
            </div>
          </li>

          {/* Card 3: The Warranty */}
          <li className="qf-hc__card">
            <div className="qf-hc__ic">
              <ShieldCheck className="w-5 h-5 text-[#6FD9C1]" />
            </div>
            <h3 className="text-xl font-bold text-[#0C0730] mt-3">
              {truth ? truth.warranty.term : "Written Repair Warranty"}
            </h3>
            <p className="text-sm text-[#0C0730]/75 leading-relaxed mt-3 flex-1">
              {truth
                ? truth.warranty.detail
                : "Every precision mechanical and diagnostic repair is backed by our written limited warranty on qualifying OEM replacement parts and labor."}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs text-[#0A997D] font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>{truth ? truth.warranty.badge : "Written Parts & Labor Guarantee"}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default QuickFleetWhyMatters;
