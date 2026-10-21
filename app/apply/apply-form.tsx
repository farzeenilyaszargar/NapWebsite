"use client";

import { useState, type FormEvent } from "react";

type Submission = { status: "idle" | "pending" | "success" | "error"; message: string };

export default function ApplyForm() {
  const [submission, setSubmission] = useState<Submission>({ status: "idle", message: "" });
  const pending = submission.status === "pending";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    setSubmission({ status: "pending", message: "" });
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Couldn’t send your application. Please try again.");
      setSubmission({ status: "success", message: "" });
    } catch (error) {
      setSubmission({ status: "error", message: error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "Couldn’t connect. Please try again in a moment." });
    }
  }

  return (
    <div className="nap-apply-form">
      {submission.status === "success" ? (
        <div className="nap-apply-success" role="status">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="currentColor" /><path d="m10 16 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <h2>Your application is in.</h2>
          <p>Thanks for sharing a little of yourself with us. If there’s a fit, we’ll reach out at the email you provided.</p>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={pending}>
          <fieldset disabled={pending}>
            <legend>A little about you.</legend>
            <div className="nap-apply-fields">
              <div className="nap-apply-field">
                <label htmlFor="apply-name">FULL NAME</label>
                <input id="apply-name" name="fullName" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={100} />
              </div>
              <div className="nap-apply-field">
                <label htmlFor="apply-email">EMAIL ADDRESS</label>
                <input id="apply-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
              </div>
              <div className="nap-apply-field nap-apply-field-wide">
                <label htmlFor="apply-role">WHAT WOULD YOU LIKE TO WORK ON?</label>
                <input id="apply-role" name="roleWanted" placeholder="Engineering, design, video, or something else" required minLength={2} maxLength={100} />
              </div>
              <div className="nap-apply-field nap-apply-field-wide">
                <label htmlFor="apply-about">TELL US ABOUT YOURSELF</label>
                <textarea id="apply-about" name="aboutSelf" placeholder="What have you built, what excites you, and why Nap?" required minLength={40} maxLength={1500} rows={5} aria-describedby="apply-about-hint" />
                <p id="apply-about-hint" className="nap-apply-hint">A few thoughtful sentences. 40–1,500 characters.</p>
              </div>
            </div>
          </fieldset>
          <fieldset disabled={pending}>
            <legend>Let your work speak.</legend>
            <div className="nap-apply-fields">
              <div className="nap-apply-field nap-apply-field-wide">
                <label htmlFor="apply-portfolio">PORTFOLIO OR WEBSITE <span>· OPTIONAL</span></label>
                <input id="apply-portfolio" name="portfolioUrl" type="url" placeholder="https://your-work.com" maxLength={500} />
              </div>
              <div className="nap-apply-field">
                <label htmlFor="apply-github">GITHUB <span>· OPTIONAL</span></label>
                <input id="apply-github" name="githubUrl" type="url" placeholder="https://github.com/you" maxLength={500} />
              </div>
              <div className="nap-apply-field">
                <label htmlFor="apply-linkedin">LINKEDIN <span>· OPTIONAL</span></label>
                <input id="apply-linkedin" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/you" maxLength={500} />
              </div>
              <div className="nap-apply-field">
                <label htmlFor="apply-degree">DEGREE <span>· OPTIONAL</span></label>
                <input id="apply-degree" name="degree" placeholder="If you’re studying" maxLength={150} />
              </div>
              <div className="nap-apply-field">
                <label htmlFor="apply-year">GRADUATION YEAR <span>· OPTIONAL</span></label>
                <input id="apply-year" name="graduationYear" inputMode="numeric" pattern="[0-9]{4}" placeholder="2027" maxLength={4} />
              </div>
            </div>
          </fieldset>
          <div className="nap-apply-trap" aria-hidden="true">
            <label htmlFor="apply-website">Leave this empty</label>
            <input id="apply-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button className="nap-apply-submit" type="submit" disabled={pending}>{pending ? "Sending…" : "Send application"}</button>
          <p className="nap-apply-hint">We’ll use these details to review your application and contact you about it.</p>
          <p className="nap-apply-status" role="alert">{submission.status === "error" ? submission.message : ""}</p>
        </form>
      )}
    </div>
  );
}
