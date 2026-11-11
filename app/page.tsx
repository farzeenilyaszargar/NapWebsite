import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Download Nap for macOS. Claude Code, Codex, Cursor, and OpenCode in one native interface. Fewer terminal tabs. More actual work.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <h1>nap.</h1>
      <p>Your agents write the code. You take the credit.</p>
      <p>
        Claude Code, Codex, Cursor, and OpenCode. One native Mac app.
        Because switching between four terminals isn&apos;t a workflow. It&apos;s cardio.
      </p>
      <ul>
        <li>Run agents in parallel. Look suspiciously productive.</li>
        <li>Hand off the work. Keep your last remaining brain cell.</li>
        <li>Let your threads talk. You&apos;ve said enough.</li>
      </ul>
      <p><a className="download" href="https://pub-ab845f53d3fe41cca7cc63eb753149cd.r2.dev/releases/v0.0.4-notnap.3/NotNap-macos.dmg">Download for macOS →</a></p>
      <p><small>No 47-step onboarding. You&apos;ve suffered enough.</small></p>
    </main>
  );
}
