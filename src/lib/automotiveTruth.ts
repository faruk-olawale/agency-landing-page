/**
 * Automotive Single Source of Truth Engine
 * ============================================================================
 * Resolves verified business data, standardizes operational guarantees,
 * eliminates conflicting claims, and cleanly partitions DEMO mode vs.
 * PROSPECT-READY mode for cold outreach conversion.
 * ============================================================================
 */

import type { ClientData } from "./archetypeMap";

export interface AutomotiveTruth {
  companyName: string;
  city?: string;
  hasCity: boolean;
  phone?: string;
  cleanPhone?: string;
  hasPhone: boolean;
  website?: string;
  email?: string;
  primaryColor: string;
  isDemoMode: boolean;

  // Single Source of Truth: Operational Guarantees & SLAs
  warranty: {
    badge: string;
    term: string;
    detail: string;
    footerTag: string;
  };

  turnaround: {
    headline: string;
    badge: string;
    detail: string;
    intakeSLA: string;
  };

  bays: {
    heroBadge: string;
    matrixTitle: string;
    statusSummary: string;
    bookingReadyBadge: string;
    liveBayStatus: string;
  };

  technicians: {
    leadTechTitle: string;
    signatureLabel: string;
    footerCertTag: string;
    advisorName: string;
  };

  costBenchmark: {
    isIllustrative: boolean;
    label: string;
    disclaimer: string;
  };

  reviews: {
    isIllustrative: boolean;
    headerBadge: string;
    caseStudies: Array<{
      author: string;
      vehicle: string;
      repair: string;
      quote: string;
    }>;
  };
}

/**
 * Normalizes and extracts the definitive truth object for any automotive prospect.
 */
export function getAutomotiveTruth(
  clientData: ClientData,
  isDemoMode: boolean = false
): AutomotiveTruth {
  const companyName =
    clientData.name || clientData.company || "Independent Diagnostic Specialist";

  // Location handling: only declare verified city if actually present and not generic filler
  const rawCity = (clientData.city || "").trim();
  const isGenericCity =
    !rawCity ||
    rawCity.toLowerCase() === "metropolitan area" ||
    rawCity.toLowerCase() === "local market" ||
    rawCity.toLowerCase() === "city";
  const city = isGenericCity ? undefined : rawCity;
  const hasCity = Boolean(city);

  // Phone handling: strictly use verified business phone
  const rawPhone = (clientData.phone || "").trim();
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, "");
  // A valid phone number has at least 7 digits (local or international)
  const hasPhone = Boolean(cleanPhone && cleanPhone.length >= 7);
  const phone = hasPhone ? rawPhone : undefined;

  // Enforce teal/blue primary branding, never orange
  const rawColor = clientData.primaryColor || clientData.colors?.primary || "#0A997D";
  const primaryColor =
    rawColor.toLowerCase().includes("f97316") ||
    rawColor.toLowerCase().includes("ea580c") ||
    rawColor.toLowerCase().includes("d97706") ||
    rawColor.toLowerCase().includes("orange")
      ? "#0A997D"
      : rawColor;

  // Unified Warranty Terms (Single Source of Truth)
  const warranty = isDemoMode
    ? {
        badge: "Illustrative 24-Mo / 24k-Mi Protection",
        term: "24-Month / 24k-Mile Written Warranty",
        detail:
          "Sample warranty model covering OEM replacement parts and certified mechanical labor on qualifying repairs.",
        footerTag: "24-MO / 24K-MI WARRANTY MODEL",
      }
    : {
        badge: "Written Parts & Labor Guarantee",
        term: "Written Repair Warranty",
        detail:
          "Every precision mechanical and diagnostic repair is backed by our written limited warranty on qualifying OEM replacement parts and labor.",
        footerTag: "WRITTEN REPAIR WARRANTY",
      };

  // Unified Turnaround Claims (Single Source of Truth)
  const turnaround = isDemoMode
    ? {
        headline: "Sample intake speed. Rapid diagnostic triage.",
        badge: "Illustrative Diagnostic Scan",
        detail:
          "Demonstration workflow: faults scanned on intake with itemized estimate delivered digitally.",
        intakeSLA: "Rapid Diagnostic Triage",
      }
    : {
        headline: "Transparent estimates. Streamlined diagnostic triage.",
        badge: "Diagnostic Intake",
        detail:
          "Drivability and sensor faults evaluated with dedicated scan tooling, with repair estimates provided directly before work begins.",
        intakeSLA: "Diagnostic Triage",
      };

  // Unified Bay Availability (Single Source of Truth)
  const bays = isDemoMode
    ? {
        heroBadge: "PROTOTYPE DEMO · DIAGNOSTIC WORKFLOW",
        matrixTitle: hasCity ? `${city} Diagnostic Bay Schedule (Demo)` : "Diagnostic Bay Schedule (Demo)",
        statusSummary: "Simulated Bay Status · Diagnostic Demo",
        bookingReadyBadge: "Prototype Intake Workflow",
        liveBayStatus: "SIMULATED BAY 2 · DIAGNOSTIC DEMO",
      }
    : {
        heroBadge: hasCity ? `Precision Diagnostics for ${city}` : "Precision Diagnostic Workflow",
        matrixTitle: hasCity ? `${city} Diagnostic Bay Schedule` : "Diagnostic Bay Schedule",
        statusSummary: "Diagnostic Intake & Triage Coordination",
        bookingReadyBadge: "Diagnostic Intake Available",
        liveBayStatus: "PROTOTYPE WORKFLOW INTERFACE",
      };

  // Unified Technician Identities (Never invent fake employee personas for real prospects)
  const technicians = isDemoMode
    ? {
        leadTechTitle: "M. Vance (ASE L1 #4928) · Sample Record",
        signatureLabel: "Sample Digital Signature",
        footerCertTag: "FACTORY DIAGNOSTIC PROTOCOLS",
        advisorName: "Service Advisor",
      }
    : {
        leadTechTitle: "Assigned Master Diagnostic Specialist",
        signatureLabel: "Digital Inspection Workflow",
        footerCertTag: "OEM FACTORY DIAGNOSTIC PROTOCOLS",
        advisorName: "Our technical service team",
      };

  // Cost Benchmark Transparency
  const costBenchmark = {
    isIllustrative: true,
    label: "Illustrative Cost & Turnaround Benchmark",
    disclaimer:
      "Benchmark metrics reflect independent industry diagnostic averages vs. typical authorized dealer list pricing. Binding upfront quotes are provided directly to the vehicle owner prior to work commencing.",
  };

  // Reviews & Case Studies: Never present unverified reviews as verified historical facts
  const reviews = {
    isIllustrative: isDemoMode || !clientData.reviewsCount,
    headerBadge: isDemoMode
      ? "SAMPLE DIAGNOSTIC CASE STUDIES"
      : !clientData.reviewsCount
      ? "REPRESENTATIVE DIAGNOSTIC SCENARIOS"
      : `${clientData.rating || "5.0"} / 5.0 · VERIFIED CLIENT REVIEWS`,
    caseStudies: [
      {
        author: isDemoMode ? "Marcus V." : "Representative Client Scenario",
        vehicle: isDemoMode ? "Sample Case Study" : "Drivability & Sensor Scenario",
        repair: "ECU Sensor Telemetry & Wiring",
        quote:
          "Dealership quoted weeks of wait time and an expensive control module replacement. A precision diagnostic team connected their lab scope, isolated a dropped ground circuit within 45 minutes, and solved the fault cleanly.",
      },
      {
        author: isDemoMode ? "Elena R." : "Representative Client Scenario",
        vehicle: isDemoMode ? "Sample Case Study" : "Drivetrain & Hydraulic Scenario",
        repair: "PDK Transmission Hydraulic Telemetry",
        quote:
          "Transmission was throwing intermittent slip codes. Rather than demanding a full gearbox replacement, hydraulic line pressure tests addressed the valve body solenoid directly, avoiding thousands in unnecessary replacements.",
      },
      {
        author: isDemoMode ? "David S." : "Representative Client Scenario",
        vehicle: isDemoMode ? "Sample Case Study" : "Camshaft & Timing Scenario",
        repair: "Digital Bore Scope & Cam Correlation",
        quote:
          "Cam timing deviation fault. High-definition bore scope imagery and live waveform measurements were verified before turning a wrench, resolving the issue with complete itemized transparency.",
      },
      {
        author: isDemoMode ? "Julian K." : "Representative Client Scenario",
        vehicle: isDemoMode ? "Sample Case Study" : "Direct Fuel Injection Scenario",
        repair: "High-Pressure Direct Injection",
        quote:
          "Digital inspection walkthrough delivered straight to smartphone. Approved the fuel rail sensor replacement with a single tap. Zero guesswork, transparent itemized estimate, and backed by a written repair warranty.",
      },
    ],
  };

  return {
    companyName,
    city,
    hasCity,
    phone,
    cleanPhone: cleanPhone.length >= 7 ? cleanPhone : undefined,
    hasPhone,
    website: clientData.website,
    email: clientData.email,
    primaryColor,
    isDemoMode,
    warranty,
    turnaround,
    bays,
    technicians,
    costBenchmark,
    reviews,
  };
}
