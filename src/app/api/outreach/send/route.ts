import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body, company } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.OUTREACH_FROM_EMAIL || "Speedcraft Studio <onboarding@resend.dev>";

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

    return NextResponse.json({ success: true, id: sendRes.data?.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to dispatch email" }, { status: 500 });
  }
}
