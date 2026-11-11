"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { COLS, ROWS, maze, initialDots, point, powerCells, type Direction } from "./ghost-shift/map";
import type { GhostShift } from "./ghost-shift/model";

type View = { score: number; lives: number; level: number; phase: string; message: string; power: number };
const initial: View = { score: 0, lives: 3, level: 1, phase: "idle", message: "A quiet shift. Allegedly.", power: 0 };
const keys: Record<string, Direction> = { ArrowUp: "up", w: "up", ArrowDown: "down", s: "down", ArrowLeft: "left", a: "left", ArrowRight: "right", d: "right" };

function Preview() {
  return <svg className="maze-preview" viewBox={`0 0 ${COLS * 20} ${ROWS * 20}`} aria-hidden="true">
    <g stroke="#3f4145" strokeWidth="1.15" strokeLinecap="round">
      {maze.flatMap((row, y) => row.flatMap((wall, x) => {
        if (!wall) return [];
        const l = x * 20, t = y * 20;
        let d = "";
        if (y && !maze[y - 1][x]) d += `M${l} ${t}h20`;
        if (y < ROWS - 1 && !maze[y + 1][x]) d += `M${l} ${t + 20}h20`;
        if (x && !maze[y][x - 1]) d += `M${l} ${t}v20`;
        if (x < COLS - 1 && !maze[y][x + 1]) d += `M${l + 20} ${t}v20`;
        return d ? [<path key={`${x}-${y}`} d={d} />] : [];
      }))}
    </g>
    <g fill="#777875">{[...initialDots()].map(index => { const p = point(index); return <circle key={index} cx={p.x * 20 + 10} cy={p.y * 20 + 10} r="1.4" />; })}</g>
    <g fill="#e7ddc2">{powerCells.map(index => { const p = point(index); return <circle key={index} cx={p.x * 20 + 10} cy={p.y * 20 + 10} r="3.5" />; })}</g>
    <g transform="translate(250 310)"><path fill="#f1f0eb" d="M-7.5 6v-7c0-10 15-10 15 0v7q-2 4-4 1-3 4-5 0-4 4-6-1Z" /><g fill="#22242b"><ellipse cx="-3" cy="-1" rx="1.3" ry="1.9" /><ellipse cx="3" cy="-1" rx="1.3" ry="1.9" /></g></g>
  </svg>;
}

export default function NapMaze() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<GhostShift | null>(null);
  const render = useRef<typeof import("./ghost-shift/render").draw | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const muted = useRef(true);
  const lastNote = useRef(0);
  const pausedRef = useRef(false);
  const [view, setView] = useState<View>(initial);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [best, setBest] = useState(0);
  const [error, setError] = useState("");
  const touch = useRef({ x: 0, y: 0 });
  const signature = useRef("");

  function pause(value: boolean) { pausedRef.current = value; setPaused(value); }
  async function start(next = false) {
    if (loading) return;
    setLoading(true); setError("");
    try {
      const [model, graphics] = await Promise.all([import("./ghost-shift/model"), import("./ghost-shift/render")]);
      game.current = next && game.current ? game.current.nextLevel() : new model.GhostShift();
      render.current = graphics.draw; signature.current = "";
      try { setBest(Number(localStorage.getItem("nap-ghost-shift-best")) || 0); } catch {}
      pause(false); setStarted(true);
      requestAnimationFrame(() => canvas.current?.focus({ preventScroll: true }));
    } catch { setError("Couldn't start the shift. Try again?"); }
    finally { setLoading(false); }
  }
  function steer(direction: Direction) { game.current?.steer(direction); canvas.current?.focus({ preventScroll: true }); }
  function toggleSound() {
    const enabled = !sound;
    if (enabled) { audio.current ??= new AudioContext(); void audio.current.resume(); }
    muted.current = !enabled; setSound(enabled);
  }
  useEffect(() => {
    if (!started || !canvas.current) return;
    const element = canvas.current;
    const ctx = element.getContext("2d");
    if (!ctx) return;
    let raf = 0, previous = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paint() {
      if (!game.current || !render.current || !ctx) return;
      const ratio = element.width / 500;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      render.current(ctx, game.current, reduced);
    }
    const resize = new ResizeObserver(() => {
      const width = element.getBoundingClientRect().width;
      element.width = Math.round(width * Math.min(devicePixelRatio || 1, 2)); element.height = Math.round(element.width * 340 / 500);
      paint();
    });
    resize.observe(element);
    function tick(time: number) {
      const current = game.current;
      if (!current) return;
      const events = current.update(previous ? Math.min((time - previous) / 1000, .05) : 0);
      previous = time;
      if (events.length && !muted.current && audio.current && time - lastNote.current > 100) {
        lastNote.current = time;
        const ac = audio.current, oscillator = ac.createOscillator(), gain = ac.createGain();
        oscillator.type = "sine"; oscillator.frequency.value = events.includes("hit") ? 110 : events.includes("power") ? 660 : events.includes("eat") ? 880 : 330 + current.score % 90;
        gain.gain.setValueAtTime(.035, ac.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .09);
        oscillator.connect(gain); gain.connect(ac.destination); oscillator.start(); oscillator.stop(ac.currentTime + .1);
      }
      const message = current.phase === "ready" ? "Clocking in..." : current.phase === "dying" ? "A minor workplace incident." : current.toastLeft > 0 ? current.toast : "On the clock.";
      const snapshot: View = { score: current.score, lives: current.lives, level: current.level, phase: current.phase, message, power: Math.ceil(current.powerLeft) };
      const sig = JSON.stringify(snapshot);
      if (signature.current !== sig) { signature.current = sig; setView(snapshot); }
      if (current.phase === "over" || current.phase === "won") {
        try { const record = Math.max(Number(localStorage.getItem("nap-ghost-shift-best")) || 0, current.score); localStorage.setItem("nap-ghost-shift-best", String(record)); setBest(record); } catch {}
      }
      paint();
      if (!pausedRef.current && current.phase !== "over" && current.phase !== "won") raf = requestAnimationFrame(tick);
    }
    if (!paused) raf = requestAnimationFrame(tick); else paint();
    function hide() { if (document.hidden) { pausedRef.current = true; setPaused(true); } }
    document.addEventListener("visibilitychange", hide);
    const visibility = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) { pausedRef.current = true; setPaused(true); } }, { threshold: .15 });
    visibility.observe(element);
    return () => { cancelAnimationFrame(raf); resize.disconnect(); visibility.disconnect(); document.removeEventListener("visibilitychange", hide); };
  }, [started, paused, loading]);
  useEffect(() => () => { void audio.current?.close(); }, []);

  const finished = view.phase === "over" || view.phase === "won";
  const overlay = !started || paused || finished;
  return <section className="ghost-shift" aria-label="Ghost Shift arcade game" data-phase={paused ? "paused" : view.phase}>
    <div className="maze-hud">
      <div><span className="maze-label">GHOST SHIFT</span><span className="maze-score">{String(view.score).padStart(4, "0")}</span></div>
      <div className="maze-tools"><span className="maze-best">BEST {String(best).padStart(4, "0")}</span>
        <button type="button" className="maze-icon" aria-label={sound ? "Mute game" : "Enable game sound"} title={sound ? "Mute game" : "Enable game sound"} onClick={toggleSound}>{sound ? <Volume2 size={15} /> : <VolumeX size={15} />}</button>
        <button type="button" className="maze-icon" disabled={!started || finished} aria-label={paused ? "Resume game" : "Pause game"} title={paused ? "Resume game" : "Pause game"} onClick={() => pause(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
      </div>
    </div>
    <div className="maze-board">
      {!started && <Preview />}
      <canvas ref={canvas} className="maze-canvas" style={{ visibility: started ? "visible" : "hidden" }} width="500" height="340" tabIndex={0} role="application" aria-label="Ghost Shift. Use arrow keys or W A S D to steer the white ghost. Collect every dot, avoid rivals, and use large power dots to eat them. Space pauses. Swipe or use direction buttons on touch screens."
        onKeyDown={event => {
          const direction = keys[event.key] ?? keys[event.key.toLowerCase()];
          if (direction) { event.preventDefault(); steer(direction); }
          else if ([" ", "Enter", "Escape"].includes(event.key)) { event.preventDefault(); if (!started || finished) void start(view.phase === "won"); else pause(!paused); }
        }}
        onTouchStart={event => { const p = event.touches[0]; touch.current = { x: p.clientX, y: p.clientY }; }}
        onTouchMove={event => { const p = event.touches[0], dx = p.clientX - touch.current.x, dy = p.clientY - touch.current.y; if (Math.max(Math.abs(dx), Math.abs(dy)) > 12) { steer(Math.abs(dx) > Math.abs(dy) ? dx > 0 ? "right" : "left" : dy > 0 ? "down" : "up"); touch.current = { x: p.clientX, y: p.clientY }; } }} />
      {overlay && <div className="maze-overlay"><div className="maze-menu">
        <h2>{!started ? "Office hours are over." : paused ? "Taking a breather." : view.phase === "won" ? "Shift complete." : "You have been ghosted."}</h2>
        <p>{error || (!started ? "The ghosts didn't get the memo." : paused ? "Your inbox can wait." : view.phase === "won" ? "Inbox zero. For about five minutes." : `${view.score} points. Absolutely no work done.`)}</p>
        <button className="maze-play" disabled={loading} onClick={() => { if (paused && !finished) { pause(false); canvas.current?.focus(); } else void start(view.phase === "won"); }}>
          {finished && view.phase === "over" ? <RotateCcw size={13} /> : <Play size={13} fill="currentColor" />}{loading ? "Clocking in..." : paused && !finished ? "Back to it" : view.phase === "won" ? "Next shift" : started ? "One more shift" : "Clock in"}
        </button>
      </div></div>}
    </div>
    <div className="maze-bottom"><span aria-live="polite">{started ? paused ? "On a break." : view.message : initial.message}</span><span aria-label={`${view.lives} lives remaining`}>{Array.from({ length: view.lives }, (_, i) => <svg key={i} width="11" height="13" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true"><path d="M1 9C1-2 15-2 15 9v6q-2 3-4 0-3 4-5 0-3 4-5 0Z" /></svg>)}<span className="shift-level">{view.power > 0 ? `${view.power}s` : `SHIFT ${view.level}`}</span></span></div>
    <div className="maze-directions" aria-label="Game directions">{([["left", ArrowLeft], ["up", ArrowUp], ["down", ArrowDown], ["right", ArrowRight]] as const).map(([direction, Icon]) => <button key={direction} type="button" aria-label={`Move ${direction}`} title={`Move ${direction}`} disabled={!started || paused || finished} onClick={() => steer(direction)} onPointerDown={event => { event.preventDefault(); steer(direction); }}><Icon size={17} /></button>)}</div>
  </section>;
}
