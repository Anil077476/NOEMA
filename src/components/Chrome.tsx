import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollState } from "../lib/scrollState";

/** Fixed chrome: wordmark, chapter index, and a thin reading-progress rule. */
export default function Chrome() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${scrollState.progress})`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference">
        <a href="#genesis" className="font-display text-xl tracking-[0.18em] text-bone">
          NOEMA
        </a>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] tracking-[0.25em] uppercase text-mist">
          <a href="#craft" className="hover:text-bone transition-colors">Craft</a>
          <a href="#method" className="hover:text-bone transition-colors">Method</a>
          <a href="#work" className="hover:text-bone transition-colors">Work</a>
          <a href="#contact" className="hover:text-bone transition-colors">Begin</a>
        </nav>
      </header>
      <div className="fixed top-0 inset-x-0 z-40 h-px bg-champagne/80 origin-left scale-x-0" ref={bar} />
    </>
  );
}
