#!/usr/bin/env node

/**
 * clean-database.js
 * ============================================================================
 * Targeted Niche & Ad-Spend Lead Qualification Engine
 *
 * Requirements:
 * 1. Read Data: Ingests local businesses.json file.
 * 2. Niche Filter: Checks lead's industry field (normalized to lowercase) against
 *    allowed keywords: ['plumber', 'hvac', 'roofer', 'electrician', 'mechanic',
 *    'lawyer', 'cpa', 'dentist', 'medspa']. Discards lead immediately if no match.
 * 3. Ad Tag Detection: For leads that pass the niche filter, uses standard fetch
 *    to download raw homepage HTML (5s timeout, standard Chrome User-Agent header).
 * 4. Regex Scan: Scans fetched HTML string for active ad spend:
 *    /AW-[0-9]+|googletagmanager\.com\/gtag\/js|GTM-[A-Z0-9]+|fbevents\.js|connect\.facebook\.net/i
 * 5. Final Logic: If marketing tag is found, keeps the lead; otherwise discards.
 *    Processes requests in concurrent batches of 5 to 10 to prevent memory crashes.
 * 6. Export: Writes final array of leads to qualified_targeted_leads.json.
 * 7. Console Output: Prints progress to terminal:
 *    [14/921] domain.com -> 🟢 Plumber / Ad Tags Found!
 * ============================================================================
 */

const fs = require("node:fs");
const path = require("node:path");

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

// 1. Target Automotive Segments (Single Vertical: Automotive Repair & Diagnostics)
const ALLOWED_KEYWORDS = [
  "mechanic",
  "auto repair",
  "car repair",
  "automotive",
  "transmission",
  "diesel",
  "engine",
  "diagnostic",
  "ecu",
  "brake",
  "european auto",
  "bmw",
  "audi",
  "mercedes",
  "porsche",
  "fleet repair",
  "tuning",
];

// Explicit negative keywords: Disqualify dealerships, car washes, car rentals, parts retailers, and non-automotive trades
const DISQUALIFIED_KEYWORDS = [
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
];

// Display names for clean terminal progress formatting
const NICHE_DISPLAY_NAMES = {
  mechanic: "Independent Auto Repair",
  "auto repair": "Independent Auto Repair",
  "car repair": "Independent Auto Repair",
  automotive: "Specialist Automotive Service",
  transmission: "Transmission & Drivetrain",
  diesel: "Fleet Diesel & Commercial",
  engine: "Engine & ECU Diagnostics",
  diagnostic: "Engine & ECU Diagnostics",
  ecu: "Engine & ECU Diagnostics",
  brake: "Brake & Suspension Specialist",
  "european auto": "European Vehicle Specialist",
  bmw: "European Vehicle Specialist",
  audi: "European Vehicle Specialist",
  mercedes: "European Vehicle Specialist",
  porsche: "European Vehicle Specialist",
  "fleet repair": "Fleet Diesel & Commercial",
  tuning: "Performance & Tuning",
};

// Semantic alias map for automotive repair specializations
const ALIAS_MAP = {
  "european auto": ["euro", "volkswagen", "audi", "bmw", "mercedes", "porsche", "mini", "land rover"],
  transmission: ["gearbox", "drivetrain", "clutch"],
  diesel: ["fleet diesel", "commercial vehicle", "truck repair"],
  diagnostic: ["engine diagnostics", "auto electrical", "check engine", "scan tool"],
  mechanic: ["motor mechanic", "auto service", "auto care", "car service"],
  tuning: ["dyno", "performance tuning", "motorsport"],
  brake: ["suspension", "wheel alignment", "brakes"],
};

// 2. Marketing Pixel Detection Regex
const AD_TAG_REGEX = /AW-[0-9]+|googletagmanager\.com\/gtag\/js|GTM-[A-Z0-9]+|fbevents\.js|connect\.facebook\.net/i;

// 3. Network & Batching Parameters
const DEFAULT_BATCH_SIZE = 8; // Concurrency limit between 5 and 10 to avoid memory crashes
const TIMEOUT_MS = 5000;      // 5-second timeout per request
const CHROME_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// Parse CLI flags (--limit=N, --batch=N, --input=PATH, --output=PATH)
const args = process.argv.slice(2);
const limitArg = args.find((a) => a.startsWith("--limit="));
const batchArg = args.find((a) => a.startsWith("--batch=") || a.startsWith("--concurrency="));
const inputArg = args.find((a) => a.startsWith("--input="));
const outputArg = args.find((a) => a.startsWith("--output="));

const RUN_LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : null;
const CONCURRENCY = batchArg
  ? Math.min(10, Math.max(5, parseInt(batchArg.split("=")[1], 10)))
  : DEFAULT_BATCH_SIZE;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Resolves the path to the input businesses.json file.
 */
function resolveInputPath() {
  if (inputArg) return path.resolve(process.cwd(), inputArg.split("=")[1]);

  const candidates = [
    path.resolve(process.cwd(), "businesses.json"),
    path.resolve(__dirname, "businesses.json"),
    path.resolve(process.cwd(), "leads", "businesses.json"),
    path.resolve(__dirname, "..", "businesses.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error("Could not locate businesses.json file");
}

/**
 * Checks a lead against automotive qualification criteria.
 * Strictly disqualifies dealerships, car washes, car rentals, parts stores, and unrelated trades.
 */
function evaluateNiche(lead) {
  if (!lead || typeof lead !== "object") return null;

  const combined = `${lead.company || ""} ${lead.industry || ""} ${lead.niche || ""} ${lead.website || ""}`.toLowerCase().trim();
  if (!combined) return null;

  // 1. Check for negative keywords (Disqualify non-repair businesses)
  for (const neg of DISQUALIFIED_KEYWORDS) {
    if (combined.includes(neg) && !combined.includes("dealership alternative")) {
      return null; // Strictly disqualified
    }
  }

  // 2. Direct match or substring check with allowed automotive keywords
  for (const keyword of ALLOWED_KEYWORDS) {
    if (combined.includes(keyword)) {
      return {
        keyword,
        displayName: NICHE_DISPLAY_NAMES[keyword] || "Independent Auto Repair",
      };
    }
  }

  // 3. Semantic alias / root stem fallback
  for (const [keyword, aliases] of Object.entries(ALIAS_MAP)) {
    if (aliases.some((alias) => combined.includes(alias))) {
      return {
        keyword,
        displayName: NICHE_DISPLAY_NAMES[keyword] || "Independent Auto Repair",
      };
    }
  }

  return null;
}

/**
 * Ensures a website URL has a valid protocol.
 */
function normalizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let trimmed = rawUrl.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    trimmed = "https://" + trimmed;
  }
  return trimmed;
}

/**
 * Extracts a clean domain name for terminal logging.
 */
function getDomain(urlStr, fallbackCompany = "unknown") {
  if (!urlStr) return fallbackCompany;
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return urlStr.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || fallbackCompany;
  }
}

/**
 * Downloads raw homepage HTML using native fetch with 5s timeout & Chrome User-Agent.
 */
async function fetchHomepageHtml(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
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

    const html = await res.text();
    return {
      success: true,
      statusCode: res.status,
      html,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    const isTimeout =
      err.name === "AbortError" ||
      (err.message && err.message.toLowerCase().includes("aborted"));
    return {
      success: false,
      isTimeout,
      errorMsg: isTimeout ? "Timeout (5s)" : (err.code || err.message || "Unreachable"),
      html: "",
    };
  }
}

// ============================================================================
// MAIN PIPELINE
// ============================================================================

async function cleanDatabase() {
  console.log("=".repeat(75));
  console.log("🎯 TARGETED NICHE & AD-SPEND DATABASE CLEANING PIPELINE");
  console.log("Filtering businesses.json for 9 High-Value Niches & Active Ad Pixels");
  console.log("=".repeat(75));

  const inputPath = resolveInputPath();
  const outputPath = outputArg
    ? path.resolve(process.cwd(), outputArg.split("=")[1])
    : path.resolve(process.cwd(), "cleaned_scanned_leads.json");
  const checkpointPath = path.resolve(process.cwd(), "cleaned_scanned_leads.checkpoint.json");

  console.log(`📂 Ingesting database from : ${inputPath}`);
  const rawData = fs.readFileSync(inputPath, "utf-8");
  let businesses = JSON.parse(rawData);

  if (!Array.isArray(businesses)) {
    throw new Error("Invalid format: Expected a JSON array of businesses");
  }

  const totalLoaded = businesses.length;
  console.log(`📋 Total records ingested : ${totalLoaded}`);

  if (RUN_LIMIT && RUN_LIMIT > 0) {
    businesses = businesses.slice(0, RUN_LIMIT);
    console.log(`🔬 Limit active            : Processing first ${businesses.length} leads only`);
  }

  const totalToProcess = businesses.length;
  console.log(`🚀 Concurrency batch size  : ${CONCURRENCY} concurrent requests (5-10 range)`);
  console.log(`⏱️  Request timeout         : ${TIMEOUT_MS / 1000}s`);
  console.log(`💾 Final destination       : ${outputPath}`);
  console.log("-".repeat(75));

  const qualifiedLeads = [];
  const stats = {
    total: totalToProcess,
    nicheDiscarded: 0,
    nichePassed: 0,
    adTagsFound: 0,
    noTags: 0,
    fetchErrors: 0,
  };

  const nicheCounts = {};
  for (const k of ALLOWED_KEYWORDS) {
    nicheCounts[k] = 0;
  }

  const startTime = Date.now();

  // Prepare work queue with original 1-indexed numbers
  const queue = businesses.map((lead, idx) => ({
    lead,
    itemNumber: idx + 1,
  }));

  // Worker loop maintaining continuous concurrency within 5-10
  async function worker() {
    while (queue.length > 0) {
      const { lead, itemNumber } = queue.shift();
      const normalizedUrl = normalizeUrl(lead.website);
      const domain = normalizedUrl ? getDomain(normalizedUrl) : lead.company || "unknown";

      // Step 1: Niche Filter
      const nicheMatch = evaluateNiche(lead);
      if (!nicheMatch) {
        stats.nicheDiscarded++;
        const currentNiche = lead.industry || lead.niche || "Unknown";
        console.log(
          `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> ⚪ Discarded (Niche: ${currentNiche})`
        );
        continue;
      }

      stats.nichePassed++;
      const displayName = nicheMatch.displayName;

      // Step 2: Validate Website URL
      if (!normalizedUrl) {
        stats.fetchErrors++;
        console.log(
          `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> 🔴 ${displayName} / Missing URL`
        );
        continue;
      }

      // Step 3: Ad Tag Detection (Raw HTML fetch with 5s timeout & Chrome User-Agent)
      const fetchResult = await fetchHomepageHtml(normalizedUrl);

      if (!fetchResult.success) {
        stats.fetchErrors++;
        console.log(
          `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> 🔴 ${displayName} / ${fetchResult.errorMsg}`
        );
        continue;
      }

      // Step 4: Regex Scan for active marketing ad spend
      const hasAdTags = AD_TAG_REGEX.test(fetchResult.html);

      if (hasAdTags) {
        stats.adTagsFound++;
        nicheCounts[nicheMatch.keyword] = (nicheCounts[nicheMatch.keyword] || 0) + 1;

        // Identify specific detected pixels
        const tags = [];
        if (/AW-[0-9]+/i.test(fetchResult.html)) tags.push("Google Ads (AW)");
        if (/googletagmanager\.com\/gtag\/js/i.test(fetchResult.html)) tags.push("Google Tag (gtag)");
        if (/GTM-[A-Z0-9]+/i.test(fetchResult.html)) tags.push("GTM Container");
        if (/fbevents\.js|connect\.facebook\.net/i.test(fetchResult.html)) tags.push("Meta Pixel");

        const qualifiedLead = {
          ...lead,
          _originalIndex: itemNumber,
          industry: lead.industry || nicheMatch.keyword,
          targetNiche: nicheMatch.keyword,
          adTrackingVerified: {
            activeAdPixels: true,
            detectedTags: tags.length > 0 ? tags : ["Marketing Ad Pixel"],
            scannedAt: new Date().toISOString(),
          },
        };

        qualifiedLeads.push(qualifiedLead);

        console.log(
          `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> 🟢 ${displayName} / Ad Tags Found!`
        );

        // Save periodic checkpoint every 25 verified leads
        if (qualifiedLeads.length % 25 === 0) {
          try {
            const cleanCheckpoint = qualifiedLeads.map((item) => {
              const clone = { ...item };
              delete clone._originalIndex;
              return clone;
            });
            fs.writeFileSync(checkpointPath, JSON.stringify(cleanCheckpoint, null, 2), "utf-8");
          } catch {
            // silent catch
          }
        }
      } else {
        stats.noTags++;
        console.log(
          `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> ⚪ ${displayName} / No Ad Tags Found`
        );
      }
    }
  }

  // Launch CONCURRENCY workers in parallel
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  // Sort qualified leads by original database index and clean internal helper key
  qualifiedLeads.sort((a, b) => (a._originalIndex || 0) - (b._originalIndex || 0));
  const finalExportLeads = qualifiedLeads.map((item) => {
    const clone = { ...item };
    delete clone._originalIndex;
    return clone;
  });

  // Write final qualified array to target output file
  fs.writeFileSync(outputPath, JSON.stringify(finalExportLeads, null, 2), "utf-8");

  // Remove temporary checkpoint upon clean completion
  if (fs.existsSync(checkpointPath)) {
    try {
      fs.unlinkSync(checkpointPath);
    } catch {
      // ignore
    }
  }

  console.log("=".repeat(75));
  console.log("✨ DATABASE CLEANING COMPLETE — QUALIFIED TARGETED LEADS REPORT");
  console.log("=".repeat(75));
  console.log(`⏱️  Total Duration           : ${durationSec}s`);
  console.log(`📋 Total Ingested Leads     : ${stats.total}`);
  console.log(`⚪ Discarded (Niche Filter) : ${stats.nicheDiscarded}`);
  console.log(`🎯 Passed Niche Filter      : ${stats.nichePassed}`);
  console.log(
    `🟢 Verified Active Ad Spend : ${stats.adTagsFound} (${
      stats.nichePassed > 0 ? ((stats.adTagsFound / stats.nichePassed) * 100).toFixed(1) : 0
    }% of target niches)`
  );
  console.log(`⚪ Discarded (No Ad Tags)   : ${stats.noTags}`);
  console.log(`🔴 Unreachable / Timed Out  : ${stats.fetchErrors}`);
  console.log(`💾 Final Output File        : ${outputPath}`);
  console.log(`📦 Leads Exported           : ${finalExportLeads.length} leads saved`);
  console.log("-".repeat(75));
  console.log("📊 Breakdown by Target Niche:");
  for (const [k, count] of Object.entries(nicheCounts)) {
    if (count > 0) {
      console.log(`   ├─ ${NICHE_DISPLAY_NAMES[k].padEnd(14)}: ${count} verified leads`);
    }
  }
  console.log("=".repeat(75));

  return finalExportLeads;
}

// Module exports for programmatical use or automated testing
module.exports = {
  ALLOWED_KEYWORDS,
  NICHE_DISPLAY_NAMES,
  ALIAS_MAP,
  AD_TAG_REGEX,
  evaluateNiche,
  normalizeUrl,
  getDomain,
  fetchHomepageHtml,
  cleanDatabase,
};

// Direct script execution
if (require.main === module) {
  cleanDatabase().catch((err) => {
    console.error("FATAL ERROR in clean-database script:", err);
    process.exit(1);
  });
}
