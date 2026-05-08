import { Bolt } from "@/components/engine/Bolt";

type IntakeManifoldProps = {
  idPrefix?: string;
  className?: string;
};

export function IntakeManifold({ idPrefix = "intake", className }: IntakeManifoldProps) {
  const metal = `${idPrefix}-metal`;
  const side = `${idPrefix}-side`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-150" x2="160" y1="-80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#edf0f4" />
          <stop offset="28%" stopColor="#8f96a0" />
          <stop offset="72%" stopColor="#323840" />
          <stop offset="100%" stopColor="#111318" />
        </linearGradient>
        <linearGradient id={side} x1="-136" x2="188" y1="-86" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4d555f" />
          <stop offset="100%" stopColor="#050607" />
        </linearGradient>
      </defs>
      <path
        d="M -146 -42 C -98 -80 -52 -70 -11 -38 C 30 -5 68 -5 116 -38"
        fill="none"
        stroke={`url(#${side})`}
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M -160 -22 C -112 -60 -66 -50 -25 -18 C 16 15 54 15 102 -18"
        fill="none"
        stroke={`url(#${metal})`}
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M -146 -27 C -105 -51 -66 -43 -30 -14 C 8 17 50 17 92 -13"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M -176 -38 H -126 C -112 -38 -104 -28 -104 -16 V 18 C -104 30 -112 38 -126 38 H -176 Z"
        fill={`url(#${metal})`}
        stroke="#f8fafc"
        strokeOpacity="0.22"
      />
      <path
        d="M 88 -40 H 150 C 166 -40 176 -30 176 -14 V 24 C 176 39 166 48 150 48 H 88 Z"
        fill={`url(#${metal})`}
        stroke="#f8fafc"
        strokeOpacity="0.22"
      />
      {[0, 1, 2, 3].map((index) => (
        <g key={index}>
          <path
            d={`M ${-58 + index * 36} -21 C ${-46 + index * 34} 12 ${-38 + index * 28} 30 ${-22 + index * 26} 50`}
            fill="none"
            stroke={`url(#${side})`}
            strokeWidth="13"
            strokeLinecap="round"
            opacity="0.62"
          />
          <path
            d={`M ${-70 + index * 36} -3 C ${-58 + index * 34} 30 ${-50 + index * 28} 48 ${-34 + index * 26} 68`}
            fill="none"
            stroke={`url(#${metal})`}
            strokeWidth="13"
            strokeLinecap="round"
          />
        </g>
      ))}
      <Bolt x={-154} y={-22} size={6} idPrefix={`${idPrefix}-bolt-a`} />
      <Bolt x={-154} y={22} size={6} idPrefix={`${idPrefix}-bolt-b`} />
      <Bolt x={146} y={-22} size={6} idPrefix={`${idPrefix}-bolt-c`} />
      <Bolt x={146} y={26} size={6} idPrefix={`${idPrefix}-bolt-d`} />
    </g>
  );
}
