"use client";

import React from "react";
import { DollarSign, Clock, ShieldCheck, Check } from "lucide-react";

interface QuickFleetWhyMattersProps {
  city: string;
}

export function QuickFleetWhyMatters({ city }: QuickFleetWhyMattersProps) {
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
            Transparent quotes. 48-hour turnarounds.
          </h2>
          <p className="text-base sm:text-[17px] text-[#0C0730]/75 leading-relaxed mt-5">
            <b>Three standards we guarantee on every vehicle,</b> whether you drive a precision
            German track car, a family luxury SUV, or manage a local commercial fleet in {city}.
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
            <h3 className="text-xl font-bold text-[#0C0730] mt-3">The 24-48h Turnaround</h3>
            <p className="text-sm text-[#0C0730]/75 leading-relaxed mt-3 flex-1">
              Bays managed with flight-line discipline. Most drivability faults diagnosed within
              90 minutes and back on the road within 24 to 48 hours.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs text-[#0A997D] font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Dedicated Technician Bay SLA</span>
            </div>
          </li>

          {/* Card 3: The Warranty */}
          <li className="qf-hc__card">
            <div className="qf-hc__ic">
              <ShieldCheck className="w-5 h-5 text-[#6FD9C1]" />
            </div>
            <h3 className="text-xl font-bold text-[#0C0730] mt-3">3-Yr / 36k-Mi Warranty</h3>
            <p className="text-sm text-[#0C0730]/75 leading-relaxed mt-3 flex-1">
              Every precision repair backed by our written 36-month, 36,000-mile nationwide warranty
              covering OEM replacement parts and certified master labor.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs text-[#0A997D] font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>100% Nationwide Protection</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
