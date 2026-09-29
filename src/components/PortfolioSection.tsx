"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import DemoModal, { DemoItem } from "./DemoModal";

export default function PortfolioSection() {
  const [selectedDemo, setSelectedDemo] = useState<DemoItem | null>(null);

  const demoItems: DemoItem[] = [
    {
      id: "home-service",
      title: "Home Service Template",
      category: "HVAC, Plumbing & Electrical Contractors",
      description:
        "Engineered for high emergency call conversions, tap-to-call mobile ergonomics, 5-star Google review integration, and sub-second dispatch inquiries.",
      imageSrc: "/images/home_service_template.jpg",
      metrics: {
        lighthouse: 100,
        fcp: "0.28s",
        lcp: "0.45s",
        tbt: "0ms",
        cls: "0.00",
      },
      highlights: [
        "1-Click Emergency Calling Bar",
        "Interactive Service Estimate Widget",
        "Google Business Profile Sync",
      ],
    },
    {
      id: "professional-clinic",
      title: "Professional Clinic Template",
      category: "Dental, Wellness & Medical Practices",
      description:
        "Designed to build instant patient trust, showcase board-certified practitioners, and offer zero-friction appointment booking that converts traffic into booked visits.",
      imageSrc: "/images/clinic_template.jpg",
      metrics: {
        lighthouse: 100,
        fcp: "0.31s",
        lcp: "0.48s",
        tbt: "0ms",
        cls: "0.00",
      },
      highlights: [
        "Frictionless Appointment Scheduler",
        "Doctor Credentials & Bios",
        "HIPAA-Compliant Patient Inquiry Flow",
      ],
    },
  ];

  const handleScrollToContact = () => {
    const el = document.getElementById("mockup-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Performance Benchmarks
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            See the Speed for Yourself
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Click into our live demos below to test real mobile performance, clean UX, and 100/100 Google Core Web Vitals scores.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {demoItems.map((demo) => (
            <div
              key={demo.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Placeholder / Visual Preview Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <Image
                    src={demo.imageSrc}
                    alt={demo.title}
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />

                  {/* Lighthouse 100 Guarantee Overlay Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2 shadow-md">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center">
                      100
                    </div>
                    <span className="text-xs font-bold tracking-tight text-slate-100">
                      PageSpeed Verified
                    </span>
                  </div>

                  {/* Sub-second load badge */}
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-md">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>{demo.metrics.fcp}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {demo.category}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {demo.title}
                  </h3>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {demo.description}
                  </p>

                  {/* Key points */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                    {demo.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer / Button */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <button
                  onClick={() => setSelectedDemo(demo)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover/btn:text-white transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Demo Callout */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            Don’t see your exact industry? We build custom tailored designs for roofing, law firms, auto detailing, accountants, and more.{" "}
            <button
              onClick={handleScrollToContact}
              className="text-slate-900 font-bold underline hover:text-emerald-700 cursor-pointer"
            >
              Ask for an industry-specific preview →
            </button>
          </p>
        </div>
      </div>

      {/* Live Demo Modal */}
      <DemoModal
        demo={selectedDemo}
        onClose={() => setSelectedDemo(null)}
        onRequestMockup={handleScrollToContact}
      />
    </section>
  );
}
