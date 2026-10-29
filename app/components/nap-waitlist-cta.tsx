import Link from "next/link";

// Downloads open through the waitlist until a public build ships.
export default function NapWaitlistCta({ label = "Download for Mac" }: { label?: string }) {
  return (
    <Link className="nap-download nap-waitlist-cta" href="/waitlist">
      <svg viewBox="0 0 7 7" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="2" width="3" height="3" /><rect y="3" width="7" height="1" /><rect x="1" y="4" width="5" height="1" /><rect x="2" y="5" width="3" height="1" /><rect x="3" y="6" width="1" height="1" /></svg>
      {label}
    </Link>
  );
}
