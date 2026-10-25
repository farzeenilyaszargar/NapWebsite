"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import NapProductImage from "./nap-product-image";
import "./nap-workspace-demo.css";

function Preview() {
  return <NapProductImage eager alt="Interactive Nap preview: project spaces, agent conversations, code review, and a terminal. The demo loads when it comes into view." sizes="(max-width: 900px) 180vw, 92vw" />;
}
const Workspace = dynamic(() => import("./nap-workspace-demo"), { ssr: false, loading: Preview });

export default function NapInteractiveDemo() {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "250px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="nap-demo-stage" ref={container}>
      {ready ? <Workspace /> : <Preview />}
    </div>
  );
}
