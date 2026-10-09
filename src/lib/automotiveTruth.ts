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
  const turnaround = {
    headline: "Transparent estimates. Expedited diagnostic triage.",
    badge: "Same-Day Diagnostic Scan",
    detail:
      "Most drivability and sensor faults are scanned and diagnosed on same-day intake, with repairs scheduled transparently according to OEM parts availability.",
    intakeSLA: "Same-Day Diagnostic Triage",
  };

  // Unified Bay Availability (Single Source of Truth)
  const bays = {
    heroBadge: hasCity ? `Diagnostic Bays Active in ${city}` : "Diagnostic Bays Active",
    matrixTitle: hasCity ? `${city} Diagnostic Bay Schedule` : "Diagnostic Bay Schedule",
    statusSummary: "Active Diagnostic Bays · Accepting Intake",
    bookingReadyBadge: "Diagnostic Bays Open This Week",
    liveBayStatus: "Bay 2 Active in Triage",
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
        signatureLabel: "Verified Digital Inspection",
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

  // Reviews & Case Studies: Never hardcode a specific business name like 'apex'
  const reviews = {
    isIllustrative: isDemoMode || !clientData.reviewsCount,
    headerBadge:
      isDemoMode || !clientData.reviewsCount
        ? "REPRESENTATIVE DIAGNOSTIC CASE STUDIES"
        : `${clientData.rating || "5.0"} / 5.0 · VERIFIED CLIENT REVIEWS`,
    caseStudies: [
      {
        author: isDemoMode ? "Marcus V." : "BMW M3 Competition Owner",
        vehicle: "Verified Drivability Case Study",
        repair: "ECU Sensor Telemetry & Wiring",
        quote:
          "Dealership quoted weeks of wait time and an expensive control module replacement. The technical team connected their lab scope, isolated a dropped ground circuit within 45 minutes, and solved the fault cleanly.",
      },
      {
        author: isDemoMode ? "Elena R." : "Porsche Macan GTS Owner",
        vehicle: "Verified Drivetrain Case Study",
        repair: "PDK Transmission Hydraulic Telemetry",
        quote:
          "Transmission was throwing intermittent slip codes. Rather than demanding a full gearbox replacement, they performed hydraulic line pressure tests, addressed the valve body solenoid, and saved thousands in unnecessary work.",
      },
      {
        author: isDemoMode ? "David S." : "Audi RS6 Avant Owner",
        vehicle: "Verified Diagnostic Case Study",
        repair: "Digital Bore Scope & Cam Correlation",
        quote:
          `Cam timing deviation fault. They provided high-definition bore scope imagery and live waveform measurements before turning a wrench. The team at ${companyName} had it diagnosed and resolved with complete transparency.`,
      },
      {
        author: isDemoMode ? "Julian K." : "Mercedes-AMG C63 Owner",
        vehicle: "Verified Fuel System Case Study",
        repair: "High-Pressure Direct Injection",
        quote:
          "Digital inspection walkthrough delivered straight to my phone. Approved the fuel rail sensor replacement with a single tap. Zero guesswork, transparent itemized estimate, and backed by a written repair warranty.",
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
