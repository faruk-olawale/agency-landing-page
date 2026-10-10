/**
 * Production Readiness Audit: Verification of 3 Automotive Outreach Prospects
 * ============================================================================
 * Tests:
 * 1. Prospect A: Complete, verified business data (Dallas European Auto Repair)
 * 2. Prospect B: Missing contact / location data (Apex Precision Transmission)
 * 3. Prospect C: Conflicting / unverified operational claims & Demo vs Prospect Mode
 * ============================================================================
 */

import { getAutomotiveTruth } from "../src/lib/automotiveTruth";
import { qualifyAutomotiveLead, getArchetype } from "../src/lib/archetypeMap";

interface TestReport {
  name: string;
  category: string;
  status: "PASS" | "FAIL";
  details: string;
}

const reports: TestReport[] = [];

function assert(condition: boolean, name: string, category: string, details: string) {
  if (condition) {
    reports.push({ name, category, status: "PASS", details });
    console.log(`✅ [PASS] ${category} - ${name}: ${details}`);
  } else {
    reports.push({ name, category, status: "FAIL", details });
    console.error(`❌ [FAIL] ${category} - ${name}: ${details}`);
  }
}

async function runAudit() {
  console.log("================================================================================");
  console.log("PRODUCTION READINESS AUDIT: 3-PROSPECT WORKFLOW VERIFICATION");
  console.log("================================================================================\n");

  const PORT = 3001;
  const BASE_URL = `http://localhost:${PORT}`;

  // ───────────────────────────────────────────────────────────────────────────
  // SCENARIO 1: COMPLETE, VERIFIED PROSPECT (Dallas European Auto Repair)
  // ───────────────────────────────────────────────────────────────────────────
  console.log("--- 1. Testing Prospect A: Complete, Verified Information ---");
  const prospectA = {
    name: "Dallas European Auto Repair",
    company: "Dallas European Auto Repair",
    city: "Dallas",
    phone: "(972) 420-7494",
    website: "https://dallaseuropeanauto.com",
    industry: "European Vehicle Specialist",
    rating: 4.9,
    reviewsCount: 142,
  };

  const qualA = qualifyAutomotiveLead({
    company: prospectA.name,
    industry: prospectA.industry,
    website: prospectA.website,
  });
  assert(qualA.isQualified, "Lead Qualification", "Prospect A", "Correctly qualified as European Vehicle Specialist");

  const truthA = getAutomotiveTruth(prospectA, false);
  assert(truthA.hasPhone === true, "Phone Truth", "Prospect A", `Verified phone present: ${truthA.phone}`);
  assert(truthA.cleanPhone === "9724207494", "Clean Phone", "Prospect A", `Clean digits match: ${truthA.cleanPhone}`);
  assert(truthA.hasCity === true && truthA.city === "Dallas", "City Truth", "Prospect A", `City is Dallas: ${truthA.city}`);
  assert(truthA.isDemoMode === false, "Demo Flag", "Prospect A", "Prospect mode active (not demo)");

  // Inspect Preview URL & Rendered HTML on localhost:3001
  const slugA = "dallas-european-auto-repair";
  const urlA = `${BASE_URL}/preview/${slugA}?name=${encodeURIComponent(prospectA.name)}&industry=${encodeURIComponent(prospectA.industry)}&city=${encodeURIComponent(prospectA.city)}&phone=${encodeURIComponent(prospectA.phone)}`;
  
  const resA = await fetch(urlA);
  assert(resA.status === 200, "Preview HTTP Status", "Prospect A", `Returned HTTP 200 for ${urlA}`);
  const htmlA = await resA.text();

  assert(htmlA.includes("tel:9724207494"), "Phone CTA in DOM", "Prospect A", "tel:9724207494 correctly rendered in call buttons");
  assert(htmlA.includes("Dallas"), "City in DOM", "Prospect A", "Dallas rendered in headlines");
  assert(htmlA.includes("Submit Intake Request"), "Submit Request Button", "Prospect A", "Button specifies 'Submit Intake Request' (not confirmed appointment)");
  assert(htmlA.includes("Service advisor contacts you to confirm scheduling"), "Advisory Notice", "Prospect A", "Clear notice that advisor confirms scheduling");
  
  // Verify component source guarantees non-confirmed status upon submission
  const fs = await import("node:fs");
  const bookingCode = fs.readFileSync("src/components/templates/quickfleet/QuickFleetBookingClose.tsx", "utf-8");
  assert(bookingCode.includes("NOTICE: NO APPOINTMENT REQUEST HAS BEEN TRANSMITTED"), "Honest Prototype Notice", "Prospect A", "Component explicitly warns that no request has been transmitted to the business");


  // ───────────────────────────────────────────────────────────────────────────
  // SCENARIO 2: MISSING CONTACT / LOCATION INFORMATION (Apex Precision Transmission)
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- 2. Testing Prospect B: Missing Contact / Location Information ---");
  const prospectB = {
    name: "Apex Precision Transmission",
    company: "Apex Precision Transmission",
    city: "Metropolitan Area", // Generic fallback placeholder
    phone: "", // Completely missing phone
    website: "https://apexprecisiontrans.com",
    industry: "Transmission & Drivetrain",
    rating: 0,
    reviewsCount: 0,
  };

  const truthB = getAutomotiveTruth(prospectB, false);
  assert(truthB.hasPhone === false, "Missing Phone Handled", "Prospect B", "hasPhone evaluates to false for empty string");
  assert(truthB.phone === undefined, "Undefined Phone", "Prospect B", "phone is safely undefined, not fallback text");
  assert(truthB.hasCity === false, "Generic City Filtered", "Prospect B", "'Metropolitan Area' recognized as non-verified generic city");
  assert(truthB.city === undefined, "Undefined City", "Prospect B", "city is undefined, avoiding awkward headlines");

  // Inspect Preview URL & Rendered HTML
  const slugB = "apex-precision-transmission";
  const urlB = `${BASE_URL}/preview/${slugB}?name=${encodeURIComponent(prospectB.name)}&industry=${encodeURIComponent(prospectB.industry)}`;
  const resB = await fetch(urlB);
  assert(resB.status === 200, "Preview HTTP Status", "Prospect B", `Returned HTTP 200 for ${urlB}`);
  const htmlB = await resB.text();

  assert(!htmlB.includes("tel:undefined") && !htmlB.includes("tel:"), "No Broken Phone Link", "Prospect B", "No broken tel: links when phone is missing");
  assert(htmlB.includes("Explore Capabilities") || htmlB.includes("View Diagnostic Bays"), "Fallback Action CTA", "Prospect B", "Rendered alternative explore/intake buttons in place of phone call");
  assert(!htmlB.includes("Metropolitan Area"), "No Generic City Bleed", "Prospect B", "Headlines omit generic location text cleanly");


  // ───────────────────────────────────────────────────────────────────────────
  // SCENARIO 3: CONFLICTING / UNVERIFIED CLAIMS & DEMO VS PROSPECT MODE
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n--- 3. Testing Prospect C: Conflicting Claims (Demo vs Prospect-Ready) ---");
  const prospectC = {
    name: "Lone Star Diesel Fleet Solutions",
    company: "Lone Star Diesel Fleet Solutions",
    city: "Fort Worth",
    phone: "(817) 555-0199",
    website: "https://lonestardieselfleet.com",
    industry: "Fleet Diesel & Commercial",
    rating: 0,
    reviewsCount: 0, // Unreviewed / unverified
  };

  // 3.1: In PROSPECT-READY Mode
  const truthC_Prospect = getAutomotiveTruth(prospectC, false);
  assert(truthC_Prospect.isDemoMode === false, "Prospect Mode Flag", "Prospect C (Prospect)", "isDemoMode is false");
  assert(truthC_Prospect.reviews.headerBadge === "REPRESENTATIVE DIAGNOSTIC SCENARIOS", "Review Labeled Representative", "Prospect C (Prospect)", `Reviews labeled: ${truthC_Prospect.reviews.headerBadge}`);
  assert(truthC_Prospect.technicians.leadTechTitle === "Assigned Master Diagnostic Specialist", "No Fabricated Tech Name", "Prospect C (Prospect)", "Does not invent fake employee name M. Vance");
  assert(truthC_Prospect.bays.statusSummary === "Diagnostic Intake & Triage Coordination", "Bay Neutral Status", "Prospect C (Prospect)", "Does not claim unverified live bay status");

  const urlC_Prospect = `${BASE_URL}/preview/lone-star-diesel?name=${encodeURIComponent(prospectC.name)}&industry=${encodeURIComponent(prospectC.industry)}&city=${encodeURIComponent(prospectC.city)}&phone=${encodeURIComponent(prospectC.phone)}&mode=prospect`;
  const resC_Prospect = await fetch(urlC_Prospect);
  assert(resC_Prospect.status === 200, "Prospect Page HTTP", "Prospect C (Prospect)", "HTTP 200 returned");
  const htmlC_Prospect = await resC_Prospect.text();

  assert(!htmlC_Prospect.includes("PROTOTYPE DEMONSTRATION MODE"), "No Demo Banner in Prospect Mode", "Prospect C (Prospect)", "Banner hidden");
  assert(!htmlC_Prospect.includes("M. Vance (ASE L1 #4928)"), "No Invented Cert in Prospect Mode", "Prospect C (Prospect)", "ASE L1 certification claim omitted for unverified prospect");

  // 3.2: In DEMO Mode (?mode=demo)
  const truthC_Demo = getAutomotiveTruth(prospectC, true);
  assert(truthC_Demo.isDemoMode === true, "Demo Mode Flag", "Prospect C (Demo)", "isDemoMode is true");
  assert(truthC_Demo.reviews.headerBadge === "SAMPLE DIAGNOSTIC CASE STUDIES", "Review Labeled Sample", "Prospect C (Demo)", "Case studies labeled as sample");
  assert(truthC_Demo.warranty.badge === "Illustrative 24-Mo / 24k-Mi Protection", "Illustrative Warranty", "Prospect C (Demo)", "Warranty labeled illustrative model");

  const urlC_Demo = `${BASE_URL}/preview/lone-star-diesel?name=${encodeURIComponent(prospectC.name)}&industry=${encodeURIComponent(prospectC.industry)}&city=${encodeURIComponent(prospectC.city)}&phone=${encodeURIComponent(prospectC.phone)}&mode=demo`;
  const resC_Demo = await fetch(urlC_Demo);
  assert(resC_Demo.status === 200, "Demo Page HTTP", "Prospect C (Demo)", "HTTP 200 returned");
  const htmlC_Demo = await resC_Demo.text();

  assert(htmlC_Demo.includes("PROTOTYPE DEMONSTRATION MODE"), "Demo Banner Present", "Prospect C (Demo)", "Prominent banner marks experience as demonstration");
  assert(htmlC_Demo.includes("Illustrative operational benchmarks"), "Demo Benchmark Disclaimer", "Prospect C (Demo)", "Explicit disclaimer on benchmarks");

  console.log("\n================================================================================");
  const failCount = reports.filter((r) => r.status === "FAIL").length;
  const passCount = reports.filter((r) => r.status === "PASS").length;
  console.log(`AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED out of ${reports.length} checks.`);
  console.log("================================================================================");

  if (failCount > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
