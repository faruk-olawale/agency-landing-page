/**
 * Archetype Map Configuration
 * ============================================================================
 * Maps targeted local business industries into 3 structural UI Archetypes:
 * - UrgentService: High-intent immediate conversion (Plumbing, HVAC, Roofing, Electrical, Mechanic)
 * - ProfessionalTrust: High-authority consultation & retainers (Law Firm, CPA)
 * - AestheticBooking: High-ticket visual appointment scheduling (Dentist, MedSpa)
 * - Generic: Fallback for all other unclassified industries
 * ============================================================================
 */

export type Archetype =
  | "UrgentService"
  | "ProfessionalTrust"
  | "AestheticBooking"
  | "Generic";

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
  [key: string]: unknown;
}

export interface TemplateProps {
  clientData: ClientData;
}

export const ARCHETYPE_INDUSTRIES: Record<Exclude<Archetype, "Generic">, string[]> = {
  UrgentService: ["plumber", "hvac", "roofer", "electrician", "mechanic"],
  ProfessionalTrust: ["lawyer", "cpa"],
  AestheticBooking: ["dentist", "medspa"],
};

/**
 * Returns the UI Archetype for a given industry string.
 * Returns 'Generic' if no match is found.
 */
export function getArchetype(industry: string = ""): Archetype {
  if (!industry || typeof industry !== "string") return "Generic";
  const normalized = industry.toLowerCase().trim();

  // 1. Direct or keyword match against UrgentService niches
  if (
    ARCHETYPE_INDUSTRIES.UrgentService.some(
      (keyword) => normalized === keyword || normalized.includes(keyword)
    )
  ) {
    return "UrgentService";
  }

  // 2. Direct or keyword match against ProfessionalTrust niches
  if (
    ARCHETYPE_INDUSTRIES.ProfessionalTrust.some(
      (keyword) => normalized === keyword || normalized.includes(keyword)
    )
  ) {
    return "ProfessionalTrust";
  }

  // 3. Direct or keyword match against AestheticBooking niches
  if (
    ARCHETYPE_INDUSTRIES.AestheticBooking.some(
      (keyword) => normalized === keyword || normalized.includes(keyword)
    )
  ) {
    return "AestheticBooking";
  }

  // 4. Common exact aliases for database records
  if (
    normalized.includes("plumb") ||
    normalized.includes("roof") ||
    normalized.includes("electric")
  ) {
    return "UrgentService";
  }

  if (
    normalized.includes("law") ||
    normalized.includes("attorney") ||
    normalized.includes("legal")
  ) {
    return "ProfessionalTrust";
  }

  if (
    normalized.includes("dent") ||
    normalized.includes("med spa") ||
    normalized.includes("med-spa")
  ) {
    return "AestheticBooking";
  }

  return "Generic";
}

/**
 * Returns a high-converting default primary brand color for each industry and archetype
 */
export function getArchetypePrimaryColor(
  industry: string = "",
  archetype?: Archetype
): string {
  const norm = (industry || "").toLowerCase().trim();
  if (norm.includes("plumb")) return "#DC2626";
  if (norm.includes("hvac") || norm.includes("air") || norm.includes("heat")) return "#EA580C";
  if (norm.includes("roof")) return "#D97706";
  if (norm.includes("electr")) return "#EAB308";
  if (norm.includes("mechanic") || norm.includes("auto")) return "#F97316";
  if (norm.includes("law") || norm.includes("legal") || norm.includes("attorney")) return "#1E3A8A";
  if (norm.includes("cpa") || norm.includes("account") || norm.includes("tax")) return "#0F766E";
  if (norm.includes("dent") || norm.includes("ortho") || norm.includes("smile")) return "#0284C7";
  if (norm.includes("medspa") || norm.includes("spa") || norm.includes("aesthetic")) return "#BE185D";

  const arch = archetype || getArchetype(industry);
  if (arch === "UrgentService") return "#DC2626";
  if (arch === "ProfessionalTrust") return "#1E3A8A";
  if (arch === "AestheticBooking") return "#BE185D";
  return "#4F46E5";
}

