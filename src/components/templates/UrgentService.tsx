import React from "react";
import type { TemplateProps } from "@/lib/archetypeMap";
import { getAutomotiveTruth } from "@/lib/automotiveTruth";
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
 * Integrated with the AutomotiveTruth single source of truth engine:
 * - Prospect-ready mode: strictly verified data, zero fabricated facts.
 * - Demo mode: clearly badged illustrative benchmarks & sample telemetry.
 * ============================================================================
 */
export function UrgentService({ clientData, isDemoMode = false }: TemplateProps) {
  const truth = getAutomotiveTruth(
    clientData,
    Boolean(isDemoMode || clientData.isDemoMode)
  );

  return (
    <div id="top" className="qf-canvas min-h-screen">
      {/* Visual Demo Mode Top Notification Banner (Only shown when ?mode=demo is active) */}
      {truth.isDemoMode && (
        <div
          role="status"
          aria-label="Demo mode indicator"
          className="bg-[#0C0730] border-b border-amber-400/30 text-amber-200 px-4 py-2.5 text-xs text-center font-mono flex items-center justify-center gap-2.5 sticky top-0 z-[60] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="font-bold tracking-wider uppercase text-amber-300">
            PROTOTYPE DEMONSTRATION MODE
          </span>
          <span className="hidden sm:inline text-amber-200/80">
            · Illustrative operational benchmarks &amp; sample vehicle telemetry.
          </span>
        </div>
      )}

      {/* 1. QuickFleet Floating Navigation Pill */}
      <QuickFleetNav
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
        phone={truth.phone}
        cleanPhone={truth.cleanPhone}
        primaryColor={truth.primaryColor}
      />

      {/* 2. QuickFleet Hero Card with Cinematic Facility Backdrop & Word Rhythm */}
      <QuickFleetHero
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
        phone={truth.phone}
        cleanPhone={truth.cleanPhone}
        primaryColor={truth.primaryColor}
      />

      {/* 3. Section 01: The Facility & Diagnostic Station (Interactive Hotspot Explorer) */}
      <QuickFleetHotspots truth={truth} city={truth.city} />

      {/* 4. Section 02: What We Do & How We Operate (Interactive Central Console Animation + 6-Discipline Catalog) */}
      <QuickFleetServicesInteractive
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
        cleanPhone={truth.cleanPhone}
        primaryColor={truth.primaryColor}
      />

      {/* 5. Section 03: The 3 Sticky Stacking Cards (Platforms, Bays, Digital Record) */}
      <QuickFleetStickyCards
        truth={truth}
        city={truth.city}
        primaryColor={truth.primaryColor}
      />

      {/* 6. Section 04: The Live Vehicle Telemetry & Repair Order Card (RO-40912) */}
      <QuickFleetLiveRecord
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
        phone={truth.phone}
        cleanPhone={truth.cleanPhone}
        primaryColor={truth.primaryColor}
      />

      {/* 7. Section 05: Cost & Turnaround Benchmark (Dealership Markup vs Independent) */}
      <QuickFleetCostBenchmark
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
      />

      {/* 8. Section 06: "Why It Matters" Tri-Card Matrix */}
      <QuickFleetWhyMatters truth={truth} city={truth.city} />

      {/* 9. Section 07: Customer Verification & Audited Repair Reviews */}
      <QuickFleetReviews truth={truth} city={truth.city} />

      {/* 10. Section 08: Closing Sheet & Instant Bay Reservation Form */}
      <QuickFleetBookingClose
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
        phone={truth.phone}
        cleanPhone={truth.cleanPhone}
        primaryColor={truth.primaryColor}
      />

      {/* 11. QuickFleet Minimalist Editorial Footer */}
      <QuickFleetFooter
        truth={truth}
        companyName={truth.companyName}
        city={truth.city}
        phone={truth.phone}
        cleanPhone={truth.cleanPhone}
        primaryColor={truth.primaryColor}
      />
    </div>
  );
}

export default UrgentService;
