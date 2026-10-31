import Link from "next/link";
import { Folder, GitPullRequest, RobotFace } from "pixelarticons/react";
import { codingAgents } from "./lib/agents";
import StructuredData from "./components/structured-data";
import { pages, pageMetadata, homeSchema } from "./lib/seo";
import NapProductImage from "./components/nap-product-image";
import NapWaitlistCta from "./components/nap-waitlist-cta";
import NapHeader from "./components/nap-header";
import NapFooter from "./components/nap-footer";
import MacWindow from "./components/mac-window";
import "./contrast.css";
import styles from "./home-brand.module.css";

export const metadata = pageMetadata(pages.home);

const agentNames = codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1");

// Icons: pixelarticons (MIT).
const features = [
  { icon: Folder, title: "Spaces", heading: "A space for every project", body: "Each codebase keeps its own conversations, so you can pick up any task exactly where you left off." },
  { icon: RobotFace, title: "Agents", heading: "The agent you prefer", body: `Work with ${agentNames} from one composer, in one native interface.` },
  { icon: GitPullRequest, title: "Review", heading: "Review, then commit", body: "Every answer shows the files an agent touched, line by line. Ask a follow-up or commit when it’s right." },
];

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />

      <div className={styles.desktop}>
        <section className={styles.hero} aria-labelledby="nap-title">
          <MacWindow title="Nap" className={styles.heroWindow}>
            <div className={styles.heroBody}>
              <h1 id="nap-title">Your agents.<br />All together.</h1>
              <p>Nap is a native Mac app for AI coding agents. Open a project, pick an agent, and review every change it makes.</p>
              <div className={styles.actions}><NapWaitlistCta /></div>
              <small>Early access for macOS. Download opens the waitlist.</small>
            </div>
          </MacWindow>

          <section className={styles.agents} aria-labelledby="agents-title">
            <MacWindow title="Works with" status={<><span>{codingAgents.length} items</span><span>Ready</span></>}>
              <h2 id="agents-title" className={styles.hidden}>Works with</h2>
              <ul className={styles.icons}>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={40} height={40} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
            </MacWindow>
          </section>
        </section>

        <MacWindow title="Nap — Workspace" className={styles.product}>
          <div className={styles.shot}>
            <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1240px) 92vw, 1120px" />
          </div>
        </MacWindow>

        <section className={styles.features} aria-labelledby="features-title">
          <h2 id="features-title">From prompt to commit, in one window.</h2>
          <div className={styles.featureList}>
            {features.map(({ icon: Icon, title, heading, body }) => (
              <MacWindow key={title} title={title}>
                <article className={styles.feature}>
                  <Icon className={styles.icon} width={32} height={32} aria-hidden="true" />
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </article>
              </MacWindow>
            ))}
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-title">
          <MacWindow title="Nap" className={styles.alert}>
            <div className={styles.alertBody}>
              <img className="nap-pixel" src="/nap-ghost-icon-2048043d.png" width={64} height={72} alt="" />
              <div>
                <h2 id="cta-title">Try Nap on your Mac.</h2>
                <p>Early access opens through the waitlist.</p>
              </div>
            </div>
            <div className={styles.alertActions}>
              <Link className="nap-download" href={pages.blogs.path}>Read the blog</Link>
              <NapWaitlistCta />
            </div>
          </MacWindow>
        </section>
      </div>

      <NapFooter />
    </main>
  );
}
