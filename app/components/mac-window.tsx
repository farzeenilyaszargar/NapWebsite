"use client";

import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

// Shared stacking order so the window you grab comes to the front, as on a real desktop.
let topLayer = 10;

type Props = { title: string; children: ReactNode; className?: string; status?: ReactNode; draggable?: boolean };

// A System 7–style window. On fine-pointer screens it can be dragged by its title bar;
// the content renders normally (and on the server), so dragging is purely decorative.
export default function MacWindow({ title, children, className, status, draggable = true }: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [layer, setLayer] = useState<number | undefined>();
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);

  const start = (event: PointerEvent<HTMLDivElement>) => {
    setLayer(++topLayer);
    if (!draggable || event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX - offset.x, y: event.clientY - offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    setOffset({ x: event.clientX - drag.current.x, y: event.clientY - drag.current.y });
  };
  const end = () => { drag.current = null; };

  const style: CSSProperties = { translate: `${offset.x}px ${offset.y}px`, zIndex: layer };
  return (
    <div className={`mac-window${className ? ` ${className}` : ""}`} style={style} onPointerDown={() => setLayer(++topLayer)}>
      <div className={`mac-titlebar${draggable ? " mac-draggable" : ""}`} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
        <span className="mac-close" aria-hidden="true" />
        <span className="mac-title">{title}</span>
      </div>
      <div className="mac-body">{children}</div>
      {status && <div className="mac-status">{status}</div>}
    </div>
  );
}
