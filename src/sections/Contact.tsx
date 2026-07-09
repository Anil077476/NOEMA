import { useReveal } from "../lib/useReveal";

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-32">
      <p className="eyebrow mb-6" data-fade>Chapter 04 — Begin</p>
      <h2 className="display-xl max-w-5xl mb-12">
        <span className="reveal-line"><span>Every system</span></span>
        <span className="reveal-line"><span>starts with a</span></span>
        <span className="reveal-line"><span><em className="italic text-champagne">conversation</em>.</span></span>
      </h2>
      <div className="flex flex-col md:flex-row gap-10 md:items-center" data-fade>
        <a
          href="mailto:hello@noema.studio"
          className="inline-flex items-center gap-4 font-mono text-sm tracking-[0.2em] uppercase border border-champagne/60 text-champagne px-8 py-4 hover:bg-champagne hover:text-void transition-colors"
        >
          Start a project →
        </a>
        <p className="text-mist max-w-sm leading-relaxed">
          Tell us the problem in plain words. We reply within two working days
          with a point of view, not a pitch deck.
        </p>
      </div>
      <footer className="mt-32 pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] tracking-[0.25em] uppercase text-mist">
        <span>© 2026 NOEMA Studio</span>
        <span>New York — Remote worldwide</span>
      </footer>
    </section>
  );
}
