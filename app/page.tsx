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
    <main className={`contrast-page ${styles.page}`}>
      <StructuredData data={homeSchema()} />
      <NapHeader />
      <section className={styles.hero} aria-labelledby="nap-title">
        <img className={styles.landscape} src="/nap-halftone-coast-a9782154.webp" width={2172} height={724} alt="" aria-hidden="true" decoding="async" fetchPriority="low" />
        <div className={styles.heroInner}>
          <h1 id="nap-title">Your agents.<br /><em>One workspace.</em></h1>
          <p className={styles.intro}>Nap brings Claude Code, Codex, and Cursor into one native Mac app. Work on your project and review the changes without switching apps.</p>
          <div className={styles.heroActions}><NapWaitlistCta /><p>Early access for macOS.</p></div>
        </div>
      </section>

      <figure className={styles.workspace} id="workspace">
        <NapProductImage eager alt="Nap’s native coding workspace with project spaces, an agent conversation, code change review, and an integrated terminal." sizes="(max-width: 1320px) 90vw, 1180px" />
      </figure>

      <section className={styles.agents} aria-labelledby="agents-title">
        <h2 id="agents-title">Works with</h2>
        <ul>{codingAgents.map(({ name, logo }) => <li key={name}><img src={logo} alt="" width={24} height={24} loading="lazy" decoding="async" /><span>{name}</span></li>)}</ul>
      </section>

      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.workflowIntro}>
          <h2 id="workflow-title">Code with an agent.<br /><em>Stay in control.</em></h2>
          <p>Your project, the conversation, and the diff stay in the same workspace. Read what changed before you decide what to keep.</p>
        </div>
        <div className={styles.steps}>
          <article>
            <h3>Open your project.</h3><p>Start with your codebase. Keep its tasks and conversations together, so you can return to the right place.</p>
          </article>
          <article>
            <h3>Choose your agent.</h3><p>Work with Claude Code, Codex, or Cursor through the same interface. Ask it to build, fix, or explain your code.</p>
          </article>
          <article>
            <h3>Review the changes.</h3><p>Inspect the diff, ask a follow-up, and decide what to keep. An agent response is not the end of the review.</p>
          </article>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="try-nap-title">
        <div className={styles.closingInner}><h2 id="try-nap-title">Work with your agents<br /><em>in Nap.</em></h2><p>Join the waitlist for macOS early access.</p><NapWaitlistCta /></div>
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
