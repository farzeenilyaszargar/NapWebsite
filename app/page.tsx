import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapFeatureShot from "./components/nap-feature-shot";
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
          <p className={styles.eyebrow}><span aria-hidden="true" />Early access · Native Mac app</p>
          <h1 id="nap-title"><span className={styles.halftoneTitle}>Your Agents.</span><br />All Together.</h1>
            <div className="nap-hero-details">
              <p className="nap-description">Nap brings Claude Code, Codex, and Cursor into one native Mac app. Open a project, pick an agent, and review every change before you commit.</p>
              <div className={`nap-action ${styles.actions}`}>
                <NapWaitlistCta />
                <a className={styles.secondaryCta} href="#features">See how it works <span aria-hidden="true">↓</span></a>
              </div>
            </div>
        </div>
      </section>
      <div className={styles.stage}>
      <figure className="nap-full-width-product">
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1320px) 90vw, 1180px" />
      </figure>
      </div>
      <section className="nap-agents nap-section" aria-labelledby="agents-title">
        <h2 id="agents-title" className="nap-section-label">The agents you already work with</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name} data-agent={name}><img src={logo} alt="" width={22} height={22} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
      </section>
      <section id="features" className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.workflowHeading}>
          <h2 id="workflow-title"><span className={styles.halftoneTitle}>Less setup.</span><br />More getting somewhere.</h2>
          <p>Nap brings your AI coding agents into one native Mac app. Keep your projects, conversations, and code changes together.</p>
        </div>
        <div className={styles.features}>
          <article className={styles.featureWide}>
            <div className={styles.featureText}>
              <span className={styles.featureKicker}>Review</span>
              <h3>See every change before you commit.</h3>
              <p>Each answer shows the files the agent touched, with lines added and removed. Review the diff, ask a follow-up, or commit when you’re ready.</p>
            </div>
            <NapFeatureShot className={styles.featureShot} x={345} y={72} width={1103} height={400} maxWidth={760} />
          </article>
          <article className={styles.feature}>
            <div className={styles.featureText}>
              <span className={styles.featureKicker}>Spaces</span>
              <h3>Every project, one sidebar.</h3>
              <p>Spaces keep each codebase and its conversations together, so you can pick up any task where you left off.</p>
            </div>
            <NapFeatureShot className={styles.featureShot} x={0} y={60} width={620} height={425} maxWidth={560} />
          </article>
          <article className={styles.feature}>
            <div className={styles.featureText}>
              <span className={styles.featureKicker}>Agents</span>
              <h3>Your choice of agent.</h3>
              <p>Work with Claude Code, Codex, or Cursor from the same composer, with your project and conversation in one place.</p>
            </div>
            <div className={styles.featurePanel}>
              <ul className={styles.agentChips} aria-hidden="true">{codingAgents.map(({ name, logo }) => <li key={name} data-agent={name}><img src={logo} width={16} height={16} alt="" loading="lazy" decoding="async" />{name}</li>)}</ul>
              <NapFeatureShot className={styles.composerShot} x={358} y={758} width={702} height={166} maxWidth={560} />
            </div>
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
