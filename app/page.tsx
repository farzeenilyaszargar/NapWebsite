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
          <h1 id="nap-title"><span className={styles.halftoneTitle}>Your Agents.</span><br />All Together.</h1>
            <div className="nap-hero-details">
              <div className="nap-action"><NapWaitlistCta /></div>
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
      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.workflowHeading}>
          <h2 id="workflow-title"><span className={styles.halftoneTitle}>Less setup.</span><br />More getting somewhere.</h2>
          <p>Nap brings your AI coding agents into one native Mac app. Keep your projects, conversations, and code changes together.</p>
        </div>
        <div className={styles.steps}>
          <article>
            <div className={styles.detail} aria-hidden="true">
              <div className={styles.projectRow}><span className={styles.folder} /> Your project <span>⌘ O</span></div>
              <div className={styles.fileRow}>src <span>/</span> components <span>/</span></div>
              <div className={styles.composer}><span className={styles.typingPrompt}>What would you like to build?</span><span>↑</span></div>
            </div>
            <h3>Start where you are.</h3><p>Open your codebase and describe what you want to build, fix, or understand.</p>
          </article>
          <article>
            <div className={styles.detail} aria-hidden="true">
              <div className={styles.agentRows}>{codingAgents.map(({ name, logo }) => <div key={name}><img src={logo} width={18} height={18} alt="" loading="lazy" /><span>{name}</span><span>✓</span></div>)}</div>
            </div>
            <h3>Your choice of agent.</h3><p>Work with the coding agent you know, with your project and conversation in the same place.</p>
          </article>
          <article>
            <div className={styles.detail} aria-hidden="true">
              <div className={styles.reviewTitle}>Changes <span>2 files</span></div>
              <div className={styles.diffLine}><span>− &nbsp;The first draft.</span></div>
              <div className={styles.diffLine}><span>+ &nbsp;Something better.</span></div>
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
