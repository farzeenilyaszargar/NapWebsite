import Link from "next/link";
import NapGuide from "../../components/nap-guide";
import NapArticleScreenshot from "../../components/nap-article-screenshot";
import { pages, pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(pages.vision, true);

export default function WhyWeMadeNap() {
  return (
    <NapGuide page={pages.vision}>
      <p>We made Nap because working with coding agents should feel less scattered. The agents have become remarkably useful. The experience around them still asks you to keep track of too much: which conversation belongs to which project, what changed, and where you left off.</p>
      <p>Our starting point is simple: your coding agents, all together. Nap brings Claude Code, Codex, and Cursor into one native Mac app. It is a home for the work around an agent, not an attempt to replace every agent with one of our own.</p>

      <h2 id="why">The agent is only part of the experience.</h2>
      <p>A useful answer is not the end of a coding task. You still need to understand the change, check the files, run the relevant tests, and decide whether the result belongs in your project. Often the difficult part is not asking an agent to do something. It is holding onto the context while the work unfolds.</p>
      <p>Switching between disconnected windows makes that harder than it needs to be. A conversation in one place and its consequences somewhere else creates small interruptions all day. We want Nap to make that surrounding experience calmer, so more of your attention can stay on what you are building.</p>

      <h2 id="workspace">One workspace, without one prescribed way to think.</h2>
      <p>Different agents fit different people and different tasks. You might prefer one for exploring a codebase and another for a focused implementation. Choosing an interface should not mean giving up that choice. Nap starts with the agents you already use and brings project conversations and code review closer together.</p>
      <p>We care about the everyday details: finding the right project, returning to a conversation, and seeing what actually changed. Those moments are less spectacular than a benchmark, but they determine whether an app feels good after the first afternoon. A native Mac interface gives us a clear place to focus on them.</p>
      <p>That is also why we talk about review. More generated code is not automatically better work. An interface should help you inspect the result and make a decision, rather than encourage you to approve something simply because it appeared quickly.</p>

      <NapArticleScreenshot detail="queue" />

      <h2 id="cloud">The longer vision: work that can continue beyond one machine.</h2>
      <p>Looking ahead, we are interested in what Nap could become with cloud workspaces. Imagine starting a bounded task on your Mac, letting it continue in an isolated remote environment, and returning to a clear account of what happened. The appeal is continuity: less setup to repeat, less context to reconstruct, and a consistent place to review the result.</p>
      <p>A thoughtful cloud experience could make longer-running tasks more practical. It could also make it easier to return to work from another machine, or share the context of a task with someone else. The goal would not be to move everything off your computer. It would be to offer another place for suitable work to run, while keeping the experience understandable.</p>
      <p>These are directions we want to explore, not features we are announcing as available today. This article does not promise remote execution, background cloud sessions, shared environments, a release date, or a particular pricing model. The public app and the current release remain the reference for what you can actually use.</p>

      <h2 id="control">Convenience should not make the work harder to trust.</h2>
      <p>Putting an agent in the cloud raises real questions. What code leaves your machine? What credentials does it need? What can a task access, and how do you stop it? How is usage measured? Those questions belong in the design from the beginning, not in the small print after launch.</p>
      <p>Our ambition is for any future remote workflow to have explicit boundaries, understandable permissions, and a reviewable result. We would need to explain the actual implementation and its tradeoffs before asking people to rely on it. A vision is not a substitute for that work, and it is not a security guarantee.</p>
      <p>The same principle applies to collaboration. Sharing a task should help another person understand the work, not bury them in a transcript or quietly grant access to a repository. A good handoff is about useful context and clear ownership, not just another shared link.</p>

      <h2 id="next">Build the useful thing. Then earn the next step.</h2>
      <p>For now, we are building the foundation: a focused native workspace for coding with agents. We want it to be useful for the ordinary, repeatable work of opening a project, having a conversation, and reviewing a change. The larger ideas matter only if that everyday experience is worth coming back to.</p>
      <p>That is why we made this app. Not because developers need more places to manage, but because the tools around agents can be more considerate of their time and attention. We want Nap to grow from that idea, whether the work happens on your Mac or, eventually, somewhere beyond it.</p>
      <p>You can try the current Mac app from the <Link className="nap-inline-link" href={pages.home.path}>Nap homepage</Link>, <Link className="nap-inline-link" href={pages.waitlist.path}>join the updates list</Link>, or tell us what you are building on <a className="nap-inline-link" href="https://x.com/nap_cx">X</a>. For practical context, read about <Link className="nap-inline-link" href={pages.parallel.path}>working with parallel coding agents</Link>.</p>
    </NapGuide>
  );
}
