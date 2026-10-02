import fs from "node:fs";
import path from "node:path";
import { Resend } from "resend";

interface LeadRecord {
  company: string;
  website: string;
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
  cpcEstimateAud: number;
  estLostMonthlySpendAud: number;
}

interface SentRecord {
  company: string;
  email: string;
  sentAt: string;
  previewUrl: string;
  id?: string;
  status: "sent" | "failed" | "dry-run";
}

// Terminal Colors
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  const args = process.argv.slice(2);
  const isLive = args.includes("--live");
  const limitArgIdx = args.indexOf("--limit");
  const limit = limitArgIdx !== -1 ? parseInt(args[limitArgIdx + 1], 10) : 10;
  const cityArgIdx = args.indexOf("--city");
  const filterCity = cityArgIdx !== -1 ? args[cityArgIdx + 1].toLowerCase() : null;
  const companyArgIdx = args.indexOf("--company");
  const filterCompany = companyArgIdx !== -1 ? args[companyArgIdx + 1].toLowerCase() : null;
  const studioDomain = process.env.NEXT_PUBLIC_STUDIO_URL || "https://speedcraft.dev";

  console.log(`\n📬 ════════════════════════════════════════════════════════════════════`);
  console.log(bold(cyan(` ⚡ SPEEDCRAFT // AUTOMATED OUTREACH & PROTOTYPE DISPATCHER`)));
  console.log(` Mode: ${isLive ? red(bold("🚨 LIVE SENDING ACTIVATED")) : green(bold("🛡️  DRY-RUN PREVIEW (Zero emails sent)"))}`);
  console.log(` Dispatch Limit: ${limit} prospects`);
  if (filterCity) console.log(` City Filter: ${filterCity}`);
  if (filterCompany) console.log(` Company Filter: ${filterCompany}`);
  console.log(`════════════════════════════════════════════════════════════════════\n`);

  // Load leads
  const leadsPath = path.resolve(process.cwd(), "leads", "australia_leads_audit.json");
  if (!fs.existsSync(leadsPath)) {
    console.error(red("Error: leads/australia_leads_audit.json not found. Run 'npm run leads:au' first."));
    process.exit(1);
  }

  const leads: LeadRecord[] = JSON.parse(fs.readFileSync(leadsPath, "utf8"));

  // Load sent log
  const sentLogPath = path.resolve(process.cwd(), "leads", "sent_outreach_log.json");
  let sentLog: SentRecord[] = [];
  if (fs.existsSync(sentLogPath)) {
    try {
      sentLog = JSON.parse(fs.readFileSync(sentLogPath, "utf8"));
    } catch {
      sentLog = [];
    }
  }

  const alreadySentEmails = new Set(sentLog.filter((s) => s.status === "sent").map((s) => s.email.toLowerCase()));

  // Filter candidates with valid emails and lowest PageSpeed (highest waste)
  let queue = leads.filter((l) => {
    if (!l.email || !l.email.includes("@")) return false;
    if (alreadySentEmails.has(l.email.toLowerCase())) return false;
    if (filterCity && !l.city.toLowerCase().includes(filterCity)) return false;
    if (filterCompany && !l.company.toLowerCase().includes(filterCompany)) return false;
    return true;
  });

  // Sort by lowest PageSpeed first (hottest leads)
  queue.sort((a, b) => a.mobilePageSpeed - b.mobilePageSpeed);
  queue = queue.slice(0, limit);

  if (queue.length === 0) {
    console.log(yellow("No eligible prospects found matching your criteria (or all eligible prospects were already emailed)."));
    process.exit(0);
  }

  console.log(`Found ${bold(String(queue.length))} high-priority target prospects ready for dispatch:\n`);

  let resendClient: Resend | null = null;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (isLive) {
    if (!resendApiKey) {
      console.error(red("\n❌ Error: RESEND_API_KEY environment variable is missing."));
      console.error(dim("To send live emails, set RESEND_API_KEY=re_... in .env.local or pass it in terminal:"));
      console.error(cyan("RESEND_API_KEY=your_key npm run send:outreach -- --live\n"));
      process.exit(1);
    }
    resendClient = new Resend(resendApiKey);
  }

  const previewCardsHtml: string[] = [];

  for (let i = 0; i < queue.length; i++) {
    const p = queue[i];
    const slug = slugify(p.company);
    const domainClean = p.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
    const previewUrl = `${studioDomain}/preview/${slug}`;
    const contactGreeting = p.contactName && p.contactName !== "there" ? p.contactName : `${p.company} Team`;

    const subject = `quick question regarding ${domainClean} mobile load speed`;
    const emailBodyText = `Hey ${contactGreeting},

Noticed you guys are driving traffic to ${domainClean}, but the mobile landing page takes ${p.mobileLoadTimeSec}s to load (Google Mobile PageSpeed: ${p.mobilePageSpeed}/100).

Because Google penalizes pages over 2.5s with lower Quality Scores, you're likely paying up to 35% higher cost-per-click while losing ~${Math.round((100 - p.mobilePageSpeed) * 0.45)}% of mobile visitors to back-button bounces.

I run Speedcraft Studio (speedcraft.dev). I hand-coded a sub-second prototype for ${p.company} that loads in 0.28s and scores a verified 100/100 Core Web Vitals:
👉 ${previewUrl}

Zero strings attached — take a look on your mobile phone to feel the speed difference.

Would you like me to deploy this live on your domain so you can stop leaking ad clicks?

Best,
Faruk — Lead Engineer, Speedcraft Studio
Direct: https://speedcraft.dev`;

    console.log(dim("─".repeat(68)));
    console.log(`${bold(`[${i + 1}/${queue.length}]`)} ${cyan(bold(p.company))} (${p.city}, ${p.niche})`);
    console.log(` Target Email : ${green(p.email)}`);
    console.log(` PageSpeed    : ${red(bold(`${p.mobilePageSpeed}/100`))} (Load Time: ${p.mobileLoadTimeSec}s | Waste: ~$${p.estLostMonthlySpendAud} AUD/mo)`);
    console.log(` Prototype URL: ${cyan(previewUrl)}`);
    console.log(` Subject      : ${subject}`);

    // Build HTML preview for review
    previewCardsHtml.push(`
      <div style="background:#ffffff; border:1px solid #e4e4e7; border-radius:12px; padding:24px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.05); font-family:sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #f4f4f5; padding-bottom:8px;">
          <div>
            <strong style="font-size:16px; color:#09090b;">#${i + 1} ${p.company}</strong> 
            <span style="color:#71717a; font-size:12px;">(${p.city} • ${p.niche})</span>
          </div>
          <div>
            <span style="background:#fee2e2; color:#b91c1c; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:12px;">
              ${p.mobilePageSpeed}/100 PageSpeed (Load: ${p.mobileLoadTimeSec}s)
            </span>
          </div>
        </div>
        <div style="font-size:13px; color:#52525b; margin-bottom:12px;">
          <strong>To:</strong> <code style="background:#f4f4f5; padding:2px 6px; border-radius:4px;">${p.email}</code><br>
          <strong>Subject:</strong> <code>${subject}</code><br>
          <strong>Live Prototype:</strong> <a href="${previewUrl}" target="_blank" style="color:#0891b2; font-weight:bold;">${previewUrl}</a>
        </div>
        <div style="background:#fafafa; border:1px solid #e4e4e7; border-radius:8px; padding:16px; font-size:13px; line-height:1.6; white-space:pre-wrap; color:#18181b;">${emailBodyText}</div>
      </div>
    `);

    if (isLive && resendClient) {
      try {
        process.stdout.write(` Dispatching email via Resend... `);
        const sendRes = await resendClient.emails.send({
          from: process.env.OUTREACH_FROM_EMAIL || "Faruk <faruk@speedcraft.dev>",
          to: p.email,
          subject,
          text: emailBodyText,
        });

        console.log(green(`✅ Dispatched! (ID: ${sendRes.data?.id})`));
        sentLog.push({
          company: p.company,
          email: p.email,
          sentAt: new Date().toISOString(),
          previewUrl,
          id: sendRes.data?.id,
          status: "sent",
        });

        // Delay 2.5s between sends to protect sender reputation
        if (i < queue.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2500));
        }
      } catch (err: any) {
        console.log(red(`❌ Failed to send: ${err.message}`));
        sentLog.push({
          company: p.company,
          email: p.email,
          sentAt: new Date().toISOString(),
          previewUrl,
          status: "failed",
        });
      }
    } else {
      sentLog.push({
        company: p.company,
        email: p.email,
        sentAt: new Date().toISOString(),
        previewUrl,
        status: "dry-run",
      });
    }
  }

  // Save preview HTML file
  const fullHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Speedcraft Outreach Queue Preview</title>
  </head>
  <body style="background:#f4f4f5; padding:40px; margin:0;">
    <div style="max-width:800px; margin:0 auto;">
      <div style="margin-bottom:24px; background:#09090b; color:white; padding:20px; border-radius:12px;">
        <h1 style="margin:0 0 6px 0; font-size:22px;">⚡ Speedcraft Outreach Dispatch Queue</h1>
        <p style="margin:0; font-size:13px; color:#a1a1aa;">Generated for ${queue.length} Australian high-ticket service targets with tailored prototype links.</p>
      </div>
      ${previewCardsHtml.join("")}
    </div>
  </body>
  </html>
  `;

  const htmlPreviewPath = path.resolve(process.cwd(), "leads", "outreach_queue_preview.html");
  fs.writeFileSync(htmlPreviewPath, fullHtml, "utf8");

  // Save log if live
  if (isLive) {
    fs.writeFileSync(sentLogPath, JSON.stringify(sentLog, null, 2), "utf8");
    console.log(green(`\n💾 Saved dispatch record to leads/sent_outreach_log.json`));
  }

  console.log(`\n📁 Generated HTML Preview: ${cyan(htmlPreviewPath)}`);
  if (!isLive) {
    console.log(yellow(`\n💡 DRY-RUN FINISHED: Zero emails were sent.`));
    console.log(`To dispatch live emails via Resend, set RESEND_API_KEY in .env.local and run:`);
    console.log(bold(cyan(`npm run send:outreach -- --live --limit 5\n`)));
  } else {
    console.log(green(`\n🎉 LIVE OUTREACH FINISHED: Successfully processed queue.\n`));
  }
}

main().catch(console.error);
