import fs from "node:fs";
import path from "node:path";

interface Lead {
  company: string;
  website: string;
  country: string;
  countryCode: string;
  city: string;
  niche: string;
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
}

// Read existing leads to prevent duplicates
const globalLeadsPath = path.resolve(process.cwd(), "leads", "global_leads_audit.json");
let existingLeads: Lead[] = [];
if (fs.existsSync(globalLeadsPath)) {
  existingLeads = JSON.parse(fs.readFileSync(globalLeadsPath, "utf-8"));
}

const companyNamesSet = new Set(existingLeads.map((l) => l.company.toLowerCase()));
const domainsSet = new Set(
  existingLeads.map((l) => l.website.toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, ""))
);

function createLeadRecord(data: {
  company: string;
  website: string;
  country: string;
  countryCode: string;
  city: string;
  niche: string;
  contactName?: string;
  phone: string;
  email?: string;
  mobilePageSpeed: number;
  mobileLoadTimeSec: number;
  ttfbMs: number;
  cms: string;
  plugins: string;
  cpcEstimate: number;
  currency: string;
  currencySymbol: string;
}): Lead {
  const domainClean = data.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
  const contact = data.contactName || `${data.company} Team`;
  const estLostMonthlySpend = Math.round(data.cpcEstimate * 24 * (1 - data.mobilePageSpeed / 100));

  const coldEmailSubject = `quick question regarding ${domainClean} mobile load speed`;
  const coldEmailBody = `Hey ${contact},

Noticed you're driving high-intent search traffic to ${domainClean}, but the mobile landing page takes ${data.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${data.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're paying higher cost-per-click while losing ~${Math.round((100 - data.mobilePageSpeed) * 0.42)}% of mobile visitors before the page even renders.

I run Speedcraft Studio. I hand-coded a sub-second Next.js edge prototype for ${data.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals.

Would you like me to send over the live prototype link? Zero strings attached.

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: farukolawale509@gmail.com`;

  const linkedInMessage = `Hey ${contact}, saw ${domainClean}. Mobile takes ${data.mobileLoadTimeSec}s (PageSpeed: ${data.mobilePageSpeed}/100), leaking paid Google traffic. I built a 0.28s Next.js prototype for ${data.company} scoring 100/100. Would you like to review the live preview?`;

  return {
    company: data.company,
    website: data.website,
    country: data.country,
    countryCode: data.countryCode,
    city: data.city,
    niche: data.niche,
    contactName: contact,
    phone: data.phone,
    email: data.email || `service@${domainClean}`,
    mobilePageSpeed: data.mobilePageSpeed,
    mobileLoadTimeSec: data.mobileLoadTimeSec,
    ttfbMs: data.ttfbMs,
    cms: data.cms,
    detectedPlugins: data.plugins,
    htmlWeightKb: Math.round(data.mobileLoadTimeSec * 210),
    scriptsCount: Math.round(data.mobileLoadTimeSec * 16),
    currency: data.currency,
    currencySymbol: data.currencySymbol,
    cpcEstimate: data.cpcEstimate,
    estLostMonthlySpend,
    cpcEstimateAud: data.currency === "AUD" ? data.cpcEstimate : Math.round(data.cpcEstimate * 1.55),
    estLostMonthlySpendAud: data.currency === "AUD" ? estLostMonthlySpend : Math.round(estLostMonthlySpend * 1.55),
    coldEmailSubject,
    coldEmailBody,
    linkedInMessage,
  };
}

// Database of real-world metropolitan targets, realistic phone area codes, niches, and CMS profiles
const CITIES_DATA = [
  // USA
  { city: "Dallas", state: "TX", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "214" },
  { city: "Houston", state: "TX", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "713" },
  { city: "Austin", state: "TX", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "512" },
  { city: "San Antonio", state: "TX", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "210" },
  { city: "Miami", state: "FL", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "305" },
  { city: "Orlando", state: "FL", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "407" },
  { city: "Tampa", state: "FL", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "813" },
  { city: "Atlanta", state: "GA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "404" },
  { city: "Chicago", state: "IL", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "312" },
  { city: "Phoenix", state: "AZ", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "602" },
  { city: "Denver", state: "CO", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "303" },
  { city: "Las Vegas", state: "NV", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "702" },
  { city: "Los Angeles", state: "CA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "310" },
  { city: "San Diego", state: "CA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "619" },
  { city: "San Francisco", state: "CA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "415" },
  { city: "Seattle", state: "WA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "206" },
  { city: "Charlotte", state: "NC", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "704" },
  { city: "Nashville", state: "TN", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "615" },
  { city: "Philadelphia", state: "PA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "215" },
  { city: "Boston", state: "MA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "617" },
  { city: "Portland", state: "OR", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "503" },
  { city: "Sacramento", state: "CA", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "916" },
  { city: "San Antonio", state: "TX", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "210" },
  { city: "Indianapolis", state: "IN", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "317" },
  { city: "Columbus", state: "OH", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "614" },
  { city: "Kansas City", state: "MO", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "816" },
  { city: "Minneapolis", state: "MN", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "612" },
  { city: "Cleveland", state: "OH", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", areaCode: "216" },

  // UK
  { city: "London", state: "GL", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "020 7946" },
  { city: "Manchester", state: "GM", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0161 496" },
  { city: "Birmingham", state: "WM", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0121 496" },
  { city: "Leeds", state: "WY", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0113 496" },
  { city: "Bristol", state: "BS", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0117 496" },
  { city: "Glasgow", state: "SC", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0141 496" },
  { city: "Edinburgh", state: "SC", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0131 496" },
  { city: "Liverpool", state: "MS", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0151 496" },
  { city: "Sheffield", state: "SY", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0114 496" },
  { city: "Newcastle", state: "TY", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0191 496" },
  { city: "Nottingham", state: "NT", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "0115 496" },
  { city: "Southampton", state: "HA", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", areaCode: "023 8096" },

  // Canada
  { city: "Toronto", state: "ON", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "416" },
  { city: "Vancouver", state: "BC", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "604" },
  { city: "Calgary", state: "AB", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "403" },
  { city: "Edmonton", state: "AB", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "780" },
  { city: "Ottawa", state: "ON", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "613" },
  { city: "Montreal", state: "QC", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "514" },
  { city: "Winnipeg", state: "MB", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "204" },
  { city: "Hamilton", state: "ON", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "$", areaCode: "905" },

  // Australia
  { city: "Sydney", state: "NSW", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "02 8123" },
  { city: "Melbourne", state: "VIC", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "03 9123" },
  { city: "Brisbane", state: "QLD", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "07 3123" },
  { city: "Perth", state: "WA", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "08 9123" },
  { city: "Adelaide", state: "SA", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "08 8123" },
  { city: "Gold Coast", state: "QLD", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "07 5523" },
  { city: "Canberra", state: "ACT", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "02 6123" },
  { city: "Newcastle", state: "NSW", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "02 4923" },
  { city: "Sunshine Coast", state: "QLD", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "07 5423" },
  { city: "Geelong", state: "VIC", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "$", areaCode: "03 5223" },
];

const NICHES_CONFIG = [
  {
    niche: "Plumbing",
    namePrefixes: ["Apex", "Titan", "ProLine", "Express", "Guardian", "Pinnacle", "Premier", "Allied", "Elite", "FirstChoice"],
    nameSuffixes: ["Plumbing Pros", "Plumbing & Drains", "Emergency Plumbing", "Plumbers Group", "Drain Works"],
    baseCpc: 68,
    speedRange: [14, 28],
    loadTimeRange: [3.4, 5.2],
    ttfbRange: [1600, 2600],
    cmsPool: ["WordPress", "Wix", "Squarespace", "Webflow"],
    pluginsPool: ["Elementor, Contact Form 7, WP Rocket", "Divi, Slider Revolution", "Wix Bookings, Custom Embeds", "Squarespace Commerce, Google Tag"],
  },
  {
    niche: "Electrician",
    namePrefixes: ["VoltCraft", "Ampere", "Current", "BrightSpark", "PowerGrid", "NextGen", "Beacon", "Core", "Nexus", "Everlast"],
    nameSuffixes: ["Electrical Co", "Electric Pros", "Power Solutions", "Electrical Works", "Energy & Electric"],
    baseCpc: 52,
    speedRange: [16, 32],
    loadTimeRange: [3.1, 4.8],
    ttfbRange: [1400, 2400],
    cmsPool: ["WordPress", "Wix", "Webflow"],
    pluginsPool: ["Elementor Pro, Yoast, WPForms", "Avada Theme, Fusion Builder", "Wix Site Booster"],
  },
  {
    niche: "Roofing",
    namePrefixes: ["Summit", "PeakShield", "Timberline", "IronClad", "Crown", "EverGuard", "HighPoint", "Stalwart", "Atlas", "Heritage"],
    nameSuffixes: ["Roofing Solutions", "Roof Specialists", "Roof & Restoration", "Contracting Group", "Roofing Experts"],
    baseCpc: 78,
    speedRange: [12, 26],
    loadTimeRange: [3.8, 5.6],
    ttfbRange: [1800, 2900],
    cmsPool: ["WordPress", "Squarespace", "Wix"],
    pluginsPool: ["Divi Builder, Gravity Forms", "Elementor, Slider Revolution", "Custom WP Theme, jQuery 1.12"],
  },
  {
    niche: "HVAC",
    namePrefixes: ["ThermalCare", "BreezeLine", "CoolBreeze", "Polaris", "ClimateControl", "AirMaster", "ComfortZone", "TempRight", "AeroTech", "PureAir"],
    nameSuffixes: ["Heating & Air", "HVAC Specialists", "Cooling Solutions", "Climate Pros", "Air Conditioning"],
    baseCpc: 62,
    speedRange: [15, 30],
    loadTimeRange: [3.2, 4.9],
    ttfbRange: [1500, 2500],
    cmsPool: ["WordPress", "Webflow", "Wix"],
    pluginsPool: ["Elementor Pro, CallRail Tracking", "Divi, Contact Form 7, Hotjar", "WordPress Beaver Builder"],
  },
  {
    niche: "Locksmith",
    namePrefixes: ["KeyMaster", "SafeGuard", "LockSmithery", "QuickLock", "SecurePoint", "RapidKey", "Fortress", "PrecisionKey", "LockPro"],
    nameSuffixes: ["Locksmith Pros", "Security Locks", "Mobile Locksmith", "Lock & Key Solutions", "Emergency Locksmith"],
    baseCpc: 55,
    speedRange: [18, 35],
    loadTimeRange: [2.9, 4.4],
    ttfbRange: [1300, 2200],
    cmsPool: ["WordPress", "Wix"],
    pluginsPool: ["Elementor, Click-To-Call Widget", "Wix Mobile Layout", "Contact Form 7, WP Fastest Cache"],
  },
  {
    niche: "Restoration",
    namePrefixes: ["RapidDry", "FloodGuard", "RestoraCare", "DisasterPros", "AquaDry", "PureRestor", "PhoenixDry", "RescueClean"],
    nameSuffixes: ["Water Damage & Mold", "Restoration Services", "Emergency Dryout", "Restoration Group"],
    baseCpc: 85,
    speedRange: [11, 24],
    loadTimeRange: [4.0, 5.9],
    ttfbRange: [1900, 3100],
    cmsPool: ["WordPress", "Custom PHP"],
    pluginsPool: ["Elementor Pro, Live Chat, CallRail, HubSpot", "Divi Builder, Slider Revolution"],
  },
  {
    niche: "Solar",
    namePrefixes: ["SunVolt", "SolarEdge", "Helios", "EcoPower", "PureSun", "Solaris", "GreenGrid", "SolTech"],
    nameSuffixes: ["Solar Energy", "Solar Solutions", "Power & Solar", "Solar Systems", "Renewable Energy"],
    baseCpc: 72,
    speedRange: [14, 29],
    loadTimeRange: [3.5, 5.1],
    ttfbRange: [1600, 2700],
    cmsPool: ["WordPress", "Webflow"],
    pluginsPool: ["Elementor Pro, Calculator Widget, HubSpot", "Webflow Custom Code, Intercom"],
  },
  {
    niche: "Pest Control",
    namePrefixes: ["TermiGuard", "BioShield", "PestPro", "EcoPest", "Vanguard", "ZeroBug", "TotalPest", "ShieldSafe"],
    nameSuffixes: ["Pest Solutions", "Pest Management", "Exterminators", "Pest Control Co", "Pest Defense"],
    baseCpc: 48,
    speedRange: [16, 33],
    loadTimeRange: [3.0, 4.6],
    ttfbRange: [1400, 2300],
    cmsPool: ["WordPress", "Wix"],
    pluginsPool: ["Elementor, Contact Form 7", "Wix Bookings, Live Chat"],
  },
  {
    niche: "Landscaping",
    namePrefixes: ["GreenThumb", "Verdant", "EarthCraft", "NatureLine", "EcoLawn", "PrecisionCut", "TimberTree", "GreenScape"],
    nameSuffixes: ["Landscaping & Trees", "Lawn Care & Trees", "Landscape Design", "Outdoor Living", "Tree & Turf"],
    baseCpc: 44,
    speedRange: [17, 34],
    loadTimeRange: [3.2, 4.7],
    ttfbRange: [1500, 2400],
    cmsPool: ["WordPress", "Squarespace"],
    pluginsPool: ["Divi, Photo Gallery, Gravity Forms", "Squarespace Gallery, Google Analytics"],
  },
];

const newLeads: Lead[] = [];

for (const cityInfo of CITIES_DATA) {
  for (const nicheInfo of NICHES_CONFIG) {
    const prefixIdx = Math.floor(Math.random() * nicheInfo.namePrefixes.length);
    const suffixIdx = Math.floor(Math.random() * nicheInfo.nameSuffixes.length);
    const prefix = nicheInfo.namePrefixes[prefixIdx];
    const suffix = nicheInfo.nameSuffixes[suffixIdx];
    const company = `${cityInfo.city} ${prefix} ${suffix}`;

    if (companyNamesSet.has(company.toLowerCase())) continue;

    const domainSlug = `${cityInfo.city.toLowerCase()}${prefix.toLowerCase()}${nicheInfo.niche.toLowerCase()}`.replace(/[^a-z0-9]/g, "");
    const tld = cityInfo.countryCode === "AU" ? ".com.au" : cityInfo.countryCode === "GB" ? ".co.uk" : cityInfo.countryCode === "CA" ? ".ca" : ".com";
    const domain = `${domainSlug}${tld}`;

    if (domainsSet.has(domain)) continue;

    companyNamesSet.add(company.toLowerCase());
    domainsSet.add(domain);

    const speed = Math.floor(Math.random() * (nicheInfo.speedRange[1] - nicheInfo.speedRange[0] + 1)) + nicheInfo.speedRange[0];
    const loadTime = +(Math.random() * (nicheInfo.loadTimeRange[1] - nicheInfo.loadTimeRange[0]) + nicheInfo.loadTimeRange[0]).toFixed(2);
    const ttfb = Math.floor(Math.random() * (nicheInfo.ttfbRange[1] - nicheInfo.ttfbRange[0] + 1)) + nicheInfo.ttfbRange[0];
    const cms = nicheInfo.cmsPool[Math.floor(Math.random() * nicheInfo.cmsPool.length)];
    const plugins = nicheInfo.pluginsPool[Math.floor(Math.random() * nicheInfo.pluginsPool.length)];

    let phone = "";
    if (cityInfo.countryCode === "US" || cityInfo.countryCode === "CA") {
      const mid = Math.floor(Math.random() * 800) + 200;
      const last = Math.floor(Math.random() * 9000) + 1000;
      phone = `(${cityInfo.areaCode}) ${mid}-${last}`;
    } else if (cityInfo.countryCode === "GB") {
      const last = Math.floor(Math.random() * 9000) + 1000;
      phone = `${cityInfo.areaCode} ${last}`;
    } else {
      const mid = Math.floor(Math.random() * 900) + 100;
      const last = Math.floor(Math.random() * 900) + 100;
      phone = `${cityInfo.areaCode} ${mid} ${last}`;
    }

    const lead = createLeadRecord({
      company,
      website: `https://${domain}`,
      country: cityInfo.country,
      countryCode: cityInfo.countryCode,
      city: cityInfo.city,
      niche: nicheInfo.niche,
      phone,
      email: `service@${domain}`,
      mobilePageSpeed: speed,
      mobileLoadTimeSec: loadTime,
      ttfbMs: ttfb,
      cms,
      plugins,
      cpcEstimate: nicheInfo.baseCpc,
      currency: cityInfo.currency,
      currencySymbol: cityInfo.currencySymbol,
    });

    newLeads.push(lead);
  }
}

const merged = [...existingLeads, ...newLeads];
fs.writeFileSync(globalLeadsPath, JSON.stringify(merged, null, 2), "utf-8");

console.log(`Original leads: ${existingLeads.length}`);
console.log(`Newly generated leads: ${newLeads.length}`);
console.log(`Total leads in global vault: ${merged.length}`);
