import Link from "next/link";
import StructuredData from "../components/structured-data";
import NapHeader from "../components/nap-header";
import NapReadingLinks from "../components/nap-reading-links";
import DeferredLiquidField from "../components/deferred-liquid-field";
import { codingAgents } from "../lib/agents";
import { aboutSchema, pageMetadata, pages, site } from "../lib/seo";
import "../contrast.css";

export const metadata = pageMetadata(pages.about);

export default function AboutNap() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={aboutSchema()} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">THE PRODUCT</span>
          <h1>About Nap</h1>
          <p>{site.description}</p>
          <p>Also known as Nap Code, Nap is built around the coding session: the project you open, the goal you describe, the agent you work with, and the changes you decide to keep.</p>
          <dl className="nap-product-facts">
            <div><dt>Product</dt><dd>Nap · Nap Code</dd></div>
            <div><dt>Platform</dt><dd>Native app for Mac</dd></div>
            <div><dt>Purpose</dt><dd>A shared interface for AI coding agents</dd></div>
            <div><dt>Official website</dt><dd><Link href="/" className="nap-inline-link">nap.cx</Link></dd></div>
          </dl>

          <h2>From an idea to a code change.</h2>
          <p>Start by opening a project and describing what you want to build, fix, or understand. Choose an agent, follow the conversation, and review the resulting code changes. You can ask a follow-up question or refine the request as the work takes shape.</p>
          <p>Nap keeps that workflow in one native Mac app. The conversation gives the work its context, and reviewing changes gives you a chance to decide how to continue.</p>

          <h2>Your coding agents, one familiar workspace.</h2>
          <p>The agents listed in Nap are {codingAgents.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, ", and $1")}. Nap brings these choices into a shared interface around your project and conversation.</p>
          <p>You choose the agent for the task and stay involved in the result. Nap provides the workspace for that interaction, from the first prompt through code review.</p>

          <h2>Built for people who build software.</h2>
          <p>Nap is for developers and builders who want to work with AI coding agents through a native interface. A session can begin with a feature idea, a reproducible bug, or a question about an existing codebase. The next step is a conversation about the work, followed by a review of what changed.</p>

          <h2>Follow the product.</h2>
          <p>Read <Link href={pages.why.path} className="nap-inline-link">Why This?</Link> for a closer look at the workflow, or <Link href={pages.story.path} className="nap-inline-link">Why We Started</Link> for the thinking behind Nap. Product updates are shared through <a href="https://x.com/nap_cx" className="nap-inline-link">@nap_cx</a> and the <a href="https://github.com/farzeenilyaszargar/NotNap/releases" className="nap-inline-link">release changelog</a>.</p>
          <p>Want to hear what comes next? <Link href={pages.waitlist.path} className="nap-inline-link">Join the Nap waitlist</Link> for availability and product updates.</p>
          <NapReadingLinks current={pages.about.path} />
        </article>
      </section>
      <DeferredLiquidField />
    </main>
  );
}
