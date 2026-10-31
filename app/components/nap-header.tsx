import Link from "next/link";

export default function NapHeader({ showWaitlist = true }: { showWaitlist?: boolean }) {
  return (
    <header className="nap-header" id="top">
      <Link href="/" className="nap-wordmark" aria-label="Nap home"><span className="nap-wordmark-mark" aria-hidden="true" /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs nap-overview-link" href="/#why-nap">Why Nap</Link>
        <Link className="nap-docs" href="/blogs">Guides</Link>
        {showWaitlist && <Link className="nap-nav-waitlist" href="/waitlist">Join the waitlist</Link>}
      </nav>
    </header>
  );
}
