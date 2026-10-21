import NapHeader from "../components/nap-header";
import DeferredLiquidField from "../components/deferred-liquid-field";
import StructuredData from "../components/structured-data";
import { pageMetadata, pages, waitlistSchema } from "../lib/seo";
import WaitlistForm from "./waitlist-form";
import "../contrast.css";
import "./waitlist.css";

export const metadata = pageMetadata(pages.waitlist);

export default function WaitlistPage() {
  return (
    <main className="contrast-page nap-waitlist-page">
      <StructuredData data={waitlistSchema()} />
      <NapHeader />
      <section className="nap-waitlist-hero" aria-labelledby="waitlist-title">
        <div className="nap-waitlist-copy">
          <p className="nap-eyebrow">YOUR NEXT GOOD IDEA STARTS HERE.</p>
          <h1 id="waitlist-title"><span>MORE ROOM.</span><span>TO BUILD.</span></h1>
          <p className="nap-waitlist-description">Your agents. Your ideas. One place to bring them to life. Join the Nap waitlist and hear when there’s more to share.</p>
        </div>
        <div className="nap-waitlist-panel">
          <span className="nap-blog-label">THE NAP WAITLIST</span>
          <h2>Make room for<br />what comes next.</h2>
          <WaitlistForm />
        </div>
      </section>
      <footer className="nap-waitlist-footer">
        <span>© 2026 NAP</span>
        <a href="https://x.com/napverse" aria-label="Nap on X">X</a>
      </footer>
      <DeferredLiquidField />
    </main>
  );
}
