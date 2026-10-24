import type { Metadata } from "next";
import Link from "next/link";
import "./reveal.css";

export const metadata: Metadata = {
  title: { absolute: "Nap | Your coding agents. One interface." },
  description: "Claude Code, Codex, Cursor, and OpenCode in one native Mac app. Less switching, more building. Join the Nap wishlist.",
  alternates: { canonical: "/" },
  openGraph: { title: "Nap | Your coding agents. One interface." },
  twitter: { title: "Nap | Your coding agents. One interface." },
};

export default function Home() {
  return (
    <main className="nap-reveal compact-home">
      <div className="compact-page">
        <h1>nap.</h1>
        <p>good software doesn&apos;t need all that.</p>
        <p>
          All your coding agents. One interface. A native Mac app for Claude Code,
          Codex, Cursor, and OpenCode.
        </p>
        <ul>
          <li>Bring your project. Pick your agent.</li>
          <li>Keep conversations and code changes together.</li>
          <li>Build things. Not a collection of open windows.</li>
        </ul>
        <p><Link href="/wishlist">join the wishlist ↗</Link></p>
        <p><small>Still cooking. We&apos;ll email you when it&apos;s ready.</small></p>
      </div>
    </main>
  );
}
