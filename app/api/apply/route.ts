const failure = (error: string, status: number) => Response.json({ error }, { status });
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const optionalFields = ["portfolioUrl", "githubUrl", "linkedinUrl", "degree", "graduationYear"] as const;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return failure("Invalid request origin.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return failure("Send a JSON request.", 415);
  if (Number(request.headers.get("content-length")) > 16384) return failure("Request is too large.", 413);

  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 16384) return failure("Request is too large.", 413);
    payload = JSON.parse(body);
  } catch {
    return failure("Invalid request.", 400);
  }
  if (typeof payload !== "object" || payload === null) return failure("Please complete the required fields.", 400);
  const data = payload as Record<string, unknown>;
  if (["fullName", "email", "roleWanted", "aboutSelf"].some((field) => typeof data[field] !== "string")) return failure("Please complete the required fields.", 400);
  if (optionalFields.some((field) => data[field] !== undefined && typeof data[field] !== "string")) return failure("Invalid application details.", 400);
  if (data.website !== undefined && data.website !== "") return failure("Invalid request.", 400);

  const text = (field: string) => typeof data[field] === "string" ? data[field].trim() : "";
  const fullName = text("fullName").replace(/\s+/g, " ");
  const email = text("email").toLowerCase();
  const roleWanted = text("roleWanted").replace(/\s+/g, " ");
  const aboutSelf = text("aboutSelf");
  if (fullName.length < 2 || fullName.length > 100) return failure("Please enter your full name (2–100 characters).", 400);
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return failure("Please enter a valid email address.", 400);
  if (roleWanted.length < 2 || roleWanted.length > 100) return failure("Tell us what you’d like to work on (2–100 characters).", 400);
  if (aboutSelf.length < 40 || aboutSelf.length > 1500) return failure("Tell us about yourself in 40–1,500 characters.", 400);
  if (text("degree").length > 150) return failure("Degree should be 150 characters or fewer.", 400);
  if (text("graduationYear") && !/^\d{4}$/.test(text("graduationYear"))) return failure("Graduation year should be four digits.", 400);
  for (const field of ["portfolioUrl", "githubUrl", "linkedinUrl"]) {
    const value = text(field);
    if (!value) continue;
    try {
      const url = new URL(value);
      if (value.length > 500 || !["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error();
    } catch {
      return failure("Please use valid links starting with https:// or http://.", 400);
    }
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return failure("Applications are temporarily unavailable. Please try again later.", 503);
  try {
    const response = await fetch(`${url}/rest/v1/internship_applications`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ full_name: fullName, email, role_wanted: roleWanted, about_self: aboutSelf, degree: text("degree") || null, graduation_year: text("graduationYear"), portfolio_url: text("portfolioUrl") || null, github_url: text("githubUrl") || null, linkedin_url: text("linkedinUrl") || null, source: "team_application", user_agent: request.headers.get("user-agent")?.slice(0, 512) ?? null }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (response.status === 409) return failure("An application with this email already exists. Your original application has been kept.", 409);
    if (!response.ok) return failure("Couldn’t save your application. Please try again in a moment.", 503);
    return Response.json({ message: "Application submitted." });
  } catch {
    return failure("Couldn’t connect. Please try again in a moment.", 503);
  }
}
