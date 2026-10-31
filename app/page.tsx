import { Bot, FolderTree, GitCompareArrows } from "lucide-react";
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

const agentNames = codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1");

// Photos: Unsplash License (free for commercial use), with light film grain added.
const clouds = "/nap-clouds-1200-2949a318.webp 1200w, /nap-clouds-2400-2bcdf304.webp 2400w";
const poppies = "/nap-poppies-1200-eb86c16e.webp 1200w, /nap-poppies-2400-70d99ed8.webp 2400w";

const features = [
  { icon: FolderTree, title: "A space for every project", body: "Each codebase keeps its own conversations, so you can pick up any task exactly where you left off." },
  { icon: Bot, title: "The agent you prefer", body: `Work with ${agentNames} from one composer, in one native interface.` },
  { icon: GitCompareArrows, title: "Review, then commit", body: "Every answer shows the files an agent touched, line by line. Ask a follow-up or commit when it’s right." },
];

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />

      <section className={styles.hero} aria-labelledby="nap-title">
        <img className={styles.heroPhoto} srcSet={clouds} sizes="100vw" src="/nap-clouds-2400-2bcdf304.webp" width={2400} height={1600} alt="" aria-hidden="true" fetchPriority="high" />
        <div className={styles.heroCopy}>
          <h1 id="nap-title">Your agents.<br />All together.</h1>
          <p>Nap is a native Mac app for AI coding agents. Open a project, pick an agent, and review every change it makes.</p>
          <NapWaitlistCta />
          <small>Early access for macOS. Download opens the waitlist.</small>
        </div>
        <figure className={styles.product}>
          <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1240px) 86vw, 1060px" />
        </figure>
      </section>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title">Works with</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={26} height={26} loading="lazy" decoding="async" />{name}</li>)}</ul>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <h2 id="features-title">From prompt to commit,<br />in one window.</h2>
        <div className={styles.featureList}>
          {features.map(({ icon: Icon, title, body }) => (
            <article key={title}>
              <Icon className={styles.icon} size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <img className={styles.ctaPhoto} srcSet={poppies} sizes="(max-width: 1340px) 94vw, 1280px" src="/nap-poppies-1200-eb86c16e.webp" width={2400} height={1600} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className={styles.ctaCopy}>
          <h2 id="cta-title">Try Nap on your Mac.</h2>
          <NapWaitlistCta />
        </div>
      </section>

      <NapFooter />
    </main>
  );
}
