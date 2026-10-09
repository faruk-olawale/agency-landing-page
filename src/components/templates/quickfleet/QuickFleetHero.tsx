"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";

interface QuickFleetHeroProps {
  companyName: string;
  city: string;
  primaryColor?: string;
  phone: string;
  cleanPhone: string;
}

export function QuickFleetHero({
  companyName,
  city,
  phone,
  cleanPhone,
}: QuickFleetHeroProps) {
  return (
    <section className="qf-hero relative" aria-label={`${companyName} precision diagnostics in ${city}`}>
      {/* Background Architectural Photo: Daylight Clean Modern Engineering Facility */}
      <div className="qf-hero__bg">
        <Image
          src="/images/quickfleet_auto_facility.jpg"
          alt={`${companyName} modern daylight automotive engineering facility`}
          fill
          priority
          className="object-cover object-center scale-[1.01]"
        />
      </div>

      {/* QuickFleet Signature Asymmetric Vignette Overlay (Darker on the left for text readability, daylight transparent on the right for cars) */}
      <div className="qf-hero__overlay" />

      {/* Inner Hero Typography */}
      <div className="qf-hero__inner">
        <div className="max-w-2xl relative">
          {/* Localized deep navy aura to guarantee 100% legibility on any screen */}
          <div
            className="absolute -inset-8 sm:-inset-12 -left-6 sm:-left-12 bg-radial from-[#0C0730]/90 via-[#0C0730]/65 to-transparent blur-3xl -z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Status Badge: Frosted dark pill with luminous mint pulsing radar dot */}
          <div className="inline-block">
            <span className="qf-status">
              <i aria-hidden="true" />
              <span>Bays Active in {city}</span>
            </span>
          </div>

          {/* Monumental Headline: Crisp pure white with high-impact readability */}
          <h1>
            The precision <br className="hidden sm:block" />
            diagnostic network <br className="hidden sm:block" />
            for {city}
          </h1>

          {/* Editorial Lede: High-contrast, bright, crystal-clear white text */}
          <p className="qf-hero__lede">
            Dealer-level diagnostics and master mechanical repair on OEM scan platforms,
            with dedicated testing bays across the city and an audited digital inspection
            record on every vehicle.
          </p>

          {/* QuickFleet Signature Dual CTA Buttons: 1. Pure White Pill with Black Text, 2. Frosted Glass Pill */}
          <div className="qf-hero__cta">
            <a
              href="#book-intake"
              id="qf-hero-book-btn"
              className="qf-btn-primary"
            >
              <span>Book Diagnostic Intake</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              id="qf-hero-call-btn"
              className="qf-btn-ghost"
            >
              <Phone className="w-4 h-4 text-[#6FD9C1]" />
              <span>Direct Bay Hotline</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Card Footer Metadata */}
      <div className="qf-hero__meta">
        <div className="flex items-center gap-2">
          <span>{city} central bay first. Certified OEM diagnostic tooling on standby.</span>
        </div>
        <a
          href="#facility"
          className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
        >
          <span>Scroll</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

export default QuickFleetHero;
