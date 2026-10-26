"use client";

import { useEffect, useRef, useState } from "react";

type Dot = { x: number; y: number; from: number; to: number; start: number; duration: number };
const brightness = () => .2 + Math.random() * .8;
const duration = () => 1800 + Math.random() * 3400;

export default function AnimatedHalftone({ text, className }: { text: string; className: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    const context = surface.getContext("2d");
    if (!context) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const forced = matchMedia("(forced-colors: active)");
    let dots: Dot[] = [];
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    let radius = 1.45;
    let width = 0;
    let height = 0;
    let alive = true;

    function draw(now: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const dot of dots) {
        if (now - dot.start >= dot.duration) {
          dot.from = dot.to;
          dot.to = brightness();
          dot.start = now;
          dot.duration = duration();
        }
        const progress = Math.max(0, Math.min(1, (now - dot.start) / dot.duration));
        const eased = progress * progress * (3 - 2 * progress);
        context.fillStyle = `rgba(0,0,0,${dot.from + (dot.to - dot.from) * eased})`;
        context.beginPath();
        context.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    function tick(now: number) {
      // Smooth fades at 30fps, with no React updates or DOM reads in the loop.
      if (now - lastFrame >= 1000 / 30) {
        draw(now);
        lastFrame = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      if (!alive || reduced.matches || forced.matches || !dots.length) {
        setReady(false);
        return;
      }
      setReady(true);
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }

    function rebuild() {
      if (!element || !surface || !context || !alive) return;
      if (reduced.matches || forced.matches) { sync(); return; }
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      const scale = Math.min(devicePixelRatio || 1, 2);
      surface.width = Math.ceil(width * scale);
      surface.height = Math.ceil(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);

      const mask = document.createElement("canvas");
      mask.width = Math.ceil(width);
      mask.height = Math.ceil(height);
      const ink = mask.getContext("2d", { willReadFrequently: true });
      if (!ink) return;
      ink.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ink.textBaseline = "alphabetic";
      ink.fillStyle = "#000";
      const metrics = ink.measureText(text);
      const ascent = metrics.fontBoundingBoxAscent ?? parseFloat(style.fontSize) * .8;
      const descent = metrics.fontBoundingBoxDescent ?? parseFloat(style.fontSize) * .2;
      const baseline = (height - ascent - descent) / 2 + ascent;
      const spacing = parseFloat(style.letterSpacing) || 0;
      if (Reflect.has(ink, "letterSpacing")) {
        ink.letterSpacing = `${spacing}px`;
        ink.fillText(text, 0, baseline);
      } else {
        // Preserve tracking on engines without canvas letter-spacing support.
        Array.from(text).forEach((letter, index) => {
          const prefix = text.slice(0, index + 1);
          ink.fillText(letter, ink.measureText(prefix).width - ink.measureText(letter).width + index * spacing, baseline);
        });
      }
      const pixels = ink.getImageData(0, 0, mask.width, mask.height).data;
      const step = innerWidth <= 700 ? 3 : 4;
      radius = innerWidth <= 700 ? 1.1 : 1.45;
      const now = performance.now();
      dots = [];
      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          if (pixels[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3] < 100) continue;
          const period = duration();
          dots.push({ x, y, from: brightness(), to: brightness(), start: now - Math.random() * period, duration: period });
        }
      }
      draw(now);
      sync();
    }

    const resize = new ResizeObserver(rebuild);
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(element);
    reduced.addEventListener("change", rebuild);
    forced.addEventListener("change", rebuild);
    document.addEventListener("visibilitychange", sync);
    rebuild();
    void document.fonts.ready.then(() => { if (alive) rebuild(); });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      reduced.removeEventListener("change", rebuild);
      forced.removeEventListener("change", rebuild);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [text]);

  return (
    <span ref={host} className={className} data-halftone-ready={ready}>
      <span className="nap-halftone-fallback">{text}</span>
      <canvas ref={canvas} aria-hidden="true" className="nap-halftone-canvas" />
    </span>
  );
}
