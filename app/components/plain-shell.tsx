import Link from "next/link";
import "../reveal.css";

export default function PlainShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="nap-reveal">
      <div className="plain-page">
        <nav aria-label="Main navigation">
          <Link href="/" className="wordmark" aria-label="Nap home">nap.</Link>
          <Link href="/wishlist">wishlist</Link>
        </nav>
        {children}
        <footer>
          <span>© {new Date().getFullYear()} Nap. Still awake.</span>
          <a href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">say hi on X ↗</a>
        </footer>
      </div>
    </main>
  );
}
