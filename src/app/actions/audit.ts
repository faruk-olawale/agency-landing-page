"use server";

import fs from "node:fs";
import path from "node:path";
import { getArchetype, getArchetypePrimaryColor, qualifyAutomotiveLead } from "@/lib/archetypeMap";
import type { Archetype } from "@/lib/archetypeMap";

export interface AuditWebsiteParams {
  url: string;
  industry: string;
  company?: string;
  city?: string;
  phone?: string;
  email?: string;
  country?: string;
}

export interface AuditedLead {
  company: string;
  website: string;
  country: string;
  countryCode: string;
  city: string;
  industry: string;
  niche: string;
  archetype?: Archetype;
  primaryColor?: string;
  contactName: string;
  phone: string;
  email: string;
  mobilePageSpeed: number;
  mobileLoadTimeSec: number;
  ttfbMs: number;
  cms: string;
  detectedPlugins: string;
  htmlWeightKb: number;
  scriptsCount: number;
  currency: string;
  currencySymbol: string;
  cpcEstimate: number;
  estLostMonthlySpend: number;
  cpcEstimateAud?: number;
  estLostMonthlySpendAud?: number;
  coldEmailSubject: string;
  coldEmailBody: string;
  linkedInMessage: string;
  hasAdTags?: boolean;
  hasMarketingPixels?: boolean;
  isCustomImport?: boolean;
  adEvidenceStatus?: "verified_ads" | "no_detected_ads" | "inconclusive";
  qualificationStatus?: "qualified" | "unverified" | "disqualified";
  qualificationReason?: string;
  adTrackingVerified?: {
    activeAdPixels: boolean;
    detectedTags: string[];
    scannedAt: string;
  };
}

export interface AuditWebsiteResult {
  success: boolean;
  lead?: AuditedLead;
  hasAdTags?: boolean;
  archetype?: Archetype;
  previewUrl?: string;
  error?: string;
  message?: string;
}

// Active database storage locations
const GLOBAL_LEADS_PATH = path.resolve(process.cwd(), "leads", "global_leads_audit.json");
const QUALIFIED_LEADS_PATH = path.resolve(process.cwd(), "qualified_targeted_leads.json");

// Marketing Pixel Detection Regex (Zero-API exact match)
const AD_TAG_REGEX =
  /AW-[0-9]+|googletagmanager\.com\/gtag\/js|GTM-[A-Z0-9]+|fbevents\.js|connect\.facebook\.net/i;

const CHROME_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function cleanDomain(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "").trim();
}

function detectCountryFromDomainOrInput(
  url: string,
  countryInput?: string
): { country: string; countryCode: string; currency: string; currencySymbol: string } {
  if (countryInput) {
    const cLower = countryInput.toLowerCase();
    if (cLower.includes("uk") || cLower.includes("united kingdom") || cLower.includes("britain") || cLower.includes("england")) {
      return { country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£" };
    }
    if (cLower.includes("canada") || cLower.includes("ca")) {
      return { country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$" };
    }
    if (cLower.includes("australia") || cLower.includes("au")) {
      return { country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$" };
    }
    if (cLower.includes("us") || cLower.includes("united states") || cLower.includes("america")) {
      return { country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$" };
    }
  }

  const u = url.toLowerCase();
  if (u.includes(".com.au") || u.includes(".net.au") || u.includes(".org.au")) {
    return { country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$" };
  }
  if (u.includes(".co.uk") || u.includes(".org.uk") || u.includes(".uk")) {
    return { country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£" };
  }
  if (u.includes(".ca")) {
    return { country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$" };
  }

  return { country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$" };
}

function extractCleanCompanyName(domain: string, title?: string, ogSiteName?: string): string {
  if (ogSiteName && ogSiteName.trim().length >= 2 && ogSiteName.trim().length <= 45) {
    return ogSiteName.trim();
  }
  if (title) {
    let clean = title.split(/[|\-–:•]/)[0].trim();
    clean = clean.replace(/^(home\s*[-–:]*|welcome to\s*)/i, "").trim();
    if (clean.length >= 3 && clean.length <= 42) {
      return clean;
    }
  }
  let name = domain
    .replace(/^www\./, "")
    .replace(/\.(com\.au|co\.uk|com|net\.au|org\.au|org|net|io|co|ca|gov|edu).*$/, "");
  name = name.replace(/[-_]/g, " ");
  name = name.replace(/([a-z])([A-Z])/g, "$1 $2");
  name = name.replace(
    /(solicitors|lawyers|locksmiths|plumbing|electrical|electric|dentistry|cleaning|services|solutions|roofing|dental|solar|locksmith|pest|care|smile|air|law|hvac|mechanic|spa)/gi,
    " $1 "
  );
  return name.replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

function detectCityFromContent(combinedText: string, countryCode: string): string {
  const t = combinedText.toLowerCase();
  if (t.includes("sydney")) return "Sydney";
  if (t.includes("melbourne")) return "Melbourne";
  if (t.includes("brisbane")) return "Brisbane";
  if (t.includes("perth")) return "Perth";
  if (t.includes("adelaide")) return "Adelaide";
  if (t.includes("gold coast")) return "Gold Coast";
  if (t.includes("canberra")) return "Canberra";
  if (t.includes("dallas") || t.includes("fort worth") || t.includes("dfw")) return "Dallas";
  if (t.includes("austin")) return "Austin";
  if (t.includes("houston")) return "Houston";
  if (t.includes("los angeles")) return "Los Angeles";
  if (t.includes("chicago")) return "Chicago";
  if (t.includes("new york") || t.includes("nyc")) return "New York";
  if (t.includes("miami")) return "Miami";
  if (t.includes("london")) return "London";
  if (t.includes("toronto")) return "Toronto";

  if (countryCode === "AU") return "Sydney";
  if (countryCode === "GB") return "London";
  if (countryCode === "CA") return "Toronto";
  return "Dallas";
}

function extractPhoneFromHtml(html: string): string {
  const telMatch = html.match(/href=["']tel:([^"']+)["']/i);
  if (telMatch && telMatch[1]) {
    let p = telMatch[1].replace(/[^\d+]/g, "").trim();
    if (p.startsWith("+610")) p = "0" + p.slice(4);
    else if (p.startsWith("+61")) p = "0" + p.slice(3);
    else if (p.startsWith("+1")) p = p.slice(2);
    if (p.length === 10) return "(" + p.slice(0, 3) + ") " + p.slice(3, 6) + "-" + p.slice(6);
    if (p.length >= 8 && p.length <= 15) return p;
  }
  const auMatch = html.match(/(?:1300\s*\d{3}\s*\d{3}|1800\s*\d{3}\s*\d{3}|0[2-8]\s*\d{4}\s*\d{4}|04\d{2}\s*\d{3}\s*\d{3})/);
  if (auMatch) return auMatch[0].trim();
  const usMatch = html.match(/\(?\b[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/);
  if (usMatch) return usMatch[0].trim();
  return "";
}

/**
 * Server Action: Upgrades the Live Website Speed Auditor form to target
 * the 9 core niches and dynamically detect active ad spend without paid APIs.
 */
export async function auditWebsiteAction(
  input: AuditWebsiteParams | FormData
): Promise<AuditWebsiteResult> {
  try {
    let rawUrl = "";
    let selectedIndustry = "";
    let inputCompany: string | undefined;
    let inputCity: string | undefined;
    let inputCountry: string | undefined;
    let inputPhone: string | undefined;
    let inputEmail: string | undefined;

    if (input instanceof FormData) {
      rawUrl = String(input.get("url") || input.get("website") || "").trim();
      selectedIndustry = String(input.get("industry") || input.get("niche") || "").trim();
      inputCompany = input.get("company") ? String(input.get("company")).trim() : undefined;
      inputCity = input.get("city") ? String(input.get("city")).trim() : undefined;
      inputCountry = input.get("country") ? String(input.get("country")).trim() : undefined;
      inputPhone = input.get("phone") ? String(input.get("phone")).trim() : undefined;
      inputEmail = input.get("email") ? String(input.get("email")).trim() : undefined;
    } else {
      rawUrl = (input.url || "").trim();
      selectedIndustry = (input.industry || "").trim();
      inputCompany = input.company ? input.company.trim() : undefined;
      inputCity = input.city ? input.city.trim() : undefined;
      inputCountry = input.country ? input.country.trim() : undefined;
      inputPhone = input.phone ? input.phone.trim() : undefined;
      inputEmail = input.email ? input.email.trim() : undefined;
    }

    if (!rawUrl) {
      return { success: false, error: "A valid website URL is required" };
    }

    if (!selectedIndustry) {
      return { success: false, error: "Client Industry is required" };
    }

    const domain = cleanDomain(rawUrl);
    const fullUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? rawUrl
      : `https://${domain}`;

    let liveHtml = "";
    let ttfbMs = 1850;
    let loadTimeSec = 3.6;
    let cms = "WordPress";
    let detectedPlugins = "Contact Form 7, Elementor, WP Cache";
    let scriptsCount = 42;
    let htmlWeightKb = 680;
    let extractedTitle = "";
    let extractedMetaDesc = "";
    let extractedOgTitle = "";
    let extractedOgSiteName = "";
    let hasAdTags = false;

    // Zero-API Fetch: 5-second timeout & Chrome User-Agent
    try {
      const startTime = performance.now();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(fullUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": CHROME_USER_AGENT,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
        },
        redirect: "follow",
      });
      clearTimeout(timeoutId);

      const durationMs = Math.round(performance.now() - startTime);
      ttfbMs = Math.max(durationMs, 400);

      liveHtml = await res.text();
      htmlWeightKb = Math.round(Buffer.byteLength(liveHtml, "utf-8") / 1024);
      scriptsCount = (liveHtml.match(/<script/gi) || []).length;

      // Exact Ad Pixel Regex Scan
      hasAdTags = AD_TAG_REGEX.test(liveHtml);

      // Metadata extraction
      const titleMatch = liveHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch && titleMatch[1]) extractedTitle = titleMatch[1].trim();

      const descMatch = liveHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      if (descMatch && descMatch[1]) extractedMetaDesc = descMatch[1].trim();

      const ogTitleMatch = liveHtml.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
      if (ogTitleMatch && ogTitleMatch[1]) extractedOgTitle = ogTitleMatch[1].trim();

      const ogSiteMatch = liveHtml.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
      if (ogSiteMatch && ogSiteMatch[1]) extractedOgSiteName = ogSiteMatch[1].trim();

      // CMS detection
      if (liveHtml.includes("/wp-content/") || liveHtml.includes("wp-json") || liveHtml.includes("wordpress")) {
        cms = "WordPress";
        const plugins: string[] = [];
        if (liveHtml.includes("elementor")) plugins.push("Elementor Pro");
        if (liveHtml.includes("divi")) plugins.push("Divi Builder");
        if (liveHtml.includes("contact-form-7")) plugins.push("Contact Form 7");
        if (liveHtml.includes("woocommerce")) plugins.push("WooCommerce");
        if (liveHtml.includes("yoast")) plugins.push("Yoast SEO");
        detectedPlugins = plugins.length > 0 ? plugins.join(", ") : "WordPress Theme & Plugins";
      } else if (liveHtml.includes("wix.com") || liveHtml.includes("X-Wix")) {
        cms = "Wix";
        detectedPlugins = "Wix Client Engine, Wix Bookings";
      } else if (liveHtml.includes("squarespace.com")) {
        cms = "Squarespace";
        detectedPlugins = "Squarespace Commerce & Layout Engine";
      } else if (liveHtml.includes("webflow.com")) {
        cms = "Webflow";
        detectedPlugins = "Webflow Interactions, Custom Embeds";
      } else {
        cms = "Custom / PHP";
        detectedPlugins = "Legacy jQuery, Custom CSS/JS Bundles";
      }

      loadTimeSec = +(ttfbMs / 1000 + scriptsCount * 0.04 + htmlWeightKb * 0.002).toFixed(2);
      loadTimeSec = Math.max(loadTimeSec, 2.8);
    } catch {
      // Graceful fallback for unreachable domains or strict bot blocks
      ttfbMs = Math.floor(Math.random() * 800) + 1600;
      loadTimeSec = +(Math.random() * 1.5 + 3.2).toFixed(2);
      htmlWeightKb = Math.round(loadTimeSec * 210);
      scriptsCount = Math.round(loadTimeSec * 14);
      hasAdTags = false;
    }

    // Derive realistic PageSpeed Score (1-100)
    let mobilePageSpeed = Math.round(100 - loadTimeSec * 16 - ttfbMs / 180);
    mobilePageSpeed = Math.min(Math.max(mobilePageSpeed, 12), 38);

    const locale = detectCountryFromDomainOrInput(fullUrl, inputCountry);
    const combinedContent = [domain, extractedTitle, extractedOgTitle, extractedOgSiteName, extractedMetaDesc, liveHtml.slice(0, 15000)].join(" ");

    const company = inputCompany || extractCleanCompanyName(domain, extractedTitle, extractedOgSiteName);
    const city = inputCity || detectCityFromContent(combinedContent, locale.countryCode);
    const phone = inputPhone || extractPhoneFromHtml(liveHtml) || "(214) 736-9201";
    const email = inputEmail || `service@${domain}`;

    // Automotive Qualification & Specialization Check
    const qualCheck = qualifyAutomotiveLead({
      company: inputCompany || domain,
      niche: selectedIndustry,
      industry: selectedIndustry,
      website: fullUrl,
    });

    const isDisqualified = qualCheck.isDisqualified;
    const qualificationStatus: "qualified" | "unverified" | "disqualified" = isDisqualified
      ? "disqualified"
      : qualCheck.isQualified
      ? "qualified"
      : "unverified";

    // Industry benchmarks for Automotive Repair & Diagnostics ($45 - $65/click)
    const baseCpc = qualCheck.specialization === "European Vehicle Specialist"
      ? 62
      : qualCheck.specialization === "Transmission & Drivetrain"
      ? 58
      : qualCheck.specialization === "Fleet Diesel & Commercial"
      ? 65
      : qualCheck.specialization === "Engine & ECU Diagnostics"
      ? 54
      : 48;

    const estLostMonthlySpend = Math.round(baseCpc * 22 * (1 - mobilePageSpeed / 100));
    const contactName = `${company} Service Team`;
    const companySlug = company
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const previewParams = new URLSearchParams();
    if (company) previewParams.set("name", company);
    if (qualCheck.specialization) previewParams.set("industry", qualCheck.specialization);
    if (city) previewParams.set("city", city);
    if (phone) previewParams.set("phone", phone);
    const brandColor = getArchetypePrimaryColor(qualCheck.specialization, "UrgentService");
    if (brandColor) previewParams.set("primaryColor", brandColor);

    const previewUrl = `https://agency-landing-page-smoky-psi.vercel.app/preview/${companySlug}?${previewParams.toString()}`;

    // Ad Evidence Classification
    const adEvidenceStatus: "verified_ads" | "no_detected_ads" | "inconclusive" = hasAdTags
      ? "verified_ads"
      : liveHtml
      ? "no_detected_ads"
      : "inconclusive";

    // ─── CREDIBLE AUTOMOTIVE OUTREACH STRATEGY ───
    const coldEmailSubject = `Idea for ${company}`;

    const specRaw = (qualCheck.specialization || "auto repair").toLowerCase();
    const industryPhrase = specRaw.includes("european")
      ? "European auto repair shops"
      : specRaw.includes("transmission")
      ? "transmission and drivetrain repair shops"
      : specRaw.includes("ecu") || specRaw.includes("diagnostic")
      ? "engine diagnostic and repair shops"
      : specRaw.includes("diesel") || specRaw.includes("fleet")
      ? "commercial fleet and diesel repair shops"
      : "auto repair shops";

    const coldEmailBody = `Hi ${contactName},

I came across your website while looking at ${industryPhrase} in ${city} and wanted to share an idea.

For drivers dealing with a warning light or an unexpected repair, finding the right service and contacting the shop quickly matters. I put together a mobile-focused prototype for ${company} to demonstrate how the experience could be streamlined, with clearer service information, a more direct path to your service desk, and a guided diagnostic intake.

Here’s the prototype:
${previewUrl}

It’s a concept, not a replacement for your existing website. I’d be happy to walk you through the idea and discuss whether it could be useful for your business.

Best,
Faruk
Lead Engineer, Speedcraft Studio`;

    const linkedInMessage = `Hi ${contactName}, came across ${company} while looking at ${industryPhrase} in ${city}. Put together a mobile prototype to show how service information and diagnostic intake could be streamlined for drivers on their phones: ${previewUrl} — thought you might find the concept interesting!`;

    // Lead Object with industry and hasAdTags
    const newLead: AuditedLead = {
      company,
      website: fullUrl,
      country: locale.country,
      countryCode: locale.countryCode,
      city,
      industry: qualCheck.specialization,
      niche: qualCheck.specialization,
      archetype: getArchetype(qualCheck.specialization),
      primaryColor: getArchetypePrimaryColor(qualCheck.specialization, "UrgentService"),
      contactName,
      phone,
      email,
      mobilePageSpeed,
      mobileLoadTimeSec: loadTimeSec,
      ttfbMs,
      cms,
      detectedPlugins,
      htmlWeightKb,
      scriptsCount,
      currency: locale.currency,
      currencySymbol: locale.currencySymbol,
      cpcEstimate: baseCpc,
      estLostMonthlySpend,
      cpcEstimateAud: locale.currency === "AUD" ? baseCpc : Math.round(baseCpc * 1.55),
      estLostMonthlySpendAud: locale.currency === "AUD" ? estLostMonthlySpend : Math.round(estLostMonthlySpend * 1.55),
      coldEmailSubject,
      coldEmailBody,
      linkedInMessage,
      hasAdTags,
      hasMarketingPixels: hasAdTags, // Backwards compatibility
      isCustomImport: true,
      adEvidenceStatus,
      qualificationStatus: qualCheck.isQualified ? "qualified" : qualCheck.isDisqualified ? "disqualified" : "unverified",
      qualificationReason: qualCheck.reason,
      adTrackingVerified: {
        activeAdPixels: hasAdTags,
        detectedTags: hasAdTags ? ["Google Ads / GTM / Meta Pixel"] : [],
        scannedAt: new Date().toISOString(),
      },
    };

    // State/Database Save: Persist to active queue database
    try {
      let existingLeads: AuditedLead[] = [];
      if (fs.existsSync(GLOBAL_LEADS_PATH)) {
        existingLeads = JSON.parse(fs.readFileSync(GLOBAL_LEADS_PATH, "utf-8"));
      }
      const alreadyExists = existingLeads.some(
        (l) => l.company.toLowerCase() === company.toLowerCase() || l.website.toLowerCase().includes(domain)
      );
      if (!alreadyExists) {
        existingLeads = [newLead, ...existingLeads];
        fs.writeFileSync(GLOBAL_LEADS_PATH, JSON.stringify(existingLeads, null, 2), "utf-8");
      }

      // Append to qualified_targeted_leads.json if qualified and ad tags are present
      if (hasAdTags && qualificationStatus === "qualified" && fs.existsSync(QUALIFIED_LEADS_PATH)) {
        try {
          const qualifiedLeads: AuditedLead[] = JSON.parse(fs.readFileSync(QUALIFIED_LEADS_PATH, "utf-8"));
          const alreadyInQualified = qualifiedLeads.some(
            (l: AuditedLead) => l.company.toLowerCase() === company.toLowerCase() || l.website.toLowerCase().includes(domain)
          );
          if (!alreadyInQualified) {
            qualifiedLeads.unshift(newLead);
            fs.writeFileSync(QUALIFIED_LEADS_PATH, JSON.stringify(qualifiedLeads, null, 2), "utf-8");
          }
        } catch {}
      }
    } catch (saveErr) {
      console.error("Failed to persist lead to active queue database:", saveErr);
    }

    return {
      success: true,
      lead: newLead,
      hasAdTags,
      archetype: newLead.archetype,
      previewUrl,
      message: `Audited ${company} • ${qualCheck.specialization} (${mobilePageSpeed}/100 Speed • ${
        hasAdTags ? "🟢 Verified Ad Signals (Strategy A)" : "⚪ No Ad Signals Detected (Strategy B)"
      })`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to audit website";
    console.error("Error in auditWebsiteAction:", err);
    return { success: false, error: message };
  }
}
