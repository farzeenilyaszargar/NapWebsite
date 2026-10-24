"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim().replace(/\s+/g, " ");
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    if (name.length < 2 || name.length > 80) {
      setError("Give us a name between 2 and 80 characters. Nicknames count.");
      return;
    }
    setError("");
    setStatus("pending");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "That didn’t stick. Please try again.");
      setStatus("success");
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : "That took too long. Please give it another go.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <section className="wishlist-success" role="status">
        <p className="margin-note">excellent taste, by the way.</p>
        <h1 ref={(node) => { node?.focus(); }} tabIndex={-1}>you&apos;re on<br />the list.</h1>
        <p>Your spot is saved. We&apos;ll email you when Nap is ready to try.</p>
        <p>Until then, go make something weird and wonderful.</p>
        <p><Link href="/">← back to the very fancy homepage</Link></p>
      </section>
    );
  }

  return (
    <section aria-labelledby="wishlist-title">
      <p className="margin-note">one more list. this one&apos;s worth it.</p>
      <h1 id="wishlist-title">big ideas.<br />tiny form.</h1>
      <p>Join the Nap wishlist. We&apos;re making a native Mac home for your coding agents, and we&apos;d love you to try it when it&apos;s ready.</p>
      <form onSubmit={handleSubmit} className="plain-form" aria-busy={status === "pending"}>
        <label htmlFor="wishlist-name">Your name <small>(human, preferably)</small></label>
        <input id="wishlist-name" name="name" autoComplete="name" placeholder="Your name" minLength={2} maxLength={80} required disabled={status === "pending"} aria-describedby={error ? "wishlist-error" : undefined} />
        <label htmlFor="wishlist-email">Your email <small>(somewhere we can say hello)</small></label>
        <input id="wishlist-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required disabled={status === "pending"} aria-describedby={error ? "wishlist-error" : undefined} />
        {error ? <p id="wishlist-error" role="alert" className="form-error">{error}</p> : null}
        <button type="submit" disabled={status === "pending"}>{status === "pending" ? "saving your spot…" : "put me on the wishlist →"}</button>
        <p><small>We&apos;ll use your email for Nap access updates. No account, no payment, no interpretive dance required.</small></p>
      </form>
      <p className="wishlist-back"><Link href="/">← actually, let me read that again</Link></p>
    </section>
  );
}
