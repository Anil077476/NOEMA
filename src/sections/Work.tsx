import { useReveal } from "../lib/useReveal";

const projects = [
  { name: "Meridian", field: "Wealth intelligence", result: "Portfolio narratives generated in the analyst's own register — review time cut by two thirds." },
  { name: "Cantor", field: "Clinical search", result: "Grounded retrieval over 40 years of trial data, with every claim traceable to source." },
  { name: "Vellum & Co.", field: "Luxury retail", result: "A concierge model trained on the house archive. It speaks like the brand because it learned from it." },
];

export default function Work() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="work" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-32">
      <p className="eyebrow mb-6" data-fade>Chapter 03 — Work</p>
      <h2 className="display-lg mb-20 max-w-4xl">
        <span className="reveal-line"><span>Quiet systems,</span></span>
        <span className="reveal-line"><span>loud results.</span></span>
      </h2>
      <div className="max-w-5xl">
        {projects.map((p) => (
          <a
            key={p.name}
            href="#contact"
            className="group grid md:grid-cols-[1fr_1fr_2fr] gap-4 md:gap-10 items-baseline py-10 border-t border-bone/10 transition-colors hover:bg-bone/[0.03]"
            data-fade
          >
            <h3 className="font-display text-3xl md:text-4xl group-hover:text-champagne transition-colors">{p.name}</h3>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mist">{p.field}</p>
            <p className="text-mist leading-relaxed">{p.result}</p>
          </a>
        ))}
        <div className="hairline" />
      </div>
    </section>
  );
}
