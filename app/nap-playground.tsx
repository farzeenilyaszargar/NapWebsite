"use client";

import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const agents = [
  { name: "Codex", icon: "/codex.webp", task: "On the refactor.", className: "agent-codex" },
  { name: "Claude Code", icon: "/claude.webp", task: "Checking the work.", className: "agent-claude" },
  { name: "Cursor", icon: "/cursor.webp", task: "One more fix.", className: "agent-cursor" },
];

export default function NapPlayground() {
  const [awake, setAwake] = useState(false);
  const [wakeCount, setWakeCount] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const origin = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!awake) return;
    const timeout = setTimeout(() => setAwake(false), 5000);
    return () => clearTimeout(timeout);
  }, [awake, wakeCount]);

  function wake() {
    if (moved.current) { moved.current = false; return; }
    setAwake(true);
    setWakeCount((count) => count + 1);
  }
  function pickUp(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    origin.current = { x: event.clientX, y: event.clientY };
    moved.current = false;
    setDragging(true);
  }
  function drag(event: PointerEvent<HTMLButtonElement>) {
    if (!origin.current) return;
    const x = event.clientX - origin.current.x;
    const y = event.clientY - origin.current.y;
    if (Math.abs(x) + Math.abs(y) > 5) moved.current = true;
    const limit = Math.min(130, window.innerWidth * 0.22);
    setOffset({ x: Math.max(-limit, Math.min(limit, x)), y: Math.max(-70, Math.min(80, y)) });
  }
  function release() {
    if (!origin.current) return;
    origin.current = null;
    setDragging(false);
    setOffset({ x: 0, y: 0 });
    if (moved.current) {
      setAwake(true);
      setWakeCount((count) => count + 1);
    }
  }
  return (
    <section className={`playground${awake ? " is-awake" : ""}`} aria-label="Nap playground">
      <div className="playground-center">
        <div className="ghost-position" style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.x / 9}deg)`, transition: dragging ? "none" : "transform 650ms cubic-bezier(.22,1.45,.4,1)" }}>
          <button className={`ghost-button${dragging ? " is-dragging" : ""}`} aria-label="Wake Nap" aria-pressed={awake} title="Wake Nap"
            onClick={wake} onPointerDown={pickUp} onPointerMove={drag} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
            <Image unoptimized src="/nap-ghost.webp" alt="" width={128} height={143} draggable={false} />
          </button>
          <span className="sleep-mark" aria-hidden="true">z<span>z</span></span>
        </div>
        {awake && agents.map((agent) => (
          <div key={agent.name + wakeCount} className={`agent-note ${agent.className}`} aria-hidden="true">
            <Image unoptimized className={agent.name === "Cursor" ? "cursor-mark" : ""} src={agent.icon} alt="" width={19} height={19} />
            <div><strong>{agent.name}</strong><span>{agent.task}</span></div><i />
          </div>
        ))}
      </div>
      <div className="playground-caption">
        <p role="status">{awake ? "Fine. I'll do it." : "Off the clock."}</p>
        <button className="reset-button" onClick={() => { setAwake(false); setOffset({ x: 0, y: 0 }); }} aria-label="Reset playground" title="Reset" disabled={!awake}>
          <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
