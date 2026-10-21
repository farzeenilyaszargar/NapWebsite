import NapHeader from "../components/nap-header";
import DeferredLiquidField from "../components/deferred-liquid-field";
import StructuredData from "../components/structured-data";
import { applySchema, pageMetadata, pages } from "../lib/seo";
import ApplyForm from "./apply-form";
import "../contrast.css";
import "./apply.css";

export const metadata = pageMetadata(pages.apply);

export default function ApplyPage() {
  return (
    <main className="contrast-page nap-apply-page">
      <StructuredData data={applySchema()} />
      <NapHeader />
      <section className="nap-apply-content" aria-labelledby="apply-title">
        <div className="nap-apply-intro">
          <p className="nap-eyebrow">GOOD IDEAS NEED GOOD PEOPLE.</p>
          <h1 id="apply-title"><span>BUILD</span><span>WITH US.</span></h1>
          <p>Help shape a better way to build software. Tell us about yourself, the work you care about, and what you’d like to bring to Nap.</p>
        </div>
        <ApplyForm />
      </section>
      <footer className="nap-apply-footer">
        <span>© 2026 NAP</span>
        <a href="https://x.com/napverse" aria-label="Nap on X">X</a>
      </footer>
      <DeferredLiquidField />
    </main>
  );
}
