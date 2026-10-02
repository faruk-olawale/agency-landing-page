import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, website, selectedTier, honeypot } = body;

    // 1. Bot spam protection (honeypot)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // 2. Basic Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide your name or business name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "farukolawale509@gmail.com";
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    // Optional: Send instant push notification to Discord if configured
    if (discordWebhook && discordWebhook.startsWith("https://discord.com/api/webhooks/")) {
      try {
        await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "New Speedcraft Lead Alert",
                color: 0x10b981, // Emerald green
                fields: [
                  { name: "Client Name", value: name, inline: true },
                  { name: "Email", value: email, inline: true },
                  { name: "Website", value: website || "None provided", inline: false },
                  { name: "Requested Plan", value: selectedTier || "Standard Mockup", inline: true },
                ],
                footer: { text: "Speedcraft Lead Dispatch" },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (webhookErr) {
        console.error("Discord webhook dispatch error:", webhookErr);
      }
    }

    // 3. Fallback dev mode if API key is not yet configured
    if (!apiKey || apiKey === "re_your_api_key_here" || apiKey.includes("placeholder")) {
      console.warn(
        "[SPEEDCRAFT STUDIO] RESEND_API_KEY is not configured yet. Lead details captured:",
        { name, email, website, selectedTier }
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Submission captured (dev mode: add RESEND_API_KEY in .env.local to send live emails).",
      });
    }

    const resend = new Resend(apiKey);

    // 4. Send sleek lead notification email
    const { data, error } = await resend.emails.send({
      from: "Speedcraft Studio <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `New Lead: ${name} (${selectedTier || "Mockup Request"})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 40px 20px; margin: 0; }
            .container { max-width: 580px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; }
            .header { padding: 32px 32px 24px; border-bottom: 1px solid #334155; }
            .badge { display: inline-block; font-size: 11px; font-weight: 700; color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3); padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 1px; }
            .title { margin: 16px 0 4px; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }
            .subtitle { font-size: 13px; color: #94a3b8; margin: 0; }
            .content { padding: 32px; }
            .field-box { margin-bottom: 20px; }
            .label { font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; }
            .value { font-size: 16px; color: #ffffff; font-weight: 500; }
            .footer { padding: 24px 32px; background: #0f172a; border-top: 1px solid #334155; font-size: 12px; color: #64748b; text-align: center; }
            .btn { display: inline-block; background: #10b981; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13px; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">● Live Lead Alert</span>
              <h1 class="title">New Mockup Request</h1>
              <p class="subtitle">A prospective client has requested a hand-coded high-speed prototype.</p>
            </div>
            <div class="content">
              <div class="field-box">
                <div class="label">Client Name / Business</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-box">
                <div class="label">Direct Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field-box">
                <div class="label">Current Website URL</div>
                <div class="value">${website ? `<a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank" style="color: #34d399; text-decoration: underline;">${website}</a>` : '<span style="color: #94a3b8;">None provided (New Build)</span>'}</div>
              </div>
              <div class="field-box">
                <div class="label">Selected Package / Tier</div>
                <div class="value" style="color: #34d399; font-weight: bold;">${selectedTier || "Zero-Upfront Monthly ($150/mo)"}</div>
              </div>
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #334155; text-align: center;">
                <a href="mailto:${email}?subject=Your%20Speedcraft%20Mockup%20is%20Underway&body=Hi%20${encodeURIComponent(name)},%0A%0AI%20received%20your%20website%20details%20and%20am%20preparing%20your%20sub-second%20Next.js%20prototype.%0A%0ABest,%0AFaruk" class="btn">
                  Reply to ${name} →
                </a>
              </div>
            </div>
            <div class="footer">
              SPEEDCRAFT // Studio Engine · Automated Lead Dispatch
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error("Contact API exception:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
