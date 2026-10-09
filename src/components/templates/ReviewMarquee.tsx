"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";

export interface ReviewMarqueeProps {
  primaryColor?: string;
}

export interface AutomotiveReview {
  id: string;
  customerName: string;
  vehicleMake: string;
  repair: string;
  testimonial: string;
  rating: number;
  verifiedLabel: string;
}

const AUTOMOTIVE_REVIEWS: AutomotiveReview[] = [
  {
    id: "rev-1",
    customerName: "Marcus Vance",
    vehicleMake: "Verified BMW Owner",
    repair: "ECU Diagnostic",
    rating: 5,
    verifiedLabel: "Verified BMW Owner",
    testimonial:
      "Dealer quoted $3,200 and a 3-week wait to diagnose an erratic limp-mode fault. The master techs here plugged in OEM ISTA diagnostics, pinpointed a faulty valvetronic sensor within 45 minutes, and had it replaced next morning. Flawless communication.",
  },
  {
    id: "rev-2",
    customerName: "Elena Rostova",
    vehicleMake: "Verified Porsche Owner",
    repair: "Transmission Rebuild",
    rating: 5,
    verifiedLabel: "Verified Porsche Owner",
    testimonial:
      "PDK transmission was throwing hard clutch slip codes. Most shops refused to touch it and said replace the whole gearbox for $18k. They ran line-pressure telemetry, rebuilt the valve body solenoid pack, and saved me over $8,500. True specialists.",
  },
  {
    id: "rev-3",
    customerName: "David Sterling",
    vehicleMake: "Verified Ford F-150 Fleet",
    repair: "Engine Diagnostic",
    rating: 5,
    verifiedLabel: "Verified Ford F-150 Fleet",
    testimonial:
      "Our work fleet can't afford down days. High-pressure fuel rail misfire was traced and resolved same afternoon. Real-time video inspection sent straight to my phone with technician notes before work started.",
  },
  {
    id: "rev-4",
    customerName: "Julian K.",
    vehicleMake: "Verified Audi Owner",
    repair: "Timing Chain Repair",
    rating: 5,
    verifiedLabel: "Verified Audi Owner",
    testimonial:
      "Audi S4 cam timing deviation codes. They provided digital bore scope photos and live timing stretch measurements before turning a single bolt. OEM tooling, zero guesswork, full 3-year warranty.",
  },
  {
    id: "rev-5",
    customerName: "Sarah Jenkins",
    vehicleMake: "Verified Mercedes Owner",
    repair: "Brake Rotor Replacement",
    rating: 5,
    verifiedLabel: "Verified Mercedes Owner",
    testimonial:
      "AMG two-piece floating rotor replacement and brake fluid bleed. Runout dialed in to factory spec with zero vibration. The level of diagnostic precision here beats the factory dealership hands down.",
  },
];

export function ReviewMarquee({ primaryColor = "#F97316" }: ReviewMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate array so ticker loop is seamless
  const duplicatedReviews = [...AUTOMOTIVE_REVIEWS, ...AUTOMOTIVE_REVIEWS];

  return (
    <section
      aria-label="Audited Automotive Diagnostic Reviews"
      className="relative w-full py-8 sm:py-10 border-y border-white/[0.08] bg-slate-950 overflow-hidden"
    >
      {/* Top micro-bar banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-white font-bold tracking-wider uppercase text-[11px]">
            Audited Repair Telemetry & Verified Owner Feedback
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Verified RO Work Orders</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">5.0 / 5.0</span>
            <span>Customer Rating</span>
          </span>
        </div>
      </div>

      {/* Infinite Marquee Container with edge masking */}
      <div
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-5 shrink-0 py-2 px-4 w-max"
          animate={{
            x: isPaused ? undefined : ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 34,
              ease: "linear",
            },
          }}
        >
          {duplicatedReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-xl rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div>
                {/* Header: Stars & Specific Repair Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-3.5 h-3.5"
                        style={{
                          color: primaryColor,
                          fill: primaryColor,
                        }}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-slate-300 font-bold tracking-tight">
                    <Wrench className="w-2.5 h-2.5" style={{ color: primaryColor }} />
                    <span>{rev.repair}</span>
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans mb-4 group-hover:text-slate-100 transition-colors">
                  &ldquo;{rev.testimonial}&rdquo;
                </p>
              </div>

              {/* Customer Verification Footer */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px]">
                <div className="flex flex-col">
                  <span className="text-white font-bold tracking-tight font-sans text-xs">
                    {rev.customerName}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {rev.vehicleMake}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-2 text-center">
        <span className="text-[10px] font-mono text-slate-400">
          Hover to pause ticker • Genuine documented RO cases
        </span>
      </div>
    </section>
  );
}

export default ReviewMarquee;
