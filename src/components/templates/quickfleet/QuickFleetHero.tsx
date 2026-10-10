"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, Phone, Wrench } from "lucide-react";
import type { AutomotiveTruth } from "@/lib/automotiveTruth";

interface QuickFleetHeroProps {
  companyName: string;
  city?: string;
  primaryColor?: string;
  phone?: string;
  cleanPhone?: string;
  truth?: AutomotiveTruth;
}

export function QuickFleetHero({
  companyName: propCompanyName,
  city: propCity,
  phone: propPhone,
  cleanPhone: propCleanPhone,
  truth,
}: QuickFleetHeroProps) {
  const companyName = truth?.companyName || propCompanyName;
  const hasCity = truth ? truth.hasCity : Boolean(propCity);
  const city = truth?.city || propCity;
  const hasPhone = truth ? truth.hasPhone : Boolean(propCleanPhone && propCleanPhone.length >= 7);
  const cleanPhone = truth?.cleanPhone || propCleanPhone;
  const phone = truth?.phone || propPhone;

  return (
    <section
      className="qf-hero relative"
      aria-label={`${companyName} precision diagnostics${hasCity ? ` in ${city}` : ""}`}
    >
      {/* Background Architectural Photo: Daylight Clean Modern Engineering Facility */}
      <div className="qf-hero__bg">
        <Image
          src="/images/quickfleet_auto_facility.jpg"
          alt={`${companyName} modern daylight automotive engineering facility`}
          fill
          priority
          className="object-cover object-[72%_center] sm:object-center scale-[1.01]"
        />
      </div>

      {/* QuickFleet Signature Asymmetric Vignette Overlay */}
      <div className="qf-hero__overlay" />

      {/* Inner Hero Typography */}
      <div className="qf-hero__inner">
        <div className="max-w-2xl relative">
          {/* Subtle localized soft wash: protects text contrast */}
          <div
            className="absolute -inset-6 -left-6 sm:-left-10 bg-[radial-gradient(ellipse_at_25%_35%,rgba(12,7,48,0.50)_0%,rgba(12,7,48,0.20)_60%,transparent_90%)] blur-2xl -z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Status Badge: Frosted dark pill with luminous mint pulsing radar dot */}
          <div className="inline-block">
            <span className="qf-status">
              <i aria-hidden="true" />
              <span>{truth ? truth.bays.heroBadge : (hasCity ? `Bays Active in ${city}` : "Diagnostic Bays Active")}</span>
            </span>
          </div>

          {/* Monumental Headline: Crisp pure white with high-impact readability */}
          <h1>
            The precision <br className="hidden sm:block" />
            diagnostic network <br className="hidden sm:block" />
            {hasCity ? `for ${city}` : "engineered for precision"}
          </h1>

          {/* Editorial Lede: High-contrast, bright, crystal-clear white text */}
          <p className="qf-hero__lede">
            Dealer-level diagnostics and master mechanical repair on OEM scan platforms,
            with dedicated testing bays and an audited digital inspection
            record on every vehicle.
          </p>

          {/* QuickFleet Signature Dual CTA Buttons */}
          <div className="qf-hero__cta">
            <a
              href="#book-intake"
              id="qf-hero-book-btn"
              className="qf-btn-primary"
            >
              <span>Book Diagnostic Intake</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {hasPhone ? (
              <a
                href={`tel:${cleanPhone}`}
                id="qf-hero-call-btn"
                className="qf-btn-ghost"
                aria-label={`Call direct bay hotline at ${phone}`}
              >
                <Phone className="w-4 h-4 text-[#6FD9C1]" />
                <span>Direct Bay Hotline</span>
              </a>
            ) : (
              <a
                href="#facility"
                id="qf-hero-explore-btn"
                className="qf-btn-ghost"
              >
                <Wrench className="w-4 h-4 text-[#6FD9C1]" />
                <span>Explore Capabilities</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hero Card Footer Metadata */}
      <div className="qf-hero__meta">
        <div className="flex items-center gap-2">
          <span>
            {hasCity ? `Serving drivers across ${city}. ` : ""}Diagnostic triage workflow ready for review.
          </span>
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
