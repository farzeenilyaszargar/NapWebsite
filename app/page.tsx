import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Download Nap for macOS. Claude Code, Codex, Cursor, and OpenCode in one native interface. Fewer terminal tabs. More actual work.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <h1>nap.</h1>
      <p>
        Claude Code, Codex, Cursor, and OpenCode in one Mac app.
        Run agents in parallel, hand off tasks, and keep threads talking.
      </p>
      <p>We spent all our time on the app. As you can see.</p>
      <p><a className="download" href="https://pub-ab845f53d3fe41cca7cc63eb753149cd.r2.dev/releases/v0.0.4-notnap.3/NotNap-macos.dmg">download for macOS</a></p>
    </main>
  );
}
