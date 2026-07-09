import { useReveal } from "../lib/useReveal";

const steps = [
  { n: "01", title: "Listen", body: "Two weeks inside your domain. We map the language, the data, and the decisions before we touch a model." },
  { n: "02", title: "Model", body: "Prototype against real tasks. Evaluate ruthlessly. Keep only what measurably helps." },
  { n: "03", title: "Sculpt", body: "The interface is carved around the intelligence — motion, type, and feedback tuned until it feels inevitable." },
  { n: "04", title: "Ship", body: "Production infrastructure, observability, and a handover your team can actually own." },
];

export default function Method() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="method" ref={ref} className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-32">
      <p className="eyebrow mb-6" data-fade>Chapter 02 — Method</p>
      <h2 className="display-lg mb-20 max-w-4xl">
        <span className="reveal-line"><span>A sequence,</span></span>
        <span className="reveal-line"><span>not a sprint.</span></span>
      </h2>
      <ol className="max-w-3xl">
        {steps.map((s) => (
          <li key={s.n} className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-6 py-10 border-t border-bone/10" data-fade>
            <span className="font-mono text-champagne text-sm pt-2">{s.n}</span>
            <div>
              <h3 className="font-display text-3xl md:text-4xl mb-3">{s.title}</h3>
              <p className="text-mist leading-relaxed">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
