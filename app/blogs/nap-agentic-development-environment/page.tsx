import Link from "next/link";
import NapGuide from "../../components/nap-guide";
import NapProductImage from "../../components/nap-product-image";
import { pages, pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(pages.ade, true);

const contents = [
  { id: "what-is-nap", label: "What Nap is" },
  { id: "ade-vs-ide", label: "ADE versus IDE" },
  { id: "evaluate-nap", label: "Evaluate the workflow" },
  { id: "early-access", label: "Get early access" },
];

export default function NapAdePost() {
  return (
    <NapGuide page={pages.ade} contents={contents}>
      <p>An agentic development environment, often shortened to ADE, is a workspace built around delegating coding tasks to agents and reviewing their work. The term is used in different ways. Here, it means keeping the project, conversation, commands, and resulting changes close enough that a developer can follow the whole task.</p>
      <p>Nap is a native Mac app being built around that workflow. It brings coding agents into one interface rather than asking you to treat every conversation as a separate place to work.</p>

      <h2 id="what-is-nap">Is Nap an agent, a model, or an app?</h2>
      <p>Nap is the app around the coding workflow. The agent you choose supplies the coding behaviour; Nap provides the surrounding workspace. The agent choices currently shown on the Nap website are Claude Code, Codex, and Cursor.</p>
      <p>That distinction matters when evaluating an ADE. A convenient interface does not make an agent infallible, remove provider limits, or guarantee that generated code is correct. You still need to understand what access the selected agent has and review what it does.</p>

      <figure className="nap-article-image">
        <NapProductImage sizes="(max-width: 756px) 90vw, 680px" alt="Nap app showing project navigation, an agent conversation, code changes, and a terminal in one Mac workspace." />
        <figcaption>The Nap workspace: project context, conversation, and the work to review.</figcaption>
      </figure>

      <h2>What belongs in an agentic development environment?</h2>
      <p>Start with project context. Before giving an agent a task, you should know which repository and working directory it will use. A convincing answer about the wrong checkout is still the wrong answer.</p>
      <p>Next is the conversation. A task rarely ends with the first prompt. You ask for a fix, read the result, question an assumption, and refine the change. Returning to the right conversation should not require reconstructing the session from memory.</p>
      <p>Finally, there is evidence. Changed files, command output, and tests let you check the agent&apos;s explanation against what happened. An interface should help you find that evidence, not replace it with a success message.</p>

      <h2>A concrete example: fixing a failed save</h2>
      <p>Suppose a settings form displays a saved message even when the network request fails. Open the project, choose an agent, and describe the behaviour you expect: show success only after confirmation, preserve the entered values on failure, and let the user retry.</p>
      <p>Ask the agent to inspect the existing save path before editing. After the change, review the diff. Did it fix the actual request handling, or just change the message? Did it introduce a second save path? Did it touch unrelated styling?</p>
      <p>Then test both outcomes. Simulate a successful request and a failed request, inspect the UI, and check that retry does not create duplicate actions. The useful unit of work is a verified change, not a long answer.</p>

      <h2 id="ade-vs-ide">ADE versus IDE versus a terminal agent</h2>
      <p>An IDE typically centres editing, navigation, debugging, and language tooling. A terminal agent centres a command-line conversation and the operations available in that environment. An ADE centres the delegated task and the developer&apos;s ability to supervise it. These categories can overlap.</p>
      <p>You do not need to abandon your editor to evaluate an agent workspace. The question is whether it makes your existing workflow easier to follow. Try the same bounded task, inspect the changes, and compare how easily you can resume it later.</p>

      <h2>Does an ADE mean parallel agents?</h2>
      <p>Not automatically. An environment can make one agent session easier to manage without providing parallel orchestration. Multiple visible conversations also do not prove that their filesystem changes are isolated.</p>
      <p>For concurrent implementation, check task ownership, separate working directories, shared services, and integration checks. Our <Link className="nap-inline-link" href={pages.parallel.path}>parallel coding agents guide</Link> explains a Git-based approach without assuming app-specific automation.</p>

      <h2 id="evaluate-nap">How to evaluate the Nap app</h2>
      <p>Use a small task in a repository you understand. Check whether you can identify the project, follow the conversation, find the changed files, and decide what to keep. Ask a follow-up and see whether you can continue without losing the context.</p>
      <p>Also verify provider authentication, costs, permissions, and platform requirements against the actual build and provider documentation. Do not infer security guarantees or agent availability from a screenshot alone.</p>

      <h2 id="early-access">Can I download Nap now?</h2>
      <p>Nap is currently waitlist-only. Visit the <Link className="nap-inline-link" href={pages.download.path}>official download and early-access guide</Link> or <Link className="nap-inline-link" href={pages.waitlist.path}>join the Nap waitlist</Link>. There is no public release date promised here.</p>
    </NapGuide>
  );
}
