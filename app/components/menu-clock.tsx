"use client";

import { useEffect, useState } from "react";

// The menu-bar clock. It renders nothing on the server so the visitor's local time never mismatches.
export default function MenuClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 15000);
    return () => window.clearInterval(timer);
  }, []);
  return <time className="nap-menu-clock" aria-hidden="true">{time}</time>;
}
