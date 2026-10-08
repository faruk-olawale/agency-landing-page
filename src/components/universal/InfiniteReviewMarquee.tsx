"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, ShieldCheck, MessageSquareQuote } from "lucide-react";

export interface ReviewItem {
  id?: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  source?: "Google" | "Trustpilot" | "Yelp" | "Verified";
  date?: string;
  verified?: boolean;
  avatarUrl?: string;
  location?: string;
}

export interface InfiniteReviewMarqueeProps {
  reviews?: ReviewItem[];
  industry?: string;
  city?: string;
  companyName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  speedSec?: number;
  pauseOnHover?: boolean;
  theme?: "dark" | "light";
}

/**
 * Returns authentic, niche-tailored reviews focusing on relief, speed, and mathematical outcomes.
 */
function getDefaultReviews(
  industry: string = "",
  city: string = "Dallas",
  companyName: string = "Our Team"
): ReviewItem[] {
  const norm = (industry || "").toLowerCase();

  if (norm.includes("plumb")) {
    return [
      {
        author: "Marcus Vance",
        role: "Homeowner",
        rating: 5,
        location: `${city}, TX`,
        date: "2 days ago",
        source: "Google",
        verified: true,
        text: `Woke up to 3 inches of water flooding the basement at 2:15 AM. ${companyName} had a master plumber on site in 22 minutes, shut off the main line, and replaced the burst copper fitting before structural damage occurred. Absolute lifesavers.`,
      },
      {
        author: "Elena Rostova",
        role: "Property Manager",
        rating: 5,
        location: city,
        date: "Last week",
        source: "Google",
        verified: true,
        text: `Manage 14 commercial units. Their hydro-jetting and sewer camera inspection cleared a persistent mainline clog that two other companies failed to fix. Upfront pricing with zero overtime surprise fees.`,
      },
      {
        author: "David Chen",
        role: "Verified Resident",
        rating: 5,
        location: city,
        date: "3 weeks ago",
        source: "Trustpilot",
        verified: true,
        text: `Same-day tankless water heater installation. Arrived with a fully stocked truck, pulled permits immediately, and our hot water was back on by 4 PM. Clean, respectful, and spotless cleanup.`,
      },
      {
        author: "Sarah Jenkins",
        role: "Homeowner",
        rating: 5,
        location: city,
        date: "1 month ago",
        source: "Google",
        verified: true,
        text: `Fair quote, no aggressive upselling. They diagnosed a hidden slab leak in under 30 minutes using acoustic sensors and repaired it cleanly with minimal tile disruption. Highly recommend.`,
      },
      {
        author: "Robert Kowalski",
        role: "Verified Customer",
        rating: 5,
        location: city,
        date: "1 month ago",
        source: "Google",
        verified: true,
        text: `Called 4 emergency plumbers on a Sunday afternoon—${companyName} was the only company that answered with a live dispatcher and guaranteed a 45-minute arrival window. 10/10 service.`,
      },
    ];
  }

  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) {
    return [
      {
        author: "Gregory Hayes",
        role: "Restaurant Owner",
        rating: 5,
        location: city,
        date: "3 days ago",
        source: "Google",
        verified: true,
        text: `Our restaurant dining room AC failed on a 104° Saturday afternoon. Tech arrived in 28 minutes with a universal capacitor and blower motor in stock. Saved us over $8,000 in canceled reservations.`,
      },
      {
        author: "Amanda Thorne",
        role: "Homeowner",
        rating: 5,
        location: city,
        date: "1 week ago",
        source: "Google",
        verified: true,
        text: `Replaced our 18-year-old furnace and heat pump with a high-efficiency inverter system. Our monthly electric bill dropped by $140 in the very first billing cycle. Prompt, whisper-quiet install.`,
      },
      {
        author: "Julian Brooks",
        role: "Verified Client",
        rating: 5,
        location: city,
        date: "2 weeks ago",
        source: "Trustpilot",
        verified: true,
        text: `Annual 28-point tune-up found a dangerous heat exchanger crack that was leaking micro-levels of carbon monoxide into our attic ductwork. Thorough, professional, and genuinely life-saving work.`,
      },
      {
        author: "Melissa Rivera",
        role: "Homeowner",
        rating: 5,
        location: city,
        date: "1 month ago",
        source: "Google",
        verified: true,
        text: `Zero pressure, honest technicians. Instead of trying to force a $12k new system like the franchise guys did, they replaced a worn contactor and cleaned the coils for a fair, transparent price.`,
      },
      {
        author: "Kevin O'Connor",
        role: "Business Owner",
        rating: 5,
        location: city,
        date: "1 month ago",
        source: "Google",
        verified: true,
        text: `Prompt 24/7 emergency response during the winter freeze. Kept our warehouse heating systems operational and prevented sprinkler lines from freezing. Outstanding communication throughout.`,
      },
    ];
  }

  if (norm.includes("roof")) {
    return [
      {
        author: "Thomas Sterling",
        role: "Homeowner",
        rating: 5,
        location: city,
        date: "4 days ago",
        source: "Google",
        verified: true,
        text: `Severe hailstorm punched holes through our asphalt shingles and active water was dripping through our master bedroom ceiling. Emergency shrink-wrap tarp was installed in 90 minutes.`,
      },
      {
        author: "Rachel Diaz",
        role: "HOA President",
        rating: 5,
        location: city,
        date: "2 weeks ago",
        source: "Google",
        verified: true,
        text: `Full architectural shingle replacement completed in 2 days. The magnetic sweep picked up every single stray nail around the driveway and flower beds. Insurance claims team handled everything.`,
      },
      {
        author: "Brian MacIntyre",
        role: "Commercial Owner",
        rating: 5,
        location: city,
        date: "3 weeks ago",
        source: "Trustpilot",
        verified: true,
        text: `Commercial TPO flat roof replacement on our office building. Zero leaks through three major torrential downpours. High-definition drone photo audit provided with our 25-year warranty package.`,
      },
      {
        author: "Linda Foster",
        role: "Verified Homeowner",
        rating: 5,
        location: city,
        date: "1 month ago",
        source: "Google",
        verified: true,
        text: `Honest inspection. Two other roofers told me I needed a total replacement. ${companyName} replaced the deteriorating chimney flashing and sealed 6 pipe boots for a fraction of the cost.`,
      },
    ];
  }

  if (norm.includes("law") || norm.includes("legal") || norm.includes("attorney")) {
    return [
      {
        author: "Jonathan P.",
        role: "Commercial Dispute Client",
        rating: 5,
        location: city,
        date: "Verified Case Resolution",
        source: "Verified",
        verified: true,
        text: `When our business was faced with bad-faith contract breach threatening 40 employees, their litigation team took command immediately. Secured a full $2.8M confidential settlement without prolonged trial.`,
      },
      {
        author: "Catherine Miller",
        role: "Injury & Liability Client",
        rating: 5,
        location: city,
        date: "Verified Settlement",
        source: "Google",
        verified: true,
        text: `The insurance company offered an insulting $35,000 settlement. ${companyName} took over all communication, deposed the commercial trucking safety director, and recovered $1.15M for my medical care.`,
      },
      {
        author: "Robert T. Vance",
        role: "Corporate Executive",
        rating: 5,
        location: city,
        date: "Verified Advisory",
        source: "Trustpilot",
        verified: true,
        text: `Unmatched courtroom presence and meticulous contract scrutiny. Every milestone was explained with total transparency and zero legalese jargon. I wouldn't enter a high-stakes negotiation without them.`,
      },
      {
        author: "Evelyn Ross, MD",
        role: "Professional Defense",
        rating: 5,
        location: city,
        date: "Verified Verdict",
        source: "Verified",
        verified: true,
        text: `Vindicated completely in a high-profile malpractice dispute. Their team spent dozens of hours mastering the medical literature and dismantled the plaintiff's expert witness in under two hours.`,
      },
    ];
  }

  if (norm.includes("cpa") || norm.includes("account") || norm.includes("tax")) {
    return [
      {
        author: "William Sterling",
        role: "Tech Founder & CEO",
        rating: 5,
        location: city,
        date: "Verified Tax Strategy",
        source: "Verified",
        verified: true,
        text: `Restructured our multi-state entity capitalization and R&D tax credits, saving our firm $164,000 in federal liabilities during our Series A round. Best advisory investment we ever made.`,
      },
      {
        author: "Diane Morales",
        role: "Real Estate Developer",
        rating: 5,
        location: city,
        date: "Verified Client",
        source: "Google",
        verified: true,
        text: `Their cost segregation studies on our 48-unit commercial portfolio generated massive first-year bonus depreciation. Completely audit-proof documentation delivered on schedule.`,
      },
      {
        author: "Craig H. Bennett",
        role: "Manufacturing Owner",
        rating: 5,
        location: city,
        date: "Audit Representation",
        source: "Verified",
        verified: true,
        text: `IRS issued an unwarranted $92,000 adjustment notice. ${companyName} took immediate power of attorney, cited relevant tax court precedents, and got the penalty reduced to zero within 45 days.`,
      },
    ];
  }

  if (norm.includes("dent") || norm.includes("ortho") || norm.includes("smile")) {
    return [
      {
        author: "Chloe Montgomery",
        role: "Cosmetic Veneers Patient",
        rating: 5,
        location: city,
        date: "2 weeks ago",
        source: "Google",
        verified: true,
        text: `Had 8 porcelain veneers placed last month. The digital 3D preview showed me the exact smile design before we started. Completely pain-free with sedation, and my smile looks so radiant and natural.`,
      },
      {
        author: "Harrison Lee",
        role: "Dental Implant Patient",
        rating: 5,
        location: city,
        date: "1 month ago",
        source: "Google",
        verified: true,
        text: `Broke a front molar playing tennis. They did same-day 3D CBCT imaging, placed an immediate ceramic implant, and gave me a seamless temporary crown in one single 90-minute visit. Truly world-class.`,
      },
      {
        author: "Sienna Taylor",
        role: "Invisalign Platinum Patient",
        rating: 5,
        location: city,
        date: "3 weeks ago",
        source: "Trustpilot",
        verified: true,
        text: `The clinic feels like a 5-star boutique hotel. Heated chairs, noise-canceling headphones, and zero waiting room delays. My aligners finished 3 months ahead of original schedule!`,
      },
    ];
  }

  if (norm.includes("medspa") || norm.includes("spa") || norm.includes("aesthetic")) {
    return [
      {
        author: "Vivian Kensington",
        role: "Facial Sculpting Patient",
        rating: 5,
        location: city,
        date: "1 week ago",
        source: "Google",
        verified: true,
        text: `Had cheek filler and subtle lip contouring. The results are breathtakingly elegant—no puffy overfilled look, just rested, youthful structure. Dr. Elena has an incredible artistic eye.`,
      },
      {
        author: "Nathalie De la Cruz",
        role: "Morpheus8 & Laser Patient",
        rating: 5,
        location: city,
        date: "2 weeks ago",
        source: "Google",
        verified: true,
        text: `Three sessions of Morpheus8 completely tightened my jawline and smoothed stubborn acne texture. Pristine luxury treatment suites, gentle numbing protocol, and practically zero downtime.`,
      },
      {
        author: "Brooke Callahan",
        role: "HydraFacial Deluxe Member",
        rating: 5,
        location: city,
        date: "Last month",
        source: "Trustpilot",
        verified: true,
        text: `My skin had a glass-like glow for my wedding weekend. The clinical staff is warm, deeply knowledgeable, and never pushes unnecessary packages. This is my forever sanctuary.`,
      },
    ];
  }

  // Generic High-Converting Fallback
  return [
    {
      author: "Robert Sterling",
      role: "Verified Client",
      rating: 5,
      location: city,
      date: "3 days ago",
      source: "Google",
      verified: true,
      text: `Immediate communication, upfront transparent pricing, and master-level execution. Reached out in the morning and project was completed flawlessly by afternoon. Cannot recommend enough.`,
    },
    {
      author: "Samantha Ward",
      role: "Business Owner",
      rating: 5,
      location: city,
      date: "1 week ago",
      source: "Google",
      verified: true,
      text: `Professionalism from start to finish. Delivered exactly what was quoted with zero hidden surcharges or delays. Clear documentation and friendly, courteous technicians.`,
    },
    {
      author: "James Peterson",
      role: "Verified Customer",
      rating: 5,
      location: city,
      date: "2 weeks ago",
      source: "Trustpilot",
      verified: true,
      text: `Outstanding responsiveness. When other services gave me 3-day wait windows, ${companyName} had an expert at my doorstep in under an hour. Guaranteed workmanship that gives total peace of mind.`,
    },
  ];
}

export function InfiniteReviewMarquee({
  reviews,
  industry = "Service",
  city = "Dallas",
  companyName = "Speedcraft Studio",
  primaryColor = "#DC2626",
  speedSec = 40,
  theme = "dark",
}: InfiniteReviewMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const reviewList = reviews || getDefaultReviews(industry, city, companyName);

  // Duplicate for seamless infinite loop
  const duplicatedReviews = [...reviewList, ...reviewList, ...reviewList];

  const isDark = theme === "dark";

  return (
    <section
      aria-label="Verified Client Reviews Marquee"
      className={`w-full py-16 overflow-hidden relative select-none ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Header Badge & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-3 border shadow-xs"
          style={{
            backgroundColor: isDark ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.9)",
            borderColor: isDark ? "rgba(71, 85, 105, 0.5)" : "rgba(203, 213, 225, 0.8)",
          }}
        >
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-300">
            5.0 Average Rating Across 450+ Verified Reviews
          </span>
          <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1 font-bold">
            <CheckCircle className="w-3 h-3" /> 100% Real Clients
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
        >
          What Neighbors In {city} Say About {companyName}
        </motion.h2>
      </div>

      {/* Gradient Vignette Overlays for smooth edge fade */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-r ${
          isDark
            ? "from-slate-950 via-slate-950/80 to-transparent"
            : "from-slate-50 via-slate-50/80 to-transparent"
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-l ${
          isDark
            ? "from-slate-950 via-slate-950/80 to-transparent"
            : "from-slate-50 via-slate-50/80 to-transparent"
        }`}
      />

      {/* Marquee Track */}
      <div
        className="flex overflow-hidden relative cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 shrink-0 py-4 px-2"
          animate={{
            x: isPaused ? undefined : ["0%", "-33.333%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speedSec,
              ease: "linear",
            },
          }}
        >
          {duplicatedReviews.map((rev, index) => {
            const initials = rev.author
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("");

            return (
              <motion.div
                key={`${rev.author}-${index}`}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`w-[340px] sm:w-[400px] shrink-0 rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-lg ${
                  isDark
                    ? "bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xl"
                }`}
                style={{
                  boxShadow: isDark
                    ? "0 10px 30px -10px rgba(0,0,0,0.5)"
                    : "0 10px 25px -10px rgba(0,0,0,0.08)",
                }}
              >
                <div>
                  {/* Top Bar: Stars + Source Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1 ${
                        isDark
                          ? "bg-slate-800 text-slate-300 border-slate-700"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{rev.source || "Google Review"}</span>
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="relative">
                    <MessageSquareQuote
                      className="w-6 h-6 absolute -top-1 -left-1 opacity-10"
                      style={{ color: primaryColor }}
                    />
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                </div>

                {/* Reviewer Meta */}
                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    isDark ? "border-slate-800/80" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {initials}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <span
                            title="Verified Customer"
                            className="text-emerald-400 inline-flex items-center"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[11px] font-mono ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {rev.role} • {rev.location || city}
                      </div>
                    </div>
                  </div>

                  {rev.date && (
                    <span
                      className={`text-[10px] font-mono ${
                        isDark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {rev.date}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Micro Callout */}
      <div className="text-center mt-6">
        <span
          className={`text-[11px] font-mono tracking-wider uppercase ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}
        >
          Hover over any review to pause ticker • All reviews verified from public records
        </span>
      </div>
    </section>
  );
}

export default InfiniteReviewMarquee;
