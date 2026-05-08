import { Bolt } from "@/components/engine/Bolt";

type CylinderHeadProps = {
  idPrefix?: string;
  className?: string;
};

export function CylinderHead({ idPrefix = "cylinder-head", className }: CylinderHeadProps) {
  const metal = `${idPrefix}-metal`;
  const inset = `${idPrefix}-inset`;
  const topFace = `${idPrefix}-top-face`;
  const sideFace = `${idPrefix}-side-face`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-190" x2="190" y1="-55" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5f6f8" />
          <stop offset="24%" stopColor="#9aa0a9" />
          <stop offset="66%" stopColor="#444a52" />
          <stop offset="100%" stopColor="#16191d" />
        </linearGradient>
        <linearGradient id={inset} x1="0" x2="0" y1="-42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111318" />
          <stop offset="100%" stopColor="#2f353d" />
        </linearGradient>
        <linearGradient id={topFace} x1="-212" x2="212" y1="-72" y2="-26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="44%" stopColor="#8f96a0" />
          <stop offset="100%" stopColor="#252a30" />
        </linearGradient>
        <linearGradient id={sideFace} x1="164" x2="232" y1="-48" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4b525b" />
          <stop offset="100%" stopColor="#08090b" />
        </linearGradient>
      </defs>
      <path
        d="M -164 -70 H 216 L 238 -44 L 216 32 H -164 L -186 -44 Z"
        fill="#050607"
        opacity="0.46"
      />
      <path
        d="M -190 -48 H 190 L 216 -70 H -164 Z"
        fill={`url(#${topFace})`}
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1.2"
      />
      <path
        d="M 190 -48 L 212 -22 L 190 54 L 216 32 L 238 -44 L 216 -70 Z"
        fill={`url(#${sideFace})`}
        stroke="#ffffff"
        strokeOpacity="0.11"
        strokeWidth="1.2"
      />
      <path
        d="M -190 -48 H 190 L 212 -22 L 190 54 H -190 L -212 -22 Z"
        fill={`url(#${metal})`}
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="1.8"
      />
      <path d="M -162 -24 H 162 L 146 30 H -146 Z" fill={`url(#${inset})`} stroke="#ffffff" strokeOpacity="0.12" />
      {[-120, -40, 40, 120].map((x) => (
        <g key={x}>
          <circle cx={x - 16} cy="4" r="12" fill="#060606" stroke="#f8fafc" strokeOpacity="0.18" />
          <circle cx={x + 16} cy="4" r="12" fill="#060606" stroke="#f8fafc" strokeOpacity="0.18" />
          <path d={`M ${x - 20} 23 H ${x + 20}`} stroke="#ff7a2f" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      {[-150, -75, 0, 75, 150].map((x) => (
        <path key={x} d={`M ${x} -40 V 45`} stroke="#ffffff" strokeOpacity="0.11" strokeWidth="2" strokeLinecap="round" />
      ))}
      {[-118, -82, -14, 24, 96, 136].map((x, index) => (
        <path
          key={`head-surface-${x}`}
          d={`M ${x} ${index % 2 === 0 ? -34 : 34} H ${x + 28}`}
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
      <Bolt x={-184} y={-20} size={8} idPrefix={`${idPrefix}-bolt-a`} />
      <Bolt x={184} y={-20} size={8} idPrefix={`${idPrefix}-bolt-b`} />
      <Bolt x={-150} y={38} size={7} idPrefix={`${idPrefix}-bolt-c`} />
      <Bolt x={150} y={38} size={7} idPrefix={`${idPrefix}-bolt-d`} />
    </g>
  );
}
