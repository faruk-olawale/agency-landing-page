import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

interface TelemetryEvent {
  id: string;
  slug: string;
  company: string;
  website?: string;
  loadTimeMs?: number;
  speedSec?: string;
  referrer?: string;
  userAgent?: string;
  timestamp: string;
  ip?: string;
}

interface SentRecord {
  company: string;
  email?: string;
  sentAt: string;
  method?: string;
  status: string;
  previewUrl?: string;
  id?: string;
  viewedAt?: string;
  viewCount?: number;
}

const VIEWS_LOG_PATH = path.resolve(process.cwd(), "leads", "prototype_views_log.json");
const SENT_LOG_PATH = path.resolve(process.cwd(), "leads", "sent_outreach_log.json");

function getViewsLog(): TelemetryEvent[] {
  try {
    if (!fs.existsSync(VIEWS_LOG_PATH)) {
      fs.writeFileSync(VIEWS_LOG_PATH, "[]", "utf-8");
      return [];
    }
    const raw = fs.readFileSync(VIEWS_LOG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading prototype_views_log.json:", err);
    return [];
  }
}

function saveViewsLog(records: TelemetryEvent[]) {
  try {
    fs.writeFileSync(VIEWS_LOG_PATH, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving prototype_views_log.json:", err);
  }
}

function updateSentRecordView(company: string, slug: string, timestamp: string) {
  try {
    if (!fs.existsSync(SENT_LOG_PATH)) return;
    const raw = fs.readFileSync(SENT_LOG_PATH, "utf-8");
    const sentRecords: SentRecord[] = JSON.parse(raw);

    const normCompany = (company || "").toLowerCase().trim();
    const normSlug = (slug || "").toLowerCase().trim();

    let updated = false;
    for (const record of sentRecords) {
      const matchCompany = record.company && record.company.toLowerCase().trim() === normCompany;
      const matchPreview = record.previewUrl && (
        record.previewUrl.toLowerCase().includes(normSlug) ||
        (normCompany && record.previewUrl.toLowerCase().includes(normCompany.replace(/\s+/g, "-")))
      );

      if (matchCompany || matchPreview) {
        record.viewedAt = timestamp;
        record.viewCount = (record.viewCount || 0) + 1;
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(SENT_LOG_PATH, JSON.stringify(sentRecords, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error updating sent outreach view telemetry:", err);
  }
}

export async function GET() {
  const views = getViewsLog();
  return NextResponse.json({
    totalViews: views.length,
    recentViews: views.slice(0, 50),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      slug = "",
      company = "",
      website = "",
      loadTimeMs = 180,
      speedSec = "0.2s",
      referrer = "",
    } = body;

    const userAgent = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const timestamp = new Date().toISOString();

    const newEvent: TelemetryEvent = {
      id: "view_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
      slug,
      company,
      website,
      loadTimeMs,
      speedSec,
      referrer,
      userAgent,
      timestamp,
      ip,
    };

    const views = getViewsLog();
    views.unshift(newEvent);
    // Keep last 1,000 views
    if (views.length > 1000) {
      views.length = 1000;
    }
    saveViewsLog(views);

    // Update sent outreach log if this lead was emailed
    updateSentRecordView(company, slug, timestamp);

    return NextResponse.json({
      success: true,
      recorded: true,
      timestamp,
      id: newEvent.id,
    });
  } catch (err: unknown) {
    console.error("Exception in /api/telemetry:", err);
    const message = err instanceof Error ? err.message : "Failed to log telemetry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
