import { useReveal } from "../lib/useReveal";

const crafts = [
  {
    title: "Generative products",
    body: "Products where the model is the material — writing tools, design engines, and copilots shaped around one workflow, not every workflow.",
  },
  {
    title: "Intelligent interfaces",
    body: "Interfaces that anticipate. Retrieval, memory, and intent baked into the surface, so the product meets people mid-thought.",
  },
  {
    title: "Tuned models",
    body: "Your data, your voice, your constraints. Fine-tuned and grounded models that answer like your best person on their best day.",
  },
];

export default function Craft() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="craft" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-32">
      <p className="eyebrow mb-6" data-fade>Chapter 01 — Craft</p>
      <h2 className="display-lg max-w-4xl mb-20">
        <span className="reveal-line"><span>Three materials.</span></span>
        <span className="reveal-line"><span>One discipline.</span></span>
      </h2>
      <div className="grid md:grid-cols-3 gap-px bg-bone/10 max-w-6xl">
        {crafts.map((c) => (
          <article key={c.title} className="bg-void/70 backdrop-blur-sm p-8 md:p-10" data-fade>
            <h3 className="font-display text-2xl md:text-3xl mb-4">{c.title}</h3>
            <p className="text-mist leading-relaxed text-sm md:text-base">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
