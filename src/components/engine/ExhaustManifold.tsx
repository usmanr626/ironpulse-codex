import { Bolt } from "@/components/engine/Bolt";

type ExhaustManifoldProps = {
  idPrefix?: string;
  className?: string;
};

export function ExhaustManifold({ idPrefix = "exhaust", className }: ExhaustManifoldProps) {
  const metal = `${idPrefix}-metal`;
  const side = `${idPrefix}-side`;

  return (
    <g className={`precision-metal hot-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-120" x2="180" y1="-78" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c3c7cd" />
          <stop offset="34%" stopColor="#5f6670" />
          <stop offset="78%" stopColor="#22262c" />
          <stop offset="100%" stopColor="#0b0c0e" />
        </linearGradient>
        <linearGradient id={side} x1="-98" x2="210" y1="-86" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3f454d" />
          <stop offset="100%" stopColor="#050607" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((index) => {
        const x = -110 + index * 42;
        return (
          <g key={index}>
            <path
              d={`M ${x + 13} -58 C ${x + 19} -20 ${x + 41} 12 ${x + 73} 24 C ${x + 99} 34 ${x + 131} 26 ${x + 155} 8`}
              fill="none"
              stroke={`url(#${side})`}
              strokeWidth="17"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d={`M ${x} -42 C ${x + 6} -4 ${x + 28} 28 ${x + 60} 40 C ${x + 86} 50 ${x + 118} 42 ${x + 142} 24`}
              fill="none"
              stroke={`url(#${metal})`}
              strokeWidth="17"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      <path
        d="M -132 -62 H 54 C 68 -62 76 -52 76 -40 V -16 C 76 -3 68 6 54 6 H -132 Z"
        fill={`url(#${metal})`}
        stroke="#f8fafc"
        strokeOpacity="0.2"
      />
      <path
        d="M 74 18 C 105 47 138 52 178 38"
        fill="none"
        stroke={`url(#${metal})`}
        strokeWidth="24"
        strokeLinecap="round"
      />
      <path d="M 78 10 C 111 39 139 43 173 31" fill="none" stroke="#ff6b2a" strokeOpacity="0.22" strokeWidth="3" />
      {[-104, -61, -18, 25].map((x, index) => (
        <Bolt key={x} x={x} y={-28} size={6} idPrefix={`${idPrefix}-bolt-${index}`} />
      ))}
    </g>
  );
}
