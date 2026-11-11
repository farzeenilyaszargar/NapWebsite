"use client";

import { Play, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { createRunner } from "./runner-engine";

export default function NapRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<ReturnType<typeof createRunner> | null>(null);
  const mounted = useRef(false);
  const starting = useRef(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "running" | "over">("idle");
  const [score, setScore] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; game.current?.destroy(); };
  }, []);

  async function act() {
    if (phase === "running") { game.current?.jump(); return; }
    if (starting.current) return;
    starting.current = true;
    setPhase("loading");
    try {
      const { createRunner } = await import("./runner-engine");
      if (!mounted.current || !canvasRef.current) return;
      game.current?.destroy();
      setScore(0);
      game.current = createRunner(canvasRef.current, setScore, (text) => { setReason(text); setPhase("over"); });
      setPhase("running");
      canvasRef.current.focus({ preventScroll: true });
    } catch {
      if (mounted.current) { setReason("The game took a nap. Try again."); setPhase("over"); }
    } finally { starting.current = false; }
  }

  return (
    <section className="runner" aria-label="Scope Creep game">
      <div className="runner-hud"><span>scope creep</span><span>shipped <b>{String(score).padStart(2, "0")}</b></span></div>
      <canvas ref={canvasRef} className="runner-canvas" width={720} height={230} tabIndex={0} role="button"
        aria-label="Scope Creep. Press Space, Enter, or tap to start and jump over interruptions."
        onPointerDown={(event) => { if (event.button === 0) void act(); }}
        onKeyDown={(event) => { if (event.code === "Space" || event.code === "Enter" || event.code === "ArrowUp") { event.preventDefault(); if (!event.repeat) void act(); } }} />
      {(phase === "idle" || phase === "loading") && <div className="runner-preview" aria-hidden="true"><Image unoptimized src="/nap-ghost.webp" width={34} height={38} alt="" /><span /></div>}
      {phase !== "running" && (
        <div className="runner-menu">
          <p role="status">{phase === "over" ? reason.includes("game took") ? reason : `Stopped by “${reason}”. Classic.` : "Just ship it. What could possibly get in the way?"}</p>
          <button className="runner-start" onClick={() => void act()} disabled={phase === "loading"}>
            {phase === "over" ? <RotateCcw size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            {phase === "loading" ? "One second…" : phase === "over" ? "Try again" : "Ship it"}
          </button>
        </div>
      )}
    </section>
  );
}
