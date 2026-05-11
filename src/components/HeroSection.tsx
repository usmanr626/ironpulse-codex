import { GridBackground } from "@/components/engine/GridBackground";
import { ThreeHeroEngineScatter } from "@/components/engine/ThreeEngineScene";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-white/10 px-6 py-24 sm:px-10 lg:px-14">
      <GridBackground />
      <ThreeHeroEngineScatter />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_0,rgba(5,5,5,0.18)_18rem,rgba(5,5,5,0.86)_54rem)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-ember-400/90">
          OpenAI Developer Showcase
        </p>
        <h1 className="text-6xl font-semibold leading-none tracking-normal text-white sm:text-7xl lg:text-8xl">
          IronPulse
        </h1>
        <p className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-zinc-100 sm:text-5xl lg:text-6xl">
          Precision Built. Power Delivered.
        </p>
        <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
          A cinematic engine assembly landing page built with Codex.
        </p>
        <a
          href="#assembly"
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-md border border-ember-400/45 bg-ember-500 px-6 text-sm font-semibold text-black shadow-ember outline-none transition hover:bg-ember-400 focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
        >
          Watch Assembly
        </a>
      </div>
    </section>
  );
}
