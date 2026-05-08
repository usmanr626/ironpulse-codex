type BoltProps = {
  x?: number;
  y?: number;
  size?: number;
  idPrefix?: string;
  className?: string;
};

export function Bolt({
  x = 0,
  y = 0,
  size = 10,
  idPrefix = "bolt",
  className,
}: BoltProps) {
  const metalId = `${idPrefix}-bolt-metal`;

  return (
    <g className={className} transform={`translate(${x} ${y})`} aria-hidden="true">
      <defs>
        <radialGradient id={metalId} cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.9" />
          <stop offset="42%" stopColor="#8a8d91" />
          <stop offset="100%" stopColor="#2f3338" />
        </radialGradient>
      </defs>
      <circle cx={size * 0.32} cy={-size * 0.32} r={size} fill="#111418" stroke="#000000" strokeOpacity="0.26" />
      <circle r={size} fill={`url(#${metalId})`} stroke="#d5d8dd" strokeOpacity="0.34" strokeWidth="1" />
      <circle r={size * 0.46} fill="#111214" stroke="#f3f4f6" strokeOpacity="0.18" strokeWidth="1" />
      <path
        d={`M ${-size * 0.48} 0 H ${size * 0.48} M 0 ${-size * 0.48} V ${size * 0.48}`}
        stroke="#f8fafc"
        strokeOpacity="0.28"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </g>
  );
}
