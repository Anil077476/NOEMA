import { useReveal } from "../lib/useReveal";

export default function Genesis() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="genesis" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16">
      <p className="eyebrow mb-6" data-fade>Chapter 00 — Genesis</p>
      <h1 className="display-xl max-w-5xl">
        <span className="reveal-line"><span>Intelligence,</span></span>
        <span className="reveal-line"><span>made <em className="italic text-champagne">tangible</em>.</span></span>
      </h1>
      <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <p className="max-w-md text-mist leading-relaxed" data-fade>
          NOEMA is an AI agency. We design generative products, intelligent
          interfaces, and models tuned to your world — systems that feel less
          like software and more like something alive.
        </p>
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-mist" data-fade>
          Scroll to enter ↓
        </p>
      </div>
    </section>
  );
}
