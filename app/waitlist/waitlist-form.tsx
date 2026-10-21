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
      setSubmission({ status: "success", message: "" });
    } catch (error) {
      setSubmission({ status: "error", message: error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "Couldn’t connect. Please try again in a moment." });
    }
  }

  return (
    <div className="nap-waitlist-form-wrap">
      {submission.status === "success" ? (
        <div className="nap-waitlist-success" role="status" tabIndex={-1}>
          <h2>You’re on the list.</h2>
        </div>
      ) : (
        <form onSubmit={submit} autoComplete="off" aria-label="Join the Nap Waitlist" aria-busy={submission.status === "pending"}>
          <div className="nap-waitlist-field">
            <label htmlFor="waitlist-name">Name</label>
            <input id="waitlist-name" name="name" autoComplete="off" placeholder="Your name" required minLength={2} maxLength={80} disabled={submission.status === "pending"} />
          </div>
          <div className="nap-waitlist-field">
            <label htmlFor="waitlist-email">Email</label>
            <input id="waitlist-email" name="email" type="email" autoComplete="off" inputMode="email" autoCapitalize="none" spellCheck={false} placeholder="you@example.com" required maxLength={254} disabled={submission.status === "pending"} aria-describedby="waitlist-status" />
          </div>
          <div className="nap-waitlist-trap" aria-hidden="true">
            <label htmlFor="waitlist-website">Leave this empty</label>
            <input id="waitlist-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button type="submit" disabled={submission.status === "pending"}>{submission.status === "pending" ? "Joining…" : "Join the Waitlist"}</button>
          <p id="waitlist-status" className="nap-waitlist-status" role="alert" hidden={submission.status !== "error"}>{submission.status === "error" ? submission.message : ""}</p>
        </form>
      )}
    </div>
  );
}
