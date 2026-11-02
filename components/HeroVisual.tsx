"use client";

import dynamic from "next/dynamic";

// Three.js is the heaviest part of the site; keep it out of the initial bundle
// and only fetch it once the hero is mounted.
const FloatingNodes = dynamic(() => import("./FloatingNodes").then((mod) => mod.FloatingNodes), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="hero-canvas" />,
});

export function HeroVisual() {
  return <FloatingNodes />;
}
