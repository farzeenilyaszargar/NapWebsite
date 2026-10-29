import NapFooter from "../components/nap-footer";
import NapHeader from "../components/nap-header";
import StructuredData from "../components/structured-data";
import { applySchema, pageMetadata, pages } from "../lib/seo";
import "../contrast.css";
import "./apply.css";

export const metadata = pageMetadata(pages.apply);

export default function ApplyPage() {
  return (
    <main className="contrast-page nap-apply-page">
      <StructuredData data={applySchema()} />
      <NapHeader />
      <section className="nap-apply-closed" aria-labelledby="apply-title">
        <h1 id="apply-title"><span className="nap-dim-text">Applications</span> are closed at the moment</h1>
      </section>
      <NapFooter />
    </main>
  );
}
