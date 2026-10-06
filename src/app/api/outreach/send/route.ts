import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "node:fs";
import path from "node:path";

const LOG_FILE_PATH = path.resolve(process.cwd(), "leads", "sent_outreach_log.json");

function getSentLog() {
  try {
    if (!fs.existsSync(LOG_FILE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(LOG_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function appendToSentLog(record: Record<string, unknown>) {
  try {
    const list = getSentLog();
    list.unshift(record);
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to append to sent log:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body, company, previewUrl } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields (to, subject, body)" }, { status: 400 });
    }

    // 1. Conflict Prevention: Check if already sent
    const sentList = getSentLog();
    const existing = sentList.find(
      (item: { company?: string; email?: string }) =>
        (company && item.company?.toLowerCase() === company.toLowerCase()) ||
        (to && item.email?.toLowerCase() === to.toLowerCase())
    );

    if (existing) {
      return NextResponse.json(
        {
          error: `Duplicate send blocked: ${company || to} was already contacted on ${new Date(existing.sentAt).toLocaleDateString()}.`,
          alreadySent: true,
          existing,
        },
        { status: 409 }
      );
    }

    // 2. Resend API Key check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.OUTREACH_FROM_EMAIL || "Speedcraft Studio <onboarding@resend.dev>";

    // 3. Dispatch Email
    const sendRes = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      text: body,
    });

    if (sendRes.error) {
      return NextResponse.json(
        {
          error: sendRes.error.message,
          hint: sendRes.error.message.includes("testing emails")
            ? "Resend requires a verified custom domain at resend.com/domains before sending to external companies. You can use the 1-Click Gmail button to send directly from your personal inbox!"
            : undefined,
        },
        { status: 400 }
      );
    }

    // 4. Save to Sent Log
    const newRecord = {
      company: company || "Unknown Business",
      email: to,
      sentAt: new Date().toISOString(),
      method: "resend",
      id: sendRes.data?.id,
      previewUrl,
      status: "sent",
    };
    appendToSentLog(newRecord);

    return NextResponse.json({ success: true, id: sendRes.data?.id, record: newRecord });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to dispatch email";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
