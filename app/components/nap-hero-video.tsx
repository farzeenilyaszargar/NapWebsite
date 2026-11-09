"use client";

import { useEffect, useRef } from "react";

export default function NapHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void video.play().catch(() => {});
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src="/nap-hero-demo-a911dd7b.mp4"
      poster="/nap-hero-poster-72fd04c1.webp"
      width={1920}
      height={1080}
      aria-label="Nap workspace demo showing coding agents working in project threads"
      preload="none"
      controls
      muted
      loop
      playsInline
    />
  );
}
