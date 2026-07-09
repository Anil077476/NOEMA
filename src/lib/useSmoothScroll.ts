import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState, prefersReducedMotion } from "./scrollState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Boots Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
 * Also writes global page progress + velocity into scrollState so the
 * WebGL scene can react without React re-renders.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Respect reduced motion: native scrolling, still track progress.
      const onScroll = () => {
        const max = document.body.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      scrollState.velocity = e.velocity ?? 0;
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const progressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    return () => {
      progressTrigger.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
