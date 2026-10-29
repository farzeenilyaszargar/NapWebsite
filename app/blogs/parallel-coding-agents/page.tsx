import Link from "next/link";
import NapGuide from "../../components/nap-guide";
import { pages, pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(pages.parallel, true);

const contents = [
  { id: "task-ownership", label: "Divide tasks" },
  { id: "worktree-isolation", label: "Isolate worktrees" },
  { id: "review-and-integration", label: "Review and integrate" },
  { id: "nap-parallel-agents", label: "Where Nap fits" },
];

export default function ParallelCodingAgentsPost() {
  return (
    <NapGuide page={pages.parallel} contents={contents}>
      <p>Parallel coding agents are separate agent sessions working on independent parts of a project at the same time. The useful part is not the number of agents. It is whether their work can be understood, tested, and combined without one session undoing another.</p>
      <p>Start with two bounded tasks, separate working directories, and one person responsible for integration. This guide describes a general Git-based workflow, then explains where Nap fits as an interface for working with coding agents.</p>

      <h2>Parallel agents versus one long conversation</h2>
      <p>A single agent session is often enough for a tightly connected change. If you are changing a function and its callers, keeping the reasoning in one conversation can be easier than coordinating several sessions.</p>
      <p>Parallel work becomes useful when the boundaries are clear. One agent can investigate a failing test while another reads the documentation. Two implementation tasks can run independently if they do not need to change the same contract or shared files.</p>
      <p>Two agents editing the same checkout are a different situation. Even on separate Git branches, they can interfere if they share the working directory. A branch name alone does not provide a separate filesystem.</p>

      <h2 id="task-ownership">Divide the work by ownership, not by agent count</h2>
      <p>Consider a settings screen that needs a new notification preference. Before delegating implementation, agree on the preference name, allowed values, and save behaviour. Otherwise the UI agent and the API agent may build different versions of the feature.</p>
      <p>A reasonable split is a UI task that uses the agreed interface, a persistence task that implements it, and a read-only review of the expected failure cases. If the interface is still undecided, resolve that first or keep the work sequential.</p>
      <p>Give each implementation task an owner, a list of files it may change, acceptance checks, and a stopping condition. Ask it to report unexpected dependencies instead of expanding its scope silently. Shared configuration and dependency lockfiles deserve an explicit owner.</p>

      <h2 id="worktree-isolation">Use Git worktrees to separate checkouts</h2>
      <p>Git worktrees let one repository have multiple working trees, with each task using its own branch and directory. From a repository with no uncommitted work you need to preserve in the task checkout, you can create a task branch with <code>git worktree add ../nap-ui -b task/ui</code>. Create a second task with a different directory and branch name.</p>
      <p>Point each agent at its assigned directory. A new worktree is not a copy of uncommitted changes in your original directory, so commit the shared starting point first when both tasks need it. Install or configure project dependencies in each checkout as the project requires.</p>
      <p>Worktrees isolate files, not everything around them. Two dev servers still need different ports. Tests pointed at the same database can still affect each other. Credentials and permissions also need their own safeguards. The <a className="nap-inline-link" href="https://git-scm.com/docs/git-worktree">official Git worktree reference</a> covers creation, inspection, and cleanup.</p>

      <h2>Write a task brief an agent can finish</h2>
      <p>For the UI task, a useful brief is: add the notification toggle to the settings view, use the agreed preference field, preserve keyboard access, and leave the API and dependency files unchanged. Verify loading, saved, and failed-save states. Stop and ask if the existing API cannot represent the preference.</p>
      <p>For the persistence task, specify the default, validation rules, and migration behaviour. Request focused tests and a summary of the contract the UI should consume. Neither agent should assume that a plausible explanation is evidence that the other task works.</p>

      <h2 id="review-and-integration">Integrate one change at a time</h2>
      <p>Review the first branch before combining it with the second. Check its diff, run relevant tests, and ask whether the change stayed inside its brief. Then integrate the next branch and rerun the checks against the combined result.</p>
      <p>A clean Git merge only means the text changes could be combined. It does not prove that validation, loading states, or application behaviour agree. Test the actual settings workflow, including failures, after integration.</p>
      <p>Keep a short record of which task produced each change and which checks ran. Stop assigning new tasks when the review queue becomes too large. Otherwise parallel implementation simply moves the bottleneck to a pile of unread diffs.</p>

      <h2>When parallel coding is the wrong choice</h2>
      <p>Use a sequential approach for changes with a moving shared design, a single fragile migration, or extensive edits to the same module. Running more sessions also increases resource use and can increase provider costs. Measure the time to a reviewed, working result, not just the time until agents say they are done.</p>

      <h2 id="nap-parallel-agents">Nap and parallel agents: what to verify</h2>
      <p>Nap is a native Mac app for bringing coding agents, project conversations, and code review into one interface. The agent choices shown on the site are Claude Code, Codex, and Cursor. Read the <Link className="nap-inline-link" href={pages.ade.path}>Nap workspace guide</Link> for the distinction between the app and the agents it works with.</p>
      <p>This workflow does not assume that Nap automatically provisions worktrees, schedules parallel tasks, or merges branches. Those capabilities should be verified in the build you use. Access is currently through the <Link className="nap-inline-link" href={pages.waitlist.path}>Nap waitlist</Link>.</p>

      <h2>Do parallel coding agents need different models?</h2>
      <p>No. Parallelism is about separate sessions and task boundaries, not necessarily different models. Choose agents for the work you need, and keep their file ownership and acceptance checks explicit.</p>
      <h2>How many agents should I start with?</h2>
      <p>Try two independent tasks first. Add another only when you can still inspect every change and understand the combined result. An extra session is useful only if coordination and review remain manageable.</p>
    </NapGuide>
  );
}
