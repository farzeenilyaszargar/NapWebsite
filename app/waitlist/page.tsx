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
      <section className="nap-waitlist-panel" aria-labelledby="waitlist-title">
        <h1 id="waitlist-title" className="sr-only">Join the Nap Waitlist</h1>
        <WaitlistForm />
      </section>
    </main>
  );
}
