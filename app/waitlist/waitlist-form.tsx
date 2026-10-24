"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status !== "success") return;
    const timeout = window.setTimeout(() => router.replace("/"), 5000);
    return () => window.clearTimeout(timeout);
  }, [status, router]);

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
        <h1 ref={(node) => { node?.focus(); }} tabIndex={-1}>you&apos;re on the list.</h1>
        <p>Your spot is saved. We&apos;ll email you when Nap is ready to try.</p>
        <p><small>Back to the homepage in 5 seconds.</small></p>
      </section>
    );
  }

  return (
    <section aria-labelledby="wishlist-title">
      <h1 id="wishlist-title">join the wishlist.</h1>
      <p>A home for your coding agents. A spot for you. Leave your name and email; we&apos;ll let you know when Nap is ready.</p>
      <form onSubmit={handleSubmit} className="plain-form" aria-busy={status === "pending"}>
        <input id="wishlist-name" aria-label="Your name" name="name" autoComplete="name" placeholder="Your name" minLength={2} maxLength={80} required disabled={status === "pending"} aria-describedby={error ? "wishlist-error" : undefined} />
        <input id="wishlist-email" aria-label="Your email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required disabled={status === "pending"} aria-describedby={error ? "wishlist-error" : undefined} />
        {error ? <p id="wishlist-error" role="alert" className="form-error">{error}</p> : null}
        <button type="submit" disabled={status === "pending"}>{status === "pending" ? "saving your spot…" : "put me on the wishlist"}</button>
        <p><small>Just Nap access updates. No account. No sales calls.</small></p>
      </form>
    </section>
  );
}
