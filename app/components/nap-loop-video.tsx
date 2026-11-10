"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; pauseOffscreen?: boolean; startAt?: number; playbackRate?: number };

export default function NapLoopVideo({ src, poster, label, pauseOffscreen = false, startAt = 0, playbackRate = 1 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (motion.matches || connection?.saveData) return;

    let observer: IntersectionObserver | undefined;
    const start = () => {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.2 || motion.matches || connection?.saveData) {
          if (pauseOffscreen) video.pause();
          return;
        }
        if (!pauseOffscreen) observer?.disconnect();
        if (video.getAttribute("src") !== src) {
          video.defaultPlaybackRate = playbackRate;
          video.src = src;
          video.currentTime = startAt;
        }
        video.playbackRate = playbackRate;
        void video.play().catch(() => {});
      }, { threshold: 0.2 });
      observer.observe(video);
    };
    // Let the poster and initial page assets finish before fetching motion.
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      observer?.disconnect();
    };
  }, [src, pauseOffscreen, startAt, playbackRate]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      width={1920}
      height={1080}
      aria-label={label}
      preload="none"
      muted
      loop
      playsInline
    />
  );
}
