/**
 * Archetype Map Configuration — Automotive Repair & Diagnostics Engine
 * ============================================================================
 * Primary Vertical: Automotive Repair & Diagnostic Specialists.
 * Routes all qualified automotive repair, diagnostic, transmission, fleet,
 * and European specialists directly to the high-performance UrgentService
 * (QuickFleet) prototype engine.
 *
 * Preserves legacy types (ProfessionalTrust, AestheticBooking, Generic) for
 * backwards-compatibility with historical archived previews.
 * ============================================================================
 */

export type Archetype =
  | "UrgentService"
  | "ProfessionalTrust"
  | "AestheticBooking"
  | "Generic";

/**
 * Priority Automotive Segments within the single automotive vertical
 */
export const AUTOMOTIVE_SPECIALIZATIONS = [
  "Independent Auto Repair",
  "European Vehicle Specialist",
  "Transmission & Drivetrain",
  "Engine & ECU Diagnostics",
  "Fleet Diesel & Commercial",
  "Performance & Tuning",
  "Brake & Suspension Specialist",
  "Specialist Automotive Service",
] as const;

export type AutomotiveSpecialization = typeof AUTOMOTIVE_SPECIALIZATIONS[number];

/**
 * Explicit Negative Keywords for Disqualification
 * Generic dealerships, car washes, rentals, parts stores, and unrelated trades
 * are strictly disqualified from active prospecting.
 */
export const DISQUALIFIED_KEYWORDS = [
  "dealership",
  "dealer",
  "car sales",
  "used cars",
  "auto sales",
  "pre-owned",
  "financing",
  "car rental",
  "rental car",
  "car hire",
  "car wash",
  "auto detailing",
  "window tint",
  "auto parts",
  "autoparts",
  "junkyard",
  "salvage",
  "scrap",
  "wreckers",
  "towing only",
  "impound",
  "plumber",
  "plumbing",
  "hvac",
  "roofing",
  "electrician",
  "lawyer",
  "attorney",
  "dentist",
  "medspa",
  "cpa",
] as const;

/**
 * Positive repair and diagnostic signals
 */
export const QUALIFIED_AUTOMOTIVE_KEYWORDS = [
  "auto repair",
  "car repair",
  "mechanic",
  "automotive",
  "auto service",
  "diagnostic",
  "diagnostics",
  "transmission",
  "engine",
  "ecu",
  "electrical",
  "diesel",
  "fleet repair",
  "european auto",
  "bmw",
  "audi",
  "mercedes",
  "porsche",
  "volkswagen",
  "brake",
  "suspension",
  "tuning",
  "dyno",
  "motor repair",
  "drivetrain",
  "check engine",
] as const;

export interface AutomotiveQualificationResult {
  isQualified: boolean;
  specialization: AutomotiveSpecialization;
  reason: string;
  isDisqualified: boolean;
  disqualificationReason?: string;
}

/**
 * Validates whether a business qualifies for active automotive outreach.
 * Disqualifies dealerships, rentals, parts retailers, car washes, and unrelated trades.
 */
export function qualifyAutomotiveLead(lead: {
  company: string;
  niche?: string;
  industry?: string;
  website?: string;
}): AutomotiveQualificationResult {
  const combined = `${lead.company} ${lead.niche || ""} ${lead.industry || ""} ${lead.website || ""}`.toLowerCase();

  // 1. Check for negative keywords (Disqualify non-repair businesses)
  for (const neg of DISQUALIFIED_KEYWORDS) {
    // Avoid false positives like "dealership alternative"
    if (combined.includes(neg) && !combined.includes("dealership alternative")) {
      return {
        isQualified: false,
        isDisqualified: true,
        specialization: "Independent Auto Repair",
        reason: `Disqualified: Business matched excluded category keyword "${neg}". Active prospecting strictly targets automotive repair & diagnostics facilities.`,
        disqualificationReason: `Excluded category: ${neg}`,
      };
    }
  }

  // 2. Check for positive repair & diagnostic signals
  const matchedSignal = QUALIFIED_AUTOMOTIVE_KEYWORDS.find((sig) => combined.includes(sig));
  if (!matchedSignal) {
    return {
      isQualified: false,
      isDisqualified: false,
      specialization: "Independent Auto Repair",
      reason: "Inconclusive: No verified automotive repair or diagnostic specialization signals identified in business profile.",
      disqualificationReason: "Unverified repair offering",
    };
  }

  // 3. Classify into specific automotive specialization
  const specialization = inferAutomotiveSpecialization(combined);

  return {
    isQualified: true,
    isDisqualified: false,
    specialization,
    reason: `Qualified: Verified ${specialization} facility with active diagnostic and repair capabilities.`,
  };
}

/**
 * Infers specific automotive specialization from text signals
 */
export function inferAutomotiveSpecialization(text: string): AutomotiveSpecialization {
  const lower = text.toLowerCase();
  if (
    lower.includes("bmw") ||
    lower.includes("audi") ||
    lower.includes("mercedes") ||
    lower.includes("porsche") ||
    lower.includes("european") ||
    lower.includes("volkswagen") ||
    lower.includes("euro")
  ) {
    return "European Vehicle Specialist";
  }
  if (lower.includes("transmission") || lower.includes("gearbox") || lower.includes("drivetrain")) {
    return "Transmission & Drivetrain";
  }
  if (lower.includes("diesel") || lower.includes("fleet") || lower.includes("commercial vehicle")) {
    return "Fleet Diesel & Commercial";
  }
  if (
    lower.includes("ecu") ||
    lower.includes("electrical") ||
    lower.includes("diagnostic") ||
    lower.includes("engine rebuild") ||
    lower.includes("check engine")
  ) {
    return "Engine & ECU Diagnostics";
  }
  if (lower.includes("tuning") || lower.includes("dyno") || lower.includes("performance") || lower.includes("motorsport")) {
    return "Performance & Tuning";
  }
  if (lower.includes("brake") || lower.includes("suspension") || lower.includes("alignment") || lower.includes("chassis")) {
    return "Brake & Suspension Specialist";
  }
  if (lower.includes("specialist") || lower.includes("service center")) {
    return "Specialist Automotive Service";
  }
  return "Independent Auto Repair";
}

export interface ClientColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
}

export interface ClientData {
  company: string;
  name?: string;
  industry: string;
  niche?: string;
  specialization?: AutomotiveSpecialization | string;
  website?: string;
  country?: string;
  countryCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  colors?: ClientColors;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  mobilePageSpeed?: number;
  mobileLoadTimeSec?: number;
  estLostMonthlySpend?: number;
  currency?: string;
  currencySymbol?: string;
  cms?: string;
  detectedPlugins?: string;
  hasAdTags?: boolean;
  hasMarketingPixels?: boolean;
  adEvidenceStatus?: "verified_ads" | "no_detected_ads" | "inconclusive";
  qualificationStatus?: "qualified" | "unverified" | "disqualified";
  qualificationReason?: string;
  isDemoMode?: boolean;
  [key: string]: unknown;
}

export interface TemplateProps {
  clientData: ClientData;
  isDemoMode?: boolean;
}

export const ARCHETYPE_INDUSTRIES: Record<Exclude<Archetype, "Generic">, string[]> = {
  UrgentService: [
    "auto",
    "automotive",
    "mechanic",
    "auto repair",
    "car repair",
    "transmission",
    "diesel",
    "bmw",
    "audi",
    "mercedes",
    "porsche",
    "european auto",
    "diagnostic",
    "diagnostics",
    "engine",
    "brake",
    "ecu",
    "fleet repair",
    "independent auto repair",
    "european vehicle specialist",
    "plumber",
    "hvac",
    "roofer",
    "electrician",
  ],
  ProfessionalTrust: ["lawyer", "cpa", "legal", "attorney"],
  AestheticBooking: ["dentist", "medspa", "dental"],
};

/**
 * Returns the UI Archetype for a given industry string.
 * All automotive segments map directly to UrgentService (QuickFleet engine).
 */
export function getArchetype(industry: string = ""): Archetype {
  if (!industry || typeof industry !== "string") return "UrgentService";
  const normalized = industry.toLowerCase().trim();

  // 1. Direct or keyword match against UrgentService (Automotive primary)
  if (
    ARCHETYPE_INDUSTRIES.UrgentService.some(
      (keyword) => normalized === keyword || normalized.includes(keyword)
    )
  ) {
    return "UrgentService";
  }

  // 2. Legacy backwards-compatibility for existing historical records
  if (
    ARCHETYPE_INDUSTRIES.ProfessionalTrust.some(
      (keyword) => normalized === keyword || normalized.includes(keyword)
    )
  ) {
    return "ProfessionalTrust";
  }

  if (
    ARCHETYPE_INDUSTRIES.AestheticBooking.some(
      (keyword) => normalized === keyword || normalized.includes(keyword)
    )
  ) {
    return "AestheticBooking";
  }

  // Common aliases
  if (
    normalized.includes("auto") ||
    normalized.includes("mechanic") ||
    normalized.includes("repair") ||
    normalized.includes("transmission") ||
    normalized.includes("diesel") ||
    normalized.includes("engine") ||
    normalized.includes("brake") ||
    normalized.includes("diagnostic")
  ) {
    return "UrgentService";
  }

  if (normalized.includes("law") || normalized.includes("attorney") || normalized.includes("legal")) {
    return "ProfessionalTrust";
  }

  if (normalized.includes("dent") || normalized.includes("med spa") || normalized.includes("med-spa")) {
    return "AestheticBooking";
  }

  return "UrgentService"; // Default to primary automotive engine
}

/**
 * Returns high-converting default primary brand colors tailored to automotive specializations.
 */
export function getArchetypePrimaryColor(
  industry: string = "",
  archetype?: Archetype
): string {
  const norm = (industry || "").toLowerCase().trim();

  // European specialists (BMW / Audi / Mercedes / Porsche): Bavarian Blue
  if (
    norm.includes("bmw") ||
    norm.includes("audi") ||
    norm.includes("mercedes") ||
    norm.includes("porsche") ||
    norm.includes("european")
  ) {
    return "#2563EB";
  }

  // Engine diagnostics & ECU: Precision Amber / Electric High-Volt
  if (norm.includes("diagnostic") || norm.includes("ecu") || norm.includes("electrical")) {
    return "#D97706";
  }

  // Diesel & Fleet: Heavy Duty Emerald
  if (norm.includes("diesel") || norm.includes("fleet")) {
    return "#059669";
  }

  // Performance & Tuning: Crimson Performance
  if (norm.includes("performance") || norm.includes("tuning") || norm.includes("dyno")) {
    return "#DC2626";
  }

  // Transmission & Drivetrain: High-Octane Cobalt
  if (norm.includes("transmission") || norm.includes("drivetrain")) {
    return "#0284C7";
  }

  // General Independent Auto Repair: QuickFleet Precision Teal
  if (
    norm.includes("mechanic") ||
    norm.includes("auto") ||
    norm.includes("repair") ||
    norm.includes("brake")
  ) {
    return "#0A997D";
  }

  // Legacy fallback colors
  if (norm.includes("law") || norm.includes("legal")) return "#1E3A8A";
  if (norm.includes("cpa") || norm.includes("account")) return "#0F766E";
  if (norm.includes("dent")) return "#0284C7";
  if (norm.includes("medspa")) return "#BE185D";

  const arch = archetype || getArchetype(industry);
  if (arch === "UrgentService") return "#0A997D";
  if (arch === "ProfessionalTrust") return "#1E3A8A";
  if (arch === "AestheticBooking") return "#BE185D";
  return "#0A997D";
}

/**
 * Returns cohesive secondary brand colors for automotive specializations.
 */
export function getArchetypeSecondaryColor(
  industry: string = "",
  archetype?: Archetype
): string {
  const norm = (industry || "").toLowerCase().trim();

  if (norm.includes("european") || norm.includes("bmw") || norm.includes("audi")) {
    return "#1E1B4B"; // Deep Bavaria Slate
  }

  if (norm.includes("diesel") || norm.includes("fleet")) {
    return "#064E3B"; // Deep Commercial Forest
  }

  if (norm.includes("performance") || norm.includes("tuning")) {
    return "#450A0A"; // Deep Track Crimson
  }

  // Automotive Default: Deep Engine Iron
  if (
    norm.includes("mechanic") ||
    norm.includes("auto") ||
    norm.includes("transmission") ||
    norm.includes("diagnostic") ||
    norm.includes("repair")
  ) {
    return "#0F172A";
  }

  // Legacy fallback
  if (norm.includes("law")) return "#0F172A";
  if (norm.includes("cpa")) return "#134E4A";
  if (norm.includes("dent")) return "#0C4A6E";
  if (norm.includes("medspa")) return "#FDF2F8";

  const arch = archetype || getArchetype(industry);
  if (arch === "UrgentService") return "#0F172A";
  if (arch === "ProfessionalTrust") return "#0F172A";
  if (arch === "AestheticBooking") return "#FDF2F8";
  return "#0F172A";
}


