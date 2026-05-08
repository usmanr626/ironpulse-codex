type SparkPlugProps = {
  idPrefix?: string;
  className?: string;
};

export function SparkPlug({ idPrefix = "spark-plug", className }: SparkPlugProps) {
  const ceramic = `${idPrefix}-ceramic`;
  const metal = `${idPrefix}-metal`;
  const side = `${idPrefix}-side`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={ceramic} x1="-18" x2="18" y1="-78" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#cdd2d8" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient id={metal} x1="-28" x2="28" y1="-10" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e7eaee" />
          <stop offset="45%" stopColor="#7e858e" />
          <stop offset="100%" stopColor="#171a1f" />
        </linearGradient>
        <linearGradient id={side} x1="0" x2="44" y1="-78" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8f98a4" />
          <stop offset="42%" stopColor="#404852" />
          <stop offset="100%" stopColor="#050607" />
        </linearGradient>
      </defs>
      <path d="M 14 -76 L 30 -88 L 34 -30 L 18 -18 Z" fill={`url(#${side})`} opacity="0.7" />
      <path d="M 24 16 L 42 4 L 50 20 L 32 32 Z" fill={`url(#${side})`} opacity="0.72" />
      <path d="M 17 50 L 33 39 L 30 73 L 14 84 Z" fill={`url(#${side})`} opacity="0.72" />
      <path d="M -14 -76 H 14 L 18 -18 L 10 16 H -10 L -18 -18 Z" fill={`url(#${ceramic})`} stroke="#f8fafc" strokeOpacity="0.26" />
      <path d="M -24 16 H 24 L 32 32 L 22 49 H -22 L -32 32 Z" fill={`url(#${metal})`} stroke="#ffffff" strokeOpacity="0.18" />
      <path d="M -17 50 H 17 L 14 84 H -14 Z" fill={`url(#${metal})`} stroke="#ffffff" strokeOpacity="0.16" />
      {[-48, -34, -20].map((y) => (
        <path key={y} d={`M -13 ${y} H 13`} stroke="#060606" strokeOpacity="0.38" strokeWidth="2" />
      ))}
      <path d="M 0 84 V 112" stroke="#d9dde3" strokeWidth="4" strokeLinecap="round" />
      <path d="M -14 104 C -1 116 12 115 21 101" fill="none" stroke="#ff6b2a" strokeOpacity="0.82" strokeWidth="3" strokeLinecap="round" />
      <circle cx="0" cy="110" r="5" fill="#ff6b2a" fillOpacity="0.82" className="internal-glow" />
    </g>
  );
}
