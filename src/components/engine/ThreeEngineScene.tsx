"use client";

import { type RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

type EngineAssemblySceneProps = {
  rootRef: RefObject<HTMLElement | null>;
  progressDotRefs: RefObject<HTMLSpanElement[]>;
};

type PartKey =
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
  | "spark";

type PartPlacement = {
  final: [number, number, number];
  initial: [number, number, number];
  rotation?: [number, number, number];
  initialRotation?: [number, number, number];
};

type EnginePart = {
  group: THREE.Group;
  finalPosition: THREE.Vector3;
  finalRotation: THREE.Euler;
};

type EngineRig = {
  root: THREE.Group;
  parts: Record<PartKey, EnginePart>;
  pistons: THREE.Group[];
  rods: THREE.Group[];
  crankshaft: THREE.Group;
  glowMaterial: THREE.MeshStandardMaterial;
  sparkGlowMaterial: THREE.MeshStandardMaterial;
};

type SceneSetup = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  rig: EngineRig;
  dispose: () => void;
};

const PART_LAYOUT: Record<PartKey, PartPlacement> = {
  block: {
    final: [0, -0.86, 0],
    initial: [-8.6, -0.84, -0.1],
    rotation: [-0.04, 0.08, 0],
    initialRotation: [-0.16, -0.72, -0.08],
  },
  piston1: {
    final: [-1.38, 0.35, 0.12],
    initial: [-8.4, 1.35, 0.28],
    rotation: [0, 0.05, 0],
    initialRotation: [0.18, -0.5, -0.04],
  },
  piston2: {
    final: [-0.46, 0.35, 0.12],
    initial: [8.4, 1.5, 0.24],
    rotation: [0, -0.03, 0],
    initialRotation: [-0.18, 0.48, 0.06],
  },
  piston3: {
    final: [0.46, 0.35, 0.12],
    initial: [-8.2, 1.02, 0.34],
    rotation: [0, 0.03, 0],
    initialRotation: [0.14, -0.46, -0.06],
  },
  piston4: {
    final: [1.38, 0.35, 0.12],
    initial: [8.2, 1.14, 0.32],
    rotation: [0, -0.05, 0],
    initialRotation: [-0.14, 0.5, 0.05],
  },
  rod1: {
    final: [-1.38, -0.62, 0.18],
    initial: [8.6, -0.58, 0.32],
    rotation: [0.05, 0.06, 0.1],
    initialRotation: [0.24, 0.72, 0.5],
  },
  rod2: {
    final: [-0.46, -0.62, 0.18],
    initial: [-8.5, -0.38, 0.32],
    rotation: [-0.04, -0.05, -0.04],
    initialRotation: [-0.26, -0.7, -0.42],
  },
  rod3: {
    final: [0.46, -0.62, 0.18],
    initial: [8.3, -0.26, 0.36],
    rotation: [0.04, 0.05, 0.04],
    initialRotation: [0.2, 0.62, 0.46],
  },
  rod4: {
    final: [1.38, -0.62, 0.18],
    initial: [-8.3, -0.5, 0.34],
    rotation: [-0.05, -0.06, -0.1],
    initialRotation: [-0.22, -0.66, -0.5],
  },
  crankshaft: {
    final: [0, -1.78, 0.08],
    initial: [0, 5.1, 0.2],
    rotation: [0, 0.02, 0],
    initialRotation: [0.5, 0, 0.08],
  },
  cylinderHead: {
    final: [0, 0.9, 0.05],
    initial: [8.8, 1.34, 0.2],
    rotation: [-0.03, 0.08, 0],
    initialRotation: [-0.2, 0.72, 0.08],
  },
  intake: {
    final: [-2.48, 0.18, 0.02],
    initial: [-8.7, -0.05, 0.5],
    rotation: [0.03, 0.08, 0],
    initialRotation: [0.05, -0.55, -0.12],
  },
  exhaust: {
    final: [2.52, 0.02, 0.04],
    initial: [8.7, -0.12, 0.55],
    rotation: [0.02, -0.1, 0],
    initialRotation: [-0.05, 0.58, 0.12],
  },
  spark: {
    final: [0, 1.6, 0.16],
    initial: [-8.2, 2.5, 0.44],
    rotation: [0.03, 0.05, -0.04],
    initialRotation: [0.32, -0.62, -0.22],
  },
};

const PISTON_KEYS: PartKey[] = ["piston1", "piston2", "piston3", "piston4"];
const ROD_KEYS: PartKey[] = ["rod1", "rod2", "rod3", "rod4"];

function vectorFromTuple(value: [number, number, number]) {
  return new THREE.Vector3(value[0], value[1], value[2]);
}

function eulerFromTuple(value?: [number, number, number]) {
  return new THREE.Euler(value?.[0] ?? 0, value?.[1] ?? 0, value?.[2] ?? 0);
}

function roundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

function createBeveledBox(
  width: number,
  height: number,
  depth: number,
  material: THREE.Material,
  radius = 0.08,
) {
  const geometry = new THREE.ExtrudeGeometry(roundedRectShape(width, height, radius), {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: Math.min(radius * 0.52, 0.06),
    bevelThickness: Math.min(radius * 0.58, 0.06),
    curveSegments: 8,
    steps: 1,
  });

  geometry.center();
  return new THREE.Mesh(geometry, material);
}

function makeCylinder(
  radiusTop: number,
  radiusBottom: number,
  height: number,
  material: THREE.Material,
  segments = 32,
) {
  return new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
}

function makeFaceBolt(x: number, y: number, z: number, radius: number, material: THREE.Material) {
  const bolt = makeCylinder(radius, radius * 0.92, 0.08, material, 6);
  bolt.rotation.x = Math.PI / 2;
  bolt.position.set(x, y, z);
  return bolt;
}

function makeFaceRing(x: number, y: number, z: number, radius: number, tube: number, material: THREE.Material) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 12, 48), material);
  ring.position.set(x, y, z);
  return ring;
}

function applyMeshDefaults(group: THREE.Object3D) {
  group.traverse((object) => {
    const mesh = object as THREE.Mesh;

    if (!mesh.isMesh) {
      return;
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
}

function createMaterials() {
  const graphite = new THREE.MeshStandardMaterial({
    color: 0x2d3238,
    metalness: 0.86,
    roughness: 0.34,
  });
  const graphiteDark = new THREE.MeshStandardMaterial({
    color: 0x15181d,
    metalness: 0.82,
    roughness: 0.42,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: 0xb7bec5,
    metalness: 0.92,
    roughness: 0.24,
  });
  const brushed = new THREE.MeshStandardMaterial({
    color: 0x828a91,
    metalness: 0.9,
    roughness: 0.31,
  });
  const shadowMetal = new THREE.MeshStandardMaterial({
    color: 0x20242a,
    metalness: 0.78,
    roughness: 0.5,
  });
  const hotMetal = new THREE.MeshStandardMaterial({
    color: 0x563026,
    metalness: 0.78,
    roughness: 0.38,
    emissive: 0x2d0902,
    emissiveIntensity: 0.2,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: 0xff8147,
    emissive: 0xff471a,
    emissiveIntensity: 1.4,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const sparkGlow = new THREE.MeshStandardMaterial({
    color: 0xff9b5c,
    emissive: 0xff4b19,
    emissiveIntensity: 1.8,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });

  return {
    graphite,
    graphiteDark,
    silver,
    brushed,
    shadowMetal,
    hotMetal,
    glow,
    sparkGlow,
  };
}

function createEngineBlock(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();

  const core = createBeveledBox(4.45, 1.95, 1.18, materials.graphite, 0.16);
  const deck = createBeveledBox(4.78, 0.28, 1.28, materials.brushed, 0.08);
  const lowerCase = createBeveledBox(4.08, 0.56, 1.02, materials.graphiteDark, 0.1);
  const sideCapLeft = createBeveledBox(0.38, 1.58, 1.06, materials.shadowMetal, 0.07);
  const sideCapRight = sideCapLeft.clone();

  deck.position.y = 1.08;
  lowerCase.position.y = -1.14;
  sideCapLeft.position.set(-2.34, -0.05, 0.02);
  sideCapRight.position.set(2.34, -0.05, 0.02);
  group.add(core, deck, lowerCase, sideCapLeft, sideCapRight);

  [-1.38, -0.46, 0.46, 1.38].forEach((x) => {
    const bore = makeFaceRing(x, 0.16, 0.64, 0.29, 0.035, materials.silver);
    const boreDark = makeCylinder(0.25, 0.25, 0.045, materials.graphiteDark, 36);
    boreDark.rotation.x = Math.PI / 2;
    boreDark.position.set(x, 0.16, 0.665);
    group.add(bore, boreDark);
  });

  [-1.84, -0.92, 0, 0.92, 1.84].forEach((x) => {
    const rib = createBeveledBox(0.07, 1.42, 0.12, materials.brushed, 0.025);
    rib.position.set(x, -0.12, 0.68);
    group.add(rib);
  });

  [-1.88, -0.94, 0.94, 1.88].forEach((x) => {
    group.add(makeFaceBolt(x, 0.86, 0.72, 0.055, materials.silver));
    group.add(makeFaceBolt(x, -0.76, 0.72, 0.052, materials.silver));
  });

  const glowStrip = createBeveledBox(3.35, 0.08, 0.035, materials.glow, 0.02);
  glowStrip.position.set(0, -0.2, 0.735);
  group.add(glowStrip);

  applyMeshDefaults(group);
  return group;
}

function createPiston(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const crown = makeCylinder(0.32, 0.34, 0.44, materials.silver, 48);
  const skirt = makeCylinder(0.3, 0.27, 0.38, materials.brushed, 48);
  const pin = makeCylinder(0.045, 0.045, 0.74, materials.graphiteDark, 18);

  crown.position.y = 0.18;
  skirt.position.y = -0.23;
  pin.rotation.z = Math.PI / 2;
  pin.position.y = -0.17;
  group.add(crown, skirt, pin);

  [0.31, 0.2, 0.08].forEach((y) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.335, 0.012, 8, 40), materials.graphiteDark);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    group.add(ring);
  });

  const faceHighlight = createBeveledBox(0.28, 0.04, 0.035, materials.graphiteDark, 0.018);
  faceHighlight.position.set(0, 0.43, 0.02);
  group.add(faceHighlight);

  applyMeshDefaults(group);
  return group;
}

function createConnectingRod(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const beam = createBeveledBox(0.18, 1.18, 0.16, materials.brushed, 0.045);
  const web = createBeveledBox(0.08, 0.96, 0.18, materials.silver, 0.025);
  const topRing = makeFaceRing(0, 0.66, 0.02, 0.18, 0.04, materials.silver);
  const bottomRing = makeFaceRing(0, -0.66, 0.02, 0.24, 0.05, materials.silver);
  const topHole = makeCylinder(0.1, 0.1, 0.035, materials.graphiteDark, 24);
  const bottomHole = makeCylinder(0.145, 0.145, 0.035, materials.graphiteDark, 24);

  topHole.rotation.x = Math.PI / 2;
  bottomHole.rotation.x = Math.PI / 2;
  topHole.position.set(0, 0.66, 0.045);
  bottomHole.position.set(0, -0.66, 0.045);
  group.add(beam, web, topRing, bottomRing, topHole, bottomHole);

  applyMeshDefaults(group);
  return group;
}

function createCrankshaft(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const shaft = makeCylinder(0.12, 0.12, 4.18, materials.silver, 36);
  shaft.rotation.z = Math.PI / 2;
  group.add(shaft);

  [-1.42, -0.48, 0.48, 1.42].forEach((x, index) => {
    const lobe = createBeveledBox(0.42, 0.72, 0.22, materials.brushed, 0.09);
    const journal = makeCylinder(0.15, 0.15, 0.34, materials.silver, 32);
    const boltA = makeFaceBolt(x - 0.1, -0.18, 0.16, 0.035, materials.graphiteDark);
    const boltB = makeFaceBolt(x + 0.1, 0.18, 0.16, 0.035, materials.graphiteDark);

    lobe.rotation.z = index % 2 === 0 ? 0.5 : -0.5;
    lobe.position.x = x;
    journal.rotation.z = Math.PI / 2;
    journal.position.set(x, index % 2 === 0 ? 0.34 : -0.34, 0.02);
    group.add(lobe, journal, boltA, boltB);
  });

  [-2.22, 2.22].forEach((x) => {
    const cap = makeCylinder(0.2, 0.2, 0.26, materials.graphiteDark, 32);
    cap.rotation.z = Math.PI / 2;
    cap.position.x = x;
    group.add(cap);
  });

  applyMeshDefaults(group);
  return group;
}

function createCylinderHead(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const base = createBeveledBox(4.82, 0.72, 1.06, materials.brushed, 0.13);
  const cover = createBeveledBox(4.32, 0.28, 0.86, materials.graphite, 0.09);
  const rail = createBeveledBox(4.52, 0.09, 0.95, materials.silver, 0.03);

  cover.position.y = 0.42;
  rail.position.y = -0.43;
  group.add(base, cover, rail);

  [-1.38, -0.46, 0.46, 1.38].forEach((x) => {
    group.add(makeFaceRing(x, -0.05, 0.58, 0.18, 0.026, materials.graphiteDark));
    group.add(makeFaceBolt(x, 0.3, 0.62, 0.05, materials.silver));
  });

  [-2.04, -1.02, 0, 1.02, 2.04].forEach((x) => {
    const groove = createBeveledBox(0.045, 0.58, 0.065, materials.graphiteDark, 0.018);
    groove.position.set(x, 0.02, 0.62);
    group.add(groove);
  });

  applyMeshDefaults(group);
  return group;
}

function createIntakeManifold(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const plenum = makeCylinder(0.18, 0.22, 1.36, materials.brushed, 36);
  plenum.rotation.x = Math.PI / 2;
  plenum.position.set(-0.38, 0.28, 0.18);
  group.add(plenum);

  [-0.48, -0.16, 0.16, 0.48].forEach((offset, index) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, offset, 0.18),
      new THREE.Vector3(0.34, offset * 0.85, 0.34),
      new THREE.Vector3(0.9, offset * 0.42, 0.16),
      new THREE.Vector3(1.36, offset * 0.2, 0.02),
    ]);
    const pipe = new THREE.Mesh(new THREE.TubeGeometry(curve, 34, 0.045, 14), materials.silver);
    const flange = createBeveledBox(0.2, 0.13, 0.08, materials.graphiteDark, 0.03);

    flange.position.set(1.44, offset * 0.2, 0.02);
    pipe.position.y = -0.16 + index * 0.1;
    group.add(pipe, flange);
  });

  const mouth = makeCylinder(0.27, 0.22, 0.28, materials.graphiteDark, 36);
  mouth.rotation.z = Math.PI / 2;
  mouth.position.set(-0.98, 0.28, 0.18);
  group.add(mouth);

  applyMeshDefaults(group);
  return group;
}

function createExhaustManifold(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();

  [-0.45, -0.15, 0.15, 0.45].forEach((offset, index) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.38, offset * 0.3, 0.02),
      new THREE.Vector3(-0.82, offset * 0.7, 0.26),
      new THREE.Vector3(-0.22, offset, 0.18),
      new THREE.Vector3(0.46, offset * 0.68, 0.1),
    ]);
    const pipe = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, 0.052, 14), materials.hotMetal);
    const flange = createBeveledBox(0.19, 0.14, 0.08, materials.graphiteDark, 0.03);

    flange.position.set(-1.47, offset * 0.3, 0.02);
    pipe.position.y = -0.14 + index * 0.08;
    group.add(pipe, flange);
  });

  const collector = makeCylinder(0.18, 0.24, 1.02, materials.hotMetal, 36);
  collector.rotation.x = Math.PI / 2;
  collector.position.set(0.7, 0.1, 0.1);
  group.add(collector);

  applyMeshDefaults(group);
  return group;
}

function createSparkPlug(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const ceramic = makeCylinder(0.11, 0.14, 0.58, materials.silver, 32);
  const hex = makeCylinder(0.19, 0.19, 0.2, materials.graphiteDark, 6);
  const tip = makeCylinder(0.055, 0.045, 0.34, materials.brushed, 24);
  const glow = makeCylinder(0.1, 0.07, 0.16, materials.sparkGlow, 32);

  ceramic.position.y = 0.18;
  hex.position.y = -0.22;
  tip.position.y = -0.5;
  glow.position.y = -0.72;
  group.add(ceramic, hex, tip, glow);

  [0.26, 0.1, -0.04].forEach((y) => {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 8, 32), materials.graphiteDark);
    band.rotation.x = Math.PI / 2;
    band.position.y = y;
    group.add(band);
  });

  applyMeshDefaults(group);
  return group;
}

function createEngineRig() {
  const materials = createMaterials();
  const root = new THREE.Group();
  const parts = {} as Record<PartKey, EnginePart>;

  const builders: Record<PartKey, () => THREE.Group> = {
    block: () => createEngineBlock(materials),
    piston1: () => createPiston(materials),
    piston2: () => createPiston(materials),
    piston3: () => createPiston(materials),
    piston4: () => createPiston(materials),
    rod1: () => createConnectingRod(materials),
    rod2: () => createConnectingRod(materials),
    rod3: () => createConnectingRod(materials),
    rod4: () => createConnectingRod(materials),
    crankshaft: () => createCrankshaft(materials),
    cylinderHead: () => createCylinderHead(materials),
    intake: () => createIntakeManifold(materials),
    exhaust: () => createExhaustManifold(materials),
    spark: () => createSparkPlug(materials),
  };

  (Object.keys(PART_LAYOUT) as PartKey[]).forEach((key) => {
    const placement = PART_LAYOUT[key];
    const group = builders[key]();
    const finalPosition = vectorFromTuple(placement.final);
    const finalRotation = eulerFromTuple(placement.rotation);

    group.position.copy(vectorFromTuple(placement.initial));
    group.rotation.copy(eulerFromTuple(placement.initialRotation));
    root.add(group);

    parts[key] = {
      group,
      finalPosition,
      finalRotation,
    };
  });

  root.rotation.set(-0.08, -0.24, 0);
  root.scale.setScalar(1);

  return {
    root,
    parts,
    pistons: PISTON_KEYS.map((key) => parts[key].group),
    rods: ROD_KEYS.map((key) => parts[key].group),
    crankshaft: parts.crankshaft.group,
    glowMaterial: materials.glow,
    sparkGlowMaterial: materials.sparkGlow,
  };
}

function createStage(container: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const rig = createEngineRig();

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  camera.position.set(0, 0.35, 8.4);
  camera.lookAt(0, -0.15, 0);

  const ambient = new THREE.AmbientLight(0xced6de, 0.78);
  const key = new THREE.DirectionalLight(0xffffff, 2.9);
  const rim = new THREE.DirectionalLight(0x9eb7ff, 1.55);
  const ember = new THREE.PointLight(0xff6b2a, 1.9, 7.5);

  key.position.set(-4, 5.2, 5.2);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  rim.position.set(4.2, 2.4, -2.8);
  ember.position.set(0, -0.35, 1.4);
  scene.add(ambient, key, rim, ember, rig.root);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4.4, 96),
    new THREE.MeshBasicMaterial({
      color: 0xff6b2a,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.36;
  scene.add(floor);

  const grid = new THREE.GridHelper(8.2, 18, 0x3d4148, 0x23262c);
  grid.position.y = -2.32;
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.16;
  scene.add(grid);

  container.appendChild(renderer.domElement);

  const resize = () => {
    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, Math.round(width * 0.72));

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 640 ? 9.3 : 8.4;
    camera.updateProjectionMatrix();
  };

  resize();

  const dispose = () => {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();

    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;

      if (!mesh.isMesh) {
        return;
      }

      geometries.add(mesh.geometry);
      const material = mesh.material;

      if (Array.isArray(material)) {
        material.forEach((entry) => materials.add(entry));
      } else {
        materials.add(material);
      }
    });

    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };

  return {
    renderer,
    scene,
    camera,
    rig,
    dispose,
    resize,
  };
}

function setProgressDots(progressDots: HTMLElement[], activeIndex: number) {
  progressDots.forEach((dot, index) => {
    dot.style.transform = `scaleX(${index === activeIndex ? 1 : 0.18})`;
    dot.style.opacity = index === activeIndex ? "1" : "0.38";
  });
}

function renderScene(setup: Pick<SceneSetup, "renderer" | "scene" | "camera">) {
  setup.renderer.render(setup.scene, setup.camera);
}

export function ThreeEngineScene({ rootRef, progressDotRefs }: EngineAssemblySceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const root = rootRef.current;

    if (!container || !root) {
      return;
    }

    let mounted = true;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (!mounted) {
        return;
      }

      const gsap = gsapModule.gsap ?? gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const stage = createStage(container);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progressDots = progressDotRefs.current.filter(Boolean);
      const pistonFinalYs = stage.rig.pistons.map((piston) => piston.position.y);
      const rodFinalYs = stage.rig.rods.map((rod) => rod.position.y);
      let isComplete = prefersReducedMotion;
      let frameId = 0;
      const clock = new THREE.Clock();

      if (prefersReducedMotion) {
        Object.values(stage.rig.parts).forEach((part) => {
          part.group.position.copy(part.finalPosition);
          part.group.rotation.copy(part.finalRotation);
        });
        stage.rig.glowMaterial.opacity = 0.42;
        stage.rig.sparkGlowMaterial.opacity = 0.7;
        setProgressDots(progressDots, 5);
      } else {
        gsap.set(progressDots, {
          scaleX: 0.18,
          opacity: 0.38,
          transformOrigin: "0% 50%",
        });
        if (progressDots[0]) {
          gsap.set(progressDots[0], { scaleX: 1, opacity: 1 });
        }
      }

      const timeline = prefersReducedMotion
        ? undefined
        : gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.85,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                isComplete = self.progress > 0.9;
                root.classList.toggle("assembly-complete", isComplete);
              },
              onLeaveBack: () => {
                isComplete = false;
                root.classList.remove("assembly-complete");
              },
            },
          });

      const showPanel = (index: number, at: number) => {
        if (!timeline || !progressDots[index]) {
          return;
        }

        timeline
          .to(progressDots, { scaleX: 0.18, opacity: 0.38, duration: 0.28 }, at)
          .to(progressDots[index], { scaleX: 1, opacity: 1, duration: 0.42 }, at + 0.04);
      };

      const movePart = (key: PartKey, at: number, duration = 0.78) => {
        if (!timeline) {
          return;
        }

        const part = stage.rig.parts[key];
        timeline
          .to(
            part.group.position,
            {
              x: part.finalPosition.x,
              y: part.finalPosition.y,
              z: part.finalPosition.z,
              duration,
            },
            at,
          )
          .to(
            part.group.rotation,
            {
              x: part.finalRotation.x,
              y: part.finalRotation.y,
              z: part.finalRotation.z,
              duration,
            },
            at,
          );
      };

      movePart("block", 0.05, 0.9);

      showPanel(1, 0.92);
      PISTON_KEYS.forEach((key, index) => movePart(key, 1.04 + index * 0.13, 0.82));

      showPanel(2, 1.9);
      ROD_KEYS.forEach((key, index) => movePart(key, 2.04 + index * 0.08, 0.72));
      movePart("crankshaft", 2.14, 0.94);
      timeline
        ?.to(stage.rig.crankshaft.rotation, { x: 0.18, duration: 0.16, ease: "power1.inOut" }, 2.94)
        .to(stage.rig.crankshaft.rotation, { x: 0, duration: 0.2, ease: "power1.out" }, 3.1);

      showPanel(3, 3.05);
      movePart("cylinderHead", 3.18, 0.86);
      timeline
        ?.to(stage.rig.parts.cylinderHead.group.scale, { x: 1.018, y: 1.018, z: 1.018, duration: 0.14 }, 3.9)
        .to(stage.rig.parts.cylinderHead.group.scale, { x: 1, y: 1, z: 1, duration: 0.16 }, 4.05);

      showPanel(4, 4.08);
      movePart("intake", 4.24, 0.82);
      movePart("exhaust", 4.3, 0.82);
      movePart("spark", 4.48, 0.66);
      timeline
        ?.to(stage.rig.glowMaterial, { opacity: 0.42, duration: 0.58 }, 4.72)
        .to(stage.rig.sparkGlowMaterial, { opacity: 0.72, duration: 0.5 }, 4.82);

      showPanel(5, 5.12);
      timeline?.to(stage.rig.root.rotation, { x: -0.16, y: -0.5, z: 0.02, duration: 0.62 }, 5.25);

      const resizeObserver = new ResizeObserver(stage.resize);
      resizeObserver.observe(container);

      const animate = () => {
        const delta = clock.getDelta();
        const elapsed = clock.elapsedTime;

        if (isComplete) {
          stage.rig.root.rotation.y = -0.5 + Math.sin(elapsed * 0.78) * 0.16;
          stage.rig.root.rotation.x = -0.16 + Math.sin(elapsed * 0.62) * 0.035;
          stage.rig.root.position.y = Math.sin(elapsed * 18) * 0.008;
          stage.rig.crankshaft.rotation.x += delta * 5.4;
          stage.rig.glowMaterial.opacity = 0.36 + Math.sin(elapsed * 3.8) * 0.08;
          stage.rig.sparkGlowMaterial.opacity = 0.62 + Math.sin(elapsed * 5.2) * 0.13;

          stage.rig.pistons.forEach((piston, index) => {
            piston.position.y = pistonFinalYs[index] + Math.sin(elapsed * 7.1 + index * 1.3) * 0.055;
          });
          stage.rig.rods.forEach((rod, index) => {
            rod.position.y = rodFinalYs[index] + Math.sin(elapsed * 7.1 + index * 1.3) * 0.028;
            rod.rotation.z = stage.rig.parts[ROD_KEYS[index]].finalRotation.z + Math.sin(elapsed * 7.1 + index) * 0.04;
          });
        }

        renderScene(stage);
        frameId = window.requestAnimationFrame(animate);
      };

      animate();

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        root.classList.remove("assembly-complete");
        stage.dispose();
      };
    };

    run();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [progressDotRefs, rootRef]);

  return (
    <div
      ref={containerRef}
      className="three-engine-scene h-full min-h-[24rem] w-full"
      role="img"
      aria-label="Real-time 3D engine components assembling into a metallic engine core"
    />
  );
}

const HERO_PARTS: Record<PartKey, [number, number, number]> = {
  block: [0.1, -0.8, 0],
  piston1: [-2.35, 1.1, 0.4],
  piston2: [-1.25, 1.42, 0.25],
  piston3: [1.28, 1.28, 0.3],
  piston4: [2.36, 1.05, 0.42],
  rod1: [-2.55, -0.66, 0.36],
  rod2: [-1.32, -1.42, 0.3],
  rod3: [1.25, -1.35, 0.34],
  rod4: [2.5, -0.7, 0.38],
  crankshaft: [0.05, -2.2, 0.28],
  cylinderHead: [0, 1.95, 0.16],
  intake: [-3.15, 0.1, 0.4],
  exhaust: [3.18, -0.02, 0.46],
  spark: [0.1, 2.75, 0.4],
};

export function ThreeHeroEngineScatter() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const stage = createStage(container);
    const framePhases = new Map<THREE.Group, number>();
    const basePositions = new Map<THREE.Group, THREE.Vector3>();
    const baseRotations = new Map<THREE.Group, THREE.Euler>();
    let frameId = 0;
    const clock = new THREE.Clock();

    Object.entries(stage.rig.parts).forEach(([key, part], index) => {
      const position = HERO_PARTS[key as PartKey];
      part.group.position.set(position[0], position[1], position[2]);
      part.group.rotation.copy(part.finalRotation);
      part.group.rotation.y += index % 2 === 0 ? -0.35 : 0.35;
      part.group.rotation.z += (index % 3 - 1) * 0.18;
      part.group.scale.setScalar(0.92);
      framePhases.set(part.group, index * 0.58);
      basePositions.set(part.group, part.group.position.clone());
      baseRotations.set(part.group, part.group.rotation.clone());
    });

    stage.rig.root.rotation.set(-0.16, -0.42, 0.02);
    stage.rig.root.scale.setScalar(0.92);
    stage.rig.glowMaterial.opacity = 0.28;
    stage.rig.sparkGlowMaterial.opacity = 0.58;

    const resizeObserver = new ResizeObserver(stage.resize);
    resizeObserver.observe(container);

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;

      stage.rig.root.rotation.y = -0.42 + Math.sin(elapsed * 0.28) * 0.08;
      stage.rig.parts.crankshaft.group.rotation.x += delta * 1.2;
      stage.rig.glowMaterial.opacity = 0.24 + Math.sin(elapsed * 2.3) * 0.05;

      stage.rig.root.children.forEach((child) => {
        const group = child as THREE.Group;
        const phase = framePhases.get(group) ?? 0;
        const basePosition = basePositions.get(group);
        const baseRotation = baseRotations.get(group);

        if (basePosition) {
          group.position.y = basePosition.y + Math.sin(elapsed * 0.9 + phase) * 0.035;
        }

        if (baseRotation && group !== stage.rig.parts.crankshaft.group) {
          group.rotation.z = baseRotation.z + Math.sin(elapsed * 0.8 + phase) * 0.018;
        }
      });

      renderScene(stage);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      stage.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full opacity-95"
      role="img"
      aria-label="Scattered realistic 3D engine components"
    />
  );
}
