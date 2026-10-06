#!/usr/bin/env node

/**
 * Filter Ad Leads Script
 * ==============================================================
 * Scans local businesses from businesses.json (921 leads) to verify
 * which businesses are actively spending money on advertising by detecting
 * Google Ads / GTM and Meta (Facebook) marketing pixels in their raw HTML.
 *
 * Avoids third-party paid APIs using standard native fetch with:
 * - 5-second timeout per request (AbortSignal / AbortController)
 * - Standard Chrome User-Agent header
 * - Concurrency batching (5-10 concurrent requests, default 8)
 * - Regex pixel scanning
 *
 * Output: qualified_dashboard_leads.json
 */

const fs = require("node:fs");
const path = require("node:path");

// ==========================================
// CONFIGURATION & REGEX DEFINITIONS
// ==========================================
const BATCH_SIZE = 8; // Concurrency limit between 5 and 10
const TIMEOUT_MS = 5000; // 5-second timeout
const CHROME_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// Detection Patterns
const GOOGLE_ADS_REGEX = /AW-[0-9]+|googletagmanager\.com\/gtag\/js|GTM-[A-Z0-9]+/i;
const META_PIXEL_REGEX = /fbevents\.js|connect\.facebook\.net/i;

// Parse optional CLI arguments (--limit=N, --batch=N, --input=PATH)
const args = process.argv.slice(2);
const limitArg = args.find((a) => a.startsWith("--limit="));
const batchArg = args.find((a) => a.startsWith("--batch="));
const inputArg = args.find((a) => a.startsWith("--input="));

const RUN_LIMIT = limitArg ? parseInt(limitArg.split("=")[1], 10) : null;
const CONCURRENCY = batchArg ? Math.max(1, parseInt(batchArg.split("=")[1], 10)) : BATCH_SIZE;

// Resolve input file path
function resolveInputPath() {
  if (inputArg) return path.resolve(process.cwd(), inputArg.split("=")[1]);

  const candidates = [
    path.resolve(process.cwd(), "businesses.json"),
    path.resolve(process.cwd(), "leads", "businesses.json"),
    path.resolve(process.cwd(), "leads", "global_leads_audit.json"),
    path.resolve(__dirname, "..", "businesses.json"),
    path.resolve(__dirname, "..", "leads", "global_leads_audit.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error("Could not locate businesses.json or global_leads_audit.json");
}

// Ensure URL has protocol
function normalizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let trimmed = rawUrl.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    trimmed = "https://" + trimmed;
  }
  return trimmed;
}

// Extract clean hostname for console logging
function getDomain(urlStr) {
  try {
    const parsed = new URL(urlStr);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return urlStr || "unknown-domain";
  }
}

// Download HTML with 5s timeout & Chrome User-Agent
async function scanWebsiteHtml(url) {
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

    // Read response text
    const html = await res.text();

    const hasGoogle = GOOGLE_ADS_REGEX.test(html);
    const hasMeta = META_PIXEL_REGEX.test(html);

    return {
      success: true,
      statusCode: res.status,
      hasGoogle,
      hasMeta,
      hasTags: hasGoogle || hasMeta,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    const isTimeout = err.name === "AbortError" || (err.message && err.message.includes("aborted"));
    return {
      success: false,
      isTimeout,
      errorMsg: isTimeout ? "Timeout (5s)" : (err.code || err.message || "Unreachable"),
      hasGoogle: false,
      hasMeta: false,
      hasTags: false,
    };
  }
}

// Main execution routine
async function main() {
  console.log("=".repeat(70));
  console.log("⚡ SPEEDCRAFT AD PIXEL FILTERING ENGINE");
  console.log("Scanning websites for Google Ads / GTM & Meta Pixels without paid APIs");
  console.log("=".repeat(70));

  const inputPath = resolveInputPath();
  console.log(`📂 Reading input: ${inputPath}`);

  const rawData = fs.readFileSync(inputPath, "utf-8");
  let businesses = JSON.parse(rawData);

  if (!Array.isArray(businesses)) {
    throw new Error("Invalid format: Expected a JSON array of businesses");
  }

  const totalAvailable = businesses.length;
  console.log(`📋 Total leads loaded: ${totalAvailable}`);

  if (RUN_LIMIT && RUN_LIMIT > 0) {
    businesses = businesses.slice(0, RUN_LIMIT);
    console.log(`🔬 Limit active: Processing first ${businesses.length} leads`);
  }

  const totalToProcess = businesses.length;
  const qualifiedLeads = [];
  let stats = {
    processed: 0,
    tagsFound: 0,
    googleAdsFound: 0,
    metaPixelFound: 0,
    noTags: 0,
    unreachableOrTimeout: 0,
  };

  const outputPath = path.resolve(process.cwd(), "qualified_dashboard_leads.json");
  const leadsFolderOutputPath = path.resolve(process.cwd(), "leads", "qualified_dashboard_leads.json");
  const checkpointPath = path.resolve(process.cwd(), "qualified_dashboard_leads.checkpoint.json");

  console.log(`🚀 Concurrency batch size: ${CONCURRENCY}`);
  console.log(`⏱️  Request timeout: ${TIMEOUT_MS / 1000}s`);
  console.log(`🎯 Output destination: ${outputPath}`);
  console.log("-".repeat(70));

  const startTime = Date.now();

  // Process in batches
  for (let i = 0; i < totalToProcess; i += CONCURRENCY) {
    const batch = businesses.slice(i, i + CONCURRENCY);

    await Promise.all(
      batch.map(async (business, batchIdx) => {
        const itemNumber = i + batchIdx + 1;
        const normalizedUrl = normalizeUrl(business.website);
        const domain = normalizedUrl ? getDomain(normalizedUrl) : business.company || "unknown";

        if (!normalizedUrl) {
          stats.processed++;
          stats.unreachableOrTimeout++;
          console.log(`[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> ⚪ Missing URL`);
          return;
        }

        const result = await scanWebsiteHtml(normalizedUrl);
        stats.processed++;

        if (result.hasTags) {
          stats.tagsFound++;
          if (result.hasGoogle) stats.googleAdsFound++;
          if (result.hasMeta) stats.metaPixelFound++;

          const tags = [];
          if (result.hasGoogle) tags.push("Google Ads / GTM");
          if (result.hasMeta) tags.push("Meta Pixel");

          // Keep business and append verified ad details
          const qualifiedItem = {
            ...business,
            adTrackingVerified: {
              activeAdPixels: true,
              hasGoogleAds: result.hasGoogle,
              hasMetaPixel: result.hasMeta,
              detectedTags: tags,
              scannedAt: new Date().toISOString(),
            },
          };
          qualifiedLeads.push(qualifiedItem);

          console.log(
            `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> 🟢 Tags Found! (${tags.join(", ")})`
          );
        } else if (!result.success) {
          stats.unreachableOrTimeout++;
          console.log(
            `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> 🔴 ${result.errorMsg}`
          );
        } else {
          stats.noTags++;
          console.log(
            `[${itemNumber}/${totalToProcess}] ${domain.padEnd(28)} -> ⚪ No Tags Found`
          );
        }
      })
    );

    // Save checkpoint every 40 leads to avoid any data loss
    if (qualifiedLeads.length > 0 && stats.processed % 40 === 0) {
      try {
        fs.writeFileSync(checkpointPath, JSON.stringify(qualifiedLeads, null, 2), "utf-8");
      } catch {
        // checkpoint save silent catch
      }
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  // Write finalized qualified array to target output file
  fs.writeFileSync(outputPath, JSON.stringify(qualifiedLeads, null, 2), "utf-8");

  // Also write to leads/ directory for direct dashboard access if leads directory exists
  if (fs.existsSync(path.resolve(process.cwd(), "leads"))) {
    try {
      fs.writeFileSync(leadsFolderOutputPath, JSON.stringify(qualifiedLeads, null, 2), "utf-8");
    } catch (e) {
      console.warn("Could not copy to leads/ folder:", e.message);
    }
  }

  // Remove temporary checkpoint if cleanly completed
  if (fs.existsSync(checkpointPath)) {
    try {
      fs.unlinkSync(checkpointPath);
    } catch {
      // ignore
    }
  }

  console.log("=".repeat(70));
  console.log("✨ SCAN COMPLETE — SUMMARY REPORT");
  console.log("=".repeat(70));
  console.log(`⏱️  Total Duration:         ${durationSec}s`);
  console.log(`📊 Total Businesses Scanned: ${stats.processed}`);
  console.log(`🟢 Qualified Ad Spenders:    ${stats.tagsFound} (${((stats.tagsFound / stats.processed) * 100).toFixed(1)}%)`);
  console.log(`   ├─ Google Ads / GTM:      ${stats.googleAdsFound}`);
  console.log(`   └─ Meta (Facebook) Pixel: ${stats.metaPixelFound}`);
  console.log(`⚪ Discarded (No Pixels):    ${stats.noTags}`);
  console.log(`🔴 Unreachable / Timed Out:  ${stats.unreachableOrTimeout}`);
  console.log(`💾 Final Output File:        ${outputPath}`);
  console.log(`📦 Output Array Length:      ${qualifiedLeads.length} leads saved`);
  console.log("=".repeat(70));
}

main().catch((err) => {
  console.error("FATAL ERROR in filter script:", err);
  process.exit(1);
});
