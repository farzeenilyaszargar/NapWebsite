const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const failure = (error: string, status: number) => Response.json({ error }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return failure("Invalid request origin.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return failure("Send a JSON request.", 415);
  if (Number(request.headers.get("content-length")) > 4096) return failure("Request is too large.", 413);

  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 4096) return failure("Request is too large.", 413);
    payload = JSON.parse(body);
  } catch {
    return failure("Invalid request.", 400);
  }
  if (typeof payload !== "object" || payload === null) return failure("Please enter your name and email.", 400);
  const { name, email, website } = payload as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || (website !== undefined && website !== "")) return failure("Please enter your name and email.", 400);
  const cleanName = name.trim().replace(/\s+/g, " ");
  const cleanEmail = email.trim().toLowerCase();
  if (cleanName.length < 2 || cleanName.length > 80) return failure("Your name should be between 2 and 80 characters.", 400);
  if (cleanEmail.length > 254 || !EMAIL_PATTERN.test(cleanEmail)) return failure("Please enter a valid email address.", 400);

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return failure("Signups are temporarily unavailable. Please try again later.", 503);
  try {
    const response = await fetch(`${url}/rest/v1/wishlist_saves?on_conflict=email`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify({ name: cleanName, email: cleanEmail, source: "waitlist", user_agent: request.headers.get("user-agent")?.slice(0, 512) ?? null }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return failure("Couldn’t save your spot. Please try again in a moment.", 503);
    return Response.json({ message: "You’re on the list." });
  } catch {
    return failure("Couldn’t connect. Please try again in a moment.", 503);
  }
}
