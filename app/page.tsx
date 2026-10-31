import { ArrowDown, Bot, FolderTree, GitCompareArrows, SquareTerminal } from "lucide-react";
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

// Snippets restate what the product screenshot shows.
const spaces = [["sndbx", 4], ["GTX", 2], ["fx", 2]] as const;
const changes = [["test-macos-signing.ts", "+4", "−29"], ["wrap-auth-mx.ts", "+33", "−23"], ["secret.config.json", "+46", "−2"], [".gitignore", "", "−18"]] as const;

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />

      <section className={styles.hero} aria-labelledby="nap-title">
        <div className={styles.heroCopy}>
          <h1 id="nap-title">Your agents.<br />All together.</h1>
          <p className={styles.lede}>Nap is a native Mac app for AI coding agents. Open a project, pick an agent, and review every change it makes, all in one workspace.</p>
          <div className={styles.actions}>
            <NapWaitlistCta />
            <a className={styles.secondary} href="#features">How it works <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" /></a>
          </div>
          <p className={styles.note}>Early access. Download opens the waitlist.</p>
        </div>
        <dl className={styles.specs}>
          <div><dt>Platform</dt><dd>macOS, native</dd></div>
          <div><dt>Agents</dt><dd>{agentNames}</dd></div>
          <div><dt>Review</dt><dd>Diff for every change</dd></div>
          <div><dt>Status</dt><dd><span className={styles.live} aria-hidden="true" />Early access</dd></div>
        </dl>
      </section>

      <div className={styles.stage}>
        <div className={styles.sky} aria-hidden="true"><img src="/nap-dream-sky-3691b2da.webp" width={1600} height={800} alt="" fetchPriority="high" /></div>
        <figure className={styles.product}>
          <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1340px) 72vw, 960px" />
        </figure>
      </div>

      <section id="agents" className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title">Works with the agents you already use</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={24} height={24} loading="lazy" decoding="async" />{name}</li>)}</ul>
      </section>

      <section id="features" className={styles.features} aria-labelledby="features-title">
        <div className={styles.featuresHead}>
          <h2 id="features-title">One workspace, from prompt to commit.</h2>
          <p>Nap keeps the project, the conversation, and the code changes in the same window, so you can follow what an agent did and decide what lands.</p>
        </div>
        <div className={styles.grid}>
          <article>
            <FolderTree className={styles.icon} size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>Spaces for every project</h3>
            <p>Each codebase is a space. Its conversations stay with it, so you can pick up any task where you left off.</p>
            <ul className={styles.snippet} aria-hidden="true">{spaces.map(([name, count]) => <li key={name}><span>{name}</span><span>{count} conversations</span></li>)}</ul>
          </article>
          <article>
            <Bot className={styles.icon} size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>Your choice of agent</h3>
            <p>Work with {agentNames} from the same composer and the same native interface.</p>
            <ul className={styles.chips} aria-hidden="true">{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={16} height={16} loading="lazy" decoding="async" />{name}</li>)}</ul>
          </article>
          <article>
            <GitCompareArrows className={styles.icon} size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>Review before you commit</h3>
            <p>Every answer lists the files the agent touched, with lines added and removed. Review the diff, ask a follow-up, or commit.</p>
            <ul className={styles.snippet} aria-hidden="true">{changes.map(([file, added, removed]) => <li key={file}><span>{file}</span><span><b>{added}</b> <i>{removed}</i></span></li>)}</ul>
          </article>
          <article>
            <SquareTerminal className={styles.icon} size={22} strokeWidth={1.5} aria-hidden="true" />
            <h3>A terminal beside the chat</h3>
            <p>Run commands next to the conversation without leaving the app or losing your place in the task.</p>
            <pre className={styles.terminal} aria-hidden="true"><span>~/sndbx</span> % git status{"\n"}<span>4 files changed</span></pre>
          </article>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <img className={styles.ctaSky} src="/nap-dream-dusk-bf608606.webp" width={1600} height={640} alt="" aria-hidden="true" loading="lazy" />
        <div className={styles.ctaCard}>
          <h2 id="cta-title">Download Nap for Mac.</h2>
          <p>Early access is open through the waitlist.</p>
          <NapWaitlistCta />
        </div>
      </section>

      <NapFooter />
    </main>
  );
}
