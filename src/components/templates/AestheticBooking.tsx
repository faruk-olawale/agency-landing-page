"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateProps } from "@/lib/archetypeMap";
import { InfiniteReviewMarquee, MasonryProofGallery } from "@/components/universal";
import { BeforeAfterSlider, LuxuryBookingModal, TransformationItem } from "./aesthetic";
import {
  Sparkles,
  Heart,
  Star,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ChevronRight,
  ArrowRight,
  Eye,
  Award,
  Crown,
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
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

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

  // Before & After Transformations Library
  const transformations: TransformationItem[] = isMedSpa
    ? [
        {
          id: "MED-01",
          title: "Full Facial Rejuvenation & Dermal Sculpting",
          subtitle: "Cheek Contouring + Lip Enhancement",
          beforeImg:
            "https://images.unsplash.com/photo-1512290900672-1f4a9749eb40?auto=format&fit=crop&w=1200&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
          duration: "45 Minutes",
          downtime: "Zero Downtime",
          patientReview:
            "“The results look completely natural. My skin feels firmer, radiant, and I couldn't be happier with Dr. Elena's gentle touch.”",
          author: "Sophia R. • Verified Patient",
          tags: ["Dermal Fillers", "Cheek Contouring"],
        },
        {
          id: "MED-02",
          title: "HydraFacial Glow & RF Microneedling",
          subtitle: "Pore Refinement + Collagen Synthesis",
          beforeImg:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
          duration: "60 Minutes",
          downtime: "12 Hours Glow",
          patientReview:
            "“My stubborn sun damage and fine lines vanished after 3 sessions. True luxury clinical experience.”",
          author: "Elena M. • Verified Patient",
          tags: ["Microneedling", "HydraFacial"],
        },
        {
          id: "MED-03",
          title: "Non-Surgical Jawline & Neck Sculpting",
          subtitle: "Morpheus8 Fractional RF Remodeling",
          beforeImg:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
          duration: "50 Minutes",
          downtime: "24 Hours Mild Redness",
          patientReview:
            "“Defined my jawline without surgery or painful downtime. The team treated me like royalty from the moment I arrived.”",
          author: "Claire D. • Verified Patient",
          tags: ["RF Remodeling", "Jawline Contour"],
        },
      ]
    : [
        {
          id: "DEN-01",
          title: "Porcelain Veneer Smile Makeover",
          subtitle: "Handcrafted 8-Unit Ceramic Veneer Reconstruction",
          beforeImg:
            "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
          duration: "2 Appointments",
          downtime: "Instant Transformation",
          patientReview:
            "“I used to hide my smile in every photograph. Now I smile with complete confidence. The precision and comfort was unmatched.”",
          author: "Jessica T. • Verified Patient",
          tags: ["Porcelain Veneers", "Smile Design"],
        },
        {
          id: "DEN-02",
          title: "Laser Enamel Whitening & Clear Alignment",
          subtitle: "Digital Clear Aligner Therapy + Deep Brightening",
          beforeImg:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
          duration: "4 Months",
          downtime: "Zero Discomfort",
          patientReview:
            "“Gentle, pain-free, and stunning results. 8 shades whiter and perfectly straight teeth without traditional metal braces.”",
          author: "Marcus K. • Verified Patient",
          tags: ["Clear Aligners", "LED Laser"],
        },
        {
          id: "DEN-03",
          title: "Full Arch Cosmetic Restoration",
          subtitle: "Digital Itero Smile Design & Ceramic Crowns",
          beforeImg:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
          afterImg:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
          duration: "3 Appointments",
          downtime: "Immediate Function",
          patientReview:
            "“The 3D scanning made the whole process effortless. No impressions, zero pain, and a smile that feels completely natural.”",
          author: "David B. • Verified Patient",
          tags: ["Full Arch", "Ceramic Crowns"],
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-100 selection:text-rose-900 pb-16 sm:pb-0">
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
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm shrink-0"
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              id="header-book-online-btn"
              className="inline-flex items-center gap-2 text-white font-medium px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all duration-200 hover:opacity-95 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </motion.button>
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent lg:via-white/45" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          {/* Glassmorphism Card (white with bg-white/85 and backdrop-blur-md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl lg:max-w-2xl bg-white/85 backdrop-blur-md border border-white/60 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-300/60 relative"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 border border-slate-200/80 text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookingOpen(true)}
                id="hero-book-appointment-btn"
                className="inline-flex items-center justify-center gap-3 text-white font-medium px-8 py-4 rounded-full text-base sm:text-lg shadow-xl shadow-rose-900/10 transition-all duration-200 hover:brightness-105 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Appointment</span>
              </motion.button>

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
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          3. THE "REAL RESULTS" SECTION (Interactive Before & After Slider)
          Directly under hero, visually driven section titled "Transformations"
          Features draggable interactive split slider
      ────────────────────────────────────────────────────────────────────── */}
      <section
        id="transformations"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-3 border"
            style={{
              color: primaryColor,
              borderColor: `${primaryColor}30`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Transformation Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-slate-950 mb-4">
            Transformations
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Drag the slider to reveal the artistic precision and transformative beauty delivered
            daily at our {city} clinic. Real patients, unretouched results.
          </p>

          {/* Transformation Case Selector Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/60 rounded-full mt-6 max-w-full">
            {transformations.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveCaseIdx(idx)}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCaseIdx === idx
                    ? "bg-white text-slate-900 shadow-md font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Case 0{idx + 1}: {item.title.split("&")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Before/After Drag Slider Component */}
        {transformations[activeCaseIdx] && (
          <BeforeAfterSlider
            transformation={transformations[activeCaseIdx]}
            primaryColor={primaryColor}
            onBookNow={() => setIsBookingOpen(true)}
          />
        )}
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          4. SERVICES GRID (Soft UI)
          3-column grid for services styled luxuriously
          rounded-3xl cards, soft oversized shadows (shadow-xl shadow-slate-200)
          Lucide icons (Sparkles, Heart, Star)
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white border border-slate-100 rounded-3xl p-8 sm:p-9 shadow-xl shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/60 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110"
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
                  <p
                    className="text-xs font-mono uppercase tracking-wider font-semibold mb-4"
                    style={{ color: primaryColor }}
                  >
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-semibold bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-800 transition-all duration-200 border border-slate-200 group-hover:border-slate-900 cursor-pointer"
                >
                  <span>Select & Book Treatment</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
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
              Zero Wait Guarantee
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
          6. CLINICAL PROOF & SUITE DOCUMENTATION GALLERY
      ────────────────────────────────────────────────────────────────────── */}
      <MasonryProofGallery
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="light"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          7. PATIENT EXPERIENCES & VERIFIED REVIEWS MARQUEE
      ────────────────────────────────────────────────────────────────────── */}
      <InfiniteReviewMarquee
        industry={rawIndustry}
        city={city}
        companyName={companyName}
        primaryColor={primaryColor}
        theme="light"
      />

      {/* ──────────────────────────────────────────────────────────────────────
          8. BOTTOM INVITATION CTA
      ────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div
          className="rounded-3xl p-10 sm:p-14 border border-rose-100 shadow-2xl relative overflow-hidden"
          style={{ backgroundColor: secondaryColor }}
        >
          <h2 className="text-3xl sm:text-4xl font-sans font-light text-slate-950 tracking-tight mb-4">
            Begin Your Confidence Journey in {city}
          </h2>

          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-base">
            Appointments fill quickly. Reserve your one-on-one comprehensive
            consultation with our lead clinician today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-2 text-white font-medium px-8 py-4 rounded-full text-base shadow-lg transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Appointment</span>
            </motion.button>

            {phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>Concierge Desk: {phone}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          9. FOOTER
      ────────────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] shrink-0"
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
          10. LUXURY BOOKING MODAL (Multi-Step Concierge Experience)
      ────────────────────────────────────────────────────────────────────── */}
      <LuxuryBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        companyName={companyName}
        city={city}
        primaryColor={primaryColor}
        isMedSpa={isMedSpa}
      />
    </div>
  );
}

export default AestheticBooking;
