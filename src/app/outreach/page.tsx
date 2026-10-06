import fs from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import { OutreachDashboardClient, SentRecord } from "./OutreachDashboardClient";

export const metadata = {
  title: "Outreach Command Center | Speedcraft Studio",
  description: "Live trade business discovery, performance auditing, and 1-click prototype outreach.",
};

function getInitialSentRecords(): SentRecord[] {
  try {
    const logPath = path.resolve(process.cwd(), "leads", "sent_outreach_log.json");
    if (fs.existsSync(logPath)) {
      const raw = fs.readFileSync(logPath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read initial sent log on server:", err);
  }
  return [];
}

export default function OutreachPage() {
  const initialSentRecords = getInitialSentRecords();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center font-mono text-xs text-zinc-500">
          Loading Live Outreach Command Center...
        </div>
      }
    >
      <OutreachDashboardClient initialSentRecords={initialSentRecords} />
    </Suspense>
  );
}
