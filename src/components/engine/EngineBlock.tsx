import { Bolt } from "@/components/engine/Bolt";

type EnginePartProps = {
  idPrefix?: string;
  className?: string;
};

export function EngineBlock({ idPrefix = "engine-block", className }: EnginePartProps) {
  const metal = `${idPrefix}-metal`;
  const face = `${idPrefix}-face`;
  const bore = `${idPrefix}-bore`;
  const topFace = `${idPrefix}-top-face`;
  const sideFace = `${idPrefix}-side-face`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-180" x2="180" y1="-120" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e7e9ec" />
          <stop offset="18%" stopColor="#969ba2" />
          <stop offset="50%" stopColor="#4d535b" />
          <stop offset="78%" stopColor="#23272c" />
          <stop offset="100%" stopColor="#0f1114" />
        </linearGradient>
        <linearGradient id={face} x1="0" x2="0" y1="-110" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bdc1c7" stopOpacity="0.9" />
          <stop offset="48%" stopColor="#555b63" />
          <stop offset="100%" stopColor="#191c20" />
        </linearGradient>
        <linearGradient id={topFace} x1="-210" x2="210" y1="-128" y2="-48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f6f7f8" />
          <stop offset="36%" stopColor="#9aa0a7" />
          <stop offset="100%" stopColor="#2a2f36" />
        </linearGradient>
        <linearGradient id={sideFace} x1="120" x2="232" y1="-78" y2="164" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#525961" />
          <stop offset="100%" stopColor="#08090b" />
        </linearGradient>
        <radialGradient id={bore} cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor="#060606" />
          <stop offset="58%" stopColor="#151719" />
          <stop offset="100%" stopColor="#646970" />
        </radialGradient>
      </defs>

      <path
        d="M -164 -122 L 206 -122 L 232 -82 L 205 106 L 153 138 L -105 138 L -157 106 L -183 -82 Z"
        fill="#050607"
        opacity="0.42"
      />
      <path
        d="M -190 -96 L 180 -96 L 206 -122 L -164 -122 Z"
        fill={`url(#${topFace})`}
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1.4"
      />
      <path
        d="M 180 -96 L 205 -56 L 178 132 L 126 164 L 153 138 L 205 106 L 232 -82 L 206 -122 Z"
        fill={`url(#${sideFace})`}
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.2"
      />
      <path
        d="M -210 -56 L -190 -96 L -164 -122 L -183 -82 Z"
        fill="#b7bcc3"
        fillOpacity="0.42"
        stroke="#ffffff"
        strokeOpacity="0.12"
      />
      <path
        d="M -190 -96 L 180 -96 L 205 -56 L 178 132 L 126 164 L -132 164 L -184 132 L -210 -56 Z"
        fill={`url(#${metal})`}
        stroke="#e8eaed"
        strokeOpacity="0.28"
        strokeWidth="2"
      />
      <path
        d="M -165 -72 H 155 L 174 -44 L 151 105 L 108 132 H -112 L -152 105 L -174 -44 Z"
        fill={`url(#${face})`}
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.4"
      />

      {[-120, -40, 40, 120].map((x, index) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy="-28"
            rx="34"
            ry="45"
            fill={`url(#${bore})`}
            stroke="#d9dde3"
            strokeOpacity="0.32"
            strokeWidth="2"
          />
          <ellipse
            cx={x}
            cy="-28"
            rx="21"
            ry="31"
            fill="none"
            stroke="#000000"
            strokeOpacity="0.58"
            strokeWidth="5"
          />
          <path
            d={`M ${x - 31} 28 H ${x + 31}`}
            stroke={index % 2 === 0 ? "#ff7a2f" : "#d9dde3"}
            strokeOpacity={index % 2 === 0 ? "0.22" : "0.16"}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}

      {[-150, -100, -50, 0, 50, 100, 150].map((x) => (
        <path
          key={x}
          d={`M ${x} 42 L ${x - 10} 126`}
          stroke="#f8fafc"
          strokeOpacity="0.12"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      <path d="M -154 80 H 154" stroke="#08090a" strokeOpacity="0.62" strokeWidth="10" strokeLinecap="round" />
      <path d="M -148 81 H 148" stroke="#f4f4f5" strokeOpacity="0.13" strokeWidth="1" strokeLinecap="round" />
      <path d="M -128 118 H 128" stroke="#f4f4f5" strokeOpacity="0.14" strokeWidth="2" strokeLinecap="round" />
      {[-132, -88, -44, 0, 44, 88, 132].map((x) => (
        <path
          key={`scratch-${x}`}
          d={`M ${x - 18} ${-78 + Math.abs(x % 3) * 12} L ${x + 12} ${-72 + Math.abs(x % 5) * 10}`}
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}

      <Bolt x={-166} y={-64} size={8} idPrefix={`${idPrefix}-bolt-a`} />
      <Bolt x={166} y={-64} size={8} idPrefix={`${idPrefix}-bolt-b`} />
      <Bolt x={-142} y={126} size={9} idPrefix={`${idPrefix}-bolt-c`} />
      <Bolt x={142} y={126} size={9} idPrefix={`${idPrefix}-bolt-d`} />
      <Bolt x={-58} y={132} size={7} idPrefix={`${idPrefix}-bolt-e`} />
      <Bolt x={58} y={132} size={7} idPrefix={`${idPrefix}-bolt-f`} />
    </g>
  );
}
