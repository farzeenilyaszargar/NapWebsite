import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <main className={`contrast-page nap-home-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <h1 id="nap-title">Your Agents. <span>All Together.</span></h1>
          <div className={styles.heroBottom}>
            <div className="nap-hero-details">
              <p className="nap-description">A native Mac app for working with your coding agents. Keep your projects, conversations, and code changes together.</p>
              <div className="nap-action"><NapWaitlistCta /></div>
            </div>
            <div className={styles.signature} aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
        </div>
      </section>
      <div className={styles.stage}>
        <div className={styles.stageLabel}><span>A little less friction</span><span>Made for Mac</span></div>
      <figure className="nap-full-width-product">
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 700px) 144vw, (max-width: 1440px) 84vw, 1224px" />
      </figure>
      </div>
      <section className="nap-agents nap-section" aria-labelledby="agents-title">
        <h2 id="agents-title" className="nap-section-label">The agents you already work with</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name} data-agent={name}><img src={logo} alt="" width={22} height={22} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
      </section>
      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.workflowHeading}>
          <h2 id="workflow-title">Less setup.<br />More getting somewhere.</h2>
          <p>From the first thought to the next change. A calmer place to work with your agents.</p>
        </div>
        <div className={styles.steps}>
          <article>
            <svg className={styles.glyph} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 16V10h13l5 6h16v24H7Z" /><path d="M7 23h34M15 31h10" /></svg>
            <h3>Bring your project.</h3><p>Open your codebase and describe what you want to build, fix, or understand.</p>
          </article>
          <article>
            <svg className={styles.glyph} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="12" width="22" height="29" rx="11" /><rect x="15" y="8" width="22" height="29" rx="11" /><rect x="25" y="4" width="18" height="29" rx="9" /></svg>
            <h3>Choose your agent.</h3><p>Work with the coding agent you know, in one familiar interface built around your project.</p>
          </article>
          <article>
            <svg className={styles.glyph} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="6" y="7" width="36" height="34" rx="3" /><path d="M6 17h36M15 25h10M15 32h6m8-1 4 4 9-10" /></svg>
            <h3>Make it yours.</h3><p>Review the code changes, ask a follow-up, and decide what comes next. Stay close to the work.</p>
          </article>
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
