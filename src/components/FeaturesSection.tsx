"use client";

import { Zap, ShieldCheck, Wrench, ArrowUpRight } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      accentPill: "Speed Advantage",
      title: "Sub-second Load Times.",
      text: "53% of users abandon a site if it takes longer than 3 seconds to load. My hand-coded sites load instantly, giving you an edge in local search rankings.",
      stat: "< 0.4s",
      statLabel: "Average First Contentful Paint",
    },
    {
      icon: ShieldCheck,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      accentPill: "Zero Vulnerability",
      title: "Unbreakable Security.",
      text: "No databases. No outdated plugins. Zero risk of getting hacked. Maximum uptime.",
      stat: "0%",
      statLabel: "Attack Surface vs Bloated WP",
    },
    {
      icon: Wrench,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      accentPill: "Concierge Service",
      title: "100% Done-For-You.",
      text: "You run your business; I run your website. Need a photo changed or a new service added? Send an email, and it’s done.",
      stat: "< 24h",
      statLabel: "Turnaround on edits",
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Engineered For Performance
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Custom-Coded Beats WordPress
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Most local business websites are weighed down by 30+ plugins, bloated page builders, and sluggish servers. Here is how custom code changes the game:
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center border ${feature.iconBg} shadow-2xs group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {feature.accentPill}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-950 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Text */}
                  <p className="text-slate-600 text-base leading-relaxed">
                    {feature.text}
                  </p>
                </div>

                {/* Bottom Stat Callout */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {feature.stat}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {feature.statLabel}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                Direct Benchmark
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-2">
                WordPress Page Builder vs. Speedcraft Hand-Coded
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Google prioritizes fast-loading mobile sites in local map pack and search results.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {/* WordPress Bar */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Standard WordPress Site (Elementor/Divi + 24 Plugins)
                  </span>
                  <span className="text-rose-600 font-bold">4.2s (Slow, PageSpeed: 38/100)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[85%]" />
                </div>
              </div>

              {/* Hand-Coded Bar */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-900 mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Speedcraft Custom-Coded Site (React / Next.js)
                  </span>
                  <span className="text-emerald-700 font-black">0.38s (Instant, PageSpeed: 100/100)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[12%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
