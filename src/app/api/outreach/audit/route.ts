import { NextRequest, NextResponse } from "next/server";
import { auditWebsiteAction } from "@/app/actions/audit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body.website || body.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json({ error: "A valid website URL is required" }, { status: 400 });
    }

    const industry = (body.industry || body.niche || "Other").trim();

    const result = await auditWebsiteAction({
      url: rawUrl,
      industry,
      company: body.company,
      city: body.city,
      country: body.country,
      phone: body.phone,
      email: body.email,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to audit website" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      lead: result.lead,
      archetype: result.archetype,
      previewUrl: result.previewUrl,
      hasAdTags: result.hasAdTags,
      hasMarketingPixels: result.hasAdTags,
      message: result.message,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to audit lead";
    console.error("Error in /api/outreach/audit:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
