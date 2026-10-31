"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { captureWaitlistSignup } from "../lib/analytics";

type Submission = { status: "idle" | "pending" | "success" | "error"; message: string };

export default function WaitlistForm() {
  const [submission, setSubmission] = useState<Submission>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submission.status === "pending" || submission.status === "success") return;
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
      void captureWaitlistSignup();
      setSubmission({ status: "success", message: "" });
    } catch (error) {
      setSubmission({ status: "error", message: error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "Couldn’t connect. Please try again in a moment." });
    }
  }

  const complete = submission.status === "success";
  const busy = submission.status === "pending";

  return (
    <section className={`nap-waitlist-body${complete ? " nap-waitlist-body-complete" : ""}`} aria-labelledby="waitlist-title">
      {complete ? (
        <div className="nap-waitlist-success" role="status">
          <div className="nap-success-burst" aria-hidden="true">
            {Array.from({ length: 10 }, (_, index) => <span key={index} />)}
          </div>
          <h1 id="waitlist-title" tabIndex={-1} ref={(node) => node?.focus({ preventScroll: true })}>You&apos;re on the <span className="nap-halftone-text">list.</span></h1>
          <p>Your details are saved. We&apos;ll let you know when Nap is available for your Mac.</p>
          <Link href="/">Back to Nap <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      ) : (
        <div className="nap-waitlist-panel">
          <div className="nap-waitlist-intro">
            <h1 id="waitlist-title">Get early access<br /><span className="nap-halftone-text">to Nap.</span></h1>
            <p>Get notified when Nap is available for macOS.</p>
          </div>
          <div className="nap-waitlist-form-wrap">
            <form onSubmit={submit} autoComplete="on" aria-label="Join the Nap Waitlist" aria-busy={busy}>
              <div className="nap-waitlist-field">
                <label htmlFor="waitlist-name">Name</label>
                <input id="waitlist-name" name="name" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={80} disabled={busy} />
              </div>
              <div className="nap-waitlist-field">
                <label htmlFor="waitlist-email">Email</label>
                <input id="waitlist-email" name="email" type="email" autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck={false} placeholder="you@example.com" required maxLength={254} disabled={busy} aria-describedby="waitlist-status" />
              </div>
              <div className="nap-waitlist-trap" aria-hidden="true">
                <label htmlFor="waitlist-website">Leave this empty</label>
                <input id="waitlist-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <button type="submit" disabled={busy}>{submission.status === "pending" ? "Joining…" : "Join the Mac waitlist"}<ArrowRight size={16} aria-hidden="true" /></button>
              <p id="waitlist-status" className="nap-waitlist-status" role="alert" hidden={submission.status !== "error"}>{submission.status === "error" ? submission.message : ""}</p>
            </form>
            <p className="nap-waitlist-note">Just your name and email. No payment details.</p>
          </div>
        </div>
      )}
    </section>
  );
}
