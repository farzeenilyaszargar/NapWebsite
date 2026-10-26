import Link from "next/link";

export default function NapHeader({ showWaitlist = false }: { showWaitlist?: boolean }) {
  return (
    <header className="nap-header">
      <Link href="/" className="nap-wordmark" aria-label="Nap home">nap<span className="nap-wordmark-mark" aria-hidden="true" /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <a className="nap-docs" href="https://github.com/farzeenilyaszargar/NotNap/releases" target="_blank" rel="noopener noreferrer">Changelogs</a>
        <Link className="nap-docs" href="/blogs">Blogs</Link>
        {showWaitlist && <Link className="nap-nav-waitlist" href="/waitlist">Join the Waitlist</Link>}
      </nav>
    </header>
  );
}
