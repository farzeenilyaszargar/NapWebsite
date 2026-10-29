import Link from "next/link";
import NapLogo from "./nap-logo";

export default function NapHeader({ showWaitlist = true }: { showWaitlist?: boolean }) {
  return (
    <header className="nap-header">
      <Link href="/" className="nap-logo" aria-label="Nap home"><NapLogo eager /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs" href="/blogs">Blog</Link>
        {showWaitlist && <Link className="nap-nav-waitlist" href="/waitlist">Download</Link>}
      </nav>
    </header>
  );
}
