"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { FolderOpen, MessagesSquare, GitCompareArrows } from "lucide-react";
import NapProductImage from "./nap-product-image";
import styles from "./nap-workflow-preview.module.css";

const views = [
  { id: "projects", name: "Projects", icon: FolderOpen, title: "Find the work. Keep its context.", description: "Keep tasks and conversations with the project they belong to. Return to the right codebase without hunting through terminal windows.", alt: "Nap project sidebar showing separate project spaces and their conversations." },
  { id: "conversations", name: "Conversations", icon: MessagesSquare, title: "A conversation you can follow.", description: "Give your agent a task, read its response, and ask a follow-up. The conversation stays alongside the work, not in a separate app.", alt: "An agent conversation in Nap, showing its response and a code-change summary." },
  { id: "changes", name: "Changes", icon: GitCompareArrows, title: "See the changes before you commit.", description: "Keep changed files and review controls in view. Inspect the result and decide what to keep before moving on to the next task.", alt: "Nap code review with changed files, line counts, and an integrated terminal." },
] as const;

export default function NapWorkflowPreview() {
  const [active, setActive] = useState(1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % views.length;
    else if (event.key === "ArrowLeft") next = (index + views.length - 1) % views.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = views.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className={styles.preview}>
      <div className={styles.tabs} role="tablist" aria-label="Explore the Nap workspace">
        {views.map(({ id, name, icon: Icon }, index) => <button key={id} ref={(node) => { buttons.current[index] = node; }} id={`tab-${id}`} role="tab" aria-selected={active === index} aria-controls={`panel-${id}`} tabIndex={active === index ? 0 : -1} type="button" onClick={() => setActive(index)} onKeyDown={(event) => navigate(event, index)}><Icon size={17} strokeWidth={1.65} aria-hidden="true" />{name}</button>)}
      </div>
      {views.map(({ id, title, description, alt }, index) => <div key={id} className={styles.panel} role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={active !== index} tabIndex={0}>
        <div className={styles.panelCopy}><h3>{title}</h3><p>{description}</p></div>
        <figure className={`${styles.frame} ${styles[id]}`}><NapProductImage alt={alt} sizes="(max-width: 700px) 170vw, 1600px" /></figure>
      </div>)}
    </div>
  );
}
