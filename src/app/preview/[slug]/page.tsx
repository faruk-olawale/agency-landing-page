import React from "react";
import type { Metadata } from "next";
import { getArchetype, getArchetypePrimaryColor } from "@/lib/archetypeMap";
import type { ClientData } from "@/lib/archetypeMap";
import { UrgentService } from "@/components/templates/UrgentService";
import { ProfessionalTrust } from "@/components/templates/ProfessionalTrust";
import { AestheticBooking } from "@/components/templates/AestheticBooking";
import { GenericTemplate } from "@/components/templates/GenericTemplate";
import rawLeadsData from "../../../../leads/global_leads_audit.json";

interface LeadRecord {
  company: string;
  website: string;
  country?: string;
  countryCode?: string;
  city?: string;
  industry?: string;
  niche?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  mobilePageSpeed?: number;
  mobileLoadTimeSec?: number;
  currency?: string;
  currencySymbol?: string;
  cms?: string;
  detectedPlugins?: string;
  estLostMonthlySpend?: number;
  hasAdTags?: boolean;
  hasMarketingPixels?: boolean;
  [key: string]: unknown;
}

const leadsData = rawLeadsData as LeadRecord[];

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getQueryValue(val: string | string[] | undefined): string | undefined {
  if (!val) return undefined;
  if (Array.isArray(val)) return val[0];
  return val;
}

/**
 * Normalizes and infers the industry string from query, database record, or slug
 */
function extractIndustry(
  found?: LeadRecord,
  query?: { [key: string]: string | string[] | undefined },
  slug: string = ""
): string {
  const queryIndustry = getQueryValue(query?.industry);
  if (queryIndustry && queryIndustry.trim()) {
    return queryIndustry.trim();
  }

  const queryNiche = getQueryValue(query?.niche);
  if (queryNiche && queryNiche.trim()) {
    return queryNiche.trim();
  }

  if (found?.industry && typeof found.industry === "string" && found.industry.trim()) {
    return found.industry.trim();
  }

  if (found?.niche && typeof found.niche === "string" && found.niche.trim()) {
    return found.niche.trim();
  }

  // Fallback keyword detection on slug
  const lowerSlug = slug.toLowerCase();
  const targetedNiches = [
    "plumber",
    "hvac",
    "roofer",
    "electrician",
    "mechanic",
    "lawyer",
    "cpa",
    "dentist",
    "medspa",
  ];
  const matched = targetedNiches.find((n) => lowerSlug.includes(n));
  if (matched) return matched;

  return "";
}

/**
 * Resolves full client/lead data object from slug and optional search params
 */
function fetchLeadData(
  slug: string,
  query?: { [key: string]: string | string[] | undefined }
): ClientData {
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");

  // 1. Exact match on company or website
  let found = leadsData.find((l) => {
    const leadSlug = (l.company || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const domainSlug = (l.website || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return leadSlug === normalizedSlug || domainSlug === normalizedSlug;
  });

  // 2. Substring fallback
  if (!found) {
    found = leadsData.find((l) => {
      const leadSlug = (l.company || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      const domainSlug = (l.website || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return (
        (leadSlug && leadSlug.includes(normalizedSlug)) ||
        (domainSlug && domainSlug.includes(normalizedSlug)) ||
        (leadSlug && normalizedSlug.includes(leadSlug))
      );
    });
  }

  const company =
    getQueryValue(query?.name) ||
    found?.company ||
    (slug
      ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Acme Services");

  const rawIndustry = extractIndustry(found, query, slug);

  const website =
    getQueryValue(query?.domain) ||
    getQueryValue(query?.website) ||
    found?.website ||
    (slug ? `https://${slug}.com` : "https://example.com");

  const city =
    getQueryValue(query?.city) ||
    found?.city ||
    "Metropolitan Area";

  const phone =
    getQueryValue(query?.phone) ||
    found?.phone ||
    "";

  const email =
    getQueryValue(query?.email) ||
    found?.email ||
    "";

  const primaryColor =
    getQueryValue(query?.primaryColor) ||
    getArchetypePrimaryColor(rawIndustry, getArchetype(rawIndustry));
  const secondaryColor = getQueryValue(query?.secondaryColor);
  const accentColor = getQueryValue(query?.accentColor);

  return {
    company,
    industry: rawIndustry,
    niche: found?.niche || rawIndustry,
    website,
    city,
    country: getQueryValue(query?.country) || found?.country,
    countryCode: getQueryValue(query?.cc) || found?.countryCode,
    phone,
    email,
    colors: {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
    },
    primaryColor,
    secondaryColor,
    accentColor,
    mobilePageSpeed: Number(getQueryValue(query?.speed)) || found?.mobilePageSpeed,
    mobileLoadTimeSec: Number(getQueryValue(query?.load)) || found?.mobileLoadTimeSec,
    estLostMonthlySpend: Number(getQueryValue(query?.waste)) || found?.estLostMonthlySpend,
    cms: found?.cms,
    detectedPlugins: found?.detectedPlugins,
    hasAdTags: found?.hasAdTags,
    hasMarketingPixels: found?.hasMarketingPixels,
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const lead = fetchLeadData(slug, query);

  return {
    title: `${lead.company} | High-Speed Prototype Preview`,
    description: `High-conversion speed-optimized landing page prototype for ${lead.company} (${lead.industry || "Local Business"}).`,
  };
}

/**
 * Controller Route: app/preview/[slug]/page.tsx
 * ============================================================================
 * 1. Fetches lead data based on the URL slug & query.
 * 2. Extracts normalized industry string.
 * 3. Passes industry to getArchetype(industry).
 * 4. Uses a switch statement on the archetype to render the correct template.
 * ============================================================================
 */
export default async function PreviewPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};

  // 1. Fetch the lead data based on the URL slug
  const lead = fetchLeadData(slug, query);

  // 2. Extract the normalized industry string
  const normalizedIndustry = (lead.industry || "").toLowerCase().trim();

  // 3. Pass it to getArchetype(industry)
  const archetype = getArchetype(normalizedIndustry);

  // 4. Use a switch statement on the returned archetype to render and return the correct template
  switch (archetype) {
    case "UrgentService":
      return <UrgentService clientData={lead} />;

    case "ProfessionalTrust":
      return <ProfessionalTrust clientData={lead} />;

    case "AestheticBooking":
      return <AestheticBooking clientData={lead} />;

    case "Generic":
    default:
      return <GenericTemplate clientData={lead} />;
  }
}
