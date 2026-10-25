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
        <h1 id="apply-title">Applications are closed at the moment</h1>
      </section>
    </main>
  );
}
