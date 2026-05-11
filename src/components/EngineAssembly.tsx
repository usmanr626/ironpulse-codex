"use client";

import { useCallback, useRef } from "react";
import { GridBackground } from "@/components/engine/GridBackground";
import { ThreeEngineScene } from "@/components/engine/ThreeEngineScene";
import { ScrollStory } from "@/components/ScrollStory";

export function EngineAssembly() {
  const rootRef = useRef<HTMLElement | null>(null);
  const textPanelRefs = useRef<HTMLDivElement[]>([]);
  const progressDotRefs = useRef<HTMLSpanElement[]>([]);

  const registerPanel = useCallback(
    (index: number) => (element: HTMLDivElement | null) => {
      if (element) {
        textPanelRefs.current[index] = element;
      }
    },
    [],
  );

  const registerDot = useCallback(
    (index: number) => (element: HTMLSpanElement | null) => {
      if (element) {
        progressDotRefs.current[index] = element;
      }
    },
    [],
  );

  const replayAssembly = useCallback(() => {
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      ref={rootRef}
      id="assembly"
      className="assembly-section relative min-h-[720vh] border-b border-white/10 bg-graphite-950"
      aria-labelledby="assembly-heading"
    >
      <div className="assembly-sticky pointer-events-none sticky top-0 z-0 flex h-screen min-h-[640px] items-center justify-center overflow-hidden px-4 py-8 sm:px-10 lg:px-14">
        <GridBackground />
        <div className="assembly-visual-shell w-full max-w-[36rem] sm:max-w-[42rem] lg:max-w-[49rem]">
          <ThreeEngineScene rootRef={rootRef} progressDotRefs={progressDotRefs} />
          <div className="technical-label-overlay" aria-hidden="true">
            <span className="technical-callout technical-callout-block">Cast block</span>
            <span className="technical-callout technical-callout-crank">Crankshaft</span>
            <span className="technical-callout technical-callout-flow">Flow path</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-[100vh] mx-auto grid w-full max-w-7xl px-6 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-14">
        <div className="lg:col-start-1">
          <p className="sticky top-8 mb-4 pt-8 text-xs font-semibold uppercase tracking-[0.34em] text-zinc-500">
            Scroll Assembly Timeline
          </p>
          <h2 id="assembly-heading" className="sr-only">
            IronPulse engine assembly sequence
          </h2>
          <ScrollStory registerPanel={registerPanel} registerDot={registerDot} onReplay={replayAssembly} />
        </div>
      </div>
    </section>
  );
}
