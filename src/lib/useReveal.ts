import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./scrollState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals every `.reveal-line > span` and `[data-fade]` inside the ref'd
 * section as it enters the viewport, synchronized with ScrollTrigger.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>(".reveal-line > span");
      const fades = el.querySelectorAll<HTMLElement>("[data-fade]");

      if (lines.length) {
        gsap.to(lines, {
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 72%" },
        });
      }
      if (fades.length) {
        gsap.fromTo(
          fades,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 65%" },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
