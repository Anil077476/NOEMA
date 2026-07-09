// Shared mutable scroll state — read every frame by the WebGL scene,
// written by ScrollTrigger. Avoids React re-renders at 60fps.
export const scrollState = {
  progress: 0, // 0..1 across the full page
  velocity: 0,
  chapter: 0, // 0..4
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
