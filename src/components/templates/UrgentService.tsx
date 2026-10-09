import React from "react";
import type { TemplateProps } from "@/lib/archetypeMap";
import { QuickFleetNav } from "./quickfleet/QuickFleetNav";
import { QuickFleetHero } from "./quickfleet/QuickFleetHero";
import { QuickFleetHotspots } from "./quickfleet/QuickFleetHotspots";
import { QuickFleetServicesInteractive } from "./quickfleet/QuickFleetServicesInteractive";
import { QuickFleetStickyCards } from "./quickfleet/QuickFleetStickyCards";
import { QuickFleetLiveRecord } from "./quickfleet/QuickFleetLiveRecord";
import { QuickFleetCostBenchmark } from "./quickfleet/QuickFleetCostBenchmark";
import { QuickFleetWhyMatters } from "./quickfleet/QuickFleetWhyMatters";
import { QuickFleetReviews } from "./quickfleet/QuickFleetReviews";
import { QuickFleetBookingClose } from "./quickfleet/QuickFleetBookingClose";
import { QuickFleetFooter } from "./quickfleet/QuickFleetFooter";

/**
 * UrgentService Template · QuickFleet Automotive Diagnostic Edition
 * ============================================================================
 * Precision engineering, editorial typography, sticky drafting cards,
 * live vehicle telemetry (RO-40912), and cost benchmark comparison.
 *
 * Implemented with 100% aesthetic and interactive parity to QuickFleet (quickfleet.co),
 * transformed for high-ticket automotive diagnostic and mechanical specialists.
 * ============================================================================
 */
export function UrgentService({ clientData }: TemplateProps) {
  const companyName =
    clientData.name || clientData.company || "Apex Factory Diagnostics";
  const city = clientData.city || "Austin";
  const phone = clientData.phone || "(512) 890-4421";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // QuickFleet strict teal accent (strictly disallow orange)
  const rawColor = clientData.primaryColor || clientData.colors?.primary || "#0A997D";
  const primaryColor =
    rawColor.toLowerCase().includes("f97316") ||
    rawColor.toLowerCase().includes("ea580c") ||
    rawColor.toLowerCase().includes("d97706") ||
    rawColor.toLowerCase().includes("orange")
      ? "#0A997D"
      : rawColor;

  return (
    <div id="top" className="qf-canvas min-h-screen">
      {/* 1. QuickFleet Floating Navigation Pill */}
      <QuickFleetNav
        companyName={companyName}
        city={city}
        phone={phone}
        cleanPhone={cleanPhone}
        primaryColor={primaryColor}
      />

      {/* 2. QuickFleet Hero Card with Cinematic Facility Backdrop & Word Rhythm */}
      <QuickFleetHero
        companyName={companyName}
        city={city}
        phone={phone}
        cleanPhone={cleanPhone}
        primaryColor={primaryColor}
      />

      {/* 3. Section 01: The Facility & Diagnostic Station (Interactive Hotspot Explorer) */}
      <QuickFleetHotspots city={city} />

      {/* 4. Section 02: What We Do & How We Operate (Interactive Central Console Animation + 6-Discipline Catalog) */}
      <QuickFleetServicesInteractive
        companyName={companyName}
        city={city}
        cleanPhone={cleanPhone}
        primaryColor={primaryColor}
      />

      {/* 5. Section 03: The 3 Sticky Stacking Cards (Platforms, Bays, Digital Record) */}
      <QuickFleetStickyCards city={city} primaryColor={primaryColor} />

      {/* 6. Section 04: The Live Vehicle Telemetry & Repair Order Card (RO-40912) */}
      <QuickFleetLiveRecord
        companyName={companyName}
        city={city}
        phone={phone}
        cleanPhone={cleanPhone}
        primaryColor={primaryColor}
      />

      {/* 7. Section 05: Cost & Turnaround Benchmark (Dealership Markup vs Independent) */}
      <QuickFleetCostBenchmark
        companyName={companyName}
        city={city}
      />

      {/* 8. Section 06: "Why It Matters" Tri-Card Matrix */}
      <QuickFleetWhyMatters city={city} />

      {/* 9. Section 07: Customer Verification & Audited Repair Reviews */}
      <QuickFleetReviews city={city} />

      {/* 10. Section 08: Closing Sheet & Instant Bay Reservation Form */}
      <QuickFleetBookingClose
        companyName={companyName}
        city={city}
        phone={phone}
        cleanPhone={cleanPhone}
        primaryColor={primaryColor}
      />

      {/* 11. QuickFleet Minimalist Editorial Footer */}
      <QuickFleetFooter
        companyName={companyName}
        city={city}
        phone={phone}
        cleanPhone={cleanPhone}
      />
    </div>
  );
}

export default UrgentService;

