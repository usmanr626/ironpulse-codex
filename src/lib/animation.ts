import {
  ENGINE_PART_STATES,
  LABEL_KEYS,
  PISTON_KEYS,
  ROD_KEYS,
  type EnginePartKey,
  type EngineTransform,
} from "@/lib/constants";

type PartElementMap = Partial<Record<EnginePartKey, SVGGraphicsElement | null>>;

type EngineTimelineConfig = {
  root: HTMLElement;
  assemblyGroup: SVGGElement;
  parts: PartElementMap;
  textPanels: HTMLElement[];
  progressDots: HTMLElement[];
};

function toGsapVars(transform: EngineTransform) {
  return {
    x: transform.x,
    y: transform.y,
    scale: transform.scale,
    rotation: transform.rotation,
    opacity: transform.opacity,
    transformOrigin: "50% 50%",
    transformBox: "fill-box",
  };
}

function partList(parts: PartElementMap, keys: readonly EnginePartKey[]) {
  return keys.map((key) => parts[key]).filter(Boolean) as SVGGraphicsElement[];
}

export async function createEngineScrollTimeline({
  root,
  assemblyGroup,
  parts,
  textPanels,
  progressDots,
}: EngineTimelineConfig) {
  const gsapModule = await import("gsap");
  const scrollTriggerModule = await import("gsap/ScrollTrigger");
  const gsap = gsapModule.default;
  const { ScrollTrigger } = scrollTriggerModule;

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const context = gsap.context(() => {
    Object.entries(parts).forEach(([key, element]) => {
      if (!element) {
        return;
      }

      const partKey = key as EnginePartKey;
      const state = prefersReducedMotion
        ? ENGINE_PART_STATES[partKey].final
        : ENGINE_PART_STATES[partKey].initial;

      gsap.set(element, toGsapVars(state));
    });

    if (prefersReducedMotion) {
      textPanels.forEach((panel) => gsap.set(panel, { clearProps: "all" }));
      return;
    }

    gsap.set(progressDots, { scaleX: 0.18, opacity: 0.38, transformOrigin: "0% 50%" });
    gsap.set(progressDots[0], { scaleX: 1, opacity: 1 });

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.85,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const isComplete = self.progress > 0.9;

          assemblyGroup.classList.toggle("engine-idle", isComplete);
          root.classList.toggle("assembly-complete", isComplete);
        },
        onLeaveBack: () => {
          assemblyGroup.classList.remove("engine-idle");
          root.classList.remove("assembly-complete");
        },
      },
    });

    const showPanel = (index: number, at: number) => {
      const dot = progressDots[index];

      if (!dot) {
        return;
      }

      timeline
        .to(progressDots, { scaleX: 0.18, opacity: 0.38, duration: 0.28 }, at)
        .to(dot, { scaleX: 1, opacity: 1, duration: 0.42 }, at + 0.04);
    };

    const block = parts.block;
    const pistons = partList(parts, PISTON_KEYS);
    const rods = partList(parts, ROD_KEYS);
    const labels = partList(parts, LABEL_KEYS);

    timeline.addLabel("block", 0);
    if (block) {
      timeline.to(block, toGsapVars(ENGINE_PART_STATES.block.final), 0.05);
    }
    timeline.to(
      partList(parts, [
        "piston1",
        "piston2",
        "piston3",
        "piston4",
        "rod1",
        "rod2",
        "rod3",
        "rod4",
        "crankshaft",
        "cylinderHead",
        "intake",
        "exhaust",
        "spark",
      ]),
      { opacity: 0.34, duration: 0.5 },
      0,
    );

    timeline.addLabel("pistons", 1);
    showPanel(1, 0.92);
    pistons.forEach((piston, index) => {
      const key = PISTON_KEYS[index];
      timeline.to(
        piston,
        { ...toGsapVars(ENGINE_PART_STATES[key].final), duration: 0.74 },
        1.05 + index * 0.13,
      );
    });

    timeline.addLabel("torque", 2);
    showPanel(2, 1.92);
    rods.forEach((rod, index) => {
      const key = ROD_KEYS[index];
      timeline.to(
        rod,
        { ...toGsapVars(ENGINE_PART_STATES[key].final), duration: 0.64 },
        2.06 + index * 0.08,
      );
    });
    if (parts.crankshaft) {
      timeline
        .to(parts.crankshaft, { opacity: 1, duration: 0.34 }, 2.08)
        .to(parts.crankshaft, { ...toGsapVars(ENGINE_PART_STATES.crankshaft.final), duration: 0.9 }, 2.16)
        .to(parts.crankshaft, { rotation: -2, duration: 0.16, ease: "power1.inOut" }, 2.93)
        .to(parts.crankshaft, { rotation: 0, duration: 0.2, ease: "power1.out" }, 3.09);
    }

    timeline.addLabel("timing", 3.2);
    showPanel(3, 3.05);
    if (parts.cylinderHead) {
      timeline.to(
        parts.cylinderHead,
        { ...toGsapVars(ENGINE_PART_STATES.cylinderHead.final), duration: 0.85 },
        3.2,
      );
    }
    if (parts.headBolts) {
      timeline
        .to(parts.headBolts, { ...toGsapVars(ENGINE_PART_STATES.headBolts.final), duration: 0.28 }, 3.72)
        .to(parts.headBolts, { scale: 1.018, duration: 0.14, ease: "power1.inOut" }, 3.92)
        .to(parts.headBolts, { scale: 1, duration: 0.16, ease: "power1.out" }, 4.06);
    }

    timeline.addLabel("flow", 4.25);
    showPanel(4, 4.08);
    if (parts.intake) {
      timeline.to(parts.intake, { ...toGsapVars(ENGINE_PART_STATES.intake.final), duration: 0.82 }, 4.26);
    }
    if (parts.exhaust) {
      timeline.to(parts.exhaust, { ...toGsapVars(ENGINE_PART_STATES.exhaust.final), duration: 0.82 }, 4.32);
    }
    if (parts.spark) {
      timeline.to(parts.spark, { ...toGsapVars(ENGINE_PART_STATES.spark.final), duration: 0.66 }, 4.48);
    }
    if (parts.glowCore) {
      timeline.to(parts.glowCore, { opacity: 1, duration: 0.56 }, 4.72);
    }

    timeline.addLabel("complete", 5.25);
    showPanel(5, 5.12);
    timeline.to(labels, { opacity: 1, duration: 0.52, stagger: 0.08 }, 5.34);
  }, root);

  return () => {
    assemblyGroup.classList.remove("engine-idle");
    root.classList.remove("assembly-complete");
    context.revert();
  };
}
