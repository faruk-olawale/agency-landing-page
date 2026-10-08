"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Radio,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  Truck,
  Send,
} from "lucide-react";

export interface LiveDispatchSimulationProps {
  industryNoun: string;
  city: string;
  companyName: string;
  phone: string;
  primaryColor?: string;
}

export function LiveDispatchSimulation({
  industryNoun,
  city,
  companyName,
  phone,
  primaryColor = "#DC2626",
}: LiveDispatchSimulationProps) {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // Simulated live minute ETA timer
  const [etaMins, setEtaMins] = useState(18);
  const [activeStep, setActiveStep] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMins((prev) => (prev > 14 ? prev - 1 : 18));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      aria-label="Live Emergency Dispatch Simulation"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden"
    >
      {/* Background radial beacon glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border shadow-sm"
            style={{
              backgroundColor: `${primaryColor}18`,
              borderColor: `${primaryColor}35`,
              color: primaryColor,
            }}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" style={{ color: primaryColor }} />
            <span>Active GPS Dispatch Engine</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Real-Time Live Dispatch Simulation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            When you call, you don&apos;t get put on hold by an overseas call center.
            Our direct-to-truck telemetry system pages the nearest licensed {industryNoun.toLowerCase()} in {city} within 60 seconds.
          </motion.p>
        </div>

        {/* 2-Column Interactive Dispatch Simulation Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Dispatch Metrics & Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-sm font-bold text-white">
                    {city} Dispatch Center Online
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Active Units: 4
                </span>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      1. Emergency Call Logged
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Zero wait time. Direct phone consultation with emergency dispatcher.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      2. GPS-Nearest Master Tech Paged
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Truck pre-loaded with universal OEM replacement components.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs animate-pulse"
                    style={{ backgroundColor: primaryColor }}
                  >
                    3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      3. En Route to Your Address
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Direct technician SMS communication with live arrival estimate.
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Call Trigger */}
              <div className="pt-4 border-t border-slate-800">
                <motion.a
                  href={`tel:${cleanPhone}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>Call Emergency Dispatch: {phone}</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Simulated Phone / SMS Interface (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Top Phone Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Tech Carlos M. (Van #14)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                        Master Licensed
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {companyName} • {city} Sector Fleet
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                    <Navigation className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    <span>~{etaMins} Mins Out</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">3.4 Miles Away</div>
                </div>
              </div>

              {/* Chat Simulation Conversation Feed */}
              <div className="space-y-4 mb-6 text-xs sm:text-sm font-sans">
                {/* System Alert Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 text-slate-300 space-y-1"
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>Automated Dispatch Log • Just Now</span>
                  </div>
                  <div className="text-xs text-white font-medium">
                    🚨 Priority Emergency Ticket Created for {city} area. Master technician dispatched with full diagnostic and parts inventory.
                  </div>
                </motion.div>

                {/* Technician Inbound SMS */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex gap-3 items-start"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 mt-1 shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    CM
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-xs p-4 text-slate-200 space-y-1.5 max-w-md shadow-md">
                    <div className="text-[11px] font-bold text-white">Carlos (Lead Technician)</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      &quot;Hi! I received your emergency alert. I&apos;m en route on the highway right now with all diagnostic gear and replacement fittings. Please do not touch any leaking or sparking lines. I will be at your doorstep in roughly ~{etaMins} minutes!&quot;
                    </p>
                    <div className="text-[10px] font-mono text-slate-500 pt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Delivered to phone • Direct line active</span>
                    </div>
                  </div>
                </motion.div>

                {/* Direct Assurance Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-emerald-300 text-xs flex items-center gap-2.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Upfront Price Guarantee:</strong> Carlos will inspect and provide an exact, flat-rate quote before any wrench touches your system. Zero surprise fees.
                  </span>
                </motion.div>
              </div>

              {/* Bottom Quick Call Strip */}
              <div className="bg-slate-950/70 rounded-2xl p-3.5 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Need Immediate Help? Speak to Carlos&apos;s team directly:</span>
                </div>

                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs transition-all hover:brightness-110 shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Call: {phone}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LiveDispatchSimulation;
