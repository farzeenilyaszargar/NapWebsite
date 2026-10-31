import Link from "next/link";
import NapLogo from "./nap-logo";
import NapWaitlistCta from "./nap-waitlist-cta";

export default function NapHeader({ showWaitlist = true }: { showWaitlist?: boolean }) {
  return (
    <header className="nap-header">
      <div className="nap-header-inner">
        <Link href="/" className="nap-logo" aria-label="Nap home"><NapLogo /><span aria-hidden="true">nap</span></Link>
        <nav className="nap-nav" aria-label="Main navigation">
          <Link className="nap-docs" href="/#features">Features</Link>
          <Link className="nap-docs" href="/#agents">Agents</Link>
          <Link className="nap-docs" href="/blogs">Guides</Link>
          {showWaitlist && <NapWaitlistCta size="small" label="Download" />}
        </nav>
      </div>
    </header>
  );
}
