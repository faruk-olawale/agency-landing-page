"use client";

import { Zap, CheckCircle2, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const el = document.getElementById("mockup-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-100 bg-linear-to-b from-slate-50/70 via-white to-white">
      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Soft gradient blur in background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/90 text-xs sm:text-sm font-medium text-slate-800 shadow-2xs hover:bg-slate-100 transition-colors mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>Lightning-Fast Web Development for Local Businesses</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
          Stop Losing Local Customers to a{" "}
          <span className="relative inline-block text-rose-600 underline decoration-rose-400 decoration-wavy decoration-2 underline-offset-8">
            Slow Website.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
          I hand-code ultra-fast, custom websites for local businesses. No bloated WordPress, 
          no maintenance headaches—just a high-converting site that ranks higher on Google and gets your phone ringing.
        </p>

        {/* CTA & Trust Indicator */}
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <span>Request a Free Mockup</span>
            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trust Indicator */}
          <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-md bg-emerald-50/80 border border-emerald-200/60">
            {/* Authentic Google Lighthouse 100 Score Indicator */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-[11px] shadow-2xs">
              100
            </div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-900 tracking-tight flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
              100/100 Google PageSpeed Guaranteed
            </p>
          </div>
        </div>

        {/* Core Vitals Mini Stat Bar */}
        <div className="mt-14 pt-10 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs text-left">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Page Load Speed</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-1.5">
              <span>0.38s</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Instant</span>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">vs 4.2s WordPress avg</div>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs text-left">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lighthouse Score</div>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-baseline gap-1.5">
              <span>100/100</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">Guaranteed</span>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">Performance & SEO</div>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs text-left">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Conversion Boost</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-1.5">
              <span>+37%</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Leads</span>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">More phone calls & inquiries</div>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/80 shadow-2xs text-left">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Uptime</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-1.5">
              <span>99.99%</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Zero Hacks</span>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">No vulnerable plugins</div>
          </div>
        </div>
      </div>
    </section>
  );
}
