"use client";

import { type CSSProperties, type FormEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { codingAgents } from "../lib/agents";

type IconName = "sidebar" | "search" | "plus" | "folder" | "arrow" | "branch" | "terminal" | "chevron" | "review" | "reset" | "pause" | "play" | "check" | "close" | "expand";
const iconPaths: Record<IconName, React.ReactNode> = {
    sidebar: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M9 4v16" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    folder: <path d="M3 8V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8h18" />,
    arrow: <path d="M12 20V4m-6 6 6-6 6 6" />,
    branch: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 7v10M18 7c0 6-12 3-12 9" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
    chevron: <path d="m9 5 7 7-7 7" />,
    review: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8m-8 4h8m-8 4h4" /></>,
    reset: <><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" /></>,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    play: <path d="m8 4 12 8-12 8V4Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    expand: <path d="M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5" />,
  };
function Icon({ name }: { name: IconName }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

type Task = { id: string; title: string; project: string; prompt: string; summary: string; bullets: string[]; file: string; code: string[]; removed: string; added: string };
const tasks: Task[] = [
  { id: "rust", title: "Refactor the codebase to Rust", project: "sndbx", prompt: "Refactor the streaming buffer. Keep it fast, keep it simple.", summary: "Made two performance changes:", bullets: ["Removed repeated buffer copying during streamed responses.", "Reused the render buffer instead of allocating on every frame."], file: "stream.rs", code: ["impl StreamBuffer {", "    pub fn push(&mut self, chunk: &str) {", "        self.pending.push_str(chunk);", "    }", "}"], removed: "let next = format!(\"{buffer}{chunk}\");", added: "buffer.push_str(chunk);" },
  { id: "landing", title: "Build a better landing page", project: "napster", prompt: "Make the landing page feel a little more alive.", summary: "The landing page has a new rhythm:", bullets: ["Added an interactive product preview that stays connected to the story.", "Kept the layout light, accessible, and comfortable on smaller screens."], file: "page.tsx", code: ["export default function Home() {", "  return (", "    <main>", "      <WorkspacePreview />", "    </main>", "  );", "}"], removed: '<img src="preview.png" />', added: "<WorkspacePreview interactive />" },
  { id: "auth", title: "Fix the sign-in redirect", project: "GTX", prompt: "Keep people on their original page after sign-in.", summary: "Sign-in now brings you back to where you started:", bullets: ["Preserved the requested path through the authentication flow.", "Validated return URLs so redirects stay on the same origin."], file: "auth.ts", code: ["export function returnPath(url: URL) {", "  const next = url.searchParams.get('next');", "  return next?.startsWith('/')", "    ? next", "    : '/workspace';", "}"], removed: "redirect('/');", added: "redirect(safeReturnPath);" },
];
const steps = ["Reading project files", "Tracing the current implementation", "Making a focused change", "Checking the result"];
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function NapWorkspaceDemo() {
  const windowRef = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("rust");
  const [draft, setDraft] = useState(false);
  const [agent, setAgent] = useState("Claude Code");
  const [sidebar, setSidebar] = useState(true);
  const [review, setReview] = useState(true);
  const [terminal, setTerminal] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [committed, setCommitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>(["Nap demo terminal · type help to explore"]);
  const [notice, setNotice] = useState("");
  const [taskOrder, setTaskOrder] = useState(tasks.map(task => task.id));
  const [dragTask, setDragTask] = useState<string | null>(null);
  const [leftWidth, setLeftWidth] = useState(23);
  const [rightWidth, setRightWidth] = useState(27);
  const task = tasks.find(item => item.id === activeId) ?? tasks[0];
  const selectedAgent = codingAgents.find(item => item.name === agent) ?? codingAgents[0];
  const files = [task.file, "workspace.ts", "package.json"];
  const running = !draft && phase < 4;
  const drag = useRef<{ kind: "window" | "left" | "right"; x: number; y: number; startX: number; startY: number; width: number } | null>(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReducedMotion(media.matches); if (media.matches) setPhase(4); };
    sync();
    media.addEventListener("change", sync);
    let inView = false;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateVisibility(); }, { threshold: .15 });
    const phone = window.matchMedia("(max-width: 600px)");
    const syncPanels = () => { setSidebar(!phone.matches); setReview(!phone.matches); };
    syncPanels();
    phone.addEventListener("change", syncPanels);
    if (windowRef.current) observer.observe(windowRef.current);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { phone.removeEventListener("change", syncPanels); media.removeEventListener("change", sync); observer.disconnect(); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);

  useEffect(() => {
    if (!playing || !visible || minimized || !running || reducedMotion) return;
    const timer = window.setTimeout(() => setPhase(value => Math.min(4, value + 1)), 1250);
    return () => window.clearTimeout(timer);
  }, [phase, playing, visible, minimized, running, reducedMotion]);

  useEffect(() => {
    if (submitted && chat.current) chat.current.scrollTop = chat.current.scrollHeight;
  }, [phase, submitted]);

  function startTask(id: string) {
    setDraft(false); setActiveId(id); setPhase(reducedMotion ? 4 : 0); setPlaying(true);
    setCommitted(false); setSubmitted(""); setShowDiff(false); setSelectedFile(0); setNotice("");
    if (window.matchMedia("(max-width: 600px)").matches) setSidebar(false);
  }
  function reset() {
    startTask("rust"); setAgent("Claude Code"); setSidebar(!window.matchMedia("(max-width: 600px)").matches); setReview(!window.matchMedia("(max-width: 600px)").matches); setTerminal(true);
    setMinimized(false); setExpanded(false); setQuery(""); setSearching(false); setPrompt("");
    setOutput(["Nap demo terminal · type help to explore"]); setCommand("");
    setLeftWidth(23); setRightWidth(27); setTaskOrder(tasks.map(item => item.id));
    position.current = { x: 0, y: 0 };
    if (windowRef.current) windowRef.current.style.transform = "translate(0px, 0px)";
  }
  function newTask() {
    setDraft(true); setPhase(4); setPrompt(""); setSubmitted(""); setCommitted(false);
    setNotice(""); setReview(false);
    if (window.matchMedia("(max-width: 600px)").matches) setSidebar(false);
  }
  function send(event: FormEvent) {
    event.preventDefault(); if (!prompt.trim() || running) return;
    setDraft(false); setSubmitted(prompt.trim()); setPrompt(""); setPhase(reducedMotion ? 4 : 0); setPlaying(true); setCommitted(false); setNotice("");
  }
  function runCommand(event: FormEvent) {
    event.preventDefault();
    const value = command.trim(); if (!value) return;
    const replies: Record<string, string[]> = {
      help: ["Try: npm test · git status · pwd · clear", "This terminal is a local demo. No commands run on your machine."],
      "npm test": ["✓ buffer appends streamed chunks", "✓ project context is preserved", "✓ review shows changed files", "3 tests passed (demo)"],
      "git status": [committed ? "On branch main · working tree clean" : `On branch main · 3 modified files\n  ${task.file}\n  workspace.ts\n  package.json`],
      pwd: [`~/Projects/${task.project}`],
    };
    setOutput(lines => value === "clear" ? [] : [...lines.slice(-12), `$ ${value}`, ...(replies[value] ?? ["Try help for the available demo commands."])]);
    setCommand("");
  }
  function beginDrag(event: PointerEvent<HTMLElement>, kind: "window" | "left" | "right") {
    if (event.button !== 0 || (kind === "window" && (event.target as HTMLElement).closest("button,select,input"))) return;
    event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { kind, x: event.clientX, y: event.clientY, startX: kind === "window" ? position.current.x : kind === "left" ? leftWidth : rightWidth, startY: position.current.y, width: windowRef.current?.getBoundingClientRect().width ?? 1000 };
  }
  function moveDrag(event: PointerEvent<HTMLElement>) {
    const current = drag.current; if (!current) return;
    const dx = event.clientX - current.x;
    if (current.kind === "window") {
      position.current = { x: clamp(current.startX + dx, -24, 24), y: clamp(current.startY + event.clientY - current.y, -24, 24) };
      if (windowRef.current) windowRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    } else if (current.kind === "left") setLeftWidth(clamp(current.startX + dx / current.width * 100, 16, 29));
    else setRightWidth(clamp(current.startX - dx / current.width * 100, 22, 36));
  }
  const dragHandlers = { onPointerMove: moveDrag, onPointerUp: () => { drag.current = null; }, onPointerCancel: () => { drag.current = null; } };

  return (
    <>
      <div ref={windowRef} className={`nap-demo-window${!playing || !visible ? " is-paused" : ""}${expanded ? " is-expanded" : ""}${minimized ? " is-minimized" : ""}`} style={{ "--demo-left": `${sidebar ? leftWidth : 0}%`, "--demo-right": `${review ? rightWidth : 0}%` } as CSSProperties} role="region" aria-label="Interactive Nap app demo">
        <div className="nd-titlebar" title="Drag to move the Nap window" onPointerDown={event => beginDrag(event, "window")} {...dragHandlers}>
          <div className="nd-window-controls">
            <button className="nd-dot nd-red" title="Reset demo" aria-label="Reset demo" onClick={reset}><Icon name="close" /></button>
            <button className="nd-dot nd-yellow" title="Minimize demo" aria-label="Minimize demo" onClick={() => setMinimized(true)}><span>−</span></button>
            <button className="nd-dot nd-green" title="Expand conversation" aria-label="Expand conversation" aria-pressed={expanded} onClick={() => { setExpanded(!expanded); const show = expanded && !window.matchMedia("(max-width: 600px)").matches; setSidebar(show); setReview(show); }}><Icon name="expand" /></button>
          </div>
          <button className="nd-icon-button" title="Toggle projects" aria-label="Toggle projects" aria-pressed={sidebar} onClick={() => setSidebar(!sidebar)}><Icon name="sidebar" /></button>
          <span className="nd-title">{task.project}<span> / </span>{draft ? "New task" : task.title}</span>
          <span className="nd-demo-badge"><i /> INTERACTIVE DEMO</span>
          <button className="nd-icon-button" aria-label={playing ? "Pause animation" : "Resume animation"} title={playing ? "Pause animation" : "Resume animation"} onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} /></button>
          <button className="nd-icon-button" title="Toggle review panel" aria-label="Toggle review panel" aria-pressed={review} onClick={() => setReview(!review)}><Icon name="review" /></button>
        </div>
        <div className="nd-body">
          <aside className="nd-sidebar" hidden={!sidebar}>
            <div className="nd-profile"><span className="nd-avatar">n</span><strong>Your workspace</strong></div>
            <button className="nd-sidebar-action" onClick={newTask}><Icon name="plus" />New task</button>
            <button className="nd-sidebar-action" onClick={() => setSearching(!searching)} aria-expanded={searching}><Icon name="search" />Search</button>
            {searching ? <input className="nd-search" aria-label="Search demo tasks" placeholder="Find a task…" value={query} onChange={event => setQuery(event.target.value)} autoFocus /> : null}
            <div className="nd-sidebar-label">Spaces <span>drag tasks to reorder</span></div>
            {taskOrder.map(id => tasks.find(item => item.id === id)!).filter(item => `${item.title} ${item.project}`.toLowerCase().includes(query.toLowerCase())).map(item => (
              <div className="nd-project" key={item.id} draggable onDragStart={event => { event.dataTransfer.setData("text/plain", item.id); event.dataTransfer.effectAllowed = "move"; setDragTask(item.id); }} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); if (dragTask) setTaskOrder(order => { const to = order.indexOf(item.id); const next = order.filter(id => id !== dragTask); next.splice(to, 0, dragTask); return next; }); setDragTask(null); }} onDragEnd={() => setDragTask(null)}>
                <button className="nd-project-label" onClick={() => startTask(item.id)}><Icon name="folder" />{item.project}</button>
                <button className={`nd-task${!draft && activeId === item.id ? " is-active" : ""}`} onClick={() => startTask(item.id)} title="Drag to reorder, or use Alt + arrow keys" onKeyDown={event => {
                  if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
                    event.preventDefault(); setTaskOrder(order => { const next = [...order]; const index = next.indexOf(item.id); const to = clamp(index + (event.key === "ArrowUp" ? -1 : 1), 0, next.length - 1); [next[index], next[to]] = [next[to], next[index]]; return next; });
                  }
                }} aria-pressed={!draft && activeId === item.id}><span aria-hidden="true" className={activeId === item.id && running ? "nd-task-spinner" : "nd-task-dots"}>{activeId === item.id && running ? "" : "⠿"}</span><span>{item.title}</span><Icon name="branch" /></button>
              </div>
            ))}
            {query && !tasks.some(item => `${item.title} ${item.project}`.toLowerCase().includes(query.toLowerCase())) ? <p className="nd-empty">No tasks found.</p> : null}
            <div className="nd-sidebar-bottom"><Icon name="branch" />main<span>Local workspace</span></div>
          </aside>
          {sidebar ? <div className="nd-resizer nd-left-resizer" role="separator" tabIndex={0} aria-label="Resize projects panel" aria-orientation="vertical" aria-valuemin={16} aria-valuemax={29} aria-valuenow={Math.round(leftWidth)} onPointerDown={event => beginDrag(event, "left")} {...dragHandlers} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setLeftWidth(value => clamp(value + (event.key === "ArrowLeft" ? -1 : 1), 16, 29)); } }} /> : null}
          <section className="nd-conversation" aria-label="Agent conversation">
            <div className="nd-tabbar"><Icon name="folder" /><span>{draft ? "New task" : task.title}</span><button className="nd-icon-button" title="New task" aria-label="New task" onClick={newTask}><Icon name="plus" /></button></div>
            <div className="nd-chat" ref={chat}>
              {draft ? <div className="nd-new-task"><Icon name="plus" /><h3>What are we building?</h3><p>Pick an agent and give your idea a place to start.</p></div> : <>
              <div className="nd-user-message">{submitted || task.prompt}</div>
              <div className="nd-agent-line"><img src={selectedAgent.logo} width="20" height="20" alt="" /><span>{agent}</span><span className="nd-run-status">{running ? "Working on it" : "Worked for 5s"}</span></div>
              <div className="nd-progress" aria-label={running ? steps[phase] : "Task complete"}>
                {steps.slice(0, Math.min(phase + 1, 4)).map((step, i) => <div className="nd-progress-step" key={step}><span className={running && i === phase ? "nd-task-spinner" : "nd-step-check"}>{!running || i !== phase ? <Icon name="check" /> : null}</span>{step}<span>{i < phase || !running ? "done" : "…"}</span></div>)}
              </div>
              <div className={`nd-response${running ? " is-streaming" : ""}`} key={`${task.id}-${submitted}`}>
                {phase >= 2 ? <><p>{submitted ? "Here’s how I’d approach that in this sample project:" : task.summary}</p><ul>{task.bullets.slice(0, phase >= 3 ? 2 : 1).map(text => <li key={text}>{text}</li>)}</ul></> : <p className="nd-thinking">Getting the full picture<span>…</span></p>}
                {phase >= 4 ? <><p>Build, formatting, and focused checks passed. Changes are ready for your review.</p><div className="nd-change-card"><button onClick={() => { setReview(true); setShowDiff(true); }}><Icon name="chevron" /><span>{committed ? "Changes committed" : "3 files changed"}</span><b>+42</b><em>−18</em></button><button onClick={() => { setReview(true); setShowDiff(true); }}>Review</button><button className="nd-commit" disabled={committed} onClick={() => { setCommitted(true); setNotice("Demo commit created. Your real files are untouched."); }}>{committed ? "Committed ✓" : "Commit"}</button></div></> : null}
              </div>
              </>}
            </div>
            <div className="nd-compose-area">
              {notice ? <p className="nd-notice" role="status">{notice}</p> : null}
              <form className="nd-composer" onSubmit={send}>
                <label className="nd-sr-only" htmlFor="nap-demo-prompt">Message your coding agent</label>
                <textarea id="nap-demo-prompt" placeholder={running ? "Your agent is working…" : "What would you like to build?"} value={prompt} maxLength={500} onChange={event => setPrompt(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} rows={2} />
                <div className="nd-composer-toolbar"><Icon name="folder" /><span>{task.project}</span><span className="nd-compose-spacer" /><img src={selectedAgent.logo} width="18" height="18" alt="" /><select aria-label="Choose coding agent" value={agent} onChange={event => { setAgent(event.target.value); setNotice(`Switched to ${event.target.value}. Same project, same workspace.`); }}>{codingAgents.map(item => <option key={item.name}>{item.name}</option>)}</select><button className="nd-send" type="submit" disabled={!prompt.trim() || running} aria-label="Send demo prompt"><Icon name="arrow" /></button></div>
              </form>
              <div className="nd-compose-foot"><span><Icon name="folder" />{task.project}<Icon name="terminal" />Local</span><span>Sample workspace · no real code runs</span></div>
            </div>
          </section>
          {review ? <div className="nd-resizer nd-right-resizer" role="separator" tabIndex={0} aria-label="Resize review panel" aria-orientation="vertical" aria-valuemin={22} aria-valuemax={36} aria-valuenow={Math.round(rightWidth)} onPointerDown={event => beginDrag(event, "right")} {...dragHandlers} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setRightWidth(value => clamp(value + (event.key === "ArrowLeft" ? 1 : -1), 22, 36)); } }} /> : null}
          <aside className="nd-review" hidden={!review} aria-label="Code review">
            <div className="nd-review-top"><button className={showDiff ? "is-selected" : ""} onClick={() => setShowDiff(!showDiff)}><Icon name="review" />{committed ? "Committed" : "3 files changed"}</button><span><b>+42</b><em>−18</em></span></div>
            <div className="nd-files">{files.map((file, index) => <button key={file} className={showDiff && selectedFile === index ? "is-selected" : ""} onClick={() => { setSelectedFile(index); setShowDiff(true); }}><span className="nd-filetype">{file.endsWith("rs") ? "rs" : file.endsWith("json") ? "{}" : "TS"}</span><span>{file}</span><b>+{[24, 12, 6][index]}</b><em>−{[8, 7, 3][index]}</em></button>)}</div>
            <div className="nd-diff-space">
              {showDiff ? <div className="nd-diff"><div className="nd-diff-heading"><span>{files[selectedFile]}</span><button className="nd-icon-button" aria-label="Close code diff" onClick={() => setShowDiff(false)}><Icon name="close" /></button></div><pre><code>{(selectedFile === 0 ? task.code : selectedFile === 1 ? ["export const workspace = {", "  name: 'Nap',", "  preserveContext: true,", "};"] : ['{', '  "scripts": {', '    "test": "vitest run"', '  }', '}']).map((line, index) => <span className="nd-code-line" key={index}><i>{index + 1}</i>{line}</span>)}<span className="nd-code-line nd-removed">− {selectedFile === 0 ? task.removed : "// previous implementation"}</span><span className="nd-code-line nd-added">+ {selectedFile === 0 ? task.added : "// preserve shared project context"}</span></code></pre></div> : <div className="nd-review-hint"><Icon name="review" /><span>Select a file to explore the changes</span></div>}
            </div>
            <div className="nd-terminal">
              <div className="nd-terminal-tabs"><button className={terminal ? "is-selected" : ""} onClick={() => setTerminal(!terminal)} aria-expanded={terminal}><Icon name="terminal" />Terminal</button><button onClick={() => { setTerminal(true); setOutput(lines => [...lines.slice(-12), "$ npm test", "✓ 3 tests passed (demo)"]); }}>Run tests <Icon name="play" /></button></div>
              {terminal ? <><div className="nd-terminal-output" aria-live="polite">{output.map((line, index) => <div key={index}>{line}</div>)}</div><form onSubmit={runCommand} className="nd-terminal-command"><span>❯</span><input aria-label="Demo terminal command" placeholder="type help" value={command} onChange={event => setCommand(event.target.value)} autoComplete="off" spellCheck={false} /><button type="submit" aria-label="Run demo command"><Icon name="arrow" /></button></form></> : null}
            </div>
          </aside>
        </div>
        <div className="nd-statusbar"><span><i className={running ? "nd-pulse" : ""} />{running ? steps[phase] : committed ? "All changes committed" : "Ready when you are"}</span><button onClick={reset}><Icon name="reset" />Replay demo</button></div>
      </div>
      {minimized ? <button className="nd-restore" onClick={() => setMinimized(false)}><span className="nd-avatar">n</span>Open Nap demo<Icon name="expand" /></button> : null}
    </>
  );
}
