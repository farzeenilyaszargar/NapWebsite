"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiquidField = dynamic(
  () => import("./liquid-field").catch(() => ({ default: () => null })),
  { ssr: false },
);

export default function DeferredLiquidField() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let activated = false;
    function eligible() { return desktop.matches && !reduced.matches && !connection?.saveData; }
    function activate(event: PointerEvent) {
      if (event.pointerType === "touch" || document.hidden || !eligible()) return;
      // Mobile and touch devices never request the optional renderer.
      window.removeEventListener("pointermove", activate);
      activated = true;
      setReady(true);
    }
    function update() {
      window.removeEventListener("pointermove", activate);
      if (!eligible()) {
        activated = false;
        setReady(false);
      } else if (!activated) {
        window.addEventListener("pointermove", activate, { passive: true });
      }
    }
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      window.removeEventListener("pointermove", activate);
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  return ready ? <LiquidField /> : null;
}
