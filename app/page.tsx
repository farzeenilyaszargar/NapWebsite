import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { codingAgents } from "./lib/agents";
import { productQuestions } from "./lib/product";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import NapWorkflowPreview from "./components/nap-workflow-preview";
import NapSky from "./components/nap-sky";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`} id="main-content">
      <StructuredData data={homeSchema()} />
      <div className={styles.opening}>
        <NapSky className={styles.heroSky} eager />
        <NapHeader />
        <section className={styles.hero} aria-labelledby="nap-title">
          <h1 id="nap-title">One app for your<br /><em>coding agents.</em></h1>
          <p className={styles.intro}>Nap brings Claude Code, Codex, and Cursor into one native Mac workspace. Keep your projects, conversations, and code changes together.</p>
          <div className={styles.heroActions}>
            <NapWaitlistCta location="hero" />
            <a className={styles.secondaryAction} href="#workspace">Take a look <ArrowDown size={15} strokeWidth={1.7} aria-hidden="true" /></a>
          </div>
          <p className={styles.availability}>Built for macOS. Currently in early access.</p>
        </section>
        <div className={styles.workspaceStage}>
          <figure className={styles.workspace} id="workspace">
            <NapProductImage eager alt="Nap for Mac: project spaces on the left, an agent conversation in the center, and code changes with an integrated terminal on the right." sizes="(max-width: 700px) 94vw, (max-width: 1280px) 88vw, 1120px" />
            <figcaption>Your project. Your agents. The whole picture.</figcaption>
          </figure>
        </div>
      </div>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title">Bring the agents you already use.</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={27} height={27} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
        <p>Nap is the workspace. Your agent is still your agent.</p>
      </section>

      <section className={styles.workflow} id="why-nap" aria-labelledby="workflow-title">
        <div className={styles.sectionHeading}>
          <h2 id="workflow-title">From the first prompt<br /><em>to the final diff.</em></h2>
          <p>Keep the work around your agents in one place. Find the right project, follow the conversation, and review what changed.</p>
        </div>
        <NapWorkflowPreview />
      </section>

      <section className={styles.faq} aria-labelledby="questions-title">
        <div className={styles.faqIntro}>
          <h2 id="questions-title">A few things<br /><em>to know.</em></h2>
          <p>Still curious? <Link href="/blogs/nap-agentic-development-environment">Get to know Nap <ArrowRight size={14} aria-hidden="true" /></Link></p>
        </div>
        <div className={styles.questions}>
          {productQuestions.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={17} strokeWidth={1.6} aria-hidden="true" /></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="try-nap-title">
        <NapSky className={styles.closingSky} />
        <div className={styles.closingInner}>
          <h2 id="try-nap-title">Meet your<br /><em>new workspace.</em></h2>
          <p>Be first to hear when Nap is ready for your Mac.</p>
          <NapWaitlistCta location="closing" />
          <span className={styles.closingNote}>A name, an email, and you&apos;re on the list.</span>
        </div>
      </section>
      <NapFooter />
    </main>
  );
}
