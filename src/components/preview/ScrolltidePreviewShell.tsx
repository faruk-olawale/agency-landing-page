"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ClientData } from "@/lib/archetypeMap";
import {
  Monitor,
  Smartphone,
  Check,
  Phone,
  ArrowRight,
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";

interface ScrolltidePreviewShellProps {
  lead: ClientData;
  archetype: string;
  slug: string;
  children: React.ReactNode;
}

export function ScrolltidePreviewShell({
  lead,
  archetype,
  slug,
  children,
}: ScrolltidePreviewShellProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Modal contact state
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState(lead.phone || "");
  const [contactEmail, setContactEmail] = useState("");
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const companyName = lead.company || lead.name || "Local Business Partner";
  const city = lead.city || "Local Market";
  const phone = lead.phone || "(555) 019-2834";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. SLEEK EXECUTIVE FLOATING TOP TOOLBAR
      ────────────────────────────────────────────────────────────────────── */}
      {/* ──────────────────────────────────────────────────────────────────────
          1. SLEEK EXECUTIVE DESKTOP TOOLBAR (Hidden on mobile to avoid navbar stacking)
      ────────────────────────────────────────────────────────────────────── */}
      {!bannerDismissed && (
        <>
          {/* Desktop Toolbar */}
          <aside
            role="region"
            aria-label="Design Prototype Controller"
            className="hidden sm:block sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3 text-xs">
              {/* Left: Client Context */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Live Prototype
                </span>
                <div className="truncate text-slate-700 font-medium">
                  Custom proposal for <strong className="text-slate-950 font-bold">{companyName}</strong> ({city})
                </div>
              </div>

              {/* Center: Device View Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-slate-600">
                <button
                  type="button"
                  onClick={() => setDeviceMode("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                    deviceMode === "desktop"
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                    deviceMode === "mobile"
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile View</span>
                </button>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 active:scale-98 transition shadow-xs text-xs cursor-pointer"
                >
                  <span>Launch This Website</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setBannerDismissed(true)}
                  title="Hide preview toolbar"
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Discrete Floating Capsule (leaves top 100% clean for website navbar) */}
          <div className="sm:hidden fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900/95 text-white backdrop-blur-md px-3.5 py-2 rounded-full shadow-2xl border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-[11px]">Prototype</span>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-2.5 py-1 rounded-full bg-white text-slate-950 font-bold text-[10px] ml-1"
            >
              Launch Site →
            </button>
          </div>
        </>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
          2. PREVIEW CANVAS
      ────────────────────────────────────────────────────────────────────── */}
      <main className="w-full">
        {deviceMode === "desktop" ? (
          /* Pure full-width native presentation */
          <div className="w-full bg-white">{children}</div>
        ) : (
          /* Centered mobile frame for instant conversion inspection */
          <div className="py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-slate-200/60">
            <div className="w-full max-w-[400px] rounded-[44px] p-3 bg-slate-950 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] border-4 border-slate-800 relative">
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-end px-3">
                <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700 inline-block" />
              </div>

              {/* Viewport Screen */}
              <div className="rounded-[36px] overflow-hidden bg-white max-h-[820px] overflow-y-auto select-none border border-slate-700/50">
                {children}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium">
              Mobile Preview • Scroll to test touch interaction
            </p>
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────────────────────────────
          3. CLAIM & LAUNCH MODAL
      ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Deploy Your Custom Website
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Ready to launch for {companyName}? We configure domain, hosting, and copy in 48 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {modalSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Launch Request Received
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                      Thank you. We will reach out to you directly to confirm any custom revisions and connect your custom domain.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mt-4 px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleModalSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Direct Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 019-2834"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl font-bold text-white text-sm bg-slate-900 hover:bg-slate-800 transition cursor-pointer shadow-sm"
                      >
                        Schedule 15-Minute Launch Walkthrough
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400">
                      No upfront commitment. We review your custom branding and launch timeline.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ScrolltidePreviewShell;
