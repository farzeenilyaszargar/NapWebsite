import NapFooter from "../../components/nap-footer";
import StructuredData from "../../components/structured-data";
import { pages, pageMetadata, articleSchema } from "../../lib/seo";
import NapReadingLinks from "../../components/nap-reading-links";
import NapHeader from "../../components/nap-header";
import "../../contrast.css";

export const metadata = pageMetadata(pages.why, true);

export default function WhyPost() {
  return (
    <main className="contrast-page nap-article-page">
      <StructuredData data={articleSchema(pages.why)} />
      <NapHeader />
      <section className="nap-hero">
        <article className="nap-blog-article">
          <span className="nap-blog-label">By <a href="https://x.com/farilyaz" className="nap-inline-link" target="_blank" rel="noopener noreferrer">@farilyaz</a> · 2 Min Read</span>
          <h1><span className="nap-halftone-text">Why</span> This?</h1>
          <p>Nap is a native AI coding workspace for Mac that brings your coding agents, project conversations, and code review into one app.</p>
          <p>A good coding session has a simple rhythm. You describe a goal, work through it with an agent, and review what changed. Nap puts that rhythm at the center of a native app.</p>
          <p>Your project, the conversation, and the work that follows all share the same space. You can stay with the problem from the first question to the next change.</p>


          <h2>Open a project. Start a conversation.</h2>
          <p>Bring a project into Nap, choose an agent, and describe what you want to build, fix, or understand. You work through the app’s interface.</p>
          <p>A clear starting point helps: what should happen, what happens today, and which details matter. The conversation gives you room to refine that request as you learn more.</p>

          <h2>Choose the agent that fits.</h2>
          <p>Claude Code, Codex, and Cursor each have a place in the way people build. Nap brings those choices into one native workspace.</p>
          <p>You can follow a familiar flow around your project and conversation while working with the agent you prefer. The interface gives that work a consistent shape.</p>

          <h2>See the work. Make the call.</h2>
          <p>An agent’s response is the beginning of a review. What did it do? Which files changed? Does the result match what you asked for? Nap keeps the conversation and agent activity together so you can follow the work.</p>
          <p>Read the result, inspect the code changes, and ask a follow-up question when something needs another pass. Your judgment stays part of the process.</p>

          <h2>Return with your context.</h2>
          <p>Projects rarely happen in one sitting. Keeping sessions organized gives you a place to return to, with the conversation that explains how you got there.</p>
          <p>That is why Nap takes this shape: a native app built around the whole coding session. Open your project, work with your agent, and keep moving.</p>
          <NapReadingLinks current={pages.why.path} />
        </article>
      </section>
      <NapFooter />
    </main>
  );
}
