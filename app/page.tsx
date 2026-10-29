import Link from "next/link";
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

const agentNames = codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1");

// Each shot is a region of the workspace screenshot (see NapFeatureShot for the coordinate frame).
const features = [
  { label: "Review", title: "See every change before you commit.", body: "Each answer shows the files the agent touched, with lines added and removed. Review the diff, ask a follow-up, or commit when you’re ready.", shot: { x: 345, y: 30, width: 1103, height: 690 } },
  { label: "Spaces", title: "Every project, one sidebar.", body: "Spaces keep each codebase and its conversations together, so you can pick up any task where you left off.", shot: { x: 0, y: 30, width: 560, height: 350 } },
  { label: "Agents", title: "Your choice of agent.", body: `Work with ${agentNames} from the same composer, with your project and conversation in one place.`, shot: null },
];

// Answers restate what the published guides already say; don't add unconfirmed product details.
const faqs = [
  { question: "What is Nap?", answer: "Nap is a native Mac app that brings your AI coding agents into one workspace. Open a project, chat with an agent, and review the code changes it makes." },
  { question: "Which coding agents does Nap work with?", answer: `The agents currently shown are ${agentNames}.` },
  { question: "Is Nap a new AI model?", answer: "No. Nap is the workspace around your coding workflow. The agent you choose does the coding." },
  { question: "Can I download Nap now?", answer: "Nap is in early access through the waitlist. There’s no public installer yet, and no release date is promised." },
  { question: "Does Nap include agent subscriptions or API credits?", answer: "Don’t assume it does. Authentication, billing, and usage limits depend on the agent provider you use." },
  { question: "Is Nap available for Windows or Linux?", answer: "Nap is a native Mac app. There’s no Windows or Linux version offered at the moment." },
];

export default function Home() {
  return (
    <main className={`contrast-page nap-home-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader showWaitlist />
      <section className="nap-hero" aria-labelledby="nap-title">
        <div className="nap-copy">
          <p className={`nap-section-label ${styles.eyebrow}`}>Early access · Native Mac app</p>
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
          {features.map(({ label, title, body, shot }, index) => (
            <article key={label} className={styles.feature}>
              <div className={styles.featureText}>
                <p className="nap-section-label">{String(index + 1).padStart(2, "0")} — {label}</p>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              {shot ? <NapFeatureShot className={styles.featureShot} {...shot} maxWidth={700} /> : (
                <div className={styles.agentPicker} aria-hidden="true">
                  <p className="nap-section-label">Choose an agent</p>
                  <ul>{codingAgents.map(({ name, logo }, agent) => <li key={name} data-selected={agent === 0 || undefined}><img src={logo} width={22} height={22} alt="" loading="lazy" decoding="async" />{name}<span>{agent === 0 ? "✓" : ""}</span></li>)}</ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className={styles.principles} aria-labelledby="principles-title">
        <div>
          <h2 id="principles-title"><span className={styles.halftoneTitle}>Built around</span><br />the way you already work.</h2>
          <dl className={styles.principleGrid}>
            <div><dt>{codingAgents.length} agents</dt><dd>{agentNames} in one app.</dd></div>
            <div><dt>Native</dt><dd>A Mac app built for macOS, not another browser tab.</dd></div>
            <div><dt>Review-first</dt><dd>See the diff and decide what lands. You stay in control.</dd></div>
            <div><dt>Your agent</dt><dd>Nap is the workspace. The agent you choose does the coding.</dd></div>
          </dl>
          <p className={styles.builtBy}>Built by <a href="https://x.com/farilyaz" target="_blank" rel="noopener noreferrer">@farilyaz</a>. Follow progress at <a href="https://x.com/nap_cx" target="_blank" rel="noopener noreferrer">@nap_cx</a>.</p>
        </div>
      </section>
      <section id="faq" className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqIntro}>
          <h2 id="faq-title">Questions, answered.</h2>
          <p>More detail in the <Link href={pages.blogs.path}>Nap guides</Link>.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
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
