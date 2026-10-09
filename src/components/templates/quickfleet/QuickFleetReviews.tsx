"use client";

import React from "react";
import { Star, ShieldCheck } from "lucide-react";

interface QuickFleetReviewsProps {
  city: string;
}

const REVIEWS = [
  {
    author: "Marcus Vance",
    vehicle: "Verified BMW M3 Competition Owner",
    repair: "ECU Sensor Telemetry",
    quote:
      "Dealer quoted $4,200 and a 3-week wait to diagnose an erratic limp-mode fault. The master techs here connected their OEM lab scope, pinpointed a dropped ground wire within 45 minutes, and had it resolved next morning.",
  },
  {
    author: "Elena Rostova",
    vehicle: "Verified Porsche Macan GTS Owner",
    repair: "PDK Transmission Telemetry",
    quote:
      "PDK transmission was throwing clutch slip codes. Dealership said replace whole gearbox for $16k. They ran hydraulic line-pressure tests, rebuilt the valve body solenoid pack, and saved me over $8,500. True engineering specialists.",
  },
  {
    author: "David Sterling",
    vehicle: "Verified Audi RS6 Avant Owner",
    repair: "Bore Scope & Timing Chain",
    quote:
      "Cam timing deviation codes. They provided digital bore scope photos and live timing stretch measurements before turning a single bolt. Dealer wanted 4 weeks; apex had it dialed in 48 hours.",
  },
  {
    author: "Julian K.",
    vehicle: "Verified Mercedes-AMG C63 Owner",
    repair: "High-Pressure Fuel System",
    quote:
      "Direct technician video walkthrough sent straight to my phone. Approved the fuel rail sensor replacement in one tap. Zero guesswork, fair flat rate, and backed by a 3-year warranty.",
  },
];

export function QuickFleetReviews({ city }: QuickFleetReviewsProps) {
  return (
    <section className="py-16 sm:py-20 border-y border-[rgba(12,7,48,0.06)] bg-white/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="qf-eyebrow">
              <i>07</i>
              <span>Customer Verification</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#0C0730] tracking-[-0.028em] mt-3">
              Verified repair orders in {city}.
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#0A997D] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>4.98 / 5.0 RATING · AUDITED SERVICE ORDERS</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-[rgba(12,7,48,0.08)] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-[#0C0730]/80 leading-relaxed italic mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 font-mono text-[11px]">
                <div className="font-bold text-[#0C0730] font-sans">{rev.author}</div>
                <div className="text-[#0A997D] truncate font-medium">{rev.vehicle}</div>
                <div className="text-slate-500 text-[10px] mt-0.5">{rev.repair}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
