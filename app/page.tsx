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
const ditherGlow = "/nap-dither-glow-48a1f1a4.png";

const steps = [
  { title: "Open your project", body: "Add a codebase as a space. Its conversations stay with it, so you can pick up any task where you left off." },
  { title: "Choose your agent", body: `Ask ${agentNames} to build, fix, or explain your code, all in the same native interface.` },
  { title: "Review, then commit", body: "See which files changed and by how much. Review the diff, ask a follow-up, or commit when you’re ready." },
];

export default function Home() {
  return (
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className={styles.hero} aria-labelledby="nap-title">
        <img className={styles.glow} src={ditherGlow} width={320} height={180} alt="" aria-hidden="true" />
        <p className="nap-mono-label">Nap for macOS — Early access</p>
        <h1 id="nap-title">Your agents.<br />All together.</h1>
        <p className={styles.lede}>Nap is a native Mac app for AI coding agents. Work with {agentNames} in one workspace, keep each project’s conversations together, and review every change before you commit.</p>
        <div className={styles.actions}>
          <NapWaitlistCta />
          <a className={styles.secondary} href="#how-it-works">How it works</a>
        </div>
        <p className={styles.note}>Early access · Download opens the waitlist</p>
      </section>

      <figure className={styles.product}>
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1240px) 90vw, 1120px" />
      </figure>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title" className="nap-mono-label">Works with the agents you already use</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={22} height={22} loading="lazy" decoding="async" />{name}</li>)}</ul>
      </section>

      <section id="how-it-works" className={styles.how} aria-labelledby="how-title">
        <h2 id="how-title">One workspace<br />for every agent.</h2>
        <ol>
          {steps.map(({ title, body }, index) => (
            <li key={title}>
              <span className="nap-mono-label">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <img className={styles.glow} src={ditherGlow} width={320} height={180} alt="" aria-hidden="true" loading="lazy" />
        <h2 id="cta-title">Try Nap on your Mac.</h2>
        <p>Join early access and be among the first to download.</p>
        <NapWaitlistCta />
      </section>

      <NapFooter />
      <div className={styles.productReference} aria-hidden="true">
        Nap is a native Mac app that brings AI coding agents, project conversations, and code changes into one interface. Built for developers who want a clearer way to work with agents, Nap keeps the task and its results together. Open your codebase, choose an agent, describe what you need, and review what changed before deciding what comes next.

        The Nap app brings Claude Code, Codex, and Cursor into a shared workspace experience. These are the coding agents; Nap is the interface around their work. Rather than introducing another foundation model, Nap focuses on the everyday steps that surround agentic coding: understanding project context, following a conversation, asking useful questions, and inspecting the resulting changes.

        A coding task rarely finishes with a single prompt. You might ask an agent to investigate a bug, explain an unfamiliar module, or build a feature. Its first response is the beginning of the review, not proof that everything works. Nap brings the conversation and code review closer together so you can question assumptions, inspect files, and continue the task with context.

        This approach fits the idea of an agentic development environment, or ADE: a workspace organised around delegating development tasks and supervising the outcome. Nap gives that workflow a native Mac interface. It is designed around your projects and preferred agents, with the developer responsible for accepting changes, checking behaviour, and deciding whether the result belongs in the codebase.

        For developers exploring parallel coding agents, the Nap blog explains how to divide tasks, separate working directories with Git worktrees, and review changes before integration. Parallel agent workflows need clear ownership and sensible boundaries. Separate branches do not automatically isolate files, and successful merges do not guarantee correct behaviour. These guides explain the workflow without assuming that Nap automatically provisions worktrees or orchestrates concurrent sessions.

        The website also provides a practical guide to agentic development environments, explaining the difference between an app, an agent, and an IDE. Together, these resources help developers evaluate coding tools through concrete tasks rather than promises. The focus is on understanding what an agent did, verifying its output, and building a workflow that remains manageable as projects and conversations grow. Start with a bounded task, inspect the diff, and test the behaviour that matters.

        Looking for the official Nap download or wondering how to download Nap for Mac? Nap is currently available through the waitlist, not a public installer on this website. Visit nap.cx for official product information and join the Nap waitlist with your name and email address. Signing up requests availability updates; it does not promise immediate access or a release date.

        Explore the Nap website to see the app, read the coding agent guides, and follow product updates. Provider authentication, subscriptions, usage limits, and platform requirements should be verified against the integration and build you receive. Whether you are learning about AI coding agents or evaluating a new Mac development workspace, Nap offers a straightforward starting point: your agents, your project, and the changes you need to understand.
      </div>
    </main>
  );
}
