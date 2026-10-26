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
      <NapHeader showWaitlist />
      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <h1 id="nap-title">Your Agents.<br />All Together.</h1>
            <div className="nap-hero-details">
              <div className="nap-action"><NapWaitlistCta /></div>
            </div>
        </div>
      </section>
      <div className={styles.stage}>
      <figure className="nap-full-width-product">
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 700px) 150vw, (max-width: 1320px) 90vw, 1180px" />
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
            <div className={styles.detail} aria-hidden="true">
              <div className={styles.projectRow}><span className={styles.folder} /> Your project <span>⌘ O</span></div>
              <div className={styles.fileRow}>src <span>/</span> components <span>/</span></div>
              <div className={styles.composer}>What would you like to build?<span>↑</span></div>
            </div>
            <h3>Start where you are.</h3><p>Open your codebase and describe what you want to build, fix, or understand.</p>
          </article>
          <article>
            <div className={styles.detail} aria-hidden="true">
              <div className={styles.agentRows}>{codingAgents.map(({ name, logo }) => <div key={name}><img src={logo} width={18} height={18} alt="" loading="lazy" /><span>{name}</span><span>{name === "Claude Code" ? "✓" : ""}</span></div>)}</div>
            </div>
            <h3>Your choice of agent.</h3><p>Work with the coding agent you know, with your project and conversation in the same place.</p>
          </article>
          <article>
            <div className={styles.detail} aria-hidden="true">
              <div className={styles.reviewTitle}>Changes <span>2 files</span></div>
              <div className={styles.diffLine}>− &nbsp;The first draft.</div>
              <div className={styles.diffLine}>+ &nbsp;Something better.</div>
              <div className={styles.reviewAction}>Review changes <span>↗</span></div>
            </div>
            <h3>Keep moving forward.</h3><p>See what changed, ask a follow-up, and decide what comes next. You stay in control.</p>
          </article>
        </div>
      </section>
      <div className={styles.closing}>
        <section className={styles.tryNap} aria-labelledby="try-nap-title">
          <h2 id="try-nap-title">Try out Nap.</h2>
          <NapWaitlistCta />
        </section>
        <NapFooter />
      </div>
    </main>
  );
}
