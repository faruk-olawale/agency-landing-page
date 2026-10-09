"use client";

import React from "react";
import { Wrench } from "lucide-react";

interface QuickFleetFooterProps {
  companyName: string;
  city: string;
  phone: string;
  cleanPhone: string;
}

export function QuickFleetFooter({
  companyName,
  city,
  phone,
  cleanPhone,
}: QuickFleetFooterProps) {
  return (
    <footer className="bg-[#0C0730] text-white/70 border-t border-white/10 py-12 px-4 sm:px-8 font-sans text-xs">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0A997D] flex items-center justify-center text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{companyName}</div>
              <div className="text-[11px] font-mono text-slate-400">
                Precision Automotive Diagnostics · {city}
              </div>
            </div>
          </div>

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
            <a href={`tel:${cleanPhone}`} className="text-[#6FD9C1] hover:underline">
              Bay Hotline: {phone}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved. Built with OEM factory diagnostic protocols.
          </div>
          <div className="flex items-center gap-4">
            <span>ASE L1 MASTER CERTIFIED</span>
            <span>•</span>
            <span>BOSCH AUTHORIZED</span>
            <span>•</span>
            <span>3-YR / 36K WARRANTY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
