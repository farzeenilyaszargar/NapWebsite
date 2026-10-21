import NapHeader from "../components/nap-header";
import NapFooter from "../components/nap-footer";
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
      <section className="nap-waitlist-body" aria-labelledby="waitlist-title">
        <div className="nap-waitlist-panel">
          <div className="nap-waitlist-intro">
            <h1 id="waitlist-title">Join the Waitlist</h1>
            <p>Your next good idea starts here.</p>
          </div>
          <WaitlistForm />
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
