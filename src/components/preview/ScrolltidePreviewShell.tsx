"use client";

import React, { useState } from "react";
import type { ClientData } from "@/lib/archetypeMap";
import { Monitor, Smartphone, X } from "lucide-react";

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

  const companyName = lead.company || lead.name || "Local Business Partner";

  return (
    <div className="min-h-screen bg-[#07090e] font-sans text-zinc-100 selection:bg-sky-500 selection:text-white">
      {/* ──────────────────────────────────────────────────────────────────────
          1. DESKTOP FLOATING CONTROLLER (Leaves top 100% pristine for sticky navbar)
      ────────────────────────────────────────────────────────────────────── */}
      {!bannerDismissed && (
        <aside
          role="region"
          aria-label="Design Prototype Controller"
          className="hidden sm:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-3 bg-[#0b0f17]/92 backdrop-blur-xl px-4 py-2 rounded-full border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-xs text-white"
        >
          {/* Left: Client Context */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white tracking-tight truncate max-w-[200px]">
              {companyName}
            </span>
          </div>

          {/* Center: Device View Switcher */}
          <div className="flex items-center bg-zinc-900/90 p-0.5 rounded-full border border-white/[0.08] text-zinc-400">
            <button
              type="button"
              onClick={() => setDeviceMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                deviceMode === "desktop"
                  ? "bg-zinc-800 text-white shadow-xs font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                deviceMode === "mobile"
                  ? "bg-zinc-800 text-white shadow-xs font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
          </div>

          {/* Right: Dismiss Control */}
          <div className="flex items-center pl-1 border-l border-white/10">
            <button
              type="button"
              onClick={() => setBannerDismissed(true)}
              title="Hide preview toolbar"
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* ──────────────────────────────────────────────────────────────────────
          2. VIEWPORT CANVAS
      ────────────────────────────────────────────────────────────────────── */}
      <main className="w-full">
        {deviceMode === "desktop" ? (
          /* Pure full-width native presentation */
          <div className="w-full bg-[#07090e]">{children}</div>
        ) : (
          /* Centered mobile frame for instant conversion inspection */
          <div className="py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-zinc-950">
            <div className="w-full max-w-[400px] rounded-[44px] p-3 bg-zinc-950 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] border-4 border-zinc-800 relative">
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-end px-3">
                <span className="w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700 inline-block" />
              </div>

              {/* Viewport Screen */}
              <div className="preview-mobile-frame rounded-[36px] overflow-x-hidden overflow-y-auto bg-[#07090e] max-h-[820px] select-none border border-zinc-800 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [transform:translateZ(0)]">
                {children}
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4 font-mono">
              Mobile Preview • Scroll to test touch interaction
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ScrolltidePreviewShell;
