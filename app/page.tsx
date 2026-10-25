import Link from "next/link";
import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";

export const metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <main className="contrast-page nap-home-page">
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <h1 id="nap-title">Your Agents.<br />All Together.</h1>
          <p className="nap-description">A native Mac app for working with your coding agents. Keep your projects, conversations, and code changes together.</p>
      <section className="nap-agents" aria-labelledby="agents-title">
        <h2 id="agents-title" className="nap-section-label">The agents you already work with</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name} data-agent={name}><img src={logo} alt="" width={22} height={22} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
      </section>
          <div className="nap-action"><NapWaitlistCta /></div>
        </div>
      </section>
      <figure className="nap-full-width-product">
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1100px) 92vw, 1040px" />
      </figure>
      <section className="nap-workflow nap-section" aria-label="How Nap works">
        <div className="nap-workflow-steps">
          <article><h2>Start with your project</h2><p>Open your codebase and describe what you want to build, fix, or understand.</p></article>
          <article><h2>Work with your agent</h2><p>Choose your coding agent and keep the conversation connected to your work.</p></article>
          <article><h2>Review and continue</h2><p>See what changed, ask a follow-up, and decide what comes next.</p></article>
        </div>
        <Link href={pages.about.path} className="nap-about-link">About Nap</Link>
      </section>
      <NapFooter />
    </main>
  );
}
