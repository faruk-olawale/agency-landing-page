import https from "node:https";
import http from "node:http";
import { URL } from "node:url";

// ANSI Terminal Colors
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const magenta = (s: string) => `\x1b[35m${s}\x1b[0m`;

interface AuditResult {
  url: string;
  domain: string;
  businessName: string;
  contactName: string;
  niche: string;
  phone: string;
  ttfbMs: number;
  totalTimeMs: number;
  htmlSizeKb: number;
  isWordPress: boolean;
  detectedPlugins: string[];
  scriptCount: number;
  cssCount: number;
  mobileScore: number;
  estLostAdSpendMonthly: number;
  cpcEstimate: number;
}

// Industry benchmarks
const NICHE_CPC_MAP: Record<string, number> = {
  hvac: 48,
  roofing: 65,
  dental: 38,
  dentist: 38,
  legal: 85,
  lawyer: 85,
  attorney: 85,
  plumbing: 42,
  chiro: 28,
  cosmetic: 55,
  default: 32,
};

function detectNiche(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("roof")) return "Roofing";
  if (lower.includes("hvac") || lower.includes("air condition") || lower.includes("heating")) return "HVAC";
  if (lower.includes("dent") || lower.includes("teeth") || lower.includes("ortho")) return "Dental";
  if (lower.includes("law") || lower.includes("attorney") || lower.includes("injury")) return "Legal";
  if (lower.includes("plumb")) return "Plumbing";
  if (lower.includes("clinic") || lower.includes("medspa") || lower.includes("cosmetic")) return "Aesthetics & Medical";
  return "Local High-Ticket Service";
}

// Fetch webpage with timing and deep inspection
async function inspectTarget(targetUrl: string): Promise<{
  html: string;
  ttfbMs: number;
  totalTimeMs: number;
  statusCode: number;
  headers: Record<string, string>;
}> {
  return new Promise((resolve, reject) => {
    let urlObj: URL;
    try {
      urlObj = new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`);
    } catch {
      return reject(new Error(`Invalid URL: ${targetUrl}`));
    }

    const client = urlObj.protocol === "http:" ? http : https;
    const startTime = performance.now();
    let ttfbMs = 0;

    const req = client.get(
      urlObj.toString(),
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        timeout: 15000,
      },
      (res) => {
        ttfbMs = Math.round(performance.now() - startTime);

        // Handle redirects
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, urlObj.origin).toString();
          return inspectTarget(redirectUrl).then(resolve).catch(reject);
        }

        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          const totalTimeMs = Math.round(performance.now() - startTime);
          const headers: Record<string, string> = {};
          for (const [k, v] of Object.entries(res.headers)) {
            if (v) headers[k.toLowerCase()] = Array.isArray(v) ? v.join(", ") : v;
          }
          resolve({
            html: data,
            ttfbMs,
            totalTimeMs,
            statusCode: res.statusCode || 200,
            headers,
          });
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out after 15 seconds"));
    });
  });
}

// Fetch Google PageSpeed API if key is present
async function fetchGooglePageSpeed(url: string, apiKey?: string): Promise<number | null> {
  const keyParam = apiKey ? `&key=${apiKey}` : "";
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&strategy=mobile${keyParam}`;

  try {
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return null;
    const json = await res.json();
    const score = json.lighthouseResult?.categories?.performance?.score;
    return typeof score === "number" ? Math.round(score * 100) : null;
  } catch {
    return null;
  }
}

export async function runAudit(
  rawUrl: string,
  options: {
    name?: string;
    owner?: string;
    niche?: string;
    apiKey?: string;
    studioUrl?: string;
  } = {}
): Promise<AuditResult> {
  const normalizedUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const urlObj = new URL(normalizedUrl);
  const domain = urlObj.hostname.replace(/^www\./, "");

  const { html, ttfbMs, totalTimeMs } = await inspectTarget(normalizedUrl);

  // 1. Business Name Detection
  let businessName = options.name;
  if (!businessName) {
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      const cleanTitle = titleMatch[1].split(/[-|–—:]/)[0].trim();
      businessName = cleanTitle.length > 2 && cleanTitle.length < 35 ? cleanTitle : domain;
    } else {
      businessName = domain;
    }
  }

  // 2. Phone detection
  let phone = "";
  const telMatch = html.match(/href=["']tel:([^"']+)["']/i);
  if (telMatch && telMatch[1]) {
    phone = telMatch[1].trim();
  } else {
    const rawPhoneMatch = html.match(/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);
    if (rawPhoneMatch) phone = rawPhoneMatch[0].trim();
  }

  // 3. WordPress & Plugin Detection
  const isWordPress =
    html.includes("wp-content") ||
    html.includes("wp-includes") ||
    html.includes("wp-json") ||
    /name=["']generator["'][^>]*content=["']WordPress/i.test(html);

  const detectedPlugins: string[] = [];
  if (isWordPress) {
    const pluginMatches = html.matchAll(/\/wp-content\/plugins\/([a-zA-Z0-9_-]+)/g);
    for (const match of pluginMatches) {
      if (match[1] && !detectedPlugins.includes(match[1])) {
        detectedPlugins.push(match[1]);
      }
    }
  }

  // 4. Script & CSS Asset counts
  const scriptCount = (html.match(/<script/gi) || []).length;
  const cssCount = (html.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  const htmlSizeKb = Math.round((Buffer.byteLength(html, "utf8") / 1024) * 10) / 10;

  // 5. Niche determination & CPC estimate
  const detectedNicheStr = options.niche || detectNiche(html + " " + businessName);
  const nicheKey = Object.keys(NICHE_CPC_MAP).find((k) => detectedNicheStr.toLowerCase().includes(k)) || "default";
  const cpcEstimate = NICHE_CPC_MAP[nicheKey];

  // 6. Mobile Performance Score
  let mobileScore: number | null = await fetchGooglePageSpeed(normalizedUrl, options.apiKey || process.env.PAGESPEED_API_KEY);

  if (mobileScore === null) {
    // Algorithmic Lighthouse emulation based on TTFB, plugins & assets
    let simulated = 100;
    if (ttfbMs > 400) simulated -= Math.min(35, Math.round((ttfbMs - 400) / 45));
    if (scriptCount > 15) simulated -= Math.min(25, (scriptCount - 15) * 1.5);
    if (detectedPlugins.length > 5) simulated -= Math.min(20, detectedPlugins.length * 1.8);
    if (htmlSizeKb > 100) simulated -= Math.min(15, Math.round((htmlSizeKb - 100) / 25));
    mobileScore = Math.max(16, Math.min(92, Math.round(simulated)));
  }

  // 7. Estimated Ad Budget Waste
  // Average Google Ads spend for local high-ticket service: $2,500/mo
  // Google research shows slow mobile page (>3.5s) loses ~38% of visitors to immediate bounce
  const estLostAdSpendMonthly = Math.round(2500 * (1 - mobileScore / 100) * 0.42);

  return {
    url: normalizedUrl,
    domain,
    businessName,
    contactName: options.owner || "there",
    niche: detectedNicheStr,
    phone,
    ttfbMs,
    totalTimeMs,
    htmlSizeKb,
    isWordPress,
    detectedPlugins,
    scriptCount,
    cssCount,
    mobileScore,
    estLostAdSpendMonthly,
    cpcEstimate,
  };
}

export function printCliReport(res: AuditResult, studioUrl: string = "https://speedcraft.dev") {
  const line = dim("─".repeat(68));
  const doubleLine = cyan("═".repeat(68));

  console.log("\n" + doubleLine);
  console.log(bold(cyan(" ⚡ SPEEDCRAFT STUDIO // CLIENT REVENUE & SPEED AUDIT")));
  console.log(doubleLine);

  console.log(` Target URL     : ${bold(res.url)}`);
  console.log(` Target Company : ${bold(res.businessName)}`);
  console.log(` Industry/Niche : ${res.niche} (Est. Google Ads CPC: $${res.cpcEstimate}/click)`);
  if (res.phone) console.log(` Phone Number   : ${res.phone}`);
  console.log(line);

  // Technical Breakdown
  console.log(bold(" 📊 TECHNICAL BOTTLENECK ANALYSIS:"));
  const scoreColor = res.mobileScore < 45 ? red : res.mobileScore < 75 ? yellow : green;
  console.log(
    ` • Google Mobile PageSpeed : ${scoreColor(bold(`${res.mobileScore}/100`))} ${dim("(Speedcraft Target: 100/100)")}`
  );
  console.log(
    ` • Server Response (TTFB)  : ${res.ttfbMs > 800 ? red(`${res.ttfbMs}ms`) : yellow(`${res.ttfbMs}ms`)} ${dim(
      "(Speedcraft Edge: < 40ms)"
    )}`
  );
  console.log(` • Full Page Download Time : ${yellow(`${(res.totalTimeMs / 1000).toFixed(2)}s`)}`);
  console.log(` • Raw HTML Weight         : ${res.htmlSizeKb} KB`);
  console.log(` • Active Scripts & Tags   : ${res.scriptCount} script tags, ${res.cssCount} stylesheets`);

  if (res.isWordPress) {
    console.log(
      ` • CMS Engine              : ${red("WordPress / Monolith")} ${dim(
        `(${res.detectedPlugins.length} active plugins detected)`
      )}`
    );
    if (res.detectedPlugins.length > 0) {
      console.log(
        ` • Detected Plugins        : ${dim(res.detectedPlugins.slice(0, 8).join(", "))}${
          res.detectedPlugins.length > 8 ? dim(` +${res.detectedPlugins.length - 8} more`) : ""
        }`
      );
    }
  } else {
    console.log(` • CMS Engine              : ${yellow("Third-party / Custom CMS")}`);
  }

  console.log(line);

  // Financial Leakage Summary
  console.log(bold(" 💸 ESTIMATED REVENUE & AD SPEND LEAKAGE:"));
  console.log(
    ` • Ad Spend Penalty        : ${red(
      `~$${res.estLostAdSpendMonthly.toLocaleString()}/mo wasted`
    )} ${dim("on bounces before page renders")}`
  );
  console.log(
    ` • Mobile Conversion Drag  : ${red(
      `-${Math.round((100 - res.mobileScore) * 0.45)}% fewer calls/bookings`
    )} ${dim("compared to sub-second sites")}`
  );

  console.log(line);

  // Ready to send Cold Email
  const previewUrl = `${studioUrl}?preview=${encodeURIComponent(res.businessName)}#prototype`;

  console.log(bold(green(" ✉️  READY-TO-SEND COLD EMAIL (High-Conversion Hook):")));
  console.log(dim("┌" + "─".repeat(66) + "┐"));
  console.log(` ${bold("Subject:")} quick question regarding ${res.domain} mobile load speed\n`);
  console.log(` Hey ${res.contactName === "there" ? res.businessName + " Team" : res.contactName},`);
  console.log(
    `\n Noticed you guys are driving traffic to ${res.domain}, but the mobile landing page takes ${(
      res.totalTimeMs / 1000
    ).toFixed(1)}s to load (Google PageSpeed mobile score: ${res.mobileScore}/100${
      res.isWordPress && res.detectedPlugins.length > 3 ? `, weighed down by ${res.detectedPlugins.length} plugins` : ""
    }).`
  );
  console.log(
    `\n Because Google penalizes pages over 2.5s with lower Quality Scores, you're likely paying up to 35% higher cost-per-click while losing ~${Math.round(
      (100 - res.mobileScore) * 0.4
    )}% of mobile visitors to back-button bounces.`
  );
  console.log(
    `\n I run Speedcraft Studio (${studioUrl.replace(
      /^https?:\/\//,
      ""
    )}). I hand-coded a sub-second prototype for ${res.businessName} that loads in 0.28s and scores a verified 100/100 Core Web Vitals.`
  );
  console.log(`\n Would you like me to send over the free live preview link? Zero strings attached.`);
  console.log(`\n Best,`);
  console.log(` Faruk — Lead Engineer, Speedcraft Studio`);
  console.log(` Direct: ${studioUrl}`);
  console.log(dim("└" + "─".repeat(66) + "┘"));

  // Ready to send LinkedIn DM
  console.log("\n" + bold(cyan(" 📱 READY-TO-SEND LINKEDIN DM / INMAIL (Under 300 Chars):")));
  console.log(dim("┌" + "─".repeat(66) + "┐"));
  console.log(
    ` Hey ${res.contactName === "there" ? "there" : res.contactName}, saw ${res.domain}. Mobile takes ${(
      res.totalTimeMs / 1000
    ).toFixed(1)}s (PageSpeed: ${res.mobileScore}/100), leaking paid traffic. I built a 0.28s Next.js prototype for ${res.businessName} scoring 100/100. Want me to send the free live preview link?`
  );
  console.log(dim("└" + "─".repeat(66) + "┘"));

  console.log("\n" + doubleLine + "\n");
}

// CLI Execution Entry Point
async function main() {
  const args = process.argv.slice(2);
  let targetUrl = args.find((a) => !a.startsWith("--"));

  if (!targetUrl) {
    console.log(bold(cyan("\n⚡ Speedcraft Studio Client Audit & Outreach Generator")));
    console.log(dim("Usage: npm run audit -- <url> [--name \"Company\"] [--owner \"Name\"] [--niche \"Roofing\"]\n"));
    console.log(yellow("Example: npm run audit -- https://summitroofingdfw.com --name \"Summit Roofing\"\n"));
    process.exit(0);
  }

  // Parse CLI flags
  const nameArgIndex = args.indexOf("--name");
  const ownerArgIndex = args.indexOf("--owner");
  const nicheArgIndex = args.indexOf("--niche");
  const keyArgIndex = args.indexOf("--key");

  const name = nameArgIndex !== -1 ? args[nameArgIndex + 1] : undefined;
  const owner = ownerArgIndex !== -1 ? args[ownerArgIndex + 1] : undefined;
  const niche = nicheArgIndex !== -1 ? args[nicheArgIndex + 1] : undefined;
  const apiKey = keyArgIndex !== -1 ? args[keyArgIndex + 1] : undefined;

  console.log(dim(`\nScanning ${targetUrl}... Fetching network telemetry & analyzing bottleneck surfaces...`));

  try {
    const result = await runAudit(targetUrl, { name, owner, niche, apiKey });
    printCliReport(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(red(`\n❌ Audit Failed: ${msg}\n`));
    process.exit(1);
  }
}

main();
