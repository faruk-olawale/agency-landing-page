"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Monitor, Smartphone, CheckCircle, Zap, Shield, ArrowRight } from "lucide-react";

export interface DemoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  metrics: {
    lighthouse: number;
    fcp: string;
    lcp: string;
    tbt: string;
    cls: string;
  };
  highlights: string[];
}

interface DemoModalProps {
  demo: DemoItem | null;
  onClose: () => void;
  onRequestMockup: () => void;
}

export default function DemoModal({ demo, onClose, onRequestMockup }: DemoModalProps) {
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");

  if (!demo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="h-4 w-px bg-slate-300 mx-1" />
            <span className="text-sm font-bold text-slate-800 tracking-tight">
              {demo.title} — Live Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport switcher */}
            <div className="hidden sm:flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold text-slate-700">
              <button
                onClick={() => setDeviceView("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                  deviceView === "desktop"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                  deviceView === "mobile"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Real-time Core Web Vitals Audit */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-black text-xl shadow-inner">
                {demo.metrics.lighthouse}
              </div>
              <div>
                <div className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  Google PageSpeed Verified
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-100">
                  100% Performance & SEO Score
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center w-full sm:w-auto">
              <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <div className="text-[11px] text-slate-400">FCP</div>
                <div className="text-sm font-bold text-emerald-400">{demo.metrics.fcp}</div>
              </div>
              <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <div className="text-[11px] text-slate-400">LCP</div>
                <div className="text-sm font-bold text-emerald-400">{demo.metrics.lcp}</div>
              </div>
              <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <div className="text-[11px] text-slate-400">TBT</div>
                <div className="text-sm font-bold text-emerald-400">{demo.metrics.tbt}</div>
              </div>
              <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <div className="text-[11px] text-slate-400">CLS</div>
                <div className="text-sm font-bold text-emerald-400">{demo.metrics.cls}</div>
              </div>
            </div>
          </div>

          {/* Device Mockup Frame */}
          <div className="flex justify-center bg-slate-100/70 p-4 sm:p-8 rounded-xl border border-slate-200">
            <div
              className={`transition-all duration-300 overflow-hidden bg-white shadow-xl border border-slate-300 rounded-lg ${
                deviceView === "mobile"
                  ? "w-[320px] max-w-full rounded-2xl border-4 border-slate-800"
                  : "w-full rounded-lg"
              }`}
            >
              <div className="relative aspect-video w-full bg-slate-100">
                <Image
                  src={demo.imageSrc}
                  alt={demo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Highlights & Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {demo.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            Want a custom, hand-coded design like this customized for your business?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestMockup();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all"
            >
              <span>Get This For My Business</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
