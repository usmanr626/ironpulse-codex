export function FinalCTA() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,42,0.14),transparent_26rem)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-zinc-500">
          Codex-first prototype
        </p>
        <h2 className="max-w-4xl text-5xl font-semibold leading-none tracking-normal text-white sm:text-7xl">
          From prompt to prototype.
        </h2>
        <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          A cinematic landing page built to show how Codex can turn an idea into an interactive visual experience.
        </p>
        <a
          href="#assembly"
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-md border border-white/18 bg-white px-6 text-sm font-semibold text-black outline-none transition hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
        >
          Explore the Build
        </a>
      </div>
    </section>
  );
}
