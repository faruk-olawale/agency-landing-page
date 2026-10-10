"use client";

import React from "react";
import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetFooterProps {
  companyName?: string;
  city?: string;
  phone?: string;
  cleanPhone?: string;
  primaryColor?: string;
  truth?: AutomotiveTruth;
}

export function QuickFleetFooter({
  companyName: propCompanyName = "Independent Diagnostic Specialist",
  city: propCity,
  phone: propPhone,
  cleanPhone: propCleanPhone,
  primaryColor = "#0A997D",
  truth,
}: QuickFleetFooterProps) {
  const companyName = truth?.companyName || propCompanyName;
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;
  const hasPhone = truth ? truth.hasPhone : Boolean(propCleanPhone && propCleanPhone.length >= 7);
  const phone = truth?.phone || propPhone;
  const cleanPhone = truth?.cleanPhone || propCleanPhone;

  // Strictly enforce QuickFleet teal and eliminate any orange
  const safeColor =
    !primaryColor ||
    primaryColor.toLowerCase().includes("f97316") ||
    primaryColor.toLowerCase().includes("ea580c") ||
    primaryColor.toLowerCase().includes("d97706") ||
    primaryColor.toLowerCase().includes("orange")
      ? "#0A997D"
      : primaryColor;

  return (
    <footer className="bg-[#0C0730] text-white/70 border-t border-white/10 py-12 px-4 sm:px-8 font-sans text-xs">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <a
            href="#top"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label={`${companyName} back to top`}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <svg
                className="w-9 h-9"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill={safeColor} />
                <path
                  d="M12.5 19.5C12.5 15.634 15.634 12.5 19.5 12.5C23.366 12.5 26.5 15.634 26.5 19.5C26.5 23.366 23.366 26.5 19.5 26.5H13.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 16.5L12 19.5L15.5 22.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-sm group-hover:text-[#6FD9C1] transition-colors">
                {companyName}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Precision Automotive Diagnostics{hasCity ? ` · ${city}` : ""}
              </div>
            </div>
          </a>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
            <a href="#facility" className="hover:text-white transition-colors">
              The Facility
            </a>
            <a href="#tooling" className="hover:text-white transition-colors">
              Diagnostic Bays
            </a>
            <a href="#service-record" className="hover:text-white transition-colors">
              Service Record
            </a>
            <a href="#cost-benchmark" className="hover:text-white transition-colors">
              Cost Benchmark
            </a>
            {hasPhone ? (
              <a href={`tel:${cleanPhone}`} className="text-[#6FD9C1] hover:underline">
                Bay Hotline: {phone}
              </a>
            ) : (
              <a href="#book-intake" className="text-[#6FD9C1] hover:underline">
                Book Intake
              </a>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>
              {truth ? truth.technicians.footerCertTag : "OEM FACTORY DIAGNOSTIC PROTOCOLS"}
            </span>
            <span>•</span>
            <span>
              {truth ? truth.warranty.footerTag : "WRITTEN REPAIR WARRANTY"}
            </span>
            <span>
              {truth?.isDemoMode ? "SAMPLE DIGITAL WORKFLOW" : "DIGITAL INSPECTION WORKFLOW"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default QuickFleetFooter;
