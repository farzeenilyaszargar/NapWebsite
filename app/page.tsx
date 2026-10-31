import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
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
        <NapSky className={styles.heroSky} variant="clouds" eager />
        <NapHeader />
        <section className={styles.hero} aria-labelledby="nap-title">
          <h1 id="nap-title"><strong>Your coding agents, together.</strong> Nap puts Claude Code, Codex, and Cursor in one Mac workspace, so you can follow conversations and review code without switching apps.</h1>
          <ul className={styles.heroAgents} aria-label="Supported coding agents">{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt={name} width={29} height={29} decoding="async" /></li>)}</ul>
          <div className={styles.heroActions}>
            <NapWaitlistCta location="hero" />
          </div>
        </section>
        <div className={styles.workspaceStage}>
          <figure className={styles.workspace} id="workspace">
            <NapProductImage eager alt="Nap for Mac: project spaces on the left, an agent conversation in the center, and code changes with an integrated terminal on the right." sizes="(max-width: 700px) 94vw, (max-width: 1280px) 88vw, 1120px" />
            <figcaption>Your project. Your agents. The whole picture.</figcaption>
          </figure>
        </div>
      </div>

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
