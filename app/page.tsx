import type { Metadata } from "next";
import Link from "next/link";
import PlainShell from "./components/plain-shell";

export const metadata: Metadata = {
  title: { absolute: "Nap | Good software. Less ceremony." },
  description: "Your coding agents, together in one native Mac app. Meet Nap and join the wishlist for early access.",
  alternates: { canonical: "/" },
  openGraph: { title: "Nap | Good software. Less ceremony." },
  twitter: { title: "Nap | Good software. Less ceremony." },
};

export default function Home() {
  return (
    <PlainShell>
      <header className="plain-hero">
        <p className="margin-note">a small website for a big idea.</p>
        <h1>your agents.<br />one happy place.</h1>
        <p className="lede">Good software doesn&apos;t need all that.</p>
        <p>Nap brings Claude Code, Codex, Cursor, and OpenCode into one native Mac app. Your projects, conversations, and code changes finally have somewhere to hang out.</p>
        <p className="cta-line"><Link className="big-link" href="/wishlist">join the wishlist →</Link></p>
        <p><small>We&apos;re still cooking. Leave your email; we&apos;ll tell you when it&apos;s ready.</small></p>
      </header>

      <section aria-labelledby="problem-title">
        <h2 id="problem-title">less tab archaeology.</h2>
        <p>You opened one window to fix one thing. Somehow you now have seven windows and no idea where the conversation went. Familiar?</p>
        <p>Nap gives your coding agents a shared home, so you can spend more time making things and less time looking for the thing.</p>
        <ul className="feature-list">
          <li><strong>Bring your project.</strong> Start with the code you already have. No ceremonial new folder required.</li>
          <li><strong>Pick your agent.</strong> Work with the coding agent you want, through one familiar interface.</li>
          <li><strong>Make something happen.</strong> Ask, review the changes, and keep going. The conversation stays with the project.</li>
        </ul>
      </section>

      <aside className="plain-note"><strong>A quick clarification:</strong> Nap is a coding workspace. It will not fix your sleep schedule. We checked.</aside>

      <section aria-labelledby="questions-title">
        <h2 id="questions-title">fair questions.</h2>
        <details><summary>Is this another AI model?</summary><p>No. Nap is an interface for working with coding agents. The agents do the coding-agent things; Nap brings the work together.</p></details>
        <details><summary>Can I download it yet?</summary><p>Not just yet. Join the wishlist and we&apos;ll email you when there&apos;s a build to try. No release-date guessing games.</p></details>
        <details><summary>What does it run on?</summary><p>We&apos;re starting with Mac. That&apos;s the platform we&apos;re building for right now.</p></details>
        <details><summary>Why is the website like this?</summary><p>We put the gradients in the app budget. Also, links still work when they&apos;re blue.</p></details>
      </section>

      <section className="plain-outro" aria-labelledby="outro-title">
        <h2 id="outro-title">less switching. more shipping.</h2>
        <p>Make room for the thing you keep meaning to build.</p>
        <Link className="big-link" href="/wishlist">save me a spot →</Link>
        <p><small>No demo calls. No sales deck. Just a heads-up when Nap is ready.</small></p>
      </section>
    </PlainShell>
  );
}
