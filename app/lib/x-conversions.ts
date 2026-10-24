import "server-only";
import { createHash } from "node:crypto";

type XConversion = {
  eventId: string;
  conversionId: string;
  conversionTime: string;
  email: string;
  eventSourceUrl?: string;
};

// Keep this helper on the server. Never include the token or raw email in logs.
export async function sendXConversion(event: XConversion): Promise<boolean> {
  const token = process.env.X_PIXEL_TOKEN;
  if (!token || !/^tw-rhsuk-[a-zA-Z0-9]+$/.test(event.eventId)) return false;
  const email = event.email.trim().toLowerCase();
  if (!email || !event.conversionId) return false;
  const hashedEmail = createHash("sha256").update(email).digest("hex");
  try {
    const response = await fetch("https://ads-api.x.com/12/measurement/conversions/rhsuk", {
      method: "POST",
      headers: { "X-Pixel-Token": token, "Content-Type": "application/json" },
      body: JSON.stringify({ conversions: [{
        conversion_time: event.conversionTime,
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        conversion_id: event.conversionId,
        identifiers: [{ hashed_email: hashedEmail }],
      }] }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.warn("X conversion request failed", { status: response.status });
    return response.ok;
  } catch {
    // Analytics must not undo or delay a successful signup.
    console.warn("X conversion request could not be completed");
    return false;
  }
}
