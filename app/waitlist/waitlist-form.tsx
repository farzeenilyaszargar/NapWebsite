"use client";

import { useState, type FormEvent } from "react";

type Submission = { status: "idle" | "pending" | "success" | "error"; message: string };

export default function WaitlistForm() {
  const [submission, setSubmission] = useState<Submission>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submission.status === "pending") return;
    const form = new FormData(event.currentTarget);
    setSubmission({ status: "pending", message: "" });
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), website: form.get("website") }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Couldn’t save your spot. Please try again.");
      setSubmission({ status: "success", message: "We’ll be in touch when there’s more to share." });
    } catch (error) {
      setSubmission({ status: "error", message: error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "Couldn’t connect. Please try again in a moment." });
    }
  }

  return (
    <div className="nap-waitlist-form-wrap">
      {submission.status === "success" ? (
        <div className="nap-waitlist-success" role="status" tabIndex={-1}>
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="currentColor" /><path d="m10 16 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h3>You’re on the list.</h3>
          <p>{submission.message}</p>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={submission.status === "pending"}>
          <div className="nap-waitlist-field">
            <label htmlFor="waitlist-name">YOUR NAME</label>
            <input id="waitlist-name" name="name" autoComplete="given-name" placeholder="Alex" required minLength={2} maxLength={80} disabled={submission.status === "pending"} />
          </div>
          <div className="nap-waitlist-field">
            <label htmlFor="waitlist-email">EMAIL ADDRESS</label>
            <input id="waitlist-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" required maxLength={254} disabled={submission.status === "pending"} aria-describedby="waitlist-note waitlist-status" />
          </div>
          <div className="nap-waitlist-trap" aria-hidden="true">
            <label htmlFor="waitlist-website">Leave this empty</label>
            <input id="waitlist-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button type="submit" disabled={submission.status === "pending"}>{submission.status === "pending" ? "Joining…" : "Join the waitlist"}</button>
          <p id="waitlist-note" className="nap-waitlist-note">Sign up to receive emails about Nap’s availability and product updates.</p>
          <p id="waitlist-status" className="nap-waitlist-status" role="alert">{submission.status === "error" ? submission.message : ""}</p>
        </form>
      )}
    </div>
  );
}
