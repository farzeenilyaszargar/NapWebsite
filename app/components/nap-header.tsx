import Link from "next/link";

export default function NapHeader({ showWaitlist = true }: { showWaitlist?: boolean }) {
  return (
    <header className="nap-header">
      <Link href="/" className="nap-wordmark" aria-label="Nap home"><span className="nap-wordmark-mark" aria-hidden="true" /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs" href="/blogs">Blogs</Link>
        {showWaitlist && <Link className="nap-nav-waitlist" href="/waitlist">Join the Waitlist</Link>}
      </nav>
    </header>
  );
}
