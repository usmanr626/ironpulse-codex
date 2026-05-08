type ConnectingRodProps = {
  idPrefix?: string;
  className?: string;
};

export function ConnectingRod({ idPrefix = "connecting-rod", className }: ConnectingRodProps) {
  const metal = `${idPrefix}-metal`;
  const side = `${idPrefix}-side`;

  return (
    <g className={`precision-metal ${className ?? ""}`} aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="-28" x2="28" y1="-90" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d9dde2" />
          <stop offset="32%" stopColor="#777e87" />
          <stop offset="100%" stopColor="#252a30" />
        </linearGradient>
        <linearGradient id={side} x1="0" x2="28" y1="-70" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#464d56" />
          <stop offset="100%" stopColor="#07080a" />
        </linearGradient>
      </defs>
      <path
        d="M -6 -70 C -18 -57 -18 -34 -3 -21 L 3 46 C -13 58 -12 91 12 98 C 36 91 37 58 21 46 L 27 -21 C 42 -34 42 -57 30 -70 C 21 -80 3 -80 -6 -70 Z"
        fill={`url(#${side})`}
        opacity="0.72"
      />
      <path d="M -18 -58 L -6 -70 M 18 -58 L 30 -70 M 0 110 L 12 98" stroke="#ffffff" strokeOpacity="0.12" />
      <path
        d="M -18 -58 C -30 -45 -30 -22 -15 -9 L -9 58 C -25 70 -24 103 0 110 C 24 103 25 70 9 58 L 15 -9 C 30 -22 30 -45 18 -58 C 9 -68 -9 -68 -18 -58 Z"
        fill={`url(#${metal})`}
        stroke="#f4f4f5"
        strokeOpacity="0.24"
        strokeWidth="1.5"
      />
      <circle cx="0" cy="-38" r="22" fill="#101216" stroke="#f1f5f9" strokeOpacity="0.22" strokeWidth="2" />
      <circle cx="0" cy="-38" r="10" fill="#050505" stroke="#ff7a2f" strokeOpacity="0.18" />
      <circle cx="0" cy="82" r="24" fill="#12151a" stroke="#f1f5f9" strokeOpacity="0.22" strokeWidth="2" />
      <circle cx="0" cy="82" r="12" fill="#050505" stroke="#f8fafc" strokeOpacity="0.16" />
      <path d="M -5 -8 L -2 50" stroke="#f8fafc" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
      <path d="M 8 -8 L 4 50" stroke="#050505" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}
