"use client";

import { useCallback, useEffect, useRef } from "react";
import { Bolt } from "@/components/engine/Bolt";
import { ConnectingRod } from "@/components/engine/ConnectingRod";
import { Crankshaft } from "@/components/engine/Crankshaft";
import { CylinderHead } from "@/components/engine/CylinderHead";
import { EngineBlock } from "@/components/engine/EngineBlock";
import { ExhaustManifold } from "@/components/engine/ExhaustManifold";
import { GlowCore } from "@/components/engine/GlowCore";
import { GridBackground } from "@/components/engine/GridBackground";
import { IntakeManifold } from "@/components/engine/IntakeManifold";
import { Piston } from "@/components/engine/Piston";
import { SparkPlug } from "@/components/engine/SparkPlug";
import { TechnicalLabel } from "@/components/engine/TechnicalLabel";
import { ScrollStory } from "@/components/ScrollStory";
import { createEngineScrollTimeline } from "@/lib/animation";
import { partInitialStyle, type EnginePartKey } from "@/lib/constants";

type PartRefs = Partial<Record<EnginePartKey, SVGGraphicsElement | null>>;

export function EngineAssembly() {
  const rootRef = useRef<HTMLElement | null>(null);
  const assemblyGroupRef = useRef<SVGGElement | null>(null);
  const partRefs = useRef<PartRefs>({});
  const textPanelRefs = useRef<HTMLDivElement[]>([]);
  const progressDotRefs = useRef<HTMLSpanElement[]>([]);

  const registerPart = useCallback(
    (key: EnginePartKey) => (element: SVGGraphicsElement | null) => {
      partRefs.current[key] = element;
    },
    [],
  );

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

  useEffect(() => {
    const root = rootRef.current;
    const assemblyGroup = assemblyGroupRef.current;

    if (!root || !assemblyGroup) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let mounted = true;

    createEngineScrollTimeline({
      root,
      assemblyGroup,
      parts: partRefs.current,
      textPanels: textPanelRefs.current,
      progressDots: progressDotRefs.current,
    }).then((destroy) => {
      if (!mounted) {
        destroy();
        return;
      }

      cleanup = destroy;
    });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

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
          <svg
            className="h-auto w-full overflow-visible drop-shadow-[0_40px_90px_rgba(0,0,0,0.72)]"
            viewBox="0 0 1000 720"
            role="img"
            aria-label="Stylized engine components assembling into a complete mechanical core"
            preserveAspectRatio="xMidYMid meet"
          >
            <g ref={assemblyGroupRef}>
              <g ref={registerPart("glowCore")} className="engine-part" style={partInitialStyle("glowCore")}>
                <GlowCore />
              </g>

              {(["rod1", "rod2", "rod3", "rod4"] as EnginePartKey[]).map((key, index) => (
                <g key={key} ref={registerPart(key)} className="engine-part" style={partInitialStyle(key)}>
                  <ConnectingRod idPrefix={`assembly-rod-${index + 1}`} />
                </g>
              ))}

              <g
                ref={registerPart("crankshaft")}
                className="engine-part"
                data-motion="crankshaft"
                style={partInitialStyle("crankshaft")}
              >
                <Crankshaft idPrefix="assembly-crankshaft" className="crankshaft-rotor" />
              </g>

              <g ref={registerPart("block")} className="engine-part" style={partInitialStyle("block")}>
                <EngineBlock idPrefix="assembly-block" />
              </g>

              {(["piston1", "piston2", "piston3", "piston4"] as EnginePartKey[]).map((key, index) => (
                <g
                  key={key}
                  ref={registerPart(key)}
                  className="engine-part"
                  data-motion="piston"
                  style={partInitialStyle(key)}
                >
                  <Piston
                    idPrefix={`assembly-piston-${index + 1}`}
                    className={`piston-core piston-core-${index + 1}`}
                  />
                </g>
              ))}

              <g ref={registerPart("cylinderHead")} className="engine-part" style={partInitialStyle("cylinderHead")}>
                <CylinderHead idPrefix="assembly-cylinder-head" />
              </g>

              <g ref={registerPart("headBolts")} className="engine-part" style={partInitialStyle("headBolts")}>
                {[-166, -84, 0, 84, 166].map((offset, index) => (
                  <Bolt
                    key={offset}
                    x={500 + offset}
                    y={222}
                    size={7}
                    idPrefix={`assembly-head-bolt-lower-${index}`}
                  />
                ))}
                {[-144, -48, 48, 144].map((offset, index) => (
                  <Bolt
                    key={offset}
                    x={500 + offset}
                    y={152}
                    size={6}
                    idPrefix={`assembly-head-bolt-upper-${index}`}
                  />
                ))}
              </g>

              <g ref={registerPart("intake")} className="engine-part" style={partInitialStyle("intake")}>
                <IntakeManifold idPrefix="assembly-intake" />
              </g>

              <g ref={registerPart("exhaust")} className="engine-part" style={partInitialStyle("exhaust")}>
                <ExhaustManifold idPrefix="assembly-exhaust" />
              </g>

              <g ref={registerPart("spark")} className="engine-part" style={partInitialStyle("spark")}>
                <SparkPlug idPrefix="assembly-spark" />
              </g>

              <g ref={registerPart("labelBlock")} className="engine-part" style={partInitialStyle("labelBlock")}>
                <TechnicalLabel x={238} y={268} targetX={342} targetY={346} label="CAST BLOCK" align="left" />
              </g>
              <g ref={registerPart("labelCrank")} className="engine-part" style={partInitialStyle("labelCrank")}>
                <TechnicalLabel x={752} y={574} targetX={606} targetY={534} label="CRANKSHAFT" align="right" />
              </g>
              <g ref={registerPart("labelFlow")} className="engine-part" style={partInitialStyle("labelFlow")}>
                <TechnicalLabel x={762} y={236} targetX={665} targetY={292} label="FLOW PATH" align="right" />
              </g>
            </g>
          </svg>
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
