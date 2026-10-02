import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

interface SentRecord {
  company: string;
  email?: string;
  sentAt: string;
  method?: string;
  status: string;
  previewUrl?: string;
  id?: string;
}

const LOG_FILE_PATH = path.resolve(process.cwd(), "leads", "sent_outreach_log.json");

function getSentLog(): SentRecord[] {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      fs.writeFileSync(LOG_FILE_PATH, "[]", "utf-8");
      return [];
    }
    const raw = fs.readFileSync(LOG_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading sent_outreach_log.json:", err);
    return [];
  }
}

function saveSentLog(records: SentRecord[]) {
  try {
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving sent_outreach_log.json:", err);
  }
}

export async function GET() {
  const records = getSentLog();
  return NextResponse.json({ sent: records });
}

export async function POST(req: NextRequest) {
  try {
    const { company, email, method = "manual", action = "mark_sent", previewUrl } = await req.json();

    if (!company) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }

    const records = getSentLog();

    if (action === "restore") {
      // Remove from sent log
      const updated = records.filter(
        (r) => r.company.toLowerCase() !== company.toLowerCase() && (email ? r.email?.toLowerCase() !== email.toLowerCase() : true)
      );
      saveSentLog(updated);
      return NextResponse.json({ success: true, restored: company, count: updated.length });
    }

    // Default: Mark as sent / contacted
    const normalizedCompany = company.toLowerCase();
    const existingIndex = records.findIndex(
      (r) => r.company.toLowerCase() === normalizedCompany || (email && r.email?.toLowerCase() === email.toLowerCase())
    );

    if (existingIndex >= 0) {
      // Already sent - return existing
      return NextResponse.json({
        success: true,
        alreadySent: true,
        record: records[existingIndex],
      });
    }

    const newRecord: SentRecord = {
      company,
      email: email || "",
      sentAt: new Date().toISOString(),
      method,
      status: "sent",
      previewUrl,
    };

    records.unshift(newRecord);
    saveSentLog(records);

    return NextResponse.json({ success: true, record: newRecord, count: records.length });
  } catch (err: any) {
    console.error("Exception in /api/outreach/sent:", err);
    return NextResponse.json({ error: err.message || "Failed to update sent log" }, { status: 500 });
  }
}
