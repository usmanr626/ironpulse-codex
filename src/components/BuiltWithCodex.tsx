const cards = [
  {
    title: "Prompted Architecture",
    text: "The layout, section structure, and reusable animation components were created from natural-language direction.",
  },
  {
    title: "Coded Engine Assets",
    text: "The engine visuals were generated as reusable SVG React components, including metallic surfaces, bolts, grooves, and glow details.",
  },
  {
    title: "Scroll Timeline",
    text: "GSAP ScrollTrigger coordinates each engine part as the assembly progresses through the page.",
  },
  {
    title: "Iterative Refinement",
    text: "Motion timing, spacing, responsiveness, and visual polish were refined through Codex-guided changes.",
  },
];

export function BuiltWithCodex() {
  return (
    <section id="built-with-codex" className="relative overflow-hidden border-b border-white/10 px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,107,42,0.1),transparent_24rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-ember-400/90">
            Developer Showcase
          </p>
          <h2 className="text-5xl font-semibold leading-none tracking-normal text-white sm:text-6xl">
            Built with Codex
          </h2>
          <p className="mt-6 text-base leading-7 text-zinc-300 sm:text-lg">
            This page was developed through a Codex-first workflow: component structure, scroll timelines,
            animation states, responsive layout, and visual refinement were generated and improved through
            natural-language instructions.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article key={card.title} className="min-h-64 bg-graphite-900 p-6">
              <div className="mb-7 h-px w-16 bg-ember-400/70" />
              <h3 className="text-xl font-semibold tracking-normal text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-300">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
