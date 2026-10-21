import Link from "next/link";

export default function NapHeader() {
  return (
    <header className="nap-header">
      <Link href="/" className="nap-wordmark" aria-label="Nap home">nap<span className="nap-wordmark-mark" aria-hidden="true" /></Link>
      <nav className="nap-nav" aria-label="Main navigation">
        <Link className="nap-docs" href="/blogs">BLOGS</Link>
      </nav>
    </header>
  );
}
