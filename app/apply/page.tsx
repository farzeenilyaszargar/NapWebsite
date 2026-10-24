import type { Metadata } from "next";
import Link from "next/link";
import PlainShell from "../components/plain-shell";

export const metadata: Metadata = {
  title: "Apply",
  description: "Applications to join the Nap team are closed at the moment.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <PlainShell>
      <h1>not hiring. for now.</h1>
      <p>Applications are closed at the moment. Thanks for wanting to help build Nap.</p>
      <p><small>Small team. Full plates. We&apos;ll share future openings when we have them.</small></p>
      <p><Link className="back-link" href="/">← back to nap</Link></p>
    </PlainShell>
  );
}
