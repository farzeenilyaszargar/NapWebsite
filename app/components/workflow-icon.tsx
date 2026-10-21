type Props = { kind: "project" | "agent" | "work" };

// Lightweight SVG loops: no animation runtime or image downloads.
export default function WorkflowIcon({ kind }: Props) {
  return (
    <span className={`nap-step-symbol nap-step-motion nap-step-motion-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 96 72" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {kind === "project" && (
          <>
            <path d="M14 56V24a5 5 0 0 1 5-5h15l7 7h34a5 5 0 0 1 5 5v4" opacity=".4" />
            <g className="nap-project-sheet">
              <rect x="43" y="9" width="25" height="33" rx="4" fill="var(--nap-background)" />
              <path d="M49 18h13m-13 7h10m-10 7h7" opacity=".6" />
            </g>
            <path d="M14 35h68l-8 23a5 5 0 0 1-4.7 3.4H20a6 6 0 0 1-6-6V35Z" fill="var(--nap-background)" />
            <path className="nap-project-tab" d="M24 48h18" opacity=".65" />
          </>
        )}
        {kind === "agent" && (
          <>
            <g opacity=".55">
              <circle cx="20" cy="24" r="6" />
              <circle cx="48" cy="24" r="6" />
              <circle cx="76" cy="24" r="6" />
            </g>
            <g opacity=".3">
              <path d="M20 42v2a6 6 0 0 0 6 6h44a6 6 0 0 0 6-6v-2M48 42v8" />
              <path d="M48 50v8" />
            </g>
            <rect className="nap-agent-selection" x="7" y="11" width="26" height="26" rx="13" />
            <circle className="nap-agent-signal" cx="48" cy="49" r="2" fill="currentColor" stroke="none" />
            <path d="M39 62h18" opacity=".65" />
          </>
        )}
        {kind === "work" && (
          <>
            <rect x="14" y="10" width="65" height="49" rx="7" opacity=".45" />
            <path d="M32 10v49" opacity=".25" />
            <path d="M21 24h5m-5 11h5m-2.5-2.5v5m-2.5 8.5h5" opacity=".4" />
            <path className="nap-review-line nap-review-line-first" pathLength="1" d="M41 24h25" />
            <path className="nap-review-line nap-review-line-second" pathLength="1" d="M41 35h18" />
            <path className="nap-review-line nap-review-line-third" pathLength="1" d="M41 46h12" />
            <g className="nap-review-confirmation">
              <circle cx="75" cy="55" r="11" fill="var(--nap-background)" />
              <path className="nap-review-check" pathLength="1" d="m70 55 3.5 3.5 6.5-7" />
            </g>
          </>
        )}
      </svg>
    </span>
  );
}
