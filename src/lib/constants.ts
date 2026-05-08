import type { CSSProperties } from "react";

export type EnginePartKey =
  | "block"
  | "piston1"
  | "piston2"
  | "piston3"
  | "piston4"
  | "rod1"
  | "rod2"
  | "rod3"
  | "rod4"
  | "crankshaft"
  | "cylinderHead"
  | "intake"
  | "exhaust"
  | "spark"
  | "headBolts"
  | "glowCore"
  | "labelBlock"
  | "labelCrank"
  | "labelFlow";

export type EngineTransform = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
};

export type EnginePartState = {
  initial: EngineTransform;
  final: EngineTransform;
};

export type ScrollStage = {
  eyebrow: string;
  heading: string;
  body: string;
  cta?: "final";
};

export const SCROLL_STAGES: ScrollStage[] = [
  {
    eyebrow: "01 / The Block",
    heading: "The foundation of controlled force.",
    body: "Every powerful machine starts with a structure built to hold pressure, heat, and motion.",
  },
  {
    eyebrow: "02 / Compression",
    heading: "Pressure becomes motion.",
    body: "Pistons slide into place, turning controlled combustion into mechanical movement.",
  },
  {
    eyebrow: "03 / Torque",
    heading: "Linear motion becomes rotation.",
    body: "Connecting rods lock the pistons to the crankshaft, converting force into usable torque.",
  },
  {
    eyebrow: "04 / Timing",
    heading: "Air, fuel, and timing align.",
    body: "The head assembly controls flow and timing, shaping raw combustion into repeatable power.",
  },
  {
    eyebrow: "05 / Flow",
    heading: "The engine learns to breathe.",
    body: "Intake, exhaust, and ignition systems complete the mechanical rhythm.",
  },
  {
    eyebrow: "06 / Complete",
    heading: "Power, assembled.",
    body: "A mechanical core built piece by piece through scroll, motion, and prompt-driven development.",
    cta: "final",
  },
];

export const ENGINE_PART_STATES: Record<EnginePartKey, EnginePartState> = {
  block: {
    initial: { x: -620, y: 392, scale: 0.86, rotation: -10, opacity: 0.26 },
    final: { x: 500, y: 392, scale: 0.95, rotation: 0, opacity: 1 },
  },
  piston1: {
    initial: { x: -280, y: 224, scale: 0.72, rotation: -16, opacity: 0.28 },
    final: { x: 380, y: 258, scale: 0.78, rotation: 0, opacity: 1 },
  },
  piston2: {
    initial: { x: 1280, y: 218, scale: 0.72, rotation: 14, opacity: 0.28 },
    final: { x: 460, y: 258, scale: 0.78, rotation: 0, opacity: 1 },
  },
  piston3: {
    initial: { x: -300, y: 282, scale: 0.72, rotation: -12, opacity: 0.28 },
    final: { x: 540, y: 258, scale: 0.78, rotation: 0, opacity: 1 },
  },
  piston4: {
    initial: { x: 1310, y: 286, scale: 0.72, rotation: 16, opacity: 0.28 },
    final: { x: 620, y: 258, scale: 0.78, rotation: 0, opacity: 1 },
  },
  rod1: {
    initial: { x: -300, y: 376, scale: 0.62, rotation: 24, opacity: 0.24 },
    final: { x: 380, y: 394, scale: 0.7, rotation: -3, opacity: 1 },
  },
  rod2: {
    initial: { x: 1320, y: 420, scale: 0.62, rotation: -22, opacity: 0.24 },
    final: { x: 460, y: 398, scale: 0.7, rotation: 2, opacity: 1 },
  },
  rod3: {
    initial: { x: -300, y: 472, scale: 0.62, rotation: 20, opacity: 0.24 },
    final: { x: 540, y: 398, scale: 0.7, rotation: -2, opacity: 1 },
  },
  rod4: {
    initial: { x: 1320, y: 500, scale: 0.62, rotation: -20, opacity: 0.24 },
    final: { x: 620, y: 394, scale: 0.7, rotation: 3, opacity: 1 },
  },
  crankshaft: {
    initial: { x: 1500, y: 535, scale: 0.74, rotation: 18, opacity: 0.24 },
    final: { x: 500, y: 535, scale: 0.86, rotation: 0, opacity: 1 },
  },
  cylinderHead: {
    initial: { x: -650, y: 190, scale: 0.82, rotation: -7, opacity: 0.26 },
    final: { x: 500, y: 190, scale: 0.94, rotation: 0, opacity: 1 },
  },
  intake: {
    initial: { x: -520, y: 306, scale: 0.76, rotation: -14, opacity: 0.24 },
    final: { x: 308, y: 306, scale: 0.86, rotation: 0, opacity: 1 },
  },
  exhaust: {
    initial: { x: 1500, y: 322, scale: 0.74, rotation: 14, opacity: 0.24 },
    final: { x: 692, y: 322, scale: 0.86, rotation: 0, opacity: 1 },
  },
  spark: {
    initial: { x: 1320, y: 94, scale: 0.66, rotation: -20, opacity: 0.28 },
    final: { x: 500, y: 94, scale: 0.85, rotation: 0, opacity: 1 },
  },
  headBolts: {
    initial: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 },
    final: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
  },
  glowCore: {
    initial: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 },
    final: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
  },
  labelBlock: {
    initial: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 },
    final: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
  },
  labelCrank: {
    initial: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 },
    final: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
  },
  labelFlow: {
    initial: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 },
    final: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
  },
};

export const HERO_PART_STATES: Partial<Record<EnginePartKey, EngineTransform>> = {
  block: { x: 510, y: 382, scale: 0.72, rotation: -8, opacity: 0.58 },
  piston1: { x: 244, y: 142, scale: 0.7, rotation: -18, opacity: 0.62 },
  piston2: { x: 390, y: 92, scale: 0.66, rotation: 12, opacity: 0.56 },
  piston3: { x: 617, y: 100, scale: 0.68, rotation: -10, opacity: 0.58 },
  piston4: { x: 775, y: 158, scale: 0.69, rotation: 18, opacity: 0.6 },
  rod1: { x: 168, y: 434, scale: 0.62, rotation: 24, opacity: 0.42 },
  rod2: { x: 302, y: 560, scale: 0.62, rotation: -22, opacity: 0.42 },
  rod3: { x: 704, y: 552, scale: 0.62, rotation: 20, opacity: 0.42 },
  rod4: { x: 842, y: 444, scale: 0.62, rotation: -20, opacity: 0.42 },
  crankshaft: { x: 508, y: 662, scale: 0.7, rotation: 15, opacity: 0.5 },
  cylinderHead: { x: 496, y: 40, scale: 0.76, rotation: 5, opacity: 0.58 },
  intake: { x: 112, y: 270, scale: 0.76, rotation: -16, opacity: 0.46 },
  exhaust: { x: 892, y: 318, scale: 0.74, rotation: 15, opacity: 0.46 },
  spark: { x: 810, y: 58, scale: 0.66, rotation: -21, opacity: 0.54 },
};

export const PISTON_KEYS = ["piston1", "piston2", "piston3", "piston4"] as const;
export const ROD_KEYS = ["rod1", "rod2", "rod3", "rod4"] as const;
export const LABEL_KEYS = ["labelBlock", "labelCrank", "labelFlow"] as const;

export function transformToCss({
  x,
  y,
  scale,
  rotation,
}: Omit<EngineTransform, "opacity">) {
  return `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
}

export function partInitialStyle(key: EnginePartKey): CSSProperties {
  const state = ENGINE_PART_STATES[key].initial;

  return {
    opacity: state.opacity,
    transform: transformToCss(state),
    transformBox: "fill-box",
    transformOrigin: "center",
  } as CSSProperties;
}

export function heroPartInitialStyle(key: EnginePartKey): CSSProperties {
  const state = HERO_PART_STATES[key] ?? ENGINE_PART_STATES[key].initial;

  return {
    opacity: state.opacity,
    transform: transformToCss(state),
    transformBox: "fill-box",
    transformOrigin: "center",
  } as CSSProperties;
}
