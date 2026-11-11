import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NapMaze from "./nap-maze";

export const metadata: Metadata = {
  description: "Download Nap for macOS. Claude Code, Codex, Cursor, and OpenCode in one native interface. Fewer terminal tabs. More actual work.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="site">
      <header className="site-header">
        <Link className="brand" href="/" prefetch={false} aria-label="Nap home"><Image unoptimized src="/nap-ghost.webp" alt="" width={22} height={25} /></Link>
        <nav aria-label="Main navigation"><a className="blogs-link" href="https://www.nap.cx/blogs">Blogs <ArrowUpRight size={13} aria-hidden="true" /></a></nav>
      </header>
      <main className="landing">
        <NapMaze />
        <section className="hero-copy" aria-labelledby="nap-title">
          <h1 id="nap-title">Your agents. All together.</h1>
          <p>Claude Code, Codex, Cursor, and OpenCode in one native Mac app.
            Run them side by side, hand off the work, and take the credit.</p>
          <a className="download" href="https://pub-ab845f53d3fe41cca7cc63eb753149cd.r2.dev/releases/v0.0.4-notnap.3/NotNap-macos.dmg">
            <span>Download for macOS</span><Image unoptimized src="/apple.svg" width={14} height={17} alt="" />
          </a>
        </section>
      </main>
    </div>
  );
}
