"use client";

import { Check, Sparkles, HelpCircle, Shield, ArrowRight } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const handleSelectPlan = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    const el = document.getElementById("mockup-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Transparent Investment
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Predictable Pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            No surprise invoices. No nickel-and-diming for small edits. Choose the model that fits your cash flow best.
          </p>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch">
          {/* Card 1: The Pay-Monthly Plan (Most Popular) */}
          <div className="relative rounded-2xl bg-white border-2 border-slate-900 p-8 sm:p-10 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Most Popular</span>
            </div>

            <div>
              {/* Plan Title */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    The Pay-Monthly Plan
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Ideal for local businesses wanting zero upfront risk.
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    $150
                  </span>
                  <span className="text-slate-500 font-semibold text-lg">/month</span>
                </div>
                {/* Specific exact text */}
                <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mt-3 inline-block">
                  Zero upfront cost. 12-month minimum term.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Included in this plan:
                </div>
                <ul className="space-y-3.5">
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Custom design &amp; development</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Premium cloud hosting</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Daily backups</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-slate-900">Unlimited minor edits</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Button */}
            <div>
              <button
                onClick={() => handleSelectPlan("The Pay-Monthly Plan ($150/mo)")}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-base text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2.5">
                Cancel or review renewal terms anytime after 12 months.
              </p>
            </div>
          </div>

          {/* Card 2: The Upfront Plan */}
          <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Plan Title */}
              <div className="mb-4">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  The Upfront Plan
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Pay for the build once, own the code with minimal ongoing cost.
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    $1,200
                  </span>
                  <span className="text-slate-500 font-semibold text-lg">Build Fee</span>
                </div>
                {/* Specific exact text */}
                <p className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md mt-3 inline-block">
                  + $50/month for hosting and maintenance.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Included in this plan:
                </div>
                <ul className="space-y-3.5">
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Everything in the monthly plan</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Custom design &amp; development</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Premium cloud hosting &amp; backups</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Full code ownership from Day 1</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Button */}
            <div>
              <button
                onClick={() => handleSelectPlan("The Upfront Plan ($1,200 Build Fee)")}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-base text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2.5">
                Hosting &amp; maintenance billed monthly on a rolling 30-day agreement.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 max-w-3xl mx-auto p-5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              100% Risk-Free Guarantee
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              If your new website does not achieve a 95+ score on Google PageSpeed Insights upon launch, we will rework it at zero additional cost until it does.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
