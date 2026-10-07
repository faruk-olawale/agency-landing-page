"use client";

import React, { useState } from "react";
import type { TemplateProps } from "@/lib/archetypeMap";
import {
  Sparkles,
  Heart,
  Star,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Check,
  X,
  ChevronRight,
} from "lucide-react";

/**
 * Dynamic Helper:
 * Normalizes industry strings for high-end boutique dental & aesthetic practices.
 * If dentist -> "Cosmetic Dentistry"
 * If medspa -> "Medical Spa & Aesthetics"
 */
function formatIndustryNoun(industry: string = ""): string {
  const norm = (industry || "").toLowerCase().trim();
  if (
    norm.includes("medspa") ||
    norm.includes("spa") ||
    norm.includes("aesthetic") ||
    norm.includes("skin") ||
    norm.includes("laser") ||
    norm.includes("botox")
  ) {
    return "Medical Spa & Aesthetics";
  }
  if (
    norm.includes("dent") ||
    norm.includes("ortho") ||
    norm.includes("smile") ||
    norm.includes("tooth") ||
    norm.includes("teeth")
  ) {
    return "Cosmetic Dentistry";
  }
  return "Cosmetic Dentistry";
}

/**
 * Returns a bright, high-resolution aesthetic clinic / spa background.
 */
function getAestheticHeroBackground(isMedSpa: boolean): string {
  if (isMedSpa) {
    return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80";
  }
  return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80";
}

export function AestheticBooking({ clientData }: TemplateProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Extract dynamic client data
  const companyName =
    clientData.name || clientData.company || "Aura Aesthetic Clinic";
  const rawIndustry = clientData.industry || clientData.niche || "dentist";
  const industryNoun = formatIndustryNoun(rawIndustry);
  const isMedSpa = industryNoun === "Medical Spa & Aesthetics";
  const city = clientData.city || "Metropolitan Area";
  const phone = clientData.phone || "(310) 555-0192";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // Dynamic Theme Colors
  const primaryColor =
    clientData.primaryColor ||
    clientData.colors?.primary ||
    "#BE185D"; // Luxury Rose Gold / Deep Rose default
  const secondaryColor =
    clientData.secondaryColor ||
    clientData.colors?.secondary ||
    "#FDF2F8"; // Soft quartz/rose background tint

  const heroBg = getAestheticHeroBackground(isMedSpa);

  // Before & After Transformations
  const transformations = isMedSpa
    ? [
        {
          title: "Full Facial Rejuvenation & Dermal Sculpting",
          subtitle: "Cheek Contouring + Lip Enhancement",
          beforeImg:
            "https://images.unsplash.com/photo-1512290900672-1f4a9749eb40?auto=format&fit=crop&w=800&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
          duration: "45 Minutes",
          downtime: "Zero Downtime",
          patientReview:
            "“The results look completely natural. My skin feels firmer, radiant, and I couldn't be happier with Dr. Elena's gentle touch.”",
          author: "Sophia R. • Verified Patient",
        },
        {
          title: "HydraFacial Glow & RF Microneedling",
          subtitle: "Pore Refinement + Collagen Synthesis",
          beforeImg:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
          duration: "60 Minutes",
          downtime: "12 Hours Glow",
          patientReview:
            "“My stubborn sun damage and fine lines vanished after 3 sessions. True luxury clinical experience.”",
          author: "Elena M. • Verified Patient",
        },
      ]
    : [
        {
          title: "Porcelain Veneer Smile Makeover",
          subtitle: "Handcrafted 8-Unit Veneer Reconstruction",
          beforeImg:
            "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
          duration: "2 Appointments",
          downtime: "Instant Transformation",
          patientReview:
            "“I used to hide my smile in every photograph. Now I smile with complete confidence. The precision and comfort was unmatched.”",
          author: "Jessica T. • Verified Patient",
        },
        {
          title: "Laser Enamel Whitening & Alignment",
          subtitle: "Clear Aligner Therapy + Deep Brightening",
          beforeImg:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
          duration: "4 Months",
          downtime: "Zero Discomfort",
          patientReview:
            "“Gentle, pain-free, and stunning results. 8 shades whiter and perfectly straight teeth.”",
          author: "Marcus K. • Verified Patient",
        },
      ];

  // Soft 3-Column Luxury Services
  const luxuryServices = isMedSpa
    ? [
        {
          title: "Cosmetic Enhancements",
          subtitle: "Dermal Fillers & Neurotoxins",
          description:
            "Subtle, artful volume restoration and wrinkle smoothing engineered to enhance your natural bone structure without looking overdone.",
          icon: Sparkles,
          highlights: ["FDA-Approved Fillers", "Custom Facial Mapping", "Minimal Discomfort"],
        },
        {
          title: "Preventative Care",
          subtitle: "Medical-Grade Peels & Facials",
          description:
            "Deep cellular detoxification, lymphatic drainage, and antioxidant infusions to defend against premature environmental aging.",
          icon: Heart,
          highlights: ["Custom Serum Blends", "Deep Pore Clarification", "Immediate Radiance"],
        },
        {
          title: "Advanced Treatments",
          subtitle: "Laser Resurfacing & Body Contouring",
          description:
            "Targeted radiofrequency and clinical laser platforms that rebuild deep collagen reserves and sculpt refined contours.",
          icon: Star,
          highlights: ["Non-Surgical Tightening", "Targeted Pigment Clearing", "Long-Lasting Results"],
        },
      ]
    : [
        {
          title: "Cosmetic Enhancements",
          subtitle: "Porcelain Veneers & Bonding",
          description:
            "Ultra-thin ceramic veneers digitally sculpted to harmonize with your facial proportions, delivering an effortless, luminous smile.",
          icon: Sparkles,
          highlights: ["Custom Shade Matching", "Minimal Enamel Prep", "Stain-Resistant Porcelain"],
        },
        {
          title: "Preventative Care",
          subtitle: "Spa-Grade Hygiene & Whitening",
          description:
            "Gentle ultrasonic cleanings, remineralizing therapy, and in-office LED laser whitening in private suites with aromatherapy.",
          icon: Heart,
          highlights: ["Aroma & Sound Therapy", "Up to 8 Shades Whiter", "Zero Enamel Sensitivity"],
        },
        {
          title: "Advanced Treatments",
          subtitle: "Clear Aligners & Dental Implants",
          description:
            "3D guided implant restoration and invisible orthodontic aligners crafted with cutting-edge digital scanning for permanent results.",
          icon: Star,
          highlights: ["Itero 3D Scanner (No Goop)", "Same-Day Restorations", "Lifetime Warranty"],
        },
      ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* ──────────────────────────────────────────────────────────────────────
          1. HEADER (Minimalist & Bright)
          White background, soft bottom border.
          Left: Company Name
          Right: Pill-shaped (rounded-full) button saying "Book Online" using primaryColor
      ────────────────────────────────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Company Name */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-slate-900 block leading-tight">
                {companyName}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                {industryNoun} • {city}
              </span>
            </div>
          </div>

          {/* Right: Phone & Pill-shaped "Book Online" button */}
          <div className="flex items-center gap-3 sm:gap-5">
            {phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>Concierge: {phone}</span>
              </a>
            )}

            <button
              onClick={() => setIsBookingOpen(true)}
              id="header-book-online-btn"
              className="inline-flex items-center gap-2 text-white font-medium px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all duration-200 hover:opacity-95 hover:shadow-lg active:scale-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </button>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          2. HERO SECTION (Luxury Edge-to-Edge)
          Background: Bright, clean, premium image
          Overlay: Modern "Glassmorphism" card floating on left/center to hold text
          Headline: "Award-Winning [Industry] in [City]"
          Subheadline: text-slate-600
          Primary CTA: Large pill-shaped button: "Book Your Appointment" with Calendar icon
      ────────────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[620px] lg:min-h-[720px] flex items-center justify-start bg-slate-100 overflow-hidden"
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Soft, light vignette overlay to let clinic lighting shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:via-white/40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          {/* Glassmorphism Card (white with bg-white/80 and backdrop-blur-md) */}
          <div className="max-w-xl lg:max-w-2xl bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-300/60 relative">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 border border-slate-200/80 text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-6">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Boutique Private Suite Clinic • {city}</span>
            </div>

            {/* Headline (H1, Elegant Sans-Serif) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight text-slate-950 leading-[1.12] mb-6">
              Award-Winning{" "}
              <span className="font-serif italic font-medium">
                {industryNoun}
              </span>{" "}
              in {city}
            </h1>

            {/* Subheadline (text-slate-600) */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 font-normal">
              Experience world-class care in a relaxing, state-of-the-art
              environment. Your journey to confidence starts here.
            </p>

            {/* Primary CTA: Large Pill-Shaped Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => setIsBookingOpen(true)}
                id="hero-book-appointment-btn"
                className="inline-flex items-center justify-center gap-3 text-white font-medium px-8 py-4 rounded-full text-base sm:text-lg shadow-xl shadow-rose-900/10 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Appointment</span>
              </button>

              {phone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-200 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-rose-500" />
                  <span>Call {phone}</span>
                </a>
              )}
            </div>

            {/* Luxury Micro-Badges */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Board-Certified Clinicians
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                4.9/5 from 380+ Reviews
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                Private VIP Rooms
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          3. THE "REAL RESULTS" SECTION (Transformations / Before & After)
          Directly under hero, visually driven section titled "Transformations"
          Mock "Before & After" layout with side-by-side images
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}30`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            <span>Real Patient Outcomes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-slate-950 mb-4">
            Transformations
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Witness the artistic precision and transformative beauty delivered
            daily at our {city} clinic. Real patients, unretouched results.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex p-1 bg-slate-200/70 rounded-full mt-6">
            {transformations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Case 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Transformation Card */}
        {transformations[activeTab] && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/70 p-6 sm:p-10 max-w-5xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900">
                  {transformations[activeTab].title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                  {transformations[activeTab].subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                  Time: {transformations[activeTab].duration}
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                  {transformations[activeTab].downtime}
                </span>
              </div>
            </div>

            {/* Side-by-Side Before & After Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Before Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${transformations[activeTab].beforeImg}')`,
                  }}
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                  Before Treatment
                </div>
              </div>

              {/* After Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${transformations[activeTab].afterImg}')`,
                  }}
                />
                <div
                  className="absolute top-4 left-4 text-white text-[11px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  After Treatment ✨
                </div>
              </div>
            </div>

            {/* Patient Review Quote */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm sm:text-base italic text-slate-700">
                  {transformations[activeTab].patientReview}
                </p>
                <div className="text-xs font-semibold text-slate-900">
                  {transformations[activeTab].author}
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="shrink-0 text-xs font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                Inquire For This Result
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. SERVICES GRID (Soft UI)
          3-column grid for services styled luxuriously
          rounded-3xl cards, soft oversized shadows (shadow-xl shadow-slate-200)
          Lucide icons (Sparkles, Heart, Star)
          "Cosmetic Enhancements", "Preventative Care", "Advanced Treatments"
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}30`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            <span>Signature Offerings</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-slate-950 mb-4">
            Curated Services
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every procedure is performed in private suites utilizing gentle,
            minimally invasive protocols and custom clinical formulations.
          </p>
        </div>

        {/* 3-Column Soft UI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {luxuryServices.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <div
                key={index}
                className="group relative bg-white border border-slate-100 rounded-3xl p-8 sm:p-9 shadow-xl shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/60 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${primaryColor}12`,
                        color: primaryColor,
                      }}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                      Service 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-sans font-medium text-slate-950 mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold mb-4">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {service.highlights.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: primaryColor }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-semibold bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-800 transition-all duration-200 border border-slate-200 group-hover:border-slate-900 cursor-pointer"
                >
                  <span>Select & Book Treatment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          5. EXPERIENCE AMENITIES STRIP (VIP Amenities)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-rose-50 text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-base font-semibold text-slate-900">
              Private VIP Suites
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Complete privacy with noise-cancelling acoustics
            </div>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-rose-50 text-rose-600">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-base font-semibold text-slate-900">
              Zero Wait Time Guarantee
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Your scheduled appointment starts immediately
            </div>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-rose-50 text-rose-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-base font-semibold text-slate-900">
              Digital 3D Scans
            </div>
            <div className="text-xs text-slate-500 mt-1">
              No invasive impressions or uncomfortable molds
            </div>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-rose-50 text-rose-600">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-base font-semibold text-slate-900">
              Complimentary Spa Bar
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Chilled beverages, heated towels & lip recovery balm
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          6. BOTTOM INVITATION CTA
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div
          className="rounded-3xl p-10 sm:p-14 border border-rose-100 shadow-2xl relative overflow-hidden"
          style={{ backgroundColor: secondaryColor }}
        >
          <h2 className="text-3xl sm:text-4xl font-sans font-light text-slate-900 tracking-tight mb-4">
            Begin Your Confidence Journey in {city}
          </h2>

          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-base">
            Appointments fill quickly. Reserve your one-on-one comprehensive
            consultation with our lead clinician today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-2 text-white font-medium px-8 py-4 rounded-full text-base shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Appointment</span>
            </button>

            {phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>Concierge Desk: {phone}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          7. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px]"
              style={{ backgroundColor: primaryColor }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm block">
                {companyName}
              </span>
              <span className="text-[11px] text-slate-500">
                {industryNoun} • {city} Clinic
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <span>Sterilization & Safety Certified</span>
            <span>•</span>
            <span>HIPAA Compliant</span>
            <span>•</span>
            <a
              href={`tel:${cleanPhone}`}
              className="text-slate-900 hover:underline font-mono"
            >
              {phone}
            </a>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────────────────
          8. LUXURY BOOKING MODAL (Interactive Appointment Reservation)
      ────────────────────────────────────────────────────────────────────── */}
      {isBookingOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => {
                setIsBookingOpen(false);
                setBookingConfirmed(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-sans font-medium text-slate-950">
                  Appointment Reserved
                </h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  Thank you! Our clinical concierge at {companyName} will contact
                  you via SMS to confirm your preferred suite time.
                </p>
                <button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingConfirmed(false);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-bold block mb-1">
                    Direct Calendar Reservation
                  </span>
                  <h3 className="text-2xl font-sans font-normal text-slate-950">
                    Book Your VIP Consultation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your preferred treatment and our concierge will
                    finalize your private suite reservation.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingConfirmed(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Treatment Interest
                    </label>
                    <select
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="cosmetic">Cosmetic Enhancements</option>
                      <option value="preventative">Preventative Care & Hygiene</option>
                      <option value="advanced">Advanced Clinical Treatments</option>
                      <option value="general">Comprehensive Initial Evaluation</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Time
                      </label>
                      <select className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500">
                        <option>Morning (9AM - 12PM)</option>
                        <option>Afternoon (12PM - 4PM)</option>
                        <option>Late Afternoon (4PM - 6PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Phone (For SMS Confirmation)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 text-white font-medium py-3.5 px-6 rounded-full text-sm shadow-md transition-all hover:opacity-95 active:scale-95 cursor-pointer mt-2"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Consultation Request</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    No payment required now. Our clinical concierge will confirm
                    your arrival details.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AestheticBooking;
