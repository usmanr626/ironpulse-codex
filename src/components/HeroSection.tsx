import { ConnectingRod } from "@/components/engine/ConnectingRod";
import { Crankshaft } from "@/components/engine/Crankshaft";
import { CylinderHead } from "@/components/engine/CylinderHead";
import { EngineBlock } from "@/components/engine/EngineBlock";
import { ExhaustManifold } from "@/components/engine/ExhaustManifold";
import { GridBackground } from "@/components/engine/GridBackground";
import { IntakeManifold } from "@/components/engine/IntakeManifold";
import { Piston } from "@/components/engine/Piston";
import { SparkPlug } from "@/components/engine/SparkPlug";
import { heroPartInitialStyle, type EnginePartKey } from "@/lib/constants";

const floatClasses = ["hero-float-a", "hero-float-b", "hero-float-c"];

function FloatingPart({
  part,
  children,
  index,
}: {
  part: EnginePartKey;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <g className="engine-part" style={heroPartInitialStyle(part)}>
      <g className={floatClasses[index % floatClasses.length]}>{children}</g>
    </g>
  );
}

function HeroEngineScatter() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-95"
      viewBox="0 0 1000 720"
      role="img"
      aria-label="Scattered stylized engine components"
      preserveAspectRatio="xMidYMid slice"
    >
      <FloatingPart part="rod1" index={0}>
        <ConnectingRod idPrefix="hero-rod-1" />
      </FloatingPart>
      <FloatingPart part="rod2" index={1}>
        <ConnectingRod idPrefix="hero-rod-2" />
      </FloatingPart>
      <FloatingPart part="rod3" index={2}>
        <ConnectingRod idPrefix="hero-rod-3" />
      </FloatingPart>
      <FloatingPart part="rod4" index={0}>
        <ConnectingRod idPrefix="hero-rod-4" />
      </FloatingPart>
      <FloatingPart part="crankshaft" index={1}>
        <Crankshaft idPrefix="hero-crankshaft" />
      </FloatingPart>
      <FloatingPart part="block" index={2}>
        <EngineBlock idPrefix="hero-block" />
      </FloatingPart>
      <FloatingPart part="piston1" index={0}>
        <Piston idPrefix="hero-piston-1" />
      </FloatingPart>
      <FloatingPart part="piston2" index={1}>
        <Piston idPrefix="hero-piston-2" />
      </FloatingPart>
      <FloatingPart part="piston3" index={2}>
        <Piston idPrefix="hero-piston-3" />
      </FloatingPart>
      <FloatingPart part="piston4" index={0}>
        <Piston idPrefix="hero-piston-4" />
      </FloatingPart>
      <FloatingPart part="cylinderHead" index={1}>
        <CylinderHead idPrefix="hero-cylinder-head" />
      </FloatingPart>
      <FloatingPart part="intake" index={2}>
        <IntakeManifold idPrefix="hero-intake" />
      </FloatingPart>
      <FloatingPart part="exhaust" index={0}>
        <ExhaustManifold idPrefix="hero-exhaust" />
      </FloatingPart>
      <FloatingPart part="spark" index={1}>
        <SparkPlug idPrefix="hero-spark" />
      </FloatingPart>
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-white/10 px-6 py-24 sm:px-10 lg:px-14">
      <GridBackground />
      <HeroEngineScatter />
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
