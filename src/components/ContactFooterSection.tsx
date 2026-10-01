"use client";

import { useState } from "react";
import { Zap, CheckCircle2, ArrowRight, ShieldCheck, Clock, Globe } from "lucide-react";

interface ContactFooterSectionProps {
  selectedPlan?: string;
}

export default function ContactFooterSection({ selectedPlan }: ContactFooterSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    websiteUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.websiteUrl.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          website: formData.websiteUrl.trim(),
          selectedTier: selectedPlan || "Standard Mockup Request",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="mockup-form" className="bg-slate-900 text-slate-100 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Zero Risk, 100% Free</span>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get Your Free Custom Mockup
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Send me your current website, and I’ll build a faster, modern homepage mockup for you at zero cost. If you like it, we work together.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedPlan && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-lg text-xs sm:text-sm text-emerald-300 flex items-center justify-between">
                  <span>Selected Preference: <strong>{selectedPlan}</strong></span>
                  <span className="text-[11px] text-emerald-400">Included in request</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-rose-900/40 border border-rose-700 rounded-lg text-rose-200 text-xs sm:text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Field 1: Name */}
                <div className="space-y-2">
                  <label htmlFor="client-name" className="block text-sm font-semibold text-slate-200">
                    Your Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. John Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="space-y-2">
                  <label htmlFor="client-email" className="block text-sm font-semibold text-slate-200">
                    Business Email <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    placeholder="john@millerplumbing.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
              </div>

              {/* Field 3: Current Website URL */}
              <div className="space-y-2">
                <label htmlFor="client-url" className="block text-sm font-semibold text-slate-200">
                  Current Website URL <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    id="client-url"
                    type="text"
                    required
                    placeholder="https://www.yourcurrentbusiness.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  I will run a full PageSpeed diagnostics test and design a custom mockup based on your existing branding.
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-lg hover:shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing Your Site &amp; Scheduling Mockup...
                    </span>
                  ) : (
                    <>
                      <span>Get My Free Mockup</span>
                      <ArrowRight className="w-5 h-5 text-emerald-200" />
                    </>
                  )}
                </button>
              </div>

              {/* Reassurance points */}
              <div className="pt-4 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>24-48h Delivery</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100/100 Guarantee</span>
                </div>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Request Received, {formData.name.split(" ")[0]}!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                I am now reviewing <span className="font-semibold text-emerald-400">{formData.websiteUrl}</span>. I’ll perform a full speed audit and hand-code your free, modern homepage mockup within 24 to 48 hours.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-left max-w-md mx-auto space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  What happens next:
                </div>
                <div className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span>Deep-dive speed &amp; SEO audit of your current site.</span>
                </div>
                <div className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span>Hand-crafted Next.js live demo mockup delivered to <strong>{formData.email}</strong>.</span>
                </div>
                <div className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span>If you love it, we launch it. If not, zero hard feelings.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", websiteUrl: "" });
                }}
                className="text-xs text-slate-400 underline hover:text-white pt-2 cursor-pointer"
              >
                Submit another website request
              </button>
            </div>
          )}
        </div>

        {/* Agency Bottom Footer Links */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            </div>
            <span className="font-bold text-slate-200">Speedcraft Studio</span>
            <span>— Hand-coded websites for local leaders.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Guaranteed 100/100 Core Web Vitals</span>
            <span>Privacy First</span>
            <span>© {new Date().getFullYear()} Speedcraft</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
