"use client";

import React from "react";
import { Star, ShieldCheck } from "lucide-react";
import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetReviewsProps {
  city?: string;
  truth?: AutomotiveTruth;
}

export function QuickFleetReviews({ city: propCity, truth }: QuickFleetReviewsProps) {
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;
  const reviewsList = truth?.reviews.caseStudies;

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
              {truth?.reviews.isIllustrative
                ? `Representative diagnostic case scenarios${hasCity ? ` in ${city}` : ""}.`
                : `Verified diagnostic case studies${hasCity ? ` in ${city}` : ""}.`}
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#0A997D] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {truth
                ? truth.reviews.headerBadge
                : "REPRESENTATIVE DIAGNOSTIC CASE STUDIES"}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviewsList &&
            reviewsList.map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[rgba(12,7,48,0.08)] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#0C0730]/80 leading-relaxed italic mb-4">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 font-mono text-[11px]">
                  <div className="font-bold text-[#0C0730] font-sans">
                    {rev.author}
                  </div>
                  <div className="text-[#0A997D] truncate font-medium">
                    {rev.vehicle}
                  </div>
                  <div className="text-slate-500 text-[10px] mt-0.5">
                    {rev.repair}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default QuickFleetReviews;
